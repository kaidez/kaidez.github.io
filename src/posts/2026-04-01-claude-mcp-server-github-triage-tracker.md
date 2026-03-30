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
I previously wrote about <a href="/building-ai-tools-claude-api/" title="Building AI Tools with the Claude API">building two VS Code extensions with the Claude API</a>. But I also used Claude to build a GitHub Triage Tracker and an MCP Prompt Server.

These weren't Earth-shattering apps, but building them increased my Claude knowledge.  Here's the write-up on the latter two tools.

<h2>Table of Contents</h2>

1. [How Claude Works With the Triage Tracker](#how-claude-works)
3. [The Claude API](#claude-api)
4. [What I Built With the Claude API](#what-i-built-with-claude-api)
5. [The Save Selected Text `package.json`](#save-selected-text-package-json)
6. [The Save Selected Text `extension.ts`](#save-selected-text-extension-ts)
7. [Manually Testing In VS Code](#manual-testing)
8. [The Claude Prompt Reader](#claude-prompt-reader)
9. [The Claude Prompt Reader `package.json`](#claude-prompt-reader-package-json)
10. [The Claude Prompt Reader `history.ts`](#claude-prompt-reader-history-ts)
11. [The Claude Prompt Reader `extension.ts`](#claude-prompt-reader-extension-ts)
12. [Conclusion](#conclusion)

<h2 id="how-claude-works">How Claude Works With the Triage Tracker</h2>

For the GitHub Triage Tracker, Claude works pretty much the same way it did with the VS Code extensions. A reminder of how it works:

<ul>
  <li>Claude is stateless: if you're "having a conversation with it" through prompts, it doesn't remember your past prompts. Instead, it sends the past conversation with each new prompt, then uses it as context when it responds.</li>
  <li>Calling the Claude API requires an API key. <a href="https://platform.claude.com/docs/en/api/admin/api_keys/retrieve" title="Get a Claude API key" rel="noopener noreferrer">get a Claude API key here</a>.</li>
</ul>

<h2 id="conclusion">Conclusion</h2>