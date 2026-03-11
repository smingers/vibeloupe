# Vibeloupe Gap Analysis

Comparison of vibeloupe's current design and implementation against Anthropic's official skills guide.

Last reviewed: 2026-03-11 against *The Complete Guide to Building Skills for Claude* (Anthropic, January 2026).

---

## Summary

Vibeloupe is structurally sound in most respects — naming conventions, progressive disclosure via `references/`, and description quality are all good. The three significant gaps are:

1. **The `commands/` architecture is non-standard** — Anthropic's guide has no concept of separate command files; workflow should live in SKILL.md body
2. **YAML frontmatter uses a non-standard `version` field** — should be nested under `metadata:`
3. **No formal testing infrastructure** — no trigger test suite, no functional test cases

---

## Detailed gaps

### 1. The commands/ directory is not part of the official spec

**Current design:**
```
plugins/vibeloupe/
  skills/[name]/SKILL.md      ← pure reference (persona, frameworks, schemas)
  commands/[name].md          ← workflow orchestration (bootstrap + steps + write)
```

**Official spec:**
The guide describes exactly one file per skill: `SKILL.md`. There is no `commands/` concept. The skill body (level 2 of progressive disclosure) is where workflow steps live:

```markdown
---
name: learn-loop
description: [...]
---

# Learn Loop

## Instructions

### Step 1: Bootstrap
Check for .vibeloupe/experiments.json...

### Step 2: ...
```

**What the vibeloupe architecture gets right:**
The split was motivated by the Anthropic `knowledge-work-plugins` repo, which does appear to have a 1:1 commands-to-skills correspondence. The separation of workflow (commands) from reference material (skills) is a coherent pattern. The content itself is well-organized.

**The real risk:**
Commands files (`.md` in `commands/`) may not be loaded by Claude at all as part of the skill's progressive disclosure hierarchy. The guide is explicit: SKILL.md body is level 2; linked files in the skill folder are level 3. A `commands/` folder outside the skill folder is outside this hierarchy entirely. Claude may be executing commands because they're loaded as separate context (e.g., as project-level instructions), not because of the skill system.

**Recommendation:**
Two viable paths:

Option A (conservative): Merge each command into its corresponding SKILL.md body. The SKILL.md becomes: frontmatter + workflow steps + reference links. This fully aligns with the official spec.

Option B (keep split, verify): Confirm empirically that commands are loaded and followed as expected. If the system is working because Claude Code loads all `.md` files in the project as context, the architecture may be incidentally functional but fragile and non-portable. Document the dependency.

The official guide's recommendation (SKILL.md contains the workflow) is the safer path.

---

### 2. YAML frontmatter: version is a top-level field

**Current:**
```yaml
---
name: sprint-recap
description: Use when the user wants to understand...
version: 0.2.12
---
```

**Official spec:**
Custom fields like `version` and `author` belong inside a `metadata:` block:

```yaml
---
name: sprint-recap
description: Use when the user wants to understand...
metadata:
  version: 0.2.12
  author: Jordan Berman
---
```

Top-level YAML fields other than `name`, `description`, `license`, `compatibility`, and `allowed-tools` are not in the spec. They may be ignored, parsed incorrectly, or cause issues in future skill validators.

**Impact:** Currently functional but technically non-conformant. Version bumping via the pre-commit hook would need to be updated to write `metadata.version` instead of top-level `version`.

**Recommendation:** Move `version` under `metadata:`. Update the pre-commit hook sed command accordingly. While there, add `metadata.author: Jordan Berman` for proper attribution.

---

### 3. Description length approaching 1024-character limit

**Current (sprint-recap):**
```
Use when the user wants to understand what the team built or worked on
recently, get a weekly summary of git activity, reconstruct the team's
goals from recent commits, or produce a changelog from a product
perspective. Triggers on phrases like "what did we ship this week",
"sprint recap", "week in review", "summarize our commits", "what was
the team working on", "what changed this week", "generate a changelog",
"what did we build", "show me recent progress", or any request to
understand recent engineering work through a user or product lens. Use
this whenever someone asks about recent work or recent changes in a
project — even if they don't say "sprint" or "git".
```

This is approximately 700 characters — within the 1024-character limit, but on the longer end.

**What's good:** The descriptions are specific, include many trigger phrases, and follow the WHAT + WHEN structure correctly. They avoid the common failure modes (too vague, missing triggers).

**Watch:** The `hypothesis-validator` and `learn-loop` descriptions are similarly long. Monitor for truncation issues. The guide does not recommend maximizing description length — it recommends just enough for Claude to know when to load the skill.

**Recommendation:** No immediate action required. If undertriggering is observed, add keywords. If descriptions grow further, trim redundant trigger phrases.

---

### 4. No testing infrastructure

**Current state:** No formal test suite. Testing has been manual and reactive (run the skill, observe behavior, debug when broken).

**Official recommendation:**
- Define 10-20 trigger test cases before shipping (should trigger / should NOT trigger)
- Define functional test cases with expected outputs
- Compare baseline (without skill) vs. skill performance on token count and back-and-forth messages

**Known impact:** The sprint-recap regression (skill was writing to LEARNING_LOG.md instead of experiments.json) was caught in production, not in testing. The reflection-framework.md stale references were also caught post-hoc.

**Recommendation:** Create a `docs/test-cases.md` file with at least:

```
## learn-loop trigger tests

Should trigger:
- "what should I learn this week"
- "let's do my weekly planning"
- "capture my learnings"
- "Friday reflection"
- "BML loop"
- "what did I learn this week"

Should NOT trigger:
- "help me write Python code"
- "summarize these commits"
- "analyze this PRD"
```

And a functional test for each skill's save step: run the skill end-to-end and verify the correct JSON file was written with the correct schema.

---

### 5. No scripts/ directory

**Current state:** No validation scripts. The guide recommends bundling scripts for critical validations instead of relying on natural language instructions, noting: "Code is deterministic; language interpretation isn't."

**Impact:** Low for the current four skills — they are primarily reasoning/writing skills, not data processing pipelines. But the sprint-recap skill in particular has multi-step data gathering (git commands) and transformation (classify commits, map to product areas) where a validation script could catch errors before writing to sprints.json.

**Recommendation:** Not urgent. Revisit if execution reliability becomes an issue. If adding validation, a script like `scripts/validate-experiment.py` that type-checks an experiment record before it's written would be the highest-value first target.

---

### 6. No `compatibility` field

**Current state:** Not used.

**Official spec:** The `compatibility` field (1-500 chars) indicates environment requirements.

**Relevance for vibeloupe:** `sprint-recap` requires a git repo. `learn-loop` and `hypothesis-validator` work anywhere but write to `.vibeloupe/`. This context is currently undocumented in the skill itself.

**Recommendation:** Add `compatibility` to `sprint-recap` at minimum:
```yaml
compatibility: "Requires a git repository. Works in Claude Code and Claude.ai."
```

---

### 7. No allowed-tools field

**Current state:** Not used.

**Official spec:** `allowed-tools` restricts which tools the skill can invoke (e.g., `"Bash(python:*) WebFetch"`).

**Relevance:** Low. Vibeloupe skills currently have no reason to restrict tool access — they intentionally use file system tools and bash. Including this field would tighten the security surface but isn't required.

**Recommendation:** No action required unless skills are distributed publicly at scale.

---

## What's already correct

| Area | Status |
|---|---|
| Folder naming (kebab-case) | ✓ |
| SKILL.md exact naming | ✓ |
| YAML `---` delimiters | ✓ |
| Descriptions include WHAT + WHEN | ✓ |
| No XML tags in frontmatter | ✓ |
| No README.md inside skill folders | ✓ |
| Progressive disclosure via `references/` | ✓ |
| References explicitly linked from SKILL.md | ✓ |
| Skill names don't use `claude`/`anthropic` prefix | ✓ |
| Composability (skills don't assume exclusivity) | ✓ |
| Error handling in workflows | ✓ |
| Concrete examples in skill output formats | ✓ |

---

## Priority order for fixes

| Priority | Gap | Effort |
|---|---|---|
| High | Verify commands/ files are actually part of skill loading hierarchy, or merge into SKILL.md | Medium |
| High | Add basic trigger test suite (docs/test-cases.md) | Low |
| Medium | Move `version` under `metadata:` in YAML + update pre-commit hook | Low |
| Medium | Add `compatibility` field to sprint-recap | Low |
| Low | Add `metadata.author` field | Low |
| Low | Add validation scripts | High |
| Low | Add `allowed-tools` | Low |
