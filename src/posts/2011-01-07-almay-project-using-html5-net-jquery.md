---
title: New Almay Project I Worked On
date: 2011-01-07
layout: layouts/post.njk
excerpt: Kaidez developed four micro-sites for Almay using HTML5 video, jQuery, .NET and CSS
permalink: /almay-project-using-html5-net-jquery/
image: default-image.jpg
tags: [personal]
secondary_tags: ["my work"]
category: Personal
---
Back when I worked at [Revlon Cosmetics][2], their [Almay][1] brand, which is wholly-owned by former employer, Revlon, launched four new products this week:

 [1]: http://almay.com/
 [2]: http://revlon.com/

*   almay wake-up™ makeup
*   almay intense i-color smoky-i™ kit
*   almay smart shade smart balance™ powder
*   almay one coat get up and grow™ mascara

Each product required a small, unique web presence we called a "micro-site": the other web designer mocked them up in PhotoShop, I then converted the design to page code with CSS, .NET, jQuery and HTML5. Visual Studio 2008 was my development environment.

Breaking down my code…

### CSS

All the micro-sites shared the same skeletal layout so I created a global CSS template for this in about two hours.

### .NET

For each individual micro-site, almost all of their pages shared the same header and product shot: I dumped this into a user control.

### jQuery

The client wanted a fade-in/fade-out animation on each micro-site home page so I used (surprise!) the `fadeIn()` and `fadeOut()` functions embedded in jQuery. I also used jQuery to create a much more effective rollover for all the micro-site navigations.

### HTML5

Some micro-site pages displayed video and the client requested that it display on mobile phones. This gave me an opportunity to use the  tag in my work. This was…interesting.

Working with .NET was very rewarding. I’ve been working in Visual Studio for a little over five years now and am comfortable doing so, but it was the first time that I created user controls from the ground up. I had figure out how to place them on the page and how to tweak their various CodeBehinds, so I got a really good feel for how .NET works as a whole.

Working with HTML5 video was just as rewarding and I’m glad I did it, but it was definitely a learning experience. The client requested that videos display on as many mobile devices as possible, so I had to figure out a lot of things on the fly. It was frustrating at times but I’m glad I went through the process.

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "New Almay Project I Worked On",
    "description": "Kai Gittens developed four micro-sites for Almay using HTML5 video, jQuery, .NET and CSS",
    "author": {
      "@type": "Person",
      "name": "Kai Gittens"
    },
    "datePublished": "2011-01-05",
    "dateModified": "2025-08-26",
    "programmingLanguage": "JavaScript",
    "dependencies": "HTML5
  }
</script>
