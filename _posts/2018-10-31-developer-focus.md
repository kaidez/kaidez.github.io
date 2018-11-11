---
layout: post
comments: true
title:  "JavaScript Developers: Start Focusing On The Right Stuff"
date:   2018-10-31 00:00:50 -0400
categories: personal
category-name: Personal
permalink: /javacript-developer-focus/
excerpt: Focusing on core JavaScript fundamentals is key to your growth as a developer. But you need to focus on JS libraries & frameworks as well.
og-image: js-focus.jpg
thumb-image: js-focus-thumb.jpg
---
My last 10 months as a JavaScript developer have been a period of self-assessment. Primarily, I've reviewed <em>how</em> I write application code and not the libraries and frameworks I use to write it.

I've also researched how other developers write code and have collectively learned great things from them. But when it comes to libs and frameworks, I've discovered too many instances of developers spending (I think) too much time worrying about the wrong things.

<h2>How this all began</h2>
It all started after a lengthy period of working with <a href="https://reactjs.org/">React</a> on a daily basis. Because of this, I see three positive things that React brings to the JavaScript developer conversation:

1. <strong>manipulating app views with a state object</strong>: changing your app's view/state with a standard "key:value" object (not the DOM) is cool.
2. <strong>a focus on functional programming</strong>: React promotes the idea that a function should do one thing well, and do it in its own world without affecting the world around it.
3. <strong>thoughtful component model</strong>: I'm stealing that phrase from <a href="https://medium.com/bumpers/isnt-our-code-just-the-best-f028a78f33a9">Jacob Thornton's great React article</a> but he's right. When it comes to encapsulating chunks of UI inside a single reusable component, React does it well.

All these things are great because <strong>they encourage computer science best practices in JavaScript development</strong>. As JS progresses from making neat rollovers to a full-on application language, it's right to bring in these practices.
<h2>There will be naysayers</h2>
After its release, some developers labeled React as <strong>"JAJFLWYWCI" (Just-Another-JavaScript-Framework-Library-Whatever-You-Wanna-Call-It)</strong>. For whatever the reason, they said we shouldn't use it...a frequent reaction to frameworks and libraries among JS developers.

The comments for <em>not</em> using it aligned with at least one of these three opinions:
<blockquote class="content--blockquote-margin">
"Frameworks and libraries lead to slow performing web apps."
</blockquote>

<blockquote class="content--blockquote-margin">
"It has a steep learning curve."
</blockquote>

<blockquote class="content--blockquote-margin">
"You're not doing professional programming if you use frameworks or libraries."
</blockquote>

Some comments I engaged with (mostly online) and some I didn't. But they didn't really bother me to the point I felt compelled to blog about it.

I had real-world web developer stuff to deal with so I moved on.
<h2>What Kevin said</h2>
Then, maybe on a subconscious impulse, I re-read <a href="https://web.archive.org/web/20130324030838/http://randyluecke.tumblr.com:80/post/45915323813/im-done-with-the-web">Kevin Luecke's "I'm done with the web" article</a>. An article that bummed me out when I first read it four-and-a-half years ago.

Kevin wasn't "done with the web" literally, but he was "done" with embracing the web developer community to the extent that he had. One reason for this was his frustration with why these developers hastily rejected certain JavaScript UI frameworks.

Even though things like <a href="http://www.cappuccino-project.org/">Cappuccino</a> and <a href="https://www.emberjs.com/">Ember</a> solved problems, web devs shunned them because of their seemingly large, low-performant file sizes and steep learning curves. Little time, if any, was spent seeing if they solved problems: the knee-jerk reaction to reject them based on those things.

Kevin used other examples of web developers focusing on small-ish problems and he felt this slowed web app progression. He felt that community was spending too much time worrying about the wrong stuff.

He had enough of this "stagnation" as he phrased it so he, himself, moved on. From the web dev community, that is, and towards native app development.

What bummed me out about this article was how I'm a part of this community that rashly rejects stuff. Also, he made some <a href="https://www.youtube.com/watch?v=19g4n0ZxiYM&feature=youtu.be&t=2836">comments about "people that don't know how to program"</a> and I wondered if it was part of that group as well.
<h2>What Kevin's article was really about</h2>
First, I don't know the context of Kevin Luecke's comments regarding developers that don't know how to program. So I'm not going to take them <em>out</em> of context and let them bum me out.

I'm a self-taught, web developer: I learned web stuff at a time when those that knew even a <em>little</em> HTML were incredibly employable.  I've continued to do web stuff for a long time since then, giving me experience that <em>keeps</em> me incredibly employable.

Since I'm not a classically-trained computer science developer, I'll have to deal any feelings of insignificance that come up as a result of this.  OK...I can deal with that.

Second, worrying about my feelings kept me from realizing the main point of the article. That <strong>when web developers evaluate if some software solves their problems, they consistently reject it for the wrong reasons</strong>.

<h2>The complaints about performance</h2>
To be fair, I can't really say that JS complaints performance are "wrong". Making apps as fast as possible is important as our dependency on mobile rises, and less JavaScript makes them faster.

But if an app requires lots of interactive features, as many do, then a lib or framework may be needed to quickly build out those features. Thankfully, the JS community has developed lots of non-hacky best practices to increase performance for this use case.

Most of these practices are built around the <a href="https://webpack.js.org/">webpack</a> build tool. With its ability to build out slim JS files for production and <a href="https://survivejs.com/webpack/building/code-splitting/">code-splitting</a>, webpack has become necessary tool for JavaScript app development.

Andrew Welch wrote <a href="https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development">a ridiculously thorough article on setting up webpack.</a> Just like JS libraries and frameworks, webpack comes with a bit of a learning curve so it's worth a read.

Also, Addy Osmani wrote <a href="https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4">a pretty definitive article on JS performance</a>...give it a read as well.  It discusses webpack and code-splitting stuff, along with other things like performance budgets, critical paths and testing/auditing tools.
<h2>Other performance stuff</h2>
Images are usually blamed for causing the most performance issues and Luecke mentions them in his article. But Osmani's article argues that JS may be the bigger performance headache because images only need to download while JS files have to download, then parse and execute code.

Whatever your opinion here, optimize your images as well as your JavaScript. This means doing things like:
* using Photoshop  "export/Save for Web" on your images.
* adding an image minification step to your build process using something like <a href="https://github.com/imagemin/imagemin-cli">imagemin-cli</a>.
* if you can, using a CDN to serve out images...as well as JS, CSS and font files.
* ~maybe~ looking at <a href="https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/bokeh-for-beginners.html">Bokeh</a> to further optimize your images.

And performance depends on more than this: aggressive browser caching, for example, gives other performance wins. Plus, file minification is still a good idea, and your app will be slow if it's hosted with a low-end shared USD $5/month plan.

Many things can slow an app down: don't put the blame for this all on JavaScript.
<h2>The complaints about learning curves</h2>
In his post, Kevin Luecke is blunt about the defeatist attitude web devs take towards ramping up on new things. After quoting a developer who implied that it would take too long to learn Ember, Luecke responded:

<blockquote class="content--blockquote-margin">
"This reaction to Ember just baffles me. Your day job is to build a piece of web software and you can't take a few days to learn the ins and outs? Presumably you're in a large team because this project is important and will take some time to complete. Nevertheless, I've seen this reaction many times in the web culture.
</blockquote>

I can relate to having this defeatist attitude. Always having to ramp up on a new JavaScript technology has affected me negatively and <a href="http://www.kaidez.com/101th-post/">I've written about it</a>.

But this is how JavaScript is right now and this rapid change shows no signs of slowing down. Newly-released JS libs and frameworks are part of this constant change...we all have to keep up.

Despite performance concerns, libraries and frameworks solve someone's problem somewhere in the world. So a developer familiar with them (at least the popular ones) has value.

This familiarity gives the developer "problem solving-power": the ability to potentially look at a problem and say "this framework is our solution."  Day job bosses and freelance clients love this.

You need to make time to learn new JavaScript stuff, frameworks and libraries included. You may think there's nothing to lose by not learning them, but there's nothing to gain by <em>not</em> learning them.
<h2>The complaints about "unprofessional programming" (whatever that means)</h2>
However, there are many developers who believe that those who use frameworks and libraries are non-professional "newbies". That libs/frameworks should be completely avoided and we should just use vanilla JavaScript, and they're passionate in their belief.

I carried this belief once and in all fairness, I became a better JavaScript developer as a result. My knowledge of JS fundamentals increased: writing powerful & concise functions, using <code>return</code> correctly, understanding prototypal inheritance, etc.

So yes, focusing my energy towards learning pure, unadulterated vanilla JS helped me. Still, I believe that <strong>the idea that using JavaScript frameworks and libraries is unprofessional is total bullshit.</strong>

Firstly, my writing lots of vanilla JavaScript has trained me to find ways to write less of it when possible. I'm able to produce lots of high-quality code much quicker when a lib or framework gives me a way.

The aforementioned Ember, which <a href="https://www.lynda.com/Emberjs-tutorials/Up-Running-Emberjs/178116-2.html">I've obviously used</a>, has a big file size and gets updated too frequently for my comfort. But if I'm building an app that users will open up and then use for a long time (like they would with MS Word), Ember has a feature-rich API that will help me finish the project fast.

And what if you're part of a team of developers? Using a library or framework helps here because <strong>it provides your team a shared language, making collaboration and communication easier</strong>.

For example, with React I can tell someone, "solve your problem by using this pre-built component that so-and-so built." Much easier than "cut-and-paste this code block that so-and-so wrote but you'll have to ask so-and-so what to do next."

I've said this many MANY times before and I'll say it again:
<blockquote class="content--blockquote-margin">
Using JavaScript libraries and frameworks isn't unprofessional; however, using them without understanding the core language fundamentals behind them is.
</blockquote >

Yeah, I use React everyday now, but it's because of its above-mentioned thoughtful component model. It lets me create huge chunks of UI that are easily reusable and easily editable.

That's all it does for me: from there, writing pure, vanilla JavaScript is my responsibility. I have to understand the use cases for using <code>let</code> or <code>const</code>, returning Promises and looping over JSON Objects.

React doesn't help me with any of this.  It gives me a nice container to place that code inside of, but that's it.

I'm using React to deliver production-quality code on time. I don't see why this is unprofessional.
<h2>Attitudes like this exist everywhere in web development</h2>
And it doesn't stop with these instances. This attitude is all over the JS dev world.

For that Andrew Welch webpack article, the <em>very</em> first comment was:
<blockquote class="content--blockquote-margin">
Why do we keep making the build and deploy setups more complex than the apps we're deploying?
</blockquote >
Granted, that was the only negative-type comment, but it's pretty obvious that the article's code example wasn't a universal solution. And webpack has proved how well it can solve JS performance problems.

It'd be great if solving problems was always easy. But it isn't and we have to use the best tools available.

Chris Ferdinandi wrote this <a href="https://gomakethings.com/getting-direct-descendant-elements-by-selector-with-vanilla-js/">this great article about iterating over array-like objects.</a> You can't do stuff like <code>.forEach()</code> and <code>.map()</code> on things that are "array-ish"...NodeLists, strings, anything that has a <code>length</code> property but isn't connected to <code>Array.prototype</code>.

Converting these things into iterable arrays is a common use case: the fix for it was a hacky way of using <code>.call()</code>. Then ES6 gave us <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from">Array.from()</a> to do the same thing, hack-free.
<h2>Look at the big picture</h2>
the idea that...is ridiculous, was is professional is
Understand what your app must do before rejecting (or accepting) any framework or library in your code. Because a framework or lib may help your app "do" it better.

At the end of the day, you need to ship a product out the door. Depending on what it takes to do that, a library or framework may be a means to that end.

Luecke pointed out that dismissing JS tooling based on learning curves and filesizes was common in the web dev world but not the native development world. I would say the same thing happens

I would apply these comments to java, php, ruby

(freelancers worked at a company first)

(i read stuff to make me better)

(https://reactjs.org/docs/reconciliation.html#the-diffing-algorithm)
