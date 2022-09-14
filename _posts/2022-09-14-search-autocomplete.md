---
layout: post
comments: true
title: 'Search Autocomplete Thing I Did'
date: 2022-09-14
categories: personal
category-name: Personal
permalink: /search-autocomplete/
excerpt: Quick thoughts on building a small search autocomplete tool. What I learned, what I liked and what I didn't like.
og-image: search-autocomplete.jpg
thumb-image: search-autocomplete-thumb.jpg
---

My employer has a lot of acronyms for business terms that we use throughout the day. I created a proof-of-concept for an acronym search engine, with the goal of releasing it internally.

It had been a few months since I coded up something app-like, especially with JavaScript. So I created this using a few coding things I hadn't really played with yet.

Turns out something like this already existed internally so I shelved the plan. But I learned a lot while doing it, so I'm documenting it all in a blog post.

No tutorial or code review...just documenting things so I don't forget them. <a href="https://github.com/kaidez/search-autocomplete">The code's here on GitHub</a> with instructions on how to run it locally.

The search results now being returned are now the acronyms for various athletic leagues. WNBA, EPL, NBA, etc.

Here's what I learned:

<ul>
<li class="post__list-item">I used vanilla, non-framework-or-library JavaScript to do this. I'm happy about it.</li>
<li class="post__list-item">The vanilla JavaScript was written in Typescript and I'm REALLY happy about that. My code had less bugs, spotting them was easier, writing tests was easier, etc.</li>
<li class="post__list-item">For compiling the newer ECMAScript versions down to legacy versions, I prefer TypeScript to Babel.  It seems to take less configuration and plug-in use.</li>
<li class="post__list-item">Using <code>fetch()</code> and <code>async/await</code> are current best practices. But if you're trying to share JSON data globally in your app, they're a major pain.  I almost reverted to the legacy <code>XmlHttpRequest()</code> object to get this done.</li>
<li class="post__list-item">All this <code>fetch()</code> and <code>async/await</code> annoying stuff happens when using the Reacts and Vues of the world. But those tools do a great job of abstracting those annoyances out...I really respect that.</li>
</ul>

I don't see any tutorials coming directly out of this...again, I'm just documenting things. Feel free to ask me questions if you have any.
