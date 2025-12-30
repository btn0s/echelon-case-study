---
name: Echelon Strategic Development Roadmap
overview: "Strategic POC-based development approach for Echelon, documenting the learning process and technical exploration through discrete prototypes focused on core mechanics."
---

# Echelon: Strategic Development Roadmap

## Philosophy

Build through **Proof of Concept (POC) prototypes** - each exploring a **core mechanic** or technical challenge that needs validation. Document learnings, decisions, and tradeoffs. The final game will integrate these learnings.

**Goal**: Create a comprehensive case study demonstrating strategic game development through iterative POC exploration of core mechanics.

---

## Core Mechanics That Need POC Validation

### 1. Destruction + Multiplayer Sync

**Why POC**: Destruction state must sync reliably across clients. Complex physics interactions need validation.

### 2. Heat System

**Why POC**: Core tension mechanic. Need to validate heat feels fair, creates pressure, and players understand cause-effect.

### 3. AI Guards

**Why POC**: Core opposition. Need to validate guards feel smart but fair, create tension without frustration.

### 4. Co-op Objectives

**Why POC**: Core cooperation mechanic. Need to validate objectives create meaningful teamwork moments.

### 5. Economy System

**Why POC**: Core pressure mechanic. Need to validate economic constraints create interesting choices, not frustration.

### 6. Super Encounter

**Why POC**: Dramatic climax moment. Need to validate Super feels threatening and memorable.

---

## POC Roadmap

### POC 1: Destruction + Multiplayer Sync

**Goal**: Prove destructible environment works in multiplayer context

**Focus Areas**:

- Physics engine choice and integration (Cannon.js vs Rapier)
- Destruction approaches (voxel, mesh cutting, pre-broken chunks)
- State synchronization across clients (event-based vs snapshot)
- Performance with multiple clients destroying simultaneously
- Debris cleanup and physics performance

**Success Criteria**:

- Two players can destroy walls and see changes sync smoothly
- Destruction feels satisfying
- Performance remains acceptable with multiple destructions
- State stays consistent across clients

**Key Questions**:

- Which physics engine handles multiplayer sync best?
- How do we handle destruction state authority (server vs client)?
- What's the destruction granularity (voxel, chunks, pre-broken)?
- How do we clean up debris without performance hits?

---

### POC 2: Heat System

**Goal**: Prove the tension/risk mechanic works

**Focus Areas**:

- Heat calculation formula (noise sources, radius, decay)
- Threshold-based events (guard spawns at heat 25, 50, 75, 100)
- Player feedback mechanisms (UI, audio, visual)
- Server-authoritative heat state
- Edge cases (simultaneous noise sources, disconnect handling)

**Success Criteria**:

- Heat creates meaningful pressure
- Players understand cause-effect relationship
- Heat feels fair (not arbitrary)
- Threshold events create tension escalation

**Key Questions**:

- What's the right heat formula balance?
- How fast should heat decay?
- What's the right threshold spacing (25, 50, 75, 100)?
- How do we communicate heat to players effectively?

---

### POC 3: AI Guards

**Goal**: Create engaging AI opposition

**Focus Areas**:

- Pathfinding approach (A\*, navmesh, flow fields, waypoints)
- State machine (Patrol → Alert → Hunt)
- Investigation behavior (responding to noise, losing player)
- Guard awareness (individual vs shared)
- Spawn system based on heat thresholds

**Success Criteria**:

- Guards feel smart but fair
- Create tension without frustration
- Patrol behavior feels natural
- Investigation creates interesting gameplay moments

**Key Questions**:

- What pathfinding approach works best for our needs?
- How should guards investigate (vision cone, sound, area search)?
- Should guards share awareness or be independent?
- What's the right balance between predictable and dynamic behavior?

---

### POC 4: Co-op Objectives

**Goal**: Validate cooperative interaction design

**Focus Areas**:

- Terminal hack mechanic (10s channel, both players vulnerable)
- Secondary objectives (vault, data extraction, evidence)
- Objective UI/UX (progress, status, communication)
- Completion tracking and rewards
- Dilemma design (objectives that split attention)

**Success Criteria**:

- Objectives create meaningful cooperation
- Terminal hack creates tension (both players vulnerable)
- Players want to coordinate strategy
- Secondary objectives create interesting tradeoffs

**Key Questions**:

- Does the terminal hack mechanic create the right tension?
- How do we communicate objective status clearly?
- What makes objectives feel cooperative vs parallel solo tasks?
- How do secondary objectives create dilemmas?

---

### POC 5: Economy System

**Goal**: Test economic pressure mechanics

**Focus Areas**:

- Credit balance and rewards
- Loadout shop (Stealth 200, Assault 275, Demolition 325)
- 3-strike failure system
- Persistence between missions
- Economic constraints creating choices (not frustration)

**Success Criteria**:

- Economic constraints create interesting decisions
- Loadout choices feel meaningful
- Failure feels consequential but not punitive
- Players want to optimize loadouts based on strategy

**Key Questions**:

- What's the right credit balance (starting, rewards, costs)?
- Does the 3-strike system create tension or frustration?
- How do loadout choices affect gameplay strategy?
- Should credits persist or reset?

---

### POC 6: Super Encounter

**Goal**: Create dramatic climax moment

**Focus Areas**:

- Super spawn trigger (heat 100)
- Dramatic entrance (breaks through wall)
- Chase mechanics (targets nearest player)
- Physics knockback attacks
- Stun mechanic (explosives, 3-second stun)
- Escape conditions

**Success Criteria**:

- Super feels threatening and memorable
- Chase creates tension and excitement
- Players can escape (not impossible)
- Stun mechanic feels satisfying to use

**Key Questions**:

- How should Super pathfind (through walls, around obstacles)?
- What makes the chase exciting vs frustrating?
- How often can Super be stunned (cooldown, chain stuns)?
- What are the escape conditions?

---

### Integration: Combined Demo

**Goal**: Bring all systems together

**Focus Areas**:

- System interactions and edge cases
- Balance across all systems
- UI/UX polish
- Audio/visual polish
- Complete mission flow

**Success Criteria**:

- All systems work together cohesively
- Core game loop feels fun and tense
- No major bugs or edge cases
- Polish level appropriate for demo

---

## Documentation Structure

Each POC page should include:

1. **Objective**: What core mechanic we're trying to prove/validate
2. **Why This Needs a POC**: What makes this mechanic risky or uncertain
3. **Implementation**: Technical approach and key decisions
4. **Results**: What worked, what didn't, key learnings
5. **Code Examples**: Key patterns and snippets
6. **Next Steps**: How this feeds into integration

---

## Page Structure

```
app/
├── page.tsx                 # Home: Case study overview & roadmap
├── poc/
│   ├── 1-destruction-multiplayer/    # POC 1: Destruction + Multiplayer Sync
│   ├── 2-heat-system/                # POC 2: Heat System
│   ├── 3-ai-guards/                  # POC 3: AI Guards
│   ├── 4-coop-objectives/            # POC 4: Co-op Objectives
│   ├── 5-economy/                    # POC 5: Economy System
│   ├── 6-super/                      # POC 6: Super Encounter
│   └── integration/                  # Final integrated demo
└── layout.tsx
```

---

## Development Order

1. **Destruction + Multiplayer Sync** - Foundation for everything else
2. **Heat System** - Core tension mechanic, needed for guards
3. **AI Guards** - Core opposition, responds to heat
4. **Co-op Objectives** - Core cooperation mechanic
5. **Economy System** - Pressure system, works with objectives
6. **Super Encounter** - Climax moment, requires heat + guards
7. **Integration** - Bring everything together

---

## Success Metrics

For each POC:

- ✅ Core mechanic goal achieved
- ✅ Learnings documented
- ✅ Code is reusable/extensible
- ✅ Performance is acceptable
- ✅ Can be demoed independently
- ✅ Answers key questions about the mechanic

For final case study:

- ✅ Clear narrative of development journey
- ✅ Technical decisions are explained with rationale
- ✅ Tradeoffs are transparent
- ✅ Code examples are valuable
- ✅ Others can learn from the process

---

## Key Questions Answered Through POCs

1. **Technical Foundation**

   - Which physics engine fits our needs?
   - How do we sync destruction state reliably?
   - What's our networking architecture?

2. **Game Feel**

   - Does destruction feel satisfying in multiplayer?
   - Does heat create the right tension?
   - Do guards feel fair but challenging?

3. **Cooperation**

   - Do objectives create meaningful cooperation?
   - Is communication essential or optional?
   - Do systems reward coordination?

4. **Economy**

   - Do credit constraints create interesting choices?
   - Is failure meaningful but not frustrating?
   - Does progression feel rewarding?

5. **Climax**
   - Does the Super encounter feel dramatic?
   - Is the chase exciting vs frustrating?
   - Do players want to escape or fight?

---

## Next Steps

1. Update POC page structure (remove scene setup, focus on mechanics)
2. Create POC 1: Destruction + Multiplayer Sync page
3. Begin implementation of POC 1
4. Document as we build
