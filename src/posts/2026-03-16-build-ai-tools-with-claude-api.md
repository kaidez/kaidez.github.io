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
dependencies: "TypeScript, Zod, Claude API, Python"
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
  <li>And most importantly: that, at some point, you will <a href="https://platform.claude.com/docs/en/api/overview" title="Claude API Documentation" aria-label="Read the Claude API documentation" rel="noopener noreferrer">read the Claude API documentation</a> if you haven't already.  Perhaps after you've read this post? &#128522;</li>
</ol>

<h2>How Claude <i>Actually</i> Works</h2>

Most people know Claude as a desktop AI app or a CLI tool favored by coders/developers. But knowing how it works under the hood is important.

At its core, Claude is a powerful, stateless piece of prediction software. You send Claude text and, based on its training, it guesses a response and sends it back.

The word "stateless" is key here. Claude doesn't remember previous conversations...only the one it's having at that very moment.

For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent.  This is how Claude gets the conversation's context.

<em>Side note: that message history clearly gets big...that's why Claude Code will prompt you to run `/compact` from time-to-time. Also, <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching" title="The Claude API's prompt caching feature" aria-label="Read about the prompt caching with the Claude API" rel="noopener noreferrer">Claude's API has a "prompt caching" feature</a> that you can pass to requests.  Doing both of these things can lower your Claude costs.</em>

The word "guesses" is also key: Claude predicts its answer but doesn't "think about it" the way humans do. Instead, it pattern-matches against training data (a ton of human-written text) rather than do so consciously.

Claude is guessing how to respond to prompts it receives. That's different from "<a href="https://www.ibm.com/think/topics/predictive-ai" title="What is Predictive AI" aria-label="Read IBM's definition of Predictive AI?" rel="noopener noreferrer">Predictive AI</a>", which estimates a fixed result — a number, a category, a yes/no — from past data.

Claude doesn't predict a fixed outcome. Instead, it "generates" new content in response to whatever prompt it receives. This is the core definition of "<a href="https://www.ibm.com/think/topics/generative-ai" title="What is Generative AI?" aria-label="Read IBM's definition of Generative AI" rel="noopener noreferrer">Generative AI</a>".

<h2>The Claude API</h2>

So Claude has a brain with really good guessing capabilities. The Claude API lets you pass those capabilities to your applications.

This API is a REST API built on the standard request/response pattern. An application sends a formatted request to a remote server. The server responds to the request by sending structured data back.

At the time of this post's published date, the production-ready version of the Claude API is relatively small.  It has four operations:

<ol>
  <li><b>Messages:</b> Claude's primary API that lets the application send messages to Claude and receive responses as if they were having a conversation.</li>
  <li><b>Messages Batches:</b> processes message requests asynchronously at a reduced cost.</li>
  <li><b>Token Counting:</b> counts the amount of tokens in your request before sending it, helping you manage costs.</li>
  <li><b>Models:</b> lets the application retrieve information about Claude's various models such as Sonnet and Haiku.</li>
</ol>

Two other API operations are in beta as of this writing:

<ol>
  <li><b>Files:</b> sending and receiving files.</li>
  <li><b>Skills:</b> used to create skills for custom agents.</li>
</ol>

<h2>What I Built With the Claude API</h2>

The first three tools I wrote were VS Code extensions that used the Messages API: 

<ol>
  <li><b>Save Selected Text:</b> Right-click on selected text in VS Code to treat it like a prompt sent to the Claude API. Claude then responds to it. <a href="https://github.com/kaidez/save-selected-text" title="Save Selected Text Demo Repository on GitHub" aria-label="Go to the Save Selected Text Demo Repository on GitHub" rel="noopener noreferrer">View the repo</a>.</li>
  <li><b>Claude Prompt Reader:</b> Similar to the Save Selected Text extension except you don't select and right-click on the text. Instead, the VS Code extension launches from the Command Palette, sends the prompt to Claude, then displays the response. <a href="https://github.com/kaidez/claude-prompt-reader" title="Claude Prompt Reader Demo Repository on GitHub" aria-label="Go to the Claude Prompt Reader Demo Repository on GitHub" rel="noopener noreferrer">View the repo</a>.</li>
  <li><b>GitHub Triage Tracker:</b> Fetches the first 10 open issues from Microsoft's VS Code repo. Each issue is then sent to Claude through the Messages API, which classifies its severity, writes a plain-English summary, and suggests a next action for the maintainers. <a href="https://github.com/kaidez/github-issue-triage" title="GitHub Triage Tracker Demo Repository on GitHub" aria-label="Go to the GitHub Triage Tracker Demo Repository on GitHub" rel="noopener noreferrer">View the repo</a>.</li>
</ol>

The fourth project was building <a href="https://www.anthropic.com/news/model-context-protocol" title="Anthropic's Model Context Protocol" aria-label="Read about Anthropic's Model Context Protocol" rel="noopener noreferrer">Model Context Protocol</a> connectors for the Claude Desktop App. Based on your prompt, it looks in a folder of text files and performs one of three commands. <a href="https://github.com/kaidez/mcp-prompt-server" title="MCP Prompt Server Repository on GitHub" aria-label="Go to the MCP Prompt Server Repository on GitHub" rel="noopener noreferrer">View the repo</a>.

The code is mostly the same across the three VS Code extensions.  So I'll walk through what the first one does while pointing out the unique code blocks of the other two.

<h2>Save Selected Text Extension</h2>

<pre><code class="language-javascript">
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('save-selected-text.saveSelection', async () => {

    // Guard check 1: is there an active editor?
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found.');
      return;
    }

    // Guard check 2: is there a selected text?
    const selectedText = editor.document.getText(editor.selection);
    if (!selectedText) {
      vscode.window.showErrorMessage('No text selected. Please highlight some text first.');
      return;
    }

    // Guard check 3: is there a workspace folder open?
    const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspacePath) {
      vscode.window.showErrorMessage('No workspace folder found.');
      return;
    }

    // Get config values
    const apiKey = vscode.workspace.getConfiguration('saveSelectedText').get<string>('apiKey');
    if (!apiKey) {
      vscode.window.showErrorMessage('No API key found. Please add it in Settings → Save Selected Text → Api Key.');
      return;
    }

    const claudeModel = vscode.workspace.getConfiguration('saveSelectedText')
      .get<string>('chooseYourModel') ?? 'claude-sonnet-4-6';

    // Create prompts folder if it doesn't exist
    const promptsPath = path.join(workspacePath, 'prompts');
    if (!fs.existsSync(promptsPath)) {
      fs.mkdirSync(promptsPath);
    }

    // Save selected text to a timestamped file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `prompt-${timestamp}.txt`;
    const filePath = path.join(promptsPath, fileName);

    vscode.window.showInformationMessage(`Saved "${fileName}" — sending to Claude...`);

    const client = new Anthropic({ apiKey });

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Claude is thinking...`,
      cancellable: false
    }, async () => {
      try {
        const message = await client.messages.create({
          model: claudeModel,
          max_tokens: 1024,
          messages: [{ role: 'user', content: selectedText }]
        });

        const response = message.content[0].type === 'text'
          ? message.content[0].text
          : 'No response received.';

        // save the selected text to the file after getting the response, so we don't create files for failed API calls
        fs.writeFileSync(filePath, selectedText, 'utf8');

        const doc = await vscode.workspace.openTextDocument({
          content: `SELECTED TEXT:\n${selectedText}\n\n---\n\nCLAUDE'S RESPONSE:\n${response}`,
          language: 'markdown'
        });

        await vscode.window.showTextDocument(doc);

      } catch (error) {
        vscode.window.showErrorMessage(`Claude API error: ${error}`);
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
</code></pre>

Breaking this down...

<pre><code class="language-javascript">
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
...
</code></pre>

We're importing the entire `vscode` module so our code can interact with the VS Code editor. We're also importing Node's `fs` and `path` modules to read/write files and build file paths.

The Anthropic SDK is imported so we can send API requests to the Claude Messages API.