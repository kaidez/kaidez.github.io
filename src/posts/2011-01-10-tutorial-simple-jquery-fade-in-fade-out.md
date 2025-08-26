---
title: 'TUTORIAL: A Simple jQuery Image Fade In/Fade Out With A Delay'
date: 2010-01-10
excerpt: An easy jQuery tutorial to fade in and fade out two images with a delay
layout: layouts/post.njk
permalink: /tutorial-simple-jquery-fade-in-fade-out/
image: default-image.jpg
tags: ["tutorials"]
secondary_tags: ["javascript", "jquery"]
category: Tutorials
redirect_from:
  - /tutorial-simple-jquery/
---
<p style="margin: 30px 0 40px; border-bottom: black 1px solid;">
<em>(Author's note - August 2025: This tutorial is WAAAAAAAAY out of date, but it remains my most-trafficked, most-shared blog post EVER! It's because of the post that I got a boatload of social media followers and multiple requests to help developers in other countries that saw me as an authority.  I've deleted old and outdated posts and articles from this blog, but I can't let this one go.  Purely here for historical perspective...there are way more modern approaches to do what's being discussed here. -k)</em></p>

 [1]: /javascript-for-loop-creates-jquery-fade/

Clients *looooooove* images that fade in and fade out on home pages. Flash was once the main tool of choice for this but jQuery now lets us do it with less code and guarantees that things will show up on multiple devices, iPhones included.

I had to do this recently for the project I mentioned in [my previous post][2].

 [2]: /almay-project-using-html5-net-jquery/

Here’s how I did it:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;A Simple jQuery Fade In/Fade Out&lt;/title&gt;

&lt;style&gt;
#picOne, #picTwo {
position:absolute;
display: none;
}

#pics {
width:100px;
height:100px;
}
&lt;/style&gt;

&lt;script src="http://code.jquery.com/jquery-1.4.4.min.js" type="text/javascript"&gt;&lt;/script&gt;

&lt;script type="text/javascript"&gt;
$(document).ready(function() {
    $('#picOne').fadeIn(1500).delay(3500).fadeOut(1500);
    $('#picTwo').delay(5000).fadeIn(1500);
});
&lt;/script&gt;

&lt;/head&gt;
&lt;body&gt;

&lt;div id="pics"&gt;
&lt;img src="firstPic.gif" width="100" height="100" id="picOne" /&gt;
&lt;img src="secondPic.gif" width="100" height="100" id="picTwo" /&gt;
&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre>

Let’s review the specific parts of the code that make the fade in/fade out work..

We create unique CSS IDs for each of our two images. They need to be hidden when the page first loads and also need to be stacked one on top of the other, so we respectively use display:none and position:absolute. We also need to create a containing  for our images, so we create a unique CSS ID called “pics”:

<pre><code class="language-javascript">
    #picOne, #picTwo {
      display: none;
      position:absolute;
    }

    #pics {
      width:100px;
      height:100px;
    }
</code></pre>

We have to embed the jQuery library into our web page…in this case, I embedded the one hosted over at [jQuery.com][4]:

 [4]: http://jquery.com/

As soon as the page is loaded, the jQuery .fadeIn() function fades in our first image in 1500 milliseconds (or, 1.5 seconds). The .delay() function acts as a counter and waits 3500 milliseconds (or, 3.5 seconds), then the .fadeOut() function fades it out in 1500 milliseconds (or, 1.5 seconds).

<pre><code class="language-javascript">
$('#picOne').fadeIn(1500).delay(3500).fadeOut(1500);
</code></pre>

At the same time that the first image is doing its thing on page load, the .delay() function makes the second image wait 5 seconds before the .fadeIn()function fades it in in 1.5 seconds.

<pre><code class="language-javascript">
$('#picTwo').delay(5000).fadeIn(1500);
</code></pre>

We place our two images in our “pics”  tag. The images and  tag are of equal width and height. And since the images were styled with position: absolute, they will be stacked one on top of the other. Whichever one is listed first is the one on top:

<pre><code class="language-markup">
&lt;div id="pics"&gt;
&lt;img src="firstPic.gif" width="100" height="100" id="picOne" /&gt;
&lt;img src="secondPic.gif" width="100" height="100" id="picTwo" /&gt;
&lt;/div&gt;
</code></pre>

That should do it…but let me make two points:

  * I used transparent GIFs for this because transparent PNGs looked weird when they faded in and out. Of course, you can use a JPEG if your images don’t need to be transparent.  

  * Properly syncing the various fades took a little planning. Note the combined time for <code>.fadeIn()</code> and <code>.delay()</code> for the first image is five seconds, equal to the timing on the <code>.delay()</code> for the second image. Also note that the first image takes 1.5 seconds to fade out while the second one takes the same amount of time to fade in. This keeps everything neat.

My HTML5 video posts are coming soon but another short jQuery-related post is coming next.