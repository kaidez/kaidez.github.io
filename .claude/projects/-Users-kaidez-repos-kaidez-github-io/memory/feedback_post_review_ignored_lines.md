---
name: Ignored lines in triage tracker post review
description: Lines 97 and 128 in the triage tracker post are explicitly off-limits for flagging during /review-post
type: feedback
---

Do not flag lines 97 or 128 in `src/posts/2026-04-13-claude-github-triage-tracker-mcp-server.md` for any issues (clarity, accuracy, readability, or otherwise).

**Why:** User explicitly said "ignore the issues on lines 128 and lines 97" on 2026-04-09. No further reason given — treat as a final call.

**How to apply:** During every `/review-post` run on this file, skip lines 97 and 128 entirely. Do not mention them, do not suggest rewrites for them.
