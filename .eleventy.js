// Updated .eleventy.js with Pagefind integration

const moment = require("moment");
const { execSync } = require('child_process');

module.exports = function(eleventyConfig) {
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Add simple date filters

  // Not being used, but kept for reference
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

  eleventyConfig.addFilter("dateReformat", () => {
    return moment().format("MMMM Do, YYYY");
  });
  
  // Add collection for blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
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

  // Pagefind build hook
  eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
    // Only run Pagefind in build mode, not serve mode
    if (runMode === 'build') {
      try {
        console.log('[11ty] Running Pagefind indexing...');
        execSync(`npx pagefind --site ${dir.output}`, { stdio: 'inherit' });
        console.log('[11ty] Pagefind indexing complete!');
      } catch (error) {
        console.error('[11ty] Pagefind indexing failed:', error.message);
      }
    }
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