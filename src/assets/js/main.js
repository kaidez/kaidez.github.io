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