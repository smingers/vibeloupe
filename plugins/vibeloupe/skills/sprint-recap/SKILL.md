---
name: sprint-recap
description: Use when the user wants to understand what the team built or worked on recently, get a weekly summary of git activity, reconstruct the team's goals from recent commits, or produce a changelog from a product perspective. Triggers on phrases like "what did we ship this week", "sprint recap", "week in review", "summarize our commits", "what was the team working on", "what changed this week", "generate a changelog", "what did we build", "show me recent progress", or any request to understand recent engineering work through a user or product lens. Use this whenever someone asks about recent work or recent changes in a project — even if they don't say "sprint" or "git".
version: 0.1.0
---

# Sprint Recap

Produce a short, factual report of what changed in the last 7 days of git history. Focus on user-facing changes only. Do not editorialize, infer impact, or list internal work.

## Voice

- State what changed, not whether it was good or why it matters
- No evaluative language: "significantly", "robust", "powerful", "greatly", "meaningfully"
- If you can't confirm something from the commit messages and diffs, don't assert it

## Bootstrap

Before doing anything else:

1. Check if `.vibeloupe/sprints.json` exists in the working directory.
   - **Does not exist:** Create `.vibeloupe/sprints.json` now with the content `[]`. Continue.
   - **Exists:** Read it. Scan prior sprint entries to detect patterns across weeks (e.g. repeated internally-focused sprints, recurring problem areas) before proceeding.

2. Check if `.vibeloupe/experiments.json` exists in the working directory.
   - **Does not exist:** Note that no experiments exist. Continue.
   - **Exists:** Read it. Extract all experiments where `status` is `"untested"` or `"running"` — these are the open experiments. Keep them in context for Phase 5.5.

## Process

### Phase 1 — Time window

Default: **last 7 days**. Honor any range the user specifies. Confirm you're in a git repo before proceeding.

### Phase 2 — Gather data

```bash
# Commit list
git log --since="7 days ago" --pretty=format:"%h %s"

# Per-commit file stats
git log --since="7 days ago" --pretty=format:"=== %h %s" --stat

# Most-touched files (no awk required)
git log --since="7 days ago" --pretty=format: --name-only | grep -v '^$' | sort | uniq -c | sort -rn | head -15

# Contributors
git log --since="7 days ago" --pretty=format:"%an" | sort | uniq -c | sort -rn
```

Substitute the correct `--since` value for any non-default time window. If zero commits, say so and offer to widen the range.

### Phase 3 — Classify commits

Assign each commit exactly one type. When the message is ambiguous, let the files changed decide.

| Type | Signals |
|---|---|
| **New Feature** | `feat:` prefix; new files in feature/component/route directories; new API endpoints |
| **Bug Fix / Improvement** | `fix:` prefix; targeted edits to existing behavior; error handling changes |
| **Refactor** | `refactor:`/`chore:` prefix; renames/moves; no new exports or routes |
| **Infra / Tooling** | `.github/`, build configs, `package.json`, `Dockerfile`, CI |
| **Docs** | Only `.md` or comment-only changes |
| **Automated** | Bot-generated commits (e.g. "Add forecast data from automated run") |

### Phase 4 — Identify user-facing areas

Look at which directories changed most and map them to product areas:

- `components/`, `pages/`, `views/`, `screens/` → UI
- `api/`, `routes/`, `endpoints/` → API surface
- `auth/`, `login/` → authentication
- `lib/`, `utils/`, `helpers/` → shared logic (user impact depends on callers)
- `.github/`, `scripts/`, `config/`, `test/` → no user impact

### Phase 5 — Infer the problem being solved

Step back from individual commits and look at the week as a whole. What underlying problem does this body of work suggest the team is trying to solve? This is an inference — make it, but own it as one.

Ask:
- What's the recurring theme across the most significant commits? (e.g. "the research pipeline can't access enough data", "parsing failures are causing silent errors", "the UI is hard to navigate")
- Is this problem primarily about **end-user value** (users get better outcomes, new capabilities, fewer frustrations) or primarily about **internal concerns** (code quality, developer experience, technical debt, reliability that users don't directly feel)?
- Is there a mismatch between the volume of work done and the user impact delivered? (e.g. a week of heavy refactoring with no user-facing output)

Be direct. If the work looks internally focused, say so. If the alignment to user value is strong, say so. If it's mixed, say that. Don't hedge into meaninglessness.

### Phase 5.5 — Cross-reference open experiments

If no open experiments exist, skip this phase entirely.

Compare the sprint's inferred problem (Phase 5) and its user-facing commits against each open experiment's `hypothesis` and `recommended_experiment`. This is a semantic match — you're looking for thematic overlap, not exact string matching.

For each open experiment, make exactly one of three calls:

- **Advances** — The sprint's work directly relates to what this experiment is testing. The shipped code could plausibly generate signal about whether the hypothesis is true or false.
- **Tangential** — The sprint touched the same product area but isn't testing the hypothesis directly.
- **No connection** — The sprint's work has no visible relationship to this experiment.

Only surface experiments rated **Advances** or experiments rated **No connection** where the experiment is more than 2 weeks old (stale and drifting). Skip tangential experiments from the output — they add noise.

Do not claim the sprint proved or disproved any hypothesis. Only note what work was done and whether it's the kind of work that would generate evidence.

### Phase 6 — Select what to report

From New Feature and Bug Fix / Improvement commits only, pick the **3–5 most functionally significant**. Drop the rest. Skip this entirely if there are no user-facing commits — just say so in the summary.

Write 1–2 sentences per item: what changed, factually. No file paths. No assumed outcomes.

## Output Format

```markdown
# Sprint Recap: [start] – [end]

## Summary
[2–3 sentences. What area of the product saw the most work this week?
Factual, no praise. If it was a maintenance-only week, say that.]

## What Problem Is The Team Solving?
[3–5 sentences. Infer the underlying problem from the pattern of commits — not what
they did, but what problem drove the work. Then assess: is this work aligned to
delivering end-user value, or is it primarily internal? Be direct. Flag a mismatch
if there is one — e.g. a week of heavy internal work with minimal user-facing output,
or a feature push that doesn't clearly connect to a user need.]

## New Features
- **[Name]**: [what it does, factually, 1–2 sentences]

## Bug Fixes & Improvements
- **[Name]**: [what changed, 1 sentence]

## Experiment Alignment
- **[experiment id]** — "[hypothesis, truncated to ~10 words]": [Advances / Drifting — 1 sentence explaining the connection or lack of one. If Advances, suggest running `/learn-loop reflect`.]

## By the Numbers
- **Time window**: [range]
- **Commits**: [N] ([note automated commits if present])
- **Contributors**: [names if ≤ 4, else "N contributors"]
- **User-facing vs. internal**: [split if estimable]
```

Omit **New Features** or **Bug Fixes & Improvements** if there's nothing in that category. Omit **Experiment Alignment** entirely if there are no open experiments. **By the Numbers** always appears. Target: under 600 words.

## Write to Data

After producing the recap, append the following record to `.vibeloupe/sprints.json`.

To do this: read the file, parse the JSON array, append the new object, write the file back.

```json
{
  "id": "sprint_[week start date as YYYYMMDD, e.g. 20260304]",
  "created_at": "[current ISO 8601 datetime]",
  "week_start": "[ISO date, e.g. 2026-03-04]",
  "week_end": "[ISO date, e.g. 2026-03-10]",
  "focus_area": "[which part of the product saw the most work]",
  "problem_inferred": "[1–2 sentence inference from Phase 5]",
  "user_facing_pct": "[integer 0–100, or null if not determinable]",
  "commit_count": "[integer]",
  "contributors": ["[name]", "..."],
  "linked_experiment_ids": ["[id of each experiment rated Advances in Phase 5.5]"]
}
```

## Rules

- No refactors, infra, or docs in the itemized sections — ever
- Max 4 New Features, max 3 Bug Fixes & Improvements
- No file paths outside of By the Numbers
- No causal claims ("this will improve X") — only observable changes
- A `feat:` commit that reorganizes code is a refactor, not a feature
- Never claim a sprint confirmed or invalidated a hypothesis — only note what work was done and whether it could generate evidence
