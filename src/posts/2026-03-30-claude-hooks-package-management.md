---
title: "What /insights Taught Me About My Claude Workflow"
date: 2026-03-30T12:00:00-02:00
excerpt: "Running Claude Code's /insights command led me down a rabbit hole — and I came out the other side with better package management and automated build reporting."
layout: layouts/post.njk
draft: true
permalink: /claude-insights-hooks-package-management/
image: claude-insights.jpg
tags: ["coding-best-practices"]
secondary_tags: ["ai", "claude"]
category: Coding Tips
schema_type: "TechArticle"
---
I built up a lot of AI prompt habits when I was writing my <a href="/building-ai-tools-claude-api/" title="Building AI Tools with the Claude API">Claude API tooling post</a>. I reviewed them using `/insights`, a Claude Code slash command that reports on the last 30 days of your usage patterns and session activity.


After reviewing, I came up with things that would increase my workflow and productivity. Three things in total:

<h2>1. A Post Review Command</h2>

After writing a new paragraph or two, I'd tell Claude to review it for SEO-friendliness and clarity. My `/insights` report said I wasted too much time "prompting out" the request manually.

As a result, I created a `/review-post` slash command. It does the following:

- Reviews the text clarity.
- Confirms that all `<a>` and `<img>` tags are SEO-friendly.
- Computes a <a href="https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests" title="Flesch-Kincaid readability score" rel="noopener noreferrer">Flesch-Kincaid readability score</a> to see how easy-to-read the post is.

<h2>2. Prevent Certain Packages From Being Updated</h2>

I LOOOOOOOOVE constantly checking if my npm dependencies are up-to-date and use `npx npm-check-updates -u` to do just that. But two packages needed to stay locked to specific versions — upgrading either one would break the build:

- **`typescript`** — locked to `5.9.3` because `ts-jest@29` breaks with TypeScript 6+
- **`@11ty/eleventy-plugin-rss`** — locked to `^2.0.0` because v3 is ESM-only, and this project uses CommonJS

Locked or not, `npm-check-updates` doesn't know or care about those constraints. It sees a newer version on the registry and updates `package.json` every time. The next `npm install` would then silently install broken versions.

The fix was to exclude them from update checks automatically with an `.ncurc` config file at the project root:

<pre><code class="language-yaml">
reject:
  - typescript
  - "@11ty/eleventy-plugin-rss"
</code></pre>

One less thing to worry about.

<h2>Building a Safety Net With Claude Code Hooks</h2>

The second thing I did was add a hook that runs `npm run build:prod` automatically after every `npm install` — before anything gets committed or pushed.

Claude Code supports [hooks](https://platform.claude.com/docs/en/hooks.html): shell scripts that fire in response to tool events. A `PostToolUse` hook on the `Bash` tool fires after any terminal command Claude runs. I used that to detect `npm install` and kick off a production build.

The hook also writes a timestamped Markdown report to `.claude/reports/` every time it runs:

<pre><code class="language-markdown"># Build Report: 2026-03-27T18-46-33

**Status:** &lt;span style="color: red;"&gt;FAILED&lt;/span&gt;
**Command:** `npm run build:prod`
**Triggered by:** `npm install`

## Output
...eleventy fatal error: Invalid plugin signature...
</code></pre>

That report was generated during a test run where I intentionally reverted `package.json` to the broken state. The build failed, the hook caught it, and the report showed exactly why — the RSS plugin incompatibility.

Then I ran `git reset --hard HEAD`, ran `npm install` again, and the next report came back **PASSED**.

<h2>The Bigger Takeaway</h2>

I'm still learning what Claude Code can do. The `/insights` command didn't hand me a to-do list — it just prompted me to look more carefully. The problems I found and fixed today weren't dramatic. But they were real, and they were invisible until I went looking.

That's the part I keep noticing as I work with Claude more: it's not just about what you ask it to do. It's about what it prompts you to think about. The tool is only as useful as the questions you bring to it — and I'm getting better at asking them.
