# interviewanalysis

Analyze one or multiple interview transcripts using verified AI research techniques (quote verification, context-guided interpretation, few-shot calibration, contradiction detection).

## When user invokes /interviewanalysis

**Args:** Optional — file paths to transcripts, or paste content directly. If missing, ask: "Share the interview transcript(s) — paste them here or point me to files."

**Reference framework:** `06-Resources/Frameworks/research.md`

---

### Phase 1 — Context Loading

Before touching the data, gather four components. Ask conversationally (2–3 questions at a time) if not provided:

1. **Project context** — What's the scope? "We're exploring [decision]. These are [N] interviews with [participant type]."
2. **Business goal** — What decision does this analysis need to inform? Frame as options: (a) build it, (b) don't build it, (c) build it with conditions.
3. **Product context** — Current state, competitors, key tensions. What would the reader need to know to interpret quotes correctly?
4. **Participant overview** — Who are these people? (churned users, power users, prospects, etc.) Segment info, tenure, any metadata.

If the user says "just analyze it" or provides minimal context, infer what you can from the transcripts and state your assumptions explicitly before proceeding. Flag where missing context limits confidence.

---

### Phase 2 — First-Pass Analysis

Analyze each transcript using these rules:

**QUOTE SELECTION RULES**
- Start where the thought begins, continue until fully expressed
- Include reasoning, not just conclusions
- Keep hedges and qualifiers — they signal uncertainty
- Include emotional language when present
- Cite with participant ID and approximate timestamp [P02 ~14:30]
- Do not combine statements from different parts of the interview
- If a quote would exceed 3 sentences, break into separate quotes

**Output for each transcript:**
- 3–7 key themes with supporting verbatim quotes
- Per-participant stance summary (what they actually want, not just what they said)
- Tensions or surprises worth flagging
- If business goal was provided: rate each participant's relevance to the decision

---

### Phase 3 — Few-Shot Calibration (if decision context exists)

If the user provided a specific decision to inform, build a **Solution Fit Scale**:

1. Propose a 3–5 level scale calibrated to their decision (e.g., "Would solve" → "Unrelated")
2. Show the user one example per level and ask: "Does this scale match how you'd think about it?"
3. Apply the scale to classify each participant's feedback
4. Output a tally: how many participants fall in each bucket, with quotes

If no specific decision — skip this phase and note that the analysis is exploratory, not decision-calibrated.

---

### Phase 4 — Verification Pass

Run this automatically after every analysis. Do not skip.

**QUOTE VERIFICATION**
- Confirm each quote exists verbatim in the source transcript
- If paraphrased: flag it, provide actual wording
- If not found: mark NOT FOUND and remove from analysis

**CONTRADICTION CHECK**
- For each participant, check if statements at different points conflict
- Look for: stated preferences vs. described behaviors, confidence followed by hedging, strong opinions that soften later
- Flag any participant whose stance is unclear or mixed

**CONFIDENCE ASSESSMENT**
- Flag any finding based on fewer than 2 participants
- Note where evidence is thin or mixed
- Distinguish between validated patterns and emerging hypotheses

Present a verification summary. Revise the analysis to incorporate any corrections.

---

### Phase 5 — Final Output

Deliver a structured analysis document:

1. **Executive summary** — 3–5 bullet points a stakeholder could act on
2. **Decision framework** (if applicable) — Clear recommendation with conditions and risks
3. **Theme deep-dives** — Each theme with verified quotes, participant count, and confidence level
4. **Per-participant summaries** — One-liner stance + key quote for each person interviewed
5. **Contradictions & caveats** — What the data doesn't tell you; where to dig deeper
6. **Verification log** — Quote accuracy rate, contradictions found, confidence flags

**Save to:** `00-Inbox/Research/[Topic]-analysis-YYYY-MM-DD.md` (create Research subfolder if needed).

---

### Navigation

- `deeper on [theme]` — Expand a specific theme with more quotes and nuance
- `verify [quote]` — Spot-check a specific quote against source
- `recalibrate` — Adjust the solution fit scale and re-run Phase 3
- `compare [P01 vs P05]` — Side-by-side participant comparison
- `deck ready` — Condense to stakeholder-ready bullet points with strongest evidence
- `add transcript` — Incorporate additional interviews into the existing analysis
