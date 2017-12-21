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

<a name="not-doing-js-unit-testing"></a>
<h2>Haven’t done JavaScript unit testing yet? That’s fine.</h2>

<a name="functional-programming"></a>
<h2>About functional programming</h2>

<a name="what-we-will-do"></a>
<h2>What we’re going to do</h2>

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