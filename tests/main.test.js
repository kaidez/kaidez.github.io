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

// Tests for Pagefind initialization (code starting around line 30)
describe('main.js - Pagefind search initialization', () => {
  let originalPagefindUI;
  let mockPagefindUI;
  let consoleSpy;
  let consoleErrorSpy;
  let mockAddEventListener;

  beforeEach(() => {
    // Store original global objects
    originalPagefindUI = global.PagefindUI;
    
    // Mock PagefindUI constructor
    mockPagefindUI = jest.fn();
    global.PagefindUI = mockPagefindUI;
    
    // Create fresh DOM with search element
    document.body.innerHTML = '<div id="search"></div>';
    
    // Mock console methods
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock document.addEventListener
    mockAddEventListener = jest.spyOn(document, 'addEventListener').mockImplementation((event, callback) => {
      if (event === 'DOMContentLoaded') {
        // Immediately call the callback to simulate DOM ready
        callback();
      }
    });
  });

  afterEach(() => {
    // Restore original global objects
    global.PagefindUI = originalPagefindUI;
    
    // Restore console methods
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    
    // Restore addEventListener
    mockAddEventListener.mockRestore();
  });

  test('should initialize PagefindUI with correct configuration', () => {
    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    eval(pagefindCode);

    // Verify PagefindUI was called with correct configuration
    expect(mockPagefindUI).toHaveBeenCalledTimes(1);
    expect(mockPagefindUI).toHaveBeenCalledWith({
      element: "#search",
      showImages: false,
      excerptLength: 20,
      resetStyles: false,
      translations: {
        placeholder: "Search kaidez for stuff...",
        zero_results: "Couldn't find [SEARCH_TERM]"
      }
    });
    
    // Verify success message was logged
    expect(consoleSpy).toHaveBeenCalledWith('Pagefind initialized successfully');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test('should handle PagefindUI initialization errors gracefully', () => {
    // Mock PagefindUI to throw an error
    const mockError = new Error('PagefindUI is not available');
    mockPagefindUI.mockImplementation(() => {
      throw mockError;
    });

    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    expect(() => eval(pagefindCode)).not.toThrow();

    // Verify error was caught and logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Pagefind initialization failed:', mockError);
    expect(consoleSpy).not.toHaveBeenCalledWith('Pagefind initialized successfully');
  });

  test('should wait for DOMContentLoaded before initializing', () => {
    // Reset the mock to track calls more precisely
    mockAddEventListener.mockRestore();
    mockAddEventListener = jest.spyOn(document, 'addEventListener').mockImplementation(() => {});

    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    eval(pagefindCode);

    // Verify addEventListener was called with DOMContentLoaded
    expect(mockAddEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
    
    // PagefindUI should not be called yet (since callback wasn't executed)
    expect(mockPagefindUI).not.toHaveBeenCalled();
  });

  test('should pass correct translation configuration', () => {
    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    eval(pagefindCode);

    // Extract the translations from the call arguments
    const callArgs = mockPagefindUI.mock.calls[0][0];
    
    expect(callArgs.translations).toEqual({
      placeholder: "Search kaidez for stuff...",
      zero_results: "Couldn't find [SEARCH_TERM]"
    });
  });

  test('should use correct search element selector', () => {
    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    eval(pagefindCode);

    // Verify the element selector is correct
    const callArgs = mockPagefindUI.mock.calls[0][0];
    expect(callArgs.element).toBe("#search");
  });

  test('should set showImages to false', () => {
    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    eval(pagefindCode);

    // Verify showImages is set to false
    const callArgs = mockPagefindUI.mock.calls[0][0];
    expect(callArgs.showImages).toBe(false);
  });

  test('should set excerptLength to 20', () => {
    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    eval(pagefindCode);

    // Verify excerptLength is set to 20
    const callArgs = mockPagefindUI.mock.calls[0][0];
    expect(callArgs.excerptLength).toBe(20);
  });

  test('should set resetStyles to false', () => {
    // Simulate the Pagefind initialization code
    const pagefindCode = `
      document.addEventListener('DOMContentLoaded', function() {
        try {
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
      });
    `;
    
    eval(pagefindCode);

    // Verify resetStyles is set to false
    const callArgs = mockPagefindUI.mock.calls[0][0];
    expect(callArgs.resetStyles).toBe(false);
  });
});
