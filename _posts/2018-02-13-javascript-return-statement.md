---
layout: post
comments: true
title:  "The Powerful Simplicity of the JavaScript 'return' Statement...for beginners"
date:   2018-02-10 00:00:50 -0400
categories: tutorials
category-name: Tutorials
permalink: /javascript-return-statement/
excerpt: A beginners explanation of how the JavaScript return statement returns values outside of a function. Contains code samples.
og-image: javascript-return-statement.jpg
thumb-image: javascript-return-statement-thumb.jpg
---
The JavaScript <code>return</code> statement returns a value from a function, where your other code can access that value if needed. Understanding exactly how that works, especially if you're a beginner.

It took me a minute to understand <code>return</code> when I started seriously focusing on JavaScript, but I got eventually. But after a recent bout of intense JS functional programming, I finally feel that I can explain it to a six-year old.
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

This works too:
<pre><code class="language-javascript">function setClass(nameOfClass) {
  return this.nameOfClass = nameOfClass
}
...
</code></pre>

Either one would display "SOME WORDS" inside <code>&lt;div id="text" /></code>. And also, <code>return</code> stops the function from running...any code that may come after it wouldn't run.

<em>As a side note: this is what I really liked when I first started playing with <a href="http://coffeescript.org/">the CoffeScript compiler</a>. That it tried to add <code>return</code> to the last line of your code...even console statements. This is where I started to learn all this.</em>
<h2>A complex functional programming example</h2>