# product-brief

Extract product ideas through guided questions and generate a PRD.

## When user invokes /product-brief

**Args:** Optional — initial idea. If missing, ask: "What product or feature are you thinking about?"

1. **Phase 1 — Capture** — Document initial idea. Don't judge, absorb.
2. **Phase 2 — Clarifying questions** — Ask conversationally (2–3 at a time):
   - Round 1: Problem, who it's for, success looks like
   - Round 2: Timeline, constraints, scope, integrations
   - Round 3: User journey, discovery, core actions
   - Round 4: Success metrics, assumptions, dependencies
3. **Phase 3 — Summary** — "What I Heard" confirmation before moving on.
4. **Phase 4 — Spec doc** — User says "spec doc" or "create spec" → generate structured product spec.
5. **Phase 5–7 — Optional** — `prioritize` (effort/impact matrix), `design flows`, `create prd`.
6. **Save** — To `04-Projects/[Product Name]/PRD.md`. Update person pages for stakeholders.

**Navigation:** `back`, `skip to prd`, `revise [section]`, `start over`.

**Full workflow:** `.claude/skills/product-brief/SKILL.md` (PRDs include: Problem, Goals, User Stories, Success Metrics per user rule)
