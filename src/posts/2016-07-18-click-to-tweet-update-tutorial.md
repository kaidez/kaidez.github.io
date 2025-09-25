---
title:  "Click To Tweet Tutorial Update"
date:   2016-07-18
excerpt: kaidez’s click to Tweet tutorial is updated to be shorter, more readable, provide information faster & demonstrate some window.location JavaScript tricks.
layout: layouts/post.njk
permalink: /update-tweet-tutorial/
image: click-to-tweet-open-graph.jpg
category: Personal
tags: ["personal"]
secondary_tags: ["javascript","twitter/x"]
---
<p>My click to tweet tutorial has been doing pretty well in terms of appearing early in search results. When my <a href="/github-tutorial-update/">Git tutorial</a> started to do the same, I tweaked it to give it an SEO push and have seen some positive results.</p>

<p>Therefore, I'm doing the same thing with the click to tweet tutorial.</p>

<h2>The Changes</h2>

<p>A complete, general list of the changes&#8230;</p>

<ul><li><strong>refactor the code to use the window.location property:</strong> if the links that get Tweeted contain things like query strings and hash tags, those things were previously removed with a regular expression. This doesn't work on a global level so I'm now cleaning up the link with <code>window.location</code> property. It gets the job done in all situations and I walk through various ways to use it.</li><li><strong>lots of copy adjustments:</strong> there a little less copy than before and the content itself looks different. Also, I updated the title and meta description and get to the point quicker in this update.</li><li><strong>shorten the code:</strong> the previous code was 16 lines long and worked, but I reduced it to 12. That's not a HUGE reduction; however, the code runs faster than it did before.</li><li><strong>scrape the open graph content:</strong> I updated the meta open graph stuff so I had to scrape it with <a href="https://developers.facebook.com/tools/debug/">Facebook's Sharing Debugger</a> so those updates would actually appear.</li></ul>

<h2>Using the SEO Plugin</h2>

<p>The BIG reason I'm doing all this was that my WordPress-based site uses <a href="https://wordpress.org/plugins/wordpress-seo/">Yoast's WordPress SEO plugin</a>. The plugin has always been great, but it's REALLY improved over the last few months.</p><p>Along with its great SEO analyzing engine, it also includes a Readability analyzing engine. The latter gives tips on how readable a post is&#8230;I followed its advice and made a few adjustments to the text&#8230;and all is good.</p><p><a href="/click-to-tweet-link/">Read the click to tweet tutorial</a>