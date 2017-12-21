---
layout: post
comments: true
title:  "Want to Learn Javascript Unit Testing? Learn Functional Programming First!"
date:   2017-03-20 04:00:59 -0400
categories: coding-best-practices
category-name: Coding Tips
permalink: /learn-javascript-unit-testing/
excerpt: Learn JavaScript unit testing by creating smaller functions with functional programming & testing them with QUnit. Lots of learning resources links.
og-image: learn-javascript-unit-testing.jpg
thumb-image: learn-javascript-unit-testing-thumb.jpg
---
If you’re a self-taught JavaScript developer like me, you may not be doing JavaScript unit testing. Self-taught JS developers tend to jump right into coding and skip learning software development fundamentals...like unit testing.

The best way to learn JavaScript unit testing is to realize you should write code in a functional programming style. Functional programming (or, FP) encourages writing small, easy-to-read functions, which are <strong>easy to test</strong>.
<h2>Table of Contents</h2>
<ol>
  <li class="post__list-item"><a href="#before-we-begin">Before we begin...</a></li>
  <li class="post__list-item"><a href="#not-doing-js-unit-testing">Haven’t done JavaScript unit testing yet? That’s fine.</a></li>
  <li class="post__list-item"><a href="#functional-programming">About functional programming</a></li>
  <li class="post__list-item"><a href="#what-we-will-do">What we’re going to do</a></li>
  <li class="post__list-item"><a href="#web-page">The web page for all this</a></li>
  <li class="post__list-item"><a href="#test-suite">The test suite</a></li>
  <li class="post__list-item"><a href="#about-qunit">A quick note about QUnit</a></li>
  <li class="post__list-item"><a href="#test-driven development">Test-Driven Development (TDD)</a>
    <ul style="margin-bottom: 0;">
      <li><a href="#review-james-code">Review James’ code</a></li>
      <li><a href="#first-failing-test">The first failing test</a></li>
      <li><a href="#first-assertions">The first assertions</a></li>
      <li><a href="#see-if-tests-failed">See if the tests failed</a></li>
      <li><a href="#test-assert-throws">Test for error messages with <code>assert.throws()</code></a></li>
    </ul>
  </li>
  <li class="post__list-item"><a href="#code-coverage">About code coverage</a>
    <ul style="margin-bottom: 0;">
      <li><a href="#coverage-in-test-suite">What code coverage looks like in the test suite</a></li>
    </ul>
  </li>
  <li class="post__list-item">
    <a href="#testing-more-functional-programming-composition">Testing more functional programming composition</a>
    <ul style="margin-bottom: 0;">
      <li><a href="#test-constructor-function">Unit test a constructor function</a></li>
      <li><a href="#init-method">The <code>init()</code> method</a></li>
      <li><a href="#test-returned-function">Unit test the returned function</a></li>
    </ul>
  </li>
  <li class="post__list-item"><a href="#bring-it-altogether">Bringing it altogether</a></li>
  <li class="post__list-item"><a href="#further-reading">Further reading</a></li>
  <li class="post__list-item"><a href="#conclusion">Conclusion</a></li>
</ol>

<a name="before-we-begin"></a>
<h2>Before we begin...</h2>
While this post talks about functional programming, it’s written more as a beginner’s guide to JavaScript unit testing. The post demonstrates how FP makes unit testing easier, but doesn’t discuss FP beyond that.

Even with that, this post isn’t an in-depth JavaScript unit testing tutorial. It covers just enough to get you up and running: <strong>assertions, test suites, test coverage and test-driven development</strong>.

The resources at the end of this post cover JavaScript unit testing and functional programming in depth.

If you want to follow along with the examples, <a href="https://github.com/kaidez/functional-programming-unit-testing">please read the instructions in the code repo</a>.

<a name="not-doing-js-unit-testing"></a>
<h2>Haven’t done JavaScript unit testing yet? That’s fine.</h2>
First of all, it’s OK if you haven’t regularly unit tested your JavaScript up to this point. This is because unit testing isn’t encouraged in the JS community like it is in other programming communities like Java.

JavaScript was built to be a low barrier of entry for beginner programmers: JS creator <a href="https://devchat.tv/js-jabber/124-jsj-the-origin-of-javascript-with-brendan-eich">Brendan Eich has said that</a>. JS was used for simple things like dropdown menus, rollover effects and cookies when it first came out; therefore, ignoring JS unit testing was acceptable.

But starting with <a href="http://adaptivepath.org/ideas/ajax-new-approach-web-applications/">the Great AJAX Revolution of 2005</a>, JavaScript evolved into a full-on application platform. JS lives well on the server via Node, JS stack solutions like <a href="http://meanjs.org/">MEAN</a> and <a href="https://jamstack.org/">JAMstack</a> are getting popular and so on.

With JavaScript now at this level, it makes sense to apply traditional software development practices. Like unit testing.

<a name="functional-programming"></a>
<h2>About functional programming</h2>
You should test small pieces of code, not big pieces. Functional programming encourages writing functions in small pieces.

The rules of functional programming are:
<ul>
  <li class="post-list-item">A function should depend on its own scope to work, not its outer scope.</li>
  <li class="post-list-item">Functions <em>definitely</em> shouldn’t change the outer scope.</li>
  <li class="post-list-item">Functions should explicitly <code>return</code> something.</li>
  <li class="post-list-item">If a function gives the same input, it should always produce the same output.</li>
  <li class="post-list-item">Most of all, functions must be small and reusable.</li>
</ul>
This is just an FP summary: you can read more about it by clicking on this article’s various links. But the last point is the most relevant to JavaScript unit testing:
<blockquote><p><em>Functions must be small and reusable.</em></p></blockquote>
In addition, functional programming encourages composition: the combining of multiple functions to make another function. This is usually done by passing a function as a parameter to another function, where the passed function gets invoked inside the other one.
<a name="what-we-will-do"></a>
<h2>What we’re going to do</h2>
James Sinclair wrote <a href="http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-intro/">an excellent four-part tutorial on functional programming</a>. We’ll create unit tests for his function solutions in the tutorial’s first part.

<a name="web-page"></a>
<h2>The web page for all this</h2>
Here’s what the web page for this, <code>index.html</code>, looks like:
<pre><code class="language-markup">
&lt;!-- index.html --&gt;

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Learn JS Unit Testing with Functional Programming&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;div id="carousel-one"&gt;&lt;/div&gt;
  &lt;div id="carousel-two"&gt;&lt;/div&gt;
  &lt;div id="main-carousel"&gt;&lt;/div&gt;

  &lt;div id="unicorn"&gt;&lt;/div&gt;
  &lt;div id="fairy"&gt;&lt;/div&gt;
  &lt;div id="kitten"&gt;&lt;/div&gt;

  &lt;a href="test/tests.html" target="_blank"&gt;View tests&lt;/a&gt;

  &lt;script src="jquery.js"&gt;&lt;/script&gt;
  &lt;script src="app.js"&gt;&lt;/script&gt;
  &lt;script src="scripts.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
We have a few page elements that we’ll target in our JS later. We also have a link to our group of tests (or, our test suite) and links to some JavaScript files.

The core jQuery file is here. Other files include <code>app.js</code> and <code>scripts.js</code>: the code we’re testing is in <code>app.js</code>, but that code gets implemented in <code>scripts.js</code>.
<a name="test-suite"></a>
<h2>The test suite</h2>
Our test suite lives in <code>test/tests.html</code> and looks like this:
<pre><code class="language-markup">
&lt;!-- test/tests.html -->

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;title&gt;Functional programming test suite&lt;/title&gt;

  &lt;link rel="stylesheet" href="qunit.css"&gt;
  &lt;script src="qunit.js"&gt;&lt;/script&gt;

  &lt;script src="../jquery.js"&gt;&lt;/script&gt;

  &lt;script src="../app.js" data-cover&gt;&lt;/script&gt;

  &lt;script&gt;&lt;/script&gt;

&lt;/head&gt;
&lt;body&gt;

  &lt;div id="qunit"&gt;&lt;/div&gt;

  &lt;div id="qunit-fixture"&gt;&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre>
We’ll test James’ code with the <a href="https://qunitjs.com/">QUnit</a> framework. <code>qunit.css</code> will style the test suite page while <code>qunit.js</code> will actually perform the tests.

The core jQuery library is here as well: we’re pointing to the one in the root of the <code>build</code> folder. We’ll use it to help us with some DOM-related tests.

Next is the previously-mentioned <code>app.js</code> which contains the code getting tested. QUnit knows to only test <code>app.js</code> because of its <code>data-cover attribute</code>.

The empty &lt;script&gt; tag is where we’ll write our tests.

Finally, we have two <code><div></code> tags: <code><div id="qunit" /></code> and <code><div id="qunit-fixture" /></code>. QUnit’s test results load into <code><div id="qunit" /></code> and we’ll use <code><div id="qunit-fixture" /></code> to test DOM manipulation.

<a name="about-qunit"></a>
<h2>A quick note about QUnit</h2>
QUnit isn’t the only JavaScript unit testing framework and you should <a href="https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript">review other JS unit testing frameworks</a> at some point. But if you want to learn JavaScript unit testing from the beginning, I think QUnit is best for that.

QUnit has a small API with easy-to-read documentation. This is because it’s maintained by the jQuery team, which is well-known for writing easy-to-read API documentation.

Also, QUnit works great without command line tools like Grunt and Gulp when compared to other testing frameworks. It can run with those tools and you should run unit testing from the CLI eventually.

But to learn JavaScript unit testing from the beginning, running tests in a browser and outside of CLI tooling is fine. Onto the tests...
<a name="test-driven development"></a>
<h2>Test-Driven Development (TDD)</h2>
We’ll test this code using <a href="https://en.wikipedia.org/wiki/Test-driven_development">Test-Driven Development (TDD)</a>, meaning we’ll write our code in four steps:
<ol>
  <li class="post__list-item">write a test.</li>
  <li class="post__list-item">make sure that test fails.</li>
  <li class="post__list-item">write code to make the test pass.</li>
  <li class="post__list-item">refactor code if needed.</li>
</ol>

We’re not doing full-on TDD: we’re using James’ pre-written functions instead of writing tests first and code next. But we’ll add new functions as well as refactor some existing ones...we’ll do enough to understand TDD.
<a name="review-james-code"></a>
<h3>Review James’ code</h3>
James’ first FP example used composition and created a small function that returned another small function. He did this by passing one function as a parameter to another:
<pre><code class="language-javascript">
// A function that gets returned
var log = function(someVariable) {
  console.log(someVariable);
  return someVariable;
}

// A function that takes another function as a parameter
var doSomething = function(thing) {
  thing();
}

// Another function that gets returned and executes 'log()'
var sayBigDeal = function() {
  var message = "I'm kind of a big deal";
  log(message);
}

// All this in action
doSomething(sayBigDeal); // logs 'I’m kind of a big deal
</code></pre>
We’ll use TDD to make <code>log()</code> work but will also update it as follows:

<ul>
  <li class="post__list-item">log() should only accept a string type as a parameter.</li>
  <li class="post__list-item">the string should have at least one character.</li>
  <li class="post__list-item">make sure console errors get displayed if these two things don’t happen.</li>
</ul>

<a name="first-failing-test"></a>
<h3>The first failing test</h3>

<a name="first-assertions"></a>
<h3>The first assertions</h3>

<a name="see-if-tests-failed"></a>
<h3>See if the tests failed</h3>

<a name="test-assert-throws"></a>
<h3>Test for error messages with assert.throws()</h3>

<a name="#code-coverage"></a>
<h2>About code coverage</h2>

<a name="coverage-in-test-suite"></a>
<h3>What code coverage looks like in the test suite</h3>

<a name="#testing-more-functional-programming-composition"></a>
<h2>Testing more functional programming composition</h2>

<a name="test-constructor-function"></a>
<h3>Unit test a constructor function</h3>

<a name="init-method"></a>
<h3>The init() method</h3>

<a name="test-returned-function"></a>
<h3>Unit test the returned function</h3>

<a name="bring-it-altogether"></a>
<h2>Bringing it altogether</h2>

<a name="further-reading"></a>
<h2>Further reading</h2>

<a name="conclusion"></a>
<h2>Conclusion</h2>