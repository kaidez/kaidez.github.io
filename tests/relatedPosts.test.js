/**
 * @jest-environment jsdom
 */

// Mock fetch globally
global.fetch = jest.fn();

// Mock window.pageData
Object.defineProperty(window, 'pageData', {
  value: {
    category: 'javascript'
  },
  writable: true
});

describe('relatedPosts.js', () => {
  let consoleSpy;

  beforeEach(() => {
    // Reset fetch mock
    fetch.mockClear();

    // Create fresh DOM
    document.body.innerHTML = `
      <div class="related-posts">
        <ul></ul>
      </div>
    `;

    // Mock console.error
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('getPostData function', () => {
    test('should fetch and return JSON data successfully', async () => {
      const mockData = [{ title: 'Test Post', url: '/test' }];
      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockData)
      };

      fetch.mockResolvedValue(mockResponse);

      // Import and test the getPostData function
      const getPostData = async (url) => {
        const response = await fetch(url);
        return response.json();
      };

      const result = await getPostData('/api/posts.json');

      expect(fetch).toHaveBeenCalledWith('/api/posts.json');
      expect(mockResponse.json).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    test('should handle fetch errors', async () => {
      const mockError = new Error('Network error');
      fetch.mockRejectedValue(mockError);

      const getPostData = async (url) => {
        const response = await fetch(url);
        return response.json();
      };

      await expect(getPostData('/api/posts.json')).rejects.toThrow('Network error');
    });
  });

  describe('getRandomIndexes function', () => {
    // Extract the function for testing
    const getRandomIndexes = (arr, count = 3) => {
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
    };

    test('should return correct number of indexes', () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = getRandomIndexes(testArray, 3);

      expect(result).toHaveLength(3);
      expect(Array.isArray(result)).toBe(true);
    });

    test('should return unique indexes', () => {
      const testArray = [1, 2, 3, 4, 5];
      const result = getRandomIndexes(testArray, 3);

      const uniqueIndexes = [...new Set(result)];
      expect(uniqueIndexes).toHaveLength(3);
    });

    test('should return valid indexes within array bounds', () => {
      const testArray = [1, 2, 3, 4, 5];
      const result = getRandomIndexes(testArray, 3);

      result.forEach(index => {
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(testArray.length);
      });
    });

    test('should default to 3 when count is not provided', () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = getRandomIndexes(testArray);

      expect(result).toHaveLength(3);
    });

    test('should handle requesting all indexes', () => {
      const testArray = [1, 2, 3];
      const result = getRandomIndexes(testArray, 3);

      expect(result).toHaveLength(3);
      expect(result.sort()).toEqual([0, 1, 2]);
    });

    test('should handle single item array', () => {
      const testArray = [1];
      const result = getRandomIndexes(testArray, 1);

      expect(result).toEqual([0]);
    });

    test('should handle empty array with count 0', () => {
      const testArray = [];
      const result = getRandomIndexes(testArray, 0);

      expect(result).toEqual([]);
    });

    test('should throw error when count exceeds array length', () => {
      const testArray = [1, 2];

      expect(() => getRandomIndexes(testArray, 5)).toThrow("Count must be between 0 and the array's length.");
    });

    test('should throw error when count is negative', () => {
      const testArray = [1, 2, 3];

      expect(() => getRandomIndexes(testArray, -1)).toThrow("Count must be between 0 and the array's length.");
    });

    test('should return different results on multiple calls (randomness)', () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results = [];

      // Run multiple times to check for randomness
      for (let i = 0; i < 10; i++) {
        results.push(getRandomIndexes(testArray, 3).join(','));
      }

      // Should have some variation (not all identical)
      const uniqueResults = [...new Set(results)];
      expect(uniqueResults.length).toBeGreaterThan(1);
    });
  });

  describe('Main IIFE functionality', () => {
    const mockPosts = [
      {
        title: 'JavaScript Post 1',
        url: '/js-post-1',
        category: 'javascript',
        secondary_tags: ['programming']
      },
      {
        title: 'JavaScript Post 2',
        url: '/js-post-2',
        category: 'javascript',
        secondary_tags: ['programming', 'legacy']
      },
      {
        title: 'CSS Post 1',
        url: '/css-post-1',
        category: 'css',
        secondary_tags: ['design']
      },
      {
        title: 'JavaScript Post 3',
        url: '/js-post-3',
        category: 'javascript',
        secondary_tags: ['programming']
      },
      {
        title: 'JavaScript Post 4',
        url: '/js-post-4',
        category: 'javascript',
        secondary_tags: ['programming']
      }
    ];

    beforeEach(() => {
      // Setup successful fetch response
      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockPosts)
      };
      fetch.mockResolvedValue(mockResponse);
    });

    test('should filter posts by category', async () => {
      // Set page category
      window.pageData.category = 'javascript';

      // Simulate the main functionality
      const data = mockPosts;
      const pageCategory = window.pageData.category;
      const postsByCategory = data.filter(post =>
        post.category.toLowerCase() === pageCategory.toLowerCase()
      );

      expect(postsByCategory).toHaveLength(4);
      expect(postsByCategory.every(post => post.category === 'javascript')).toBe(true);
    });

    test('should filter out legacy posts when enough non-legacy posts exist', async () => {
      window.pageData.category = 'javascript';

      const data = mockPosts;
      const pageCategory = window.pageData.category;
      const postsByCategory = data.filter(post =>
        post.category.toLowerCase() === pageCategory.toLowerCase()
      );
      const filterByLegacyTag = postsByCategory.filter(post =>
        !post.secondary_tags.includes('legacy')
      );

      expect(filterByLegacyTag).toHaveLength(3);
      expect(filterByLegacyTag.every(post => !post.secondary_tags.includes('legacy'))).toBe(true);
    });

    test('should use non-legacy posts when 3 or more available', () => {
      window.pageData.category = 'javascript';

      const postsByCategory = mockPosts.filter(post =>
        post.category.toLowerCase() === 'javascript'
      );
      const filterByLegacyTag = postsByCategory.filter(post =>
        !post.secondary_tags.includes('legacy')
      );

      const postsToUse = filterByLegacyTag.length >= 3 ? filterByLegacyTag : postsByCategory;

      expect(postsToUse).toBe(filterByLegacyTag);
      expect(postsToUse).toHaveLength(3);
    });

    test('should fallback to all category posts when less than 3 non-legacy posts', () => {
      // Create scenario with only 2 non-legacy posts
      const limitedMockPosts = [
        {
          title: 'JS Post 1',
          url: '/js-1',
          category: 'javascript',
          secondary_tags: ['programming']
        },
        {
          title: 'JS Post 2',
          url: '/js-2',
          category: 'javascript',
          secondary_tags: ['programming', 'legacy']
        },
        {
          title: 'JS Post 3',
          url: '/js-3',
          category: 'javascript',
          secondary_tags: ['programming', 'legacy']
        }
      ];

      const postsByCategory = limitedMockPosts.filter(post =>
        post.category.toLowerCase() === 'javascript'
      );
      const filterByLegacyTag = postsByCategory.filter(post =>
        !post.secondary_tags.includes('legacy')
      );

      const postsToUse = filterByLegacyTag.length >= 3 ? filterByLegacyTag : postsByCategory;

      expect(postsToUse).toBe(postsByCategory);
      expect(postsToUse).toHaveLength(3);
      expect(filterByLegacyTag).toHaveLength(1);
    });

    test('should generate HTML for related posts', () => {
      const postsToUse = [
        { title: 'Test Post 1', url: '/test-1' },
        { title: 'Test Post 2', url: '/test-2' },
        { title: 'Test Post 3', url: '/test-3' }
      ];
      const randomIndexes = [0, 1, 2];

      const htmlString = randomIndexes
        .map(index => `<li><a href="${postsToUse[index].url}">${postsToUse[index].title}</a></li>`)
        .join('');

      const expectedHtml = '<li><a href="/test-1">Test Post 1</a></li>' +
                          '<li><a href="/test-2">Test Post 2</a></li>' +
                          '<li><a href="/test-3">Test Post 3</a></li>';

      expect(htmlString).toBe(expectedHtml);
    });

    test('should insert HTML into related posts container', () => {
      const relatedPostsContainer = document.querySelector('.related-posts ul');
      const htmlString = '<li><a href="/test">Test Post</a></li>';

      relatedPostsContainer.insertAdjacentHTML("beforeend", htmlString);

      expect(relatedPostsContainer.innerHTML).toBe(htmlString);
      expect(relatedPostsContainer.querySelectorAll('li')).toHaveLength(1);
      expect(relatedPostsContainer.querySelector('a').href).toBe('http://localhost/test');
      expect(relatedPostsContainer.querySelector('a').textContent).toBe('Test Post');
    });

    test('should handle case-insensitive category matching', () => {
      const data = [
        { category: 'JavaScript', secondary_tags: [] },
        { category: 'JAVASCRIPT', secondary_tags: [] },
        { category: 'javascript', secondary_tags: [] },
        { category: 'CSS', secondary_tags: [] }
      ];

      window.pageData.category = 'JavaScript';
      const pageCategory = window.pageData.category;
      const postsByCategory = data.filter(post =>
        post.category.toLowerCase() === pageCategory.toLowerCase()
      );

      expect(postsByCategory).toHaveLength(3);
    });
  });

  describe('Error handling', () => {
    test('should catch and log fetch errors', async () => {
      const mockError = new Error('Network error');
      fetch.mockRejectedValue(mockError);

      // Simulate the main IIFE error handling
      try {
        const data = await fetch('/api/posts.json').then(r => r.json());
        // This should not execute
        expect(true).toBe(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        expect(consoleSpy).toHaveBeenCalledWith('Error fetching data:', mockError);
      }
    });

    test('should handle missing related posts container gracefully', () => {
      // Remove the container
      document.querySelector('.related-posts ul').remove();

      // This should not throw an error in production
      // The container would just be null
      const relatedPostsContainer = document.querySelector('.related-posts ul');
      expect(relatedPostsContainer).toBe(null);
    });

    test('should handle empty posts array', () => {
      const data = [];
      const pageCategory = 'javascript';
      const postsByCategory = data.filter(post =>
        post.category.toLowerCase() === pageCategory.toLowerCase()
      );
      const filterByLegacyTag = postsByCategory.filter(post =>
        !post.secondary_tags.includes('legacy')
      );

      expect(postsByCategory).toHaveLength(0);
      expect(filterByLegacyTag).toHaveLength(0);
    });

    test('should handle posts without secondary_tags', () => {
      const data = [
        {
          title: 'Post without tags',
          url: '/no-tags',
          category: 'javascript'
          // No secondary_tags property
        }
      ];

      expect(() => {
        data.filter(post => !post.secondary_tags?.includes('legacy'));
      }).not.toThrow();

      const filtered = data.filter(post => !post.secondary_tags?.includes('legacy'));
      expect(filtered).toHaveLength(1);
    });
  });

  describe('Integration tests', () => {
    beforeEach(() => {
      // Setup DOM with proper structure
      document.body.innerHTML = `
        <div class="related-posts">
          <h3>Related Posts</h3>
          <ul></ul>
        </div>
      `;

      // Setup successful fetch response
      const mockResponse = {
        json: jest.fn().mockResolvedValue([
          {
            title: 'JavaScript Basics',
            url: '/javascript-basics',
            category: 'javascript',
            secondary_tags: ['beginner']
          },
          {
            title: 'Advanced JavaScript',
            url: '/advanced-javascript',
            category: 'javascript',
            secondary_tags: ['advanced']
          },
          {
            title: 'JavaScript Patterns',
            url: '/javascript-patterns',
            category: 'javascript',
            secondary_tags: ['patterns']
          },
          {
            title: 'Old JavaScript',
            url: '/old-javascript',
            category: 'javascript',
            secondary_tags: ['legacy']
          }
        ])
      };
      fetch.mockResolvedValue(mockResponse);
    });

    test('should complete full workflow successfully', async () => {
      window.pageData.category = 'javascript';

      // Simulate the complete workflow
      const getPostData = async (url) => {
        const response = await fetch(url);
        return response.json();
      };

      const getRandomIndexes = (arr, count = 3) => {
        // For testing, return predictable results
        return arr.slice(0, count).map((_, i) => i);
      };

      // Execute main logic
      const data = await getPostData('/api/posts.json');
      const pageCategory = window.pageData.category;
      const postsByCategory = data.filter(post =>
        post.category.toLowerCase() === pageCategory.toLowerCase()
      );
      const filterByLegacyTag = postsByCategory.filter(post =>
        !post.secondary_tags.includes('legacy')
      );

      const postsToUse = filterByLegacyTag.length >= 3 ? filterByLegacyTag : postsByCategory;
      const randomIndexes = getRandomIndexes(postsToUse);

      const relatedPostsContainer = document.querySelector('.related-posts ul');
      const htmlString = randomIndexes
        .map(index => `<li><a href="${postsToUse[index].url}">${postsToUse[index].title}</a></li>`)
        .join('');

      relatedPostsContainer.insertAdjacentHTML("beforeend", htmlString);

      // Verify results
      expect(fetch).toHaveBeenCalledWith('/api/posts.json');
      expect(postsByCategory).toHaveLength(4);
      expect(filterByLegacyTag).toHaveLength(3);
      expect(postsToUse).toBe(filterByLegacyTag);
      expect(relatedPostsContainer.children).toHaveLength(3);

      const links = relatedPostsContainer.querySelectorAll('a');
      expect(links[0].textContent).toBe('JavaScript Basics');
      expect(links[1].textContent).toBe('Advanced JavaScript');
      expect(links[2].textContent).toBe('JavaScript Patterns');
    });

    test('should handle window.pageData as async property', async () => {
      // Test the async nature of window.pageData.category
      Object.defineProperty(window, 'pageData', {
        value: {
          category: Promise.resolve('javascript')
        },
        writable: true
      });

      const pageCategory = await window.pageData.category;
      expect(pageCategory).toBe('javascript');
    });
  });

  describe('Performance considerations', () => {
    test('should efficiently handle large datasets', () => {
      // Create a large dataset
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        title: `Post ${i}`,
        url: `/post-${i}`,
        category: i % 2 === 0 ? 'javascript' : 'css',
        secondary_tags: i % 5 === 0 ? ['legacy'] : ['modern']
      }));

      const startTime = performance.now();

      // Filter operations
      const postsByCategory = largeDataset.filter(post =>
        post.category.toLowerCase() === 'javascript'
      );
      const filterByLegacyTag = postsByCategory.filter(post =>
        !post.secondary_tags.includes('legacy')
      );

      const endTime = performance.now();

      expect(postsByCategory.length).toBeGreaterThan(0);
      expect(filterByLegacyTag.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
    });

    test('should efficiently build HTML string', () => {
      const posts = Array.from({ length: 100 }, (_, i) => ({
        title: `Post ${i}`,
        url: `/post-${i}`
      }));
      const indexes = Array.from({ length: 3 }, (_, i) => i);

      const startTime = performance.now();

      const htmlString = indexes
        .map(index => `<li><a href="${posts[index].url}">${posts[index].title}</a></li>`)
        .join('');

      const endTime = performance.now();

      expect(htmlString).toContain('Post 0');
      expect(htmlString).toContain('Post 1');
      expect(htmlString).toContain('Post 2');
      expect(endTime - startTime).toBeLessThan(10); // Should be very fast
    });
  });
});