---
layout: post
comments: true
title:  "The Powerful Simplicity of the JavaScript 'return' Statement...for beginners"
date:   2018-11-02 00:00:50 -0400
categories: personal
category-name: Personal
permalink: /javascript-return-statement/
excerpt: A beginners explanation of how the JavaScript return statement returns values outside of a function. Contains code samples.
og-image: javascript-return-statement.jpg
thumb-image: javascript-return-statement-thumb.jpg
---
The JavaScript <code>return</code> statement returns a value from a function, letting outside code access that value if needed. Understanding exactly how that works, especially if you're a beginner, is tough.

It took me a minute to understand <code>return</code> when I started seriously focusing on JavaScript, but I got it eventually. But after a recent bout of intense JS functional programming, I finally feel that I can explain it to a six-year old.
<h2>How I first learned this stuff</h2>
When started my deep-dive into learning JavaScript, it was focused on learning it from a purely object-oriented perspective. As a result, you start making functions with an explicit <code>this</code> reference:
<pre><code class="language-javascript">function setClass(nameOfClass) {
  this.nameOfClass = nameOfClass
}
</code></pre>
This is fine if you're purely focusing on code inheritance but if you're focusing on functional programming, it's no help. So if you wanted to access <code>nameOfClass</code> outside of <code>setClass()</code>, this wouldn't work:

<pre><code class="language-javascript">&lt;!-- HTML -->
&lt;div id="text">some words&lt;/div>

&lt;!-- CSS -->
.uppercaseText {
  text-transform: uppercase;
}

&lt;!-- JavaScript -->
function setClass(nameOfClass) {
  this.nameOfClass = nameOfClass
}

function styleDiv() {
  const getElement = document.getElementById("text")
  text.setAttribute("class", setClass("uppercaseText"))
}

styleDiv()
</code></pre>
The code expects that <code>&lt;div id="text" /></code> would contain "SOME WORDS" instead of "some words" but it wouldn't. And and a console error message wouldn't send explanation as to way.

Updating <code>createClass</code> to explicitly <code>return</code> something would fix things.
<pre><code class="language-javascript">function setClass(nameOfClass) {
  this.nameOfClass = nameOfClass
  return nameOfClass
}
...
</code></pre>

This works too...a little more succinct:
<pre><code class="language-javascript">function setClass(nameOfClass) {
  return this.nameOfClass = nameOfClass
}
...
</code></pre>

And if you can do it, this is <em>REALLY</em> succinct:
<pre><code class="language-javascript">function setClass(nameOfClass) {
  return nameOfClass
}
...
</code></pre>
Either one would display "SOME WORDS" inside <code>&lt;div id="text" /></code>. And yes, <code>return</code> stops the function from running...any code that may come after it wouldn't run.

<em>Side note: this is what I really liked about <a href="http://coffeescript.org/">the CoffeeScript compiler</a> when I first started playing with it. That it tried to add <code>return</code> to the last line of your code...even console statements. It was where I started to learn all this.</em>
<h2>A complex functional programming example</h2>
Looking at some ridiculously complex code I recently wrote expands on how <code>return</code> works. I recently had to write code where two objects needed to be compared and, depending on the values of certain key/value pairs, displayed a certain message in the HTML.

The business requirements made this a little rough.  I had to pluck properties out of an existing object and with those properties, build a new object on the fly. And because I was comparing two objects, I had to do this pluck-and-build twice