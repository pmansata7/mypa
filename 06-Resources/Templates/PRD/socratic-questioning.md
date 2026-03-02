# Socratic Questioning Framework for Feature Refinement

This framework helps PMs think more rigorously about feature ideas before writing PRDs.

## Purpose

Before diving into documentation, use Socratic questioning to:
- Challenge assumptions
- Uncover hidden constraints
- Clarify the core problem
- Validate strategic fit
- Surface risks early

## The Questions

### 1. Core Problem & Job-to-be-Done

**Question:** What is the fundamental job-to-be-done that this feature solves?

**Why this matters:** Features often address symptoms, not root causes. Dig deeper to find the real problem.

**Follow-ups:**
- How do users currently solve this problem?
- What's inadequate about current solutions?
- Is this a "must-have" or "nice-to-have" problem?

---

### 2. Strategic Fit

**Question:** How does this feature align with our company strategy, positioning, and differentiation?

**Why this matters:** Every feature should support the company's strategic direction, not just solve isolated problems.

**Follow-ups:**
- Does this strengthen our competitive differentiation?
- Does this move us toward our vision?
- Does this serve our target market?
- Could this distract us from our core value proposition?

---

### 3. User Understanding

**Question:** Who specifically needs this, and how do we know they need it?

**Why this matters:** Avoid building for "everyone" or hypothetical users. Be specific about who benefits and validate the need.

**Follow-ups:**
- What's the evidence this is a real problem? (User research, support tickets, churn analysis?)
- How large is this user segment?
- How intense is their pain?
- Are they willing to pay more for this?

---

### 4. Success Criteria

**Question:** What does success look like, and how will we measure it?

**Why this matters:** Features without clear success criteria often ship but never get evaluated or improved.

**Follow-ups:**
- What metrics will move if this succeeds?
- What's the baseline and target?
- How long until we see impact?
- What's the opportunity cost of building this?

---

### 5. Risks & Constraints

**Question:** What could go wrong, and what constraints should shape our approach?

**Why this matters:** Identify dealbreakers early before investing in detailed specs.

**Follow-ups:**
- What's the biggest technical risk?
- What's the biggest user adoption risk?
- What dependencies exist?
- What resources (time, people, money) does this require?
- What's the opportunity cost?

---

### 6. Scope & Phasing

**Question:** What's the minimal version that solves the core problem, and how should we phase this?

**Why this matters:** Avoid scope creep. Start with the simplest solution that delivers value.

**Follow-ups:**
- What's the 20% of features that deliver 80% of the value?
- What can we defer to v2 without losing core value?
- Can we test this with a smaller rollout first?
- What would an MVP look like?

---

### 7. Alternatives Considered

**Question:** What other solutions did we consider, and why is this approach best?

**Why this matters:** Demonstrate you've explored options and made deliberate trade-offs.

**Follow-ups:**
- What would happen if we don't build this?
- Could we solve this with existing features differently?
- Are there simpler alternatives?
- What did competitors do?

---

## How to Use This Framework

**For Solo Thinking:**
- Write out answers to each question before starting your PRD
- Challenge your own assumptions
- Document alternatives you considered

**With AI Partnership:**
- Ask AI to question your feature idea using this framework
- Have AI present multiple-choice or open-ended questions
- Use AI to play devil's advocate

**With Your Team:**
- Run a 30-minute feature sharpening session
- Assign someone to ask Socratic questions
- Document insights before writing specs

---

## Example: Applying to "AI Voice Chat for Tasks"

**1. Core Problem:** Users struggle to capture tasks quickly when hands-free (driving, cooking, meetings)

**2. Strategic Fit:** Aligns with "async-first" positioning - voice memos are asynchronous

**3. User Understanding:** Remote workers who multitask (30% of our user base based on survey)

**4. Success Criteria:** 15% increase in tasks created per user, 20% reduction in time-to-first-task for new users

**5. Risks:** Privacy concerns (voice data storage), accuracy issues (transcription errors), context mismatch (users in quiet offices can't talk)

**6. Scope:** MVP = Basic voice-to-task transcription. V2 = Voice commands, voice search

**7. Alternatives:** 
- Mobile quick-add widget (faster but not hands-free)
- Email-to-task (works but clunky)
- Siri/Google Assistant integration (dependencies, less control)

---

This framework ensures you've thought deeply before writing extensively. Great PRDs start with great thinking.
