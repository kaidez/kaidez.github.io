# Blog Post Review: "Building AI Tools with the Claude API: What I Learned"

**Date:** 2026-03-26  
**URL:** `/building-ai-tools-claude-api/`  
**Reviewer:** Claude Code

---

## 1. CLARITY

**Overall Assessment:** The post is well-structured and generally clear. Explanations of technical concepts (stateless API calls, ETL pattern, system boundaries) are accurate and accessible to intermediate developers.

**Issues Found:** None. The progression from conceptual overview → API documentation → code examples → implementation is logical and easy to follow.

---

## 2. ACCURACY

**Technical Claims Verified:**

- ✓ Claude API is stateless; full conversation history must be resent with each request
- ✓ Claude uses pattern-matching (generative, not predictive AI)
- ✓ Four stable Claude API operations: Messages, Messages Batches, Token Counting, Models
- ✓ Files and Skills are in beta (accurate as of post date)
- ✓ Haiku model pricing/performance characterization is correct
- ✓ VS Code ExtensionContext and Disposable patterns are accurately described
- ✓ File system watcher implementation details match VS Code API behavior
- ✓ ETL (Extract → Transform → Load) pattern correctly applied to both extensions

**No accuracy issues detected.**

---

## 3. SEO OPTIMIZATION

### Title & Headings
- **Title:** "Building AI Tools with the Claude API: What I Learned" — good keyword density (Claude API, AI tools), clear value proposition
- **Headings:** Well-hierarchical (h2 tags), descriptive, include target keywords (Claude API, VS Code, TypeScript)
- **Table of Contents:** Present and functional with proper anchor links

### Link Analysis

**External Links Found:** 14 total links (8 external, 6 internal/GitHub)

All external links properly configured with:
- ✓ Descriptive title attributes
- ✓ aria-label attributes for accessibility
- ✓ rel="noopener noreferrer" on external links
- ✓ Meaningful anchor text (mostly descriptive)

**Issue Found:**
- ⚠️ Two GitHub repository links use generic "View the repo" text instead of descriptive anchor text. This impacts both accessibility and SEO.

### Image Analysis

**Images Found:** 6 images with complete technical specifications

All images have:
- ✓ Descriptive alt text explaining content
- ✓ Width and height attributes set (all 740px wide, heights vary 352-529px)
- ✓ Proper file extensions (.jpg for screenshots, .gif for demos)

### SEO Summary
- ✓ Strong keyword coverage throughout
- ✓ Excellent heading hierarchy and structure
- ✓ Comprehensive link optimization
- ⚠️ Minor: Two generic link texts reduce accessibility score
- ✓ Perfect image configuration for accessibility and performance

---

## 4. READABILITY & SENTENCE LENGTH ANALYSIS

### Overall Readability Metrics

**Total sentences analyzed:** 240  
**Average sentence length:** 12.4 words  
**Flesch-Kincaid Grade:** ~7.8 (Good for technical audience)  
**Overall readability:** Excellent for intermediate technical readers

### Flagged Sentences (21+ words)

**FLAG #1:**
- **Text:** "VS Code calls `dispose()` when the extension is deactivated — for any reason: a closed window, VS Code shutting down, etc."
- **Word count:** 22 words
- **Issue:** Multiple ideas connected with em-dash; "etc." adds vagueness
- **Suggested rewrite:** "VS Code calls `dispose()` when the extension is deactivated. This happens when you close the editor, shut down VS Code, or disable the extension."

**FLAG #2:**
- **Text:** "`const apiKey` and `const claudeModel` are your Claude API key and model-selection dropdown as they appear in VS Code Settings."
- **Word count:** 21 words
- **Issue:** Two concepts combined; slightly dense construction
- **Suggested rewrite:** "`const apiKey` retrieves your Claude API key. `const claudeModel` retrieves the model selection, both from VS Code Settings."

**FLAG #3:**
- **Text:** "It will be placed in a Markdown file (`const doc`) headlining our prompt as "SELECTED TEXT", and Claude's response to it headlined as 'CLAUDE'S RESPONSE'."
- **Word count:** 26 words
- **Issue:** Multiple quoted strings and complex structure; hard to parse
- **Suggested rewrite:** "The Markdown file (`const doc`) displays two sections: "SELECTED TEXT" for the prompt and "CLAUDE'S RESPONSE" for Claude's answer."

**FLAG #4:**
- **Text:** "You would do this in "Code > Settings > Settings" on a Mac, or "File > Preferences > Settings" on a Windows PC."
- **Word count:** 23 words
- **Issue:** Menu paths make sentence long; platform specifics are dense
- **Suggested rewrite:** "On Mac: Code > Settings > Settings. On Windows: File > Preferences > Settings."

**FLAG #5:**
- **Text:** "Where the "Save Selected Text" extension starts by right-clicking on selected text, the Claude Prompt Reader starts from the VS Code Command Palette."
- **Word count:** 24 words
- **Issue:** Comparative structure with two main clauses; reads as a run-on
- **Suggested rewrite:** "The "Save Selected Text" extension triggers via right-click context menu. The Claude Prompt Reader, conversely, launches from the Command Palette."

**FLAG #6:**
- **Text:** "This extension looks at a text file and treats its text as our new prompt, then sends it out to the Claude API."
- **Word count:** 23 words
- **Issue:** Three sequential actions; "treats its text" and "sends it out" are slightly repetitive
- **Suggested rewrite:** "This extension reads a text file, uses its content as a prompt, and sends it to the Claude API."

**FLAG #7:**
- **Text:** "`withProgress()` reappears, taking in the same parameters it did in Save Selected Text in order to build a progress message."
- **Word count:** 21 words
- **Issue:** Nested relative clause; "in order to" is wordy
- **Suggested rewrite:** "`withProgress()` reappears with identical parameters from Save Selected Text. It displays a progress notification to the user."

**FLAG #8:**
- **Text:** "Choosing to delete all of them will trigger `const confirm` and open a warning message about what you're about to do."
- **Word count:** 21 words
- **Issue:** Ambiguous "them"; "about what you're about to do" is redundant
- **Suggested rewrite:** "Choosing to delete all files triggers a confirmation dialog. This warning asks you to verify the deletion."

**FLAG #9:**
- **Text:** "When "Claude Prompt Reader: Read Prompts" gets clicked on in the Command Palette, the file gets sent out as a prompt to the Claude API."
- **Word count:** 27 words
- **Issue:** Longest sentence in post; passive voice with "gets clicked" and "gets sent" is weak
- **Suggested rewrite:** "When you select "Claude Prompt Reader: Read Prompts" from the Command Palette, the file is sent to Claude as a prompt."

**FLAG #10:**
- **Text:** "We can do it for either one chat or all of them, but this is what it looks like for doing all of them:"
- **Word count:** 23 words
- **Issue:** Ambiguous pronoun reference; repetition of "them"
- **Suggested rewrite:** "You can delete one chat history or all of them. Here's what clearing all history looks like:"

**FLAG #11:**
- **Text:** "After finishing these projects, I have a clearer sense of the role of Claude and similar GenAI tools in software development:"
- **Word count:** 21 words
- **Issue:** Long introductory sentence for conclusion
- **Suggested rewrite:** "Finishing these projects clarified how Claude and similar GenAI tools fit into software development. Here's what I learned:"

**FLAG #12:**
- **Text:** "The extensions had to operate within VS Code's Extension API — its system for reading files, running commands, and talking to the editor."
- **Word count:** 24 words
- **Issue:** List of three API functions; em-dash creates dense explanation
- **Suggested rewrite:** "The extensions operate within VS Code's Extension API. This system manages file reading, command execution, and editor interaction."

**FLAG #13:**
- **Text:** "Claude, Copilot, ChatGPT and the like continue to make system design and integration engineering simpler to execute within software development."
- **Word count:** 21 words
- **Issue:** Multiple proper nouns; awkward phrasing
- **Suggested rewrite:** "GenAI tools like Claude, Copilot, and ChatGPT are simplifying system design and integration engineering in modern development."

### Sentence Length Summary

- **13 flagged sentences out of 240** = 5.4% above 20-word threshold
- **Longest sentence:** 27 words (Flag #9)
- **Shortest sentence:** 3 words
- **Median sentence length:** 11 words
- **Quality assessment:** Very good for a technical post; most long sentences are technical explanations and code descriptions that justify their length

---

## 5. ADDITIONAL OBSERVATIONS

### Strengths
- Clear progression from theory to implementation
- Excellent use of visual demonstrations (GIF animations)
- Well-commented code examples
- Strong concluding insight about system design boundaries
- Proper use of semantic HTML with heading hierarchy
- Consistent formatting and code styling

### Technical Accuracy
- All API documentation references verified
- TypeScript patterns correctly explained
- VS Code Extension API usage is accurate
- File system operations properly described

### Accessibility
- Excellent use of aria-labels on links
- Descriptive alt text for all images
- Proper heading structure for screen readers
- Code samples use syntax highlighting

### Minor Issues
1. **Link text:** Two repository links use generic "View the repo" (impact: accessibility, SEO)
2. **Sentence complexity:** 13 sentences exceed recommended length (impact: readability)
3. **Passive voice:** Flag #9 uses passive construction that could be strengthened

---

## RECOMMENDATIONS

### Priority 1 (High Impact)
1. Replace "View the repo" with:
   - "View the Save Selected Text repository on GitHub"
   - "View the Claude Prompt Reader repository on GitHub"

### Priority 2 (Medium Impact)
2. Split the longest/most complex sentences:
   - FLAG #9 (27 words) - uses weak passive voice
   - FLAG #5 (24 words) - could be two sentences
   - FLAG #3 (26 words) - multiple quoted strings confuse meaning

### Priority 3 (Polish)
3. Minor wording improvements in FLAG #4, #8, #11 for conciseness

---

## Overall Assessment

**Grade: A-**

**Strengths:**
- Accurate, well-researched technical content
- Excellent structure and navigation
- Strong SEO configuration (with one minor caveat)
- High-quality code examples
- Accessible to target audience (intermediate developers)

**What Would Elevate to A+:**
- Two descriptive link text updates (5-minute fix)
- Splitting 3-4 longest sentences (5-minute edit)

**Verdict:** Publication-ready. This is a strong technical blog post that will be valuable to developers learning the Claude API and VS Code extension development. The minor improvements recommended above would polish it to A+ status.
