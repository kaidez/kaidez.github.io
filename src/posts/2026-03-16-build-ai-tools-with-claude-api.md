---
title: "Building AI Tools with the Claude API: What I Learned"
date: 2026-03-16T12:00:00-02:00
excerpt: "What I learned building AI tools with the Claude API: stateless conversations, Zod for LLM output validation, and keeping costs low."
draft: true
layout: layouts/post.njk
permalink: /building-ai-tools-claude-api/
image:
tags: ["coding-best-practices"]
secondary_tags: ["claude", "ai", "typescript"]
category: Coding Tips
schema_type: "TechArticle"
dependencies: "TypeScript, Zod, Claude API"
proficiency_level: "Intermediate"
---
I needed a firmer grasp on how Claude's API works, so I built four quick tools in Visual Studio Code. Alongside Claude and VS Code, I also used TypeScript (naturally), and Mocha for testing.

As things progressed, I also gained an even firmer grasp of proper approaches to system design and integration engineering. That may be the even <i>bigger</i> payoff!!!

<h2>Assumptions</h2>

I assume that you're familiar with the Generative AI landscape that's so common at the time of this post. And if you want to use Claude to do all this, I'm also assuming the following:

<ol>
  <li>That you have the <a href="https://claude.com/download" title="Claude Desktop App" aria-label="Download a Claude Desktop app" rel="noopener noreferrer">Claude Desktop</a> app (the $20USD/month kind of app at the bare minimum).</li>
  <li>That you have a Claude API key...if you don't have one, <a href="https://platform.claude.com/settings/keys" title="Claude API Key" aria-label="Get a Claude API key" rel="noopener noreferrer">get a Claude API key here</a>.</li>
  <li>That you're willing to pay for Claude API credits if needed.</li>
  <li>And most importantly: that, at some point, you will <a href="https://platform.claude.com/docs/en/home" title="Claude API Documentation" aria-label="Read the Claude API documentation" rel="noopener noreferrer">read the Claude API documentation</a> if you haven't already.  Perhaps after you've read this post? &#128522;</li>
</ol>

<h2>How Claude <i>Actually</i> Works</h2>

Most people know Claude as a powerful desktop AI app or a powerful CLI tool favored by coders/developers. But knowing how it works under the hood is important:

At its core, Claude is a powerful, stateless piece of prediction software. You send Claude text and, based on its training, it guesses a response and sends it back.

The word "stateless" is key here. Claude doesn't remember previous conversations...only the one it's having at that very moment.

For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent.  This is how Claude gets the conversation's context.

<em>Side note: that message history clearly gets big...that's why Claude Code will prompt you to run `/compact` from time-to-time. Also, <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching" title="The Claude API's prompt caching feature" aria-label="Read about the prompt caching with the Claude API" rel="noopener noreferrer">Claude's API has a "prompt caching" feature</a> that you can pass to requests.  Doing both of these things can lower your Claude costs.</em>

The word "guesses" is also key: Claude predicts its answer but doesn't "think about it" the way humans do. Instead, it pattern-matches against training data (a ton of human-written text) rather than do so consciously.

Claude is guessing how to respond to prompts it receives. That's different from "<a href="https://www.ibm.com/think/topics/predictive-ai" title="What is Predictive AI" aria-label="Read IBM's definition of Predictive AI?" rel="noopener noreferrer">Predictive AI</a>", which estimates a fixed result — a number, a category, a yes/no — from past data.

Claude doesn't predict a fixed outcome. Instead, it "generates" new content in response to whatever prompt it receives. This is the core definition of "<a href="https://www.ibm.com/think/topics/generative-ai" title="What is Generative AI?" aria-label="Read IBM's definition of Generative AI" rel="noopener noreferrer">Generative AI</a>".

<h2>The Claude API</h2>

So Claude has a brain with really good guessing capabilities. The Claude API allows you to pass those capabilities to your applications.

