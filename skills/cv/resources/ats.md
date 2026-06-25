# ATS best practices — the keyword & parsing checklist

This file owns the **ATS keyword & parsing** rules for resumes and cover letters — the "does it get past the
screener and parse cleanly, and does a recruiter find it" layer. (Visual/structural ATS-safety — single column,
no tables/images — also lives in `format.md` and the `doc-export` HTML template; this file is the content +
matching layer.) Distilled from 2025–2026 ATS research. The `cv` and `cover-letter` skills read this on demand:
**first draft, big-diff review, and final check.**

## The keyword pass — run this against the saved JD
1. **Pull the JD's must-have terms** — the exact job title, hard skills, tools, methods, certifications, repeated
   domain language. These are what recruiters Boolean-search and what AfI match-scores against.
2. **Mirror them honestly where the experience is real.** Exact-match the terms that matter (don't say "worked
   with clients" if the JD says "stakeholder management" and you did it). Natural synonyms are fine elsewhere.
3. **Embed skills in metric bullets, not a keyword cloud** (see "semantic clustering" below).
4. **Flag true-but-missing gaps to the user** — a must-have the JD wants that the CV doesn't evidence. Never
   invent experience to hit a keyword; surface the gap so the user decides.

## Do-this checklist (highest-impact first)
1. **Mirror the exact job title** verbatim in the header/summary. Exact-title resumes get ~10.6× the callback
   rate — initial recruiter search is literal keyword matching, not semantic.
2. **Single-column only.** Multi-column scrambles parsing (Workday/Taleo read left-to-right across the page and
   merge a sidebar's dates into the body). Align with tab stops/margins, never tables.
3. **Semantic clustering, not buzzword clouds.** Put skills inside STAR-style metric bullets ("Led change
   management using Agile to align stakeholders across 3 units, cutting redundancy 18%"). High keyword density
   with no supporting syntax triggers a "stuffing" trust-score penalty on modern NLP (Workday Illuminate,
   Eightfold, Greenhouse).
4. **Standard section headings only** — "Work Experience", "Education", "Skills". Creative headings ("My
   Journey") break section-detection.
5. **Dates as `Month YYYY`** uniformly (e.g. `June 2022 – August 2024`). Year-only or "Fall 2022" can make the
   parser compute zero tenure → knockout on experience minimums. Delineate multiple roles at one employer with
   their own dates so promotions parse.
6. **Contact info in the main body text**, top of page — name, phone, email, LinkedIn. Word header/footer fields
   are often skipped by parsers → blank, uncontactable profile.
7. **Acronym + spelled-out** for important terms ("Certified Public Accountant (CPA)") — legacy Taleo has no
   semantic intelligence and won't equate the two.
8. **A dedicated comma-separated Skills block** *in addition to* the contextual bullets — Greenhouse AI and SAP
   SuccessFactors index it directly for match scoring. (Both/and, not either/or with rule 3.)
9. **Standard fonts** (Arial, Calibri, Times New Roman) — custom fonts cause encoding errors on extraction.
10. **Put the highest-priority JD keywords in the most RECENT roles** — Eightfold weights skill *recency*; a
    skill shown only in an old role ranks lower.
11. **North America compliance — omit** photo, age, DOB, gender, marital status, nationality, SIN/SSN, signature.
12. **In an application portal, fill every field** — a blank required field is read as failing a requirement and
    can trigger an automated knockout even if the resume contains the info.

## File format — PDF is our default; know when DOCX wins
**This kit ships a text-based PDF (HTML→PDF via headless Chrome) as the deliverable** — it's a *real text* PDF
(embedded fonts, selectable text), NOT the image/"Print-to-PDF"-flattened kind (those parse at ~4.3% — a blank
profile). On modern ATS a clean text PDF parses ~91% and on **Greenhouse ≥95%**, and Greenhouse surfaces the
visual file straight to the recruiter — so PDF is the right call for consulting, and it holds the **one-page
layout fixed** (a Word doc re-flows per machine and can spill to page 2 — an instant consulting reject).
**The nuance:** DOCX parses higher on legacy systems — **~97% vs PDF's ~83% on Oracle Taleo**. So **switch the
deliverable to `.docx` when the target ATS is Taleo or an unknown legacy system**; otherwise PDF. Use the `docx`
fallback in `doc-export` for that (and for the user's own editing pass).

## How the platforms differ (so you target, not guess)
- **Workday** (~35% of big enterprises; Accenture/PwC/Big-4 portals): strict top-to-bottom parse, intolerant of
  columns/tables/graphics; AI (HiredScore/Textkernel) scores the resume vs JD and won't credit keywords in
  fragmented sentences. Prefers DOCX.
- **Greenhouse**: parses PDF/DOCX ≥95% and shows the recruiter the real file inline; its AI summary runs on the
  *parsed text*, so a scrambled layout makes the AI return "insufficient info". PDF is fine here.
- **Oracle Taleo** (legacy): literal Boolean + 3-star scoring + hard knockouts; **PDF parses at only ~83%** →
  send DOCX.
- **Eightfold** (BCG portal): semantic deep-learning match score + skill-recency weighting; needs standard
  terminology and recent placement of key skills.
- **Avature** (Bain): parse for legibility, then a human partner reads for distinctive impact.
- **Ashby**: binary "Meets / Does Not Meet" per recruiter-defined criterion (no numeric rank); fraud/behavior
  detection on the recruiter dashboard.
- **SAP SuccessFactors / iCIMS**: taxonomy/skill-cloud match scoring; creative phrasing maps poorly — use
  industry-standard terms.

## Cover letters
- Indexed as raw text for Boolean search (so mirror core JD terms), but **not** the primary AI match-score input
  — that comes from the resume's structured data.
- **In consulting they matter as human signal:** McKinsey reads them for narrative/motivation; BCG treats them as
  a tie-breaker on borderline candidates; partners read them as a *writing sample* (analytical communication).
  So: structured (intro intent → STAR body → conclusion tying impact to the firm), one compelling narrative with
  measurable impact, genuine firm alignment — never a re-list of resume bullets.

## Myths to STOP
- **White-text keyword hack** — ATS strips formatting to plain text for the recruiter, so hidden text becomes
  glaringly visible; NLP anomaly detection also flags it → rejection for dishonesty.
- **"The ATS auto-rejects ~75% on formatting."** False — ~92% of recruiters say their ATS does NOT auto-reject on
  parsed content. Knockouts come from **screening-question answers** (work authorization, min years), not commas.
  The real failure is **invisibility**: missing the exact keywords recruiters search, so you never surface.
- **"PDF always best because it preserves formatting."** Aesthetics ≠ parseability; legacy systems choke on PDF.
- **"Universal ATS score" tools** — there's no universal algorithm; chasing a third-party score incentivizes
  stuffing that hurts you on semantic platforms. Optimize for clean extraction + exact title match instead.

## Consulting-specific (MBB / Big 4) + Canada/US norms
- **McKinsey** — largely **manual human review** (CV goes to a recruiter, not a third-party ATS filter). Optimize
  for human readability, prestige/academic signal, rigorous STAR. (Kit note: McKinsey asks for **CV only, no
  cover letter**.)
- **BCG** — **Eightfold AI** screen; evidence its 5 named qualities: Integrity, Intellectual Curiosity, Creative
  Thinking, Collaborative Mindset, Drive. Then CCA + Casey chatbot case.
- **Bain** — **Avature** parse + human "two-reader" review; screens for **Ambitious, Curious, Entrepreneurial**
  (show end-to-end ownership of a project for "entrepreneurial").
- **Length:** US entry-level/post-MBA = **strict one page**. **Canadian** norms allow **1–2 pages** for real
  tenure — so the kit's one-page default is right for US and a soft default in Canada (don't pad to fill a 2nd).
- **GPA:** list only if **> 3.5 / 4.0**. For international grades, append a US-equivalent in parentheses
  (e.g. French `14/20 (US GPA ~3.8)`) — an ATS may otherwise read "14/20" as 70% and knock it out.
- **Quebec (Montreal) — Bill 96:** French is the legally protected language of work. A bilingual CV is strongly
  beneficial across Canada and **near-mandatory in Quebec** even at global firms — highlight French fluency in a
  languages section/summary; a heavily francophone office may require a fully French CV. Use Canadian spelling
  (organize / colour) for Canadian applications.

<!-- Source: 2025–2026 ATS optimization brief (vendor docs + ~630-recruiter survey + empirical parse testing). -->
