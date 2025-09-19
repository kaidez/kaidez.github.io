const { execSync } = require('child_process');
const moment = require("moment");
const htmlmin = require("html-minifier");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const relatedPostsPlugin = require("./src/config/plugins/relatedPosts");
const readingTime = require('eleventy-plugin-reading-time');

module.exports = function (eleventyConfig) {

  // Copy Font Awesome assets from node_modules
  eleventyConfig.addPassthroughCopy({ "node_modules/@fortawesome/fontawesome-free/css": "assets/fontawesome/css" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@fortawesome/fontawesome-free/webfonts": "assets/fontawesome/webfonts" });

  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPassthroughCopy({ 'src/assets/samples': '/samples' });

  eleventyConfig.addPassthroughCopy({ 'src/ajax-tutorial': '/ajax-tutorial' });

  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

  eleventyConfig.addPassthroughCopy({ 'src/llms.txt': '/llms.txt' });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (process.env.NODE_ENV === "production" && outputPath?.endsWith(".html")) {
      try {
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: false, // Disable JS minification in HTML to avoid conflicts
          ignoreCustomFragments: [/<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/]
        });
      } catch (error) {
        console.warn('HTML minification failed for', outputPath, error.message);
        return content;
      }
    }
    return content;
  });

  // Add simple date filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    return date.toISOString().split('T')[0];
  });

  // Current not being used
  eleventyConfig.addFilter("dateReformat", () => {
    return moment().format("MMMM Do, YYYY");
  });

  // Syntax highlighting plugin for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Related posts plugin
  eleventyConfig.addPlugin(relatedPostsPlugin);

  // Reading time plugin
  eleventyConfig.addPlugin(readingTime);


  // Add collection for blog posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  // Add collections for specific categories - SIMPLE VERSION
  eleventyConfig.addCollection("personal", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return item.data.tags && item.data.tags.includes("personal");
    });
  });

  eleventyConfig.addCollection("tutorials", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return item.data.tags && item.data.tags.includes("tutorials");
    });
  });

  eleventyConfig.addCollection("reviews", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return item.data.tags && item.data.tags.includes("reviews");
    });
  });

  eleventyConfig.addCollection("codingBestPractices", function (collectionApi) {
    return collectionApi.getAll().filter(function (item) {
      return item.data.tags && item.data.tags.includes("coding-best-practices");
    });
  });

  eleventyConfig.addCollection("categories", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md");
    const categories = new Set();

    posts.forEach(post => {
      if (post.data.tags) {
        post.data.tags.forEach(tag => {
          if (tag !== "posts") {
            categories.add(tag);
          }
        });
      }
    });

    return Array.from(categories).sort();
  });

  // Add excerpt filter
  eleventyConfig.addFilter("excerpt", (post) => {
    if (!post) return "";
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, 200) + "...";
  });

  // Add head filter for getting first N items
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, n);
  });

  // Add collection for all secondary tags
  eleventyConfig.addCollection("allSecondaryTags", function (collectionApi) {
    const allSecondaryTags = new Set();

    collectionApi.getAll().forEach(post => {
      if (post.data.secondary_tags && Array.isArray(post.data.secondary_tags)) {
        post.data.secondary_tags.forEach(tag => {
          allSecondaryTags.add(tag);
        });
      }
    });

    return Array.from(allSecondaryTags).sort();
  });

  // Add filter to filter posts by secondary tag
  eleventyConfig.addFilter("filterBySecondaryTag", function (posts, targetTag) {
    if (!Array.isArray(posts)) return [];

    return posts.filter(post => {
      return post.data.secondary_tags &&
        Array.isArray(post.data.secondary_tags) &&
        post.data.secondary_tags.includes(targetTag);
    });
  });

  // XML Sitemap configuration
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://kaidez.com",
    },
  });


  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
