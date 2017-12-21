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
If you’re a self-taught JavaScript developer like me, you may not be doing JavaScript unit testing. Self-taught JS developers tend to jump right into coding and skip learning software development fundamentals…like unit testing.

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

<a name="test-suite"></a>
<h2>The test suite</h2>

<a name="about-qunit"></a>
<h2>A quick note about QUnit</h2>

<a name="test-driven development"></a>
<h2>Test-Driven Development (TDD)</h2>

<a name="review-james-code"></a>
<h3>Review James’ code</h3>

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