---
description: Run a weekly Build-Measure-Learn session. Plans this week's learning experiments with falsifiable hypotheses and pass/fail criteria, or debriefs last week's results and captures what actually changed in your beliefs. Reads and writes .vibeloupe/experiments.json.
argument-hint: "[Optional: 'plan' to start a planning session, 'reflect' to start a reflection session, or leave blank to auto-detect]"
---

Read `../skills/learn-loop/references/reflection-framework.md` in full before proceeding.

Your input is: $ARGUMENTS

**Begin immediately.** Detect mode and open the session — do not describe what you're about to do, do not ask permission.

## Workflow

### 1. Bootstrap

Check if `.vibeloupe/experiments.json` exists in the working directory.
- **Does not exist:** create it now with `[]`. Enter Planning mode.
- **Exists:** read it and detect mode:
  - Empty array → Planning mode
  - Experiments with `week_of` = current week and `status: "untested"` → Reflection mode
  - Experiments with `week_of` = current week and `result` not null → Ask: "Your experiments for this week look complete. Plan next week, or revisit this week's learnings?"
  - Experiments from past weeks, none for current week → Planning mode
  - `$ARGUMENTS` contains "plan" or "reflect" explicitly → honor it regardless of file state

### 2. Planning mode

1. Open immediately with: "Let's plan this week's experiments. What are the most important things you want to learn or test this week? Give me 1 to 3 — if one bet is big enough to own the week, that's fine." Wait for their response.
2. For each goal, work conversationally: sharpen it into a falsifiable hypothesis, define the minimum test, set pass/fail criteria, get a time estimate. Use the planning methodology in the **learn-loop** skill.
3. After all experiments are defined: surface the one upstream assumption that, if wrong, makes all of them moot.
4. Output the weekly plan using the planning session format from the **learn-loop** skill.
5. Save to `.vibeloupe/experiments.json`: briefly explain what the file is, then append one record per experiment using the experiment schema from the **learn-loop** skill. Read the file, parse the array, append, write back.

### 3. Reflection mode

1. Open immediately: read this week's experiments from `.vibeloupe/experiments.json` (filter by `week_of` = current week) and restate all planned hypotheses for the user verbatim. Do not paraphrase or soften. Do not ask "shall we begin?" — begin.
2. For each experiment in sequence: did they run it? If not — why? (Log it — skipped experiments are signal.) What did they observe specifically? Does it confirm, challenge, or complicate the hypothesis? What's the updated belief?
3. After all experiments: ask for the single most important learning this week — what they now believe that they didn't before.
4. Give a carry/pivot/abandon verdict for each thread.
5. If experiments span 3+ weeks, check for cross-week patterns and surface any you find.
6. Output results using the reflection session format from the **learn-loop** skill.
7. Update `.vibeloupe/experiments.json`: find each experiment by `id`, update the result fields using the reflection schema from the **learn-loop** skill. Read the file, update matching records in-place, write back.

## Rules

- Never generate the user's learning goals — their goals must come from them; your job is to sharpen them
- Never skip pass/fail criteria — a hypothesis without a falsification condition is a wish, not a test
- If an experiment was skipped, log why — skipped experiments are signal, not blank space
- If the user's "learning" contains no new evidence: "That's your prior belief restated. What did you actually observe?"
- Do not ask all questions at once — debrief each experiment before moving to the next
- Always write to `.vibeloupe/experiments.json` at the end of the session — an unlogged session didn't happen
- Reflection must reference the original hypothesis exactly as written, not a softened version
