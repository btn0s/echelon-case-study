export const POCS = [
  {
    id: 0,
    slug: "0-multiplayer-foundation",
    title: "Multiplayer Foundation",
    status: "pending" as const,
    objective:
      "Establish multiplayer networking architecture. Validate reliable player movement synchronization, connection handling, and foundational multiplayer infrastructure that all other systems depend on.",
    description:
      "Prove multiplayer networking works reliably. Validate player movement sync, connection handling, reconnection logic, and server-client architecture. This is the foundation that enables all cooperative gameplay.",
    focus: "Networking architecture, player movement sync, connection handling, server authority",
    gddMapping: [
      "Core Fantasy: Cooperation pillar",
      "Demo Scope: 2 players cooperative (line 168)",
    ],
  },
  {
    id: 1,
    slug: "1-destruction-multiplayer",
    title: "Destruction as Strategy",
    status: "pending" as const,
    objective:
      "Prove destructible environment works in multiplayer context. Validate physics engine choice, destruction approaches, state synchronization, and performance with multiple clients destroying simultaneously.",
    description:
      "Prove destructible environment works in multiplayer context with physics engine integration and state synchronization. The environment isn't backdrop — it's your toolkit.",
    focus: "Physics engine choice, destruction approaches, state sync, performance, debris management",
    gddMapping: [
      "Core System #1: Destruction as Strategy (lines 28-42)",
      "Player Tools table (lines 37-41)",
      "Mission Flow: Execution - Plans meet physics (line 134)",
    ],
  },
  {
    id: 2,
    slug: "2-heat-system",
    title: "Heat as Consequence",
    status: "pending" as const,
    objective:
      "Prove the tension/risk mechanic works. Validate that heat creates meaningful pressure, players understand cause-effect relationships, and threshold-based events create proper tension escalation.",
    description:
      "Prove the tension/risk mechanic works through heat calculation, noise detection, and threshold-based events. Volume equals attention — the louder you are, the harder the world pushes back.",
    focus: "Heat formula balance, player feedback, threshold design, decay mechanics",
    gddMapping: [
      "Core System #2: Heat as Consequence (lines 43-59)",
      "Heat Scale table (lines 46-52)",
      "Heat Sources (lines 53-58)",
      "Mission Flow: Escalation - Heat rises (line 135)",
    ],
  },
  {
    id: 3,
    slug: "3-ai-guards",
    title: "AI Guards & Opposition",
    status: "pending" as const,
    objective:
      "Create engaging AI opposition. Implement patrol behavior, investigation logic, and state machines. Prove that guards feel smart but fair, creating tension without frustration.",
    description:
      "Create engaging AI opposition with patrol behavior, investigation logic, and state machines. Guards respond to heat levels and create the actual gameplay challenge.",
    focus: "Pathfinding, behavior patterns, state machine design, investigation logic, spawn system",
    gddMapping: [
      "Heat Scale: Guard responses (lines 47-52)",
      "Mission Flow: Escalation - More guards (line 136)",
      "Core Fantasy: Consequence pillar",
    ],
  },
  {
    id: 4,
    slug: "4-coop-objectives",
    title: "Dynamic Co-op Objectives",
    status: "pending" as const,
    objective:
      "Validate cooperative interaction design. Implement terminal hacking, shared objectives, and completion tracking. Prove that objectives create meaningful cooperation moments and dilemmas that split team attention.",
    description:
      "Validate cooperative interaction design through terminal hacking and shared objectives. Objectives aren't just tasks — they're dilemmas designed to split your team's attention.",
    focus: "Cooperation mechanics, objective design, UI/UX, dilemma design",
    gddMapping: [
      "Core System #3: Dynamic Co-op Objectives (lines 61-73)",
      "Primary Objective: Terminal hack (line 66)",
      "Secondary Objectives table (lines 68-72)",
      "Core Fantasy: Cooperation pillar",
    ],
  },
  {
    id: 5,
    slug: "5-economy",
    title: "Economic Pressure",
    status: "pending" as const,
    objective:
      "Test economic pressure mechanics. Implement credit system, loadout selection, and failure consequences. Validate that economy creates meaningful choices and tension, not frustration.",
    description:
      "Test economic pressure mechanics with credits, loadouts, and failure consequences. Every tool costs money you don't have to buy gear you can't afford to lose.",
    focus: "Credit balance, loadout choices, failure system, persistence",
    gddMapping: [
      "Core System #4: Economic Pressure (lines 74-101)",
      "Credit Economy table (lines 77-83)",
      "Loadout Options (lines 84-96)",
      "Failure System (lines 97-101)",
      "Core Fantasy: Desperation and Stakes pillars",
      "Mission Flow: Pre-Mission - The Dilemma (lines 130-131)",
    ],
  },
  {
    id: 6,
    slug: "6-super",
    title: "Super Encounter",
    status: "pending" as const,
    objective:
      "Create dramatic climax moment. Implement boss spawn at heat 100, chase mechanics, and escape conditions. Prove that the Super feels threatening and memorable while remaining fun to play against.",
    description:
      "Create dramatic climax moment with boss spawn, chase mechanics, and escape conditions. When Heat hits 100, a Super arrives — an elite, superpowered enforcer.",
    focus: "Boss design, chase mechanics, stun system, dramatic entrance, escape conditions",
    gddMapping: [
      "Super Encounters section (lines 112-127)",
      "Heat Scale: SUPER state at 75-100 (line 52)",
      "Mission Flow: Super Encounter - The Terror (lines 138-139)",
    ],
  },
  {
    id: 7,
    slug: "7-mission-flow",
    title: "Mission Flow & Lobby",
    status: "pending" as const,
    objective:
      "Validate complete game loop. Implement pre-mission shop, mission start/end flow, extraction mechanics, and win/lose condition handling. Prove the full mission cycle creates engaging gameplay.",
    description:
      "Validate complete game loop with pre-mission shop, mission start/end flow, extraction mechanics, and win/lose conditions. Bring together all systems into a cohesive mission experience.",
    focus: "Pre-mission shop integration, mission flow, extraction, win/lose conditions, lobby system",
    gddMapping: [
      "Mission Flow section (lines 128-141)",
      "Win/Lose Conditions table (lines 143-151)",
      "Pre-Mission: The Dilemma (lines 130-131)",
      "Extraction: The Choice (lines 140-141)",
    ],
  },
  {
    id: 8,
    slug: "integration",
    title: "Integration & Polish",
    status: "pending" as const,
    objective:
      "Bring all systems together into cohesive game loop. Integrate all POCs, balance interactions, and polish the complete experience. Create the final MVP demo.",
    description:
      "Bring all systems together into cohesive game loop. Integrate all POCs, balance system interactions, fix edge cases, and polish the complete experience.",
    focus: "System interactions, balance, UI/UX polish, audio/visual polish, edge cases",
    gddMapping: [
      "Demo Scope (lines 163-184)",
      "Success Criteria (lines 173-177)",
      "Technical Priority (lines 178-184)",
      "Complete game loop integration",
    ],
  },
] as const;

export type POC = (typeof POCS)[number];
export type POCStatus = POC["status"];

export function getPOCBySlug(slug: string): POC | undefined {
  return POCS.find((poc) => poc.slug === slug);
}

export function getPOCNavigation(slug: string) {
  const index = POCS.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? POCS[index - 1] : null,
    next: index < POCS.length - 1 ? POCS[index + 1] : null,
  };
}
