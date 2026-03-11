# Anthropic Skills Best Practices

Distilled from *The Complete Guide to Building Skills for Claude* (Anthropic, January 2026).

---

## What a skill is

A skill is a folder containing:

- `SKILL.md` (required): Instructions in Markdown with YAML frontmatter
- `scripts/` (optional): Executable code (Python, Bash, etc.)
- `references/` (optional): Documentation loaded as needed
- `assets/` (optional): Templates, fonts, icons used in output

That's the complete structure. No other conventions (e.g. `commands/`) are described in the official guide.

---

## Core design principles

### Progressive disclosure (three levels)

1. **YAML frontmatter** — Always loaded into Claude's system prompt. Tells Claude when to load the skill. Must be minimal.
2. **SKILL.md body** — Loaded when Claude determines the skill is relevant. Contains full instructions and workflow.
3. **Linked files in references/** — Navigated by Claude only when needed. Keeps SKILL.md lean.

**Implication**: Heavy detail belongs in `references/`, not inline in SKILL.md. Keep SKILL.md under 5,000 words.

### Composability

Skills should work well alongside other skills. Do not assume yours is the only one loaded.

### Portability

Skills work identically across Claude.ai, Claude Code, and the API. No surface-specific logic in the skill itself.

---

## File and folder naming rules

| Rule | Correct | Wrong |
|---|---|---|
| Skill folder | `notion-project-setup` | `Notion Project Setup`, `notion_project_setup`, `NotionProjectSetup` |
| Main file | `SKILL.md` (exact, case-sensitive) | `SKILL.MD`, `skill.md` |
| No README in skill folder | — | `README.md` inside skill directory |

Note: A repo-level README for human visitors is fine and recommended. It is separate from the skill folder.

---

## YAML frontmatter

### Required fields

```yaml
---
name: your-skill-name
description: What it does. Use when user asks to [specific phrases].
---
```

### name field

- kebab-case only
- No spaces or capitals
- Should match folder name
- Cannot start with `claude` or `anthropic` (reserved)

### description field (most important)

**Must include BOTH:**
- What the skill does
- When to use it (trigger conditions, specific phrases users would say)

**Rules:**
- Under 1024 characters
- No XML tags (`<` or `>`)
- Include specific tasks users might say
- Mention file types if relevant
- Structure: `[What it does] + [When to use it] + [Key capabilities]`

**Good description examples:**
```
Analyzes Figma design files and generates developer handoff documentation.
Use when user uploads .fig files, asks for "design specs", "component
documentation", or "design-to-code handoff".
```

**Bad description examples:**
```
Helps with projects.                          ← Too vague
Creates sophisticated multi-page docs.        ← Missing triggers
Implements the Project entity model.          ← Technical, no user triggers
```

### Optional fields

```yaml
license: MIT
compatibility: "Requires git repo. Works in Claude Code and Claude.ai."
metadata:
  author: Company Name
  version: 1.0.0
  mcp-server: server-name
  category: productivity
  tags: [project-management, automation]
```

**Important**: `version`, `author`, and other custom fields belong inside `metadata:`, not as top-level YAML fields.

### Security restrictions

Forbidden in frontmatter:
- XML angle brackets (`<` `>`)
- Names starting with `claude` or `anthropic`

---

## Writing effective SKILL.md bodies

### Recommended structure

```markdown
---
name: your-skill
description: [...]
---

# Skill Name

## Instructions

### Step 1: [First Major Step]
Clear explanation of what happens.

Example:
```bash
python scripts/fetch_data.py --project-id PROJECT_ID
Expected output: [describe what success looks like]
```

### Step 2: ...

## Examples

### Example 1: [common scenario]
User says: "..."
Actions:
1. ...
Result: ...

## Troubleshooting

### Error: [Common error message]
**Cause:** ...
**Solution:** ...
```

### Be specific and actionable

Good:
```
Run `python scripts/validate.py --input {filename}` to check data format.
If validation fails, common issues include:
- Missing required fields (add them to the CSV)
- Invalid date formats (use YYYY-MM-DD)
```

Bad:
```
Validate the data before proceeding.
```

### Include error handling

Every workflow should document what happens when things go wrong. Cover common failure cases explicitly.

### Use progressive disclosure

Keep SKILL.md focused on core instructions. Move detailed documentation, large reference tables, and methodology into `references/` and link to them. Don't load what isn't needed.

### Reference bundled resources explicitly

```
Before writing queries, consult `references/api-patterns.md` for:
- Rate limiting guidance
- Pagination patterns
- Error codes and handling
```

---

## Use case categories

Anthropic identifies three primary use case types:

### Category 1: Document & Asset Creation

Creating consistent, high-quality output — documents, designs, code, presentations.

Key techniques:
- Embedded style guides and brand standards
- Template structures for consistent output
- Quality checklists before finalizing
- No external tools required — uses Claude's built-in capabilities

### Category 2: Workflow Automation

Multi-step processes with consistent methodology, possibly coordinating multiple MCP servers.

Key techniques:
- Step-by-step workflow with validation gates
- Templates for common structures
- Built-in review and improvement suggestions
- Iterative refinement loops

### Category 3: MCP Enhancement

Workflow guidance on top of MCP tool access — the skill teaches Claude *how* to use a connected service effectively.

Key techniques:
- Coordinates multiple MCP calls in sequence
- Embeds domain expertise
- Provides context users would otherwise need to specify
- Error handling for common MCP issues

---

## Workflow patterns

### Pattern 1: Sequential workflow orchestration

Use when users need multi-step processes in a specific order.

Key techniques:
- Explicit step ordering
- Dependencies between steps
- Validation at each stage
- Rollback instructions for failures

### Pattern 2: Multi-MCP coordination

Use when workflows span multiple services.

Key techniques:
- Clear phase separation
- Data passing between services
- Validation before moving to next phase
- Centralized error handling

### Pattern 3: Iterative refinement

Use when output quality improves with iteration.

Key techniques:
- Explicit quality criteria
- Iterative improvement loop
- Validation scripts
- Stopping condition defined

### Pattern 4: Context-aware tool selection

Use when the same outcome requires different tools depending on context.

Key techniques:
- Clear decision criteria
- Fallback options
- Transparency to user about choices made

### Pattern 5: Domain-specific intelligence

Use when the skill adds specialized knowledge beyond tool access.

Key techniques:
- Domain expertise embedded in workflow logic
- Compliance/validation before action
- Comprehensive audit trail
- Clear governance

---

## Testing

### Recommended approach: iterate on one task first

Find a single challenging task, iterate until Claude succeeds, then extract the winning approach into a skill. Once working, expand to multiple test cases.

### Three areas to test

**1. Triggering tests** — Does the skill load at the right times?
- Triggers on obvious tasks ✓
- Triggers on paraphrased requests ✓
- Does NOT trigger on unrelated topics ✓

Target: 90% of relevant queries trigger the skill automatically.

**2. Functional tests** — Does the skill produce correct outputs?
- Valid outputs generated
- API calls succeed
- Error handling works
- Edge cases covered

**3. Performance comparison** — Does the skill improve results vs. baseline?
- Compare token count with/without skill
- Compare back-and-forth messages required
- Compare error rate

### Iteration signals

| Signal | Meaning | Fix |
|---|---|---|
| Skill doesn't load when it should | Undertriggering | Add more trigger phrases, technical terms, to description |
| Skill loads for irrelevant queries | Overtriggering | Add negative triggers, narrow scope |
| Inconsistent results, user corrections needed | Execution issues | Improve instructions, add error handling |
| Slow responses, degraded quality | Context overload | Move detail to `references/`, keep SKILL.md under 5,000 words |

### Debugging undertriggering

Ask Claude: "When would you use the [skill name] skill?" Claude will quote the description back. Adjust based on what's missing.

---

## Instructions not being followed

Common causes and fixes:

1. **Too verbose** — Keep concise, use bullet points, move detail to `references/`
2. **Critical instructions buried** — Put them at the top; use `## Critical` or `## Important` headers; repeat key points
3. **Ambiguous language** — Replace vague prose with explicit checklists; use `CRITICAL:` prefix for must-do steps
4. **Model "laziness"** — Add explicit encouragement in the user prompt (more effective than in SKILL.md):
   ```
   - Take your time to do this thoroughly
   - Quality is more important than speed
   - Do not skip validation steps
   ```

**Advanced technique**: For critical validations, bundle a script that performs the checks programmatically. Code is deterministic; language instruction interpretation is not.

---

## Distribution

### For internal/personal skills

Place the skill folder in the Claude Code skills directory or upload to Claude.ai via Settings > Capabilities > Skills.

### For team/org skills

Admins can deploy skills workspace-wide with automatic updates and centralized management (available since December 2025).

### For public skills

1. Host on GitHub with a public repo and a repo-level README (separate from the skill folder)
2. Link to the skill from MCP documentation if applicable
3. Provide a clear installation guide

### Via API

For programmatic use, applications, agents, or automated pipelines:
- `/v1/skills` endpoint for listing/managing skills
- Add to Messages API via `container.skills` parameter
- Requires Code Execution Tool beta

---

## Quick checklist

**Before you start:**
- [ ] 2-3 concrete use cases identified
- [ ] Tools identified (built-in or MCP)
- [ ] Folder structure planned

**During development:**
- [ ] Folder named in kebab-case
- [ ] `SKILL.md` exists (exact spelling, case-sensitive)
- [ ] YAML frontmatter has `---` delimiters
- [ ] `name`: kebab-case, no spaces, no capitals
- [ ] `description` includes WHAT and WHEN, under 1024 chars
- [ ] No XML tags (`<` `>`) anywhere
- [ ] Instructions are clear and actionable
- [ ] Error handling included
- [ ] Examples provided
- [ ] `references/` linked explicitly

**Before upload:**
- [ ] Tested triggering on obvious tasks
- [ ] Tested triggering on paraphrased requests
- [ ] Verified no trigger on unrelated topics
- [ ] Functional tests pass
- [ ] Compressed as `.zip` if uploading manually

**After upload:**
- [ ] Tested in real conversations
- [ ] Monitoring for under/over-triggering
- [ ] Version updated in `metadata`
