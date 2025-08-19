---
title:  "Want to Learn Javascript Unit Testing? Learn Functional Programming First!"
date:   2017-03-20
excerpt: Learn JavaScript unit testing by creating smaller functions with functional programming & testing them with QUnit. Lots of learning resources links.
layout: layouts/base.njk
permalink: /learn-javascript-unit-testing/
tags: ["coding-best-practices"]
# og-image: learn-javascript-unit-testing.jpg
# thumb-image: learn-javascript-unit-testing-thumb.jpg
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

The resources at the end of this post cover JavaScript unit testing and functional programming in depth.  If you want to follow along with the examples, <a href="https://github.com/kaidez/functional-programming-unit-testing">please read the instructions in the code repo</a>.

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
We’ll create a failing test that checks to see if log() returns a string with at least one character:
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script>

QUnit.test('"log()" should return a string with at least 1 character', function(assert) {

  var myString = 'a string';

  assert.equal(log(myString), 'a string', 'the string was returned successfully!');

  assert.equal(myString.length >= 1, true, 'the string has at least 1 character!');

});

&lt;/script>
</code></pre>
We create a test with QUnit’s <code> test</code>  method. <code>test</code> takes two parameters: the test description and a callback function that runs the test.

The test description is <code>"'log()' should return a string with at least 1 character"</code> and the callback takes a parameter called assert. And <code>assert</code> is THE most important term in unit testing.

<code>assert</code> refers to “assertion” and in unit testing, <strong>an assertion is something that our tests always expect to be true</strong>. <code>assert</code> points to a QUnit object with methods we can use in our tests.

Our callback contains a variable called <code>myString</code>. This is a “mock,” which is dummy data for our test.

Finally, the callback uses one of the <code>assert</code> methods we have access to: <code>assert.equal()</code>. And it uses it twice.
</code></pre>
<a name="first-assertions"></a>
<h3>The first assertions</h3>
<code>assert.equal()</code> takes three parameters:

<ol>
  <li class="post__list-item">the <strong>actual</strong> behavior: the code is being tested.</li>
  <li class="post__list-item">the <strong>expected</strong>  behavior: what we expect the test result to be (or, what we’re “asserting”).</li>
  <li class="post__list-item">what message should display if the test passes.</li>
</ol>
For the first assertion, we are:

<ol>
  <li class="post__list-item">executing the <code>log()</code> function by running <code>log(myString)</code>.</li>
  <li class="post__list-item">expecting that the function’s returned result will be <code>"a string"</code>.</li>
  <li class="post__list-item">if the test passes, we’ll get a message saying <code>"the string was returned successfully!"</code></li>
</ol>
For the next assertion, we are:

<ol>
  <li class="post__list-item">claiming that the string’s length is greater than or equal to 1, and it “actually” is.</li>
  <li class="post__list-item">expecting the first point to be true with the help of a standard <code>Boolean</code> true check.</li>
  <li class="post__list-item">if the test passes, we’ll get a message saying <code>"the string has at least 1 character!"</code></li>
</ol>

<a name="see-if-tests-failed"></a>
<h3>See if the tests failed</h3>
Our QUnit test suite shows failing tests when we load <code>test/tests.html</code> in a browser...
<img src="/img/unit-testing-image-01.jpg" alt="First failing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
First failing test image for the learn JavaScript unit testing post
We can make the test pass by adding James’ original log() code to app.js. And note the ES5 "use strict" statement: it will be important later on..

We can make the test pass by adding James’ original <code>log()</code> code to <code>app.js</code>. And note the ES5 <code>"use strict"</code> statement: it will be important later on...
<pre><code class="language-javascript">
// app.js
'use strict';

var log = function(someVariable) {
  console.log(someVariable);
  return someVariable;
}
</code></pre>
...and we’ll see that both tests pass when we go back to our test suite and click on the description.
<img src="/img/unit-testing-image-02.jpg" alt="First passing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
And if we run <code>log()</code> in <code>scripts.js</code>, a console message will appear when we go to our web page:
<pre><code class="language-javascript">
// scripts.js
log("I'm kind of a big deal"); // logs the first "I'm kind of a big deal"
</code></pre>
<a name="test-assert-throws"></a>
<h3>Test for error messages with <code>assert.throws()</code></h3>
<code>log()</code> should also throw an error message to the console if its parameter isn’t a string with at least one character. We’ll throw those messages using JavaScript’s <code>Error</code> object, creating this functionality with TDD.

QUnit’s assert functionality has a <code>throws()</code> method that tests if your custom error messages get thrown correctly. We’ll use it to create the failing tests for this “throw an error message” functionality.

The failing tests go at the bottom of the <code>script</code> tag on our test suite page:
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
...
QUnit.test('"log()" should throw an error if no parameter is passed or if the parameter is not a string', function(assert) {

  assert.throws(function () {
    log();
  }, 'an error was thrown because no parameters are passed to "log()"');

  assert.throws(function () {
    log('');
  }, 'an error was thrown because an empty string is the parameter');

  assert.throws(function () {
    log(null);
  }, 'an error was thrown because "null" is the parameter');

  assert.throws(function () {
    log(undefined);
  }, 'an error was thrown because "undefined" is the parameter');

  assert.throws(function () {
    log(function(){});
  }, 'an error was thrown because a function is the parameter');

  assert.throws(function () {
    log(new Symbol('a symbol'));
  }, 'an error was thrown because an ES2015 symbol is the parameter"');
  ...
  // shortened so it's more readable
});
&lt;/script&gt;
</code></pre>
Like before, we create a failing QUnit test with a description and a callback that runs the test. We create tests that assume that the parameter doesn’t exist for whatever reason: an empty parameter, an empty string, <code>null</code> and <code>undefined</code>.

Next, we test if either a function or an ES6 Symbol is being passed. <a href="https://github.com/kaidez/functional-programming-unit-testing">This post’s source code</a> also tests for numbers, arrays, objects, Booleans and regular expressions....I left them out here to keep things more readable.

This produces failing tests:
<img src="/img/unit-testing-image-03.jpg" alt="Second failing test image for the learn JavaScript unit testing post post" class="post__image" style="float: none; margin-top: 10px;">
The tests pass when in true TDD form, we refactor <code>log()</code>:
<pre><code class="language-javascript">
// app.js
...
var log = function(someVariable) {
  if((typeof someVariable !== 'string') || (someVariable.length <= 0)) {
    throw new Error('expecting a string with at least one character');
  } else {
    console.log(someVariable);
    return someVariable;
  }
};
</code></pre>
And we go back and check our tests...
<img src="/img/unit-testing-image-04.jpg" alt="Second passing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
The test suite confirms that <code>log()</code> throws errors when its parameter is not a string with at least one character. So if we update the <code>log()</code> call in <code>scripts.js</code> to look like this...
<pre><code class="language-javascript">
// scripts.js
...
log(""); // logs 'Uncaught Error: expecting a string with at least one character'
</code></pre>

...an error message will appear in the console when go to <code>index.html</code>.

Make sure to reset <code>log("");</code> to <code>log("I’m kind of a big deal");</code> in <code>scripts.js</code> before proceeding.
<a name="code-coverage"></a>
<h2>About code coverage</h2>
<em>Code coverage</em> is the analysis of how much of your code is getting tested. It’s almost always measured as a percentage.

Should you <em>always</em> go for 100% code coverage when unit testing? Maybe: search the web and you’ll find a million different answers to the question.

I say do your research and make you’re own decision, but we’re going for 100% coverage in this small example. And in JS unit testing, the most popular code coverage tool is <a href="http://blanketjs.org/">Blanket.js</a>.

We’ll add Blanket.js between <code>jquery.js</code> and <code>app.js</code> in <code>test/tests.html</code>:
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
...
&lt;script src="../jquery.js"&gt;&lt;/script&gt;

&lt;script src="blanket.min.js"&gt;&lt;/script&gt;

&lt;script src="../app.js" data-cover&gt;&lt;/script&gt;
...
</code></pre>
<a name="coverage-in-test-suite"></a>
<h3>What code coverage looks like in the test suite</h3>
Like we did with <code>log()</code>, we want <code>doSomething()</code> to do type-checking. So we’ll refactor James’ original FP code and add it to the bottom of <code>app.js</code>:
<pre><code class="language-javascript">
// app.js
...
var doSomething = function(someFunction) {
  if(!$.isFunction(someFunction)) {
    throw new Error("doSomething's parameter must be a function");
  } else {
    return someFunction();
  }
};
</code></pre>
We’re using jQuery <code>$.isFunction()</code> to check if the passed parameter is a function. Next, we’ll refresh our test suite and check the “Enable coverage” checkbox that now appears at the top.

The Blanket.js interface will appear: click on the link to <code>app.js</code> to see how much code is getting coverage:

<img src="/img/unit-testing-image-05.jpg" alt="Code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

Whatever’s highlighted in green is being tested whatever’s highlighted in red is not. And as we see, <code>doSomething()</code> isn’t being test at all.

We can add the following to the bottom of the <code>script</code> tag in our test suite page...
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"doSomething()" should return a function', function(assert) {

    var myFunc = function(returnFunc){};
    assert.equal(doSomething(myFunc), myFunc(), 'the function was returned successfully!');

  });
&lt;/script&gt;
</code></pre>
And if we look at the test suite coverage info, we see we’re testing more code that passes unit tests.

<img src="/img/unit-testing-image-06.jpg" alt="Second code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

We’re not testing if our type-checking works like we did for the <code>log()</code> function. We can fix this by adding type checks again at the bottom of the test suite’s <code>script</code> tag:
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test("'doSomething()' should throw an error if no parameter is passed or if the parameter is not a function", function(assert) {

  assert.throws(function () {
    doSomething();
  }, 'an error was thrown because no parameters are passed to "doSomething()"');

  assert.throws(function () {
    doSomething("");
  }, 'an error was thrown because an empty string is the parameter');

  assert.throws(function () {
    doSomething('function');
  }, 'an error was thrown because a string is the parameter"');

  assert.throws(function () {
    doSomething(null);
  }, 'an error was thrown because "null" is the parameter');

  assert.throws(function () {
    doSomething(undefined);
  }, 'an error was thrown because "undefined" is the parameter');

  assert.throws(function () {
    doSomething(new Symbol("a symbol"));
  }, 'an error was thrown because an ES2015 symbol is the parameter"');

  assert.throws(function () {
    doSomething(345345);
  }, 'an error was thrown because an number is the parameter');
  ...
  // shortened so it's more readable
&lt;/script&gt;
</code></pre>

<em>(Side note: Running <code>assert.throws()</code> in two different tests isn’t <a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself">DRY</a>. I couldn’t find a way to DRY everything like I wanted, so this is something I’ll research in the future. Feel free to let me know if you have a cool way to do it.)</em>

The tests pass with 100% code coverage:

<img src="/img/unit-testing-image-07.jpg" alt="Third code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

We can now implement James’ final code for this at the bottom of <code>scripts.js</code>:
<pre><code class="language-javascript">
// scripts.js
...
var sayBigDeal = function() {
  var message = "I'm kind of a big deal";
  log(message);
}

doSomething(sayBigDeal); // logs the second "I'm kind of a big deal"
</code></pre>
<a name="testing-more-functional-programming-composition"></a>
<h2>Testing more functional programming composition</h2>
James Sinclair’s FP post demonstrated composition with another function that built a carousel:
<pre><code class="language-javascript">
function initialiseCarousel(id, frequency) {
  var el = document.getElementById(id);
  var slider = new Carousel(el, frequency);
  slider.init();
  return slider;
}

initialiseCarousel('main-carousel', 3000);
</code></pre>
A lot going on here:
<ul>
  <li class="post__list-item"><code>initialiseCarousel()</code> takes an <code>id</code> and <code>frequency</code> parameter.</li>
  <li class="post__list-item"><code>id</code> is in the <code>el</code> variable, which finds an element on the page.</li>
  <li class="post__list-item">the <code>el</code> variable and <code>frequency</code> parameter get passed to a <code>slider</code> variable, which is an instance of a constructor function called <code>Carousel()</code>.</li>
  <li class="post__list-item"><code>slider</code>‘s two parameters, <code>el</code> and <code>frequency</code>, respectively define which element is a carousel and how many times it spins.</li>
  <li class="post__list-item">instances of <code>Carousel()</code>, like <code>slider</code>, have access to an <code>init()</code> method.</li>
  <li class="post__list-item"><code>slider</code> is explicitly returned.</li>
  <li class="post__list-item">when <code>initialiseCarousel()</code> runs, it places a new carousel in a main-carousel page element and gives it a duration of 3000, which I assume represents milliseconds.</li>
</ul>
In our quest to learn JavaScript unit testing, we’ll test <code>Carousel()</code> and <code>initialiseCarousel()</code> separately. And since James’ tutorial didn’t create <code>Carousel()</code>, it’s an excellent chance to create it with TDD!
<a name="test-constructor-function"></a>
<h3>Unit test a constructor function</h3>
Since <code>Carousel()</code> is a constructor function, we can attach its parameters to <code>this</code>, then return <code>this</code> itself. So we’ll place a failing unit test for this at the bottom of the <code>script</code> tag in our test suite:

<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"Carousel()" should return a string and a number', function(assert) {

    var someString = 'some-element';
    var someNumber =  4545935234


    assert.ok(new Carousel(someString, someNumber), 'a string and a number were returned!');
  });
&lt;/script&gt;
</code></pre>
<code>Carousel</code>‘s two parameters should be a string and a number. So we’ll create two variables called <code>someString</code> and <code>someNumber</code> and pass them to <code>new Carousel()</code> in our test.

We’re using QUnit’s <code>assert.ok()</code> method, which really just checks if our actual value, <code>new Carousel(str, num)</code>, exists. I don’t know if this is the strongest unit test in the world: I just want you to be aware that <code>assert.ok()</code> is an option.

Also, take note that we’re using the <code>new</code> keyword in our assertion. This goes back to our using <code>'use strict'</code> and how function’s define their scope in that scenario.

Doing strict mode and <em>not</em> using <code>new</code> like this in your tests leads to bugs, so be sure to always use new in these cases. Read <a href="https://stackoverflow.com/questions/42459449/qunit-returns-error-in-strict-mode/42460436">the answer to the Stack Overflow question I asked about this</a> to learn more.

We’ll confirm that the test fails...
<img src="/img/unit-testing-image-08.jpg" alt="Carousel failing image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

And add the following code to <code>app.js</code>:

<pre><code class="language-javascript">
function Carousel(getElement, spinDuration) {
  this.getElement = getElement;
  this.spinDuration = spinDuration || 3000;
  if(this.getElement === undefined) {
    throw new Error('Carousel needs to know what element to load into');
  } else {
    return this;
  }
}
</code></pre>
<code>Carousel()</code> receives a getElement and spinDuration parameter. Their values will eventually get passed around to <code>initialiseCarousel()</code> when new <code>Carousel()</code> runs inside it.

We’re letting <code>spinDuration</code> be an optional parameter by giving it a default value. If it’s left blank in a <code>Carousel()</code> instance, it will automatically be set to 3000.

But we’re still expecting the <code>getElement</code> parameter: otherwise, our code won’t know where to place the carousel. So we’ll throw a console error if that’s left blank.

<em>(Side note: We’re not going to throw errors if the wrong types get passed. We’ve already done it twice and understand how it works but as a challenge, try adding them to this test on your own.)</em>

The test passes now. But our code coverage indicates that we didn’t test our thrown error functionality:

<img src="/img/unit-testing-image-09.jpg" alt="First carousel code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

So we add this test:
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"Carousel" should throw an error if an element was not passed as a parameter', function(assert) {

    assert.throws(function () {
      new Carousel();
    }, 'an error was because an element was not passed as a parameter');

  });
&lt;/script&gt;
</code></pre>
And we get 100% coverage on our tests:
<img src="/img/unit-testing-image-10.jpg" alt="Second carousel code coverage image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
Adding a carousel without parameters to the bottom of <code>scripts.js</code> consequently produces a console error when <code>index.html</code> runs in the browser:
<pre><code class="language-javascript">
// scripts.js
...
var someCarousel = new Carousel(); // logs "Carousel needs to know what element to load into"
</code></pre>

But no errors appear when we pass both parameters...


// scripts.js
var someCarousel = new Carousel('carousel-one', 5435);
someCarousel.init(); // show “The carousel-one carousel has started” on index.html

var someOtherCarousel = new Carousel('carousel-two');
someOtherCarousel.init(); // show “The carousel-two carousel has started” on index.html
</code></pre>
<pre><code class="language-javascript">
// scripts.js
...
var someCarousel = new Carousel('carousel-one', 5345); // no console errors
</code></pre>

Or even just one element parameter since we have a default value for <code>spinDuration</code>:
<pre><code class="language-javascript">
// scripts.js
...
var someOtherCarousel = new Carousel('carousel-two'); // no console errors
</code></pre>

<a name="init-method"></a>
<h3>The <code>init()</code> method</h3>
We’ll just make the carousel’s <code>init()</code> method load text into the carousel page element. We’ll add the following test for this at the bottom of the <code>script</code> tag in the test suite:
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"Carousel()" should run its init() method and load the proper text', function(assert) {

    var testCarousel = new Carousel('qunit-fixture');
    testCarousel.init();

    assert.equal($('#qunit-fixture').html(), 'The qunit-fixture carousel has started.', 'init() ran and loaded the proper text!');
  });
&lt;/script&gt;
</code></pre>

We create a new instance of <strong>Carousel()</strong> called testCarousel and pass <code>qunit-fixture</code> as its single parameter. <code>qunit-fixture</code> points to the standard page element where QUnit loads other elements that need testing.

(<em>Side note: elements that load into <code>qunit-fixture</code> for testing are removed when the tests are done.)</em>

We don’t need to pass a number for the <code>spinDuration</code> parameter. We already gave it a default value in the <strong>Carousel()</strong> function in <code>app.js</code>, so this test should pass without it.

<code>init()</code> should place a custom message in <code><div id="qunit-fixture" /></code> that says <code>"The qunit-fixture carousel has started."</code>. Then we’ll use jQuery’s <code>html()</code> function to look in the qunit-fixture and see if its copy matches our message.

If the copy matches, our QUnit test will say <code>"a slider was returned!"</code> But for now, we have a failing test:
<img src="/img/unit-testing-image-11.jpg" alt="Init failing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

Adding this code to the bottom of app.js will get things to work:
<pre><code class="language-javascript">
// app.js
...
Carousel.prototype.init = function() {
  var getCarousel = document.getElementById(this.getElement);
  getCarousel.innerHTML = 'The ' + this.getElement + ' carousel has started.';
};
</code></pre>
We’ve followed JavaScript best practices and placed init() on Carousel‘s prototype instead of in the Carousel constructor function. It finds the element defined in Carousel using document.getElementById(), which is this.element, and stores it in a getCarousel variable.

Next, init() takes the value of this.element and uses it to build a custom message. The message gets loaded into whatever element getCarousel points to.

As a result, our unit test passes with 100% code coverage:
<img src="/img/unit-testing-image-12.jpg" alt="Init passing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
And if we run <code>init()</code> two times at the bottom of <code>scripts.js</code>...

<pre><code class="language-javascript">
// scripts.js
var someCarousel = new Carousel('carousel-one', 5435);
someCarousel.init(); // show “The carousel-one carousel has started” on index.html

var someOtherCarousel = new Carousel('carousel-two');
someOtherCarousel.init(); // show “The carousel-two carousel has started” on index.html
</code></pre>
And two text blocks will show up in the <code>carousel-one</code> and <code>carousel-two</code> page elements when <code>index.html</code> runs in the browser.
<a name="test-returned-function"></a>
<h3>Unit test the returned function</h3>
In James’ example, the returning function, <code>initialiseCarousel()</code> was expected to return a new instance of <code>Carousel()</code>. A failing test for that looks like this:

<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"initialiseCarousel()" should return a new instance of Carousel()', function(assert) {

    var testCarouselInstance = initialiseCarousel('qunit-fixture', 3000);
    var isCarouselInstance = testCarouselInstance instanceof Carousel;
    assert.ok(isCarouselInstance, 'a new instance of Carousel() was returned!');

  });
&lt;/script&gt;
</code></pre>
We’re testing with <code>assert.ok()</code> again. The test has a description and a callback as usual and the callback has two variables:

<ul>
  <li class="post__list-item"><code>testCarouselInstance</code> stores an invocation of <code>initialiseCarousel()</code> that creates a carousel in <code>&lt;div id="qunit-fixture" /&gt;</code> with a 3000 millisecond duration.</li>
  <li class="post__list-item"><code>isCarouselInstance</code> stores a test for if <code>testCarouselInstance</code> is actually an instance of <code>Carousel</code> using <code>instanceof</code>.</li>
</ul>

So we have a failing test right now...
<img src="/img/unit-testing-image-13.jpg" alt="initialiseCarousel failing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

Then we get to pass by adding James’ original to <code>app.js</code>...

<pre><code class="language-javascript">
//app.js
...
function initialiseCarousel(id, frequency) {
  var el = document.getElementById(id);
  var slider = new Carousel(el, frequency);
  slider.init();
  return slider;
}
</code></pre>
And the test passes...
<img src="/img/unit-testing-image-14.jpg" alt="initialiseCarousel passing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

And since our tests confirm that a new <code>Carousel()</code> instance exists and we’re explicitly returning that instance (<code>slider</code>), we can agree that our test is accurate.

We can now invoke <code>initialiseCarousel()</code> in <code>scripts.js</code> to get it working in live code:

<pre><code class="language-javascript">
// scripts.js
...
var testCarousel = initialiseCarousel('main-carousel', 3000); // "The main-carousel carousel has started" displays on the page
</code></pre>
<code>index.html</code> displays “The main-carousel carousel has started” when it runs in the browser. And since we’re already getting the DOM element in <code>Carousel()</code>, we can refactor <code>initialiseCarousel()</code> and removing that functionality from it:
<pre><code class="language-javascript">
//app.js
...
function initialiseCarousel(id, frequency) {
  var slider = new Carousel(id, frequency);
  slider.init();
  return slider;
}
</code></pre>

Note that <code>id</code> replaces <code>el</code> in slider‘s parameter.
<a name="bring-it-altogether"></a>
<h2>Bringing it altogether</h2>
James’ last example performs roughly the same functionality as the others:

<pre><code class="language-javascript">
function addMagic(id, effect) {
  var element = document.getElementById(id);
  element.className += ' magic';
  effect(element);
}

addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbow);
</code></pre>
<code>addMagic()</code> takes <code>id</code> and <code>effect</code> as parameters. <code>id</code> is passed to the <code>element</code> variable inside <code>addMagic()</code>, where <code>element</code> references a page element.

<code>element</code> gets a class named <code>magic</code> added to it. It also has an effect function invoked inside it, hence, the <code>effect</code> parameter.

<code>effect</code> can be either <code>spin</code>, <code>sparkle</code> or <code>rainbow</code>. Like before, we’ll update these functions to load text inside of a page element.

We can unit test all this using everything we’ve learned up to this point. Our first failing test looks like this:

<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('addMagic() should return a function and add a "magic" class to the target element', function(assert) {

    function returnFunc(){}
    addMagic('qunit-fixture', returnFunc);

    assert.equal(typeof returnFunc, 'function', 'the function was returned successfully!');
    assert.equal($('#qunit-fixture').hasClass('magic'), true, 'The targeted element has a class named "magic" !');

  });;
&lt;/script&gt;
</code></pre>
The test invokes <code> addMagic()</code> to find the <code>qunit-fixture</code> page element and return a function named <code>returnFunc</code>. We’ve tested for returned functions before only this time, we’re testing for this using <code>typeof</code> in our first <code>assert</code>.

The second assert tests if the <code>magic</code> class was dynamically added. It uses jQuery’s <code>hasClass</code> functionality to do so.

The test structure for the three effects is a little different:
<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.module('addMagic() effect tests', function() {
    QUnit.test('spin() should load "spinning..." into its targeted element', function(assert) {
      addMagic('qunit-fixture', spin);
      assert.equal($('#qunit-fixture').html(), 'spinning...', 'The targeted element contains text that says "spinning..."');
    });

    QUnit.test('sparkle() should load "sparkling..." into its targeted element', function(assert) {
      addMagic('qunit-fixture', sparkle);
      assert.equal($('#qunit-fixture').html(), 'sparkling...', 'The targeted element contains text that says "sparkling..."');
    });

    QUnit.test('rainbow() should load "rainbowing..." into its targeted element', function(assert) {
      addMagic('qunit-fixture', rainbow);
      assert.equal($('#qunit-fixture').html(), 'rainbowing...', 'The targeted element contains text that says "rainbowing..."');
    });

  });
&lt;/script&gt;
</code></pre>
Each test passes an effect to <code>addMagic</code> as a parameter. Since each effect places text inside a page element, we’re using jQuery’s <code>html()</code> function again to look for the existence of that text.

This time though, we’re wrapping all these tests inside <code>QUnit.module()</code>. This groups these three tests and makes them stand out a little in our test suite, which is a bit more readable.

So, we have our failing tests now...
<img src="/img/unit-testing-image-15.jpg" alt="addMagic failing test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

Adding this code to <code>app.js</code> makes the tests pass...
<pre><code class="language-javascript">
// app.js
...
function addMagic(id, effect) {
  if(!id || !effect) {
    throw new Error('addMagic() needs an id and effect parameter');
  } else {
    var element = document.getElementById(id);
    element.className += ' magic';
    return effect(element);
  }
}

function spin(getElement){
  getElement.innerHTML = 'spinning...';
}

function sparkle(getElement){
  getElement.innerHTML = 'sparkling...';
}

function rainbow(getElement){
  getElement.innerHTML = 'rainbowing...';
}
</code></pre>
We’ve slightly adjusted <code>addMagic()</code> where it throws an error if either of its parameters aren’t passed. We’ve also explicitly returned the <code>effect</code> invocation.

Next, we create our three very simple effect functions. Again, they just load some text in whatever page element is defined by their <code>getElement</code> parameters.

We look at our test suite, including the code coverage..
<img src="/img/unit-testing-image-16.jpg" alt="First addMagic code coverage test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
First addMagic code coverage test image for the learn JavaScript unit testing post

And we see that the tests pass, but not with 100% code coverage.
<img src="/img/unit-testing-image-17.jpg" alt="Second addMagic code coverage test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">
This is due to our not testing <code>addMagic</code>‘s error throwing functionality. Adding a couple of <code>assert.throws()</code> tests will fix this...

<pre><code class="language-markup">
&lt;!-- test/tests.html --&gt;
&lt;script&gt;
  ...
  QUnit.test('"addMagic()" should throw an error if less than 2 parameters are passed', function(assert) {

    assert.throws(function () {
      addMagic();
    }, 'an error was thrown because no parameters were passed to "addMagic()"');

    assert.throws(function() {
      addMagic(spin);
    }, 'an error was thrown because only one parameter was passed to "addMagic()"');

  });
&lt;/script&gt;
</code></pre>

And looking at our test suite and code coverage confirms this. Note that the grouped “addMagic() effect tests” are moved below these new tests even though the grouped tests are above them in the suite code.

<img src="/img/unit-testing-image-18.jpg" alt="Second addMagic throw error test image for the learn JavaScript unit testing post" class="post__image" style="float: none; margin-top: 10px;">

So we can add this code to <code>scripts.js</code>...

<pre><code class="language-javascript">
// scripts.js
...
addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbow);
</code></pre>

And copy loads into elements already on the page.

<a name="further-reading"></a>
<h2>Further reading</h2>
I’ll start with the JS unit test stuff first...

<ul>
  <li class="post__list-item"><a href="https://www.amazon.com/gp/product/0321683919/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=kaidez-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=0321683919&linkId=dc8b88c6ddc8995efab28bd0dc4ca8e2"><strong>Test-Driven JavaScript Development</strong></a> & <a href="https://www.amazon.com/gp/product/1449323391/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=kaidez-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=1449323391&linkId=1e8169ef34f55c9c2e02a46d63bdf0d3">Testable JavaScript</a>: These two books stand from the others in the JavaScript unit testing worls. The second one is easier to read, but the first one is the most thorough book on the subject. You may want to read Testable first but make sure to read Test-Driven at some point.</li>
  <li class="post__list-item"><a href="https://code.tutsplus.com/articles/tdd-terminology-simplified--net-30626"><strong>TDD Terminology Simplified</strong></a>: Truthfully? This is list of terms can be applied to unit testing overall and not just TDD. And if you’re concerned that I didn’t cover JavaScript unit testing top to bottom, this list is the next step. For example: we saw earlier that elements which load into <code>qunit-fixture</code> for testing are removed when the tests are done. Keep that in mind, then go to this link and read about “setups” and “teardowns.”</li>
  <li class="post__list-item"><a href="https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d#.oxz430giw"><strong>5 Questions Every Unit Test Must Answer</strong></a>: A general primer from <a href="https://twitter.com/_ericelliott">Eric Elliot</a> on JavaScript unit testing with some smart best practices. Check out how he suggests using <code>equal</code> tests only for a week and his pattern for creating actual/expected tests in constants.</li>
  <li class="post__list-item"><a href="https://alistapart.com/article/writing-testable-javascript"><strong>Writing Testable Javascript</strong></a>: A nice high-level view by <a href="https://twitter.com/rmurphey">Rebecca Murphey</a> of how to write FP-like code that’s easy to test...also watch <a href="https://www.youtube.com/watch?v=OzjogCFO4Zo">her conference talk of the same name</a>.</li>
  <li class="post__list-item"><a href="https://github.com/rmurphey/js-assessment"><strong>JS Assessment</strong></a> & <a href="https://www.codewars.com/"><strong>Codewars</strong></a>: The first one is a CLI-powered test (also by Rebecca Murphey) and the second one’s an app. Each one requires you to write code that passes tests before moving forward. Codewars has a badge-like point system that’s pretty cool.</li>
</ul>

Here’s some functional programming stuff...

<ul>
  <li class="post__list-item"><a href="http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-intro/"><strong>James Sinclair’s four-part functional programming tutorial</strong></a>: this post only covers the first part...read the whole thing!</li>
  <li class="post__list-item"><a href="https://medium.com/javascript-scene/tagged/functional-programming"><strong>All of Eric Elliot’s functional programming writings</strong></a>: back to Eric Elliot again, he’s written extensively on the subject, and with great insight.</li>
  <li class="post__list-item"><a href="http://eloquentjavascript.net/1st_edition/chapter6.html"><strong>Eloquent JavaScript – First Edition</strong></a>, Chapter 6 & <a href="http://eloquentjavascript.net/05_higher_order.html"><strong>Eloquent JavaScript – Second Edition</strong></a>, Chapter 5: both are good, both are slightly different from one another. Read both.</li>
</ul>

<a name="conclusion"></a>
<h2>Conclusion</h2>
Any developer can learn JavaScript unit testing. But not until they understand that they can never again place 50 lines of code in a single <code>$(document).ready()</code> block.

They must realize that using functional programming to create small, testable functions will make them an awesome JS unit tester. And a better developer as well!!!