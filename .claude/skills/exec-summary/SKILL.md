---
name: exec-summary
description: Craft or refine executive-level communication using Wes Kao's frameworks (sales-then-logistics, conciseness as density, signposting, MOO, accurate confidence, managing up). Add context and get structured feedback or a polished draft.
---

Help the user improve their exec communication by applying principles from Wes Kao's Lenny's Podcast episode and newsletter (communication frameworks for clarity, influence, and impact).

## When to Use

- User says `/exec-summary` or "exec summary" with or without context
- User wants to: draft an exec update, refine an email/Slack post, prepare a leadership ask, summarize for a meeting, or get feedback on existing copy

## Arguments

**Optional:** User can provide inline context after the command.

**Examples:**
- `/exec-summary` → prompt for context
- `/exec-summary I need to tell my VP we're slipping the launch by 2 weeks and need more eng`
- `/exec-summary [paste draft] — audience: CFO, ask: approve budget for Q2`

If context is missing or thin, ask for:
1. **Purpose** – What do you want to achieve? (inform, get a decision, get support, escalate, etc.)
2. **Audience** – Who is it for? (role, how much they know, what they care about)
3. **Content** – Draft, bullet points, or raw facts; and what you're worried about (e.g. "sounds defensive", "too long")

## Frameworks to Apply

Use these explicitly when drafting or giving feedback. Cite the principle when it changes the output.

### 1. Sales, then logistics
- **Why before how.** Lead with why it matters (to them / to the business / now). Give 30–60 seconds of context before details.
- Phrases to lean on: "This matters because…", "Here's the support I need from you…", "We're doing this because…"

### 2. Conciseness = density of insight
- Conciseness is economy of words and **density of insight**, not raw brevity. If the thinking is fuzzy, trim and sharpen the thinking first, then the words.
- Before writing: What's the one outcome I want? What are the 2–3 supporting points? Why would they care?

### 3. Signposting
- Use clear navigation words: "First… Second…", "For example…", "Because…", "As a next step…", "The ask is…". Reduces cognitive load without heavy formatting.

### 4. MOO (Most Obvious Objection)
- Before sharing, spend a few seconds on the **most obvious objection** the audience will have. Address it briefly (one line is often enough) so it doesn't dominate the conversation.

### 5. Accurate confidence
- Match language to evidence: hypotheses vs facts. Use "I believe X because Y" for opinions; state facts as facts. Avoid overstating or understating.

### 6. Managing up
- Don't just ask what to do. Share your **point of view and recommendation** with 1–2 pieces of evidence. Reduces cognitive load and shows strategic thinking.

### 7. Strategy, not self-expression (for feedback/asks)
- Focus on what will **motivate the change or decision** you want. Trim the rest. "Trim 90% of what you initially want to say and keep the 10% that will make them want to act."

### 8. Small improvements compound
- Tiny upgrades (one clearer sentence, one signpost, one MOO) compound. Invest a few minutes up front to avoid long clarification threads.

## Process

### Step 1: Gather context (if needed)
- If the user gave full context (purpose, audience, draft/points), use it.
- If not, ask for: purpose, audience, and either a draft or bullet points (and any concerns).

### Step 2: Apply frameworks
- **Sales, then logistics:** Ensure "why" and "so what" come before details.
- **Density:** Remove filler; sharpen the single message and 2–3 supports.
- **Signposting:** Add or tighten navigation phrases.
- **MOO:** Identify the obvious objection and add one line addressing it.
- **Accurate confidence:** Adjust any over/understated claims.
- **Managing up:** If it's an ask or recommendation, state the recommendation and brief evidence.

### Step 3: Deliver output
- **If they provided a draft:** Return a revised version (or a before/after) with short notes on which principles were applied.
- **If they gave bullet points/raw info:** Return a polished draft (email, Slack, or bullets) plus optional 1–2 line "why this works" for key moves.
- **If they asked for feedback only:** Give focused feedback using the frameworks above (what’s working, 1–3 specific improvements).

### Step 4: Optional follow-up
- Offer: "Want a shorter version?", "Want this framed for a different audience?", or "Want to add a one-line MOO for [objection]?"

## Tone

- Match the user's `System/user-profile.yaml` → `communication` (formality, directness) when suggesting wording.
- Default: executive, crisp, direct. No fluff.

## Output Format

- Prefer short paragraphs or bullets; use headings only if the piece is long (e.g. 2+ screens).
- For emails/Slack: include a suggested subject line or first line that states the ask or main point.

## Usage Tracking (Silent)

Update `System/usage_log.md` to mark exec-summary as used when the skill is run.

---

## Quick Reference (Wes Kao principles)

| Principle | One-liner |
|-----------|-----------|
| Sales, then logistics | Why before how; 30–60 sec context first |
| Conciseness | Density of insight, not word count |
| Signposting | "First…", "Because…", "As a next step…" |
| MOO | Address the most obvious objection in one line |
| Accurate confidence | Match conviction to evidence |
| Managing up | Recommendation + evidence, not "what should I do?" |
| Strategy not self-expression | Keep the 10% that drives the decision/action |

Source: [Wes Kao on Lenny's Podcast](https://newsletter.weskao.com/p/wes-on-lennys-podcast) (Apr 2025).
