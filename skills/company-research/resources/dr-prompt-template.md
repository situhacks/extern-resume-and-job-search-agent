# Gemini Deep Research prompt template

Fill `{TARGET}` and hand to the user to run in Gemini Deep Research. Uses Google's recommended structure
(`<role>/<constraints>/<context>/<task>` with delimiters) — see `dr-best-practices.md` for why.

---

```
<role>
You are a research analyst preparing a management-consulting candidate to know {TARGET} cold for interviews
and to tailor their application.
</role>

<constraints>
- Prioritize the last ~12 months; flag anything older.
- Cite every claim with a source. Separate verified facts from your analysis.
- Flag thin or conflicting evidence explicitly — do not paper over gaps.
- No marketing fluff, no generic boilerplate, no filler. Useful and specific only.
</constraints>

<context>
The reader is a consulting-track candidate (not an investor). They need to (a) speak credibly about {TARGET}
in an interview and (b) aim their resume/cover letter at what {TARGET} actually values right now.
</context>

<task>
Produce a cited research brief of {TARGET}. Return EXACTLY these sections:

1. Say-this-in-the-interview — the 3-5 sharpest, most current things a candidate should know/say.
2. What they do — core business, how they make money, scale.
3. Recent strategy & news — moves, priorities, leadership statements (last ~12 months).
4. Competitive position — main competitors; where {TARGET} is strong vs. exposed.
5. Where they're investing — bets, growth areas, hiring focus.
6. (If {TARGET} is a market, not a firm) — size, growth, structure, key players, trends.
7. Sources — cited.
</task>
```

---

> When writing a DR prompt for something OTHER than a company research, keep the same `<role>/<constraints>/
> <context>/<task>` skeleton and the three must-adds (audience, what-NOT-to-include, explicit output format).
