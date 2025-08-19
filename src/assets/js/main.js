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
    
    // Ensure DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', copyrightYear);
    } else {
        copyrightYear();
    }
})();