---
layout: post
comments: true
title:  "Display Temperature Averages with JavaScript Functional Programming"
date:   2017-12-18 22:01:59 -0400
categories: tutorials
category-name: Tutorials
permalink: /temperatures-functional-programming/
excerpt: Use JavaScript functional programming to display average temperatures in certain cities. Uses the .map() & .reduce() methods. Includes demo.
og-image: temperature-functional-programming.jpg
thumb-image: temperature-functional-programming-thumb.jpg
---
<a href="https://codepen.io/kaidez/pen/qpZrzw">See Demo &raquo;</a>

As mentioned both <a href="/format-dates-functional-programming/">here</a> and <a href="/functional-programming-link/">here</a>, I try to write as much <a href="http://eloquentjavascript.net/1st_edition/chapter6.html">JavaScript Functional Programming</a> when possible. Even when it's just for practice.

I came across a pretty neat challenge on a Facebook beginning developers group I help to administer. The challenge provided some good FP practice.

<h2>Table of Contents</h2>
<ol>
  <li class="post__list-item"><a href="#challenge">The Challenge</a></li>
  <li class="post__list-item"><a href="#solution">The Solution</a></li>
  <li class="post__list-item"><a href="#basic-code">The Basic Code</a></li>
  <li class="post__list-item"><a href="#determine-arrays">Determine the Inner Arrays</a></li>
  <li class="post__list-item"><a href="#reducer-helper">Build the Reducer Helper</a></li>
  <li class="post__list-item"><a href="#display-temperature-info">Display the Temperature Information</a></li>
  <li class="post__list-item"><a href="#conclusion">Conclusion</a></li>
</ol>

<a name="challenge"></a>
<h2>The Challenge</h2>
There was an array of arrays. Each inner array represented either column header info or a list containing both temperatures for a city and the city name itself.

The array of arrays looked like this:
<pre><code class="language-javascript">
[
  ["City", "00-08", "08-16", "16-24", "Average"],
  ["Malmö", 12, 16, 9],
  ["Mariestad", 13, 15, 10],
  ["Stockholm", 13, 15, 13],
  ["Upphärad", 14, 16, 15],
  ["Göteborg", 13, 14, 11]
]
</code></pre>

I had to calculate the average temperature for each city, then run code that displayed the array data like this:
<img src="/img/temperature-display.jpg" class="post__image">
There were a few challenges here:
<ul>
  <li class="post-list-item">How do I look at <em>just</em> the numbers in the array to get the average?</li>
  <li class="post-list-item">How do I do that while ignoring the city that's in this array?</li>
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
  <li class="post-list-item">getting all these functions to work together as a team to display the array content on the page.</li>
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
<h2>Determine the Inner Arrays</h2>
First, I created a function that checked if the inner array had numeric temp values. If it did, the function created a new array containing:

<ul>
  <li class="post-list-item">this inner array's temperatures.</li>
  <li class="post-list-item">their average temperature.</li>
  <li class="post-list-item">their respective city.</li>
</ul>

If that array didn't have temperature values, I assumed it was the array that contained strings but no numbers. This would be the array that starts with <code>"City"</code> so I just loaded it onto the page as column headers.

The array of arrays were store in a const called <code>temperatureInfo</code>:
<pre><code class="language-javascript">
const temperatureInfo = [
  ["City", "00-08", "08-16", "16-24", "Average"],
  ["Malmö", 12, 16, 9],
  ["Mariestad", 13, 15, 10],
  ["Stockholm", 13, 15, 13],
  ["Upphärad", 14, 16, 15],
  ["Göteborg", 13, 14, 11]
]
</code></pre>

This first function is called <code>buildNewArrays()</code>: it's important to note that running this function against our data is the catalyst for loading content onto the page. In other words, when we run <code>buildNewArrays(temperatureInfo)</code>, it runs other functions that help display the content.

<code>buildNewArrays()</code> looks like this:
<pre><code class="language-javascript">
function buildNewArrays(outerArray) {

  outerArray.map(innerArray => {

    let numbersOnlyList = []

    innerArray.map(index => {
      if(typeof index === "number") {
        numbersOnlyList.push(index)
      }
    })

    numbersOnlyList.length
    ?
    displayTemperatureInfo(numbersOnlyList, innerArray[0])
    :
    displayContent(innerArray, "#temperatureHeader")
  })
}
</code></pre>
Breaking all this down...

<pre><code class="language-javascript">
function buildNewArrays(outerArray) {
 ...
}
</code></pre>

<code>buildNewArrays</code> takes one parameter: <code>outerArray</code>. <code>temperatureInfo</code> will be the passed param eventually.

<pre><code class="language-javascript">
outerArray.map(innerArray => {
  ...
})
</code></pre>

Loop through the array of arrays with a <code>.map()</code> loop.  The <code>innerArray</code> param wll represent each single array inside <code>temperatureInfo</code>.

<pre><code class="language-javascript">
let numbersOnlyList = []
</code></pre>

Inside this loop, create an empty array that will eventually contains number types only.

<pre><code class="language-javascript">
innerArray.map(index => {
  if(typeof index === "number") {
    numbersOnlyList.push(index)
  }
})
</code></pre>

Do another <code>.map()</code> loop inside the first loop, which loops over each item in an inner array. If the item is a number, place it inside the <code>numbersOnlyList</code> array, otherwise do nothing.

In other words, when looking at the inner arrays, the <code>index</code> param will look like this at some point:
<pre><code class="language-javascript">["Malmö", 12, 16, 9]</code></pre>

And when it does, the <code>innerArray.map()</code> loop will make <code>numbersOnlyList</code> look like this:
<pre><code class="language-javascript">[12, 16, 9]</code></pre>

It's REAAAAAAALY important to note that the <code>index</code> param will also look like this at some point:
<pre><code class="language-javascript">["City", "00-08", "08-16", "16-24", "Average"]</code></pre>

But this param has no numbers. Consequently, this will produce an empty <code>numbersOnlyList</code> array, giving it a length of "0".

<pre><code class="language-javascript">
numbersOnlyList.length
?
displayTemperatureInfo(numbersOnlyList, innerArray[0])
:
displayContent(innerArray, "#temperatureHeader")
</code></pre>
As seen, <code>numbersOnlyList</code> can have a length, where each of its array items represents a list of temperatures. If it does have a length, pass it as a parameter to the <code>displayTemperatureInfo()</code> function that we haven't built yet.

We'll discuss <code>displayTemperatureInfo()</code> in depth later but for now, know that this function will:
<ul>
  <li class="post-list-item">calculate the average temperature.</li>
  <li class="post-list-item">create a new array containing that average temperature, the already-existing temperature list and city name.</li>
  <li class="post-list-item">load this new array's content onto the page.</li>
</ul>

<code>displayTemperatureInfo()</code> takes a second param called <code>innerArray[0]</code>: again, <code>innerArray</code> will look like <code>["Malmö", 12, 16, 9]</code> at some point. We know that the city name is at the beginning of the array, so <code>innerArray[0]</code> points directly to that.

If <code>numbersOnlyList</code> does NOT have a length, we'll assume that we're looking at an empty array...created by that inner array starting with <code>"City"</code>. In that case, run that array using the <code>displayContent()</code> function that we also haven't built yet.

<code>displayContent()</code> loads the array content on the page and takes two params: the current <code>innerArray</code> index and a reference to page element where this array content will load. In this instance, that's the <code><div id="temperatureHeader" /></code> element.

<a name="reducer-helper"></a>
<h2>The Build the Reducer Helper</h2>
The <code>.reduce()</code> method calculates the total sum of an array.  We'll need to do this to get the average temperatures but can't do it without something called an "accumulator function."

This accumulator function returns the sum and we'll create a basic one like this:

<pre><code class="language-javascript">
function reducerHelper(accumulator, currentValue) {
  return accumulator + currentValue
}
</code></pre>

<a name="display-temperature-info"></a>
<h2>Display the Temperature Information</h2>
Again, <code>displayTemperatureInfo()</code> calculates the average temperature, creates a new array with all the temperatures, average temperature and city name, then loads the array content onto the page. It looks like this:
<pre><code class="language-javascript">
function displayTemperatureInfo(temperatureArray, getCity) {

  const arrayLength = temperatureArray.length
  const getTemperatureSum = temperatureArray.reduce(reducerHelper)
  const average = getTemperatureSum/arrayLength

  temperatureArray.push(Math.round(average))

  temperatureArray.unshift(getCity)

  return displayContent(temperatureArray, "#temperatureInfo")

}
</code></pre>
Breaking this one down now...

<pre><code class="language-javascript">
function displayTemperatureInfo(temperatureArray, getCity) {
 ...
}
</code></pre>
<a name="conclusion"></a>
<h2>Conclusion</h2>

Feel free to suggest changes.