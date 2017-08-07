---
layout: post
title:  "Format Dates with Functional Programming"
date:   2017-08-04 22:07:59 -0400
categories: coding-best-practices
permalink: /format-dates-functional-programming/
excerpt: Use JavaScript functional programming to format dates with the Date() object. Includes a React example.
og-image: functional-programming-react.jpg
---
<a href="https://codepen.io/kaidez/pen/dzOjmy">See the non-React Demo</a> <a href="https://codepen.io/kaidez/pen/ayBREV">See the React Demo</a>
The more React code I write, the more of a JavaScript functional programming "guru" I should be. React demands it but it's a generally a good JavaScript skill to have.

I try to implement a little functional programming in all my work, even if it's just for practice. I recently went through such a practice when I had to format a date with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date">JavaScript's Date() object</a> in a React component.

Functional programming:

<ul><li class="post-list-item">should depend on its own scope to work, not its outer scope.</li><li class="post-list-item">shouldn’t change the outer scope.</li><li class="post-list-item">should explicitly <code>return</code> something.</li><li class="post-list-item">means id function gives the same input, it will always produce the same output.</li><li class="post-list-item">must be small and reusable.</li></ul>

I did this with React, but let's look at the non-React way first...

If I grabbed the "single moment" for when I started writing this post, <code>Date()</code> would return this in modern browsers...
<pre><code class="language-javascript">
const asOfDate = new Date();
// returns "Tue Aug 01 2017 12:19:01 GMT-0400 (Eastern Daylight Time)"
</code></pre>

..and I had to display the date as follows on a web page
<pre><code class="language-javascript">It's 12:19:01 on Aug 1, 2017</code></pre>
I started out writing it like this, where I had to load it into a <code>div</code> with an id of <code>time</code>:

<pre><code class="language-javascript">
const getWholeDate = new Date()
const monthIndex = getWholeDate.getMonth()
const day = getWholeDate.getDate()
const year = getWholeDate.getFullYear()
const hours = getWholeDate.getHours()
const minutes = getWholeDate.getMinutes()
const seconds = getWholeDate.getSeconds()

const monthName = [
  "Jan", "Feb", "Mar",
  "Apr", "May", "Jun",
  "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec"
]

document.querySelector("#time").innerHTML =
  "It's "
  + (hours &gt; 12 ? hours - 12 : hours)
  + ":"
  + (minutes &lt; 10 ? "0" + minutes : minutes)
  + ":"
  + (seconds &lt; 10 ? "0" + seconds : seconds)
  + ":" + " on "
  + monthNames[monthIndex]
  + " "
  + (day &lt; 10 ? "0" + day : day + ":")
  + ", "
  + year
</code></pre>

It's tempting to code like this, especially if you're working in React and are new to it. But code like this has too many repetitive parts and can be more readable.

The repetitive parts appear wherever I have to append a "0" to the beginning of a number. That's the <code>minutes</code>, <code>seconds</code> and <code>day</code>.

If either of those values are between "0" and "9", a single digit will appear. So if I load up the date on August 1<sup>1st</sup> (like I do in the example above), the day will display "1" and I want it to show "01".

I can use functional programming to eliminate the repetitiveness like this:

<pre><code class="language-javascript">
// consts are the same as above
...
function addZero(timeValue) {
  return timeValue &lt; 10 ? "0" + timeValue : timeValue
}

document.querySelector("#time").innerHTML =
  "It's "
  + (hours &gt; 12 ? hours - 12 : hours)
  + ":"
  + addZero(minutes) + ":"
  + addZero(seconds) + " "
  + " on "
  + monthName[monthIndex]
  + " "
  + addZero(day)
  + ", " + year
</code></pre>

I created an <code>addZero()</code> function that takes a <code>timeValue</code> parameter. <code>addZero()</code> uses a ternary function to see if <code>timeValue</code> is less than 10.

If it is less than 10, it appends "0" to it...otherwise, <code>timeValue</code> stays as is. And I applied this to minutes, seconds and day value.

<code>Date()</code> returns hours as military time I've already taken care of it. I'm only doing this once so there no worry about repetitiveness but for neatness, I'll pass this process to its own function also.

<pre><code class="language-javascript">
// consts are the same as above
...
function addZero(timeValue) {
  return timeValue &lt; 10 ? "0" + timeValue : timeValue
}

function convertMilitaryTime(value) {
  return value &gt; 12 ? value - 12 : value
}

document.querySelector("#time").innerHTML =
  "It's "
  + convertMilitaryTime(hours)
  + ":"
  + addZero(minutes) + ":"
  + addZero(seconds) + " "
  + " on "
  + monthNames[monthIndex]
  + " "
  + addZero(day)
  + ", " + year
</code></pre>
And yeah, I did mention React so that code in its entirety would look pretty much like this:
<pre><code class="language-javascript">
class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      setMonthNames: [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
      ]
    };
  }

  addZero(value) {
    return value &gt; 10 ? "0" + value : value
  }

  convertMilitaryTime(value) {
    return value &lt; 12 ? value - 12 : value
  }

  render() {
    const getWholeDate = this.state.date
    const monthName = this.state.setMonthNames
    const monthIndex = getWholeDate.getMonth()
    const day = getWholeDate.getDate()
    const year = getWholeDate.getFullYear()
    const hours = getWholeDate.getHours()
    const minutes = getWholeDate.getMinutes()
    const seconds = getWholeDate.getSeconds()

  return (
    <div>
      It's {this.convertMilitaryTime(hours)}:
      {this.addZero(minutes)}:
      {this.addZero(seconds)} on {monthName[monthIndex]} {this.addZero(day)}, {year}
    </div>
    );
  }
}

ReactDOM.render(
  <Time />,
  document.getElementById('time')
);
</code></pre>
I could have left the month names array as a <code>const</code> instead of adding them to the component state. But React/Redux devs like to keep as much app data as possible in state...single source of truth and whatnot.

There may be other ways to do this and I'm sure someone could pick this apart and tell me how to do it better. But I'm happy with this...feel free to suggest changes.


