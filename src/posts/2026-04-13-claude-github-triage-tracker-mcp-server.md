---
title: 'Building A GitHub Triage Tracker and MCP Prompt Server with Claude'
date: 2026-04-13T12:00:00-02:00
excerpt: "I built an MCP prompt server and a GitHub triage tracker with the Claude API — here's how Claude powers both and what I learned."
layout: layouts/post.njk
permalink: /claude-github-triage-tracker-mcp-server/
image: claude-insights.jpg
tags: ['coding-best-practices']
secondary_tags: ['ai', 'mcp', 'claude']
category: Coding Tips
schema_type: 'TechArticle'
draft: true
---

I previously wrote about <a href="/building-ai-tools-claude-api/" title="Building AI Tools with the Claude API">building two VS Code extensions with the Claude API</a>. But I also used Claude to build a <a href="https://github.com/kaidez/github-issue-triage" title="GitHub Triage Tracker Repository on GitHub" aria-label="Go to the GitHub Triage Tracker Repository on GitHub" rel="noopener noreferrer">GitHub Triage Tracker</a> and an <a href="https://github.com/kaidez/mcp-prompt-server" title="MCP Prompt Server Repository on GitHub" aria-label="Go to the MCP Prompt Server Repository on GitHub" rel="noopener noreferrer">MCP Prompt Server</a>.

These weren't Earth-shattering apps, but building them increased my Claude API knowledge. Here's the write-up on the latter two tools.

<h2>Table of Contents</h2>

1. [How Claude Works With the Triage Tracker](#how-claude-works)
2. [A Quick Chat About Zod](#zod)
3. [Code Architecture](#code-architecture)
4. [Triage Tracker - `validate.ts`](#validate.ts)
5. [Triage Tracker - `index.ts`](#index.ts)
6. [Conclusion](#conclusion)

<h2 id="how-claude-works">How Claude Works With the Triage Tracker</h2>

For the Triage Tracker, the Claude API works pretty much the same way it did with the VS Code extensions. A reminder of how it works:

<ul>
  <li>Claude is stateless. If you're "having a conversation with it" through prompts, it doesn't remember your past prompts. Instead, it sends the past conversation with each new prompt, then uses it as context when it responds.</li>
  <li>Claude is powerful prediction software.  It's really REALLY good at "guessing" how it responds to prompts.</li>
  <li>Calling the Claude API requires an API key. <a href="https://platform.claude.com/docs/en/api/admin/api_keys/retrieve" title="Get a Claude API key" rel="noopener noreferrer">Get a Claude API key here</a>.</li>
</ul>

The tracker sends a request to GitHub's API to pull open issues from <a href="https://github.com/microsoft/vscode" title="Microsoft's VS Code Repo on GitHub" aria-label="Go to Microsoft's VS Code Repo on GitHub" rel="noopener noreferrer">VS Code's public repo</a>. Claude's API then analyzes those issues, using its powerful 'guessing' ability to determine how severe they are.

From there, this data is saved to a JSON file, which is then outputted to the command line. The JSON data is also saved to a local Markdown file.

<h2 id="zod">A Quick Chat About Zod</h2>

The Triage Tracker is written in TypeScript (TS) and because of how it interprets Claude's data output, <a href="https://zod.dev/" title="Zod Validation Library" aria-label="Go to the Zod Validation Library's site" rel="noopener noreferrer">Zod</a> is needed. And if we're talking about TS development, Zod is worth a discussion.

Zod is a validation library. You declare the shape you expect your data to have, and Zod checks that incoming data actually matches that shape at runtime.

In my Tracker the incoming data is the VS Code issues up on GitHub. The issues are retrieved and then sent to Claude to define their severity.

I declare the expected shape of each issue in advance with TypeScript. But there's no guarantee that the types will match up when being sent to Claude...that's where things get error-prone.

Zod validates that each issue actually matches that declared shape before it's passed to Claude. We'll see this in action when we look at `validate.ts`.

Much like <a href="https://jquery.com/" title="jQuery JavaScript Library" aria-label="Go to the jQuery JavaScript Library's site" rel="noopener noreferrer">jQuery</a> became a de facto standard in frontend development, Zod is now a go-to tool in TypeScript development.

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

Based on how Zod's described above, `validate.ts` is essentially a helper file.

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

export type EnrichedIssue = z.infer<typeof EnrichedIssueSchema>;
</code></pre>

Zod's being imported in, then it maps types to values inside an object called `EnrichedIssueSchema`. This schema is then mapped to a new custom type called `EnrichedIssue`.

<h2 id="index.ts">Triage Tracker - <code>index.ts</code></h2>

<pre><code class="language-javascript">
import 'dotenv/config';
import { EnrichedIssue } from './validate.js';
import { fetchIssues } from './fetch.js';
import { enrichIssue } from './enrich.js';
import { writeOutput, writeToFile } from './write.js';

async function run(): Promise<void> {
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
