const { execSync } = require('child_process');
const moment = require("moment");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const contentRecommendation = require("./config/plugins/contentRecommendation");

module.exports = function(eleventyConfig) {

  // Copy Font Awesome assets from node_modules
  eleventyConfig.addPassthroughCopy({"node_modules/@fortawesome/fontawesome-free/css": "assets/fontawesome/css"});
  eleventyConfig.addPassthroughCopy({"node_modules/@fortawesome/fontawesome-free/webfonts": "assets/fontawesome/webfonts"});

  // Copy over PrismJS assets
  eleventyConfig.addPassthroughCopy({"src/assets/css/prism.css": "src/assets/css/prism.css"});
  eleventyConfig.addPassthroughCopy({"src/assets/js/prism.js": "src/assets/js/prism.js"});
  
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

  eleventyConfig.addPassthroughCopy("src/assets/img"); 
  
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

  // Content recommendation plugin
  eleventyConfig.addPlugin(contentRecommendation);

  // Syntax highlighting plugin for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  
  
// Add collection for blog posts
eleventyConfig.addCollection("posts", function(collectionApi) {
  return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
});

// Add collections for specific categories - SIMPLE VERSION
eleventyConfig.addCollection("personal", function(collectionApi) {
  return collectionApi.getAll().filter(function(item) {
    return item.data.tags && item.data.tags.includes("personal");
  });
});

eleventyConfig.addCollection("tutorials", function(collectionApi) {
  return collectionApi.getAll().filter(function(item) {
    return item.data.tags && item.data.tags.includes("tutorials");
  });
});

eleventyConfig.addCollection("reviews", function(collectionApi) {
  return collectionApi.getAll().filter(function(item) {
    return item.data.tags && item.data.tags.includes("reviews");
  });
});

eleventyConfig.addCollection("codingBestPractices", function(collectionApi) {
  return collectionApi.getAll().filter(function(item) {
    return item.data.tags && item.data.tags.includes("coding-best-practices");
  });
});
  
  eleventyConfig.addCollection("categories", function(collectionApi) {
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
  eleventyConfig.addCollection("allSecondaryTags", function(collectionApi) {
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
  eleventyConfig.addFilter("filterBySecondaryTag", function(posts, targetTag) {
    if (!Array.isArray(posts)) return [];
    
    return posts.filter(post => {
      return post.data.secondary_tags && 
             Array.isArray(post.data.secondary_tags) && 
             post.data.secondary_tags.includes(targetTag);
    });
  });

  // Pagefind build hook
  eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
    // Only run Pagefind in build mode, not serve mode
    if (runMode === 'build') {
      try {
        console.log('[11ty] Running Pagefind indexing...');
        console.log('[11ty] Output directory:', dir.output);
        execSync(`npx pagefind --site ${dir.output} --verbose`, { stdio: 'inherit' });
        console.log('[11ty] Pagefind indexing complete!');
        
        // Check if files were created
        const fs = require('fs');
        const pagefindDir = `${dir.output}/pagefind`;
        if (fs.existsSync(pagefindDir)) {
          const files = fs.readdirSync(pagefindDir);
          console.log('[11ty] Pagefind files created:', files);
        } else {
          console.log('[11ty] Warning: Pagefind directory not found');
        }
      } catch (error) {
        console.error('[11ty] Pagefind indexing failed:', error.message);
      }
    }
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
