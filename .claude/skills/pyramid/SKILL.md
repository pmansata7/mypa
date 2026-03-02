# Pyramid Principle - Executive Communication

Structure executive communications using the Pyramid Principle: lead with conclusions first, then supporting details.

## When to Use

- User says `/pyramid` with or without context
- User wants to structure an exec update, email, Slack message, or board communication
- User needs to communicate performance gaps, action plans, or requests for approval

## Arguments

**Optional:** User can provide inline context after the command.

**Examples:**
- `/pyramid` → prompt for context
- `/pyramid Q1 missed target by 4%, need approval to pivot to mid-market`
- `/pyramid [paste draft] — restructure this for Tina`

If context is missing, ask for:
1. **Situation** - What happened / what's the update?
2. **Audience** - Who is this for? (VP, SVP, Board)
3. **Ask** - What do you need from them? (approval, awareness, decision)

## The Pyramid Principle

### Why It Matters

Executives have fragmented attention. Bottoms-up communication (process → research → analysis → conclusion) forces them to meander through your story before getting the answer.

**Bottoms-up (avoid):**
> "I did research, talked to 10 people, analyzed the data, and therefore my conclusion is X."

**Tops-down (use):**
> "My recommendation is X. Here's why, broken into three buckets."

### The Framework

```
1. CONTEXT (2-3 lines)
   - Why are we discussing this? What's the situation?
   - Dimensionalize: "Target was 12%, we delivered 8%, which is a $4M gap"

2. CONCLUSION / TLDR
   - Answer + recommendation upfront
   - "Gap is driven by enterprise softness. Plan to recover via mid-market."

3. DIAGNOSIS (separate from solution)
   - What's driving the issue?
   - "80% of softness from enterprise renewals, 20% from mid-market"
   - Why this matters: exec may disagree with diagnosis → debate that first

4. ACTION PLAN (time-bound buckets)
   - H1: [immediate actions within your control]
   - H2+: [longer-term actions requiring cross-functional work]
   - For each action: why it will work (not just what it is)

5. CLEAR ASK
   - Not: "Do you have questions?"
   - Yes: "Do I have your approval to proceed with X?"
   - Yes: "I need your blessing before engaging AUP team"
   - Yes: "Proceeding with A and B. Need your approval for C."
```

## Key Principles

| Principle | Guidance |
|-----------|----------|
| **Lead with answer** | Conclusion first, then supporting details |
| **Diagnosis ≠ Prescription** | Keep them separate; diagnosis explains what happened, prescription is what to do |
| **MECE structure** | Mutually Exclusive, Collectively Exhaustive buckets |
| **Bullet points > paragraphs** | Easier to scan, like offer cards vs walls of text |
| **Specific timelines** | Use "H1" and "H2" not vague "short-term" / "long-term" |
| **Clear asks** | State exactly what approval/decision you need |
| **Clarifying questions OK** | Not a burden on execs - saves everyone time |
| **Reframe your role** | You inform their thinking, not just answer questions |

## Mindset Shifts

1. **Don't fear clarifying questions** - "If you don't get clarity, you'll waste more time anyway"
2. **Reframe your role** - You're not just an answer provider; you help inform their thinking and can challenge assumptions
3. **Good communication is lipstick on good thinking** - If the logic has holes, no amount of formatting saves it

## Process

### Step 1: Gather context (if needed)
Ask for: situation, audience, and what they need (approval vs. awareness)

### Step 2: Structure the communication
1. Write 2-3 line context with dimensionalized numbers
2. Write TLDR with diagnosis + recommendation
3. Separate diagnosis section (what's driving the issue)
4. Action plan with H1/H2 buckets, each with "why it will work"
5. Clear ask at the end

### Step 3: Deliver output
- For email: include subject line that states the ask
- For Slack: use bullet points, keep it scannable
- For live meetings: lead with 3 bullets, invite questions (shows you prepared)

### Step 4: Refine
- Remove filler words ("reaching out", "I wanted to share")
- Convert paragraphs to bullet points
- Ensure diagnosis is separate from action plan
- Make timelines specific (H1, H2, Q2)

## Template

```
Subject: [Action needed]: [Topic] - [Key metric]

[CONTEXT - 2-3 lines]
Target was X, we delivered Y, which translates to Z gap.

[TLDR]
Gap primarily driven by [diagnosis]. Plan to recover via [prescription].
[If applicable]: Need your approval to proceed with [specific action].

[DIAGNOSIS]
• [Driver 1] - accounts for X% of gap
• [Driver 2] - accounts for Y% of gap
• [Why path forward is/isn't viable in current area]

[ACTION PLAN]

H1:
• [Action 1] - [why it will work]
• [Action 2] - [why it will work]

H2+:
• [Action 3] - requires [cross-functional partner], [why worth investment]

[ASK]
Proceeding with H1 actions. Need your approval for [specific H2 action] before I engage [partner team].
Please confirm by [date] so I can [next step].
```

## Anti-Patterns to Avoid

- Starting with "I wanted to reach out about..."
- Burying the ask at the end
- Mixing diagnosis and prescription in same section
- Using vague timelines ("short-term", "soon")
- Asking "do you have questions?" instead of specific ask
- Long paragraphs instead of bullet points
- Showing all your research to prove thoroughness

---

## Example: Enterprise Revenue Course Correction

### Before (Bottoms-Up, Unfocused)

```
Subject: Plan to course correct Enterprise revenue softness in Q2

Hi Big Exec,

Our revenue growth in Q1 (target 12% reached 8%) 4M path. No path fwd in 
enterprise is 4% lower than last year; details below on plan to address 
this softness:

Our enterprise division contracts did not pan out due to overall industry 
softness and reduced NDR. The plan to cover $4M gap in H1 would require us 
to offer self serve contracts via product functionality.
1) Can cover all of $4M gap
2) Cover potential shortfall for 1m of Q1 as we launch this into Q2
3) Initial assessment from AuP - willing to work if we can show your approval

I need your approval to proceed with developing an MVP solution with AUP 
to stem revenue loss from Enterprise

Key Points
• Enterprise segment growth last year x% compared to y% (-10%)
  - We had budgeted for an NDR of 16% in enterprise contracts - actual Q1 
    softer at 1%
• SMB growth last year x% compared to y% (+3%)
• SMBs cannot self serve today leading to longer times to close contracts

Investigation
• Reviewed customer contract closure and spoke to 10 people from sales 
  team including [name drop]
• Spoke to Product and Eng on feasibility to build an MVP in Q2
  - Eng timelines indicate that an MVP solution can be delivered in 30 days 
    from the time of approval
```

**Problems:**
- Opens with confusing sentence mixing multiple concepts
- Diagnosis and prescription jumbled together
- "Investigation" section at bottom—proves thoroughness but buries value
- Ask appears mid-email, then restated
- Key numbers scattered throughout

### After (Pyramid Principle Applied)

```
Subject: [Approval Needed] Enterprise Revenue Gap - $4M Recovery Plan

Hi [Exec],

CONTEXT
Q1 revenue growth: 8% vs. 12% target = $4M gap. Enterprise segment drove 
the miss; no viable path to recover within Enterprise this half.

TLDR
Enterprise NDR collapsed (budgeted 16%, actual 1%). Recommend recovering 
via SMB self-serve—can close the full $4M gap in H1. Need your approval 
to engage AUP on MVP build.

DIAGNOSIS
• Enterprise: NDR 15 points below plan due to industry-wide softness
• SMB: +3% YoY growth, but no self-serve → slow contract velocity
• Enterprise path blocked: No realistic recovery lever this half

ACTION PLAN

H1 (Q2):
• Build SMB self-serve MVP with AUP (30-day delivery post-approval)
  - Unlocks faster contract closure in segment already growing
  - Can recover full $4M gap + buffer for Q1 shortfall carryover

H2+:
• Monitor Enterprise NDR stabilization
• Scale self-serve based on Q2 learnings

VALIDATION
• Spoke with 10 sales reps including [name] — confirmed SMB bottleneck
• AUP confirmed feasibility and 30-day timeline pending approval
• Product/Eng aligned on MVP scope

ASK
I need your approval to proceed with AUP on the self-serve MVP.
Please confirm by [date] so we can begin build and recover in Q2.

Dalton
```

**What changed:**
| Before | After |
|--------|-------|
| Confusing opening paragraph | Clean 2-line context with dimensionalized gap |
| Diagnosis + prescription mixed | Separated into distinct sections |
| "Investigation" section proving work | "Validation" section showing due diligence briefly |
| Ask buried and repeated | Single clear ask at end with deadline |
| Key numbers scattered | Numbers front-loaded in context and diagnosis |
| Vague "H1" without rationale | H1/H2 buckets with "why it will work" |

---

## Source

Based on Shruti's executive communication coaching session (Feb 2026) covering the Pyramid Principle and MECE frameworks.
