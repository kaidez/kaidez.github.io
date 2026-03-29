---
name: review-post
description: Review a blog post markdown file for clarity, accuracy, SEO, and readability
---

Review the specified markdown file for:

1. **Clarity**: Flag unclear or ambiguous passages
2. **Accuracy**: Check technical claims
3. **SEO**: Evaluate title, headings, keyword usage. For every `<a>` tag: check for a descriptive `title` attribute, meaningful link text (flag "click here" or bare URLs), and `rel="noopener noreferrer"` on external links. For every `<img>` tag: check that `alt` text is present and descriptive (not empty or filename-only), and that `width` and `height` attributes are set.
4. **Readability**: Flag sentences over 20 words. Compute Flesch-Kincaid estimate.
5. Provide specific rewrite suggestions for each flagged sentence.
