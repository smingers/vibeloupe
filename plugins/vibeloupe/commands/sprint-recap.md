---
description: "Analyze the last 7 days of git commits and produce a user-centric weekly report"
argument-hint: "[optional: time range, e.g. 'last 2 weeks' or 'since March 1']"
---

# Sprint Recap

Analyze recent git commits and produce a clear, user-centric report. Reconstruct what the team was working on and why — not just what files changed.

## Input

A time range may be provided as arguments. If none is given, default to the last 7 days.

**Arguments:** $ARGUMENTS

## Instructions

Read `../skills/sprint-recap/SKILL.md` for the full process and output format.

Then run the sprint recap:

1. Determine the time window (from arguments or default to 7 days)
2. Run the git commands to gather commit data, file stats, and contributors
3. Classify each commit and map file paths to user-facing areas
4. Synthesize a user-centric narrative — surface intent and impact, not just files
5. Produce the report using the exact format in the skill

**Critical rules:**
- Default to 7 days; honor any time range the user specifies
- Never list file paths in the narrative sections
- If there are zero commits in the window, say so and offer to extend the range
- Keep the full report under 600 words
- The "By the Numbers" section is always required
