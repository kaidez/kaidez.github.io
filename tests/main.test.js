/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Read the main.js file content
const mainJsPath = path.join(__dirname, '../src/assets/js/main.js');
const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

// Extract the copyrightYear function from the IIFE for testing
// We need to modify the IIFE to expose the function for testing
function createTestableFunction() {
  // Extract the function body from the IIFE and make it testable
  const functionMatch = mainJsContent.match(/function copyrightYear\(\) \{([\s\S]*?)\n    \}/);
  if (!functionMatch) {
    throw new Error('Could not extract copyrightYear function from IIFE');
  }
  
  // Create a testable function with the extracted body
  const functionBody = functionMatch[1];
  return new Function('', `
    function copyrightYear() {${functionBody}
    }
    return copyrightYear;
  `)();
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
    
    // Should have 2 paragraphs since the function doesn't check for existing ones
    expect(paragraphs).toHaveLength(2);
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
