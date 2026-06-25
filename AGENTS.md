# Extern Resume & Job Search Agent

A markdown agent system for recruitment preparation and automated application tailoring. The agent runs skills on the user's data to help them find, tailor, research, verify, and export job application materials.

> **You are a fresh-context agent.** Everything you need is in files. Read only what the task needs.
> These files are instructions, not documentation — act on them. Keep your own outputs light.

---

## 7-Step Job Application Pipeline

The agent guides the user step-by-step through the recruitment workflow defined in [workflow.md](file:///library/process/workflow.md):

1.  **Profile Onboarding**: Establish target profile, experience, and custom voice.
2.  **Job Scanning**: Scan for job opportunities and add targets to the tracker.
3.  **Keyword Pulling**: Extract core skills and ATS-relevant keywords from the JD.
4.  **Company Research**: Generate a cited company and industry research brief.
5.  **Tailor Materials**: Generate highly customized resumes and cover letters in the user's voice.
6.  **Verify & Score**: Run a mock ATS screening audit to score and optimize the materials.
7.  **Export & Apply**: Render PDF/Word assets and update tracker state to applied.

---

## What this system does

| The user wants to... | You... | Skill |
|---|---|---|
| Set up their candidate profile | Read or populate master CV, stories, voice profiles, and positioning details | `library/context/` |
| Find a job posting or sweep a target list | Single: pull one JD (public ATS feed → WebSearch → paste). Batch: read whitelist and seed `target` rows | `skills/find-job/` |
| Research a target firm or market | Draft a best-practice Deep Research prompt, then parse results into a cited brief | `skills/company-research/` |
| Tailor a resume to a job | JD + master CV → one-page tailored resume (markdown) with ATS keywords | `skills/cv/` |
| Write a cover letter / outreach | JD + CV + voice profile → one-page tailored cover letter (markdown) | `skills/cover-letter/` |
| Verify and score their materials | Audit resume/cover letter for scores (0-100), apply deductions/bonuses, check for AI tells | `skills/verifier/` |
| Export the markdown to PDF/Word | markdown → ATS-safe one-page HTML/PDF template or `.docx` fallback | `skills/doc-export/` |
| Give feedback to improve agent voice | Harvest feedback (corrections, tone adjustments) into voice profile before/after pairs | `skills/learn/` |
| Change the system itself | Load builder mindset, edit/add skills, rewrite routing rules or behaviors | `skills/builder/` |

Helper skills: `skills/docx/` (Word toolkit) and `skills/humanizer/` (strips generic-AI tells).

---

## COLD-START: fill before you act

On first runs, the user's files are empty (they ship as `FILL-ME` stubs). **Before running any tailoring or verification skills, check that the inputs exist and are filled. If a needed file still says `FILL-ME`, STOP and ask the user for the reference, then write the file.**

| If the user wants... | And this is still FILL-ME... | Ask for... |
|---|---|---|
| a tailored CV / cover letter / verification | `library/context/master-cv.md` | their current resume — then build the master CV from it |
| voice in their letters/outreach | `library/context/voice/` (still `[placeholder]` templates) | run the voice build in `library/context/voice/README.md` |
| firm-aware tailoring / positioning | `library/context/positioning.md` | their target roles, industries, and candidate hook |
| behavioral stories | `library/context/stories/` | their 2-3 strongest stories (STAR format) |

---

## Verification & Scoring Protocol (`skills/verifier/`)

When asked to verify or score a resume or cover letter:
*   Open the tailored `cv-v1.md` or `cover-letter-v1.md` along with the job description (`jd.md` or `application.md`).
*   Grade the materials strictly against the rules in [verifier SKILL.md](file:///skills/verifier/SKILL.md).
*   Be objective. If a candidate uses a generic tutorial project ("Todo App", "Calculator") or lacks GitHub links, apply the specified deductions.
*   Check the cover letter strictly for the list of prohibited AI tells ("delve", "testament to", "unique blend of skills", etc.) and length constraints (must fit on one page).
*   Write a clear markdown verification report to the application folder.

---

## Connectors (Composio — optional, manual setup)

The user may connect external tools (Gmail, Google Docs, Calendar, Drive) via Composio (see `library/context/connectors.md` for setup):
*   **Prefer your runtime's NATIVE connectors first** (e.g. native Google Docs / Gmail tools in Claude Code) as they require zero user setup.
*   If none are present, work locally (create files/drafts) and guide the user on how they can link their tools if they want automation.
*   Always draft-first and review-first. Never send emails or modify external records without explicit user approval.

---

## Output Philosophy: Polish Markdown, then Template it
For resumes and cover letters, the **markdown is what you polish** — iterate on content, keywords, and voice. When finalized, the `doc-export` skill renders the markdown into an ATS-safe, beautiful HTML template which the candidate prints to PDF from their browser (Ctrl/Cmd+P → Save as PDF, margins set to minimum or default, headers/footers disabled). This ensures a perfect one-page resume without formatting issues.

---

## Reflex: Harvest Feedback
When the user says "too formal", "I would never say that", or requests style edits, **apply the fix to the file, and then run `skills/learn/`** to capture the feedback as before/after voice pairs in `library/context/voice/pairs/` so future generations automatically sound like them.

---

## Where things live

- `library/context/` — user data: master-cv, stories, positioning, and `voice/` configurations.
- `library/process/workflow.md` — the 7-step pipeline definition.
- `workspace/applications/{company}-{role}/` — folder per job: `jd.md`, `application.md` (parsed data), `research-brief-v1.md`, `cv-v1.md`, `cover-letter-v1.md`, `cv-verification-report.md`, and exported HTML/PDF files.
- `workspace/applications/tracker.md` — the application tracking funnel.
- `skills/` — the functional prompts/scripts for the agent.

---

## Context Discipline
Read only what the task needs.
*   **Stories**: To pick relevant STAR stories, read only the **roster line** (first line) of each story file in `library/context/stories/` to match competencies. Only open the full body of the selected stories. Skip `EXAMPLE-*.md` files.
*   **CV**: Read `master-cv.md` + the chosen story bodies, not the entire context directory.
