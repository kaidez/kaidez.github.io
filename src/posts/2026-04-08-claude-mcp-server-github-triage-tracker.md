---
title: "Building an MCP Prompt Server and GitHub Triage Tracker with the Claude API"
date: 2026-04-01T12:00:00-02:00
excerpt: "I built an MCP prompt server and a GitHub triage tracker with the Claude API — here's how Claude powers both and what I learned."
layout: layouts/post.njk
permalink: /claude-api-mcp-server-github-triage-tracker/
image: claude-insights.jpg
tags: ["coding-best-practices"]
secondary_tags: ["ai", "mcp", "github", "claude"]
category: Coding Tips
schema_type: "TechArticle"
draft: true
---
I previously wrote about <a href="/building-ai-tools-claude-api/" title="Building AI Tools with the Claude API">building two VS Code extensions with the Claude API</a>. But I also used Claude to build a <a href="https://github.com/kaidez/github-issue-triage" title="GitHub Triage Tracker Repository on GitHub" aria-label="Go to the GitHub Triage Tracker Repository on GitHub" rel="noopener noreferrer">GitHub Triage Tracker</a> and an <a href="https://github.com/kaidez/mcp-prompt-server" title="MCP Prompt Server Repository on GitHub" aria-label="Go to the MCP Prompt Server Repository on GitHub" rel="noopener noreferrer">MCP Prompt Server</a>.

These weren't Earth-shattering apps, but building them increased my Claude API knowledge.  Here's the write-up on the latter two tools.

<h2>Table of Contents</h2>

1. [How Claude Works With the Triage Tracker](#how-claude-works)
2. [Triage Tracker `index.ts`](#index.ts)
3. [Conclusion](#conclusion)

<h2 id="how-claude-works">How Claude Works With the Triage Tracker</h2>

For the GitHub Triage Tracker, the Claude API works pretty much the same way it did with the VS Code extensions. A reminder of how it works:

<ul>
  <li>Claude is stateless: if you're "having a conversation with it" through prompts, it doesn't remember your past prompts. Instead, it sends the past conversation with each new prompt, then uses it as context when it responds.</li>
  <li>Calling the Claude API requires an API key. <a href="https://platform.claude.com/docs/en/api/admin/api_keys/retrieve" title="Get a Claude API key" rel="noopener noreferrer">Get a Claude API key here</a>.</li>
</ul>

Using a Node CLI command, this tracker pulls open issues in <a href="https://github.com/microsoft/vscode" title="Microsoft's VS Code Repo on GitHub" aria-label="Go to Microsoft's VS Code Repo on GitHub" rel="noopener noreferrer">VS Code's public repo</a>. It then uses Claude's API to determine how severe they are.

From there, the open issues are retrieved in JSON format and outputted to the command line. Plus, the JSON data is saved to a local file.

All this is coded up using a standard <a href="https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/etl" title="ETL Design Pattern" aria-label="Go to Microsoft's definition of the ETL Design Pattern" rel="noopener noreferrer">ETL</a> pattern, split across five modular files, each with its own responsibility.

<ol>
  <li><code>fetch.ts</code></li>
  <li><code> enrich.ts</code></li>
  <li><code>validate.ts</code></li>
  <li><code>write.ts</code></li>
  <li><code>index.ts</code></li>
</ol>

<h2 id="index.ts">Triage Tracker - `index.ts`</h2>

`index.ts` is the entry point

<pre><code class="language-javascript">
import 'dotenv/config';
import { fetchIssues } from './fetch.js';
import { enrichIssue } from './enrich.js';
import { writeOutput, writeToFile } from './write.js';

// Import the TypeScript type inferred from the Zod schema — used to type the enriched issues array.
import { EnrichedIssue } from './validate.js';

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