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
My last 10 months as a JavaScript developer have been a period of self-assessment. Primarily, I've focused on <em>how</em> I write application code and not the libraries and frameworks I use to write it.

I've also researched how other developers write code and have collectively learned great things from them. But when it comes to libs and frameworks, I've discovered too many instances of developers spending (I think) too much time worrying about the wrong things.

<h2>How this all began</h2>
It all started when I began working with <a href="https://reactjs.org/">React</a> on a daily basis. Consequently, I see three positive things that React brings to the JavaScript developer conversation:

1. <strong>manipulating app views with a state object</strong>: changing your app's view/state with a standard "key:value" object (not the DOM) is cool.
2. <strong>enforcing functional programming</strong>: the ideas that functions should be in their own little world, shouldn't affect the outside world around them, do one thing well and be easy to test are put into effect with React.
3. <strong>thoughtful component model</strong>: I'm stealing that phrase from <a href="https://medium.com/bumpers/isnt-our-code-just-the-best-f028a78f33a9">Jacob Thornton's great React article</a> but he's right. When it comes to encapsulating chunks of UI inside a single reusable component, React does this well.

These things are positive because <strong>they encourage computer science best practices in JavaScript development</strong>. As JS progresses from making neat rollovers to a full-on application language, it's right to bring in these practices.
<h2>There will be naysayers</h2>
Soon after its initial release, React was labeled as <strong>"JAJFLWYWCI" (Just-Another-JavaScript-Framework-Library-Whatever-You-Wanna-Call-It)</strong>. For whatever the reason, some developers said we shouldn't use it...a frequent reaction to frameworks and libraries in the JS World.

The comments for <em>not</em> using it aligned with at least one of these three opinions:
<blockquote class="content--blockquote-margin">
"React and things like it lead to slow performing web apps."
</blockquote>

<blockquote class="content--blockquote-margin">
"It's too steep of a learning curve."
</blockquote>

<blockquote class="content--blockquote-margin">
"You're not doing professional programming when you use frameworks or libraries."
</blockquote>

Some comments I engaged with (mostly online) and some I didn't. But they didn't really bother me to the point I felt compelled to blog about it.

I had real-world web developer stuff to deal with so I moved on.
<h2>What Kevin said</h2>
Then, maybe on a subconscious impulse, I re-read <a href="https://web.archive.org/web/20130324030838/http://randyluecke.tumblr.com:80/post/45915323813/im-done-with-the-web">Kevin Luecke's "I'm done with the web" article</a>. An article that bummed me out when I first read it four-and-a-half years ago.

Kevin wasn't "done with the web" literally, but he was "done" with embracing the web developer community to the level that he did. The catalyst for this was his frustration with excuses these developers gave for rejecting certain JavaScript UI frameworks.

Despite the problems solved by things like <a href="http://www.cappuccino-project.org/">Cappuccino</a> and <a href="https://www.emberjs.com/">Ember</a>, web devs shunned them because of their seemingly large, low-performant file sizes and steep learning curves. Little-to-no time was spent on analyzing the problems they solved: everything was focused on the negatives.

Kevin viewed this as the web developer community spending too much time worrying about the wrong things. He also pointed out that this doesn't happen in the traditional software development community: I'm assuming he was referring to the Java community, the Ruby community, etc.

He had enough of this so he himself moved on...from the web dev community that is.

What bummed me out about this article was how I'm a part of this community that's prematurely rejecting stuff. He also made some <a href="https://www.youtube.com/watch?v=19g4n0ZxiYM&feature=youtu.be&t=2836">comments about "people that don't know how to program"</a> and I wondered if it was me for a moment.
<h2>What Kevin's article was really about</h2>
First, I don't know the context of Kevin Luecke's comments regarding developers knowing how to program. So I'm not going to take them <em>out</em> of context and spend time worrying about them and be bummed out.

I'm a self-taught, web developer: I learned web stuff during late 90's when those that knew even a <em>little</em> about building websites were incredibly employable.  This length of time has given me experience that makes me <em>still</em> incredibly employable.

Since I'm not a classically-trained computer science developer, I'll always have to deal those feelings of insignificance.  I'll deal with them.

Second, worrying about my feelings blinded me from realizing the main point of the article. That <strong>when web developers evaluate if some software solves their problems, they consistently reject it for the wrong reasons</strong>.

<h2>Look at the big picture</h2>
You should understand what your app should do before rejecting (or accepting) any framework or library in your code. Because a framework or lib may help your app "do" it better.

Ember, which <a href="https://www.lynda.com/Emberjs-tutorials/Up-Running-Emberjs/178116-2.html">I've obviously used</a>, has a big file size and gets updated too frequently for my comfort level. But if you're building an app that users will keep open and work inside for a long time, like MS Word, then Ember is helpful.

And what if you're part of a team of developers? Using a well-tested library/framework helps because <strong>it provides your team a shared language, making collaboration simple and pleasant</strong>.

For example, with React I can tell someone, "solve your problem by using this pre-built component that so-and-so built." Much easier than "cut-and-paste this code block that so-and-so wrote but you'll have to ask so-and-so what to do next."

And the end of the day, you need to ship product. Depending on what it takes to do that, a library or framework may be a means to that end.
<h2>The complaints about performance</h2>
There are valid JavaScript performance issues that matter more and more as our dependency on mobile rises. But the JS community has been attacking this issue for many years prior and will continue to do so.

Lots of non-hacky best practices have been created to deal with performance, with <a href="https://survivejs.com/webpack/building/code-splitting/">code-splitting</a> being the most popular. Code-splitting is the practice of allowing a page in an app to download <em>only</em> the JS it needs instead of the JS for the entire app.

Also, and it's ironic when looking at the perf complaints, component-based libraries and frameworks like React allow for easy code-splitting. Encapsulating UI and its related functionality inside an independent component is a performance win.

Addy Osmani has written <a href="https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4">a pretty definitive article on JS performance</a>...give it a read. It covers code-splitting and other things, like performance budgets, critical paths and testing/auditing tools.
<h2>Other performance stuff</h2>
Images have traditionally been blamed for causing the most performance issues, including Kevin Luecke's article. But Osmani's article points out that images only need to download while JavaScript files have to download code and then parse and execute it.

Still, you shouldn't leave optimization techniques for JS only. So make sure to optimize your images doing things like:
* Photoshop export/Save for Web on your images.
* adding an image minification step to your build process using something like <a href="https://github.com/imagemin/imagemin-cli">imagemin-cli</a>.
* serving images (as well as JS, CSS and font files) from a CDN if it's in your budget.
* ~maybe~ looking at <a href="https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/bokeh-for-beginners.html">Bokeh</a> to further optimize your images.

And performance depends on more than this: browser caching, for example, gives more performance wins. Plus, HTML minification is still a good idea and your app will be slow if it's hosted on a low-end USD $5/month shared plan.

Many thing are needed to create a high-performance app.  Don't put this responsibility <em>just</em> on JavaScript.

(freelancers worked at a company first)
(i read stuff to make me better)
(https://reactjs.org/docs/reconciliation.html#the-diffing-algorithm)
