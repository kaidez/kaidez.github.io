module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksGlobal("relatedPosts", function(currentCategory, currentUrl, allPosts, count = 3) {
    // Simple validation
    if (!currentCategory || !currentUrl || !allPosts) {
      return '';
    }

    const categoryLower = currentCategory.toLowerCase();

    // Filter posts by same category, excluding current post
    const postsByCategory = allPosts.filter(post =>
      post.data.category &&
      post.data.category.toLowerCase() === categoryLower &&
      post.url !== currentUrl
    );

    // Filter out legacy posts if we have enough non-legacy posts
    const nonLegacyPosts = postsByCategory.filter(post =>
      !post.data.secondary_tags || !post.data.secondary_tags.includes('legacy')
    );

    // Use non-legacy posts if we have enough, otherwise fall back to all posts in category
    const postsToUse = nonLegacyPosts.length >= count ? nonLegacyPosts : postsByCategory;

    // If we don't have enough posts, return empty
    if (postsToUse.length === 0) {
      return '';
    }

    // Shuffle and select random posts
    const shuffled = [...postsToUse].sort(() => Math.random() - 0.5);
    const selectedPosts = shuffled.slice(0, Math.min(count, shuffled.length));

    // Generate HTML
    const listItems = selectedPosts
      .map(post => `<li><a href="${post.url}">${post.data.title}</a></li>`)
      .join('');

    return listItems;
  });
};