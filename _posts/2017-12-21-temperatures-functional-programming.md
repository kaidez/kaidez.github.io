---
layout: post
comments: true
title:  "Display Average Temperatures with Functional Programming"
date:   2017-12-18 22:01:59 -0400
categories: tutorials
category-name: Tutorials
permalink: /temperatures-functional-programming/
excerpt: Use JavaScript functional programming to display average temperatures in certain cities. Uses the .map() & .reduce() methods. Includes demo.
og-image: functional-programming-react.jpg
thumb-image: functional-programming-react-thumb.jpg
---
<a href="https://codepen.io/kaidez/pen/qpZrzw">See Demo &raquo;</a>

As mentioned both <a href="/format-dates-functional-programming/">here</a> and <a href="/functional-programming-link/">here</a>, I try to write as much <a href="http://eloquentjavascript.net/1st_edition/chapter6.html">JavaScript functional programming</a> as I can. Even if it's just for practice.

I can across a pretty neat challenge on a Facebook beginning developers group I help to administer. This challenge provided some good practice.

<h2>Table of Contents</h2>
<ol>
  <li class="post__list-item"><a href="#challenge">The Challenge</a></li>
  <li class="post__list-item"><a href="#solution">The Solution</a></li>
  <li class="post__list-item"><a href="#determine-arrays">Determine the inner arrays</a></li>
  <li class="post__list-item"><a href="#site-speed">Site Speed is "Fine", But Not "Perfect"</a></li>
  <li class="post__list-item"><a href="#the-rest">Practicing With the Rest</a></li>
  <li class="post__list-item"><a href="#conclusion">Conclusion</a></li>
</ol>

<a name="challenge"></a>
<h2>The Challenge</h2>
There was an array of arrays. Each inner array representing either column header info or a list of temperatures for a given city.

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
There are quite a few challenges here:
<ul>
  <li class="post-list-item">How do I look at just the numbers in the array to get the average?</li>
  <li class="post-list-item">How do I do that while ignoring the city that's in the array?</li>
  <li class="post-list-item">How do I display all these arrays with one reusable function, while understanding that the one array is header content and the other is temperature/city content?</li>
</ul>

<a name="solution"></a>
<h2>The Solution</h2>
The solution was, well, to use functional programming. In other words, I had to create separate functions that implemented specific pieces of the above-described tasks.

I did this by:
<ul>
  <li class="post-list-item">creating a function that determines whether or not the inner array has temperatures.</li>
  <li class="post-list-item">creating a function that calculates the average.</li>
  <li class="post-list-item">creating a function that displays the content on the page.</li>
  <li class="post-list-item">getting all these functions to work together.</li>
</ul>

<a name="determine-arrays"></a>
<h2>Determine the inner arrays</h2>
First, I created a function that checked whether or not an inner array had temperature values. If it did, it started a process that created a new array containing the average temperature and the city.

If the array didn't have temperature values, I assumed that it was the array that contained strings but no numbers. This is the array that starts with <code>"City"</code>, so I just loaded it onto the page.

This first function is called <code>buildNewArrays()</code>: it's important to note that running this function against our data is the catalyst for loading content onto the page. In other words, when we run <code>buildNewArrays(tempen)</code>, it runs other functions that help display the content.

<code>buildNewArrays()</code> looks like this:
<pre><code class="language-javascript">
function buildNewArrays(outerArray) {

  /**
   * Loop through the array. "innerArray" will be the single arrays
   * in "tempen"
   */
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

<code>buildNewArrays</code> takes one parameter: <code>outerArray</code>. This param will come to represent the <code>tempen</code> constant.



<pre><code class="language-javascript">
outerArray.map(innerArray => {
  ...
})
</code></pre>

Do a <code>.map()</code> loop through each array inside the outer array which, again, is <code>tempen</code>. And the <code>innerArray</code> param represents each array item inside <code>tempen</code>.

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

Do another <code>.map()</code> loop inside that loop, which loops over each item in the inner array. If the item is a number, place it inside the <code>numbersOnlyArray</code> array.
<a name="conclusion"></a>

In other words, looking at the <code>tempen</code> constant means that the <code>index</code> param will look like this at some point:
<pre><code>["Malmö", 12, 16, 9]</code></pre>

And when it does, it will make <code>numbersOnlyArray</code> look like this:
<pre><code>[12, 16, 9]</code></pre>

It's REAAAAAAALY important to not that the <code>index</code> param will also look like this at some point:
<pre><code>["City", "00-08", "08-16", "16-24", "Average"]</code></pre>

But it has no numbers so this look shouldn't add anything to <code>numbersOnlyArray</code>, making it look like this:
<pre><code>[]</code></pre>

<h2>Conclusion</h2>

Feel free to suggest changes.