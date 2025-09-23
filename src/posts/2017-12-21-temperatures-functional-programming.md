---
title:  "Display Temperature Averages with JavaScript Functional Programming"
date:   2017-12-21
excerpt: Use JavaScript functional programming to display average temperatures in certain cities. Uses the .map() & .reduce() methods. Includes demo.
layout: layouts/post.njk
permalink: /temperatures-functional-programming/
image: temperature-functional-programming.jpg
tags: ["tutorials"]
secondary_tags: ["javascript"]
category: Tutorials
# thumb-image: temperature-functional-programming-thumb.jpg
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
  <li class="post__list-item"><a href="#reducer-helper">The Reducer Helper</a></li>
  <li class="post__list-item"><a href="#display-temperature-info">Display the Temperature Information</a></li>
  <li class="post__list-item"><a href="#load-content">Load All the Content Onto the Page</a></li>
  <li class="post__list-item"><a href="#final-code">The Final Code</a></li>
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
<img src="/assets/img/temperature-display.jpg" class="post__image">

There were a few challenges here:
<ul>
  <li class="post__list-item">How do I look at <em>just</em> the numbers in the array to get the average?</li>
  <li class="post__list-item">How do I do that while ignoring the city in this array?</li>
  <li class="post__list-item">How do I display all these arrays with reusable functions, while understanding that the one array is header content and the rest is temperature/city content?</li>
</ul>

<a name="solution"></a>
<h2>The Solution</h2>

The solution was, well, to use functional programming. In other words, I had to <strong>create separate functions that implemented specific parts of the above-described tasks</strong>.

I did this by:
<ul>
  <li class="post__list-item">creating a function that determines whether or not the inner array has temperatures.</li>
  <li class="post__list-item">creating a function that calculates the temperature average.</li>
  <li class="post__list-item">creating a function that displays the content on the page.</li>
  <li class="post__list-item">getting all these functions to work together as a team to display the array content on the page.</li>
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
  <li class="post__list-item">this inner array's temperatures.</li>
  <li class="post__list-item">their average temperature.</li>
  <li class="post__list-item">their respective city.</li>
</ul>

If that array didn't have temperature values, I assumed it was the array that contained strings but no numbers. This would be the array above starting with <code>"City"</code> so it should load onto the page as column headers.

The array of arrays was stored in a constant called <code>temperatureInfo</code>:
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

The first function is called <code>formatData()</code>: it's important to note that running this function against our data is the catalyst for loading all the content onto the page. In other words, when we run <code>formatData(temperatureInfo)</code>, it runs other functions that help display and format the content.

<code>formatData()</code> looks like this:
<pre><code class="language-javascript">
function formatData(outerArray) {

  outerArray.map(innerArray => {

    let numbersOnlyList = []

    innerArray.map(index => {
      if(typeof index === "number") {
        return numbersOnlyList.push(index)
      }
    })

    return numbersOnlyList.length
    ?
    displayTemperatureInfo(numbersOnlyList, innerArray[0])
    :
    displayArrayContent(innerArray, "#temperatureHeader")
  })
}
</code></pre>
Breaking all this down...

<pre><code class="language-javascript">
function formatData(outerArray) {
 ...
}
</code></pre>

<code>formatData</code> takes one parameter: <code>outerArray</code>. Eventually, the <code>temperatureInfo</code> const will be the passed parameter.

<pre><code class="language-javascript">
outerArray.map(innerArray => {
  ...
})
</code></pre>

Loop through the array of arrays with the <code>.map()</code> method.  The <code>innerArray</code> param will represent one of the single arrays inside <code>temperatureInfo</code> at various times.

<pre><code class="language-javascript">
let numbersOnlyList = []
</code></pre>

Inside this loop, create an empty array that will eventually contains numbers only.

<pre><code class="language-javascript">
innerArray.map(index => {
  if(typeof index === "number") {
    return numbersOnlyList.push(index)
  }
})
</code></pre>

Run another <code>.map()</code> function inside the first loop, which loops over each item in an inner array. If the item is a number, place it inside the <code>numbersOnlyList</code> array, otherwise do nothing.

In other words, when looking at the inner arrays, the <code>index</code> param will look like this at some point:
<pre><code class="language-javascript">["Malmö", 12, 16, 9]</code></pre>

And when it does, the <code>innerArray.map()</code> loop will make <code>numbersOnlyList</code> look like this:
<pre><code class="language-javascript">[12, 16, 9]</code></pre>

It's REAAAAAAALY important to note that the <code>index</code> param will also look like this at some point:
<pre><code class="language-javascript">["City", "00-08", "08-16", "16-24", "Average"]</code></pre>

But this param has no numbers. Consequently, this will produce an empty <code>numbersOnlyList</code> array, giving it a length of "0".

<pre><code class="language-javascript">
return numbersOnlyList.length
?
displayTemperatureInfo(numbersOnlyList, innerArray[0])
:
displayArrayContent(innerArray, "#temperatureHeader")
</code></pre>
As seen, <code>numbersOnlyList</code> can have a length, where each of its array items represents a list of temperatures. If it does have a length, pass it as a parameter to the <code>displayTemperatureInfo()</code> function that we haven't built yet.

We'll create <code>displayTemperatureInfo()</code> later and discuss in depth. But for now, know that it does the following:
<ul>
  <li class="post__list-item">calculates the average temperature.</li>
  <li class="post__list-item">creates a new array containing that average temperature, the already-existing temperature list and city name.</li>
  <li class="post__list-item">loads this new array's content onto the page.</li>
</ul>

<code>displayTemperatureInfo()</code> takes a second param called <code>innerArray[0]</code>: again, <code>innerArray</code> will look like <code>["Malmö", 12, 16, 9]</code> at some point. We know that the city name is at the beginning of the array, so <code>innerArray[0]</code> points directly to that.

If <code>numbersOnlyList</code> does NOT have a length, we'll assume that we're looking at an empty array...created by that inner array starting with <code>"City"</code>. In that case, run that array using the <code>displayArrayContent()</code> function that we also haven't built yet.

<code>displayArrayContent()</code> loads the array content on the page and takes two params: the current <code>innerArray</code> index and a reference to page element where this array content will load. In this instance, that's the <code><div id="temperatureHeader" /></code> element.

<a name="reducer-helper"></a>
<h2>The Reducer Helper</h2>

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
  const temperatureAverage = getTemperatureSum/arrayLength

  temperatureArray.push(Math.round(temperatureAverage))

  temperatureArray.unshift(getCity)

  return displayArrayContent(temperatureArray, "#temperatureInfo")

}
</code></pre>
Breaking this one down now...

<pre><code class="language-javascript">
function displayTemperatureInfo(temperatureArray, getCity) {
 ...
}
</code></pre>
It takes two parameters: <code>temperatureArray</code> and <code>getCity</code>. As discussed, the first param is whatever the current value is of <code>numbersOnlyList</code> while the second param is the city name.
<pre><code class="language-javascript">
const arrayLength = temperatureArray.length
const getTemperatureSum = temperatureArray.reduce(reducerHelper)
const temperatureAverage = getTemperatureSum/arrayLength
</code></pre>

The <code>arrayLength</code> const represents the amount of temperatures in the <code>numbersOnlyList</code>. In the case of this code, that value will always be 3.

The <code>getTemperatureSum</code> const represents the sum of those values in the array. We tell the <code>.reduce()</code> method to look at that array, then get this sum by applying our accumulator function to it.

So if that array looks like <code>[12, 16, 9]</code>, then <code>getTemperatureSum</code> will equal 31.

The <code>temperatureAverage</code> const represents the array's average. Basic algebra here: you always determine an average by dividing the combined value of set of numbers by the amount of numbers in the set.

So if that array looks like <code>[12, 16, 9]</code>, then <code>temperatureAverage</code> will divide 31 by 3.

<pre><code class="language-javascript">
temperatureArray.push(Math.round(temperatureAverage))
</code></pre>

As mentioned, <code>displayTemperatureInfo()</code> adds this average to array we're working with. We add it to the <em>end</em> of the array using <code>.push()</code>.

<code>temperatureAverage</code> returns the average value as a decimal, so we'll use <code>Math.round()</code> to convert it to the nearest whole number.

<pre><code class="language-javascript">
temperatureArray.unshift(getCity)
</code></pre>

Also as mentioned, <code>displayTemperatureInfo()</code> adds the city name to array we're working with. That's available via the <code>getCity</code> parameter we passed so we'll add it to the <em>beginning</em> of the array using <code>.unshift()</code>.

<pre><code class="language-javascript">
return displayArrayContent(temperatureArray, "#temperatureInfo")
</code></pre>

Using the previously-discussed-but-not-yet-created <code>displayArrayContent()</code> function, we'll load this new array to the <code>div#temperatureInfo</code> element on our page.

<a name="load-content"></a>
<h2>Load All the Content Onto the Page</h2>

We're using a <code>displayArrayContent()</code> function to load data onto the page.  I guess we should build it now.

This is all basic DOM manipulation and look like this:
<pre><code class="language-javascript">
function displayArrayContent(arrayContent, target) {

  const getTargetElement = document.querySelector(target)
  const parentElement = document.createElement('div')
  parentElement.setAttribute('class', 'temperature-info__single-temp-row')

  arrayContent.map(index => {
    const childElement = document.createElement('span');
    childElement.setAttribute('class', 'temperature-info__single-temp')
    childElement.innerHTML = index
    parentElement.appendChild(childElement)
  })

  return getTargetElement.appendChild(parentElement)

}
</code></pre>

And...breaking this one down...

<pre><code class="language-javascript">
function displayArrayContent(arrayContent, target) {
  ...
}
</code></pre>

The function takes two parameters: <code>arrayContent</code> and <code>target</code>. Because of how we've coded stuff, <code>arrayContent</code> always represents one of the arrays we dynamically built using <code>displayTemperatureInfo()</code> while <code>target</code> represents <em>where</em> on the page we want to place it.

<pre><code class="language-javascript">
const getTargetElement = document.querySelector(target)
const parentElement = document.createElement('div')
parentElement.setAttribute('class', 'temperature-info__single-temp-row')
</code></pre>

We create two constants: <code>getTargetElement</code> and <code>parentElement</code>. <code>getTargetElement</code> is a DOM reference to the element we want to load content into (represented by <code>target</code>) while <code>parentElement</code> creates a <code>div</code> tag in memory that we'll use later.

From there, we give this <code>div</code> tag a class name of <code>temperature-info__single-temp-row</code> to apply some basic styling to it.

<pre><code class="language-javascript">
arrayContent.map(index => {
  const childElement = document.createElement('span');
  childElement.setAttribute('class', 'temperature-info__single-temp')
  childElement.innerHTML = index
  parentElement.appendChild(childElement)
})
</code></pre>
 Another <code>.map()</code> function loops over the array and does the following with each array item:

<ul>
  <li class="post__list-item">creates a <code>span</code> tag.</li>
  <li class="post__list-item">gives the <code>span</code> a class name of <code>temperature-info__single-temp</code>.</li>
  <li class="post__list-item">loads each array item into the <code>span</code> with the help of <code>innerHTML</code>.</li>
  <li class="post__list-item">places the <code>span</code> at the bottom of <code>div</code> we created earlier with the help of the <code>appendChild()</code> method.</li>
</ul>

<pre><code class="language-javascript">
return getTargetElement.appendChild(parentElement)
</code></pre>

Take our <code>div</code> with all the array content and place it at the bottom of  <code>target</code> element which, again, is an element already on our web page.

<a name="run-the-code"></a>
<h2>Run All This Code</h2>

As mentioned earlier, <code>formatData()</code> is a catalyst: running this function runs all the code needed to load the <code>temperatureInfo</code> array on the page. So all we need to do is this:

<pre><code class="language-javascript">
formatData(temperatureInfo)
</code></pre>

Neat, huh?

<a name="final-code"></a>
<h2>The Final Code</h2>

Our final, complete code looks like this:

<pre><code class="language-javascript">
const temperatureInfo = [
  ["City", "00-08", "08-16", "16-24", "Average"],
  ["Malmö", 12, 16, 9],
  ["Mariestad", 13, 15, 10],
  ["Stockholm", 13, 15, 13],
  ["Upphärad", 14, 16, 15],
  ["Göteborg", 13, 14, 11]
]

function formatData(outerArray) {

  outerArray.map(innerArray => {

    let numbersOnlyList = []

    innerArray.map(index => {
      if(typeof index === "number") {
        return numbersOnlyList.push(index)
      }

    })

    return numbersOnlyList.length
    ?
    displayTemperatureInfo(numbersOnlyList, innerArray[0])
    :
    displayArrayContent(innerArray, "#temperatureHeader")
  })
}

function reducerHelper(accumulator, currentValue) {
  return accumulator + currentValue
}

function displayTemperatureInfo(temperatureArray, getCity) {

  const arrayLength = temperatureArray.length
  const getTemperatureSum = temperatureArray.reduce(reducerHelper)
  const temperatureAverage = getTemperatureSum/arrayLength

  temperatureArray.push(Math.round(temperatureAverage))

  temperatureArray.unshift(getCity)

  return displayArrayContent(temperatureArray, "#temperatureInfo")

}


function displayArrayContent(arrayContent, target) {

  const getTargetElement = document.querySelector(target)
  const parentElement = document.createElement('div')
  parentElement.setAttribute('class', 'temperature-info__single-temp-row')

  arrayContent.map(index => {
    const childElement = document.createElement('span');
    childElement.setAttribute('class', 'temperature-info__single-temp')
    childElement.innerHTML = index
    parentElement.appendChild(childElement)
  })

  return getTargetElement.appendChild(parentElement)

}

formatData(temperatureInfo)
</code></pre>

<a name="conclusion"></a>
<h2>Conclusion</h2>

This code has brittle spots:
<ul>
  <li class="post__list-item">Pointing to the city name using <code>innerArray[0]</code> assumes that the city name will always be the first item in the array...and it may not be. I <em> should</em> do something like use a regular expression to pick out the strings and numbers and then load stuff, or send an error message to the console indicating that the array needs to be properly formatted.</li>
  <li class="post__list-item">Using <code>appendChild()</code> to load in the array data places it at the bottom of the page element. The way I wrote the code displayed the column header data first: it may have loaded second or third if I wrote it a different way. I should've written code that detects that specific array, then <em>prepends</em> its data instead of <em>appends</em></li>
</ul>

It also should be said that, based on modern web dev techniques, <code>temperatureInfo</code> would be built with more stricter rules. It would be built using back-end web services and be returned in a JSON format.

But none of that's the point. The point is that I did some JavaScript functional programming and did a job I'm proud of. The practice is what counts.

Feel free to suggest changes, ask questions, etc.