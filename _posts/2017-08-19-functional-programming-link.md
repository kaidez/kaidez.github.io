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

One thing I added was functionality where post links wrapped in <code>div</code> tags on the home page go to their respective link when that <code>div</code> gets clicked.  Applying that functionality to <em>ALL</em> of those links required aå function: Functional programming made sense here.

The file structure looks like this:
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

Note that all the <code>div</code>'s have a <code>post-link-hook</code> class and a <code>data-url</code> attribute. Our JavaScript will use both of these things make the <code>div</code> tags clickable links without the need for an <code><a></code> tag.

The JavaScript will be built out to the <code>bundle.js</code> file. The styles are in the <code>styles.css</code>, which is pretty basic:

<pre><code class="language-css">
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


My code used ES6 things like <code>const</code>, <code>let</code> and arrow functions. The popular way to safely run this code cross-browser is with <a href="https://webpack.js.org/">webpack</a> and <a href="http://babeljs.io/">Babel</a>, which I set up as follows...

The <code>package.json</code> file looks like this:
<pre><code class="language-json">
{
  "name": "kaidez.com",
  "version": "3.0.0",
  "description": "Personal blog of Kai Gittens",
  "main": "index.js",
  "repository": "https://github.com/kaidez/kaidez.github.io.git",
  "author": "Kai Gittens &lt;kai.gittens@gmail.com&gt;",
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
    The <code>main</code> property which is optional here. It's the entry point for the webpack build, which would work even if this property wasn't here.  But doing so is a <em>de facto</em> best practice for webpack.
  </li>
  <li class="post-content--list-item">
    The <code>scripts</code> property which contains two tasks: <code>build</code> which builds out the production-ready JavaScript code via webpack and <code>watch</code>, which watches for changes to the your <code>.js</code> source files and runs that build.  These source files are in the <code>js-build</code> directory listed above and the tasks can be run using either <a href="https://yarnpkg.com/">Yarn</a> or <a href="https://www.npmjs.com/">npm</a>...I used Yarn.
  </li>
  <li class="post-content--list-item">
    The <code>devDependencies</code> property which provides the packages needed to let webpack build ES6 out to a the more cross-browser friendly ES5 syntax.
  </li>
</ol>

The <code>.babelrc</code> file uses Babel's default settings, which let Babel transform ES6 syntax to ES5 syntax.
<pre><code class="language-json">
{
  "presets": ["env"]
}
</code></pre>

<code>webpack.config.js</code> looks like this:
<pre><code class="language-js">
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

That <code>js-build/index.js</code> entry point file is real simple due the small amount of code here. Entry point files are always much more detailed, but this simple one looks like this:
<pre><code class="language-js">
import { divClick } from "./helpers"

// Run divClick code
divClick
</code></pre>

I'm using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">ES6 destructuring</a> to import <code>divClick</code> from the <code>helpers.js</code>.
I try to implement a little functional programming in all my work, even if it's just for practice. I recently went through such a practice when I had to format a date with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">JavaScript's Date() object</a> in a React component.