---
layout: post
comments: true
title:  "Set Up Link Functionality with Functional Programming"
date:   2017-08-19 05:07:59 -0400
categories: tutorials
permalink: /functional-programming-link/
excerpt: Use JavaScript functional programming to set click-to-link functionality on a group of elements.
og-image: functional-programming-react.jpg
thumb-image: functional-programming-react-thumb.jpg
---
I lost my WordPress blog due to a sloppy, newbie-to-databases error: more on that in a later post. I've been rebuilding it slowly with Jekyll, adding new functionality here and there.

One thing I added was on the home page, where post snippets inside <code>div</code>'s go to their respective link when they get clicked.  To apply that functionality to <em>ALL</em> of those links, functional programming made sense.

The file structure looks like this, roughly:
<pre class=" language-markup">
  <code class=" language-markup">
├── build
|   ├── 01-post
|       └── index.html
|   ├── 02-post
|       └── index.html
|   ├── 03-post
|       └── index.html
|   ├── 04-post
|       └── index.html
|   └── bundle.js
|   └── index.html
|   └── styles.css
├── js-build
|   ├── helpers.js
|   └── index.js
├── node_modules
├── .babelrc
├── package.json
└── webpack.config.js
  </code>
</pre>
The best way to understand this is by looking at <code>build/index.html</code>:
<pre class=" language-markup">
  <code class=" language-markup">
&lt;!-- index.html --&gt;

<!DOCTYPE html>
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
  &lt;title&gt;Functional Programming Click Tutorial&lt;/title&gt;
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;div class="post-link-hook" data-url="01-post"&gt;
    The link to the first post.
  &lt;/div&gt;

  &lt;div class="post-link-hook" data-url="02-post"&gt;
    The link to the second post.
  &lt;/div&gt;

  &lt;div class="post-link-hook" data-url="03-post"&gt;
    The link to the third post.
  &lt;/div&gt;

  &lt;div class="post-link-hook" data-url="04-post"&gt;
    The link to the fourth post.
  &lt;/div&gt;

  &lt;script type="text/javascript" src="bundle.js"&gt;&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;
  </code>
</pre>

Note that all the <code>div</code>'s have a <code>post-link-hook</code> class and a <code>data-url</code> attribute. Our JavaScript will use both of these things make the <code>div</code> tags clickable links without the need for an <code>a</code> tag.

The core JavaScript is in <code>bundle.js</code> file. The styles are in the <code>styles.css</code>, which is pretty basic:

<pre><code class="language-css">
/* build/styles.css */

.post-link-hook {
  width: 400px;
  height: 72px;
  margin-bottom: 20px;
  padding:6px;

  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}
  </code>
</pre>
The styling for those <code>div</code>s is pretty basic. I should point out that <code>div</code>s have a <code>cursor: pointer</code> setting, allowing for a link hand cursor to appear when they're hovered over, making them act like links.

Our code uses ES6 things like <code>const</code>, <code>let</code>, arrow functions and object destructuring. The popular way to make this code cross-browser compatible is with <a href="https://webpack.js.org/">webpack</a> and <a href="http://babeljs.io/">Babel</a>.

The setup for webpack/Babel starts in <code>package.json</code>:
<pre><code class="language-json">
// package.json

{
  "name": "kaidez.com",
  "version": "3.0.0",
  "description": "Personal blog of Kai Gittens",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "webpack": "^3.5.5"
  }
}
  </code>
</pre>
The three key things here are:
<ol class="post-content__list">
  <li class="post-content--list-item">
    The <code>main</code> property which is optional here. It's the entry point for the webpack build, which would work even if this property wasn't here.  But doing so is a <em>de facto</em> webpack best practice.
  </li>
  <li class="post-content--list-item">
    The <code>scripts</code> property which contains two tasks: <code>build</code> which builds out the production-ready <code>build/bundle.js</code> file via webpack, and <code>watch</code>, which watches for changes to the your <code>.js</code> source files and runs that build.  These source files are in the <code>js-build</code> directory listed above and the tasks can be run using either <a href="https://yarnpkg.com/">Yarn</a> or <a href="https://www.npmjs.com/">npm</a>...I used Yarn.
  </li>
  <li class="post-content--list-item">
    The <code>devDependencies</code> property which provides the packages needed to let webpack build ES6 out to the more cross-browser friendly ES5 syntax.
  </li>
</ol>

The <code>.babelrc</code> file uses Babel's default settings, which let Babel transform ES6 syntax to ES5 syntax.
<pre><code class="language-json">
// .babelrc
{
  "presets": ["env"]
}
</code></pre>

<code>webpack.config.js</code> looks like this:
<pre><code class="language-js">
// webpack.config.js

const path = require('path');

module.exports = {
  module : {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  entry: './js-build/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
};
</code></pre>
webpack will look at the entry point of the file, <code>js-build/index.js</code>, which lists any dependency files needed to build out our site's JavaScript code. It will then transform any ES6 into ES5, and save things out in a file named <code>build/bundle.js</code>.

That <code>js-build/index.js</code> entry point file is real simple due to the small amount of code here. Entry point files are always much more detailed, but this simple one looks like this:
<pre><code class="language-js">
// js-build/index.js

import { divClick } from "./helpers"

// Run divClick code
divClick
</code></pre>

I'm using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">ES6 destructuring</a> to import <code>divClick</code> from this file's only dependency: <code>helpers.js</code>. And <code>helpers.js</code> is contains the code for our link functionality:
<pre><code class="language-js">
// js-build/helper.js

const getPostDiv =  document.querySelectorAll(".post-link-hook");

const doEventOnElement = (element, getEvent, fn) => {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener(getEvent, event => {
      fn(element[i])
    })
  }
}

function goToPage(el) {
  const getArticleLink = el.dataset.url
  window.location = getArticleLink
}

export const divClick = doEventOnElement(getPostDiv, 'click', goToPage)
</code></pre>

Breaking this code down...
<pre><code class="language-js">
const getPostDiv =  document.querySelectorAll(".post-link-hook");
...
</code></pre>

<code>getPostDiv</code> is a reference to all page elements of with a class name of <code>post-link-hook</code>, which is all the <code>div</code>'s on <code>index.html</code>. <code>getPostDiv</code> returns this group of elements as an array.

<pre><code class="language-js">
...
const doEventOnElement = (element, getEvent, fn) => {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener(getEvent, event => {
      fn(element[i])
    })
  }
}
...
</code></pre>

<code>doEventOnElement</code> is a function that takes our array of elements and builds functionality where performing some event on each element (like <code>click</code>) runs a function. The <code>element</code> parameter, refers to the element array, the <code>getEvent</code> parameter refers to the event and the <code>fn</code> parameter refers to the function.
<ol class="post-content__list">
  <li class="post-content--list-item">
    The <code>main</code> property which is optional here. It's the entry point for the webpack build, which would work even if this property wasn't here.  But doing so is a <em>de facto</em> webpack best practice.
  </li>
  <li class="post-content--list-item">
    <code>element</code> .
  </li>
  <li class="post-content--list-item">
    The <code>devDependencies</code> property which provides the packages needed to let webpack build ES6 out to the more cross-browser friendly ES5 syntax.
  </li>
</ol>


I try to implement a little functional programming in all my work, even if it's just for practice. I recently went through such a practice when I had to format a date with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">JavaScript's Date() object</a> in a React component.