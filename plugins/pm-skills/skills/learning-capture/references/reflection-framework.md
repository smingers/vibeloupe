# Reflection Framework

Full reference for all phases of the learning-capture skill.

---

## Phase 1 — Mode Detection

### Decision logic

1. Check for `LEARNING_LOG.md` in the working directory.
2. If it doesn't exist → **Create it now** using the file header template below. Then enter **Planning mode**.
3. If it exists but is empty → **Planning mode**.
4. If it exists and has content, read it and find the most recent week entry:
   - Entry exists for this week, results section is empty or absent → **Reflection mode**
   - Entry exists for this week, results section is filled → **Ask user** which mode they want
   - No entry for this week, but prior entries exist → **Planning mode**
5. If the user explicitly says what they want, honor that regardless of log state.

### When to ask vs. infer

Ask "Are we planning or debriefing?" only when the log state is genuinely ambiguous (e.g. partial results, or a completed week where the user might want to discuss next week's plan). If it's Monday morning with no current-week entry, don't ask — go to planning. If it's Friday afternoon with an unresolved plan, don't ask — go to reflection.

**Never ask for permission to start.** Once mode is determined, open the session immediately.

---

## Phase 2 — Planning Mode

### Step 1: Elicit the three learning goals

Ask: "What are the three things you most want to learn or test this week?"

Wait for their response. Do not generate suggestions. The user's goals must come from them — your job is to sharpen them, not invent them.

If they give you fewer than three, ask: "What's the third?" If they give you more than three, ask: "If you could only pick three, which have the most riding on them this week?"

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

After all three experiments are defined, step back:

"Here's a question before we lock this in: is there a single belief that, if it turned out to be wrong, would make all three of these experiments pointless? Something you're assuming is true that you haven't actually tested?"

Common upstream assumptions:
- "The problem is real and painful" (often assumed before any interviews)
- "I'm the right person to solve this" (rarely examined)
- "This week's context is representative" (timing effects on results)
- "The people I'm testing with are the right people" (sample bias)

If the upstream assumption is more urgent than any of the three experiments, say so and suggest putting it first.

---

## Phase 3 — Reflection Mode

### Step 1: Re-anchor

Before asking anything, restate the week's three hypotheses from the log:

"Here's what you planned to test this week:
1. [Hypothesis 1] — Pass if [criterion]
2. [Hypothesis 2] — Pass if [criterion]
3. [Hypothesis 3] — Pass if [criterion]

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

## LEARNING_LOG.md Schema

### File header (created once)

```markdown
# Learning Log

A running record of weekly Build-Measure-Learn cycles.

---
```

### Weekly entry format

Each week gets one entry block, appended to the bottom of the file. Never edit prior entries.

```markdown
## Week of [YYYY-MM-DD]

### Plan

**Experiment 1: [Short name]**
- Hypothesis: We believe [X] will happen when [Y], and we'll know it's true when [Z].
- Minimum test: [What specifically you will do]
- Pass: [Observable outcome that confirms]
- Fail: [Observable outcome that challenges or kills]
- Time estimate: [Hours]

**Experiment 2: [Short name]**
- Hypothesis: ...
- Minimum test: ...
- Pass: ...
- Fail: ...
- Time estimate: ...

**Experiment 3: [Short name]**
- Hypothesis: ...
- Minimum test: ...
- Pass: ...
- Fail: ...
- Time estimate: ...

**Upstream assumption to watch:** [The one belief that could make all three experiments moot]

---

### Results

**Experiment 1: [Short name]**
- Ran: [Yes / No — if no: reason]
- Observed: [Specific thing seen or heard]
- Verdict: [Confirm / Challenge / Complicate]
- Updated belief: [Restated hypothesis or new belief]
- Next step: [Carry forward / Pivot to X / Abandon]

**Experiment 2: [Short name]**
- Ran: ...
- Observed: ...
- Verdict: ...
- Updated belief: ...
- Next step: ...

**Experiment 3: [Short name]**
- Ran: ...
- Observed: ...
- Verdict: ...
- Updated belief: ...
- Next step: ...

**Key learning this week:** [One sentence — what you now believe that you didn't before]

**Pattern note:** [Optional — cross-week pattern if visible]

---
```

### Rules for writing to the log

- Use ISO date format for the week header: `Week of YYYY-MM-DD` (use the Monday of that week)
- The Plan section is written at the end of a planning session
- The Results section is written at the end of a reflection session
- Never modify a prior week's entries
- If an experiment was not run, still log it with "Ran: No" and the reason — do not silently omit it
- The log must be writable by the skill — if it doesn't exist, create it with the file header first

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

**Experiment 2: [Name]**
...

**Experiment 3: [Name]**
...

### ⚠️ UPSTREAM ASSUMPTION TO WATCH
[One belief that, if wrong, makes all three experiments moot]
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

**Experiment 2: [Name]**
...

**Experiment 3: [Name]**
...

### 💡 KEY LEARNING THIS WEEK
[One sentence]

### ➡️ NEXT STEPS
[Summary of carry/pivot/abandon decisions]

### 📈 PATTERN NOTE
[Cross-week pattern if the log reveals one — omit if first week]
```
