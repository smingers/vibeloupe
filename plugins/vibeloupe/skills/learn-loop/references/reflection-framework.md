# Reflection Framework

Full reference for all phases of the learn-loop skill.

---

## Phase 1 — Mode Detection

### Decision logic

1. Check for `.vibeloupe/experiments.json` in the working directory.
2. If it doesn't exist → Tell the user you'll create `.vibeloupe/experiments.json` to track their experiments, then create it with `[]`. Enter **Planning mode**.
3. If it exists but is an empty array → **Planning mode**.
4. If it exists and has records, find entries where `week_of` matches the Monday of the current week:
   - Entries for this week exist and all have `status: "untested"` → **Reflection mode**
   - Entries for this week exist and all have `result` filled in → **Ask user** which mode they want
   - No entries for this week, but prior entries exist → **Planning mode**
5. If the user explicitly says what they want, honor that regardless of file state.

### When to ask vs. infer

Ask "Are we planning or debriefing?" only when the log state is genuinely ambiguous (e.g. partial results, or a completed week where the user might want to discuss next week's plan). If it's Monday morning with no current-week entry, don't ask — go to planning. If it's Friday afternoon with an unresolved plan, don't ask — go to reflection.

**Never ask for permission to start.** Once mode is determined, open the session immediately.

---

## Phase 2 — Planning Mode

### Step 1: Elicit the learning goals

Ask: "What are the most important things you want to learn or test this week? Give me 1 to 3 — if one bet is big enough to own the week, that's fine."

Wait for their response. Do not generate suggestions. The user's goals must come from them — your job is to sharpen them, not invent them.

If they give you more than three, ask: "If you could only pick three, which have the most riding on them this week?"

### Step 2: Sharpen each goal into an experiment

For each learning goal, work through this in conversation (not in a form-fill way):

**Crystallize the hypothesis**
Restate their goal as: "We believe [specific outcome] will happen when [specific action or test], and we'll know it's true when [observable evidence]."

Push back if:
- The hypothesis is not falsifiable ("I want to learn more about X" → not testable)
- The success condition is vague ("people will engage with it" → what does engagement mean, how many, by when?)
- The customer is unnamed ("users" or "people" → which people, specifically?)

**Define the minimum test**
Ask: "What's the cheapest thing you could do this week that would give you real signal on this?"

Common options:
- A conversation with one real person who has the problem
- Shipping a rough version to 3 people and watching what they do
- Checking whether anyone is already trying to solve this (desk research)
- Writing the copy for something that doesn't exist yet and showing it to someone

Push back if the proposed test is:
- Too big to complete in a week
- Designed to confirm rather than challenge (e.g. "I'll show it to people I know will like it")
- Not observable (e.g. "I'll think about it more")

**Set pass/fail criteria**
Before moving on: "What outcome would make you say this experiment passed? What would make you say it failed or needs a pivot?"

Both must be specific and observable. "I'll know more" is not a pass criterion.

**Estimate time**
Ask: "How long will this actually take?" If the answer is more than a day for a single experiment, ask if it can be scoped down.

### Step 3: Surface the upstream assumption

After all experiments are defined, step back:

"Here's a question before we lock this in: is there a single belief that, if it turned out to be wrong, would make all of these experiments pointless? Something you're assuming is true that you haven't actually tested?"

Common upstream assumptions:
- "The problem is real and painful" (often assumed before any interviews)
- "I'm the right person to solve this" (rarely examined)
- "This week's context is representative" (timing effects on results)
- "The people I'm testing with are the right people" (sample bias)

If the upstream assumption is more urgent than any of the three experiments, say so and suggest putting it first.

---

## Phase 3 — Reflection Mode

### Step 1: Re-anchor

Before asking anything, restate all planned experiments from the log:

"Here's what you planned to test this week:
1. [Hypothesis 1] — Pass if [criterion]
[2. [Hypothesis 2] — Pass if [criterion]]
[3. [Hypothesis 3] — Pass if [criterion]]

Let's go through each one."

Do not paraphrase or soften the original hypotheses. The user needs to confront exactly what they committed to.

### Step 2: Debrief each experiment

For each experiment, in order:

**Did you run it?**
If yes — continue.
If no — ask: "What got in the way?" Then log the reason and move on. A skipped experiment is signal about prioritization, fear, or scoping. Don't moralize — just capture it.

**What did you actually observe?**
Insist on specifics:
- Not "people seemed interested" → "Three out of five people I showed it to asked when they could get access"
- Not "the experiment didn't work" → "I ran no test because I couldn't find five people to talk to in time"
- Not "I learned a lot" → "I learned that the problem I thought was about X is actually about Y because [specific thing someone said or did]"

If they give you a vague answer, ask: "Can you give me a specific thing you saw or heard that makes you say that?"

**Does this confirm, challenge, or complicate the original hypothesis?**
Force a verdict — not "it's complicated":
- **Confirm:** The evidence supports the hypothesis. What would make you even more confident?
- **Challenge:** The evidence contradicts the hypothesis. What specifically was wrong?
- **Complicate:** The evidence is mixed or points in an unexpected direction. What's the new question this raises?

**What's your updated belief?**
Ask them to restate the hypothesis in light of what they observed. If it's identical to the original, push: "What, if anything, changed in your confidence level and why?"

### Step 3: Synthesize the week

After all three experiments:

Ask: "If you had to name the single most important thing you learned this week — not what you did, but what you now believe that you didn't before — what would it be?"

If they can't answer, that's the reflection. Name it: "The fact that there's no clear answer here is itself a signal — what does that tell you?"

### Step 4: Next steps for each thread

For each experiment, give a verdict:

- **Carry forward:** The hypothesis is directionally confirmed. Run a deeper or larger version next week.
- **Pivot:** The hypothesis was wrong, but you learned something that points to a better direction. Name the new direction specifically.
- **Abandon:** The hypothesis was wrong and there's no adjacent opportunity worth pursuing. Don't linger — move on.

Push back on "let me think about it more" as a next step. Thinking is not an experiment.

### Step 5: Cross-week pattern detection

If the log has three or more weekly entries, scan for patterns:

- **Repeated pivots on the same assumption:** The user keeps circling back to the same unresolved question. Name it: "You've revisited [X] three times without resolving it. Is this actually the thing to figure out?"
- **Consistently skipped experiments:** Something keeps not getting done. That's a signal about motivation, capacity, or scope.
- **Belief drift without evidence:** The hypothesis keeps shifting, but without citing new observations. That's a red flag for motivated reasoning.
- **Narrowing vs. widening:** Is the user getting more specific over time (good) or more diffuse (bad)?

Surface the pattern without judgment. Let the user decide what to do with it.

---

## Data Schema

All experiments are stored as records in `.vibeloupe/experiments.json` (an array).

### New experiment record (planning session)

```json
{
  "id": "exp_[ISO timestamp without separators, e.g. 20260311T143022]",
  "created_at": "[ISO 8601 datetime]",
  "updated_at": "[ISO 8601 datetime]",
  "created_by": "learn-loop",
  "hypothesis": "[falsifiable hypothesis statement]",
  "riskiest_assumption": "[the assumption most likely to make this experiment moot]",
  "recommended_experiment": "[minimum test that could disprove the hypothesis; include time estimate as prose]",
  "pass_fail_criterion": "[explicit pass and fail criteria]",
  "status": "untested",
  "week_of": "[ISO date of the Monday of the current week]",
  "result": null,
  "result_recorded_at": null,
  "learnings": null,
  "next_action": null,
  "next_action_notes": null
}
```

### Reflection update (fields to set in-place by `id`)

```json
{
  "updated_at": "[ISO 8601 datetime]",
  "status": "confirmed | invalidated | abandoned | skipped",
  "result": "[what was actually observed]",
  "result_recorded_at": "[ISO 8601 datetime]",
  "learnings": "[updated belief — what changed and why]",
  "next_action": "carry_forward | pivot | abandon",
  "next_action_notes": "[brief reason for the recommendation]"
}
```

### Rules for writing to experiments.json

- `week_of` is always the Monday of the current week in ISO date format
- Planning appends new records; reflection updates existing records in-place by `id`
- A skipped experiment still gets updated: `status: "skipped"`, `result`: the reason it wasn't run
- Never delete prior records — update status instead
- If `.vibeloupe/` doesn't exist, create the directory and initialize `experiments.json` as `[]`

---

## Output Format Templates

### Planning session

```
### 📅 WEEK OF [DATE] — PLAN

### 🧪 THIS WEEK'S EXPERIMENTS

**Experiment 1: [Name]**
Hypothesis: [Falsifiable statement]
Test: [What you'll actually do]
Pass: [Specific observable outcome]
Fail: [Specific observable outcome]
Time: [Estimate]

[Repeat for each additional experiment, numbered sequentially — 1 to 3 total]

### ⚠️ UPSTREAM ASSUMPTION TO WATCH
[One belief that, if wrong, makes all this week's experiments moot]
```

### Reflection session

```
### 📅 WEEK OF [DATE] — RESULTS

### 🔬 EXPERIMENT RESULTS

**Experiment 1: [Name]**
Ran: [Yes/No]
Observed: [Specific evidence]
Verdict: [Confirm / Challenge / Complicate]
Updated belief: [What you now think]
Next: [Carry forward / Pivot to X / Abandon]

[Repeat for each additional experiment]

### 💡 KEY LEARNING THIS WEEK
[One sentence]

### ➡️ NEXT STEPS
[Summary of carry/pivot/abandon decisions]

### 📈 PATTERN NOTE
[Cross-week pattern if the log reveals one — omit if first week]
```
