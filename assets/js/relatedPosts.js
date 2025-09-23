
async function getPostData(url) {
  const response = await fetch(url);
  return response.json();
}

// Wrap the async code in an IIFE to handle the await properly
(async () => {
  try {
    const data = await getPostData('/api/posts.json');
    const pageCategory = await window.pageData.category;
    const postsByCategory = data.filter(post => post.category.toLowerCase() === pageCategory.toLowerCase());
    const filterByLegacyTag = postsByCategory.filter(post => !post.secondary_tags.includes('legacy'));

    // Use the appropriate array based on availability
    const postsToUse = filterByLegacyTag.length >= 3 ? filterByLegacyTag : postsByCategory;
    const randomIndexes = getRandomIndexes(postsToUse);

    const relatedPostsContainer = document.querySelector('.related-posts ul');

    // Build HTML string first, then insert once
    const htmlString = randomIndexes
      .map(index => `<li><a href="${postsToUse[index].url}">${postsToUse[index].title}</a></li>`)
      .join('');

    relatedPostsContainer.insertAdjacentHTML("beforeend", htmlString);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();


function getRandomIndexes(arr, count = 3) {

  if (count > arr.length || count < 0) {
    throw new Error("Count must be between 0 and the array's length.");
  }

  // Create an array of indexes
  const indexes = Array.from({ length: arr.length }, (_, i) => i);

  // Fisher-Yates (Knuth) Shuffle
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]]; // Swap elements
  }

  // Return the first 'count' indexes
  return indexes.slice(0, count);
}