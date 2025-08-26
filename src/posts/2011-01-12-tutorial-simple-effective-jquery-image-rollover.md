---
title: 'TUTORIAL: A Simple, Effective jQuery Image Rollover - ARCHIVE'
date: 2010-01-12
excerpt: A very popular, cross-browser complaint jQuery image rollover
layout: layouts/post.njk
permalink: /tutorial-simple-effective-jquery-image-rollover/
image: default-image.jpg
tags: ["tutorials"]
secondary_tags: ["javascript", "jquery"]
category: Tutorials
---
I used the following code to create the image rollovers for [the recent Almay project I worked on][1].

 [1]: /almay-project-using-html5-net-jquery/

Truthfully, I wasn't going to post this: I found it on another site and felt that re-posting it here would be claiming it as my own creation. But I found quite a few other sites using the exact same script, so I'm not the only one re-posting it. Plus, this rollover code works…well I might add. It doesn't use CSS, making it much more cross-browser compliant; it's not as buggy as some other JavaScript rollover code I've encountered, and it gets the job done with very little code.

I'm viewing all those other re-posts as an endorsement of how almost-perfect this code is. Here's my endorsement:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;A Simple jQuery Image Rollover&lt;/title&gt;

&lt;script src="http://code.jquery.com/jquery-1.4.4.min.js" type="text/javascript"&gt;&lt;/script&gt;

&lt;script type="text/javascript"&gt;
$(document).ready(function() {
$("img.rollover").hover(
function() { this.src = this.src.replace("_off", "_on");
},
function() { this.src = this.src.replace("_on", "_off");
});
});
&lt;/script&gt;

&lt;/head&gt;
&lt;body&gt;

&lt;a href="#"&gt;&lt;img src="imageOne_off.png" class="rollover" /&gt;&lt;/a&gt;
&lt;br /&gt;
&lt;a href="#"&gt;&lt;img src="imageTwo_off.png" class="rollover" /&gt;&lt;/a&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre>

First, make sure that you create your rollover images. Each individual rollover needs two images attached to it: one named `yourFilename_off.gif` and the other named `yourFilename_on.gif`. As long as these images are of the same file type, it doesn't matter what file type it is. GIF, JPEG, PNG…it doesn't matter. For this example, I have four images that will be used in two rollovers:

<pre><code class="language-markup">
imageOne_off.png

imageOne_on.png

imageTwo_off.png

imageTwo_off.png
</code></pre>


And now the code breakdown…

We make sure to embed the jQuery library into our web page grabbing the one stored over at jquery.com:

Next, we tell jQuery that every time an image tag with a class name of “rollover” gets moused over, it should **simultaneously** perform two tasks:

*   it should see if the image contains the word “\_off” in the filename…if it does, replace it with “\_on” which will force the “_on” version of image to load.  

*   it should see if the image contains the word “\_on” in the filename…if it does, replace it with “\_off” which will force the “_off” version of image to load.

<pre><code class="language-javascript">
&lt;script type="text/javascript"&gt;
$(document).ready(function() {
$("img.rollover").hover(
function() { this.src = this.src.replace("_off", "_on");
},
function() { this.src = this.src.replace("_on", "_off");
});
});
&lt;/script&gt;
</code></pre>


And from here, we just place the images on the web page, making sure that they have a class name of “rollover”:
<pre><code class="language-markup">
&lt;a href="#"&gt;&lt;img src="imageOne_off.png" class="rollover" /&gt;&lt;/a&gt;
&lt;br /&gt;
&lt;a href="#"&gt;&lt;img src="imageTwo_off.png" class="rollover" /&gt;&lt;/a&gt;
</code></pre>

That's it!!! The best rollover code I've ever used!!!

One more jQuery-related post, then it's time to discuss HTML5 video!!!!!!