---
name: cv
description: Tailor a one-page CV to a specific job description from the user's master CV.
---

# cv

Turn a JD + the user's master CV into a tailored, one-page CV.

## Before you start (cold-start check)
- If `library/context/master-cv.md` still says FILL-ME → ask the user to paste their resume, build the master
  CV first, THEN tailor. Don't generate from an empty master. (`*.EXAMPLE.md` files next to it are just a filled
  sample to show the shape — they are NOT the user's data; don't tailor from them.)
- Read `library/context/positioning.md` for target firms/track (ask if still FILL-ME and it matters).

## Steps
1. **Save the JD.** Write it to the application folder `workspace/applications/{company}-{role}/application.md`
   (folder named company+role so a firm's different roles don't collide) — fixed facts only (company, role,
   location, posting_url, saved_date) plus the JD text verbatim. The JD is the canonical source — save it so
   context loss doesn't cost it. **State goes in the tracker, not here:** set this application's row to
   `tailoring` in `workspace/applications/tracker.md` (`application-tracker` skill — create the tracker from
   `tracker.EXAMPLE.md` if it's missing).
2. **Read** `master-cv.md` + `positioning.md`. For stories: scan only the ROSTER line (first line) of each
   `stories/*.md` to pick the 2–3 matching the JD's competencies, then read the full body of just those.
3. **Tailor.** Select and rephrase bullets to match the JD's real requirements — echo its language where it's
   honest, lead with relevant impact. Do NOT invent experience. Cut ruthlessly to **one page**.
   - **Order sections by what the JD values.** If the JD explicitly values something the user has a strong,
     differentiated section for (e.g. AI/applied projects, research), promote it HIGH — even above older work
     experience. A JD that says "curiosity about AI" + a candidate with a real AI project = lead with it.
   - **Dense bullets:** action → mechanism → quantified outcome, chained in one bullet. "Built X that did Y →
     Z result" beats two thin bullets.
4. **ATS keyword pass** (`resources/ats.md`). Read it on a first draft and on any big edit. Pull the JD's
   must-have terms (exact job title, hard skills, tools, certs), make sure the CV **mirrors them honestly** where
   the experience is real — exact-match the title in the summary, put high-priority keywords in the most recent
   roles, embed skills in metric bullets (not a keyword dump) — and **flag any true-but-missing gap** to the
   user rather than inventing it.
5. **Format** per `resources/format.md` (single column, standard headings, `Month YYYY` dates — these are the
   ATS-parse rules, not just looks).
6. **Self-critique before showing it:** Does it lead with what THIS JD values most? Every bullet earn its place
   with an outcome? Right length (one page; up to two is OK for a Canadian role with real tenure)? Title
   mirrored, must-have keywords present, no invented experience? Fix, then show.
7. **Write** to `workspace/applications/{company}-{role}/cv-v1.md` (flat, versioned — bump to `cv-v2.md` only
   for a distinct draft worth keeping, not every edit).
8. Offer `skills/doc-export/` to render the submission PDF (and a `.docx` for editing or a Taleo/legacy ATS),
   and `skills/cover-letter/` for the letter. Once both CV and cover letter are done, bump the tracker row to `ready`.

## The output goal is the markdown
**The deliverable is a sharp `cv.md` — that's what you're optimizing.** Iterate it as many times as the user
wants: tighten bullets, re-tailor to the JD, run it through their voice (`voice/voice-profile.md`), cut to one page. Get the *content*
right. That polished markdown is the real product; when it's done, `doc-export` pours it into an ATS-safe,
one-page HTML template the student prints to PDF — no hand-formatting needed.

## Rules
- One page for US roles (default). Canadian roles may run **1–2 pages** when there's real tenure — don't pad to
  fill a second page, but don't force-cut strong content to one either.
- Every bullet earns its place against the JD. No filler.
- Real experience only — if the JD wants something they haven't done, don't fake it; flag the gap to the user.
- **GPA** only if **> 3.5/4.0**. For an international grade, append the US equivalent in parentheses
  (e.g. `14/20 (US GPA ~3.8)`) so an ATS doesn't read it as a low percentage.
- **Quebec (Montreal) roles:** highlight French fluency (Bill 96 makes it near-essential even at global firms);
  use Canadian spelling for Canadian applications. See `resources/ats.md`.
- Match the firm's screen where known (`resources/ats.md`): BCG (Eightfold) evidences integrity/curiosity/
  creativity/collaboration/drive; Bain (Avature) ambitious/curious/entrepreneurial; McKinsey is human-reviewed
  (readability + STAR + academic signal).
- Iterate freely on the markdown until it's right — that's the point. Don't rush to export.
