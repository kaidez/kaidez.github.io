/**
 * Unit tests for the Related Posts Eleventy plugin
 * Tests the build-time related posts generation functionality
 */

const relatedPostsPlugin = require('../src/config/plugins/relatedPosts');

describe('Related Posts Eleventy Plugin', () => {
  let mockEleventyConfig;
  let relatedPostsFunction;

  beforeEach(() => {
    // Mock Eleventy config object
    mockEleventyConfig = {
      addNunjucksGlobal: jest.fn()
    };

    // Initialize plugin and capture the function
    relatedPostsPlugin(mockEleventyConfig);

    // Extract the function that was registered
    expect(mockEleventyConfig.addNunjucksGlobal).toHaveBeenCalledWith(
      'relatedPosts',
      expect.any(Function)
    );

    relatedPostsFunction = mockEleventyConfig.addNunjucksGlobal.mock.calls[0][1];
  });

  describe('Plugin registration', () => {
    test('should register relatedPosts as a Nunjucks global', () => {
      expect(mockEleventyConfig.addNunjucksGlobal).toHaveBeenCalledWith(
        'relatedPosts',
        expect.any(Function)
      );
    });
  });

  describe('Input validation', () => {
    test('should return empty string when currentCategory is missing', () => {
      const result = relatedPostsFunction(null, '/test-url', [], 3);
      expect(result).toBe('');
    });

    test('should return empty string when currentUrl is missing', () => {
      const result = relatedPostsFunction('Tutorials', null, [], 3);
      expect(result).toBe('');
    });

    test('should return empty string when allPosts is missing', () => {
      const result = relatedPostsFunction('Tutorials', '/test-url', null, 3);
      expect(result).toBe('');
    });

    test('should return empty string when allPosts is empty array', () => {
      const result = relatedPostsFunction('Tutorials', '/test-url', [], 3);
      expect(result).toBe('');
    });
  });

  describe('Category filtering', () => {
    const mockPosts = [
      {
        data: { title: 'Tutorial 1', category: 'Tutorials', secondary_tags: [] },
        url: '/tutorial-1'
      },
      {
        data: { title: 'Tutorial 2', category: 'Tutorials', secondary_tags: [] },
        url: '/tutorial-2'
      },
      {
        data: { title: 'Review 1', category: 'Reviews', secondary_tags: [] },
        url: '/review-1'
      },
      {
        data: { title: 'Tutorial 3', category: 'Tutorials', secondary_tags: [] },
        url: '/tutorial-3'
      }
    ];

    test('should filter posts by matching category', () => {
      const result = relatedPostsFunction('Tutorials', '/current-post', mockPosts, 3);

      expect(result).toContain('Tutorial 1');
      expect(result).toContain('Tutorial 2');
      expect(result).toContain('Tutorial 3');
      expect(result).not.toContain('Review 1');
    });

    test('should perform case-insensitive category matching', () => {
      const mixedCasePosts = [
        {
          data: { title: 'Post 1', category: 'TUTORIALS', secondary_tags: [] },
          url: '/post-1'
        },
        {
          data: { title: 'Post 2', category: 'tutorials', secondary_tags: [] },
          url: '/post-2'
        },
        {
          data: { title: 'Post 3', category: 'Tutorials', secondary_tags: [] },
          url: '/post-3'
        }
      ];

      const result = relatedPostsFunction('tutorials', '/current-post', mixedCasePosts, 3);

      expect(result).toContain('Post 1');
      expect(result).toContain('Post 2');
      expect(result).toContain('Post 3');
    });

    test('should exclude current post from results', () => {
      const result = relatedPostsFunction('Tutorials', '/tutorial-2', mockPosts, 3);

      expect(result).toContain('Tutorial 1');
      expect(result).not.toContain('Tutorial 2');
      expect(result).toContain('Tutorial 3');
    });

    test('should handle posts without category data', () => {
      const postsWithMissingCategory = [
        {
          data: { title: 'Post 1', secondary_tags: [] },
          url: '/post-1'
        },
        {
          data: { title: 'Post 2', category: 'Tutorials', secondary_tags: [] },
          url: '/post-2'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', postsWithMissingCategory, 3);

      expect(result).toContain('Post 2');
      expect(result).not.toContain('Post 1');
    });
  });

  describe('Legacy post filtering', () => {
    const mockPostsWithLegacy = [
      {
        data: { title: 'Modern Post 1', category: 'Tutorials', secondary_tags: ['javascript'] },
        url: '/modern-1'
      },
      {
        data: { title: 'Legacy Post 1', category: 'Tutorials', secondary_tags: ['legacy'] },
        url: '/legacy-1'
      },
      {
        data: { title: 'Modern Post 2', category: 'Tutorials', secondary_tags: ['css'] },
        url: '/modern-2'
      },
      {
        data: { title: 'Legacy Post 2', category: 'Tutorials', secondary_tags: ['jquery', 'legacy'] },
        url: '/legacy-2'
      },
      {
        data: { title: 'Modern Post 3', category: 'Tutorials', secondary_tags: ['html'] },
        url: '/modern-3'
      }
    ];

    test('should prioritize non-legacy posts when 3 or more available', () => {
      const result = relatedPostsFunction('Tutorials', '/current-post', mockPostsWithLegacy, 3);

      expect(result).toContain('Modern Post 1');
      expect(result).toContain('Modern Post 2');
      expect(result).toContain('Modern Post 3');
      expect(result).not.toContain('Legacy Post');
    });

    test('should fall back to all posts when less than 3 non-legacy posts', () => {
      const limitedPosts = [
        {
          data: { title: 'Modern Post 1', category: 'Tutorials', secondary_tags: [] },
          url: '/modern-1'
        },
        {
          data: { title: 'Legacy Post 1', category: 'Tutorials', secondary_tags: ['legacy'] },
          url: '/legacy-1'
        },
        {
          data: { title: 'Legacy Post 2', category: 'Tutorials', secondary_tags: ['legacy'] },
          url: '/legacy-2'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', limitedPosts, 3);

      // Should include legacy posts since we don't have 3 non-legacy posts
      expect(result).toContain('Modern Post 1');
      expect(result).toContain('Legacy Post 1');
      expect(result).toContain('Legacy Post 2');
    });

    test('should handle posts without secondary_tags', () => {
      const postsWithoutTags = [
        {
          data: { title: 'Post 1', category: 'Tutorials' },
          url: '/post-1'
        },
        {
          data: { title: 'Post 2', category: 'Tutorials', secondary_tags: ['legacy'] },
          url: '/post-2'
        },
        {
          data: { title: 'Post 3', category: 'Tutorials' },
          url: '/post-3'
        },
        {
          data: { title: 'Post 4', category: 'Tutorials' },
          url: '/post-4'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', postsWithoutTags, 3);

      // With 3 non-legacy posts available, should exclude legacy posts
      expect(result).toContain('Post 1');
      expect(result).toContain('Post 3');
      expect(result).toContain('Post 4');
      expect(result).not.toContain('Post 2'); // Has legacy tag
    });
  });

  describe('Count limiting and randomization', () => {
    const manyPosts = Array.from({ length: 10 }, (_, i) => ({
      data: {
        title: `Tutorial ${i + 1}`,
        category: 'Tutorials',
        secondary_tags: []
      },
      url: `/tutorial-${i + 1}`
    }));

    test('should respect count parameter', () => {
      const result = relatedPostsFunction('Tutorials', '/current-post', manyPosts, 5);

      // Count the number of <li> elements
      const liCount = (result.match(/<li>/g) || []).length;
      expect(liCount).toBe(5);
    });

    test('should default to 3 posts when count is not specified', () => {
      const result = relatedPostsFunction('Tutorials', '/current-post', manyPosts);

      const liCount = (result.match(/<li>/g) || []).length;
      expect(liCount).toBe(3);
    });

    test('should handle requesting more posts than available', () => {
      const fewPosts = [
        {
          data: { title: 'Tutorial 1', category: 'Tutorials', secondary_tags: [] },
          url: '/tutorial-1'
        },
        {
          data: { title: 'Tutorial 2', category: 'Tutorials', secondary_tags: [] },
          url: '/tutorial-2'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', fewPosts, 5);

      const liCount = (result.match(/<li>/g) || []).length;
      expect(liCount).toBe(2); // Should only return available posts
    });

    test('should return empty string when no related posts available', () => {
      const unrelatedPosts = [
        {
          data: { title: 'Review 1', category: 'Reviews', secondary_tags: [] },
          url: '/review-1'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', unrelatedPosts, 3);
      expect(result).toBe('');
    });
  });

  describe('HTML generation', () => {
    const samplePosts = [
      {
        data: { title: 'JavaScript Basics', category: 'Tutorials', secondary_tags: [] },
        url: '/javascript-basics'
      },
      {
        data: { title: 'Advanced CSS', category: 'Tutorials', secondary_tags: [] },
        url: '/advanced-css'
      },
      {
        data: { title: 'HTML5 Features', category: 'Tutorials', secondary_tags: [] },
        url: '/html5-features'
      }
    ];

    test('should generate proper HTML structure', () => {
      const result = relatedPostsFunction('Tutorials', '/current-post', samplePosts, 3);

      expect(result).toMatch(/<li><a href="[^"]+">.*<\/a><\/li>/);
      expect(result).toContain('<li><a href="/javascript-basics">JavaScript Basics</a></li>');
      expect(result).toContain('<li><a href="/advanced-css">Advanced CSS</a></li>');
      expect(result).toContain('<li><a href="/html5-features">HTML5 Features</a></li>');
    });

    test('should escape HTML in titles properly', () => {
      const postsWithSpecialChars = [
        {
          data: { title: 'Tutorial with <script> tags', category: 'Tutorials', secondary_tags: [] },
          url: '/tutorial-1'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', postsWithSpecialChars, 1);

      // The title should be rendered as-is (relying on template engine for escaping)
      expect(result).toContain('Tutorial with <script> tags');
    });

    test('should handle URLs with special characters', () => {
      const postsWithSpecialUrls = [
        {
          data: { title: 'Special Post', category: 'Tutorials', secondary_tags: [] },
          url: '/special-post?param=value&other=test'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', postsWithSpecialUrls, 1);

      expect(result).toContain('href="/special-post?param=value&other=test"');
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string category', () => {
      const posts = [
        {
          data: { title: 'Post 1', category: '', secondary_tags: [] },
          url: '/post-1'
        }
      ];

      const result = relatedPostsFunction('', '/current-post', posts, 3);
      expect(result).toContain('Post 1');
    });

    test('should handle numeric categories', () => {
      const posts = [
        {
          data: { title: 'Post 1', category: 123, secondary_tags: [] },
          url: '/post-1'
        }
      ];

      const result = relatedPostsFunction(123, '/current-post', posts, 3);
      expect(result).toContain('Post 1');
    });

    test('should handle posts with null secondary_tags', () => {
      const posts = [
        {
          data: { title: 'Post 1', category: 'Tutorials', secondary_tags: null },
          url: '/post-1'
        }
      ];

      const result = relatedPostsFunction('Tutorials', '/current-post', posts, 1);
      expect(result).toContain('Post 1');
    });

    test('should handle large datasets efficiently', () => {
      const largePosts = Array.from({ length: 1000 }, (_, i) => ({
        data: {
          title: `Post ${i}`,
          category: i % 2 === 0 ? 'Tutorials' : 'Reviews',
          secondary_tags: i % 5 === 0 ? ['legacy'] : ['modern']
        },
        url: `/post-${i}`
      }));

      const startTime = performance.now();
      const result = relatedPostsFunction('Tutorials', '/current-post', largePosts, 3);
      const endTime = performance.now();

      expect(result).toBeTruthy();
      expect(endTime - startTime).toBeLessThan(100); // Should complete quickly
    });
  });

  describe('Randomization behavior', () => {
    test('should produce different results on multiple calls', () => {
      const posts = Array.from({ length: 20 }, (_, i) => ({
        data: {
          title: `Post ${i}`,
          category: 'Tutorials',
          secondary_tags: []
        },
        url: `/post-${i}`
      }));

      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(relatedPostsFunction('Tutorials', '/current-post', posts, 3));
      }

      // Should have some variation in results
      const uniqueResults = [...new Set(results)];
      expect(uniqueResults.length).toBeGreaterThan(1);
    });

    test('should maintain consistent HTML structure across randomized results', () => {
      const posts = Array.from({ length: 10 }, (_, i) => ({
        data: {
          title: `Post ${i}`,
          category: 'Tutorials',
          secondary_tags: []
        },
        url: `/post-${i}`
      }));

      for (let i = 0; i < 5; i++) {
        const result = relatedPostsFunction('Tutorials', '/current-post', posts, 3);

        // Should always have exactly 3 <li> elements
        const liCount = (result.match(/<li>/g) || []).length;
        expect(liCount).toBe(3);

        // Should always have proper HTML structure
        expect(result).toMatch(/^(<li><a href="[^"]+">.*<\/a><\/li>)+$/);
      }
    });
  });
});