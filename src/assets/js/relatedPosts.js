document.addEventListener('DOMContentLoaded', async () => {

  // Ensure pageData exists
  if (!window.pageData || !window.pageData.category) {
    console.warn('Page data not available');
    return;
  }

  try {
    const data = await fetch('/api/posts.json').then(res => res.json());

    const blogPostCategory = window.pageData.category;
        
    const getPostsByCategory = data.filter(post => 
      post.category && post.category.toLowerCase() === blogPostCategory.toLowerCase()
    );
    
    console.log('All posts:', data);
    console.log('Posts in same category:', getPostsByCategory);
    
    // Do something with the filtered posts
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});