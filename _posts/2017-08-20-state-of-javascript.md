---
layout: post
comments: true
title:  'The "State" Of JavaScript'
date:   2017-08-20 04:00:59 -0400
categories: personal
permalink: /state-of-javascript/
excerpt: A rant about how React, Redux and similar tools are part of JavaScript's natural progression to a complete application language.
og-image: state-of-javascript.jpg
thumb-image: state-of-javascript-thumb.jpg
---
React and Redux have demonstrated the value of well-implemented application state management within JavaScript. Despite this, developers complain about React and Redux quite often.

I'd like to think the breakdown of developers that do and don't complain about React/Redux is 50/50, and that some of the complaints are valid. Nevertheless, JS state management was bound to happen, especially when reviewing the key moments of JavaScript's evolution.

<h3>In The Beginning...</h3>
This is the first JavaScript book I ever brought:

<img src="/img/js-book.jpg" class="post__image" />

It was published by Dori Smith and the late, (very) great Tom Negrino. I don't use it as a reference anymore, but keep it for sentimental reasons.

It was written in 1999, about four years after the initial JavaScript release. But it covers things that made JavaScript popular at that time: image manipulation, scrolling status bars, Java integration, etc.

The book covers functions really well: it's where I first learned JS functions. It even cover cookies: <em>the first real instance of JavaScript state management.</em>

And there's also 33 pages on Dynamic HTML (DHTML), demonstrating DOM manipulation methods that now seem dated. All the manipulation in the book is done with <code>document.all</code> and <code>document.getElementById()</code> isn't mentioned at all.

<h3>...Then Came Love For The DOM</h3>
While <code>document.getElementById()</code> would become the primary way to initiate DOM manipulation, the spec it was part of (DOM Level 2) wouldn't reach Candidate Recommendation until 2000. So a 1999 book <em>not</em> covering it makes sense but once that spec achieved Candidate Reco status, things changed.

Using <code>document.getElementById()</code> as main entry point for DOM manipulation exposed developers to the DOM API as a whole. And once they saw how they could use this API to manipulate the page, it inspired a burst of creativity.

This creativity was mostly noticed in things like drop-down menus and animations, but there were some cool DHTML "hacks" for state management. Many still in use to this day.

The most popular hack was to add a class with a Boolean-type name to an element once JavaScript did something. For example: JS could toggle a class on the <code>body</code> tag, telling the browser it was visible:

<pre class=" language-markup">
  <code class=" language-markup">
  &lt;!-- If the menu is in a hidden state --&gt;
  &lt;body class="isHidden"&gt;

  &lt;!-- If the menu is in a visible state --&gt;
  &lt;body class="isVisible"&gt;
  </code>
</pre>

Front-end developers primarily loved manipulating the DOM while back-end developers primarily hated it. Updating data using something like the DOM API was simply something the latter wasn't used to.

Also, it didn't help that DOM implementation differed across web browsers. The browser wars were still going on at this time, so writing code for two or three browsers seemed inefficient.

However, clients liked the visual results provided by DOM manipulation. So it remained a best practice, evolved to be more efficient over time, and that was that.

<h3>...Next Came The Quiet Time</h3>
Internet stocks that rose high starting in the mid nineties came crashing down in the early 2000s. Few "web-only" companies were profitable and as a result, other companies, including Microsoft, said the web was a "passing fad."

As a whole, web-only companies, didn't die out during this quiet time. They just experimented with cool web technologies while no one was watching, removed from the constant pressure from others to get everything right.

Mozilla rose to prominence during this time. Apple would release the Mac OS X operating system, setting them up for the world dominance they currently enjoy.

And companies like Google would play around with a little-known piece of web browser technology called <code>XMLHttpRequest</code>. It allowed data to load onto the page without the page needing to be fully refreshed.

Google used <code>XMLHttpRequest</code> to build Gmail and Google Maps, two apps that load new data on the page without refreshing it. <code>XMLHttpRequest</code> was awesome and were other companies created apps with the same functionality.

But as awesome as it was, <code>XMLHttpRequest</code> didn't change (most of) the world's opinion that the web was a fad.

<h3>...A Guy Writes A Blog Post</h3>
That all changed when web developer <a href="http://adaptivepath.org/ideas/ajax-new-approach-web-applications/">Jesse James Garrett wrote an article</a> defining apps that used <code>XMLHttpRequest</code> as "AJAX applications."

The article outlined how to build a web page that could load content without using page refreshes. In order to build AJAX apps, it said, you needed <code>XMLHttpRequest</code>, CSS, JavaScript and, of course, the DOM.

The creativity inspired by AJAX was far out-shined the creativity inspired by the DOM API. AJAX let developers build games, calendar apps, word processing apps, any robust app you can think of.

With the sudden burst of AJAX-inspired creativity, the web got its second wind in the business world. Everyone started paying attention to it again: the web was clearly not a fad.

<h3>...JSON takes it from here</h3>
Next came <a href="http://www.json.org/">JSON</a>, which was a uniform data format for the browser. It didn't fully eliminate the need for backend database systems, but it certainly lessened the browsers dependency on them.

The data was in the form of a standard object that could easily be extracted with JavaScript. No matter what your database looked like or what language it used, JSON just worked.

It's key to note that DOM manipulation was still in wide use among developers at this point. It still had issues, but the developer community defined best practices, like using <a href="http://jquery.com/">jQuery</a>, to manage those issues the best that it could.

<h3>...Now, The Frameworks</h3>
With AJAX, JSON and DOM best practices in place, it made sense to encapsulate them in complete software bundles. One-stop pieces of software that gave developers all the tools they needed to build an app.

That's where frameworks came in. <a href="http://www.javascriptmvc.com/">JavaScript MVC</a>, <a href="https://dojotoolkit.org/">Dojo</a> and <a href="http://backbonejs.org/">Backbone</a> were the first popular ones, then came Angular, Ember, Dart, Knockout...and on and on.

<h3>...The ES6 Makeover Arrives</h3>
Then JavaScript got a major update called ES6, or ES2015.
<h3>...And Here Comes React</h3>