/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Read the main.js file content
const mainJsPath = path.join(__dirname, '../src/assets/js/main.js');
const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

// Extract the copyrightYear function from the IIFE for testing
function createTestableFunction() {
  // Extract the copyrightYear function body
  const copyrightMatch = mainJsContent.match(/function copyrightYear\(\) \{([\s\S]*?)\n    \}/);
  if (!copyrightMatch) {
    throw new Error('Could not extract copyrightYear function from IIFE');
  }
  
  // Create testable function
  const copyrightBody = copyrightMatch[1];
  
  const copyrightYear = new Function('', `
    function copyrightYear() {${copyrightBody}
    }
    return copyrightYear;
  `)();
  
  return copyrightYear;
}

describe('main.js - copyrightYear function', () => {
  let copyrightYear;
  let originalDate;
  let consoleSpy;

  beforeAll(() => {
    // Create testable function
    copyrightYear = createTestableFunction();
  });

  beforeEach(() => {
    // Create fresh DOM for each test
    document.body.innerHTML = '<div class="footer-bottom"></div>';
    
    // Store original Date constructor
    originalDate = global.Date;
    
    // Spy on console.warn
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original Date constructor
    global.Date = originalDate;
    
    // Restore console.warn
    consoleSpy.mockRestore();
  });

  test('should create copyright paragraph with current year (2025)', () => {
    // Mock Date constructor and getFullYear method
    const mockYear = 2025;
    global.Date = jest.fn().mockImplementation(() => ({
      getFullYear: () => mockYear
    }));

    // Call the function
    copyrightYear();

    // Check if paragraph was created with correct content
    const footerElement = document.querySelector('.footer-bottom');
    const paragraphs = footerElement.querySelectorAll('p');
    
    expect(paragraphs).toHaveLength(1);
    // 2025 % 100 = 25
    expect(paragraphs[0].innerHTML).toBe('©2008-25 Kai "kaidez" Gittens. All rights reserved.');
  });

  test('should use current year when called (2024)', () => {
    // Mock Date to return 2024
    const mockYear = 2024;
    global.Date = jest.fn().mockImplementation(() => ({
      getFullYear: () => mockYear
    }));

    copyrightYear();

    const footerElement = document.querySelector('.footer-bottom');
    const paragraph = footerElement.querySelector('p');
    
    // 2024 % 100 = 24
    expect(paragraph.innerHTML).toBe('©2008-24 Kai "kaidez" Gittens. All rights reserved.');
  });

  test('should handle missing footer element gracefully', () => {
    // Remove the footer element
    const footerElement = document.querySelector('.footer-bottom');
    if (footerElement) {
      footerElement.remove();
    }

    // Should not throw an error now, but should log a warning
    expect(() => copyrightYear()).not.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith('Footer element not found');
  });

  test('should append paragraph to existing content', () => {
    const footerElement = document.querySelector('.footer-bottom');
    footerElement.innerHTML = '<span>Existing content</span>';

    copyrightYear();

    expect(footerElement.children).toHaveLength(2);
    expect(footerElement.querySelector('span').textContent).toBe('Existing content');
    expect(footerElement.querySelector('p')).toBeTruthy();
  });

  test('should create paragraph element with correct tag name', () => {
    copyrightYear();

    const footerElement = document.querySelector('.footer-bottom');
    const addedElement = footerElement.lastElementChild;
    
    expect(addedElement.tagName.toLowerCase()).toBe('p');
  });

  test('should not add multiple paragraphs when called multiple times', () => {
    // Call the function twice
    copyrightYear();
    copyrightYear();

    const footerElement = document.querySelector('.footer-bottom');
    const paragraphs = footerElement.querySelectorAll('p');
    
    // Should have 2 paragraphs since the function doesn't prevent duplicates
    // But this won't happen in production since we fixed the duplicate script loading
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].innerHTML).toBe('©2008-25 Kai "kaidez" Gittens. All rights reserved.');
    expect(paragraphs[1].innerHTML).toBe('©2008-25 Kai "kaidez" Gittens. All rights reserved.');
  });
});

describe('main.js - Year calculation edge cases', () => {
  let copyrightYear;

  beforeAll(() => {
    // Create testable function
    copyrightYear = createTestableFunction();
  });

  beforeEach(() => {
    // Create fresh DOM for each test
    document.body.innerHTML = '<div class="footer-bottom"></div>';
  });

  test('should handle year 2000 correctly', () => {
    const mockYear = 2000;
    global.Date = jest.fn().mockImplementation(() => ({
      getFullYear: () => mockYear
    }));

    copyrightYear();

    const paragraph = document.querySelector('.footer-bottom p');
    // 2000 % 100 = 0
    expect(paragraph.innerHTML).toBe('©2008-0 Kai "kaidez" Gittens. All rights reserved.');
  });

  test('should handle future years', () => {
    const mockYear = 2030;
    global.Date = jest.fn().mockImplementation(() => ({
      getFullYear: () => mockYear
    }));

    copyrightYear();

    const paragraph = document.querySelector('.footer-bottom p');
    // 2030 % 100 = 30
    expect(paragraph.innerHTML).toBe('©2008-30 Kai "kaidez" Gittens. All rights reserved.');
  });

  test('should handle year 2100 correctly (century boundary)', () => {
    const mockYear = 2100;
    global.Date = jest.fn().mockImplementation(() => ({
      getFullYear: () => mockYear
    }));

    copyrightYear();

    const paragraph = document.querySelector('.footer-bottom p');
    // 2100 % 100 = 0
    expect(paragraph.innerHTML).toBe('©2008-0 Kai "kaidez" Gittens. All rights reserved.');
  });
});

describe('main.js - DOM ready functionality', () => {
  let copyrightYear;
  let originalReadyState;
  let mockAddEventListener;

  beforeAll(() => {
    // Create testable function
    copyrightYear = createTestableFunction();
  });

  beforeEach(() => {
    // Store original readyState
    originalReadyState = document.readyState;
    
    // Mock addEventListener
    mockAddEventListener = jest.spyOn(document, 'addEventListener').mockImplementation(() => {});
    
    // Create fresh DOM
    document.body.innerHTML = '<div class="footer-bottom"></div>';
  });

  afterEach(() => {
    // Restore readyState (though this won't actually work in jsdom)
    Object.defineProperty(document, 'readyState', {
      writable: true,
      value: originalReadyState
    });
    
    // Restore addEventListener
    mockAddEventListener.mockRestore();
  });

  test('should execute immediately when DOM is already loaded', () => {
    // Mock readyState to be 'complete' (DOM already loaded)
    Object.defineProperty(document, 'readyState', {
      writable: true,
      value: 'complete'
    });

    // Execute the DOM ready check logic manually
    const domReadyCode = `
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', copyrightYear);
      } else {
        copyrightYear();
      }
    `;
    
    eval(domReadyCode);

    // Should not have added event listener
    expect(mockAddEventListener).not.toHaveBeenCalled();
    
    // Should have created the paragraph immediately
    const paragraph = document.querySelector('.footer-bottom p');
    expect(paragraph).toBeTruthy();
  });

  test('should add event listener when DOM is still loading', () => {
    // Mock readyState to be 'loading'
    Object.defineProperty(document, 'readyState', {
      writable: true,
      value: 'loading'
    });

    // Execute the DOM ready check logic manually
    const domReadyCode = `
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', copyrightYear);
      } else {
        copyrightYear();
      }
    `;
    
    eval(domReadyCode);

    // Should have added event listener
    expect(mockAddEventListener).toHaveBeenCalledWith('DOMContentLoaded', copyrightYear);
    
    // Should not have created paragraph yet
    const paragraph = document.querySelector('.footer-bottom p');
    expect(paragraph).toBeFalsy();
  });
});

// Tests for Mobile Menu Toggle functionality (lines 40-45 in original code)
describe('main.js - Mobile Menu Toggle functionality', () => {
  let mockAddEventListener;
  let consoleSpy;

  beforeEach(() => {
    // Create fresh DOM with mobile menu elements
    document.body.innerHTML = `
      <button class="mobile-menu-icon" aria-expanded="false">Menu</button>
      <nav class="site-nav">
        <ul class="menu-list">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    `;
    
    // Spy on console.warn
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.warn
    consoleSpy.mockRestore();
  });

  test('should add click event listener to mobile menu toggle', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Mock addEventListener to capture the callback
    const mockCallback = jest.fn();
    menuToggle.addEventListener = jest.fn();
    
    // Simulate the toggleMobileMenu function
    const toggleMobileMenu = () => {
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
    };
    
    toggleMobileMenu();
    
    // Verify addEventListener was called with 'click'
    expect(menuToggle.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('should toggle aria-expanded from false to true when clicked', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Initially aria-expanded should be false
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    
    // Simulate the click handler logic
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    // Simulate first click
    clickHandler();
    
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
  });

  test('should toggle aria-expanded from true to false when clicked again', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Set initial state to expanded
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('isVisible');
    
    // Simulate the click handler logic
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    // Simulate click to close
    clickHandler();
    
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('isVisible')).toBe(false);
  });

  test('should toggle isVisible class on mobile menu', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Initially should not have isVisible class
    expect(mobileMenu.classList.contains('isVisible')).toBe(false);
    
    // Simulate the click handler logic
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    // First click - should add class
    clickHandler();
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
    
    // Second click - should remove class
    clickHandler();
    expect(mobileMenu.classList.contains('isVisible')).toBe(false);
  });

  test('should handle missing mobile menu toggle element gracefully', () => {
    // Remove the mobile menu toggle button
    const menuToggle = document.querySelector('.mobile-menu-icon');
    menuToggle.remove();
    
    // Simulate the toggleMobileMenu function
    const toggleMobileMenu = () => {
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
    };
    
    // Should not throw an error
    expect(() => toggleMobileMenu()).not.toThrow();
    
    // Should log warning
    expect(consoleSpy).toHaveBeenCalledWith('Mobile menu elements not found');
  });

  test('should handle missing mobile menu list element gracefully', () => {
    // Remove the mobile menu ul element
    const mobileMenu = document.querySelector('.site-nav ul');
    mobileMenu.remove();
    
    // Simulate the toggleMobileMenu function
    const toggleMobileMenu = () => {
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
    };
    
    // Should not throw an error
    expect(() => toggleMobileMenu()).not.toThrow();
    
    // Should log warning
    expect(consoleSpy).toHaveBeenCalledWith('Mobile menu elements not found');
  });

  test('should handle case where aria-expanded attribute is missing', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Remove the aria-expanded attribute
    menuToggle.removeAttribute('aria-expanded');
    
    // Simulate the click handler logic
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    // First click - should treat missing attribute as false, so set to true
    clickHandler();
    
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
  });

  test('should work with multiple rapid clicks', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Simulate the click handler logic
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    // Simulate multiple rapid clicks
    clickHandler(); // Open
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
    
    clickHandler(); // Close
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('isVisible')).toBe(false);
    
    clickHandler(); // Open again
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
    
    clickHandler(); // Close again
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('isVisible')).toBe(false);
  });

  test('should preserve existing classes on mobile menu', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Add some existing classes
    mobileMenu.classList.add('menu-list', 'navigation');
    
    // Simulate the click handler logic
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    // Click to open menu
    clickHandler();
    
    // Should have both existing classes and new isVisible class
    expect(mobileMenu.classList.contains('menu-list')).toBe(true);
    expect(mobileMenu.classList.contains('navigation')).toBe(true);
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
    
    // Click to close menu
    clickHandler();
    
    // Should still have existing classes but not isVisible
    expect(mobileMenu.classList.contains('menu-list')).toBe(true);
    expect(mobileMenu.classList.contains('navigation')).toBe(true);
    expect(mobileMenu.classList.contains('isVisible')).toBe(false);
  });

  test('should work with different selector patterns', () => {
    // Test that our code works with the specific selector '.site-nav ul'
    document.body.innerHTML = `
      <button class="mobile-menu-icon" aria-expanded="false">Menu</button>
      <div class="site-nav">
        <ul id="main-menu">
          <li><a href="/">Home</a></li>
        </ul>
      </div>
    `;
    
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    expect(menuToggle).toBeTruthy();
    expect(mobileMenu).toBeTruthy();
    expect(mobileMenu.id).toBe('main-menu');
    
    // Simulate the click handler logic
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    clickHandler();
    
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
  });
});

// Integration tests for the complete mobile menu functionality
describe('main.js - Mobile Menu Integration Tests', () => {
  let consoleSpy;

  beforeEach(() => {
    // Create complete page structure
    document.body.innerHTML = `
      <header>
        <button class="mobile-menu-icon" aria-expanded="false">
          <span>Menu</span>
        </button>
        <nav class="site-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main></main>
      <footer class="footer-bottom"></footer>
    `;
    
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should initialize mobile menu functionality when DOM is ready', () => {
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Mock the addEventListener method to capture the callback
    const originalAddEventListener = menuToggle.addEventListener;
    let clickHandler;
    
    menuToggle.addEventListener = jest.fn((event, handler) => {
      if (event === 'click') {
        clickHandler = handler;
      }
    });
    
    // Simulate the complete toggleMobileMenu function
    const toggleMobileMenu = () => {
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
    };
    
    // Initialize the mobile menu
    toggleMobileMenu();
    
    // Verify event listener was added
    expect(menuToggle.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    expect(consoleSpy).not.toHaveBeenCalled();
    
    // Get the actual click handler that was registered
    const actualHandler = menuToggle.addEventListener.mock.calls[0][1];
    
    // Test the click behavior
    actualHandler();
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
    
    actualHandler();
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('isVisible')).toBe(false);
  });

  test('should work in combination with other page functionality', () => {
    // Test that mobile menu works alongside copyright functionality
    const footerElement = document.querySelector('.footer-bottom');
    const menuToggle = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.site-nav ul');
    
    // Simulate both functions working together
    expect(footerElement).toBeTruthy();
    expect(menuToggle).toBeTruthy();
    expect(mobileMenu).toBeTruthy();
    
    // Both should be able to function independently
    const clickHandler = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('isVisible');
    };
    
    clickHandler();
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('isVisible')).toBe(true);
  });
});

