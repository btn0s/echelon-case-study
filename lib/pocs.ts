export type POCStatus = "pending" | "in-progress" | "complete";

export interface POCData {
  id: number;
  slug: string;
  title: string;
  status: POCStatus;
  objective: string;
  description: string;
  keyQuestion: string;
  questionIds?: string[];
  focus: string;
  gddMapping: string[];
}

export const POCS: POCData[] = [
  {
    id: 0,
    slug: "0-multiplayer-foundation",
    title: "Multiplayer Foundation",
    status: "pending",
    objective:
      "Establish multiplayer networking architecture. Validate reliable player movement synchronization, connection handling, and foundational multiplayer infrastructure that all other systems depend on.",
    description:
      "Prove multiplayer networking works reliably. Validate player movement sync, connection handling, reconnection logic, and server-client architecture. This is the foundation that enables all cooperative gameplay.",
    keyQuestion: "Can we build a reliable multiplayer foundation that supports all other systems?",
    questionIds: ["multiplayer-authority", "multiplayer-failure-modes", "multiplayer-latency-budget"],
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
    status: "pending",
    objective:
      "Prove destructible environment works in multiplayer context. Validate physics engine choice, destruction approaches, state synchronization, and performance with multiple clients destroying simultaneously.",
    description:
      "Prove destructible environment works in multiplayer context with physics engine integration and state synchronization. The environment isn't backdrop — it's your toolkit.",
    keyQuestion: "Can we make destruction feel strategic and sync reliably across multiple players?",
    questionIds: [
      "chaos-physics-laughs",
      "chaos-destruction-strategy",
      "destruction-granularity",
      "destruction-minimal-set",
      "destruction-sync-events",
    ],
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
    status: "pending",
    objective:
      "Prove the tension/risk mechanic works. Validate that heat creates meaningful pressure, players understand cause-effect relationships, and threshold-based events create proper tension escalation.",
    description:
      "Prove the tension/risk mechanic works through heat calculation, noise detection, and threshold-based events. Volume equals attention — the louder you are, the harder the world pushes back.",
    keyQuestion: "Does heat create meaningful tension without feeling frustrating or arbitrary?",
    questionIds: [
      "consequence-cause-effect",
      "consequence-threshold-escalation",
      "consequence-feedback-channel",
      "heat-source-values",
      "heat-decay-pause",
      "heat-threshold-type",
    ],
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
    status: "pending",
    objective:
      "Create engaging AI opposition. Implement patrol behavior, investigation logic, and state machines. Prove that guards feel smart but fair, creating tension without frustration.",
    description:
      "Create engaging AI opposition with patrol behavior, investigation logic, and state machines. Guards respond to heat levels and create the actual gameplay challenge.",
    keyQuestion: "Can we create AI guards that feel smart and challenging without being frustrating?",
    questionIds: ["ai-simple-smart", "ai-communication", "ai-pressure-not-combat"],
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
    status: "pending",
    objective:
      "Validate cooperative interaction design. Implement terminal hacking, shared objectives, and completion tracking. Prove that objectives create meaningful cooperation moments and dilemmas that split team attention.",
    description:
      "Validate cooperative interaction design through terminal hacking and shared objectives. Objectives aren't just tasks — they're dilemmas designed to split your team's attention.",
    keyQuestion: "Do objectives create real cooperation, or just parallel solo tasks?",
    questionIds: [
      "cooperation-terminal-tension",
      "cooperation-must-coordinate",
      "cooperation-splitting-up",
      "objectives-dilemmas",
      "objectives-interruptions",
      "objectives-understandable",
    ],
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
    status: "pending",
    objective:
      "Test economic pressure mechanics. Implement credit system, loadout selection, and failure consequences. Validate that economy creates meaningful choices and tension, not frustration.",
    description:
      "Test economic pressure mechanics with credits, loadouts, and failure consequences. Every tool costs money you don't have to buy gear you can't afford to lose.",
    keyQuestion: "Can economic constraints create interesting choices without feeling punitive?",
    questionIds: [
      "desperation-loadout-choice",
      "desperation-reward-tuning",
      "desperation-strike-2-impact",
      "stakes-fired-acceptance",
      "stakes-failure-feedback",
    ],
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
    status: "pending",
    objective:
      "Create dramatic climax moment. Implement boss spawn at heat 100, chase mechanics, and escape conditions. Prove that the Super feels threatening and memorable while remaining fun to play against.",
    description:
      "Create dramatic climax moment with boss spawn, chase mechanics, and escape conditions. When Heat hits 100, a Super arrives — an elite, superpowered enforcer.",
    keyQuestion: "Does the Super encounter feel exciting and memorable, not frustrating?",
    questionIds: ["super-climax-not-chore", "super-escape-skill", "super-stun-strategic"],
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
    status: "pending",
    objective:
      "Validate complete game loop. Implement pre-mission shop, mission start/end flow, extraction mechanics, and win/lose condition handling. Prove the full mission cycle creates engaging gameplay.",
    description:
      "Validate complete game loop with pre-mission shop, mission start/end flow, extraction mechanics, and win/lose conditions. Bring together all systems into a cohesive mission experience.",
    keyQuestion: "Does the complete mission flow create an engaging game loop?",
    questionIds: [
      "core-loop-phases",
      "core-loop-minimum-fun",
      "core-loop-quiet-vs-loud",
      "core-loop-failure-mode",
      "multiplayer-failure-modes",
    ],
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
    status: "pending",
    objective:
      "Bring all systems together into cohesive game loop. Integrate all POCs, balance interactions, and polish the complete experience. Create the final MVP demo.",
    description:
      "Bring all systems together into cohesive game loop. Integrate all POCs, balance system interactions, fix edge cases, and polish the complete experience.",
    keyQuestion: "Do all systems work together cohesively to create a fun, polished experience?",
    questionIds: ["integration-fragile-interactions", "integration-minimal-polish"],
    focus: "System interactions, balance, UI/UX polish, audio/visual polish, edge cases",
    gddMapping: [
      "Demo Scope (lines 163-184)",
      "Success Criteria (lines 173-177)",
      "Technical Priority (lines 178-184)",
      "Complete game loop integration",
    ],
  },
] as const;

export type POCStatus = "pending" | "in-progress" | "complete";
export type POC = (typeof POCS)[number] & { status: POCStatus };

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
