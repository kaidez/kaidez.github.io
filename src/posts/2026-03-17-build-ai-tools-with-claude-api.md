---
title: "Building AI Tools with the Claude API: What I Learned"
date: 2026-03-17T12:00:00-02:00
excerpt: "What I learned building AI tools with the Claude API: stateless conversations, Zod for LLM output validation, and keeping costs low."
draft: true
layout: layouts/post.njk
permalink: /building-ai-tools-claude-api/
image: claude-api.jpg
tags: ["coding-best-practices"]
secondary_tags: ["claude", "ai", "typescript"]
category: Coding Tips
schema_type: "TechArticle"
dependencies: "TypeScript, Zod, Claude API, Python"
proficiency_level: "Intermediate"
---
I needed a firmer grasp on how Claude's API works, so I built four quick tools in Visual Studio Code. Alongside Claude and VS Code, I also used TypeScript (naturally), and Mocha for testing.

As things progressed, I also came away with a deeper understanding of system design and integration engineering. That may be the even <i>bigger</i> payoff!

<h2>Table of Contents</h2>

1. [Assumptions](#assumptions)
2. [How Claude <i>Actually</i> Works](#how-claude-works)
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

<h2 id="assumptions">Assumptions</h2>

I assume that you're familiar with the Generative AI landscape that's so common at the time of this post. And if you want to use Claude to do all this, I'm also assuming the following:

<ol>
  <li>That you have the <a href="https://claude.com/download" title="Claude Desktop App" aria-label="Download a Claude Desktop app" rel="noopener noreferrer">Claude Desktop</a> app (the $20USD/month kind of app at the bare minimum).</li>
  <li>That you have a Claude API key...if you don't have one, <a href="https://platform.claude.com/settings/keys" title="Claude API Key" aria-label="Get a Claude API key" rel="noopener noreferrer">get a Claude API key here</a>.</li>
  <li>That you're willing to pay for Claude API credits if needed.</li>
  <li>And most importantly: that, at some point, you will <a href="https://platform.claude.com/docs/en/api/overview" title="Claude API Documentation" aria-label="Read the Claude API documentation" rel="noopener noreferrer">read the Claude API documentation</a> if you haven't already. Perhaps after you've read this post? &#128522;</li>
</ol>

Lastly, it's best practice to scaffold out the codebase for a VS Code extension with <a href="https://yeoman.io/" title="Yeoman Scaffolding Tool" aria-label="Scaffold out your web application with Yeoman" rel="noopener noreferrer">Yeoman</a>. I'll point out the VS Code-specific code snippets that Yeoman generates, but I assume you can handle the setup.

Read the documentation on <a href="https://code.visualstudio.com/api/get-started/your-first-extension" title="Create a VS Code extension codebase" aria-label="Read how to create a VS Code extension codebase" rel="noopener noreferrer">how to scaffold out the codebase for VS Code extensions</a>.

<h2 id="how-claude-works">How Claude <i>Actually</i> Works</h2>

Most people know Claude as a desktop AI app or a CLI tool favored by developers. But knowing how it works under the hood is important.

At its core, Claude is a powerful, stateless piece of prediction software. You send Claude text and, based on its training, it guesses a response and sends it back.

The word "stateless" is key here. Claude doesn't remember previous conversations...only the one it's having at that very moment.

For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent. This is how Claude gets the conversation's context.

<em>Side note: obviously, that message history can get big...that's why Claude Code will prompt you to run `/compact` from time-to-time. Also, <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching" title="The Claude API's prompt caching feature" aria-label="Read about the prompt caching with the Claude API" rel="noopener noreferrer">Claude's API has a "prompt caching" feature</a> that you can pass to requests. Doing both of these things can lower your Claude costs.</em>

The word "guesses" is also key: Claude predicts its answer but doesn't "think about it" like humans do. Instead, it pattern-matches against training data (a ton of human-written text) rather than reasoning through it consciously.

Claude is guessing how to respond to prompts it receives. That differs from "<a href="https://www.ibm.com/think/topics/predictive-ai" title="What is Predictive AI" aria-label="Read IBM's definition of Predictive AI?" rel="noopener noreferrer">Predictive AI</a>", which outputs a fixed result — a number, a category, a yes/no.

Claude doesn't predict a fixed outcome. Instead, it "generates" new content in response to whatever prompt it receives. This is the core definition of "<a href="https://www.ibm.com/think/topics/generative-ai" title="What is Generative AI?" aria-label="Read IBM's definition of Generative AI" rel="noopener noreferrer">Generative AI</a>".

<h2 id="claude-api">The Claude API</h2>

So Claude has a brain with really good guessing capabilities. The Claude API lets you pass those capabilities to your applications.

This API is a REST API built on the standard request/response pattern. An application sends a formatted request to a remote server. The server responds to the request by sending structured data back.

At the time of this post's published date, the stable version of the Claude API is relatively small. It has four operations:

<ol>
  <li><b>Messages:</b> Claude's primary API for sending messages to Claude and receiving responses as if a conversation was going on.</li>
  <li><b>Messages Batches:</b> processes message requests asynchronously at a reduced cost.</li>
  <li><b>Token Counting:</b> counts the amount of tokens in your request before sending it, helping you manage costs.</li>
  <li><b>Models:</b> lets the application retrieve information about Claude's various models such as Sonnet and Haiku.</li>
</ol>

Two other API operations are in beta as of this writing:

<ol>
  <li><b>Files:</b> sending and receiving files.</li>
  <li><b>Skills:</b> used to create skills for custom agents.</li>
</ol>

<h2 id="what-i-built-with-claude-api">What I Built With the Claude API</h2>

The first three tools I wrote were VS Code extensions that used the Messages API: 

<ol>
  <li><b>Save Selected Text:</b> Right-click on selected text in VS Code to treat it like a prompt sent to Claude. Claude then responds to it via its API and saves its response in a text file. <a href="https://github.com/kaidez/save-selected-text" title="Save Selected Text Demo Repository on GitHub" aria-label="Go to the Save Selected Text Demo Repository on GitHub" rel="noopener noreferrer">View the repo</a>.</li>
  <li><b>Claude Prompt Reader:</b> Similar to the Save Selected Text extension except you don't select and right-click on the text. Instead, the VS Code extension launches from the Command Palette, sends the prompt to Claude, then displays the response. <a href="https://github.com/kaidez/claude-prompt-reader" title="Claude Prompt Reader Demo Repository on GitHub" aria-label="Go to the Claude Prompt Reader Demo Repository on GitHub" rel="noopener noreferrer">View the repo</a>.</li>
  <li><b>GitHub Triage Tracker:</b> Fetches the first 10 open issues from Microsoft's VS Code repo. Each issue is sent to Claude via the Messages API. Claude classifies its severity, writes a plain-English summary, and suggests a next action for the maintainers. <a href="https://github.com/kaidez/github-issue-triage" title="GitHub Triage Tracker Demo Repository on GitHub" aria-label="Go to the GitHub Triage Tracker Demo Repository on GitHub" rel="noopener noreferrer">View the repo</a>.</li>
</ol>

The fourth project was building <a href="https://www.anthropic.com/news/model-context-protocol" title="Anthropic's Model Context Protocol" aria-label="Read about Anthropic's Model Context Protocol" rel="noopener noreferrer">Model Context Protocol</a> connectors for the Claude Desktop App. Based on your prompt, the server looks in a folder of text files and performs one of three commands. <a href="https://github.com/kaidez/mcp-prompt-server" title="MCP Prompt Server Repository on GitHub" aria-label="Go to the MCP Prompt Server Repository on GitHub" rel="noopener noreferrer">View the repo</a>.

The code is mostly the same across the three VS Code extensions. So I'll walk through what the first one does while pointing out the unique code blocks of the other two.

<h2 id="save-selected-text-package-json">The Save Selected Text <code>package.json</code></h2>

You can <a href="https://github.com/kaidez/save-selected-text/blob/main/package.json" title="Save Selected Text VS Code extension for package.json" aria-label="Review the package.json for Save Selected Text VS Code extension" rel="noopener noreferrer">view the complete `package.json` file</a> on the repo. But here are the core configs as they relate to VS Code extensions:

<pre><code class="language-javascript">
// package.json
...
"engines": {
  "vscode": "^1.74.0"
},
"categories": [
  "Other"
],
"main": "./out/extension.js",
"activationEvents": [],
...
"contributes": {
  "commands": [
    {
      "title": "Claude: Save Selected Text",
      "command": "save-selected-text.saveSelection",
    }
  ],
  "menus": {
    "editor/context": [
      {
        "command": "save-selected-text.saveSelection",
        "when": "editorHasSelection",
        "group": "navigation"
      }
    ]
  },
  "configuration": {
    "title": "Save Selected Text",
    "properties": {
      "saveSelectedText.apiKey": {
        "type": "string",
        "default": "",
        "description": "Your Anthropic API key"
      },
      "saveSelectedText.chooseYourModel": {
        "type": "string",
        "default": "claude-haiku-4-5-20251001",
        "enum": [
          "claude-haiku-4-5-20251001",
          "claude-sonnet-4-6",
          "claude-opus-4-6"
        ],
        "enumDescriptions": [
          "Claude Haiku — fastest and most affordable",
          "Claude Sonnet — balanced speed and intelligence (recommended)",
          "Claude Opus — most powerful, slower and more expensive"
        ],
        "description": "Select which Claude model to use"
      }
    }
  },
  ...
  "dependencies": {
    "@anthropic-ai/sdk": "^0.78.0"
  }
}
</code></pre>

`engines` refers to the minimum version VS Code needs to run the extension: version 1.74 in this case. `categories` refers to how the extension should be categorized in the VS Code Extension marketplace.

`main` is the entry point for our app. In this case, it's `extension.ts`.

`activationEvents` controls when the extension loads and `contributes` registers commands/menus/settings. In VS Code 1.74+, `activationEvents` entries are optional — VS Code infers activation from `contributes`.

Developers targeting 1.74+ often keep `activationEvents` to signal they chose automatic activation. So I left it there to do just that.

The extension gets triggered by selecting a menu item with a right-click. In `contributes.commands[]`, the `title` value defines the command's label in the menu.

That's ("Claude: Save Selected Text") in this case. It looks like this when in action:

<img src="/assets/img/save-selected-text-menu.jpg" alt="Screenshot of the Save Selected Text right-click context menu in VS Code" />

`command` registers the unique command ID with VS Code.

In `menus["editor/context"][]`, the `command` value needs to be added, and <i>must</i> match the value in `contributes.commands[]`. `when` defines when the menu appears — when text is selected in this case. `group` decides which menu group the item appears in — `navigation` in this case.

The `configuration` object defines how the extension gets configured in VS Code's "Settings" window.

This object defines the extension name, input fields, and their descriptions in VS Code Settings. The `enum` array forces a dropdown menu of options to select. `enumDescriptions` creates a one-to-one mapping of the description of the items in `enum`.

The Anthropic SDK is needed to interact with Claude remotely and has been brought in as a dependency.

<h2 id="save-selected-text-extension-ts">The Save Selected Text <code>extension.ts</code></h2>

Your extension file can be named whatever you want, but a Yeoman-generated scaffold automatically names it `extension.ts`.

<pre><code class="language-javascript">
// extension.ts

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('save-selected-text.saveSelection', async () => {

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found.');
      return;
    }

    const selectedText = editor.document.getText(editor.selection);
    if (!selectedText) {
      vscode.window.showErrorMessage('No text selected. Please highlight some text first.');
      return;
    }

    const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspacePath) {
      vscode.window.showErrorMessage('No workspace folder found.');
      return;
    }

    const apiKey = vscode.workspace.getConfiguration('saveSelectedText').get<string>('apiKey');
    if (!apiKey) {
      vscode.window.showErrorMessage('No API key found. Please add it in Settings → Save Selected Text → Api Key.');
      return;
    }

    const claudeModel = vscode.workspace.getConfiguration('saveSelectedText').get<string>('chooseYourModel') ?? 'claude-haiku-4-5-20251001';

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

We're importing the entire `vscode` module so our code can interact with the VS Code editor. We're also importing Node's `fs` and `path` modules to, respectively, read/write files and build file paths.

The Anthropic SDK is imported so we can send API requests to the Claude Messages API.

<pre><code class="language-javascript">
export function activate(context: vscode.ExtensionContext) {
  ...
} 

`export function deactivate() { }`
</code></pre>

The function that connects our extension to VS Code. It <i>must</i> be named `activate`.

It must also take a `context` parameter to access methods on the `vscode` object. For TypeScript's strong-typing requirements, the param <i>must</i> be typed as `vscode.ExtensionContext`.

`deactivate()` does exactly what it says...it "deactivates" our extension on shutdown.

<pre><code class="language-javascript">
let disposable = vscode.commands.registerCommand('save-selected-text.saveSelection', async () => {
  ...
});
context.subscriptions.push(disposable);
</code></pre>

`disposable` is the variable that connects the extension to VS Code. It doesn't <i>have</i> to be named `disposable`: Yeoman just does this by default.

But I'm guessing Yeoman does this to silently reference VS Code's internal `Disposable` object. `vscode.commands.registerCommand()` returns `Disposable`, which has the method `dispose()`. And `Disposable.dispose()` unregisters the command and releases its resources.

`context.subscriptions.push(disposable)` registers that `disposable` with the extension context. VS Code calls `dispose()` when the extension is deactivated — for any reason: a closed window, VS Code shutting down, etc.

<pre><code class="language-javascript">
...
const editor = vscode.window.activeTextEditor;
if (!editor) {
  vscode.window.showErrorMessage('No active editor found.');
  return;
}

const selectedText = editor.document.getText(editor.selection);
if (!selectedText) {
  vscode.window.showErrorMessage('No text selected. Please highlight some text first.');
  return;
}

const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
if (!workspacePath) {
  vscode.window.showErrorMessage('No workspace folder found.');
  return;
}
...
</code></pre>

`disposable`'s first job is to confirm if all of the following is true:

<ol>
  <li> There's an open editor window.</li>
  <li> There's selected text.</li>
  <li> There's a VS Code workspace.</li>
</ol>

If any of those things are false, a `return` is fired off and exits that function early.

<pre><code class="language-javascript">
const apiKey = vscode.workspace.getConfiguration('saveSelectedText').get<string>('apiKey');
if (!apiKey) {
  vscode.window.showErrorMessage('No API key found. Please add it in Settings → Save Selected Text → Api Key.');
  return;
}

const claudeModel = vscode.workspace.getConfiguration('saveSelectedText').get<string>('chooseYourModel') ?? 'claude-haiku-4-5-20251001';
</code></pre>

`const apiKey` and `const claudeModel` are, your Claude API key and model-selection dropdown as the appear in VS Code Settings. They're located with the help of the `getConfiguration()` method.

`claude-haiku-4-5-20251001` is the default — used when no model is manually selected. At this post's publish date, Haiku is cheapest per token.

<pre><code class="language-javascript">
const promptsPath = path.join(workspacePath, 'prompts');
if (!fs.existsSync(promptsPath)) {
  fs.mkdirSync(promptsPath);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const fileName = `prompt-${timestamp}.txt`;
const filePath = path.join(promptsPath, fileName);

vscode.window.showInformationMessage(`Saved "${fileName}" — sending to Claude...`);
</code></pre>

First, Node's `fs` functionality checks if a `prompts` folder exists. It creates one on the fly if it doesn't.

Next, three things happen:

<ol>
  <li>The current date and time are stored in <code>const timestamp</code> using JavaScript's <code>Date()</code> object.</li>
  <li><code>timestamp</code> is used to create a file name that's stored in <code>const fileName</code>.</li>
  <li>Using Node's <code>path</code> functionality, <code>promptsPath</code> and <code>fileName</code> are combined into a full file path. That path is stored in <code>const filePath</code>.</li>
</ol>

Finally, VS Code displays an information message and sends the selected text to the Claude API. The file is only written to disk after Claude responds successfully. This prevents files from being created when an API call fails.

<pre><code class="language-javascript">
const client = new Anthropic({ apiKey });

await vscode.window.withProgress({
  location: vscode.ProgressLocation.Notification,
  title: `Claude is thinking...`,
  cancellable: false
}, async () => {
  ...
})
</code></pre>

`const client` is an instance of the Anthropic SDK, initialized with the API key from VS Code's settings. We'll use that shortly to make a request to the Claude API.

`vscode.window.withProgress` configures the progress notification appearing at the bottom-right corner of the screen. It displays the text "Claude is thinking...".

We could put a Cancel button in that notification but choose not to. So we pass a `cancellable: false` value to our `withProgress` call.

<pre><code class="language-javascript">
async () => {
  try {
    const message = await client.messages.create({
      model: claudeModel,
      max_tokens: 1024,
      messages: [{ role: 'user', content: selectedText }]
    });

    const response = message.content[0].type === 'text'
      ? message.content[0].text
      : 'No response received.';

    fs.writeFileSync(filePath, selectedText, 'utf8');

    const doc = await vscode.workspace.openTextDocument({
      content: `SELECTED TEXT:\n${selectedText}\n\n---\n\nCLAUDE'S RESPONSE:\n${response}`,
      language: 'markdown'
    });

    await vscode.window.showTextDocument(doc);

  } catch (error) {
    vscode.window.showErrorMessage(`Claude API error: ${error}`);
  }
}
</code></pre>

This callback makes the API request, handles Claude's response, and processes the returned text. It's wrapped in a standard JavaScript `try/catch` block.

The request is in `const message = await client.messages.create()`. It includes the model chosen in VS Code settings — the model that processes our prompt.

It defines the maximum number of tokens in Claude's response. It also defines who's sending the message, the `user`, and the content of the message.

`const response` is a string extracted from Claude's response object. It does a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator">ternary check</a> for if the `message.content[0]` is a text block, then pulls the text from it.

`response` contains Claude's response to our prompt (the selected text). It will be placed in a Markdown file (`const doc`) headlining our prompt as "SELECTED TEXT", and Claude's response to it headlined as 'CLAUDE'S RESPONSE'.

The selected text is saved to the `prompts` folder. A separate document showing both the prompt and Claude's response is then opened in a new VS Code tab.

<h2 id="manual-testing">Manually Testing In VS Code</h2>

Testing this is pretty straightforward. Open `extension.ts`, then click "Run > Start Debugging".

It's here where you both enter your Claude API key and choose which model you want to use. You would do this in "Code > Settings > Settings" on a Mac, or "File > Preferences > Settings" on a Windows PC.

<img src="/assets/img/vs-code-settings-menu.jpg" alt="Screenshot of the Save Selected Text extension settings in VS Code" />

And when the extension gets put to work in VS Code, it will work like this:

<img src="/assets/img/claude-save-select-text.gif" alt="Animated demo of the Save Selected Text VS Code extension in action" />

A new document shows the prompt under SELECTED TEXT and Claude's reply under CLAUDE'S RESPONSE. Plus, our prompt is saved in a time-stamped filename in our `prompts` folder. The `prompts` folder didn't exist when the extension ran, so one was created on the fly.

<h2 id="claude-prompt-reader">The Claude Prompt Reader</h2>

Where the "Save Selected Text" extension starts by right-clicking on text, the Claude Prompt Reader starts from the VS Code Command Palette. This extension looks an open text file and treats its text as our new prompt, then sends it out to the Claude API.

Also, the chat history is saved in a `history` folder in a JSON file.

<h2 id="claude-prompt-reader-package-json">The Claude Prompt Reader <code>package.json</code></h2>

You can <a href="https://github.com/kaidez/claude-prompt-reader/blob/main/package.json" title="Claude Prompt Reader VS Code extension for package.json" aria-label="Review the package.json for Claude Prompt Reader VS Code extension" rel="noopener noreferrer">review the prompt reader's `package.json`</a> file. There are slight differences between it and the Save Selected Text JSON file:

<pre><code class="language-javascript">
{
// package.json
...
"contributes": {
  "commands": [
    {
      "title": "Claude Prompt Reader: Read Prompts",
      "command": "claude-prompt-reader.readPrompts"
    },
    {
      "title": "Claude Prompt Reader: Clear History",
      "command": "claude-prompt-reader.clearHistory"
    }
  ],
  "configuration": {
    "title": "Claude Prompt Reader",
    "properties": {
      "claudePromptReader.apiKey": {
        "type": "string",
        "default": "",
        "description": "Your Anthropic API key"
      },
      "claudePromptReader.modelDropdown": {
        "type": "string",
        "default": "claude-haiku-4-5-20251001",
        "enum": [
          "claude-haiku-4-5-20251001",
          "claude-sonnet-4-6",
          "claude-opus-4-6"
        ],
        "enumDescriptions": [
          "Claude Haiku — fastest and most affordable",
          "Claude Sonnet — balanced speed and intelligence (recommended)",
          "Claude Opus — most powerful, slower and more expensive"
        ],
        "description": "Select which Claude model to use for processing prompts"
      }
    }
  }
}
...
}
</code></pre>

A second command, `clearHistory`, is added. There's no `menus` section; therefore, this extension launches from the Command Palette by default instead of a right-click menu. And the `model` config property is renamed to `modelDropdown`.

VS Code uses `claudePromptReader` as the configuration namespace for this extension's settings. It's of VS Code finds it

it's how VS Code finds our extension.

<h2 id="claude-prompt-reader-history-ts">The Claude Prompt Reader <code>history.ts</code></h2>

`history.ts` is a helper file used by the prompt reader's `extension.ts`. It exports both a TypeScript interface and four helper methods.

<pre><code class="language-javascript">
// history.ts

import * as fs from 'fs';
import * as path from 'path';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function getHistoryPath(workspacePath: string, promptFilePath: string): string {
  const historyDir = path.join(workspacePath, 'history');
  const promptFileName = path.basename(promptFilePath);
  return path.join(historyDir, `${promptFileName}.json`);
}

export function loadHistory(workspacePath: string, promptFilePath: string): Message[] {
  const historyPath = getHistoryPath(workspacePath, promptFilePath);

  if (!fs.existsSync(historyPath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(historyPath, 'utf8');
    return JSON.parse(raw) as Message[];
  } catch {
    return [];
  }
}

export function saveHistory(workspacePath: string, promptFilePath: string, messages: Message[]): void {
  const historyDir = path.join(workspacePath, 'history');

  if (!fs.existsSync(historyDir)) {
    fs.mkdirSync(historyDir, { recursive: true });
  }

  const historyPath = getHistoryPath(workspacePath, promptFilePath);
  fs.writeFileSync(historyPath, JSON.stringify(messages, null, 2), 'utf8');
}

export function clearHistory(workspacePath: string, promptFilePath: string): void {
  const historyPath = getHistoryPath(workspacePath, promptFilePath);

  if (fs.existsSync(historyPath)) {
    fs.unlinkSync(historyPath);
  }
}
</code></pre>

Again, Node's `path` module is used to build file paths, and `fs` is used to read and write files. The `Message` interface defines the shape of each conversation history entry — a `role` and a `content` string.

Any chat history generated during a session is saved in JSON format and stored in a `history` folder. `getHistoryPath()` builds the file path for the chat history. `loadHistory()` then reads and returns it.

`saveHistory()` writes the full conversation history array to the JSON file, replacing whatever was there before. `clearHistory()` clears that history via a command in the Command Palette.

<h2 id="claude-prompt-reader-extension-ts">The Claude Prompt Reader <code>extension.ts</code></h2>

<pre><code class="language-javascript">
// Claude Prompt Reader - extension.ts

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { Message, loadHistory, saveHistory, clearHistory } from './history';

export function activate(context: vscode.ExtensionContext) {

  // ─── Helper: send prompt to Claude with history ───────────────────────────
  async function sendToClaudeWithHistory(
    promptFilePath: string,
    promptText: string,
    progressTitle: string
  ): Promise<void> {
    const apiKey = vscode.workspace.getConfiguration('claudePromptReader').get<string>('apiKey');
    const claudeModel = vscode.workspace.getConfiguration('claudePromptReader').get<string>('modelDropdown');

    if (!apiKey) {
      vscode.window.showErrorMessage('No API key found. Please add it in Settings → Claude Prompt Reader → Api Key.');
      return;
    }

    const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspacePath) {
      vscode.window.showErrorMessage('No workspace folder found.');
      return;
    }

    const client = new Anthropic({ apiKey });

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: progressTitle,
      cancellable: false
    }, async () => {
      try {
        const history = loadHistory(workspacePath, promptFilePath);

        const updatedHistory: Message[] = [
          ...history,
          { role: 'user', content: promptText }
        ];

        const message = await client.messages.create({
          model: claudeModel ?? 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          messages: updatedHistory
        });

        const response = message.content[0].type === 'text'
          ? message.content[0].text
          : 'No response received.';

        const finalHistory: Message[] = [
          ...updatedHistory,
          { role: 'assistant', content: response }
        ];
        saveHistory(workspacePath, promptFilePath, finalHistory);

        const turnCount = Math.floor(finalHistory.length / 2);
        const doc = await vscode.workspace.openTextDocument({
          content: `CONVERSATION TURN ${turnCount}\n\nPROMPT:\n${promptText}\n\n---\n\nCLAUDE'S RESPONSE:\n${response}`,
          language: 'markdown'
        });

        await vscode.window.showTextDocument(doc);

      } catch (error) {
        vscode.window.showErrorMessage(`Claude API error: ${error}`);
      }
    });
  }

  // ─── Helper: get watched file selection ───────────────────────────────────
  async function selectWatchedFile(promptsPath: string): Promise<string | undefined> {
    const files = fs.readdirSync(promptsPath)
      .filter(f => f.endsWith('.txt') || f.endsWith('.md'));

    if (files.length === 0) {
      vscode.window.showErrorMessage('No .txt or .md files found in prompts folder.');
      return undefined;
    }

    if (files.length === 1) {
      return files[0];
    }

    return await vscode.window.showQuickPick(files, {
      placeHolder: 'Select a prompt file to watch'
    });
  }

  // ─── Command: Read Prompts ─────────────────────────────────────────────────
  const readPromptsCommand = vscode.commands.registerCommand(
    'claude-prompt-reader.readPrompts',
    async () => {
      const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
      if (!workspacePath) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return;
      }

      const promptsPath = path.join(workspacePath, 'prompts');
      if (!fs.existsSync(promptsPath)) {
        vscode.window.showErrorMessage('No prompts folder found in this workspace.');
        return;
      }

      // Check if the focused editor is a prompt file
      const activeEditor = vscode.window.activeTextEditor;
      const activePath = activeEditor?.document.uri.fsPath;
      const isPromptFile = activePath &&
        activePath.startsWith(promptsPath) &&
        (activePath.endsWith('.txt') || activePath.endsWith('.md'));

      let selectedFilePath: string;

      if (isPromptFile && activePath) {
        // Use the focused file directly — no QuickPick needed
        selectedFilePath = activePath;
      } else {
        // No prompt file focused — fall back to QuickPick
        const selectedFile = await selectWatchedFile(promptsPath);
        if (!selectedFile) { return; }
        selectedFilePath = path.join(promptsPath, selectedFile);
      }

      const promptText = fs.readFileSync(selectedFilePath, 'utf8');
      await sendToClaudeWithHistory(
        selectedFilePath,
        promptText,
        `Sending "${path.basename(selectedFilePath)}" to Claude...`
      );
    }
  );

  // ─── Command: Clear History ────────────────────────────────────────────────
  const clearHistoryCommand = vscode.commands.registerCommand(
    'claude-prompt-reader.clearHistory',
    async () => {
      const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
      if (!workspacePath) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return;
      }

      const promptsPath = path.join(workspacePath, 'prompts');
      if (!fs.existsSync(promptsPath)) {
        vscode.window.showErrorMessage('No prompts folder found.');
        return;
      }

      const scope = await vscode.window.showQuickPick(
        [
          { label: 'Clear history for one prompt file', value: 'single' },
          { label: 'Clear all history for all prompt files', value: 'all' }
        ],
        { placeHolder: 'What would you like to clear?' }
      );

      if (!scope) { return; }

      if (scope.value === 'all') {
        const confirm = await vscode.window.showWarningMessage(
          'This will delete history for all prompt files. Are you sure?',
          'Yes, clear all',
          'Cancel'
        );
        if (confirm !== 'Yes, clear all') { return; }

        const historyDir = path.join(workspacePath, 'history');
        if (fs.existsSync(historyDir)) {
          fs.readdirSync(historyDir).forEach(file => {
            fs.unlinkSync(path.join(historyDir, file));
          });
        }
        vscode.window.showInformationMessage('All history cleared.');
        return;
      }

      const selectedFile = await selectWatchedFile(promptsPath);
      if (!selectedFile) { return; }

      const filePath = path.join(promptsPath, selectedFile);
      clearHistory(workspacePath, filePath);
      vscode.window.showInformationMessage(`History cleared for "${selectedFile}".`);
    }
  );

  // ─── File Watcher Setup ────────────────────────────────────────────────────
  let watchedFile: string | undefined;

  const watcher = vscode.workspace.createFileSystemWatcher('**/prompts/**');

  watcher.onDidChange(async (uri) => {
    const fileName = path.basename(uri.fsPath);

    // Guard: ignore non-prompt files
    if (!uri.fsPath.endsWith('.txt') && !uri.fsPath.endsWith('.md')) {
      return;
    }

    // First save — ask the user which file to watch
    if (!watchedFile) {
      const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
      if (!workspacePath) { return; }

      const promptsPath = path.join(workspacePath, 'prompts');
      watchedFile = await selectWatchedFile(promptsPath);
      if (!watchedFile) { return; }
    }

    // Only process the watched file
    if (fileName !== watchedFile) { return; }

    const promptText = fs.readFileSync(uri.fsPath, 'utf8');
    await sendToClaudeWithHistory(
      uri.fsPath,
      promptText,
      `Auto-detected change in "${fileName}", sending to Claude...`
    );
  });

  context.subscriptions.push(readPromptsCommand, clearHistoryCommand, watcher);
}

export function deactivate() { }
</code></pre>

Claude Prompt Reader's `extension.ts` code has differences from the Save Selected Text one. Highlighting the differences...

<pre><code class="language-javascript">
...
import { Message, loadHistory, saveHistory, clearHistory } from './history';

export function activate(context: vscode.ExtensionContext) {
...
}

export function deactivate() { }
</code></pre>

Same dependencies that were in "Save Selected Text" get imported in, along with `history.ts`. All the extension code still gets wrapped up in an `activate` function, and `deactivate()` still deactivates on shutdown.

<pre><code class="language-javascript">
async function sendToClaudeWithHistory(
  promptFilePath: string,
  promptText: string,
  progressTitle: string
): Promise<void> {
  const apiKey = vscode.workspace.getConfiguration('claudePromptReader').get<string>('apiKey');
  const claudeModel = vscode.workspace.getConfiguration('claudePromptReader').get<string>('modelDropdown');
...
</code></pre>

As mentioned earlier, every new prompt sent to Claude sends the entire chat history with it. Our `sendToClaudeWithHistory()` does this exactly.

It's a Promise-powered function taking three parameters:

<ol>
  <li><code>promptFilePath</code>: references the full path of our file in the <code>prompts</code> folder.</li>
  <li><code>promptText</code>: references our prompt.</li>
  <li><code>progressTitle</code>: references the text displayed in the VS Code progress notification, including the filename of our prompt file.</li>
</ol>

<pre><code class="language-javascript">
...
const client = new Anthropic({ apiKey });
...
await vscode.window.withProgress({
  location: vscode.ProgressLocation.Notification,
  title: progressTitle,
  cancellable: false
}, async () => {
  try {
    const history = loadHistory(workspacePath, promptFilePath);

    const updatedHistory: Message[] = [
      ...history,
      { role: 'user', content: promptText }
    ];

    const message = await client.messages.create({
      model: claudeModel ?? 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: updatedHistory
    });

    const response = message.content[0].type === 'text'
      ? message.content[0].text
      : 'No response received.';

    const finalHistory: Message[] = [
      ...updatedHistory,
      { role: 'assistant', content: response }
    ];
    saveHistory(workspacePath, promptFilePath, finalHistory);

    const turnCount = Math.floor(finalHistory.length / 2);
    const doc = await vscode.workspace.openTextDocument({
      content: `CONVERSATION TURN ${turnCount}\n\nPROMPT:\n${promptText}\n\n---\n\nCLAUDE'S RESPONSE:\n${response}`,
      language: 'markdown'
    });

    await vscode.window.showTextDocument(doc);
  }
})
</code></pre>

`withProgress()` reappears, taking in the same parameters it did in Save Selected Text in order to build a progress message. And, again, the code is wrapped in a `try/catch`.

`const history` points to the chat history stored in the JSON file in the `history` folder. `const updatedHistory` takes that value and appends the new prompt.

Again, `const message` makes a request to the Claude API, with `updatedHistory` included in the request. And, again, `const response` pulls the message text out from the response as a text string.

`const finalHistory` represents the final, updated chat history in the JSON file. The `saveHistory()` function from `history.ts` saves the new JSON in our `history` folder.

`const turnCount` keeps count the number of single back-and-forth conversations. `const doc` includes that number with response to the last prompt and places it in a text document.

`await vscode.window.showTextDocument(doc)` displays that document in a VS Code window.

<pre><code class="language-javascript">
async function selectWatchedFile(promptsPath: string): Promise<string | undefined> {
  const files = fs.readdirSync(promptsPath)
    .filter(f => f.endsWith('.txt') || f.endsWith('.md'));

  if (files.length === 0) {
    vscode.window.showErrorMessage('No .txt or .md files found in prompts folder.');
    return undefined;
  }

  if (files.length === 1) {
    return files[0];
  }

  return await vscode.window.showQuickPick(files, {
    placeHolder: 'Select a prompt file to watch'
  });
}
</code></pre>

`selectWatchedFile` will be part of conditional check later in our code. It will check the `prompts` folder for either text or Markdown files to treat as a prompt.

If there aren't, an error message will show. If there are, the Command Pallette will display the files in `prompts` as list for us to choose from.