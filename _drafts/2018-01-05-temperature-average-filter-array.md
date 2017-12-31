---
layout: post
comments: true
title:  "Use .filter() Instead of an Inner Loop in My JS Average Temperature Code"
date:   2018-01-05 00:00:59 -0400
categories: coding-best-practices
category-name: Coding Tips
permalink: /temperature-average-filter-array/
excerpt: kaidez updates his JavaScript functional programming/average temperature post to use .filter() instead of an inner loop. Includes demo.
og-image: temperature-functional-programming-filter.jpg
thumb-image: temperature-functional-programming-filter-thumb.jpg
---
<a href="https://codepen.io/kaidez/pen/VybqmY">See Demo &raquo;</a>

My <a href="/temperatures-functional-programming/">JavaScript functional programming/average temperature tutorial</a> looked at an array of arrays to calculate and display data.  In order to pull data from those inner arrays, I had to use an inner loop using <code>.map()</code>.

I wasn't <em>really</em> worried about using an inner loop, but thought the code would look cleaner if I avoided it. After publishing that post, I realized I <em>could</em> avoid it by using <code>.filter()</code> on the inner arrays instead of <code>.map()</code>.

The original complete code looked like this:

The HTML...
<pre><code class="language-markup">
&lt;div class="temperature-info__container">
 &lt;div id="temperatureHeader" class="temperature-info__header">&lt;/div>
 &lt;div id="temperatureInfo">&lt;/div>
&lt;/div>
</code></pre>

The CSS...
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

And, of course, the JavaScript...
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

I wanted to avoid the inner loop and <em>not</em> use that <code>innerArray.map()</code> towards the top of the <code>formatData()</code> function. Sticking to my <a href="http://eloquentjavascript.net/1st_edition/chapter6.html">JavaScript functional programming paradigm</a>, I first had to create a separate function that defined what I wanted filtered...which were numbers in this case:

<pre><code class="language-javascript">
// place this code below "const temperatureInfo"
function getNumbers(number) {
 return typeof number === "number"
}
</code></pre>

The inner array has a numbers and a single string, the city name. This <code>getNumbers()</code> function will be applied to each single inner array and return a new array that contains number types only.

Things are applied by going into <code>formatData()</code> and refactoring its first <code>.map()</code> method. So all of this...

<pre><code class="language-javascript">
...
let numbersOnlyList = []

innerArray.map(index => {
 if(typeof index === "number") {
   return numbersOnlyList.push(index)
 }
})
...
</code></pre>

...gets refactored by replacing it with this...
<pre><code class="language-javascript">
...
let numbersOnlyList = innerArray.filter(getNumbers)
...
</code></pre>
...meaning the updated <code>formatData()</code> function looks like this.
<pre><code class="language-javascript">
function formatData(outerArray) {

 outerArray.map(innerArray => {

   let numbersOnlyList = innerArray.filter(getNumbers)

   return numbersOnlyList.length
   ?
   displayTemperatureInfo(numbersOnlyList, innerArray[0])
   :
   displayArrayContent(innerArray, "#temperatureHeader")
 })

}
</code></pre>

Using loops inside of loops isn't the performance headache it was years go as browser technology has gotten better. But refactoring the inner loop out, like I did here, is pretty cool.