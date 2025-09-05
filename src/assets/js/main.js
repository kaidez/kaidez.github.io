(function() {
    'use strict';
    
    function copyrightYear() {
        const footerElement = document.querySelector('.footer-bottom');
        
        if (!footerElement) {
            console.warn('Footer element not found');
            return;
        }
        
        const currentYear = new Date().getFullYear();
        const shortYear = currentYear % 100;
        const paragraphTag = document.createElement('p');
        
        paragraphTag.innerHTML = `&copy;2008-${shortYear} Kai "kaidez" Gittens. All rights reserved.`;
        footerElement.appendChild(paragraphTag);
    }
    
    function initializePagefind() {
        try {
            // Simple initialization
            new PagefindUI({ 
                element: "#search",
                showImages: false,
                excerptLength: 20,
                resetStyles: false,
                translations: {
                    placeholder: "Search kaidez for stuff...",
                    zero_results: "Couldn't find [SEARCH_TERM]"
                }
            });
            console.log('Pagefind initialized successfully');
        } catch (error) {
            console.error('Pagefind initialization failed:', error);
        }
    }

    function toggleMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-icon');
        const mobileMenu = document.querySelector('.site-nav ul');
        
        if (!menuToggle || !mobileMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('isVisible');
        });
    }

    // Initialize all functionality
    function init() {
        copyrightYear();
        toggleMobileMenu();
    }
    
    // Ensure DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();



fetch('/api/posts.json')
      .then(response => response.json())
      .then(posts => {
        // Now 'posts' is a JavaScript array of your Eleventy post data
        console.log(posts);
        // You can now manipulate and display your post data
      })
      .catch(error => console.error('Error fetching posts:', error));