// Generate Priya Raman example CV + cover letter as proper .docx via docx-js (per the docx skill).
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  TabStopType, TabStopPosition, LevelFormat, HeadingLevel
} = require("docx");

const CP = "C:\\Obsidian Vaults\\AgentFrame Consulting Prep";

// US Letter, 0.5" margins (tight, full-width — like a real one-pager)
const PAGE = { size: { width: 12240, height: 15840 }, margin: { top: 720, right: 720, bottom: 720, left: 720 } };
const FONT = "Calibri";

function name(t) {
  return new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: t, bold: true, size: 40, font: FONT })] });
}
function contact(t) {
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: t, size: 18, font: FONT })] });
}
function section(t) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 1 } },
    children: [new TextRun({ text: t.toUpperCase(), bold: true, size: 22, font: FONT })],
  });
}
// role line: bold title (left)  + dates (right, tab)
function role(title, dates) {
  return new Paragraph({
    spacing: { before: 80, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: title, bold: true, size: 20, font: FONT }),
      new TextRun({ text: "\t" + dates, size: 20, font: FONT }),
    ],
  });
}
function sub(t) {
  return new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: t, italics: true, size: 20, font: FONT })] });
}
function bullet(t) {
  return new Paragraph({ numbering: { reference: "b", level: 0 }, spacing: { after: 0 }, children: [new TextRun({ text: t, size: 20, font: FONT })] });
}
function line(t) {
  return new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: t, size: 20, font: FONT })] });
}

const numbering = {
  config: [{
    reference: "b",
    levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraphProperties: { indent: { left: 260, hanging: 160 } } } }],
  }],
};

// ---------- CV ----------
const cv = new Document({
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  numbering,
  sections: [{ properties: { page: PAGE }, children: [
    name("Priya Raman"),
    contact("priya.raman@email.com  |  linkedin.com/in/priyaraman  |  (416) 555-0142  |  Toronto, ON"),

    section("Work Experience"),
    role("Rotman Commerce Consulting Group (student-run) — Toronto, ON", "Sept 2025 – Present"),
    sub("Project Lead"),
    bullet("Led the market-sizing and competitor workstream on a market-entry engagement for a regional food-delivery startup; built the bottoms-up demand model that anchored the final recommendation."),
    bullet("Ran 10 customer and operator interviews and distilled them into 4 prioritized opportunities the client acted on."),
    bullet("Managed two junior analysts and presented the recommendation to the client's founding team."),
    role("Sobeys — Supply Chain Analyst Intern — Mississauga, ON", "Summer 2025"),
    bullet("Analyzed distribution-centre throughput across 3 regions, isolated the slowest hand-off, and proposed a routing change projected to cut average lead time ~12%."),
    bullet("Built a Tableau dashboard regional managers used in their weekly operations review; wrote the SQL behind it."),

    section("Projects & Leadership"),
    bullet("Case Competition Circuit — top-4 at two national undergraduate case competitions; led the quantitative section (market sizing + profitability) both times."),
    bullet("AI-for-Research mini-project — built a small AI workflow that produces cited company teardowns for case prep; wrote it up for my cohort."),

    section("Education"),
    role("University of Toronto — Rotman Commerce — Toronto, ON", "Expected 2027"),
    sub("Bachelor of Commerce, Specialist in Finance & Economics"),
    bullet("Dean's List (2024, 2025) · National case competition finalist x2 · Entrance Scholarship"),

    section("Skills"),
    line("Analysis: market sizing, financial modeling, Excel, SQL, Tableau"),
    line("Frameworks: MECE, issue trees, profitability, market entry, 3C/4P"),
    line("AI: Claude, ChatGPT, Perplexity, NotebookLM"),
  ]}],
});

// ---------- Cover letter ----------
function para(t) { return new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: t, size: 21, font: FONT })] }); }
const cl = new Document({
  styles: { default: { document: { run: { font: FONT, size: 21 } } } },
  sections: [{ properties: { page: { size: PAGE.size, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } }, children: [
    name("Priya Raman"),
    new Paragraph({ spacing: { after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 1 } },
      children: [new TextRun({ text: "priya.raman@email.com  |  linkedin.com/in/priyaraman  |  (416) 555-0142", size: 18, font: FONT })] }),
    para("Meridian & Co. — Strategy & Operations"),
    para("To the Meridian team,"),
    para("The slides that survive a consulting engagement are the ones someone owned all the way through, and that ownership is the part of Meridian's analyst role that made me apply. You staff analysts on real workstreams, not just deck cleanup."),
    para("I've done that at a smaller scale. On a market-entry project for a food-delivery startup, I owned the market-sizing workstream end to end: I built the bottoms-up demand model, ran the customer interviews, and built the slide the recommendation rested on. It held up when our advisor pushed on it, because I'd built the number from the ground up rather than borrowing one."),
    para("I also try to use AI the way a good analyst should, as a tool I check rather than trust blindly. I built a small workflow that produces cited company teardowns for case prep, and the habit it taught me is to make the model show its sources and challenge its own logic. That's the posture I'd want on a client team moving fast with new tools."),
    para("I'd be glad to bring that to Meridian's operations work. Happy to chat whenever works."),
    para("Thanks,"),
    new Paragraph({ children: [new TextRun({ text: "Priya Raman", size: 21, font: FONT })] }),
  ]}],
});

// Fallback-path demo only (Path C). The default export is HTML→PDF; this just shows the docx-js helper.
const out = CP + "\\workspace\\applications\\EXAMPLE-meridian-business-analyst\\";
Packer.toBuffer(cv).then(b => { fs.writeFileSync(out + "cv-v1.docx", b); console.log("wrote cv-v1.docx"); });
Packer.toBuffer(cl).then(b => { fs.writeFileSync(out + "cover-letter-v1.docx", b); console.log("wrote cover-letter-v1.docx"); });
