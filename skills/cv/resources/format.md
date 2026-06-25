# CV format (one page)

Default to a clean, ATS-safe one-pager. The user can swap in their own format later.

The sections are a PALETTE — use the ones that apply, ordered to fit the candidate + JD. For a **student /
new-grad** (the typical user) lead with Education; for an experienced hire lead with Experience.

```
# {Name}
{email} · {phone} · {location} · {linkedin}

## Education            ← lead here for a student/new-grad
**{Degree}**, {School} — {location} · {expected/grad year}
- {GPA if >3.5} · {honors / scholarships}
- Relevant coursework: {JD-relevant courses}

## Experience
**{Role}**, {Company} — {location} · {dates}
- {action verb} {what} → {outcome/metric}
- {bullet}

## Leadership & Activities     ← clubs, exec roles, CASE COMPETITIONS, varsity (top-tier for consulting new-grads)
- **{role / competition}** — {what you did} → {result}

## Projects & Applied AI       ← independent builds / research; promote HIGH if the JD values it
- **{project}** — {what it does} → {outcome}

## Skills
{comma-separated, JD-relevant first} · {certifications} · {languages / interests}
```

Rules:
- **Section order is not fixed** — lead with what fits. Student/new-grad → **Education first**, then Experience,
  Leadership/Activities, Projects, Skills. Experienced hire → Experience first, Education lower. AI-heavy JD →
  promote Projects/Applied AI high. Use only the sections the candidate actually has; don't invent one to fill space.
- Reverse chronological within Experience. Strongest, most JD-relevant bullets first.
- Every bullet = action + result. Quantify when possible.
- No tables, text boxes, images, or columns (ATS-safe).
- One page (US default — cut the weakest bullets first). Canadian roles may run 1–2 pages with real tenure; don't pad. (`ats.md`)

> This file governs CONTENT and structure (markdown). Final visual styling is handled by `doc-export`, which
> pours the finished markdown into an ATS-safe, one-page HTML template (a reference palette of these same
> sections) the student prints to PDF.
