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
I needed a firmer understanding on how Claude's API works, so I built four quick tools in Visual Studio Code. Alongside those two tools, I also used TypeScript (naturally), and Mocha for testing.

As things progressed, I also gained an even firmer understanding of how all this works from an integration engineering standpoint. That may be the even <i>bigger</i> payoff!!!

<h2>Assumptions</h2>

I'm assuming that you're familiar with the Generative AI landscape that's so prevalent at the time of this post. And if you want to use Claude to do all this, I'm also assuming the following:

<ol>
  <li>That you have the <a href="https://claude.com/download">Claude Desktop</a> app (the $20USD/month kind of app at the bare minimum).</li>
  <li>That you have a Claude API key...get one <a href="https://platform.claude.com/settings/keys">here</a> if you don't.</li>
  <li>That you're willing to pay for Claude API credits if needed.</li>
  <li>And most importantly: that, at some point, you will <a href="https://platform.claude.com/docs/en/home">read the Claude API documentation</a> if you haven't already.  Perhaps after you've read his post? &#128522;</li>
</ol>

<h2>Understanding How Claude <i>Actually</i> Works</i></h2>

Most people know Claude as a powerful desktop AI app or a powerful CLI tool favored by coders/developers. But understanding how it works under the hood is important:

At its core, Claude is a powerful, stateless piece of prediction software. You send Claude text and, based on its training, it guesses a response and sends it back.

The word "stateless" is key here. Claude doesn't remember previous conversations...only the one it's having at that very moment.

For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent.  This is how Claude gets the conversation's context.

<em>Side note: that message history obviously gets big. That's why Claude Code will prompt you to run `/compact`  from time-to-time. Also, <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching">Claude's API has a "prompt caching" feature</a> that you can pass to requests.  Doing both of these things can lower your Claude costs.</em>

The word "guesses" is also fundamental. Claude predicts its answer, but it doesn't "think" the way humans do.

Claude isn't reasoning through a response the way a human would. Instead, it pattern-matches on training data (a ton of human-written text) instead of engaging in conscious thinking.