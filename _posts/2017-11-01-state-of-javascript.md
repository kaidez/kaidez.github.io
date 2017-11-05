---
layout: post
comments: true
title:  'The "State" Of JavaScript'
date:   2017-11-01 04:00:59 -0400
categories: personal
permalink: /javascript-state/
excerpt: A rant about how React, Redux and similar tools are part of JavaScript's natural progression to a complete application language.
og-image: state-of-javascript.jpg
thumb-image: state-of-javascript-thumb.jpg
---
The React/Redux combination has demonstrated the value of well-implemented application state management within JavaScript application development. Despite this, many developers complain about it.

I'd like to think the breakdown of developers that do and don't complain about React/Redux is 50/50, and that some of the complaints are valid. Nevertheless, a paradigm for JS state management was bound to show up, especially when reviewing key moments of JavaScript's evolution.

<h3>In The Beginning...</h3>
This is the first JavaScript book I ever bought:

<img src="/img/js-book.jpg" class="post__image" />

It was published by Dori Smith and the late, (very) great Tom Negrino. I don't use it as a reference anymore, but keep it for sentimental reasons.

It was written four years after JavaScript's initial release and covers the things that made JavaScript popular at that time. Image manipulation, scrolling status bars, Java integration, etc.

The book covers functions really, <em>really</em> well: it's actually where I first learned about them. It even covers cookies: <em>the first real instance of JavaScript state management.</em>

And there's also 33 pages on Dynamic HTML (DHTML), demonstrating DOM manipulation methods that now seem dated. All the manipulation in the book is done with <code>document.all</code>...<code>document.getElementById()</code> isn't mentioned at all.

<h3>...Then Came Love For The DOM</h3>
<code>document.getElementById()</code> was part of the DOM Level 2 specification that didn't reach Candidate Recommendation until 2000. So a 1999 book <em>not</em> covering it makes sense but once that spec achieved Candidate Reco status, things changed.

Using <code>document.getElementById()</code> as the main entry point for DOM manipulation exposed developers to the DOM API as a whole. And once they saw how they could use this API to manipulate the page, it inspired a burst of creativity.

This creativity was seen in things like drop-down menus and animations, but there were some cool DHTML "hacks" for state management. Many that are still in use to this day.

The most popular hack was to add a class with a Boolean-type name to an element once JavaScript did something. For example: JS could toggle a class on the <code>&lt;body&gt;</code> tag, telling the browser whether or not a menu was visible:

<pre class=" language-markup">
 <code class=" language-markup">
 &lt;!-- If JavaScript hides the menu... --&gt;
 &lt;body class="isHidden"&gt;

 &lt;!-- If JavaScript shows the menu... --&gt;
 &lt;body class="isVisible"&gt;
 </code>
</pre>

Front-end developers mostly loved manipulating the DOM: back-end developers mostly hated it. Updating data using something like the DOM API was simply something the latter wasn't used to.

Also, it didn't help that DOM implementation differed across web browsers. <a href="https://en.wikipedia.org/wiki/Browser_wars">The browser wars</a> were still going on at this time, so writing code for two or three browsers seemed inefficient.

Above all, the DOM was slow...REALLY slow. JavaScript DOM manipulation didn't take hours, but the time it DID take was too long by software standards.

However, clients liked the visual results provided by DOM manipulation. So it remained a best practice and evolved to be more efficient over time, and that was that.

<h3>...Next Came The Quiet Time</h3>
Internet stocks that rose high in the mid nineties came crashing down in the early 2000s. Few "web-only" companies were profitable and as a result, other companies, including Microsoft, said the web was a "passing fad."

As a whole, web-only companies, didn't die out during this quiet time. They just experimented with their products while no one was watching, removed from the constant pressure of meeting deadlines.

Mozilla rose to prominence during this time. Apple would release the Mac OS X operating system, setting them up for the world dominance they currently enjoy.

And companies like Google would play around with a little-known piece of web browser technology called <code>XMLHttpRequest</code>. It allowed data to load onto the web page without the page needing to be fully refreshed.

Google used <code>XMLHttpRequest</code> to build Gmail and Google Maps, two apps that load new data on the page without having to refresh it. <code>XMLHttpRequest</code> was awesome and other companies also created apps with the same functionality.

But as awesome as it was, <code>XMLHttpRequest</code> didn't change (most of) the world's opinion that the web was a fad.

<h3>...A Guy Writes A Blog Post</h3>
That all changed when web developer <a href="http://adaptivepath.org/ideas/ajax-new-approach-web-applications/">Jesse James Garrett wrote an article</a> defining apps that used <code>XMLHttpRequest</code> as "AJAX applications."

The article outlined how to build a web page that could load content without using page refreshes. In order to build AJAX apps, it said, you needed <code>XMLHttpRequest</code>, CSS, JavaScript and, of course, the DOM.

The creativity inspired by AJAX was far out-shined the creativity inspired by the DOM API. AJAX let developers build games, calendar apps, word processing apps, any robust app they could think of.

With the sudden burst of AJAX-inspired creativity, the web got its second wind in the business world. Everyone started paying attention to it again: the web was clearly not a fad.

<h3>...JSON takes it from here</h3>
Then object literals landed in JavaScript, meaning you could do <code>var obj = {}</code> instead of <code>var obj = new Object()</code>. This led to the creation of <a href="http://www.json.org/">JSON</a>.

JSON was essentially data stored in back-end database systems that was sent to the browser in the form of a standard key/value object. In this form, the data could be easily manipulated with JavaScript.

<h3>...Now, the frameworks & libraries</h3>
With AJAX, JSON and DOM best practices in place, it made sense to encapsulate them in complete software bundles. One-stop pieces of software that gave developers all the tools they needed to build an app.

That's where JavaScript frameworks and libraries came in. <a href="http://www.javascriptmvc.com/">JavaScript MVC</a>, <a href="https://dojotoolkit.org/">Dojo</a> and <a href="http://backbonejs.org/">Backbone</a> were the first popular ones, then came Angular, Ember, Dart, Knockout...and on and on.

<h3>...The ES6 Makeover Arrives...</h3>
Then JavaScript got a major update called ES6, or ES2015. Its syntax and features closely matched those of the more traditional languages, Java, C#, etc.

<h3>...At (Roughly) The Same Time That React Arrives</h3>
And then came React JS. It's a library for building the view portion of your application.

A React view is built with <a href="https://css-tricks.com/modular-future-web-components/">web components</a>, which have been around for a while but is now rising in popularity. A web component is a custom HTML tag encapsulates other tags, CSS styles and JS functionality...it's essentially a widget.

<h3>React state (starts to) change everything...</h3>
React provided an easy-to-understand web component model, and that's great. But its BIG innovation was how it improved application state management in JavaScript apps.

React state is in the form of a JavaScript object that developers can manipulate to change how the app looks on the screen. So maybe a mobile menu needs to be made visible, maybe a new component needs to load onto the page.

In React, <strong>changes like this require updating the state...<em>not</em> the DOM</strong>.

<em>Side note: React state is an abstract thing so depending on your developer background, it can a be tough concept to grasp. <a href="https://twitter.com/dceddia">Dave Ceddia</a> wrote <a href="https://daveceddia.com/visual-guide-to-state-in-react/">an excellent post that explains React state as if it needed to be explained to a six-year old.</a></em>

<h3>And now...Redux...</h3>
Redux came out as a set of tools for managing and manipulating application state. It's based on <a href="https://facebook.github.io/flux/">Facebook's Flux design pattern</a> and was initially written to work with React, but it can work with any JavaScript library or framework.

It's possible for your app to have 20 React components, where each component manages it own state object. Redux takes the position that app state shouldn't be spread out like this and, instead, should all be managed in one object.

Whenever you hear a phrase like "Redux gives your app a <em>single source of truth</em>," the source in question is this single state object.

<h3>This is where things REALLY changed...A rant...</h3>
With state management, the React/Redux combo has drastically reduced the use of DOM manipulation. This is a really opinionated statement, but I'm sticking by it.

Using state to change an application follows best practices taught in basic computer science and implemented in Java, C++, etc. As a result, treating the DOM as main API a JavaScript dev works in is l

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Iterable NodeLists are so fundamentally important to the quality of the DOM. Unsurprisingly I now use React for most of my coding instead.</p>&mdash; John Resig (@jeresig) <a href="https://twitter.com/jeresig/status/726058698989277185?ref_src=twsrc%5Etfw">April 29, 2016</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>