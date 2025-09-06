document.addEventListener('DOMContentLoaded', async () => {

  // Ensure pageData exists
  if (!window.pageData || !window.pageData.category) {
    console.warn('Page data not available');
    return;
  }

  try {
    const data = await fetch('/api/posts.json').then(res => res.json());

    const pageCategory = window.pageData.category;
        
    const postsByCategory = data.filter(post => 
      post.category && post.category.toLowerCase() === pageCategory.toLowerCase()
    );
    
    console.log('All posts:', data);
    console.log('Posts in same category:', postsByCategory);
    
    // Do something with the filtered posts
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});