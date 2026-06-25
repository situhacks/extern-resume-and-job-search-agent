---
name: learn
description: Capture the user's feedback and fold it back into their voice system / positioning so future outputs improve.
---

# learn

When the user gives feedback ("too formal", "stop leading with the company name", "I liked that one"), make it
stick by updating the right file. This is what makes the kit get more *theirs* over time.

## Steps
1. Figure out what the feedback is about:
   - **How it sounds** (tone, phrasing, a line they liked or hated) → this is voice. Capture it as a **pair** in
     `library/context/voice/pairs/` (the right register file): the generic/wrong version they're reacting to →
     the version they want → a one-line note on the move. A concrete before/after teaches the agent more than a
     rule and won't drift toward generic. If the feedback is really a hard ban (a word, a framing), add it to
     `voice/anti-patterns.md` instead.
   - **What they're aiming at** (firms, framing, role) → update `library/context/positioning.md`.
   - **A story** (better framing, a new one) → update/add in `library/context/stories/`.
2. Keep the voice library lean: pairs cap at ~15–25, deduped by move, newest weighted heaviest. If a new pair
   overlaps an existing one, sharpen the existing one rather than adding a near-duplicate.
3. Confirm what you changed in one line.

## Why pairs, not rules
A growing list of rules ("be less formal", "don't do X", "avoid Y") makes drafts clean but generic — the agent
follows the rules and still sounds like any assistant. A pair shows the agent the actual move, so it can
*generate* in the user's voice. Prefer the pair every time the feedback is about how something reads.
