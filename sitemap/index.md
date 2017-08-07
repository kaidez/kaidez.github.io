---
title: 'Sitemap'
layout: page
permalink: /sitemap/
---
<h2>Posts related to: 'Tutorials'</h2>
{% for post in site.categories.tutorials %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  {{ post.excerpt }}
{% endfor %}

----

<h2>Posts related to: 'Coding Tips'</h2>
{% for post in site.categories.coding-best-practices %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  {{ post.excerpt }}
{% endfor %}

----

<h2>Posts related to: 'Personal'</h2>
{% for post in site.categories.personal %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  {{ post.excerpt }}
{% endfor %}

----

<h2>Posts related to: 'Reviews'</h2>
{% for post in site.categories.reviews %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.title }}</a>
  </h2>
  {{ post.excerpt }}
{% endfor %}

----

{% for page in site.pages %}
{% unless page.title == 'Blog' %}
  <a href="{{ page.url }}">{{ page.title }}</a>
{% endunless %}
{% endfor %}
<a href="/blog">Blog</a>