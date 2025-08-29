---
title: 'TUTORIAL: How AJAX, jQuery and HTML5 Work Together'
date:   2011-01-05
excerpt: AJAX, jQuery and HTML5 are big buzz words in the web design/development community nowadays.  While getting these web technologies to work together is exciting, the programming required to do this isn't new.
layout: layouts/post.njk
permalink: /ajax-jquery-html5-work-together/
image: default-image.jpg
tags: ["tutorials"]
secondary_tags: ["html5", "javascript", "jquery", "legacy"]
category: Tutorials
---
<p style="margin: 30px 0 40px; border-bottom: black 1px solid;">
<em>(Author's note - August 2025: This article is REALLY, REALLY old!!! Currently, the combined use of JavaScript's native <code>fetch</code>, <code>async/await</code> and <code>Promise</code> functionalities is the modern alternative to all this. And in the case of Promises, they weren't native at the time this article was published, but they're fully native now. So <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">MDN's "Using the Fetch API"</a> article covers the aforementioned modern alternative really well, but you may want to go through this article to get some historical perspective on how things once were.  -k)</em>
</p>

AJAX, jQuery and HTML5 are big buzz words in the web design/development community nowadays. While getting these web technologies to work together is exciting, the programming required to do this isn't new.

AJAX, jQuery and HTML5 work together through the use of *page tags, page IDs* and *page classes* that exist between the two  tags of a web page. The JavaScript functionality embedded in jQuery and AJAX finds these tags , IDs and classes (which we'll now call *page elements*) and "does" something to them; maybe it changes their background color, maybe it's loading copy into them. Either way, it's doing *something* to them.

This process of "finding and doing something" to these page elements with JavaScript is more commonly known as *"traversing the DOM"*. Simply put, ***traversing the DOM is the key to getting AJAX, jQuery and HTML5 to work together***.

Web developers have used DOM traversal for years so, again, there really isn't that much new programming involved when it comes to syncing up AJAX, jQuery and HTML5. Still, a layman's description of how all this works may be required, so I'll give it a try.

<h2>Traversing the DOM The Old School Way With JavaScript</h2>

DOM stands for Document Object Model. All the page elements live within the DOM, which is built into a web page. You find the elements by traversing the DOM with JavaScript, mostly through the use of the `getElementById()` function.

Here's some HTML5-ready page code that uses it:

<pre><code class="language-javascript">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;Load Text Into An ID Using JavaScript&lt;/title&gt;
&lt;script type="text/javascript"&gt;
function loadText() {
document.getElementById('words').innerHTML = 'Hello World!';
}
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input type="button" onclick="loadText()" value="Load Some Copy!"/&gt;
&lt;br /&gt;
&lt;div id="words"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
Let's look at the code and translate it..

The `script` tag

<pre><code class="language-markup">
&lt;script type="text/javascript"&gt;
function loadText() {
document.getElementById('words').innerHTML = 'Hello World!';
}
&lt;/script&gt;
</code></pre>
TRANSLATION: create a JavaScript function called loadText(). When this function runs, it should find a page element with an id of 'words' and place some text inside of it that says Hello World!

The `<input>` tag

<pre><code class="language-markup">
&lt;input type="button" onclick="loadText()" value="Load Some Text!"/&gt;
</code></pre>
TRANSLATION: Whenever this button is clicked, run the loadText() function. This will load that Hello World! copy into that page element with an id of 'words'.

The `<div>` tag

<pre><code class="language-markup"> &lt;div id="words"&gt;&lt;/div&gt;</code></pre>
TRANSLATION: This empty `div` tag is the page element with an id of 'words,' so this is what's affected when the loadText() function runs. Therefore, this is where the Hello World! text will be placed into when the button is clicked.

An ID must be unique on a web page so in our example, there can only be one page element with an ID of "words." If you need to traverse the DOM with JavaScript to locate multiple page elements with the same name, it's best if you look for tags using the `getElementsByTagName()` function:
<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;Load Text Into Multiple Tags Using JavaScript&lt;/title&gt;
&lt;script type="text/javascript"&gt;
function loadText() {
var topDiv=document.getElementsByTagName("p")[0].innerHTML = "Hello World";
var bottomDiv=document.getElementsByTagName("p")[1].innerHTML = "Goodbye World";
}
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input type='button' onclick='loadText()' value='Load Some Copy!'/&gt;
&lt;br /&gt;
&lt;p&gt;&lt;/p&gt;
&lt;p&gt;&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
&lt;/div&gt;</code></pre>
The function now creates two variables: one that looks for the first `<p>` tag on the page and one that looks for the second one. And since computers start counting at 0, each `<p>` tag is named `[0]` and `[1]`, respectively. Just as before, the function executes when the button is clicked; when that happens, text gets loaded into each `<p>` tag.

It would be easier if you could find page elements with class names instead of tag names And you can traverse the DOM with `getElementsByClassName()`, but it doesn't always work when using JavaScript.

It would be great if all of this could be made easier...jQuery does just that.

<h2>Traversing the DOM The New School Way With jQuery</h2>

jQuery is an extensive JavaScript library that, when attached to a web page, makes it easier for developers to write JavaScript. Its rise in popularity is mostly due to the neat effects it can produce: demos of effects like the accordion widget can be viewed at the jQuery UI demo page.

As cool as these effects are, the fact that jQuery makes DOM traversal easier is, I believe, its best feature. Let's load the phrase "Hello World!" into a `<div>` tag with an ID like we did in our previous example, but with jQuery instead of JavaScript:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;Load Text Into An ID Using jQuery&lt;/title&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
$(document).ready(function(){
$("input").click(function () {
$('#words').html("Hello World");
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input type="button" value="Load Some Copy!"/&gt;
&lt;br /&gt;
&lt;div id="words"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
We attached the jQuery library stored at Google Libraries to our web page:

<pre><code class="language-markup">
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&lt;&lt;/script&lt;
</code></pre>
Then we use the jQuery code in bold to create a function that traverses the DOM to find the <div> tag and loads text into it when it's clicked. We just did this in JavaScript and now did it with jQuery, and used a little less code in the process.

Also with jQuery, we can now traverse the DOM with ease to locate classes, even if we have to locate more than one:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;Load Text Into Multiple Classes Using jQuery&lt;/title&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
$(document).ready(function(){
$("input").click(function () {
$('.words').html("Hello World");
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input type='button' value='Load Some Copy!'/&gt;
&lt;br /&gt;
&lt;div class="words"&gt;&lt;/div&gt;
&lt;div class="words"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
And yes, jQuery lets us traverse the DOM to locate tags, multiple ones if we need to:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;Load Text Into A Tag With jQuery&lt;/title&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
$(document).ready(function(){
$("input").click(function () {
$('p').html("Hello World");
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input type='button' value='Load Some Copy!'/&gt;
&lt;br /&gt;
&lt;p&gt;&lt;/p&gt;
&lt;p&gt;&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

This was easy so let's do something more advanced and add AJAX to our discussion.

<h2>Start Using AJAX With jQuery</h2>

AJAX is an acronym for Asynchronous JavaScript And XML. It is not a programming language but a programming concept. More specifically, AJAX is a set of unofficial rules for getting the following web technologies to work together on a website:

 * JavaScript
 * XML
 * HTML
 * The DOM

AJAX can do a lot but its main purpose in life is to load and unload page content without actually reloading the page. A good example of this is the AJAX Example at W3 Schools. Click the "Change Content" button while looking at any banners on the page. Notice that the example content refreshed while the banners (i.e. the page) did not. Now refresh your browser page while looking at the banners: notice that they, along with the content, refreshed this time.

JavaScript is what really brings AJAX together but the `XMLHttpRequest` object that's embedded in "almost" all web browsers plays an important role here as well.

As I said, "almost" all browsers contain XMLHttpRequest. Not surprisingly, Internet Explorer 6 doesn't. It can still perform AJAX: it just needs the ActiveXObject to do it instead of `XMLHttpRequest`. So you always need to detect the browser before you use AJAX.

The following code detects the browser, determines which version of AJAX to use based on the detection, then creates a JavaScript function that uses AJAX to load a text file that's stored on the server called `ajaxCopy.txt` **(NOTE: you can only test this code if you upload it to your website)**:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US">
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;AJAX Detection And Data Loading With JavaScript&lt;/title&gt;
&lt;script type="text/javascript"&gt;
&lt;!--create a variable to store the XMLHttpRequest object, but don't use it it yet--&gt;
var xhrObject = false;

&lt;!--If this browser isn't IE 6, store XMLHttpRequest() in our variable--&gt;
if (window.XMLHttpRequest) {
xhrObject = new XMLHttpRequest();

&lt;!--But if this browser is IE 6, store ActiveXObject in our variable--&gt;
} else if (window.ActiveXObject) {
xhrObject = new ActiveXObject("Microsoft.XMLHTTP");
}

&lt;!--Create a function with 2 parameters: one for copy, one for a &lt;div&gt; to load it into--&gt;
function loadCopy(externalTextFile, externalTextDiv) {

&lt;!--if we can use AJAX--&gt;
if(xhrObject) {

&lt;!--create a new variable that traverses the DOM and finds the &lt;div&gt; tag we put into our second parameter--&gt;
var pageText = document.getElementById(externalTextDiv);

&lt;!--use AJAX to place a text file we put in our first parameter--&gt;
xhrObject.open("GET",externalTextFile);

&lt;!--if our AJAX variable found our data and the server is ready to send it out, bundle our data as a text string--&gt;
xhrObject.onreadystatechange = function () {
if(xhrObject.readyState == 4 && xhrObject.status == 200) {
pageText.innerHTML = xhrObject.responseText; } }

&lt;!--send our data out--&gt;
xhrObject.send(null);
}
}
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;form&gt;
&lt;!--Run the 'loadCopy' function when this button is clicked. Find the 'ajaxCopy.txt' on the server and load it into a &lt;div&gt; with an id of 'words'.--&gt;
&lt;input type='button' value='Load Some Copy!' onclick="loadCopy('ajaxCopy.txt','words')"/&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;div id="words"&gt;&lt;/div&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
It's smart to know how this code works and if you're a beginner, you should write it out for practice. After you understand it, you can use jQuery's AJAX-related .load() function which does everything for you (NOTE: you can only test this code if you upload it to your website):

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;AJAX Detection And Data Loading With jQuery&lt;/title&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
$(document).ready(function(){
$("input").click(function () {
$('#words').load("ajaxCopy.txt");
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input type='button' value='Load Some Copy!'/&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;div id="words"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
jQuery's motto is "write less, do more." The above example really live up to that motto.

<h2>Start Using HTML5 With AJAX and jQuery</h2>

HTML5 is the most recent version of HTML. Thanks to their built-in functionality, HTML5 tags like `<video>` and `<canvas>` allow web designers to easily add complex functionality to web pages. HTML5 tags also describe content in more detail, thanks to tags like `<header>` and `<nav>`. For a more detailed description of HTML5, please read my HTML5 Project page.

Since HTML5 is tag-based and tags can have IDs and classes attached to them, traversing the HTML5 DOM is easy...as is AJAX.

Here's the previous code example that uses jQuery, AJAX, and the new HTML5 `<button>` tag instead of input **(NOTE: you can only test this code if you upload it to your website and you view it in an HTML5-ready browser...Google Chrome is the best one as of this post)**:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;AJAX Detection And Data Loading Using New School jQuery # HTML5: Example # 1&lt;/title&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
$(document).ready(function(){
$("button").click(function () {
$('#words').load("ajaxCopy.txt");
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;button type="button"&gt;Load Some Copy!&lt;/button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;div id="words"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
&lt;/button&gt;&lt;/nav&gt;
</code></pre>
Building on this, here's an example that uses jQuery, AJAX, the new HTML5 button tag and the new HTML5 `<section>` tag **(NOTE: you can only test this code if you upload it to your website and you view it in an HTML5-ready browser...Google Chrome is the best one as of this post)**:
<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;AJAX Detection And Data Loading Using New School jQuery & HTML5: Example # 2&lt;/title&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
$(document).ready(function(){
$("button").click(function () {
$('section').load("ajaxCopy.txt");
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;button type="button"Load Some Copy!&lt;/button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;article&gt;
&lt;section&gt;
&lt;/section&gt;
&lt;/article&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
Let's build on this one last time: here's an example that uses jQuery, AJAX, the new HTML5 `<button>` tag, and the new HTML5 `<section>` tag. But the `<section>` tag now has an ID: **(NOTE: you can only test this code if you upload it to your website and you view it in an HTML5-ready browser…Google Chrome is the best one as of this post)**:

<pre><code class="language-markup">
&lt;!DOCTYPE html&gt;
&lt;html dir="ltr" lang="en-US"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8" /&gt;
&lt;title&gt;AJAX Detection And Data Loading Using New School jQuery & HTML5: Example # 3&lt;/title&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
$(document).ready(function(){
$("button").click(function () {
$('#words').load("ajaxCopy.txt");
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;button type="button"&gt;Load Some Copy!&lt;/button&gt;
&lt;br /&gt;&lt;br /&gt;
&lt;article&gt;
&lt;section id="words"&gt;
&lt;/section&gt;
&lt;/article&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

That's it for the coding examples. I've really only scratched the surface on what it takes to use AJAX, jQuery and HTML5 together on a web page. And in terms of the more-complicated HTML APIs like `<canvas>`, there are lots of jQuery HTML5 plug-ins that makes the APIs easier to implement.

But the point of this post was to clarify how easy it is to use AJAX, jQuery and HTML5 in tandem with each other. I think you have enough to get started here.

Remember...it's all about traversing the DOM!!!!!

<h2>Three Final Points</h2>

Before you start using AJAX, jQuery and HTML5 together, please keep the following three points in mind:

1) You Need to Learn how to traverse the DOM

I may sound like a broken record right now, but I cannot stress enough how important this is to the AJAX/jQuery/HTML5 process. Understanding DOM traversal is a key skill that you need to possess and eventually master. The best way to start mastering it is to learn how to do it using JavaScript before you learn how to do it with jQuery.

2) You Should Still Learn Some JavaScript Before You Commit Yourself To jQuery

Some think that jQuery is a strict alternative to JavaScript. While jQuery does make most of the basic JavaScript tasks easier, it doesn't replace every JS function completely and there will be times where you'll want to use JavaScript instead. Learning some basic JavaScript will help you more than it will hurt you.

3) jQuery Will (most likely) Lead The Way

Again, using all of these "hip" technologies in sync requires the use of some older coding practices. But if anything is going to change how they're used together, it will be jQuery. Lots of developers are behind the scenes making jQuery better and better every day, so expect to see them extend its AJAX and HTML5 functionality beyond what it is currently.

Let's look at some other resources that will help you out.

<h2>Further Learning Resources</h2>

Here's a list of links that I've read and have helped me tremendously. There are some that cost money, some of which I have an affiliate program with, but I've used them and fully endorse anyway.

Some of these links may overlap a bit: a jQuery resource that I listed may belong in the AJAX list instead. I'm not sure what is and isn't right in this case so I just used my best judgment.

Because using AJAX, jQuery and HTML5 together is a hot topic, my goal is to update this list every time I come across a new resource.

### DOM
* [JavaScript InnerHTML Tutorial at Tizag.com](http://www.tizag.com/javascriptT/javascript-innerHTML.php)
* [BOOK: Beginning JavaScript With DOM Scripting And Ajax](https://www.amazon.com/exec/obidos/ASIN/1590596803/onlinetoolsorg/103-1380453-3336648)

### AJAX
* [Jesse James Garret article that first used the term 'AJAX.'](https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf)
* [Wikipedia article on XMLHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest)

### jQuery
* [jQuery Home Page](http://jquery.com/)
* [jQuery Documentation Page](http://api.jquery.com/)
* [jQuery Ajax Category Page](http://api.jquery.com/category/ajax/)
* [jQuery UI](http://jqueryui.com/)

### HTML5
* [Dive Into HTML5](https://mislav.github.io/diveintohtml5/)
* [Dive Into HTML5 Peeks, Pokes and Pointers Page](https://mislav.github.io/diveintohtml5/peeks-pokes-and-pointers.html)
* [HTML5 Doctor](http://html5doctor.com)
* [BOOK: Pro HTML5 Programming](http://www.amazon.com/Pro-HTML5-Programming-Peter-Lubbers/dp/143023864X/ref=sr_1_1?ie=UTF8&qid=1375059764&sr=8-1&keywords=pro+html5+programming)

<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "HTML5 Project: WIREFRAME SERIES #1 – HOME PAGE",
    "description": "Wireframes for the portfolio site of Kai Gittens, who has worked at Blue Cross/Blue Shield, JPMorgan Chase, jetBlue, MedPage Today & Revlon",
    "author": {
        "@type": "Person",
        "name": "Kai Gittens",
		"url" : "http://kaidez.com/"
    },
    "datePublished": "2011-12-01",
    "dateModified": "2025-08-2",
    "programmingLanguage": ["HTML", "JavaScript", "jQuery"]
}
</script>