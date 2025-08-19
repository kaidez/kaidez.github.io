---
title: 'Site Map'
layout: layouts/base.njk
permalink: /sitemap/
redirect_from: /sitemap.xml
---

{# TODO: make sure this works by running in Claude #}

<h2>Posts related to: 'Tutorials'</h2>
{% for post in collections.tutorials %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.data.title }}</a>
  </h2>
  {{ post.content | excerpt | safe }}
{% endfor %}

----

<h2>Posts related to: 'Coding Tips'</h2>
{% for post in collections.codingBestPractices %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.data.title }}</a>
  </h2>
  {{ post.content | excerpt | safe }}
{% endfor %}

----

<h2>Posts related to: 'Personal'</h2>
{% for post in collections.personal %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.data.title }}</a>
  </h2>
  {{ post.content | excerpt | safe }}
{% endfor %}

----

<h2>Posts related to: 'Reviews'</h2>
{% for post in collections.reviews %}
  <h2 class="post-title">
    <a href="{{ post.url }}">{{ post.data.title }}</a>
  </h2>
  {{ post.content | excerpt | safe }}
{% endfor %}

----

<h2>All Posts</h2>
{% for post in collections.posts %}
  <a href="{{ post.url }}">{{ post.data.title }}</a><br>
{% endfor %}
