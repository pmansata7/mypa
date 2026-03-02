# AI-Powered Research Analysis Framework

**Source:** Caitlin Sullivan via Lenny's Newsletter (Feb 17, 2026)
**Purpose:** Prevent the four most common AI analysis failure modes when working with interview transcripts, survey data, or any qualitative/mixed customer data.

---

## Why AI Struggles with Customer Research

**Interviews** are unstructured and messy. Participants contradict themselves, go on tangents, say something important at minute 8 and reframe it at minute 35. LLMs impose structure too fast — they find clean themes, pull quotes that fit, and flatten nuance into tidy summaries.

**Surveys** look structured but aren't. A column of 200 "Why did you cancel?" responses is just as messy as interview data with less context. Different tools export differently, metadata columns sit next to real responses, and sparse answers like "It wasn't for me" hide four completely different implications.

---

## Model Strengths for Analysis Work

| Model | Best For | Tradeoff |
|-------|----------|----------|
| **Claude** | Thorough analysis with depth and nuance. More quotes, broader coverage with less pushing. | Gives the whole brain dump — themes aren't always "proven." Breadth over safe patterns. |
| **Gemini / NotebookLM** | Highly evidenced themes, video analysis. Fewer themes with stronger grounding. | Requires multiple prompts for completeness. Quotes tend to be too short. |
| **ChatGPT** | Final framing and stakeholder communication. Most creative of the three. | Least reliable for real evidence — combines quotes. Excels at packaging, not accuracy. |

**Recommendation:** Use Claude for analysis work. It covers more ground while staying rooted in actual data. You get depth and breadth without as much pushing.

---

## The Four Failure Modes

### Failure Mode 1: Invented Evidence

**What happens:** Completely fictionalized quotes, or "Frankenstein quotes" sewn together from multiple sources. Triggered by constraints like "max 100 words" or "punchy quote ≤12 words."

**Why:** LLMs don't *retrieve* quotes — they *generate* text that's statistically likely given context. "Verbatim" is ambiguous. Even participant IDs and timestamps can be faked.

**Fix — Quote Selection Rules + Verification:**

```
QUOTE SELECTION RULES
- Start where the thought begins, and continue until fully expressed
- Include reasoning, not just conclusions
- Keep hedges and qualifiers — they signal uncertainty
- Include emotional language when present
- Cite with participant ID and approximate timestamp [P02 ~14:30]
- Do not combine statements from different parts of the interview
- If a quote would exceed 3 sentences, break it into separate quotes
```

```
QUOTE VERIFICATION
For each quote in the analysis above:
- Confirm the quote exists verbatim in the source transcript
- If the quote is a close paraphrase but not exact, flag it and provide the actual wording
- If the quote cannot be located, mark as NOT FOUND

Output format:
  Quote: [the quote]
  Status: VERIFIED / PARAPHRASE / NOT FOUND
  If paraphrase: Actual wording: [what they said]
  Location: [Participant ID, timestamp, or line number]
```

---

### Failure Mode 2: False or Generic Insights

**What happens:** Themes are too broad to act on — "Price is a factor," "People value reliability," "Users want more real-time information." Could describe any product in the category.

**Why:** LLMs default to consensus. They surface obvious patterns that easily rise to the top. Training priors bias toward common themes (e.g., price is always #1 in churn). If your prompt mentions "pricing issues," watch how many responses suddenly get coded as pricing-related.

**Fix — Context Loading (four required components):**

| Component | Purpose | Example |
|-----------|---------|---------|
| **Project context** | Scope and stakes | "Exploring whether to add a screen to Whoop. Major hardware decision. 10 interviews with churned users." |
| **Business goal** | What you're trying to decide | "Determine if a screen would (a) win back churned users, (b) fail to solve core problems, or (c) come with other requirements to succeed." |
| **Product context** | Domain knowledge | "Current: no screen, all data via app. Competitors with screens: Apple Watch, Garmin. Without: Oura." |
| **Participant overview** | Who's speaking | "All participants are CHURNED users. Lifetime: 6 months to 2 years." |

**For surveys, add data structure:**

```
DATA STRUCTURE
Column A (response_id): Ignore
Column B (product_tier): "one"/"peak"/"life" — use for segmentation
Column C (response): Customer's voice — primary analysis target
Column D (status): Internal tag — churned or active
Column E (source): "partner_discount," …

INTERPRETATION GUIDANCE
Audience is churned users only — this is an EXIT survey.
Focus on specificity, segment differences, and whether [feature] would actually solve the stated need.
Note: Column D coding — 0 = churned, 1 = active
```

---

### Failure Mode 3: Signal That Doesn't Guide Decisions

**What happens:** Counts and categories instead of decision clarity. "22 respondents mentioned wanting a screen" — but should you build it? That number doesn't tell you how many would truly be retained, how many really meant something else, or how many have problems the feature is irrelevant to.

**Why:** LLMs treat all mentions equally. "Screen" appears 22 times → "screen value is a theme." Without guidance, AI can't distinguish signal that should drive your roadmap from noise that sounds like signal.

**Fix — Few-Shot Calibration with a decision-specific scale:**

```
SOLUTION FIT SCALE (calibrated for [your decision])

1 - [WOULD SOLVE]: [Specific pain this directly addresses]
   Example: "[Real response example]"
   Why this is a 1: [Explanation of why it maps here]

2 - [CHEAPER FIX EXISTS]: [Sounds related but has lower-cost solution]
   Example: "[Real response example]"
   Why this is a 2: [Explanation]

3 - [DIFFERENT INTERVENTION NEEDED]: [Problem exists but feature doesn't fix it]
   Example: "[Real response example]"
   Why this is a 3: [Explanation]

4 - [OPERATIONAL FIX NEEDED]: [Billing, support, reliability — not features]
   Example: "[Real response example]"
   Why this is a 4: [Explanation]

5 - [UNRELATED]: [Left for other reasons, no connection to this decision]
   Example: "[Real response example]"
   Why this is a 5: [Explanation]
```

Show examples of each level with *why* you labeled it that way. The examples do the teaching — don't describe what good output looks like, show it.

---

### Failure Mode 4: Contradictory Insights

**What happens:** The analysis looks great — clean themes, compelling quotes, tidy summary. But no one checked whether a "strong advocate" actually hinted at behaviors suggesting otherwise, or whether statements at different points in the interview conflict.

**Why:** LLMs produce coherent responses, not self-skeptical ones. The first pass is always a hypothesis. Without a verification pass, you're treating a draft as a final answer.

**Fix — Final Verification Pass:**

```
VERIFICATION PASS
Review the analysis above for:

QUOTE VERIFICATION
- Confirm each quote exists verbatim in the source
- Flag any quotes that are paraphrased, combined, or not found

CONTRADICTION CHECK
- For each participant, check if statements at different points conflict
- Look for: stated preferences vs. described behaviors, confidence followed
  by hedging, strong opinions that soften later in the interview

CONFIDENCE ASSESSMENT
- For any finding based on limited evidence, flag it
- Note participants where the stance is unclear or mixed

Output a verification summary with flags and recommended revisions.
```

---

## Quick Audit for Any Existing Analysis

Run this on any analysis you've already done with AI:

1. Pick an analysis (interview summary, survey patterns, theme extraction)
2. Run the **Verification Pass** from Failure Mode 4 on it
3. Look for: quotes that don't exist, contradictions that got buried, "patterns" based on a single response

**15 minutes of verification now vs. 6 months of building the wrong thing.**

---

## Summary Table

| Failure Mode | Symptom | Fix |
|---|---|---|
| Invented evidence | Fake or mashed-up quotes | Quote selection rules + verification |
| False/generic insights | "Price is a factor" | Context loading (project, business goal, product, participants) |
| Non-actionable signal | "22 mentioned screens" | Few-shot calibration with decision-specific scale |
| Contradictory insights | Clean narrative hiding conflicts | Final verification pass |
