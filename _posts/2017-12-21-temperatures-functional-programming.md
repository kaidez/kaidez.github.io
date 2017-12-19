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
  <li class="post__list-item"><a href="#github-pages">Free Hosting with GitHub Pages</a></li>
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

Feel free to suggest changes.