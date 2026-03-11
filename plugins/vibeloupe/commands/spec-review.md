---
description: "Analyze any plan, idea doc, or strategy with sharp opinionated feedback — then surface the hypotheses worth testing this week"
argument-hint: "[paste your plan, idea, or doc — or leave blank to be prompted]"
---

Read `../skills/spec-review/references/analytical-framework.md` in full before proceeding.

The plan or document to analyze: $ARGUMENTS

If nothing was provided, ask the user to paste their plan before proceeding.

## Workflow

### 1. Bootstrap

Check if `.vibeloupe/prd-reviews.json` exists in the working directory.
- **Does not exist:** create it now with `[]`. Continue.
- **Exists:** read it. If the same team or product area appears in prior reviews, note any recurring weaknesses before proceeding.

### 2. Analyze

Work through all 8 lenses in order using the frameworks in the **spec-review** skill and the analytical framework reference. Complete all 8 lenses before writing any output.

1. Argument Chain Analysis
2. Jobs to Be Done Reframe
3. Hidden Assumptions Audit
4. Motivated Reasoning Flags
5. Conviction vs. Evidence Check
6. Moonshot Alternatives
7. Pre-Mortem
8. Top 3 Recommendations

### 3. Output

Produce the analysis using the exact output headers from the **spec-review** skill. Target 800–1200 words. A strong plan earns a shorter analysis.

### 4. Save and follow up

Append a record to `.vibeloupe/prd-reviews.json` using the PRD review schema from the **spec-review** skill. Read the file, parse the array, append, write back.

Then ask: "Want to save the riskiest assumption to `.vibeloupe/experiments.json` as this week's experiment? Or run /hypothesis-validator on it first to build a full test plan?" If yes, append an experiment record using the experiment schema from the **hypothesis-validator** skill, with `created_by` set to `"spec-review"`.

## Rules

- Never comment on formatting or template compliance
- Never rewrite sections — identify weakness, don't fix it
- Every insight must pass: "Would this change what the person does this week?" If not, cut it
- Do not invent percentages — use the document's own numbers against it
- If a section has no issues, say so briefly and move on
