---
name: sprint-recap
description: Use when the user wants to understand what the team built or worked on recently, get a weekly summary of git activity, reconstruct the team's goals from recent commits, or produce a changelog from a product perspective. Triggers on phrases like "what did we ship this week", "sprint recap", "week in review", "summarize our commits", "what was the team working on", "what changed this week", "generate a changelog", "what did we build", "show me recent progress", or any request to understand recent engineering work through a user or product lens. Use this whenever someone asks about recent work or recent changes in a project — even if they don't say "sprint" or "git".
version: 0.2.12
---

# Sprint Recap

## Voice

- State what changed, not whether it was good or why it matters
- No evaluative language: "significantly", "robust", "powerful", "greatly", "meaningfully"
- If you can't confirm something from commit messages and diffs, don't assert it

## Commit Classification

Assign each commit exactly one type. When the message is ambiguous, let the files changed decide.

| Type | Signals |
|---|---|
| **New Feature** | `feat:` prefix; new files in feature/component/route directories; new API endpoints |
| **Bug Fix / Improvement** | `fix:` prefix; targeted edits to existing behavior; error handling changes |
| **Refactor** | `refactor:`/`chore:` prefix; renames/moves; no new exports or routes |
| **Infra / Tooling** | `.github/`, build configs, `package.json`, `Dockerfile`, CI |
| **Docs** | Only `.md` or comment-only changes |
| **Automated** | Bot-generated commits |

## Directory → Product Area Map

- `components/`, `pages/`, `views/`, `screens/` → UI
- `api/`, `routes/`, `endpoints/` → API surface
- `auth/`, `login/` → authentication
- `lib/`, `utils/`, `helpers/` → shared logic (user impact depends on callers)
- `.github/`, `scripts/`, `config/`, `test/` → no user impact

## Problem Inference Methodology

Look at the week as a whole. Ask:
- What's the recurring theme across the most significant commits?
- Is this primarily about **end-user value** or **internal concerns**?
- Is there a mismatch between volume of work done and user impact delivered?

Be direct. If the work looks internally focused, say so. Don't hedge.

## Experiment Alignment Methodology

Compare the sprint's inferred problem and user-facing commits against each open experiment's `hypothesis` and `recommended_experiment`. Semantic match — thematic overlap, not string matching.

**Three-way classification:**
- **Advances** — The sprint's work directly relates to what this experiment is testing. The shipped code could plausibly generate signal about whether the hypothesis is true or false.
- **Tangential** — The sprint touched the same product area but isn't testing the hypothesis directly.
- **No connection** — The sprint's work has no visible relationship to this experiment.

Surface only **Advances** and **No connection** entries where the experiment is more than 2 weeks old (stale and drifting). Skip Tangential — it's noise.

Never claim the sprint confirmed or invalidated a hypothesis. Only note what was done and whether it could generate evidence.

## Output Format

```markdown
# Sprint Recap: [start] – [end]

## Summary
[2–3 sentences. What area saw the most work? Factual, no praise.]

## What Problem Is The Team Solving?
[3–5 sentences. Infer the underlying problem. Assess user-facing vs. internal alignment. Be direct.]

## New Features
- **[Name]**: [what it does, factually, 1–2 sentences]

## Bug Fixes & Improvements
- **[Name]**: [what changed, 1 sentence]

## Experiment Alignment
- **[experiment id]** — "[hypothesis, ~10 words]": [Advances / Drifting — 1 sentence. If Advances, suggest /learn-loop reflect.]

## By the Numbers
- **Time window**: [range]
- **Commits**: [N] ([note automated commits if present])
- **Contributors**: [names if ≤ 4, else "N contributors"]
- **User-facing vs. internal**: [split if estimable]
```

Omit **New Features**, **Bug Fixes & Improvements**, or **Experiment Alignment** if empty. **By the Numbers** always appears. Target: under 600 words.

## Sprint Schema

```json
{
  "id": "sprint_[week start date as YYYYMMDD, e.g. 20260304]",
  "created_at": "[ISO 8601 datetime]",
  "week_start": "[ISO date, e.g. 2026-03-04]",
  "week_end": "[ISO date, e.g. 2026-03-10]",
  "focus_area": "[which part of the product saw the most work]",
  "problem_inferred": "[1–2 sentence inference]",
  "user_facing_pct": "[integer 0–100, or null if not determinable]",
  "commit_count": "[integer]",
  "contributors": ["[name]", "..."],
  "linked_experiment_ids": ["[id of each experiment rated Advances]"]
}
```

## Rules

- No refactors, infra, or docs in the itemized sections — ever
- Max 4 New Features, max 3 Bug Fixes & Improvements
- No file paths outside of By the Numbers
- No causal claims — only observable changes
- A `feat:` commit that reorganizes code is a refactor, not a feature
- Never claim a sprint confirmed or invalidated a hypothesis — only note what was done and whether it could generate evidence
