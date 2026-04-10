---
title: 'Building A GitHub Triage Tracker and MCP Prompt Server with Claude'
date: 2026-04-13T12:00:00-02:00
excerpt: "I built an MCP prompt server and a GitHub triage tracker with the Claude API — here's how Claude powers both and what I learned."
layout: layouts/post.njk
permalink: /claude-github-triage-tracker-mcp-server/
image: claude-insights.jpg
tags: ['coding-best-practices']
secondary_tags: ['ai', 'claude', 'zod']
category: Coding Tips
schema_type: 'TechArticle'
draft: true
---

I previously wrote about <a href="/building-ai-tools-claude-api/" title="Building AI Tools with the Claude API">building two VS Code extensions with the Claude API</a>. But I also used Claude to build a <a href="https://github.com/kaidez/github-issue-triage" title="GitHub Triage Tracker Repository on GitHub" aria-label="Go to the GitHub Triage Tracker Repository on GitHub" rel="noopener noreferrer">GitHub Triage Tracker</a> and an <a href="https://github.com/kaidez/mcp-prompt-server" title="MCP Prompt Server Repository on GitHub" aria-label="Go to the MCP Prompt Server Repository on GitHub" rel="noopener noreferrer">MCP Prompt Server</a>.

These weren't Earth-shattering apps, but building them increased my Claude knowledge. Here's the write-up on the latter two tools.

<h2>Table of Contents</h2>

1. [How Claude Works With the Triage Tracker](#how-claude-works)
2. [A Quick Chat About Zod](#zod)
3. [Code Architecture](#code-architecture)
4. [Triage Tracker - `validate.ts`](#validate.ts)
5. [Triage Tracker - `fetch.ts`](#fetch.ts)
6. [Triage Tracker - `enrich.ts`](#enrich.ts)
7. [Triage Tracker - `index.ts`](#index.ts)
8. [Conclusion](#conclusion)

<h2 id="how-claude-works">How Claude Works With the Triage Tracker</h2>

For the Triage Tracker, the Claude API works pretty much the same way it did with the VS Code extensions. A reminder of how it works:

<ul>
  <li>Claude is stateless. If you're "having a conversation with it" through prompts, it doesn't remember your past prompts. Instead, your code re-sends the full conversation history with each new request, and Claude uses that as context.</li>
  <li>Claude is powerful prediction software. It's really REALLY good at "guessing" how it responds to prompts.</li>
  <li>Calling the Claude API requires an API key. If you already have a Claude account, <a href="https://platform.claude.com/settings/keys" title="Get a Claude API key" rel="noopener noreferrer">get a Claude API key here</a> and place it in an <code>.env</code> file at the root. It should look like this:
  <pre><code class="language-yaml">
  ANTHROPIC_API_KEY=XX-XXXX-XXXXXX
  </code></pre>
  </li>
</ul>

The tracker sends a request to GitHub's API and pulls open issues from <a href="https://github.com/microsoft/vscode" title="Microsoft's VS Code Repo on GitHub" aria-label="Go to Microsoft's VS Code Repo on GitHub" rel="noopener noreferrer">VS Code's public repo</a>. Claude's API then analyzes those issues, using its powerful "guessing" ability to determine how severe they are.

The issue data is saved to a JSON file, which is then output to the command line. Separately, it's saved to a local Markdown file.

<h2 id="zod">A Quick Chat About Zod</h2>

The Triage Tracker is written in TypeScript (TS) and because of how it interprets Claude's data output, <a href="https://zod.dev/" title="Zod Validation Library" aria-label="Go to the Zod Validation Library's site" rel="noopener noreferrer">Zod</a> is needed. And if we're talking about TS development, Zod is worth a discussion.

Zod is a validation library: you declare the shape you expect your data to have. Zod then checks that incoming data actually matches that shape at runtime.

Validating data in forms is a common use case for web apps, and Zod can help with that if needed. But this tracker needs to validate the incoming VS Code issues data described above.

I declare the expected shape of each issue in advance with TypeScript. But there's no guarantee that the types I pull from GitHub will match up with what Claude sends back. That's where things get error-prone.

Zod validates that Claude's response actually matches that declared shape before the data is saved. We'll see this in action when we look at `validate.ts`.

Like <a href="https://jquery.com/" title="jQuery JavaScript Library" aria-label="Go to the jQuery JavaScript Library's site" rel="noopener noreferrer">jQuery</a> became a de facto standard in frontend development, Zod is now a go-to tool in TypeScript development.

<h2 id="code-architecture">Code Architecture</h2>

The tracker is coded up using a standard <a href="https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl" title="ETL Design Pattern" aria-label="Go to Microsoft's definition of the ETL Design Pattern" rel="noopener noreferrer">ETL</a> pattern, split across five modular files, each with its own responsibility:

<ol>
  <li><code>validate.ts</code></li>
  <li><code>fetch.ts</code></li>
  <li><code>enrich.ts</code></li>
  <li><code>write.ts</code></li>
  <li><code>index.ts</code></li>
</ol>

`validate.ts` manages the aforementioned data typing. `index.ts` is the entry point that runs the other TypeScript modules sequentially.

<h2 id="validate.ts">Triage Tracker - <code>validate.ts</code></h2>

Based on the Zod description above, `validate.ts` is essentially a helper file.

<pre><code class="language-javascript">
import { z } from 'zod';

export const EnrichedIssueSchema = z.object({
  number: z.number(),
  title: z.string(),
  body: z.string().nullable(),
  labels: z.array(z.string()),
  created_at: z.string(),
  comments: z.number(),
  severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
  summary: z.string(),
  next_action: z.string(),
});

export type EnrichedIssue = z.infer&lt;typeof EnrichedIssueSchema&gt;;
</code></pre>

Zod is imported and used to define `EnrichedIssueSchema`, where each field has a Zod validator enforcing its type. This schema is then used to derive a TypeScript type called `EnrichedIssue` via `z.infer`, giving you static type safety without writing the type manually.

<h2 id="fetch.ts">Triage Tracker - <code>fetch.ts</code></h2>

<pre><code class="language-javascript">
import dotenv from 'dotenv';
dotenv.config();

const GITHUB_API_URL = 'https://api.github.com/repos/microsoft/vscode/issues';

export interface GitHubIssue {
  number: number;
  title: string;
  body: string | null;
  labels: { name: string }[];
  created_at: string;
  comments: number;
}

export async function fetchIssues(limit = 10): Promise&lt;GitHubIssue[]&gt; {
  const response = await fetch(`${GITHUB_API_URL}?state=open&per_page=${limit}`);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const issues = await response.json() as GitHubIssue[];
  return issues;
}
</code></pre>

This is where the Tracker makes an API request for the VS Code issues in GitHub. It uses `dotenv.config()` to load environment variables (the Anthropic API key in this case), then makes a GET request to the GitHub API.

A TypeScript interface named `GitHubIssue` is created. It contains the field names listed in the returned GitHub data.

The `fetchIssues()` function does a standard request/response action for the GitHub data. It takes a single parameter of `limit`, defining how many total issues to return. By default, it requests 10 issues.

Finally, the data is loaded as a JSON array in `const issues`.

<h2 id="enrich.ts">Triage Tracker - <code>enrich.ts</code></h2>

<pre><code class="language-javascript">
import { Anthropic } from '@anthropic-ai/sdk';
import { EnrichedIssueSchema, EnrichedIssue } from './validate.js';
import { GitHubIssue } from './fetch.js';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an engineering triage assistant. Analyze GitHub issues and return structured JSON only. No explanation, no markdown, no code fences. Return only valid JSON.`;

function buildUserPrompt(issue: GitHubIssue): string {
  const labels = issue.labels.map(l => l.name).join(', ') || 'none';
  const body = issue.body?.trim() || 'No description provided.';

  return `Analyze this GitHub issue and return a JSON object with exactly these three fields:

  - "severity": one of "Critical", "High", "Medium", or "Low"
  - "summary": one sentence describing the problem in plain English
  - "next_action": a short suggested action (e.g. "Needs reproduction steps", "Ready to assign", "Duplicate — close", "Needs more info")

  Issue #${issue.number}
  Title: ${issue.title}
  Labels: ${labels}
  Comments: ${issue.comments}
  Body: ${body}

  Return only the JSON object. No other text.`;
}

export async function enrichIssue(
  issue: GitHubIssue,
  anthropicClient: Anthropic = client
): Promise&lt;EnrichedIssue&gt; {

    const message = await anthropicClient.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(issue) }],
    });

    const raw = message.content[0].type === 'text'
      ? message.content[0].text.replace(/^`json\s*/i, '').replace(/`\s\*$/, '').trim()
    : '';

    let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new Error(`Claude returned non-JSON for issue #${issue.number}: ${raw}`);
      }

    // Validate the issue data using Zod
    const result = EnrichedIssueSchema.safeParse({
      number: issue.number,
      title: issue.title,
      body: issue.body,
      labels: issue.labels.map(l => l.name),
      created_at: issue.created_at,
      comments: issue.comments,
      ...(parsed as object),
    });

    if (!result.success) {
      throw new Error(`Zod validation failed for issue #${issue.number}: ${result.error.message}`);
    }

    return result.data;
}
</code></pre>

`enrich.ts` is where the Tracker puts Zod's data validation power to work.
Here, the data pulled from GitHub is sent to Claude.

Claude analyzes each issue, categorizes it by severity, and returns a response. Zod then validates that response against the declared schema before saving.

First, two `const`s are created:

<ol>
  <li><code>const client</code> stores the Anthropic API key that was configured earlier.</li>
  <li><code>const SYSTEM_PROMPT</code> creates the initial prompt we send to Claude when we send it the GitHub data. Note the prompt follows a Claude best practice by assigning Claude a role — 'engineering triage assistant' in this case.</li>
</ol>

Next, two functions handle prompt construction and the Claude API call. `buildUserPrompt()` is a helper function that takes a single issue and formats it into a prompt string.

It takes an `issue` parameter that represents each issue the Tracker grabs from GitHub. `issue` is strongly-typed against the `GitHubIssue` interface created in `fetch.ts`.

The loop takes each issue and adds it to a prompt. The completed prompt is sent to Claude, which analyzes each issue and ranks its severity. The loop then creates a prompt containing both the instructions and the individual issue data.

<h2 id="index.ts">Triage Tracker - <code>index.ts</code></h2>

<pre><code class="language-javascript">
import 'dotenv/config';
import { EnrichedIssue } from './validate.js';
import { fetchIssues } from './fetch.js';
import { enrichIssue } from './enrich.js';
import { writeOutput, writeToFile } from './write.js';

async function run(): Promise&lt;void&gt; {
console.log('Starting GitHub issue triage pipeline...');

console.log('Step 1/3: Fetching issues from GitHub...');
const issues = await fetchIssues(10);
console.log(`✓ Fetched ${issues.length} issue(s)`);

console.log('Step 2/3: Enriching issues with Claude...');
const enriched: EnrichedIssue[] = [];

for (const issue of issues) {
console.log(`  → Enriching issue #${issue.number}: ${issue.title}`);
const result = await enrichIssue(issue);
enriched.push(result);
}
console.log(`✓ Enriched ${enriched.length} issue(s)`);

console.log('Step 3/3: Writing output...');
await writeOutput(enriched);
await writeToFile(enriched);

console.log('\nPipeline complete.');
}

run().catch((error) => {
console.error('Pipeline failed:', error);
process.exit(1);
});
</code></pre>

<h2 id="conclusion">Conclusion</h2>
