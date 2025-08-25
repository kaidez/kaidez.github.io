---
title: 'Web Components Demo: Templates and (some) Shadow DOM'
date: 2014-08-13
excerpt: A Web Components demo using just templates and Shadow DOM, mostly templates. Post includes many links to Web Component learning resources.
layout: layouts/post.njk
permalink: /web-components-demo/
image: web-components-demo.jpg
tags: [coding-best-practices]
secondary_tags: ["web components", "javascript"]
category: Coding Tips
redirect_from:
  - web-components-demo/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+kaidez-blog+%28kaidez%29
---
<em>(Author's note - August 2025: This post is REALLY, REALLY old!!! It was written at a time when web components we're still in development. Now, a set of WC standards are in place ([read more about that over on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)), Polymer, the once go-to web component library, [suggests using Lit instead](https://lit.dev/ "visit the Lit Web Components Library"), and as far as building powerful, customizable elements for the web goes, [React](https://react.dev/) somewhat solved that problem. The original post had a lot of broken links that have either been removed or updated so yeah: this post is old. But you may want to go through this post to get some historical perspective. -k)</em>

<p>
  <ul>
    <li><a href="/samples/template-shadowdom-practice/" target="blank">VIEW THE DEMO</a></li>
    <li><a href="https://github.com/kaidez/template-shadowdom-practice">GRAB THE CODE ON GITHUB</a></li>
  </ul>
</p>

I spent some time hacking Web Components during a long flight layover and it was time well spent. I put together a small demo, just so I could better understand Web Components as a whole.

Web Components is a concept composed of four sub-concepts, but I just focused on two of them for the demo: <em>templates</em> and <em>Shadow DOM</em>...primarily templates. At the time of this post, implementing Web Components neatly across the different browsers and devices requires a polyfill library like [Polymer](http://www.polymer-project.org/ "visit the Polymer Web Components Library") or [X-Tag](https://x-tag.github.io/ "visit the X-tag Web Components Library"), but I wanted to study the internal workings of each sub-concept before diving into the polyfills.

Since this post's publish date the Polymer guys now recommend [Lit](https://lit.dev/ "visit the Lit Web Components Library").  X-Tag is still going strong.

## A quick Web Components description
Web Components are a set of emerging technologies working their way towards a firm specification, thanks to the hard work of the W3C. The goal of Web Components is to allow developers to create custom elements with HTML, CSS and JavaScript...these elements can also be thought of as widgets.
2014-08-13-web-components-demo
An great example of this is the `<github-card>` custom element. If you have a GitHub account, [check out the &lt;github-card> demo page](http://pazguille.github.io/github-card/ "go to <github-card> demo page"), add your GH username in the field to review the end result, then [go to the &lt;github-card> documentation](https://github.com/pazguille/github-card "go to &lt;github-card> GitHub documentation") to download the code and see how to apply it to your page using a simple tag.

The four sub-concepts that make up Web Components are:

1. *__Templates__*: a chunk of formatted HTML that can be cloned, inserted and rendered based on instructions you give it. [Read more &raquo;](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template "Read more about Web Component templates")
2. *__Shadow DOM__*: an encapsulated separate DOM that you can add code to. It's best to think of it as "a DOM within your DOM." [Read more &raquo;](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM "Read more about Web Component Shadow DOM")
3. *__Custom Elements__*: the ability to create custom page tags, such as `<github-card>`. [Read more &raquo;](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
4. *__HTML Imports (now abandoned from the spec)__: the ability to load in small pieces of HTML code into your page when needed via `<link>` tags. [Read more&raquo;](https://www.webcomponents.org/community/articles/introduction-to-html-imports "Read more about Web Component HTML Imports")

While things like <code>&lt;github-card&gt;</code> utilize all the sub-concepts, each one can function on its own quite nicely. But when they all work together, they form Web Components...conceptually, it's best to think of WC in the same way as AJAX, where a group of technologies work together to perform a single task.

*(Side note: there's another sub-concept called "decorators" but lots of developers don't like it, so there's not a lot of focus in terms of finalizing its specification. It may disappear.)*

## Started out by focusing on templates...mostly
I've read about all of these sub-concepts (including decorators) but  played with the actual code just a little, and the best way to learn is by doing instead of reading. So I'm in the middle of hacking out code for each sub-concept, starting with templates.

For the templates, I wanted to display a simple list of books based on a small JavaScript data object. Things started out like this...

__index.html__

<pre class="language-markup"><code class="language-markup">
<!DOCTYPE html>
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;title&gt;JavaScript Books&lt;/title&gt;
  &lt;link rel="stylesheet" href="css/normalize.min.css"&gt;
  &lt;link rel="stylesheet" href="css/bootstrap.min.css"&gt;
  &lt;link rel="stylesheet" href="css/styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="container"&gt;
    &lt;header&gt;
      &lt;h1 class="page-header"&gt;JavaScript Books&lt;/h1&gt;
      &lt;h2&gt;Built with templates & Shadow DOM&lt;/h2&gt;
    &lt;/header&gt;
    &lt;template id="singleBook"&gt;
      &lt;style&gt;
        .templateArticle {
          display: inline-block;
          margin: 6px;
        }
        .btn {
          margin: 10px;
          float: right;
        }
        .thumbnail {
          margin-bottom: 0;
        }
        .bookTitleClass {
          text-align: left;
        }
        #bookTitle {
          font-style: italic;
        }
      &lt;/style&gt;
      &lt;article class="templateArticle panel panel-default"&gt;
        &lt;header class="panel-heading"&gt;
          &lt;h2 class="panel-title bookTitleClass"&gt;
            &lt;span id="bookTitle"&gt;&lt;/span&gt;
            &lt;br /&gt;
            by &lt;span id="bookAuthor"&gt;&lt;/span&gt;
          &lt;/h2&gt;
        &lt;/header&gt;
        &lt;img src="" alt="" class="thumbnail"&gt;
        &lt;a href="" id="btnPurchase" class="btn btn-primary" role="button" target="blank"&gt;Buy at Amazon&lt;/a&gt;
      &lt;/article&gt;
    &lt;/template&gt;
    &lt;section id="allBooks" class="allBooksClass"&gt;&lt;/section&gt;
    &lt;script src="scripts/main.js"&gt;&lt;/script&gt;
  &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

__css/styles.css__
<pre class="language-css">
<code class="language-css">
body {
  margin: 20px;
}
h1, h2 {
  text-align: center;
}
footer {
  text-align: center;
  margin-top: 20px;
}
.allBooksClass {
  margin-top: 30px;
  text-align: center;
}
</code></pre>

__scripts/main.js__
<pre class="language-javascript"><code class="language-javascript">
(function(){

  var jsBooks = {
    "book1" : {
      "title": "Object-Oriented Javascript",
      "author": "Stoyan Stefanov",
      "image": "images/ooj.jpg",
      "amazonLink": "http://amzn.to/1sRFbEC"
    },
    "book2" : {
      "title": "Effective Javascript",
      "author": "David Herman",
      "image": "images/effectivejs.jpg",
      "amazonLink": "http://amzn.to/1pLu1A5"
    },
    "book3" : {
      "title": "JavaScript: The Good Parts",
      "author": "Douglas Crockford",
      "image": "images/goodparts.jpg",
      "amazonLink": "http://amzn.to/1ukjoIN"
    },
    "book4" : {
      "title": "Eloquent Javascript",
      "author": "Marijn Haverbeke",
      "image": "images/eloquentjavascript.jpg",
      "amazonLink": "http://amzn.to/1lPP6pn"
    }
  };

  var template = document.querySelector("#singleBook"),
    templateContent = template.content,
    host = document.querySelector("#allBooks"),
    root = host.attachShadow({ mode: "open" });

  for (key in jsBooks) {
    var title = jsBooks[key].title,
      author = jsBooks[key].author,
      image = jsBooks[key].image,
      amazonLink = jsBooks[key].amazonLink;

    templateContent.querySelector("img").src = image;
    templateContent.querySelector("img").alt
    = templateContent.querySelector("#bookTitle").innerHTML
    = title;
    templateContent.querySelector("#bookAuthor").innerHTML = author;
    templateContent.querySelector("#btnPurchase").href = amazonLink;
    root.appendChild(document.importNode(templateContent, true));
  }
})();
</code></pre>

`index.html` contains both `normalize.css` and the main Twitter Bootstrap CSS file. Bootstrap is providing responsive functionality, but is mostly here to make parts of the site look pretty. `styles.css` adds extra styling to some page elements and has a very small role in the project.

Past that, there's some basic HTML but there's also the Web Component-centric template tag that has an ID of `singleBook`. The code inside of <code>&lt;template /&gt;</code> contains HTML and some CSS in a <code>&lt;style&gt;</code> tag.

The template contains an `<article>` tag: this is where the book data in the JS object will be parsed as content. The template tag is also inert, meaning it's not visible on page load and can't communicate with any outside code until we say so.

Note that some parts of `<article>` are empty:

  * the two `<span>` tags.
  * the `src` and `alt` attributes for the only `<img>` tag.
  * the `href` attribute for the only `<a>` tag.

This empty parts will be populated with our object data...let's look at that...

<pre class="language-javascript"><code class="language-javascript">
(function(){
...
})();
</code></pre>

Everything's wrapped in an [IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Read more about IIFEs").

<pre class="language-javascript"><code class="language-javascript">
var jsBooks = {
  "book1" : {
    "title": "Object-Oriented Javascript",
    "author": "Stoyan Stefanov",
    "image": "images/ooj.jpg",
    "amazonLink": "http://amzn.to/1sRFbEC"
  },
...
};
</code></pre>

The JavaScript data object. There's only one item one listed here but it contains four items altogether, each about a particular JavaScript book.  Each item has a `title`, `author`, `image` and `amazonLink` property.

<pre><code class="language-javascript">
var template = document.querySelector("#singleBook"),
  templateContent = template.content,
  host = document.querySelector("#allBooks"),
  root = host.attachShadow({ mode: "open" });
</code></pre>

Starting to create the Shadow DOM. I'm creating a single var pattern to define four variables...

  * `template` is a direct reference to the template, which has an ID of `singleBook`.
  * `templateContent` is a direct reference to value of the template's `content` attribute at the time of page-load...the page tags, their attributes. Everything. [Read more over on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template "Read about the &lt;template> tag on MDN").
  * `host` is a direct reference to what's known as the "shadow host" and it's the page element where template content gets load into.  That's the `<section id="allBooks">` page element in this case. This is commonly referred to as the "shadow host" and it can have any variable name you want, but it's convention to name it "host."
  * `root` is a direct reference to what's known as the "shadow root" and it's referring to the content that that gets generated <em>INSIDE</em> the template. Thanks to the `host.attachShadow({ mode: "open" })` line, I'm placing this content inside of `host`, which, again, is the `<section id="allBooks">` element...it may be easier to think of it as the actual Shadow DOM. When the content has fully loaded into the root, it gets returned to the web page as a document fragment...[read more about document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment "Read about document fragments") It also can also have any variable name you want to give it, but it's convention to name it "root."

<pre><code class="language-javascript">
for (key in jsBooks) {
...
};
</code></pre>

A for...in loop will populate the template with the content in the "jsBooks" object. That code needs to be broken down...

<pre><code class="language-javascript">
var title = jsBooks[key].title,
  author = jsBooks[key].author,
  image = jsBooks[key].image,
  amazonLink = jsBooks[key].amazonLink;
</code></pre>

Assign simple variable references to all the single item properties in the `jsBooks` object.

<pre><code class="language-javascript">
templateContent.querySelector("img").src = image;
</code></pre>

Look for the `<img>` tag in the template and populate its `src` attribute with whatever the value is of the "image" property at the time of the loop.

<pre><code class="language-javascript">
templateContent.querySelector("img").alt
  = templateContent.querySelector("#bookTitle").innerHTML
  = title;
</code></pre>

Look for the `<img>` tag in the template and populate its `alt` attribute with whatever the value is of the "title" property at the time of the loop.

At the same time, look for the `#bookTitle` element in the template (one of the `<span>` tags) and populate it with whatever the value is of the "title" property is at the time of the loop.

<pre><code class="language-javascript">
templateContent.querySelector("#bookAuthor").innerHTML = author;
</code></pre>

Look for the `#bookAuthor` element in the template (the other `<span>` tag) and populate it with whatever the value is of the "author" property at the time of the loop.

<pre><code class="language-javascript">
templateContent.querySelector("#btnPurchase").href = amazonLink;
</code></pre>

Look for the `#btnPurchase` element in the template (the only `a` tag) and populate its "href" attribute with whatever the value is of the current `amazonLink` property at the time of the loop.

<pre><code class="language-javascript">
root.appendChild(document.importNode(templateContent, true));
</code></pre>

Okay, we need to spend some time talking about this line of code...

At this point in the code, all my object data has populated the template and is represented by the `templateContent` variable. But this is what was returned as a document fragment.

The document fragment isn't part of the page DOM and, in this case, needs to be treated as an external document. The `document.importNode()` method can duplicate content from external documents, and by passing the `true` parameter, we're doing a deep copy of the content and copying <em>everything</em> inside of it.

From there, we're treating the `root` as a parent element and appending (i.e., "adding") a child inside of it. The child we're adding is the template content we just brought over with `document.importNode()`.

*(Side note: `document.importNode()` is cool...[read more about it over on MDN](https://developer.mozilla.org/en-US/docs/Web/API/document.importNode ""Read about document.importNode() on MDN")).*

And if we review index.html in Chrome 36 or higher with the "Show user agent shadow DOM" box checked, it should look (almost) like the demo. And if we then do an "Inspect Element" check and look in the `<section>` tag (which is the shadow host), you'll see the template content (which is the shadow root).

<img src="/assets/img/shadow-root.png" class="imgBorderMaxWidth" alt="The shadow host in the shadow root">

But there's a problem: Bootstrap styles that are applied to certain elements inside of `<template>` are being ignored.  Anything class names containing the word `panel` or `btn` should have well-recognized Bootstrap styles, especially the buttons...

<img src="/assets/img/pageScreenshot.jpg" class="imgBorderMaxWidth" alt="homepage screenshot with no Bootstrap styling">

This is happening because, as mentioned above, the code inside the template can't communicate with any outside code and, technically speaking, `<template>` is in the Shadow DOM, which is naturally-encapsulated. So none of the page's three stylesheets (`normalize.min.css`, `bootstrap.min.css` and `styles.css`) can affect the template's layout. And for now, adding stylesheets to the Shadow DOM with `<link>` isn't allowed.

## Import the styles
`styles.css` doesn't need to interact with the layout but the other two have to.  The solution is to use `@import` inside the template's `<style>` tag to bring both of them in:

<pre><code class="language-css">
&lt;style&gt;
  @import url("css/normalize.min.css");
  @import url("css/bootstrap.min.css");
...
&lt;/style&gt;
</code></pre>

Using `@import` is frowned upon from a performance standpoint, but it's how this particular problem gets solved. And as Google's Rob Dodson points out in his [excellent Web Components article](http://css-tricks.com/modular-future-web-components/ "Read Rob Dodson's great Web Component article on CSS Tricks"), using Polymer avoids doing this by bringing in the stylesheets with XHR requests.

But there's another problem: by doing deep clones of template content at each loop iteration, the style tag is getting added four times when it really only needs to be added once.

<img src="/assets/img/shadow-root-02.png" class="imgBorderMaxWidth" alt="The shadow host in the shadow root">

## Adjust the loop
This can be fixed by changing the loop procedure: every time the loop runs, deep-copy <em>just</em> the article tag by referring to its "templateArticle" class, then append it to the section tag. Leave the loop after it's ended, then append the style tag to section, which is the shadow host.

This requires changing the end of the JavaScript from this...

<pre><code class="language-javascript">
(function(){
...
    root.appendChild(document.importNode(templateContent, true));
  }
})();
</code></pre>

...to this

<pre><code class="language-javascript">
(function(){
...
    root.appendChild(document.importNode(templateContent.querySelector(".templateArticle"), true));
  }
  root.appendChild(document.importNode(templateContent.querySelector("style"), true));
})();
</code></pre>

And now there's only one style tag inside the shadow root and it's properly applying the styles.

<img src="/assets/img/shadow-root-03.png" class="imgBorderMaxWidth" alt="The shadow host in the shadow root">

Because `<style>` gets added to `<section>` with `appendChild()`, it gets placed at the bottom.  Were this live production code, I would (probably) use something like `jQuery.prepend()` to place it at the top.

But placing it at the bottom doesn't affect my goals for this project, which was to learn how templates and Shadow DOM work. Still, read more about `jQuery.prepend()` [here](http://api.jquery.com/prepend/ "Read about jQuery.prepend()").

## Further reading
This post was update on August 2025: the previous version had a lot of broken or out-of date links.  To be honest:  [the previously-mentioned MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) is probably the best starting point.


The W3C has an older article called [Introduction to Web Components](https://www.w3.org/TR/components-intro/ "Read Introduction to Web Components"). It's a good read for historical purposes.

The Web Incubator Community Group (WICG) has posted [a set of web component standards on GitHub](https://github.com/WICG/webcomponents). Give those a read.

Also be sure to check out both [X-Tag](http://x-tag.github.io/docs "Read about browser compatibility for X-Tags") and [Lit](https://lit.dev/ "visit the Lit Web Components Library") if you're looking for library support.

## Conclusion
Using something like Lit or X-Tag is what's needed to use Web Components in production-level code right anymore, but these libraries work ON TOP of Web Components. So it's best to learn the underlying code first.

I can't say that my code is perfect, but I achieved the goal I set for myself and was able to solve any problems I faced by actually writing the code instead of just reading about it. I have a much better handle in templates and Shadow DOM then I did before, and that's enough.
