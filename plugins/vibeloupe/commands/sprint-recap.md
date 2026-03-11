---
description: Use when the user wants to understand what the team built or worked on recently, get a weekly summary of git activity, reconstruct the team's goals from recent commits, or produce a changelog from a product perspective. Triggers on phrases like "what did we ship this week", "sprint recap", "week in review", "summarize our commits", "what was the team working on", "what changed this week", "generate a changelog", "what did we build", "show me recent progress", or any request to understand recent engineering work through a user or product lens. Use this whenever someone asks about recent work or recent changes in a project — even if they don't say "sprint" or "git".
argument-hint: "[optional: time range, e.g. 'last 2 weeks' or 'since March 1']"
---

# Sprint Recap

A time range may be provided as arguments. If none, default to last 7 days.

**Arguments:** $ARGUMENTS

## Workflow

### 1. Bootstrap

Check if `.vibeloupe/sprints.json` exists in the working directory.
- **Does not exist:** create it now with `[]`. Continue.
- **Exists:** read it. Scan for patterns across prior sprints (e.g. repeated internally-focused weeks, recurring problem areas).

Check if `.vibeloupe/experiments.json` exists.
- **Does not exist:** note that no experiments exist. Continue.
- **Exists:** read it. Extract all experiments where `status` is `"untested"` or `"running"`. Keep them in context for step 5.

### 2. Gather data

Confirm you're in a git repo first. Run:

```bash
git log --since="7 days ago" --pretty=format:"%h %s"
git log --since="7 days ago" --pretty=format:"=== %h %s" --stat
git log --since="7 days ago" --pretty=format: --name-only | grep -v '^$' | sort | uniq -c | sort -rn | head -15
git log --since="7 days ago" --pretty=format:"%an" | sort | uniq -c | sort -rn
```

Substitute `--since` for any non-default time window. If zero commits, say so and offer to widen the range.

### 3. Classify and map

Classify each commit using the commit type table in the **sprint-recap** skill. Map the most-touched directories to user-facing product areas using the directory map in the skill.

### 4. Infer the problem being solved

Step back from individual commits. What underlying problem does this week's work suggest the team is solving? Use the inference methodology in the **sprint-recap** skill. Be direct — if the work looks internally focused, say so.

### 5. Cross-reference open experiments

If no open experiments exist, skip this step.

Compare the sprint's inferred problem and user-facing commits against each open experiment's hypothesis. Use the alignment methodology in the **sprint-recap** skill. Classify each as Advances, Tangential, or No connection — surface only Advances and stale No-connection entries (2+ weeks old).

### 6. Select and report

From New Feature and Bug Fix / Improvement commits only, pick the 3–5 most functionally significant. Output the report using the exact format from the **sprint-recap** skill.

### 7. Save

Append a record to `.vibeloupe/sprints.json` using the sprint schema from the **sprint-recap** skill. Read the file, parse the array, append, write back.
