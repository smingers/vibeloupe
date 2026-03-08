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

### Phase 5 — Select what to report

From New Feature and Bug Fix / Improvement commits only, pick the **3–5 most functionally significant**. Drop the rest. Skip this entirely if there are no user-facing commits — just say so in the summary.

Write 1–2 sentences per item: what changed, factually. No file paths. No assumed outcomes.

## Output Format

```markdown
# Sprint Recap: [start] – [end]

## Summary
[2–3 sentences. What area of the product saw the most work this week?
Factual, no praise. If it was a maintenance-only week, say that.]

## New Features
- **[Name]**: [what it does, factually, 1–2 sentences]

## Bug Fixes & Improvements
- **[Name]**: [what changed, 1 sentence]

## By the Numbers
- **Time window**: [range]
- **Commits**: [N] ([note automated commits if present])
- **Contributors**: [names if ≤ 4, else "N contributors"]
- **User-facing vs. internal**: [split if estimable]
```

Omit **New Features** or **Bug Fixes & Improvements** if there's nothing in that category. **By the Numbers** always appears. Total report: under 350 words.

## Rules

- No refactors, infra, or docs in the itemized sections — ever
- Max 4 New Features, max 3 Bug Fixes & Improvements
- No file paths outside of By the Numbers
- No causal claims ("this will improve X") — only observable changes
- A `feat:` commit that reorganizes code is a refactor, not a feature
