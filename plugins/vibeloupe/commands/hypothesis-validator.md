---
description: Validate a problem or solution hypothesis with a rigorous, opinionated test plan. Guides you from raw idea to the cheapest experiment that could kill it.
argument-hint: "[Your idea, problem, or hypothesis — as much or as little detail as you have]"
---

Read `../skills/hypothesis-validator/references/validation-framework.md` in full before proceeding.

Your input is: $ARGUMENTS

## Workflow

### 1. Bootstrap

Check if `.vibeloupe/experiments.json` exists in the working directory.
- **Does not exist:** create it now with `[]`. Continue.
- **Exists:** read it. If prior experiments touch the same problem space or customer segment, surface that context before proceeding.

### 2. Parse the input

Scan `$ARGUMENTS` for the five signal dimensions (problem, customer, solution, evidence, stakes) described in the validation framework.

### 3. Clarify if needed

- **4–5 dimensions present:** skip to step 4.
- **2–3 present:** ask only about the gaps — max 3 questions. Wait for the response before continuing.
- **0–1 present:** ask 4–5 targeted questions from the question bank in the validation framework. Wait for the response.

Never ask about dimensions already answered in the input.

### 4. Crystallize the hypothesis

Restate what the user is trying to prove in precise, falsifiable form using the hypothesis templates in the **hypothesis-validator** skill. Surface the top 2–3 riskiest assumptions using the risk scoring method in the skill. Only surface assumptions with a risk score of 4 or higher.

If the user is testing a solution before the problem is validated, say so and reorder.

### 5. Output the test plan

Produce the test plan using the exact output headers from the **hypothesis-validator** skill. Pick one recommended first experiment — argue for it specifically. For any experiment involving customer interviews, include Mom Test coaching from the validation framework.

### 6. Save the experiment

Ask: "Want me to save Experiment 1 to `.vibeloupe/experiments.json`? Or load the full test sequence as a multi-week plan?"

If yes: briefly explain that `.vibeloupe/experiments.json` is the structured experiment record that all vibeloupe skills share — a file write request will appear. Then append one record per experiment using the experiment schema from the **hypothesis-validator** skill. Read the file, parse the array, append, write back.
