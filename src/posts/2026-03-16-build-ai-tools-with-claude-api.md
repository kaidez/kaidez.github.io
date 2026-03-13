---
title: "Building AI Tools with the Claude API: What I Learned"
date: 2026-03-16T12:00:00-02:00
excerpt: "What I learned building AI tools with the Claude API: stateless conversations, Zod for LLM output validation, and keeping costs low."
draft: true
layout: layouts/post.njk
permalink: /building-ai-tools-claude-api/
image:
tags: ["coding-best-practices"]
secondary_tags: ["claude", "ai", "typescript", "zod"]
category: Coding Tips
schema_type: "TechArticle"
dependencies: "TypeScript, Zod, Claude API"
proficiency_level: "Intermediate"
---
I needed a firmer understanding on how Claude's API works, so I built four quick tools in Visual Studio Code. Alongside Claude, the core tooling for all this was Visual Studio Code, TypeScript (naturally), and Mocha.

As things progressed, I also gained an even firmer understanding of how all this works from an integration engineering standpoint. That may be the even <i>bigger</i> payoff!!!

<h2>Assumptions</h2>

I'm assuming that you're familiar with the Generative AI landscape that's so prevalent at the time of this post. As far as Claude is concerned, I'm also assuming the following:

<ol>
  <li>That you have a Claude Desktop account (the $20USD/month kind of account at the bare minimum).</li>
  <li>That you're willing to pay for Claude API credits if needed.</li>
  <li>That you have a Claude API key...get one <a href="https://platform.claude.com/settings/keys">here</a> if you don't.
  <li>And most importantly: that, at some point, you <a href="https://platform.claude.com/docs/en/home">read the Claude API documentation</a> if you haven't already.  Perhaps after you've read his post? &#128522;</li>
</ol>