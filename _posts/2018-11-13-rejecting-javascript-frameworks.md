---
layout: post
comments: true
title:  "JavaScript Developers...Stop HATING Frameworks!!!"
date:   2018-10-31 00:00:50 -0400
categories: coding-best-practices
category-name: Coding Tips
permalink: /rejecting-javascript-frameworks/
excerpt: JavaScript developers can avoid using frameworks and libraries if the have to, but too many of them reject them for the wrong reasons.
og-image: js-framework-library.jpg
thumb-image: js-framework-library-thumb.jpg
---
My last six months as a JavaScript developer have included a period of self-assessment. Primarily, I've reviewed <em>how</em> I write application code: not the libraries and frameworks that help me write it.

I've also researched how other developers write code and, collectively, have learned great things from them. But when discussing libraries and frameworks, I've seen too many instances of developers rejecting them for the wrong reasons.

<h2>A disclaimer</h2>
I'm talking from a React point-of-view here because that's what I've been using lately. Don't take it to mean that I think everyone should use React...it's just my POV for this post.

<h2>How this all began</h2>
It all started after a lengthy period of using <a href="https://reactjs.org/">React</a> on a daily basis. Consequently, I see three positive things that React brings to the JavaScript developer conversation:

1. <strong>manipulating app views with a state object</strong>: changing your app's view/state with a standard "key:value" object (not the DOM) is cool...and more efficient.
2. <strong>a focus on functional programming</strong>: React promotes the idea that a function should do one thing well, do that thing in its own world, and do it without screwing up the world around it.
3. <strong>thoughtful component model</strong>: I'm stealing that phrase from <a href="https://medium.com/bumpers/isnt-our-code-just-the-best-f028a78f33a9">Jacob Thornton's great React article</a> but he's right. React does a great job of encapsulating chunks of UI inside a single reusable component.

All these things are great because <strong>they encourage computer science best practices within JavaScript development</strong>. As JS progresses from making neat rollovers to a full-on application language, it's right to bring in these practices.
<h2>There will be naysayers</h2>
After its release, some developers labeled React as <strong>"JAJFLWYWCI" (Just-Another-JavaScript-Framework-Library-Whatever-You-Wanna-Call-It)</strong>. For whatever the reason, they said we shouldn't use it...a frequent reaction to frameworks and libamong JS developers.

The comments for <em>not</em> using it aligned with at least one of these three opinions:

1. <em>"Frameworks and libraries lead to slow performing web apps."</em>
2. <em>"It has a steep learning curve."</em>
3. <em>"Using frameworks and libraries is unprofessional programming."</em>

Some comments I engaged with (mostly online) and some I didn't. But they didn't bother me to the point I felt compelled to blog about it.

I had real-world web developer stuff to deal with so I moved on.
<h2>What Kevin said</h2>
Then, maybe on a subconscious impulse, I re-read <a href="https://web.archive.org/web/20130324030838/http://randyluecke.tumblr.com:80/post/45915323813/im-done-with-the-web">Kevin Luecke's "I'm done with the web" article</a>. An article that bummed me out when I first read it in 2013.

Kevin wasn't "done with the web" literally, but he was "done" with embracing the web developer community to the extent that he had. One reason for this was his frustration with why these developers hastily rejected certain JavaScript UI frameworks.

Even though things like <a href="http://www.cappuccino-project.org/">Cappuccino</a> and <a href="https://www.emberjs.com/">Ember</a> solved problems, web devs shunned them because of their seemingly large, low-performant file sizes and steep learning curves. Little time, if any, was spent seeing if they solved problems: the knee-jerk reaction was to reject them based on those things.

Kevin used other examples of web developers focusing on small-ish problems and he felt this was slowing web app progression. He felt that community was spending too much time worrying about the wrong stuff.

He had enough of this "stagnation" as he phrased it so he, himself, moved on. From the web dev community, that is, and more towards native app development.

What bummed me out about this article was how I'm a part of this community that rashly rejects stuff. Also, he made some <a href="https://www.youtube.com/watch?v=19g4n0ZxiYM&feature=youtu.be&t=2836">comments about "people that don't know how to program"</a> and I wondered if I was part of that group as well.
<h2>What Kevin's article was really about</h2>
First, I don't know the context of Kevin Luecke's comments regarding people that don't know how to program. So I'm not going to take them <em>out</em> of context and let them bum me out.

I'm a self-taught, web developer: I learned web stuff at a time when those that knew even a <em>little</em> HTML were incredibly employable.  I've continued to do web stuff for a long time since then, giving me experience that <em>keeps</em> me incredibly employable.

Since I'm not a classically-trained computer science developer, I'll always have to deal any feelings of insignificance that come up around this.  OK...I'll live with that.

Second, worrying about my feelings kept me from realizing the main point of that article. That <strong>web developers focus on the wrong things when rejecting certain JS tooling, and this is holding them back</strong>.

<h2>The complaints about performance</h2>
To be fair, I can't really say that the complaints about JS lib and framework performance are "wrong". Making apps as fast as possible is important as our dependency on mobile rises, and less JavaScript makes them faster.

But if an app requires lots of interactive features, as many do, then a library or framework may be needed to quickly build out those features. Thankfully, the JS community has developed lots of non-hacky best practices to increase performance for this use case.

Most of these practices are built around <a href="https://webpack.js.org/">webpack</a>. With its ability to build out slim JS files for production and <a href="https://survivejs.com/webpack/building/code-splitting/">code-splitting functionality</a>, webpack has become a necessary tool for JavaScript app development.

Andrew Welch wrote <a href="https://nystudio107.com/blog/an-annotated-webpack-4-config-for-frontend-web-development">a ridiculously thorough article on setting up webpack.</a> Just like JS libraries and frameworks, webpack has a bit of a learning curve so it's worth a read.

Also, Addy Osmani wrote <a href="https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4">a pretty definitive article on JS performance</a>...give it a read as well.  It discusses webpack and code-splitting stuff, along with other things like performance budgets, critical paths and testing/auditing tools.
<h2>Other performance stuff</h2>
Images are usually blamed for causing the most performance issues and Luecke mentions them in his article. But Osmani effectively argues that JS may be the bigger performance headache because images only have to download while JS files have to download, then parse and execute code.

Whatever your opinion here, optimize your images as well as your JavaScript. This means doing things like:
* using Photoshop  "export/Save for Web" on your images.
* adding an image minification step to your build process using something like <a href="https://github.com/imagemin/imagemin-cli">imagemin-cli</a>.
* if you can, using a CDN to serve out images...as well as JS, CSS and font files.
* ~maybe~ looking at <a href="https://www.nikonusa.com/en/learn-and-explore/a/tips-and-techniques/bokeh-for-beginners.html">Bokeh</a> to further optimize your images.

And performance depends on more than this: aggressive browser caching gives other performance wins. Plus, file minification is still a good idea, and your app will be slow if it's hosted with a low-end shared USD $5/month plan.

Many things can slow an app down: don't put the blame for this all on JavaScript.
<h2>The complaints about learning curves</h2>
In his post, Kevin Luecke is blunt about the defeatist attitude web devs take towards ramping up on new things. After quoting a developer who implied that it would take too long for their team to learn Ember, Luecke responded:
<blockquote class="content--blockquote-margin">
"This reaction to Ember just baffles me. Your day job is to build a piece of web software and you can't take a few days to learn the ins and outs? Presumably you're in a large team because this project is important and will take some time to complete. Nevertheless, I've seen this reaction many times in the web culture.
</blockquote>

I can relate to having this defeatist attitude. Always having to ramp up on a new JavaScript technology has affected me negatively and <a href="http://www.kaidez.com/101th-post/">I've written about it</a>.

But this is how JavaScript is right now and this rapid change shows no signs of slowing down. Newly-released JS libs and frameworks are part of this constant change...we all have to keep up.

If you're used to changing your UI with DOM manipulation, React <em>might</em> have a bit of learning curve. React makes you change UI by updating a state object instead of using something like <code>document.querySelector</code>.

But regardless of learning curves, libraries and frameworks solve someone's problem somewhere in the world. So a developer that's familiar with at least the popular ones is a valuable asset.

Developers like this have "problem solving-power": the ability to look at a problem and say "this framework is our solution."  Day job bosses and freelance clients love this.

You have to invest in yourself and make time to learn new JavaScript stuff, frameworks and libraries included. You may think there's nothing to lose by not learning them, but there's certainly nothing to gain either.
<h2>The complaints about "unprofessional programming" (whatever that means)</h2>
However, lots of developers believe the other ones using frameworks and libraries have no value and are unprofessional. That libs/frameworks should be completely avoided and we should just use vanilla JavaScript, and they're passionate in their belief.

I carried this belief once and to be honest, I became a better JavaScript developer as a result. My knowledge of JS fundamentals increased: writing powerful & concise functions, using <code>return</code> correctly, understanding prototypal inheritance, etc.

So yes, focusing my energy towards learning pure, unadulterated vanilla JS helped me. Still, I believe that <strong>the idea that using JavaScript frameworks and libraries is unprofessional is total bullshit.</strong>

Spend enough hours writing raw vanilla JS and you'll look for ways to write less of it with code abstraction. I can produce lots of high-quality code quickly when the right library or framework lets me do this.

And what if you're part of a team of developers? Using a lib or framework helps here because <strong>it provides your team a shared language, making collaboration and communication easier</strong>.

With React I can tell someone, "solve your problem by using this pre-built component that so-and-so built." Much easier than "cut-and-paste this code block that so-and-so wrote but you'll have to ask so-and-so what to do next."
<h2>Think about about "unprofessional programming" <em>does</em> mean</h2>
I've said this many MANY times before and I'll say it again:

<blockquote class="content--blockquote-margin">
Using JavaScript libraries and frameworks isn't unprofessional. Using them without understanding the core language fundamentals behind them is.
</blockquote >

Yeah, I use React everyday now, but it's because of its above-mentioned thoughtful component model. It lets me create huge chunks of UI that are easily reusable and easily editable.

That's all it does for me: from there, writing pure, vanilla JavaScript is my responsibility. I have to understand the use cases for using <code>let</code> or <code>const</code>, returning Promises and looping over JSON Objects.

React doesn't help me with any of this.  It gives me a nice container to place that code inside of, but that's it.

I'm using React to deliver production-quality code on time. I don't see why this is unprofessional.

<h2>Web developers can learn from native developers</h2>
While commenting about the complaints about learning curves, Kevin Luecke compared web developers to native developers:

<blockquote class="content--blockquote-margin">
This mentality is pretty rare in the world of native development though. Almost every decent developer I know has no problem spending a weekend learning some new and cool tool, but sadly, this spirit seems to be absent from the web culture.
</blockquote>
I would apply that mentality to the web dev complaints about performance and "unprofessional programming." I never hear Java developers make the same complaints about Spring...same thing with PHP developers and Laravel.

And right now, imagine what would have happened if Ruby developers collectively rejected Rails for all these reasons.

<h2>Understand the business process leading the app</h2>
Before accepting or rejecting a JavaScript library/framework, have a clear understanding of the project's goals and business requirements. Understand what the app must do before rejecting the tools that can help you build it.

Ember, which <a href="https://www.lynda.com/Emberjs-tutorials/Up-Running-Emberjs/178116-2.html">I've obviously used</a>, has a big file size and gets updated too frequently for my comfort. But if I'm building an app that users will open up and then use for a long time (like they would with Excel), Ember's a great option here.

This is not a chicken or the egg riddle. <strong>The business process leads the app: it never EVER follows it</strong>.

Speaking for myself, this is an area where I've made mistakes in the past. Had I focused more on what the app needed to accomplish and less on the "cool" way to do stuff, I'd be a VP somewhere.

You need to build a product and then ship it out the door: a library or framework may be a means to that end. So again, understand what your app must do because a framework or lib may help your app "do" it better.

<h2>The current JS build tooling is complex, but helpful</h2>
While almost all the comments on Andrew Welch's webpack are positive, the <em>very</em> first one was this:
<blockquote class="content--blockquote-margin">
Why do we keep making the build and deploy setups more complex than the apps we're deploying?
</blockquote>
I don't know if the build process is "more complex" then the apps, but know that the process itself is more complex than it was before. And Welch's response to the comment was proper: it terms of the complexity, "it depends on what you're building."

But this is the current state of JavaScript development. We're now using JS to build complex web <em>and</em> native apps, which can be created easier with libs and frameworks.

So yes, the build process is harder. The webpack, code-splitting and JavaScript cost article links above discuss things that should be part of any app you build.

I get that implementing all this takes more work than before. But again, this is the world we live in.

<h2>Conclusion</h2>
When discussing JavaScript frameworks and libraries, I believe that only <em>real</em> reason to reject them is their potential performance problems. And we have a ton ways to solve these problems.

Let's use these solves in our work so we can focus on the important thing: building apps fast and efficiently. And if a framework and library helps you do this (and you took the time to research if it does), so be it.
