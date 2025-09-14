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

    function toggleSearchBox() {
        const searchToggle = document.querySelector('.searchToggleButton');
        const searchBox = document.querySelector('.search-container');

        if (!searchToggle || !searchBox) {
            console.warn('Search box not found');
            return;
        }

        searchToggle.addEventListener('click', () => {
            const isSearchboxVisible = searchToggle.getAttribute('aria-expanded') === 'true';
            searchToggle.setAttribute('aria-expanded', !isSearchboxVisible);
            searchBox.classList.toggle('isVisible');

            // Focus the input after making container visible
            if (!isSearchboxVisible) {
              setTimeout(() => {
                const searchInput = document.querySelector('.pagefind-ui__search-input');
                if (searchInput) {
                  searchInput.focus();
                }
              }, 100);
            }
        });
    }

    // Initialize all functionality
    function init() {
        copyrightYear();
        toggleMobileMenu();
        initializePagefind();
        toggleSearchBox();
    }
    
    // Ensure DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();      