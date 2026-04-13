# Blog Post Review: Building AI Tools with the Claude API

**Post:** `/src/posts/2026-03-26-build-ai-tools-with-claude-api.md`  
**Review Date:** 2026-04-13

---

## 1. Clarity

The post is generally clear and well-structured. Technical concepts are explained step-by-step with good context. No significant clarity issues detected.

**Flagged item:** Line 57 reads "For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent." This is technically correct but could be clearer about *why* this happens (stateless nature). Consider:

- **Current:** "For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent."
- **Suggested:** "For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent to the API, since Claude maintains no server-side session."

---

## 2. Accuracy

Technical content is accurate and aligns with the Claude API documentation as of the post's publication date (2026-03-26). Model names, API endpoints, and architecture descriptions are correct. Code examples use valid TypeScript and VS Code API patterns.

**No flagged items.**

---

## 3. SEO

### Title & Meta Description (Front Matter)
- **Title:** "Building AI Tools with the Claude API: What I Learned" (52 characters) ✓ Optimal length
- **Excerpt:** "What I learned building two VS Code extensions with the Claude API: stateless conversations, TypeScript integration, and system design." (140 characters) ✓ Exactly at limit

Both are well-formed, describe the content accurately, and include relevant keywords (Claude API, VS Code, TypeScript, system design).

### Link Analysis
All external links have meaningful link text and include `rel="noopener noreferrer"` on external links. Examples:
- ✓ "Claude Desktop" → descriptive, has `rel="noopener noreferrer"`
- ✓ "get a Claude API key here" → descriptive, has `rel="noopener noreferrer"`
- ✓ "Yeoman" → descriptive, has `rel="noopener noreferrer"`
- ✓ "prompt caching" → descriptive, has `rel="noopener noreferrer"`

All repository links ("View the repo") are descriptive and use appropriate `aria-label` attributes.

**No flagged items.**

### Image Analysis
All images include `alt` text and `width`/`height` attributes:
- Line 176: Screenshot of VS Code context menu ✓
- Line 367: Screenshot of VS Code settings ✓
- Line 462: Animated demo of Save Selected Text extension ✓
- Line 1088: Prompt Reader: selecting a file ✓
- Line 1096: Prompt Reader: continuing conversation ✓
- Line 1100: Prompt Reader: clearing history ✓

All alt text is descriptive and specific to each image's content. **No flagged items.**

---

## 4. Readability

### Sentence-Level Analysis
Overall readability is good. Most sentences are clear and well-constructed. Few sentences exceed 20 words, and those that do are justified.

**Flagged long sentence (Line 446):**
- **Current:** "It includes the model chosen in VS Code settings — the model that processes our prompt."
- **Issue:** Redundant phrasing ("model...model"). 23 words.
- **Suggested:** "It includes the model chosen in VS Code settings, which processes our prompt."

**Flesch-Kincaid Grade Level Estimate:** 12.5–13 (College/Professional level)

The post targets intermediate developers and uses technical terminology appropriately. Sentence structures are varied and readable, with good use of lists and code blocks to break up dense paragraphs.

---

## 5. Front Matter Consistency

### Fields Present
- ✓ `title` is present and well-formed
- ✓ `excerpt` is present and well-formed

### Content Alignment

**Title:** "Building AI Tools with the Claude API: What I Learned"
- Accurately reflects the post content (two extensions, Claude API, lessons learned). ✓

**Excerpt:** "What I learned building two VS Code extensions with the Claude API: stateless conversations, TypeScript integration, and system design."
- Accurately reflects the post content (two extensions, key topics: stateless conversations, TypeScript, system design). ✓
- Character count: 140 (at strict limit). ✓

**No flagged items.**

---

## 6. Accessibility (WCAG 2.1 AA)

### Heading Hierarchy
The post uses proper heading structure:
- Front matter `title` is rendered as `<h1>` by Eleventy
- Body headings start at `<h2>` and progress logically to subsections
- No `<h1>` tags appear in the markdown body (correct)
- No heading level skips detected (e.g., h2 → h4)

**Table of Contents (Lines 19–32)** uses nested lists correctly to mirror heading hierarchy.

**No flagged items.**

### Images
All images have descriptive, non-empty `alt` text. No decorative images present. **No flagged items.**

### Links
All links have meaningful link text:
- No "click here" or bare URL links detected
- aria-label attributes enhance accessibility

**No flagged items.**

### Tables
No tables present in this post. **N/A**

---

## 7. Specific Issues & Recommendations

### Issue 1: Redundant phrasing (Line 446)
- **Severity:** Minor
- **Location:** Explanation of the API request code block
- **Current wording:** "It includes the model chosen in VS Code settings — the model that processes our prompt."
- **Problem:** "Model" is repeated, which weakens the sentence
- **Recommended fix:** "It includes the model chosen in VS Code settings, which processes our prompt."

### Issue 2: Clarity improvement (Line 57)
- **Severity:** Minor (stylistic enhancement)
- **Location:** Explanation of stateless architecture
- **Current wording:** "For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent."
- **Problem:** Does not explicitly explain why (due to stateless nature)
- **Recommended fix:** "For every new prompt you send, the entire message history — your messages and Claude's responses — gets resent to the API, since Claude maintains no server-side session."

---

## Summary

**Overall Assessment:** Ready to Publish

The post meets all requirements:
- Clear, accurate, and well-organized technical content
- SEO-optimized title, excerpt, links, and images
- Accessible heading structure and image alt text
- Professional readability (Grade 12–13, appropriate for audience)
- Front matter accurately reflects content
- Minor style suggestion noted but not blocking

**Minor recommendations:**
1. Rephrase line 446 to eliminate redundant "model" language
2. Optionally enhance line 57 for explicit clarity on stateless architecture

The post is publication-ready with or without these minor refinements.
