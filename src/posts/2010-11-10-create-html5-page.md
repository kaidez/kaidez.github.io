---
title: 'TUTORIAL: Create The Building Blocks For An HTML5 Page'
layout: layouts/post.njk
permalink: /create-html5-page/
excerpt: Understanding the HTML5 DTD and Character Set Needed For Your First HTML5 Page.
tags: [tutorials]
secondary_tags: ["html5"]
category: tutorials
# og-image: default-image.jpg
---
This is a very simple tutorial. It won’t teach you how to use ,  or any other HTML5-specific tags. All it does is describe what building blocks are needed BEFORE you insert those tags. And it all comes down to two lines of code.

Cut-and-paste the code below into your favorite web editor:

<pre><code class="language-markup">
<!DOCTYPE html>
&lt;html&gt;
  &lt;head&gt;
   &lt;title&gt;Your First HTML5 Page&lt;/title&gt;
   &lt;meta charset=”UTF-8″ /&gt;
  &lt;/head&gt;
  &lt;body&gt;
     Your content goes here.
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>


 

That’s it! See those two bolded lines of copy above? They are the only building blocks needed for creating an HTML5 page: a document type declaration that’s simpler then the previous ones (which is the first bolded line above) and a character set definition that’s simpler then the previous ones (which is the second bolded line above).

Of course, to REALLY make this an HTML5 page, you need to throw in some specific tags like  and . You will also want to add in some CSS3.

But the key thing to remember is this: your pages can be HTML5-ready without all the HTML5-specific tags and CSS3. It absolutely cannot be HTML5-ready if it doesn’t have that new document type declaration and that new character set definition. You do the document type declaration and character set definition first, *then* you add those tags and CSS3. That’s how you create an HTML5 page.

A suggestion: start typing in those two lines of code by hand for every new web page that you create from now on. Don’t cut-and-paste them from another web page or a program like Dreamweaver: just type them in by hand.

This is my first tutorial. Was I clear or was I not clear enough? Please let me know so I can shape up.