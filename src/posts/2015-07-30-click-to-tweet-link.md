---
title: "Click to Tweet Link Created Dynamically With JS"
date: 2015-07-30
excerpt: Tutorial for dynamically creating a click to Tweet link with JavaScript and the window.location object…no hard-coding. With demos and code samples.
layout: layouts/post.njk
permalink: /click-to-tweet-link/
image: click-to-tweet-open-graph.jpg
tags: ["tutorials"]
secondary_tags: ["javascript","twitter/x"]
category: Tutorials
---

<p>
  &#8220;Click to Tweet&#8221; links are a highly-recommended way of promoting your site content. If you politely ask readers to do it, they may if you make it easy for them.
</p>

<p>
  I added click to Tweet functionality to my blog with JavaScript that's optimized to run as fast as possible. And along the way, I learned a lot about the browser's 
  <code>window.location</code> 
  object.
</p>

<h2>Table of Contents</h2>

<ol>
  <li>
    <a href="#notes">Some Notes</a>
  </li>
  <li>
    <a href="#403-error">Twitter's Famous &#8220;403 Forbidden&#8221; Error</a>
  </li>
  <li>
    <a href="#optimized">This Code Is Optimized</a>
  </li>
  <li>
    <a href="#simple-link">A Simple Link</a>
    <ul>
      <li> 
        <a href="#page-variables">The Page Variables</a>
      </li>
      <li> 
        <a href="#link-binding">The Link Binding</a>
      </li>
      <li> 
        <a href="#tweet-link-variable">The Tweet Link Variable</a>
      </li>
      <li> 
        <a href="#final-window">The Final Window</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="#html-css">Review The HTML &#038; CSS</a>
  </li>
  <li>
    <a href="#window-location-difference">Different Ways To Access the window.location property</a>
    <ul>
      <li>
        <a href="#window-location-origin">Grab The Link With window.location.origin</a>
      </li>
      <li>
        <a href="#port-hostname-pathname">Grab The Link With the protocol, hostname and pathname Properties</a>
      </li>
      <li>
        <a href="#feature-detect-origin">Use The Origin Property With Feature Detection</a>
      </li>
      <li>
        <a href="#more-window-location-info">More things about window.location</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="#final-click-to-tweet-recommendation">The Final Click To Tweet Recommendation</a>
  </li>
  <li>
    <a href="#conclusion">Conclusion</a>
  </li>
</ol>

<p>
  <a name="notes"></a>
</p>

<h2>Some Notes</h2>

<p>
  I walk through various ways to create this functionality with 
  <code>window.location</code>. 
  But if you want to grab the final, recommended code, jump to 
  <a href="#final-click-to-tweet-recommendation">
    <em>The Final Click To Tweet Recommendation</em>
  </a> 
  section on this page and copy-and-paste it.
</p>

<p>
  This code only works if it runs on some sort of web server setup. So if you want to test it, you'll need to either run it on an actual website or simulate a web server on your local machine using something like 
  <a href="http://www.wampserver.com/" alt="Learn more about WAMP for Windows">WAMP for Windows</a>, 
  <a href="https://www.mamp.info/" alt="Learn more about MAMP for Mac and Windows">MAMP for Windows and Mac</a> 
  or 
  <a href="https://www.apachefriends.org/index.html" alt="Learn more about XAMMP for Windows, Mac and Linux">XAMMP for Windows, Mac and Linux</a>.
</p>

<p>
  All code samples work 
  <em>
    <strong>dynamically</strong>
  </em> 
  and nothing is hard-coded. If you would rather hard-code a click to Tweet link, I suggest reading 
  <a href="http://gpiot.com/blog/elegant-twitter-share-button-and-dialog-with-jquery/" alt="Read Guillaume Piot's Click to Tweet tutorial">Guillaume Piot's excellent tutorial</a>.
</p>

<p>
  <a name="403-error"></a>
</p>

<h2>Twitter's Famous &#8220;403 Forbidden&#8221; Error</h2>

<p>
  When testing this code, note that 
  <a href="https://support.twitter.com/articles/15364">Twitter limits the amount of daily Tweets you can send</a>. 
  It's a high limit but it's possible to reach it and if you do, you'll get this message:
</p>

<blockquote>
  <p>
    <em>403 Forbidden: The server understood the request, but is refusing to fulfill it.</em>
  </p>
</blockquote>

<p>
  This 
  <em>seems</em> 
  to apply to only your machine. I hit this limit on my laptop in Chrome and got the error, but then did secondary tests in a Chrome Incognito window, my iPhone and in Firefox on my wife's laptop&#8230;the error didn't appear in those secondary situations.
</p>

<p>
  I fixed this on my machine by restarting the browser and clearing the cookies and browser cache. Fixing this problem on your machine (if it comes up) may require a different fix so just be aware of this limit and that just because it's happening on your machine probably doesn't mean that it's happening on others.
</p>

<p>
  <a name="optimized"></a>
</p>

<h2>This Code Is Optimized</h2>

<p>
  This code optimized to run as fast as possible in two ways:
</p>

<ol>
  <li>
    <strong>No need to use widgets.js:</strong> 
    <code>widgets.js</code> 
    is Twitter's core file for creating various Twitter web page elements. I'm not using it and as a result, my site makes one less server request. I should point out that Twitter prefers that you use this file on your site when creating Tweet functionality and you can add it if you want to, but this code seems to work fine without it.
  </li>
  <li>
    <strong>No need for plugins:</strong> 
    No need for any plugin of any kind; therefore, the code creates a very small footprint.
  </li>
</ol>

<p>
  <a name="html-css"></a>
</p>

<h2>Review The HTML &#038; CSS</h2>

<p>
  The HTML and CSS for this is pretty basic. Looking at the HTML first&#8230;
</p>

<pre>
<code class="language-markup">
 &lt;!-- index.html --&gt;

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Click to Tweet Link Tutorial - Sample 1&lt;/title&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Click to Tweet Link&lt;/h1&gt;
  &lt;h2 id="blog-post-title"&gt;Click to Tweet Link Tutorial - Sample 1&lt;/h2&gt;

  &lt;div&gt;
    This is an example for building a really simple "Click To Tweet" link. Learn how to build it &lt;a href="/click-to-tweet/"&gt;here&lt;/a&gt;.
  &lt;/div&gt;

  &lt;div&gt;
    &lt;a href="#" id="tweet-this-post" class="tweet-post-class"&gt;would you like to tweet this page?&lt;/a&gt;
  &lt;/div&gt;

  &lt;script src="https://code.jquery.com/jquery-1.11.3.min.js"&gt;&lt;/script&gt;
  &lt;script src="tweetButton.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>

<p>
  The two key page elements are: 1) the 
  <code>&lt;h2&gt;</code> 
  tag with an id of 
  <code>blog-post-title</code>, 
  and 2) the 
  <code>&lt;a&gt;</code> 
  tag with an id of 
  <code>tweet-this-post</code>.
</p>

<p>
  The 
  <code>&lt;h2&gt;</code> 
  represents the blog post's title: we'll use the text inside of it for the copy of our Tweet. The 
  <code>&lt;a&gt;</code> 
  tag is our click to Tweet link: we'll bind functionality to it that builds our Tweet when it's clicked.
</p>

<p>
  The 
  <code>&lt;a&gt;</code> 
  has an 
  <code>href</code> 
  attribute that isn't really needed for this specific code. But it's a good idea to leave it there for acccessibility purposes.
</p>

<p>
  These are the tags I'm using for this specific tutorial but you can, of course, use any tags you want in your code. In this case, the 
  <code>&lt;title&gt;</code> 
  tag can be used instead of 
  <code>&lt;h2&gt;</code>.
</p>

<p>
  Finally, we're linking jQuery to our site and are also linking a file called 
  <code>tweetButton.js</code>. 
  The latter file will contain the click to Tweet code, and will be our main focus throughout this tutorial.
</p>

<p>
  Then there's the CSS&#8230;
</p>

<pre>
<code class="language-css">
/* style.css */

body {
  font-family: Helvetica, Arial, sans-serif;
}

.tweet-post-class {
  height: auto;
  width: 280px;
  display: block;
  margin: 50px auto 0;
  padding: 10px;
  border-radius: 5px;

  background-color: #ED327F;
  text-align: center;
  cursor: pointer;
}

a.tweet-post-class {
  color:#fff;
  text-decoration:none
}

a.tweet-post-class:visited {
  color:#fff
}

a.tweet-post-class:active,
a.tweet-post-class:hover {
  color:#fff;
  background-color:#55acee
}
</code>
</pre>

<p>
  The click to Tweet link is styled nicely&#8230;past that, there's not much happening here.
</p>

<p>
  We'll look at the simplest version of the link:
  <br/> 
  <a name="simple-link"></a>
</p>

<h2>A Simple Link</h2>

<pre>
<code class="language-javascript">
// tweetButton.js

var getPostTitle = document.getElementById("blog-post-title").innerHTML,
    linkElement = document.getElementById("tweet-this-post");

$(linkElement).click(function(event){

  event.preventDefault();

  var tweetedLink = window.location.href;

  window.open("http://twitter.com/intent/tweet?url=" + tweetedLink + "&amp;text=" + getPostTitle + "&amp;via=kaidez&amp;", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");

});
</code>
</pre>

<p>
  Reviewing the code&#8230;
</p>

<p>
  <a name="page-variables"></a>
</p>

<h3>The Page Variables</h3>

<pre>
<code class="language-javascript">
var getPostTitle = document.getElementById("blog-post-title").innerHTML,
    linkElement = document.getElementById("tweet-this-post");
</code>
</pre>

<p>
  Two variables reference the 
  <code>&lt;h2&gt;</code> 
  and 
  <code>&lt;a&gt;</code> 
  tags based on their respective 
  <code>id</code> 
  attribute: 
  <code>getPostTitle</code> 
  and 
  <code>linkElement</code>.
</p>

<p>
  <a name="link-binding"></a>
</p>

<h3>The Link Binding</h3>

<pre>
<code class="language-javascript">
$(linkElement).click(function(event){

  event.preventDefault();
  ...
});
</code>
</pre>

<p>
  <code>jQuery.click()</code> 
  functionality is bound to 
  <code>linkElement</code>, 
  our code's reference to the 
  <code>&lt;a&gt;</code> 
  tag. Since it has an 
  <code>href</code> 
  attribute, it will try to jump to another page if clicked so to stop that, we pass an 
  <code>event</code> 
  parameter to the function, then run 
  <code>event.preventDefault()</code> 
  inside the 
  <code>jQuery.click()</code> 
  method.
</p>

<p>
  <a name="tweet-link-variable"></a>
</p>

<h3>The Tweet Link Variable</h3>

<pre>
<code class="language-javascript">
var tweetedLink = window.location.href;

window.open( "http://twitter.com/intent/tweet?url=" + tweetedLink + "&amp;text=" + getPostTitle + "&amp;via=kaidez&amp;", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0" );
</code>
</pre>

<p>
  When the link is clicked, 
  <code>tweetedLink</code>
  &#8216;s value will be 
  <code>window.location.href</code>, 
  which is whatever the current URL is in the address bar. In addition, the click also a popup window that's built with 
  <a href="https://dev.twitter.com/web/intents#retweet-intent" alt="Learn more about Twitter Web intents">Twitter Web Intents</a> which allows for things retweeting inside a popup.
</p>

<p>
  A URL is built with important things that come after the query string (
  <code>?</code>), 
  which are:
</p>

<ol>
  <li>
    The 
    <code>?url=" + tweetedLink"</code> 
    value that comes at the start of the query string contains the value of our 
    <code>tweetedLink</code> 
    variable which, again, is the URL in our address bar.
  </li>
  <li>
    The 
    <code>"&amp;text=" + getPostTitle</code> 
    value refers to the 
    <code>getPostTitle</code> 
    variable we defined at the top of our code is also built into the URL and, again, it stores the name of our blog post.
  </li>
  <li>
    The 
    <code>&amp;via=kaidez</code> 
    value that come next. Setting 
    <code>via</code> 
    equal to your Twitter handle (or mine in this example) means the handle will be passed into the Tweet.
  </li>
</ol>

<p>
  Finally, the 
  <code>twitterwindow</code> 
  value creates the popup window with Twitter branding, setting its height and width and builds it without a toolbar, address (location) bar, menu bar, bookmark bar and scrollbar. You can change any of the values on your end if you want.
</p>

<p>
  <a name="final-window"></a>
</p>

<h3>The Final Window</h3>

<p>
  The 
  <code>url</code>, 
  <code>text</code> 
  and 
  <code>via</code> 
  values are optional. But if you give them values, the popup will look similar to this:
</p>

<div> 
  <img src="/assets/img/click-to-tweet-sample-01.jpg" alt="First sample of a Tweet box for the kaidez 'click to tweet' tutorial"/>
</div>

<p>
  <a href="/samples/click-to-tweet/01/" target="blank">
    <strong>SEE THE DEMO</strong>
  </a>.
</p>

<p>
  <a name="window-location-difference"></a>
</p>

<h2>Different Ways To Access the window.location property</h2>

<p>
  Using 
  <code>window.location.href</code> 
  seems like the easiest way to do all this, but you shouldn't use it with complex URLs.
</p>

<p>
  Imagine that the URL has a hashtag&#8230;
</p>

<pre>
<code class="language-html">
https://kaidez.com/samples/#/some-hash-tag
</code>
</pre>

<p>
  &#8230;or has a query string, query string values AND a hash tag:
</p>

<pre>
<code class="language-html">
https://kaidez.com/samples/click-to-tweet/02/?query=some_query&amp;value=some_value/#/some-hash-tag
</code>
</pre>

<p>
  If either of these URLs are in the browser's address bar, it's what 
  <code>window.location.href</code> 
  would see and pass to the Tweet window. And that's probably not what we want.
</p>

<p>
  <a name="window-location-origin"></a>
</p>

<h3>Grab The Link With window.location.origin</h3>

<p>
  <code>window.location</code> 
  has other properties besides 
  <code>href</code>, 
  one of them being 
  <code>origin</code> 
  which grabs the domain name&#8230;that would be 
  <code>https://kaidez.com/samples</code>.
</p>

<p>
  There's also 
  <code>pathname</code> 
  which grabs the link's directory structure under the domain name&#8230;that would be something like 
  <code>/click-to-tweet/02/</code>.
</p>

<p>
  So in our code, we can change 
  <code>tweetedLink</code>
  &#8216;s value to be:
</p>

<pre>
<code class="language-javascript">
...
var tweetedLink = window.location.origin + window.location.pathname;
...
</code>
</pre>

<p>
  And behind the scenes, 
  <code>tweetedLink</code> 
  would look like this&#8230;
</p>

<pre>
<code class="language-html">
https://kaidez.com/samples/click-to-tweet/02/
</code>
</pre>

<p>
  Consequently, we can grab just the URL and not any query strings or hash tags.
</p>

<p>
  <a href="/samples/click-to-tweet/02/?query=some_query&amp;value=some_value/#/some-hash-tag" target="blank">
    <strong>SEE THE DEMO</strong>
  </a> 
  and note its long URL that contains both the query string stuff and hashtag.
</p>

<p>
  <a name="port-hostname-pathname"></a>
</p>

<h3>Grab The Link With the protocol, hostname and pathname Properties</h3>

<p>
  But there's a problem with 
  <code>window.location.origin</code>: 
  for Internet Explorer, it only works on certiain, newer versions of IE 11 and up. It barley worked on version 11 until Microsoft released a bug fix for it; 
  hence, there are old versions of IE 11 (as well as the versions before it) where this code fails.
</p>

<p>
  Looking at 
  <a href="http://caniuse.com/#search=window.location">the &#8220;Can I Use&#8221; list for <code>window.location</code>&#8216;s browser support</a>, 
  we see we can build the link with three of its other properties: 
  <code>protocol</code>, 
  <code>hostname</code> 
  and 
  <code>pathname</code>:
</p>

<pre>
<code class="language-javascript">
...
var tweetedLink = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
...
</code>
</pre>

<p>
  So if we have a long URL like this&#8230;
</p>

<pre>
<code class="language-html">
https://kaidez.com/samples/click-to-tweet/03/?query=some_query&amp;value=some_value/#/some-hash-tag
</code>
</pre>

<p>
  &#8230;then our 
  <code>tweetedLink</code> 
  variable is built out like this&#8230;
</p>

<ul>
  <li>
    <code>protocol</code> 
    grabs the link's server protocol: 
    <code>http:</code>
  </li>
  <li>
    We add 
    <code>//</code> 
    to build a proper link
  </li>
  <li>
    <code>host</code> 
    grabs the link's domain: 
    <code>samples.kaidez.com</code>
  </li>
  <li>
    <code>path</code> 
    grabs the link's path position: 
    <code>/click-to-tweet/03/</code>
  </li>
</ul>

<p>
  And 
  <code>tweetedLink</code> 
  will look like this behind the scenes:
</p>

<pre>
<code class="language-html">
https://kaidez.com/samples/click-to-tweet/03/
</code>
</pre>

<p>
  Longer code but our click to tweet link contains the things we need, ignoring the query string stuff and hash tag.
</p>

<p>
  <a href="/samples/click-to-tweet/03/?query=some_query&amp;value=some_value/#/some-hash-tag" target="blank">
    <strong>SEE THE DEMO</strong>
  </a> 
  and note its long URL that contains both the query string stuff and hashtag.
</p>

<p>
  <a name="feature-detect-origin"></a>
</p>

<h3>Use The Origin Property With Feature Detection</h3>

<p>
  Still, the 
  <code>origin</code> 
  property is fast and we should use it if we can. We can add two versions of the code (one that uses 
  <code>origin</code> 
  and one that doesn't) and use feature-detection to determine which version runs in the browser.
</p>

<p>
  So the 
  <code>tweetedLink</code> 
  variable in 
  <code>tweetButton.js</code> 
  now looks like this:
</p>

<pre>
<code class="language-javascript">
...
var tweetedLink;

if(!window.location.origin) {
  tweetedLink = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
} else {
  tweetedLink = window.location.origin + window.location.pathname;
}
...
</code>
</pre>

<p>
  First, 
  <code>tweetedLink</code> 
  is initiated with no value. Next, we're checking to see if the 
  <code>window.location.origin</code> 
  exists in the browser.
</p>

<p>
  If it does NOT exist, then 
  <code>tweetedLink</code> 
  will be set to the version we created with the 
  <code>protocol</code>, 
  <code>host</code> 
  and 
  <code>pathname</code> 
  properties. But if it DOES exist, then 
  <code>tweetedLink</code> 
  will be set to the version we created with the 
  <code>window.location.origin</code>.
</p>

<p>
  <a href="https://kaidez.com/samples/click-to-tweet/04/?query=some_query&amp;value=some_value/#/some-hash-tag" target="blank">
    <strong>SEE THE DEMO</strong>
  </a> 
  and note its long URL that contains both the query string stuff and hashtag.
</p>

<p>
  <a name="more-window-location-info"></a>
</p>

<h3>More things about window.location</h3>

<ol>
  <li>
    There is a 
    <code>window.location.host</code> 
    property that 
    <em>should</em> 
    work like 
    <code>hostname</code> 
    and contain the 
    <code>protocol</code> 
    and 
    <code>href</code> 
    properties as well as the forward slashes. The Can I Use link 
    <em>does</em> 
    say that 
    <code>host</code> 
    works cross-browser but I found that it didn't, so I ignored it.
  </li>
  <li>
    You can grab the query string info with 
    <code>window.location.search</code>
    &#8230;for our link, that would return 
    <code>?query=some_query&amp;value=some_value/</code>
  </li>
  <li>
    You can grab the hash tag info with 
    <code>window.location.hash</code>
    &#8230;for our link, that would return 
    <code>#/some-hash-tag/</code>
  </li>
</ol>

<p>
  <a name="final-click-to-tweet-recommendation"></a>
</p>

<h2>The Final Click To Tweet Recommendation</h2>

<p>
  If you use this code, I recommend using the final version we just created. Here's what all that code looks like in full:
</p>

<p>
  The HTML
</p>

<pre>
<code class="language-markup">
 &lt;!-- index.html --&gt;

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Click to Tweet Link Tutorial - Sample 1&lt;/title&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Click to Tweet Link&lt;/h1&gt;
  &lt;h2 id="blog-post-title"&gt;Click to Tweet Link Tutorial - Sample 1&lt;/h2&gt;

  &lt;div&gt;
    This is an example for building a really simple "Click To Tweet" link. Learn how to build it &lt;a href="/click-to-tweet/"&gt;here&lt;/a&gt;.
  &lt;/div&gt;

  &lt;div&gt;
    &lt;a href="#" id="tweet-this-post" class="tweet-post-class"&gt;would you like to tweet this page?&lt;/a&gt;
  &lt;/div&gt;

  &lt;script src="https://code.jquery.com/jquery-1.11.3.min.js"&gt;&lt;/script&gt;
  &lt;script src="tweetButton.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>

<p>
  The CSS
</p>

<pre>
<code class="language-css">
/* style.css */

body {
  font-family: Helvetica, Arial, sans-serif;
}

.tweet-post-class {
  height: auto;
  width: 280px;
  display: block;
  margin: 50px auto 0;
  padding: 10px;
  border-radius: 5px;

  background-color: #ED327F;
  text-align: center;
  cursor: pointer;
}

a.tweet-post-class {
  color:#fff;
  text-decoration:none
}

a.tweet-post-class:visited {
  color:#fff
}

a.tweet-post-class:active,
a.tweet-post-class:hover {
  color:#fff;
  background-color:#55acee
}
</code>
</pre>

<p>
  The JavaScript
</p>

<pre>
<code class="language-javascript">
// tweetButton.js

var getPostTitle = document.getElementById("blog-post-title").innerHTML,
  linkElement = document.getElementById("tweet-this-post");

$(linkElement).click(function(event){

  event.preventDefault();

  var tweetedLink;

  if(!window.location.origin) {
    tweetedLink = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
  } else {
    tweetedLink = window.location.origin + window.location.pathname;
  }

  window.open("http://twitter.com/intent/tweet?url=" + tweetedLink + "&amp;text=" + getPostTitle + "&amp;via=kaidez&amp;", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");

});
</code>
</pre>

<p>
  <a name="conclusion"></a>
</p>

<h2>Conclusion</h2>

<p>
  This &#8220;click to Tweet&#8221; link works well on my live site and was really easy to integrate with the WordPress stuff. I'm quite satisfied by the fact that I coded it all on my own without needing a plug-in.
</p>
