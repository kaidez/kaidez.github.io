---
layout: post
comments: true
title:  "Display Average Temperatures with Functional Programming"
date:   2017-12-18 22:01:59 -0400
categories: tutorials
category-name: Tutorials
permalink: /temperatures-functional-programming/
excerpt: Use JavaScript functional programming to display average temperatures in certain cities. Uses the .map() & .reduce() methods. Includes demo.
og-image: temperature-functional-programming.jpg
thumb-image: temperature-functional-programming-thumb.jpg
---
<a href="https://codepen.io/kaidez/pen/qpZrzw">See Demo &raquo;</a>

As mentioned both <a href="/format-dates-functional-programming/">here</a> and <a href="/functional-programming-link/">here</a>, I try to write as much <a href="http://eloquentjavascript.net/1st_edition/chapter6.html">JavaScript Functional Programming</a> as I can. Even if it's just for practice.

I can across a pretty neat challenge on a Facebook beginning developers group I help to administer. The challenge provided some good FP practice.

<h2>Table of Contents</h2>
<ol>
  <li class="post__list-item"><a href="#challenge">The Challenge</a></li>
  <li class="post__list-item"><a href="#solution">The Solution</a></li>
  <li class="post__list-item"><a href="#basic-code">The Basic Code</a></li>
  <li class="post__list-item"><a href="#determine-arrays">Determine the inner arrays</a></li>
  <li class="post__list-item"><a href="#site-speed">Site Speed is "Fine", But Not "Perfect"</a></li>
  <li class="post__list-item"><a href="#the-rest">Practicing With the Rest</a></li>
  <li class="post__list-item"><a href="#conclusion">Conclusion</a></li>
</ol>

<a name="challenge"></a>
<h2>The Challenge</h2>
There was an array of arrays. Each inner array represented either column header info or a list of temperatures for a given city, with the city name included.

The array of arrays looked like this:
<pre><code class="language-javascript">
const tempen = [
  ["Malmö", 12, 16, 9],
  ["Mariestad", 13, 15, 10],
  ["Stockholm", 13, 15, 13],
  ["City", "00-08", "08-16", "16-24", "Average"],
  ["Upphärad", 14, 16, 15],
  ["Göteborg", 13, 14, 11]
];
</code></pre>

I had to calculate the average temperature for each city, then run code that displayed the array data like this:
<img src="/img/temperature-display.jpg" class="post__image">
There were a few challenges here:
<ul>
  <li class="post-list-item">How do I look at just the numbers in the array to get the average?</li>
  <li class="post-list-item">How do I do that while ignoring the city that's in the array?</li>
  <li class="post-list-item">How do I display all these arrays with reusable functions, while understanding that the one array is header content and the rest is temperature/city content?</li>
</ul>

<a name="solution"></a>
<h2>The Solution</h2>
The solution was, well, to use functional programming. In other words, I had to <strong>create separate functions that implemented specific parts of the above-described tasks</strong>.

I did this by:
<ul>
  <li class="post-list-item">creating a function that determines whether or not the inner array has temperatures.</li>
  <li class="post-list-item">creating a function that calculates the temperature average.</li>
  <li class="post-list-item">creating a function that displays the content on the page.</li>
  <li class="post-list-item">getting all these functions to work together as a team.</li>
</ul>

<a name="basic-code"></a>
<h2>The Basic Code</h2>
The HTML will look like this:
<pre><code class="language-markup">
&lt;div class="temperature-info__container">
  &lt;div id="temperatureHeader" class="temperature-info__header">&lt;/div>
  &lt;div id="temperatureInfo">&lt;/div>
&lt;/div>
</code></pre>

The <a href="http://getbem.com/introduction/">BEM-like CSS</a> will look like this:
<pre><code class="language-css">
.temperature-info__container {
  width: 650px;
}

.temperature-info__header {
  font-weight: bold;
  font-style: italic;
  text-transform: uppercase;
}

.temperature-info__single-temp-row {
  margin-bottom: 10px;
}

.temperature-info__single-temp {
  width: 100px;
  display: inline-block;
  margin-right: 30px;
}
</code></pre>
<a name="determine-arrays"></a>
<h2>Determine the inner arrays</h2>
First, I created a function that checked whether or not an inner array had numeric temperature values. If it did, it started a process that created a new array containing the average temperature and the city.

If the array didn't have temperature values, I assumed that it was the array that contained strings but no numbers. This is the array that starts with <code>"City"</code>, so I just loaded it onto the page as column headers.

This first function is called <code>buildNewArrays()</code>: it's important to note that running this function against our data is the catalyst for loading content onto the page. In other words, when we run <code>buildNewArrays(tempen)</code>, it runs other functions that help display the content.

<code>buildNewArrays()</code> looks like this:
<pre><code class="language-javascript">
function buildNewArrays(outerArray) {

  outerArray.map(innerArray => {

    let numbersOnlyArray = []

    innerArray.map(index => {
      if(typeof index === "number") {
        numbersOnlyArray.push(index)
      }
    })

    numbersOnlyArray.length > 0 ? displayTemperatureAverage(numbersOnlyArray, innerArray[0]) : displayContent(innerArray, "#temperatureHeader")
  })
}
</code></pre>
Breaking all this down...

<pre><code class="language-javascript">
function buildNewArrays(outerArray) {
 ...
}
</code></pre>

<code>buildNewArrays</code> takes one parameter: <code>outerArray</code>. <code>tempen</code> will be the passed param eventually.

<pre><code class="language-javascript">
outerArray.map(innerArray => {
  ...
})
</code></pre>

Loop through the array of arrays Do a <code>.map()</code> loop  The <code>innerArray</code> param wll represent each single array inside <code>tempen</code>.

<pre><code class="language-javascript">
let numbersOnlyArray = []
</code></pre>

Inside this loop, create an empty array that will eventually contains number types only.

<pre><code class="language-javascript">
innerArray.map(index => {
  if(typeof index === "number") {
    numbersOnlyArray.push(index)
  }
})
</code></pre>

Do another <code>.map()</code> loop inside the first loop, which loops over each item in the inner array. If the item is a number, place it inside the <code>numbersOnlyArray</code> array.

In other words, looking at the <code>tempen</code> constant means that the <code>index</code> param will look at this array at some point:
<pre><code class="language-javascript">["Malmö", 12, 16, 9]</code></pre>

And when it does, it will make <code>numbersOnlyArray</code> look like this:
<pre><code class="language-javascript">[12, 16, 9]</code></pre>

It's REAAAAAAALY important to note that the <code>index</code> param will also look like this at some point:
<pre><code class="language-javascript">["City", "00-08", "08-16", "16-24", "Average"]</code></pre>

But it has no numbers so this will produce an empty <code>numbersOnlyArray</code>, with a length of "0".

<pre><code class="language-javascript">
numbersOnlyArray.length
?
displayTemperatureAverage(numbersOnlyArray, innerArray[0])
:
displayContent(innerArray, "#temperatureHeader")
</code></pre>
As seen, <code>numbersOnlyArray</code> can have a length, where each of its array items represents a temperature. If it does have a length, pass it as a parameter to the <code>displayTemperatureAverage()</code> function that we haven't built yet.

<code>displayTemperatureAverage()</code> takes a second param: <code>innerArray[0]</code>. This will represent the city in one of <code>tempen</code> the inner arrays.

<em>(If you're unclear about this, look at the part above that starts discussing running a <code>map()</code> loop inside another loop.)</em>

If <code>numbersOnlyArray</code> does NOT have a length, we'll assume that we're looking at an empty array...the one that starts with <code>"City"</code>. In that case, run tha array using the <code>displayContent()</code> function that we also haven't built yet.

<code>displayContent()</code> displays the array content on the page and takes two params: the current <code>innerArray</code> and a reference to page element reference where this array content will load. In this instance, that's the <code><div id="temperatureHeader" /></code> element.












<a name="conclusion"></a>
<h2>Conclusion</h2>

Feel free to suggest changes.