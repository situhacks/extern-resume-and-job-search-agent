<!-- One folder per job application. Folders hold the ARTIFACTS; `tracker.md` holds the STATE. Clean split:
the folder is the job's fixed facts + deliverables, the tracker is where each application stands. No field of
state lives in both, so nothing drifts. -->

# Applications

Empty until you apply to something. Each job gets ONE flat folder named **`{company}-{role}`**, plus one shared
`tracker.md` (the funnel over all of them — see `tracker.EXAMPLE.md` and the `application-tracker` skill).

The folder is **`{company}-{role}`**, not just `{company}`, so the same firm's different roles never collide
(`mckinsey-business-analyst` vs. `mckinsey-summer-analyst`).

```
{company}-{role}/
├── application.md          # FIXED FACTS only: company, role, location, posting_url, saved_date, + verbatim JD
├── research-brief-v1.md    # company-research output (optional, "know the firm")
├── cv-v1.md                # tailored CV — iterate as flat versions (cv-v2.md, …) when worth keeping
├── cover-letter-v1.md      # tailored cover letter — same versioning
├── cv-v1.pdf  (+ .html)    # rendered by doc-export for the version you finalize (auto-rendered to PDF)
└── cover-letter-v1.pdf (+ .html)
```

**Flat, not nested** — no stage subfolders. **Versioning:** files start at `v1`; bump to `v2`/`v3` only for a
distinct draft worth keeping (the versioned files *are* the history). `doc-export` renders HTML+PDF only for the
version you finalize.

**State (stage, deadline, next action, shipped version) lives in `tracker.md`, not here** — the folder never
carries pipeline status. Start one by saying "tailor my resume to this JD" (paste the JD) — the `cv` skill
creates the folder and the tracker row.

See `EXAMPLE-meridian-business-analyst/` for a complete worked example (JD → research → tailored CV + cover letter → rendered PDF)
using a fictional firm and placeholder candidate. It shows the full pipeline and the quality bar.
