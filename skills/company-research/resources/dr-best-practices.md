# Gemini Deep Research — prompt best practices

This system has the user run Deep Research themselves (no API). A well-shaped prompt is the difference between
a useful report and a vague one. Apply these when writing ANY Deep Research prompt for the user to run.
(Distilled from Google's official prompt-design guidance — ai.google.dev/gemini-api/docs/prompting-strategies.)

## The structure Google recommends (use XML-style tags as delimiters)

```
<role>      who the model should be (e.g. "a research analyst preparing a consulting candidate")
<constraints>  rules + limits: recency window, what to do, what NOT to do, citation requirement
<context>   background it needs: who it's for, why, any known facts
<task>      the specific request + the exact output structure (sections/format)
```

## The three things to always add
1. **A specific audience** — who the output is for ("a consulting candidate prepping interviews") → it pitches right.
2. **A constraint on what NOT to include** — e.g. "no marketing fluff, no generic boilerplate" → cuts noise.
3. **An explicit output format** — name the sections you want back → you get a usable shape, not an essay.

## Other principles
- Be specific about scope: timeframe, geography, citation style.
- Say what would make the answer wrong / what to flag (thin or conflicting evidence).
- Start direct; only add complexity if the first result misses.
- For a big ask, break it into sections (the template already does this).

## Why it matters here
A consulting candidate using a sloppy "tell me about McKinsey" prompt gets a Wikipedia summary. The structured
version gets cited, current, interview-ready angles. Same tool — the prompt is the skill.
