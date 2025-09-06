
document.addEventListener('DOMContentLoaded', () => {
  if (window.pageData && window.pageData.category) {
      const categories = window.pageData.category;
      // console.log("This page's categories are:", categories);
      
      // Example: Check for a specific category
      if (categories.includes('category-name')) {
          console.log("This page is in 'category-name'");
          // Add custom functionality for this category
      }
  }
});



async function getPostData(url) {
  const response = await fetch(url);
  return response.json();
}

// Wrap the async code in an IIFE to handle the await properly
(async () => {
  try {
    const data = await getPostData('/api/posts.json');
    const pageCategory = await window.pageData.category;
    console.log(data);
    const postsByCategory = data.filter(post => post.category.toLowerCase() === pageCategory.toLowerCase());

    console.log(postsByCategory);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();