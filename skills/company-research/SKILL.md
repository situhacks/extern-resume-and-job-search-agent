---
name: company-research
description: Produce a cited research brief of a target firm or market, using a Gemini Deep Research prompt.
---

# company-research

Build a cited briefing on a target company or market — for "know the firm" interview prep and for aiming an
application. Research happens IN PREP FOR an application (it's stage 1 of an application workspace).

## Steps
1. **Frame the target.** Company or market the user named. If it sits in a covered industry, skim
   `library/frameworks/industries/_index.md` and load that one file for a quick prior (profit model, trends,
   landscape) — it sharpens the research prompt and gives you a frame to check the returned research against.
   It's a prior, not a citable source.
2. **Write a Deep Research prompt** using `resources/dr-prompt-template.md`, filled for this target. It follows
   Google's recommended structure — see `resources/dr-best-practices.md` (apply the same shape if you ever
   write a DR prompt for anything other than a research brief).
3. **Hand it to the user to run** in Gemini Deep Research (this system uses the prompt path, not an API). Ask
   them to paste the result back.
4. **Synthesize** the returned research into a clean research brief (see `resources/brief-shape.md`):
   what the firm does, recent strategy/news, competitive position, where they're investing, and the
   2–3 things to actually say in an interview. Keep citations.
5. **Write** to `workspace/applications/{company}-{role}/research-brief-v1.md` (flat folder named company+role;
   create it if this is the start of one). If this is the start of an application, set its tracker row to
   `researching` (`application-tracker` skill).

## Rules
- Cited only — no hallucinated facts. If the research didn't support it, don't assert it.
- The output is for USE: lead with the few things worth knowing/saying, not an undigested dump.
