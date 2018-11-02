---
layout: post
comments: true
title:  "JavaScript Developers: Start Focusing On The Right Stuff"
date:   2018-10-31 00:00:50 -0400
categories: personal
category-name: Personal
permalink: /developer-focus/
excerpt: Focusing on core JavaScript fundamentals is key to your growth as a developer. But you need to focus on JS libraries & frameworks as well.
og-image: js-focus.jpg
thumb-image: js-focus-thumb.jpg
---
My last 20 months as a JavaScript developer have been a period of self-assessment. Mostly, I've been focusing on <em>how</em> I write application code instead of the tools I use to write it.

I've also researched how other developers from all experience levels write code and have collectively learned great things from them. But in the process, I've discovered too many instances of these developers (I think) spending too much time worrying about the wrong things.

<h2>How this all began</h2>
It all started when I began working with React on a daily basis. As a result of this, I see three positive aspects that React brings to the JS developer conversation:

1. <strong>manipulating app views with a state object</strong>: changing your app's view/state by changing a standard "key:value" object (and not the DOM) is cool.
2. <strong>enforcing functional programming</strong>: the idea that functions should be "small things" that do one thing well and are easy to test is put into effect with React.
3. <strong>thoughtful component model</strong>: I'm stealing that phrase from <a href="https://medium.com/bumpers/isnt-our-code-just-the-best-f028a78f33a9">Jacob Thornton's great React article</a> but he's right. When it comes to encapsulating chunks of UI in a single, reusable component, React does this pretty well.

These things are positive because <strong>they bring some computer science best practices to JavaScript development</strong>. And as JS has matured into a full-on application language and beyond making neat rollovers, bringing these practices in is great.
<h2>There will be naysayers</h2>
Soon after its initial release, React was characterized as <strong>"JAJFLWYWCI" (Just-Another-JavaScript-Framework-Library-Whatever-You-Wanna-Call-It)</strong>.  Most comments aligned with at least one of these three categories:
<blockquote class="content--blockquote-margin">
"React and things like it lead to slow performance web apps."
</blockquote>

<blockquote class="content--blockquote-margin">
"You're not doing professional programming when you use frameworks or libraries."
</blockquote>

<blockquote class="content--blockquote-margin">
"It's too steep of a learning curve."
</blockquote>

Some comments I engaged with (mostly online) and some I didn't. But they didn't really bother me to the point I felt compelled to write this post.

I had real-world web developer stuff to deal with so I moved on.
<h2>What Kevin said</h2>
Then, maybe on a subconscious impulse, I re-read <a href="https://web.archive.org/web/20130324030838/http://randyluecke.tumblr.com:80/post/45915323813/im-done-with-the-web">Kevin Luecke's "I'm done with the web" article</a>. An article that bummed me out when I first read it four-and-a-half years ago.

Kevin wasn't "done with the web" literally, but he was "done" with being an active member of the web developer community. This was a result of his frustration with excuses these developers gave for rejecting certain JavaScript UI frameworks.

Despite the problems solved by things like Cappuccino and Ember, web devs shunned them because of their seemingly large, low-performant file sizes and steep learning curves. No time was spent on analyzing the problems they solved: everything was focused on the negatives.

Kevin viewed this as the web developer community spending too much time worrying about the wrong things. He also made the point that this doesn't happen in the traditional software development community...the Java world, the Ruby world, etc.

He had enough of this so he himself moved on...from the web dev community that is.

What bummed me out about this article was how I'm a part of this community that's prematurely rejecting stuff. There were also side implications about whether web developers knew how to program (add Paul Irish link).
<h2>What Kevin's article was really about</h2>
First, I don't know the context of Kevin Luecke's comments regarding developers knowing how to program. So I can't spend time worrying about it, letting those comments bum me out.

I'm a self-taught web developer: I learned web stuff during 90's dotcom rush when those that knew even a <em>little</em> about building websites were incredibly employable. Since I'm not a classically-trained-in-computer-science developer, I'll always have to deal with those feelings of insignificance...I'll be fine.

Second, worrying about my feelings blinded me from realizing the main point of the article. That <strong>when web developers evaluate if some software solves their problems, they consistently reject it for the wrong reasons</strong>.
<h2>The complaints about performance</h2>
The performance gripes (like the ones I hear about React) have always existed in web dev and have increased since the rise of the mobile web. And yes, it makes sense to make your web app as fast as possible.

And in dealing with these issues, Kevin addressed it in the same way that many others have already addressed it. <strong>When looking to speed up your site, focus on the images first.</strong>.

It's well documented that images are biggest offender when dealing with a slow site. So if your app has even a few images, how are you optimizing them?

Are you optimizing images in PhotoShop before deploying them to your site? Are you using a tool like <a href="https://github.com/imagemin/imagemin-cli">imagemin-cli</a> to minify them in your build process?

Are you hosting the images on a CDN? Can you use techniques like <a href="https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/bokeh-for-beginners.html">Bokeh</a> to further optimize your images?

Next, how about your webhost? If your site or app is hosted on a low-end, shared-hosting USD $5/month, things will be slow.

From here, lots of web performance best practices have evolved over the years. File minification, configuring critical path CSS, agressive browser caching, all this and many other things are well-documented.

After implementing the performance stuff that you should be implementing anyway, <em>then</em> focus on JavaScript performance. Google's Addy Osmani has written <a href="https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4">a pretty definitive article on JS performace</a>...give it a read.

Heads-up: this article effectively argues that images
