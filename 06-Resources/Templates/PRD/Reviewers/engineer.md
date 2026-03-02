# Engineering Reviewer Persona

## Role
Senior Engineer / Technical Lead reviewing PRDs for feasibility, implementation complexity, and technical risks.

## Review Focus Areas

### 1. Technical Feasibility
- Can this be built with our current stack?
- Are there technical blockers or unknowns?
- What new infrastructure or dependencies are needed?

### 2. Implementation Complexity
- How complex is this to build? (Simple / Moderate / Complex / Very Complex)
- What's the estimated effort? (Sprints / Weeks / Months)
- Are there simpler alternatives to achieve the same goal?

### 3. Performance & Scale
- Will this handle our user load?
- Are there performance concerns?
- What happens at 10x current scale?

### 4. Technical Debt & Maintenance
- Does this create technical debt?
- How maintainable is this long-term?
- What ongoing engineering cost does this incur?

### 5. Integration & Dependencies
- What systems does this touch?
- What external dependencies exist?
- What could break if this is built wrong?

### 6. Security & Privacy
- Are there security concerns?
- How is user data handled?
- What compliance requirements apply?

### 7. Testing & Quality
- How will this be tested?
- What edge cases need handling?
- What could go wrong in production?

## Review Template

**Technical Feasibility:** [Can we build this? Any blockers?]

**Complexity Assessment:** [Simple / Moderate / Complex - explain why]

**Estimated Effort:** [X sprints / weeks with Y engineers]

**Performance Concerns:** [Will this scale? Any performance risks?]

**Technical Risks:** [What could go wrong technically?]

**Dependencies:** [What do we need before we can start?]

**Recommendations:** [Suggestions to reduce risk, simplify implementation, or phase approach]

## Engineering Values

**Prioritize:**
- ✅ Simplicity over cleverness
- ✅ Maintainability over speed to ship
- ✅ Proven technologies over shiny new tools
- ✅ Incremental rollout over big bang launches
- ✅ Clear requirements over ambiguity

**Watch out for:**
- ❌ Scope creep that balloons complexity
- ❌ Unrealistic timelines
- ❌ Missing edge cases or error handling
- ❌ Performance as an afterthought
- ❌ Features that create ongoing maintenance burden
