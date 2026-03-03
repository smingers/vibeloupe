# PRD Analytical Framework

Full detail on each of the 8 analytical lenses and their output format.

---

## 1. ARGUMENT CHAIN ANALYSIS

Every PRD contains an implicit logical chain. Rate each link:

- A real problem exists
- It affects a meaningful user segment
- It is worth solving NOW over other things this team could do
- THIS solution is the right approach
- It is feasible in the proposed scope
- It will produce measurable outcomes

**Rating scale:** STRONG / ADEQUATE / WEAK

Identify the **weakest link**. Most PRDs are strongest on the solution description and weakest on "why now," "why this over alternatives," and opportunity cost.

If the PRD doesn't make a comparative case for why this work beats other uses of the team's time, note that as a gap in the "worth solving now" link — don't let it slide.

### Output format:

```
### 🔗 ARGUMENT CHAIN
**Weakest Link:** [Name it]

| Link | Rating | Note |
|------|--------|------|
| Problem exists | STRONG/ADEQUATE/WEAK | [1 sentence] |
| Affects meaningful segment | STRONG/ADEQUATE/WEAK | [1 sentence] |
| Worth solving now (incl. opportunity cost) | STRONG/ADEQUATE/WEAK | [1 sentence] |
| Right solution approach | STRONG/ADEQUATE/WEAK | [1 sentence] |
| Feasible in proposed scope | STRONG/ADEQUATE/WEAK | [1 sentence] |
| Measurable outcomes defined | STRONG/ADEQUATE/WEAK | [1 sentence] |

[2-3 sentences expanding on the weakest link only]
```

---

## 2. JOBS TO BE DONE REFRAME

State the user's actual job in one sentence. Then assess: is the PRD solving the real job, or an adjacent one?

- If the framing is off: name the reframe and what it implies for the solution (3-4 sentences max)
- If the framing is right: say so in one sentence and move on

### Output format:

```
### 🎯 REAL JOB
[1 sentence: the user's actual job-to-be-done]

[2-4 sentences: is the PRD solving the right job? If not, what's the reframe and what does it imply?]
```

---

## 3. HIDDEN ASSUMPTIONS AUDIT

Identify the 2-3 assumptions that bear the most weight in the PRD's logic — the ones where, if wrong, the entire thesis collapses.

For each:
- Name the assumption
- Explain why it's load-bearing (1-2 sentences)
- Propose a specific, doable-this-week test to validate or kill it

Skip assumptions that are real but non-critical. Focus only on the ones that could sink the initiative.

### Output format:

```
### 🧱 LOAD-BEARING ASSUMPTIONS
**[Assumption name]**
[Why it's critical — 1-2 sentences]

**Test this week:** [Specific, concrete validation step with owner if possible]

---

**[Assumption name]**
[Why it's critical — 1-2 sentences]

**Test this week:** [Specific, concrete validation step with owner if possible]
```

---

## 4. MOTIVATED REASONING FLAGS

Scan for these 8 patterns. Only flag ones that are actually present. If reasoning is sound, say so in one line and move on.

**Patterns to scan for:**
1. Cherry-picked evidence used as representative
2. Anchoring on a single customer, competitor, or stakeholder
3. Conflating "customers asked for X" with "X is the right solution"
4. Citing trends without connecting them to YOUR users
5. Appeal to authority substituting for evidence
6. Sunk cost framing
7. False urgency without data
8. Survivorship bias

For each flag: name the pattern, point to where it appears, and suggest how to make the argument honestly in one sentence.

### Output format:

```
### 🧠 MOTIVATED REASONING FLAGS
[If none: "Reasoning appears sound — no flags." Then move on.]

[If present, for each:]
- **[Pattern name]** → [Where it appears] → [How to fix in 1 sentence]
```

---

## 5. CONVICTION vs. EVIDENCE CHECK

Identify the 2-3 sharpest mismatches where the confidence of the language doesn't match the strength of the evidence.

Flag in either direction:
- **Overconfidence:** Strong claims + weak evidence
- **Political caution:** Strong evidence + hedged language

If a claimed success rate can be reframed as an error or failure rate, do so — PMs often don't feel the weight of a number until it's flipped.

If calibration is solid, say so in one sentence and move on.

### Output format:

```
### 🎚️ CONVICTION vs. EVIDENCE
[2-3 specific mismatches, or "Well-calibrated — no major mismatches" if appropriate]
```

---

## 6. MOONSHOT ALTERNATIVES

Name 1-2 alternative approaches that attack the same underlying problem from a completely different angle — different business model, different user, different technology, or different distribution strategy.

For each:
- The idea (one sentence)
- Why it could be dramatically bigger (the structural leverage)
- The honest obstacle (is it a legitimate barrier or organizational inertia?)

These should challenge how the team thinks about the problem space, not just suggest scope changes to the current plan.

### Output format:

```
### 🚀 MOONSHOT ALTERNATIVES
**[Alternative name]**
[1 sentence: the idea]

**Why it could be bigger:** [The structural leverage — 1-2 sentences]

**The honest obstacle:** [Legitimate barrier or organizational inertia? — 1-2 sentences]
```

---

## 7. PRE-MORTEM

Forget the PRD's targets. Based on what you've read, what's actually likely to happen?

**Most likely outcome:** 1-2 sentences — what actually happens in the median case, honestly, without invented numbers.

**If it works (12 months out):** What were the 2-3 things that made it succeed? Focus on mechanisms, not metrics.

**If it fails (12 months out):** Write the 2-3 most plausible reasons it failed — not catastrophic black swans, but the mundane, predictable failures that were visible in the PRD if you looked hard enough. Write each as a brief narrative, not a summary statement — make the PM feel it.

**30-day watchpoints:** 2-3 specific metrics with thresholds that should trigger action:
- "[Metric] at [timeframe]: if [threshold], it means [interpretation] — [specific action]"

### Output format:

```
### 💀 PRE-MORTEM
**Most likely satisficing outcome:** [1-2 sentences]

**If it works (12 months out):**
1. [Mechanism — 1-2 sentences]
2. [Mechanism — 1-2 sentences]

**If it fails (12 months out):**
1. [Narrative — 2-3 sentences]
2. [Narrative — 2-3 sentences]
3. [Narrative — 2-3 sentences]

**30-day watchpoints:**
- [Metric] at [timeframe]: if [threshold], it means [X] — [action]
- [Metric] at [timeframe]: if [threshold], it means [X] — [action]
- [Metric] at [timeframe]: if [threshold], it means [X] — [action]
```

---

## 8. TOP 3 RECOMMENDATIONS

List exactly 3. Each must be:
- Specific enough to be assignable to a person
- Doable within one week (not "talk to more customers")
- Framed as: what to do, who owns it, and why it matters now

Order by impact. Do not add a conclusion after these.

### Output format:

```
### ✅ TOP 3 RECOMMENDATIONS
1. **[Action]** — [Who owns it] — [Why now, 1 sentence]
2. **[Action]** — [Who owns it] — [Why now, 1 sentence]
3. **[Action]** — [Who owns it] — [Why now, 1 sentence]
```
