---
name: Ignored lines in triage tracker post review
description: Lines 36, 97, and 128 in the triage tracker post are off-limits for flagging during /review-post
type: feedback
---

Do not flag lines 36, 97, or 128 in the triage tracker post for any issues (clarity, accuracy, readability, or otherwise).

**Why:** User explicitly accepted the wording on these lines. Line 36 accepted on 2026-04-10; lines 97 and 128 accepted on 2026-04-09. No further reason given — treat as final calls.

**How to apply:** During every `/review-post` run on this file, skip lines 36, 97, and 128 entirely. Do not mention them, do not suggest rewrites for them.
