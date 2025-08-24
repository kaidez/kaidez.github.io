---
layout: layouts/base.njk
title: View all kaidez.com posts
pagination:
  data: collections.posts
  size: 10
  alias: posts
---
{{relatedPosts}}
<section class="container">
  <h1 class="category-header-title">All posts on kaidez.com</h1>
  <div class="posts-homepage-post-list">
  
  </div>


  {%- for post in posts %} {# Or pagination.items if no alias is used #}
    <article class="post-card">
      <h3>
        <a href="{{ post.url }}">{{ post.data.title }}</a>
      </h3>

      <div class="post-meta">
        <time datetime="{{ post.date | htmlDateString }}">
          {{ post.date | readableDate }}
        </time>
      </div>

      {% if post.data.excerpt %}
      <p class="post-excerpt">{{ post.data.excerpt }}</p>
      {% else %}
      <p class="post-excerpt">{{ post.templateContent | excerpt }}</p>
      {% endif %}
    </article>
  {%- endfor %}

</section>
