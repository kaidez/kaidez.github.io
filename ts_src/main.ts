(() => {
  'use strict';
  function copyrightYear(): void {
    const footerElement = document.querySelector<HTMLElement>('.footer-bottom');
    if (!footerElement) {
      console.warn('Footer element not found');
      return;
    }
    const currentYear: number = new Date().getFullYear();
    const shortYear: number = currentYear % 100;
    const paragraphTag = document.createElement('p');
    paragraphTag.innerHTML = `&copy;2008-${shortYear} Kai "kaidez" Gittens. All rights reserved.`;
    footerElement.appendChild(paragraphTag);
  }
  function toggleMobileMenu(): void {
    const menuToggle = document.querySelector<HTMLElement>('.mobile-menu-icon');
    const mobileMenu = document.querySelector<HTMLElement>('.site-nav ul');
    if (!menuToggle || !mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('isVisible');
    });
  }
  // Initialize all functionality
  function init(): void {
    copyrightYear();
    toggleMobileMenu();
  }
  // Ensure DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  }
  else {
    init();
  }
})();
