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
    
    // Ensure DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', copyrightYear);
    } else {
        copyrightYear();
    }
})();
