# Hypothesis Validation Framework

Full reference for all phases of the hypothesis validation skill.

---

## Phase 1 — Signal Detection

When parsing user input, look for these five dimensions. Each can be present, absent, or weakly implied.

### Problem signal
**Present if:** The user describes a specific friction, gap, failure mode, or pain point.
**Weakly implied if:** They describe a solution ("I want to build a tool that...") — the problem is implicit.
**Absent if:** The input is purely aspirational with no concrete pain described.

Look for: frustration language, workarounds, manual steps, time/money costs, failed attempts to solve something.

### Customer signal
**Present if:** A specific, nameable segment is described — role, company size, industry, life situation, frequency of the problem.
**Weakly implied if:** A broad category is named ("small businesses", "developers") without specifics.
**Absent if:** The user says "everyone" or "anyone who..." — this is the most common gap.

Specificity test: Could you name a real person you know who fits this description? If not, the segment is too vague.

### Solution signal
**Present if:** The user describes a product, feature, approach, or mechanism.
**Absent if:** The user is in problem exploration mode only.

Note: Solution signal is not required to generate a problem validation plan. If it's absent, the plan focuses on problem validation first.

### Evidence signal
**Present if:** The user cites interviews, data, observed behavior, market research, personal experience, or analogous markets.
**Absent if:** The belief appears to come purely from intuition or personal frustration.

Absence of evidence is not disqualifying — it just affects which tier of experiments to prioritize.

### Stakes signal
**Present if:** There's a sense of how painful, frequent, or costly the problem is.
**Absent if:** The problem is described but there's no signal about severity.

Stakes determine whether this is a hair-on-fire problem (high willingness to pay, high urgency) or a vitamin (nice-to-have with low switching motivation).

---

## Phase 2 — Intake Mode Decision

| Dimensions present | Mode | Action |
|--------------------|------|--------|
| 4–5 | Rich | Crystallize directly, no questions |
| 2–3 | Partial | Ask 1–3 targeted gap questions only |
| 0–1 | Sparse | Ask 4–5 clarifying questions before proceeding |

**Question selection priority (most important to least):**
1. Customer — who specifically?
2. Problem — what specifically happens, and when?
3. Stakes — what does it cost them (time, money, reputation)?
4. Evidence — what have you already seen or heard?
5. Riskiest assumption — what would most embarrass you if it were false?

---

## Phase 3 — Clarifying Question Bank

Use only the questions needed to fill gaps. Do not ask questions already answered by the input.

### Customer questions
- "Who specifically experiences this? Give me a role, a context, and a frequency — e.g. 'B2B sales reps at 20–200 person SaaS companies who do outbound prospecting daily.'"
- "Can you name 3 real people you know who have this problem? What do they have in common?"
- "Is this primarily a consumer problem or a business problem? If business — who pays vs. who uses?"

### Problem questions
- "Walk me through the last time someone experienced this problem. What specifically happened?"
- "What do people do today when this problem occurs? What's the current workaround or alternative?"
- "What breaks down with the current solution? What does the person have to accept, tolerate, or give up?"

### Stakes questions
- "When this problem occurs, what's the consequence? Time lost? Money? Reputation? Missed outcome?"
- "How often does this happen — daily, weekly, a few times a year?"
- "Have you seen people spend money to partially solve this already? What did they pay for?"

### Evidence questions
- "What have you already seen or heard that made you believe this problem is real and significant?"
- "Have you talked to anyone who has this problem? What did they tell you?"
- "Is there an existing market — even an inadequate one — for something in this space?"

### Assumption questions
- "What's the one thing that, if it turned out to be false, would most change your confidence in this idea?"
- "What are you most assuming about your customer that you haven't verified?"
- "What would need to be true about customer behavior for this to work?"

---

## Phase 4 — Hypothesis Crystallization

### Problem hypothesis template
> We believe that **[specific customer segment]** frequently experience **[specific problem]** in the context of **[situation/trigger]**, and that this is painful enough that they will **[observable signal of motivation: pay, switch, change behavior]** to solve it. We will know this is true when **[measurable outcome from an experiment]**.

### Solution hypothesis template
> We believe that **[specific customer segment]** will choose **[our approach]** over **[current alternative]** because **[specific advantage]**. We will know this is true when **[X% of target customers do Y in Z timeframe]**.

### Combined template (when both are present)
State the problem hypothesis first, then the solution hypothesis. The solution hypothesis is only worth testing if the problem hypothesis is directionally validated.

### What makes a good hypothesis
- Falsifiable: there is a specific outcome that would disprove it
- Customer-specific: names who, not just what
- Behavioral: refers to observable action, not opinions or stated intent
- Time-bounded: can be tested within a defined period

---

## Phase 5 — Risk Ranking

For each assumption you surface, score it on two axes:

**Likelihood of being wrong (1–3):**
- 1 = You have solid evidence this is true
- 2 = You have weak or indirect signals
- 3 = You're largely assuming this

**Consequence if wrong (1–3):**
- 1 = The idea could pivot and survive
- 2 = The idea changes significantly
- 3 = The idea is dead

**Risk score = Likelihood × Consequence.** Surface the top 2–3 with score ≥ 4.

Common high-risk assumptions (score these first):
- "This customer segment actually has this problem" (often assumed from founder intuition)
- "This is painful enough that people will change behavior" (pain ≠ motivation to act)
- "People will pay for this" (willingness to pay ≠ stated interest)
- "The current workaround is actually inadequate" (customers may have solved it well enough)
- "We can reach this customer cost-effectively" (distribution is often the real constraint)

---

## Phase 6 — Experiment Types

### Tier 1: No-build experiments (days, free–low cost)

**Customer interviews (Mom Test method)**
What it tests: Whether the problem is real, frequent, and painful enough.
How many: 5 interviews to see a pattern; 10 to gain confidence.
Ideal for: All early-stage hypotheses before any other experiment.

**Desk research / signal mining**
What it tests: Is there market evidence — existing products, forums, job postings, App Store reviews, Reddit complaints, G2 reviews, job descriptions — that suggest the problem exists and people are spending to solve it?
How: Search for: competing products (even bad ones = validation), community complaints, workaround tools, support tickets in adjacent products.

**Smoke test / landing page**
What it tests: Whether target customers will take a low-commitment action (sign up, request access) based on a clear value proposition — before anything is built.
How: One-page site with value prop, a CTA, and a waitlist. Drive 50–200 targeted visitors. Measure conversion rate vs. benchmark (>5% for B2C, >2% for B2B is a signal worth investigating).

### Tier 2: Low-build experiments (1–2 weeks, low–medium cost)

**Concierge MVP**
What it tests: Whether customers will use and value the core experience, even when delivered manually.
How: Do the thing by hand for 3–5 customers. No automation, no product. Deliver the outcome manually, charge if you can. Validates value without building.

**Wizard of Oz prototype**
What it tests: Whether the user experience works and produces the intended outcome — before engineering the back end.
How: Build the front end or a mockup; operate the back end manually (even via spreadsheet or Slack). Customer sees a "working product." You see whether they care.

**Pre-sales / Letters of Intent**
What it tests: Whether customers will commit real resources (money, time, team access) before the product is built.
How: Offer early access for a discounted pre-payment or signed LOI. Works best in B2B. A signed LOI from someone with budget is stronger signal than 100 "I'd definitely use this" responses.

### Tier 3: Build experiments (weeks–months, medium–high cost)

**Functional MVP**
What it tests: Whether the full value loop works and produces retention/referral.
How: Build only the core value-creating feature. Remove everything else. Measure: do customers return? Do they refer others? Do they pay?

Use only when Tier 1 and Tier 2 experiments have confirmed the problem is real and customers are motivated.

---

## Mom Test Coaching

The Mom Test (Rob Fitzpatrick) is the standard for running customer interviews that actually validate — not just make you feel good.

### The core failure mode
Most founders ask questions that invite polite agreement rather than honest signal. Customers are nice. They don't want to hurt your feelings. They'll say "that sounds interesting" about almost anything. This is not validation.

### The three rules
1. **Talk about their life, not your idea.** The moment you pitch, the interview becomes about their reaction to your pitch — not about their real behavior and real problems.
2. **Ask about the past, not the future.** "Would you use this?" is worthless. "Tell me about the last time you dealt with X" is gold. Past behavior predicts future behavior. Hypothetical answers predict nothing.
3. **Ask about specifics, not generalities.** "Do you have trouble with X?" invites a vague yes. "Walk me through the last time X happened" forces a story. Stories contain the real data.

### Good interview questions
- "Tell me about the last time you had to deal with [problem area]. Walk me through what happened."
- "What did you try first? What happened?"
- "How are you handling that today? What does that process look like?"
- "How much time does that take you? What does it cost?"
- "Have you looked for a solution? What did you find? Why didn't it work?"
- "What would have to be true for you to change how you're doing this?"

### Questions to avoid
- "Would you use a product that did X?" — hypothetical, not behavioral
- "How much would you pay for this?" — also hypothetical, and leading
- "Do you think this is a good idea?" — invites politeness, not honesty
- "Would you be interested in...?" — same problem

### The commitment signal
At the end of an interview, the most valuable thing you can ask for is a commitment — not an opinion. Commitments include: an introduction to a colleague, agreeing to be in an early pilot, a pre-payment, or a follow-up call. Opinions are free. Commitments cost something — they're real signal.

### Interpreting results
- **Strong signal:** Unprompted stories of pain, existing workarounds they've built themselves, money already being spent on partial solutions, urgency language ("this is killing us")
- **Weak signal:** "That sounds interesting", "I could see using that", "yeah, that's sometimes a problem"
- **Counter-signal:** "We solved that already with X", "that only happens maybe once a year", inability to recall a specific instance

---

## Output Format Templates

### 🎯 HYPOTHESIS
State the crystallized hypothesis in falsifiable form using the templates above. If both problem and solution hypotheses are relevant, state both — problem first.

### ⚠️ RISKIEST ASSUMPTIONS
List 2–3 assumptions with their risk scores. For each: state the assumption, why it might be wrong, and what the consequence would be.

Format:
```
**[Assumption]** — Risk score: [X/9]
Why it might be wrong: [one sentence]
Consequence if wrong: [one sentence]
```

### 🧪 RECOMMENDED FIRST EXPERIMENT
Name the single best first experiment. Explain why it's the right one (not just the cheapest — the most informative given what's unknown). Include:
- What you're testing
- Exactly how to run it (specific enough to act on this week)
- How many participants / data points you need
- If interviews: include 3–5 specific questions from the Mom Test question bank above
- Pass/fail criteria

### 📋 FULL TEST SEQUENCE
List the remaining experiments in order, with brief how-to for each. Stop when you've reached the point where a working product is the only remaining test. Each experiment should only be run if the one before it passed.

Format for each:
```
**[Experiment name]** — [Tier]
Tests: [what specifically]
How: [brief, specific instructions]
Pass: [what outcome confirms the hypothesis]
Fail: [what outcome kills or pivots the hypothesis]
```

### 🚦 DECISION CRITERIA
A simple decision tree:
- If experiment 1 passes → do X
- If experiment 1 fails on assumption Y → consider pivot Z
- Red line: the result that means stop entirely
