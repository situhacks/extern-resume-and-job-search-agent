---
name: verifier
description: Evaluates and scores the candidate's tailored resume and cover letter against strict HackerRank-style standards and scans for generic AI tells, writing a detailed verification report.
---

# Verifier Skill

Use this skill when the user asks to "verify my resume", "score my CV", "audit my cover letter", or check their materials against a target job description. This acts as a strict pre-submission screen (mock ATS review) to optimize metrics and remove typical red flags.

---

## 1. Resume Verification & Scoring Rubric

Evaluate the resume (`cv-v1.md` or `master-cv.md`) on a **100-point scale** across four distinct categories. **All four categories must be scored.**

### Category Scores (Max 100)

1.  **Open Source & Community (0-35 points)**:
    *   **High (25-35 pts)**: Active, merged contributions to popular third-party projects (1000+ stars), or participation in Google Summer of Code (GSoC) or Outreachy.
    *   **Medium (15-24 pts)**: Contributions to smaller open-source projects, or an active GitHub presence showing ongoing community interactions.
    *   **Low (5-10 pts)**: Candidate has personal repositories but has **not** contributed to other people's or organization's repositories.
    *   **Very Low (0-4 pts)**: No GitHub/GitLab link, or only basic tutorial forks.
    *   *Rule*: If the candidate only has personal GitHub repos and zero contributions to other projects, their Open Source score **cannot exceed 10 points**.
2.  **Self Projects Complexity (0-30 points)**:
    *   **High (20-30 pts)**: Advanced architecture (full-stack, multiple technologies, authentication, databases, real-time sync, microservices, or deployed AI models) with actual user adoption or live links.
    *   **Medium (10-19 pts)**: Projects with moderate technical challenge (multiple features, good structure, and documentation).
    *   **Low (1-9 pts)**: Simple tutorial-based projects (e.g., Todo lists, calculators, basic CRUD apps, weather widgets, note-taking apps, generic sentiment analysis, recipe lists).
    *   *Rule*: Tutorial projects and basic CRUD apps receive low scores (under 10 points).
3.  **Production Experience (0-25 points)**:
    *   Evaluate internships, volunteer software work, or freelance projects. Look for professional metrics (latency reduced, users served, revenue generated, costs saved).
    *   *Special Consideration*: Award extra points for startup founder/co-founder or early engineer (first 10-20 employees) experience, demonstrating initiative and building from scratch.
4.  **Technical Skills Alignment (0-10 points)**:
    *   Depth and breadth of technical stack matching the target job description (e.g., strong algorithms, database management, cloud hosting).

### Bonuses (Max 20 points total)
*   `+5` points: Google Summer of Code (GSoC) participation.
*   `+3` points: Girl Script Summer of Code participation.
*   `+3 to +5` points: Startup founder or co-founder experience.
*   `+2 to +3` points: Early-stage startup engineer experience (first 20 employees).
*   `+2` points: Portfolio website link (e.g., in contact details).
*   `+1` point: Active LinkedIn profile link.
*   `+1 to +3` points: High-quality technical blog posts.

### Deductions (Negative points)
*   `-2 to -5` points: Resume contains only simple tutorial/classroom projects.
*   `-1 to -3` points: For each additional simple tutorial project beyond the first.
*   `-1` point: Generic project names (e.g. naming a project "Calculator" or "Todo App").
*   `-3 to -5` points: For each project that has **no links** (no GitHub link, no live demo URL).
*   `-2 to -3` points: Projects with only a GitHub repository but no live deployment/demo URL.
*   `-1 to -2` points: Broken or inactive links.
*   `-3` points: If GitHub data shows only single-contributor personal projects but open source is claimed as a strength.

---

## 2. Cover Letter Audit Rubric

Verify the cover letter (`cover-letter-v1.md`) for professional polish, brevity, and AI tells.

### A. Generic AI Tells (MANDATORY Check)
Flag any usage of these classic AI phrases and demand they be rewritten:
*   "delve" / "delving"
*   "testament to"
*   "excited to apply" / "thrilled to express interest"
*   "unique blend of skills" / "proven track record"
*   "passion for innovation" / "passion for excellence"
*   "in conclusion" / "furthermore" / "moreover" / "ultimately"
*   "beacon" / "catalyst" / "harnessing" / "leveraging"
*   "please do not hesitate to contact me"

### B. Formatting & Structure
*   **Brevity**: Must fit on exactly **one page** (roughly 250-400 words maximum). Deduct points if it rambles.
*   **Structure**: Clean header, formal greeting, 3-4 paragraphs (Hook, Technical Story, Alignment/Value Add, CTA), and sign-off.
*   **Alignment**: The letter must directly connect a specific story from `library/context/stories/` to the company's core challenges.

---

## 3. Workflow for Running the Verifier

1.  Locate the application folder: `workspace/applications/{company}-{role}/`.
2.  Read the Job Description (`jd.md` or `application.md`) and the tailored files (`cv-v1.md` and/or `cover-letter-v1.md`).
3.  Execute the audit:
    *   Calculate the resume score out of 100 based on the rubric, summing categories, applying bonuses, and subtracting deductions. The final overall score **cannot exceed 120 points**.
    *   Scan the cover letter for word count, page length, formatting, and the list of prohibited AI tells.
4.  Write the verification report files to the job folder:
    *   For resumes: `cv-verification-report.md`
    *   For cover letters: `cover-letter-verification-report.md`

### Markdown Output Template

Use this format to write the reports so the user can easily see their score and actionable improvements:

```markdown
# 🔍 ATS Audit & Verification Report: [Resume / Cover Letter]
**Target Role**: [Role] at [Company]
**Date**: [Date]

## 🎯 Overall Score: X / 100
> *Target threshold for submission is 80+. If your score is below 80, address the deductions listed below.*

| Category | Score | Max | Evidence & Observations |
| :--- | :---: | :---: | :--- |
| **Open Source & Community** | X | 35 | ... |
| **Self Projects Complexity** | X | 30 | ... |
| **Production Experience** | X | 25 | ... |
| **Technical Skills Alignment** | X | 10 | ... |
| **Bonus Points** | +X | 20 | ... |
| **Deductions** | -X | - | ... |

---

## ⚠️ Deductions & Red Flags Identified
*   **[-X pts]** [Reason, e.g., Missing link for project 'X'] — *How to fix*: [Actionable fix].
*   **[-X pts]** [Reason, e.g., Tutorial project 'Calculator' listed] — *How to fix*: [Actionable fix].

## ⭐ Bonuses Earned
*   **[+X pts]** [Reason, e.g., GSoC participant or working live URL].

---

## ✅ Key Strengths
1. [Strength 1]
2. [Strength 2]

## 🔧 Critical Fixes Required (To hit 80+ / 100)
1. **Fix Project Links**: Add GitHub links or host the live demos (e.g. on Vercel/Render).
2. **Upgrade Project Depth**: Swap out the generic tutorial project for a complex full-stack app.
3. **Remove AI Tells**: (For cover letters) Replace terms like "delve" or "excited to apply".
```
