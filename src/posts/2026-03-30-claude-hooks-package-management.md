---
title: "What /insights Taught Me About My Claude Workflow"
date: 2026-03-30T12:00:00-02:00
excerpt: "Running Claude Code's /insights command led me down a rabbit hole, but I came out the other side with better package management and automated build reporting."
layout: layouts/post.njk
draft: true
permalink: /claude-insights-hooks-package-management/
image: claude-insights.jpg
tags: ["coding-best-practices"]
secondary_tags: ["ai", "claude"]
category: Coding Tips
schema_type: "TechArticle"
---
I built up a lot of AI prompt habits when I was writing my <a href="/building-ai-tools-claude-api/" title="Building AI Tools with the Claude API">Claude API tooling post</a>. I reviewed them using `/insights`, a Claude Code slash command that summarizes your last 30 days of usage and session activity. <a href="/samples/claude-report-sample.html" title="Read a sample Claude Code /insights report">Read a sample <code>/insights</code> report</a>.

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

<h2>3. Building a Safety Net With Claude Code Hooks</h2>

I discovered the broken package versions the hard way: build failures on every deploy.

When I pushed to GitHub, a GitHub Actions deployment kept failing. The issues related to the `typescript` and `@11ty/eleventy-plugin-rss` packages broke the build every time.

Claude Code supports <a href="https://code.claude.com/docs/en/hooks" title="Read about Claude Code Hooks" rel="noopener noreferrer">hooks</a>: shell scripts that fire in response to tool events. A `PostToolUse` hook on the `Bash` tool fires after any terminal command Claude runs.

So every time `npm install` runs, the hook detects it and kicks off a production build. Then the hook writes a timestamped Markdown report to `.claude/reports/` every time it runs.

To test it: I reverted `package.json` to the broken state and ran `npm install`. The build failed, the hook caught it, and the report showed exactly why — the RSS plugin incompatibility.

Then I ran `git reset --hard HEAD`, ran `npm install` again, and the next report came back PASSED.

You can <a href="https://github.com/kaidez/kaidez.github.io/blob/dev-branch/.claude/hooks/post-npm-install.sh" title="View the post-npm-install hook script on GitHub" rel="noopener noreferrer">view my hook script</a> on GitHub. You can also review both <a href="https://github.com/kaidez/kaidez.github.io/blob/dev-branch/.claude/reports/build-2026-03-27T18-34-38_SUCCESS_SAMPLE.md" title="Read a successful build report" rel="noopener noreferrer">an example of a successful report</a> and <a href="https://github.com/kaidez/kaidez.github.io/blob/dev-branch/.claude/reports/build-2026-03-27T18-46-33_FAILED_SAMPLE.md" title="Read a failed report" rel="noopener noreferrer">an example of a failed report</a>.

<h2>Conclusion</h2>

I'm still learning what Claude Code can do. The `/insights` command didn't hand me a to-do list — it just prompted me to look more carefully.

The problems I found and fixed today weren't dramatic. But they were real, and they were invisible until I went looking.

That's the part I keep noticing as I work with Claude more: it's not just about what you ask it to do. It's about what it prompts you to think about.

The end-all-be-all rule about Claude is, it's only as useful as the questions you bring to it. I'm getting better at asking them.