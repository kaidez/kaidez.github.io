---
layout: post
comments: true
title:  "Setup Link Functionality with Functional Programming"
date:   2017-08-21 04:00:59 -0400
categories: tutorials
permalink: /functional-programming-link/
excerpt: Use JavaScript functional programming to set click-to-link functionality on a set of elements. Code sample has a basic webpack/Babel setup.
og-image: functional-programming-react.jpg
thumb-image: functional-programming-react-thumb.jpg
---
I lost my WordPress blog due to a sloppy, "newbie-to-databases" error. I've been rebuilding it slowly with <a href="https://jekyllrb.com/">Jekyll</a>, adding new functionality here and there.

One thing I added was on the homepage, where post snippets inside <code>div</code>s go to a certain link when they get clicked.  To apply that functionality to <em>ALL</em> those links, functional programming made sense.

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
The best way to start understand the code is by looking at <code>build/index.html</code>:
<pre class=" language-markup">
 <code class=" language-markup">
&lt;!-- build/index.html --&gt;

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

Note that all the <code>div</code> tags have a <code>post-link-hook</code> class and a <code>data-url</code> attribute. Our JavaScript will use both of these things make the <code>div</code>s clickable links without the need for an <code>a</code> tag.

The core JavaScript is in <code>build/bundle.js</code> file but we'll discuss it shortly. The styles are in the <code>build/styles.css</code> and they're pretty basic:

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
Very basic styles here that are applied to all the <code>div</code> tags. I should point out that <code>div</code>s have a <code>cursor: pointer</code> setting, allowing for a link hand cursor to appear when they're hovered over, making them act like <code>a</code> tags.

Our code uses ES6 things like <code>const</code>, <code>let</code>, arrow functions and object destructuring. The (current) popular way to make this code cross-browser compatible is with <a href="https://webpack.js.org/">webpack</a> and <a href="http://babeljs.io/">Babel</a>.

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
    The <code>main</code> property which is optional here. It's the entry point for the webpack build, which works even if this property isn't here.  But doing so is a <em>de facto</em> webpack best practice in terms of documenting what the entry point is.
  </li>
  <li class="post-content--list-item">
    The <code>scripts</code> property which contains two tasks: <code>build</code> which builds out the production-ready <code>build/bundle.js</code> file via webpack, and <code>watch</code>, which watches for changes to the your <code>.js</code> source files and runs that build.  These source files are in the <code>js-build</code> directory listed above and the tasks can be run using either <a href="https://yarnpkg.com/">Yarn</a> or <a href="https://www.npmjs.com/">npm</a>...I used Yarn to run <code>watch</code>.
  </li>
  <li class="post-content--list-item">
    The <code>devDependencies</code> property which provides the packages needed to let webpack build ES6 out to the more cross-browser friendly ES5 syntax.
  </li>
</ol>

The <code>.babelrc</code> file uses Babel's default settings to transform ES6 syntax to ES5 syntax.
<pre><code class="language-js">
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

I'm using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">ES6 destructuring</a> to import <code>divClick</code> from this file's only dependency: <code>helpers.js</code>. And <code>helpers.js</code> contains the core code for our link functionality:
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
  window.location = el.dataset.url
}

export const divClick = doEventOnElement(getPostDiv, 'click', goToPage)
</code></pre>

Breaking this code down...
<pre><code class="language-js">
const getPostDiv =  document.querySelectorAll(".post-link-hook");
...
</code></pre>

<code>getPostDiv</code> refers to any page elements of with a class name of <code>post-link-hook</code>, which is all the <code>div</code>s in <code>index.html</code>. <code>getPostDiv</code> returns this group of elements as an array.

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

<code>doEventOnElement</code> is a function that takes our <strong><em>elements array</em></strong> and builds functionality where performing an <strong><em>event</em></strong> on each element (like <code>click</code>) runs a <strong><em>function</em></strong>.
<ul class="post-content__list">
 <li class="post-content--list-item">The <code>element</code> parameter refers to the element array</li>
 <li class="post-content--list-item">The <code>getEvent</code> parameter refers to the event</li>
 <li class="post-content--list-item">The <code>fn</code> parameter refers to the function</li>
</ul>

<code>doEventOnElement</code> loops through the array items and places an event listener on each item. The event listener runs the event which, again, is defined by the <code>getEvent</code> parameter.

<code>doEventOnElement</code> also allows a callback function to run our other function defined by <code>fn</code>.  And <code>fn</code> takes a parameter as well: the <code>element</code> parameter we defined in the beginning.

I get that this MIGHT be confusing, but walking through the <code>goToPage</code> function may clarify things:
<pre><code class="language-js">
...
function goToPage(el) {
  window.location = el.dataset.url
}
...
</code></pre>
<code>goToPage</code> will be the function that runs when a <code>div</code> is clicked. Its job is to go to a particular web page.

It does this by accepting a parameter <code>el</code>, which is expected to be a page element. <code>el</code> is expected to have a <code>data-url</code> attribute that can be accessed by looking at <code>el.dataset.url</code> which, by the way, all our <code>div</code> tags have.

Once <code>goToPage</code> resolves all that, <code>goToPage</code> loads  <code>el.dataset.url</code> as a relative URL with the help of the <code>window.location</code> property. It will then go to that page in the browser.

<pre><code class="language-js">
...
export const divClick = doEventOnElement(getPostDiv, 'click', goToPage)
</code></pre>

We create a constant called <code>divClick</code>. It's exported out as dependency, which we saw in <code>js-build/index.js</code>.

<code>divClick</code> contains an instance of <code>doEventOnElement()</code> which takes three parameters:

<ol class="post-content__list">
  <li class="post-content--list-item">
   <code>getPostDiv</code> which is the constant defined earlier and represents the elements that should be affected by our code. It's an array list of all the <code>div</code> tags with the <code>post-link-hook</code> class.
  </li>
  <li class="post-content--list-item">
   <code>'click'</code> is the event that should affect the <code>div</code> tags. i.e. when we click on <code>div</code>s something should happen.
  </li>
  <li class="post-content--list-item">
    <code>goToPage</code> is the "something" that should happen. It's the function that looks for the URLs stored in each element's <code>data-url</code> attribute and loads the URL into the browser.
  </li>
</ol>
It's important to note that we're passing a function as a parameter here, which is a big deal in functional programming. Whenever you see or hear the phrase "functions are first class objects in JavaScript", passing functions as parameters is one of the many reasons why that's true.

And it's <strong>VERY</strong> important to note what happens when that function actually gets passed as a parameter.  In the context of our code, that means looking at <code>doEventOnElement()</code>.

The last parameter passed to <code>doEventOnElement()</code> is <code>fn</code>. And in our code, that's the <code>goToPage()</code> function.

So when <code>fn</code> runs in the <code>for</code> loop like this...
<pre><code class="language-js">
fn(element[i])
</code></pre>

It looks like this when the <code>fn</code> param is set...
<pre><code class="language-js">
goToPage(element[i])
</code></pre>

We built <code>goToPage()</code> to expect an element: that will be defined by <code>element[i]</code>. And since we set the <code>element</code> parameter to be <code>getPostDiv</code>, the function in the <code>for</code> loop look like this...
<pre><code class="language-js">
goToPage(getPostDiv[i])
</code></pre>
So as the loop iterates over an element array, it will look like this when it hits the array's second item...
<pre><code class="language-js">
goToPage(getPostDiv[1])
</code></pre>

And from there, it will look at the <code>data-url</code> attribute in the <code>getPostDiv[1]</code> and treat it as a link.

This was something that took me some time to grasp while learning functional programming. It can be a bit mind-bending but understanding it is key.

In closing and <a href="/format-dates-functional-programming/">like I said in my last post</a>, I try to implement JavaScript functional programming wherever I can, even if it's just for practice. Code like this may be too much for the task at hand, but I'm glad I did it: practice or no practice.

Feel free to ask questions or make suggestions.