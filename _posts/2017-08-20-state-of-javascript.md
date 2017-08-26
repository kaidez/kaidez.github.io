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
React and Redux have demonstrated the value of well-implemented application state management in JavaScript to web developers. Despite this, developers complain about it.

I'd like to think the breakdown of developers that do and don't complain about React/Redux is 50/50, and that some of the complaints are valid. Nevertheless, good JavaScript state management was bound to happen, especially when reviewing how the language has progressed over the years.

<em>(Author's note: I used <a href="https://devchat.tv/js-jabber/124-jsj-the-origin-of-javascript-with-brendan-eich">Brendan Eich's awesome interview on JS Jabber</a> as a reference to some of the historical stuff mentioned in this post...It's worth a listen.)</em>

<h3>In The Beginning...</h3>
This is the first JavaScript book I ever brought:

<img src="/img/js-book.jpg" class="post__image" />

It was published by Dori Smith and the late, (very) great Tom Negrino. I don't use it as a reference any more, but keep it for sentimental reasons.

It was written in 1999, about four years after the initial JavaScript release. But it covers most the things that made JavaScript popular at that initial release: Image manipulation, scrolling status bars, Java integration, etc.

The book covers functions really well: it's the source from where I learned JS functions. It even cover cookies: <em>the first real instance of JavaScript state management.</em>

And there's also 33 pages covering Dynamic HTML (DHTML) that covers DOM manipulation methods at that now seem dated. But all the manipulation is done with <code>document.all</code>.

<h3>...And Then Came Love For The DOM</h3>
While <code>document.getElementById()</code> would become the primary way to initiate DOM manipulation, the spec it was part of (DOM Level 2) wouldn't reach Canidate Recommendation until 2000. So the 1999 book <em>not</em> covering it does make sense. But once that spec acheived Candidate Reco status, things changed.

Using <code>document.getElementById()</code> as main entry point for DOM manipulation exposed developers to the DOM API as a whole. And once they saw how they could use this API to manipulate the page, it inspired a burst of creativity.

This creativity was mostly noticed in things like drop-down menus and animations, but there were some cool DHTML hacks for state management. Many still in use to this day.

The most popular hack was to add a class with a Boolean-type name to an element once JavaScript did something. For example: if a dropdown menu could be opened on a mobile device, a class on <code>body</code> would tell the page if it were visible or not:

<pre class=" language-markup">
  <code class=" language-markup">
  &lt;!-- If the menu is in a hidden state --&gt;
  &lt;body class="isHidden"&gt;

  &lt;!-- If the menu is in visible state --&gt;
  &lt;body class="isVisible"&gt;
  </code>
</pre>

Front-end developers primarily loved manipulating the DOM while back-end developers primarily hated it. Updating data using something like the DOM API was simply something the latter wasn't used to.

Also, it didn't help that DOM implementation differed across web browsers. The browser wars were still going on at this time, so writing code for two or three browsers seemed inefficient.

However, clients liked the visual results provided by DOM manipulation. So it remained a best practice, evolved to be more efficient over time, and that was that.