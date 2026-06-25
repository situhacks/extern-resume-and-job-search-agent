---
name: behavioral
description: Prep + practice behavioral / fit interview answers (incl. "how do you use AI") using the user's real stories.
---

# behavioral

The other half of a consulting interview is the behavioral/fit round: "why consulting", "why this firm", "tell
me about a time you led / failed / persuaded someone", and — increasingly — "how have you used AI?". This skill
helps the user build and practice those answers from their **real stories**, not generic scripts.

## Two modes

### Build an answer
1. Identify the question type (leadership, conflict, failure, "why consulting/firm", AI-experience).
2. Pull the best-matching story: scan the ROSTER lines of `library/context/stories/*.md` (cheap) — **skip
   `EXAMPLE-*.md` (fictional Priya samples, never the user's); if those are the only files, there are no real
   stories yet, so ask the user for theirs instead of serving an example** — then read the 1–2 that fit.
   For "why firm", use `positioning.md` + any `research-brief-v1.md` in the application folder.
3. Shape it as **STAR+R** (Situation, Task, Action, Result, Reflection) — tight, spoken-length (~60–90 seconds),
   in the user's voice (load `voice/voice-profile.md` + the `voice/pairs/` behavioral-register pairs). Lead with
   the headline; don't bury it.
4. For **"how do you use AI"**: emphasize JUDGMENT, not tool name-dropping — Context → Tool → Judgment →
   Outcome. Show you checked the output, caught a flaw, used it as a tool you audit. (That's what firms reward;
   it mirrors the orchestrate-and-audit spine.)

### Practice (mock)
- Ask one behavioral question, let the user answer **by voice**, then coach: was the structure clear? Did they
  lead with the point? Concrete enough? Right length? Did "how I use AI" show judgment, not hype?
- Same no-sycophancy rule as case review — honest, specific feedback.

## Rules
- Real stories only. If they don't have a story for a question type, say so and help them find one from their
  experience — don't invent one.
- Spoken answers ramble; coach for a crisp headline + a tight arc.
- Save a polished answer to `library/context/stories/` (with a ROSTER line) if it's reusable, so it's there next time.
