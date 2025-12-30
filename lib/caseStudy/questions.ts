export interface Question {
  id: string;
  text: string;
  category: "core-loop" | "pillar" | "system" | "integration";
  pillar?: "desperation" | "consequence" | "cooperation" | "chaos" | "stakes";
  system?: string;
  why: string;
  howToTest: string;
  relatedPOCs: number[];
}

export const QUESTIONS: Question[] = [
  // Core Loop
  {
    id: "core-loop-phases",
    text: "Does the loop create distinct phases (plan → execute → chaos → escape), or does it blur?",
    category: "core-loop",
    why: "The GDD describes distinct mission phases. If they blur together, the fantasy of 'careful plans meet chaos' is lost.",
    howToTest: "Play through a mission and identify clear phase transitions. Do players recognize when they've moved from planning to execution to chaos?",
    relatedPOCs: [7, 8],
  },
  {
    id: "core-loop-minimum-fun",
    text: "What's the minimum fun version of a run in 6–8 minutes?",
    category: "core-loop",
    why: "Demo scope targets 4-week development. We need to validate the shortest engaging experience.",
    howToTest: "Time a minimal run (primary objective only, no secondary). Does it feel complete or rushed?",
    relatedPOCs: [7, 8],
  },
  {
    id: "core-loop-quiet-vs-loud",
    text: "Do players understand 'quiet vs loud' and feel it as a meaningful choice?",
    category: "core-loop",
    why: "This is the core dilemma. If players don't perceive the tradeoff, the game's tension evaporates.",
    howToTest: "Present players with clear quiet/loud path options. Do they deliberate? Do they understand consequences?",
    relatedPOCs: [1, 2, 4, 5, 7],
  },
  {
    id: "core-loop-failure-mode",
    text: "What is the primary failure mode (death? time? resources?) and does it feel fair?",
    category: "core-loop",
    why: "Failure must feel like player error, not arbitrary punishment. GDD emphasizes 'fair but consequential'.",
    howToTest: "Track failure reasons. Do players blame themselves or the game?",
    relatedPOCs: [7, 8],
  },

  // Pillar: Desperation (Economy)
  {
    id: "desperation-loadout-choice",
    text: "Can players make an agonizing loadout choice with only ~200 credits?",
    category: "pillar",
    pillar: "desperation",
    why: "The GDD's 'Pre-Mission Dilemma' requires this choice to feel impossible. If it's easy, the pillar fails.",
    howToTest: "Give players 200 credits and present loadout options. Do they hesitate? Do they feel constrained?",
    relatedPOCs: [5],
  },
  {
    id: "desperation-reward-tuning",
    text: "Are rewards/costs tuned so that 'one more run' feels rational, not grindy?",
    category: "pillar",
    pillar: "desperation",
    why: "Success criteria: 'Players want to try one more run'. This requires economic balance.",
    howToTest: "After a failed run, do players want to retry immediately? Or do they feel stuck?",
    relatedPOCs: [5, 7],
  },
  {
    id: "desperation-strike-2-impact",
    text: "Does Strike 2 (+25% costs) meaningfully change behavior, or just annoy?",
    category: "pillar",
    pillar: "desperation",
    why: "Strike 2 should create tension, not frustration. Players should adapt strategy, not quit.",
    howToTest: "Simulate Strike 2 state. Do players change loadout strategy? Or do they ignore it?",
    relatedPOCs: [5],
  },

  // Pillar: Consequence (Heat + Responses)
  {
    id: "consequence-cause-effect",
    text: "Do players perceive a cause→effect chain from noise → heat → response?",
    category: "pillar",
    pillar: "consequence",
    why: "If players don't understand why heat rises, the system feels arbitrary and unfair.",
    howToTest: "Have players make noise and observe heat. Do they connect the action to the consequence?",
    relatedPOCs: [2, 3],
  },
  {
    id: "consequence-threshold-escalation",
    text: "Do thresholds feel like escalation, not arbitrary punishment?",
    category: "pillar",
    pillar: "consequence",
    why: "Heat thresholds (25, 50, 75, 100) must feel like natural progression, not sudden spikes.",
    howToTest: "Playtest heat progression. Do players anticipate thresholds? Do they feel fair?",
    relatedPOCs: [2, 3],
  },
  {
    id: "consequence-feedback-channel",
    text: "What is the best feedback channel: UI meter, audio, lighting, guard barks?",
    category: "pillar",
    pillar: "consequence",
    why: "Players need clear feedback about heat level. Multiple channels may be needed for clarity.",
    howToTest: "Test different feedback methods. Which do players notice? Which feel intrusive?",
    relatedPOCs: [2],
  },

  // Pillar: Cooperation (Objectives + Vulnerability)
  {
    id: "cooperation-terminal-tension",
    text: "Does the 10s terminal hack create real co-op tension (one hacks, one covers)?",
    category: "pillar",
    pillar: "cooperation",
    why: "The GDD requires 'both players vulnerable' during hack. If it's solo-able, cooperation fails.",
    howToTest: "Observe players during terminal hack. Do they coordinate? Does one player feel useless?",
    relatedPOCs: [4],
  },
  {
    id: "cooperation-must-coordinate",
    text: "Are there moments where players must coordinate under pressure?",
    category: "pillar",
    pillar: "cooperation",
    why: "Cooperation pillar requires 'teammate is your lifeline'. If players can solo everything, it's not co-op.",
    howToTest: "Identify moments requiring coordination. Do players naturally split roles?",
    relatedPOCs: [4, 6],
  },
  {
    id: "cooperation-splitting-up",
    text: "Does splitting up ever feel optimal, and is that okay for the fantasy?",
    category: "pillar",
    pillar: "cooperation",
    why: "If splitting up is always optimal, cooperation becomes parallel solo play.",
    howToTest: "Observe player behavior. Do they stick together or split? Does splitting feel strategic or forced?",
    relatedPOCs: [4],
  },

  // Pillar: Chaos (Physics + Destruction)
  {
    id: "chaos-physics-laughs",
    text: "Do physics mishaps create laughs without breaking trust?",
    category: "pillar",
    pillar: "chaos",
    why: "GDD tone: 'serious characters, silly situations'. Physics should be funny but not frustrating.",
    howToTest: "Introduce physics mishaps. Do players laugh or rage quit?",
    relatedPOCs: [1],
  },
  {
    id: "chaos-destruction-strategy",
    text: "Is destruction readable and controllable enough to be 'strategy,' not random?",
    category: "pillar",
    pillar: "chaos",
    why: "Destruction must feel like a toolkit, not chaos. Players need to predict outcomes.",
    howToTest: "Have players plan destruction routes. Do they feel in control? Or surprised by results?",
    relatedPOCs: [1],
  },

  // Pillar: Stakes (Failure + Reset)
  {
    id: "stakes-fired-acceptance",
    text: "Do players accept 'FIRED' as dramatic stakes, or reject it as punitive?",
    category: "pillar",
    pillar: "stakes",
    why: "Strike 3 resets everything. This must feel dramatic, not unfair.",
    howToTest: "Simulate Strike 3. Do players want to restart? Or do they quit?",
    relatedPOCs: [5, 7],
  },
  {
    id: "stakes-failure-feedback",
    text: "What information do players need after failure to feel 'I can do better next run'?",
    category: "pillar",
    pillar: "stakes",
    why: "Failure must feel learnable. Players need clear feedback on what went wrong.",
    howToTest: "After failure, what questions do players ask? What information do they need?",
    relatedPOCs: [7],
  },

  // System: Multiplayer Foundation
  {
    id: "multiplayer-authority",
    text: "What is authoritative (server) vs predicted (client)?",
    category: "system",
    system: "multiplayer",
    why: "Network architecture affects all other systems. Wrong choices cause desync and frustration.",
    howToTest: "Define authority model. Test edge cases (disconnect, lag spike). Does state stay consistent?",
    relatedPOCs: [0],
  },
  {
    id: "multiplayer-failure-modes",
    text: "What failure modes must be handled (disconnect mid-hack, mid-escape)?",
    category: "system",
    system: "multiplayer",
    why: "Co-op games fail if disconnects break the experience. We need graceful degradation.",
    howToTest: "Simulate disconnects at critical moments. Does the game handle it gracefully?",
    relatedPOCs: [0, 4, 7],
  },
  {
    id: "multiplayer-latency-budget",
    text: "What latency budget still feels like 'tight co-op'?",
    category: "system",
    system: "multiplayer",
    why: "Co-op requires responsive feel. High latency breaks the fantasy of coordinated action.",
    howToTest: "Test at various latencies. At what point does co-op feel sluggish?",
    relatedPOCs: [0],
  },

  // System: Destruction
  {
    id: "destruction-granularity",
    text: "What destruction granularity is fun and performant (chunks vs pre-broken)?",
    category: "system",
    system: "destruction",
    why: "Granularity affects both gameplay feel and performance. Wrong choice breaks the demo.",
    howToTest: "Prototype different granularities. Which feels best? Which performs best?",
    relatedPOCs: [1],
  },
  {
    id: "destruction-minimal-set",
    text: "What is the minimal destructible set for the demo (walls only vs floors)?",
    category: "system",
    system: "destruction",
    why: "Demo scope: 'one room with destructible elements'. We need to define what's destructible.",
    howToTest: "Test different destruction sets. What's the minimum that feels strategic?",
    relatedPOCs: [1],
  },
  {
    id: "destruction-sync-events",
    text: "How do we sync 'destruction events' so clients agree on the world?",
    category: "system",
    system: "destruction",
    why: "Desync breaks immersion. Players must see the same world state.",
    howToTest: "Have two players destroy simultaneously. Do both see the same result?",
    relatedPOCs: [0, 1],
  },

  // System: Heat
  {
    id: "heat-source-values",
    text: "Are heat source values correct for pacing (footsteps/gunshots/explosions)?",
    category: "system",
    system: "heat",
    why: "GDD specifies values (+1, +5, +15, +25, +35). These must create the right pacing.",
    howToTest: "Playtest with GDD values. Does heat rise too fast? Too slow?",
    relatedPOCs: [2],
  },
  {
    id: "heat-decay-pause",
    text: "Does decay work, and when should it pause?",
    category: "system",
    system: "heat",
    why: "GDD: '-1 per second when no guards investigating'. This affects pacing significantly.",
    howToTest: "Test decay behavior. Does it feel right? Should it pause during investigations?",
    relatedPOCs: [2, 3],
  },
  {
    id: "heat-threshold-type",
    text: "Should thresholds be fixed, stochastic, or context-sensitive?",
    category: "system",
    system: "heat",
    why: "Fixed thresholds may feel predictable. Stochastic may feel unfair. Need to validate.",
    howToTest: "Test different threshold types. Which creates the best tension?",
    relatedPOCs: [2],
  },

  // System: AI Guards
  {
    id: "ai-simple-smart",
    text: "Can guards be 'smart' with simple rules (patrol → investigate → hunt)?",
    category: "system",
    system: "ai-guards",
    why: "Complex AI is expensive. Simple state machine may be sufficient for the fantasy.",
    howToTest: "Implement simple state machine. Do guards feel smart? Or obviously scripted?",
    relatedPOCs: [3],
  },
  {
    id: "ai-communication",
    text: "How do guards communicate state to players (barks, lights, posture)?",
    category: "system",
    system: "ai-guards",
    why: "Players need to read guard state. Unclear communication breaks stealth gameplay.",
    howToTest: "Test different communication methods. Can players read guard state?",
    relatedPOCs: [3],
  },
  {
    id: "ai-pressure-not-combat",
    text: "Do guards create pressure without forcing combat every run?",
    category: "system",
    system: "ai-guards",
    why: "Stealth runs must be viable. If guards always force combat, the quiet/loud choice disappears.",
    howToTest: "Attempt stealth runs. Can players avoid combat? Or are they forced into fights?",
    relatedPOCs: [3],
  },

  // System: Objectives
  {
    id: "objectives-dilemmas",
    text: "Do secondary objectives create real dilemmas (time vs heat vs reward)?",
    category: "system",
    system: "objectives",
    why: "GDD: 'objectives are dilemmas'. If they're just checkboxes, cooperation fails.",
    howToTest: "Present secondary objectives. Do players deliberate? Do they create tension?",
    relatedPOCs: [4],
  },
  {
    id: "objectives-interruptions",
    text: "What interruptions are allowed (pause hack progress vs reset)?",
    category: "system",
    system: "objectives",
    why: "Hack interruption behavior affects tension. Too forgiving = no tension. Too harsh = frustration.",
    howToTest: "Interrupt terminal hack. Does it feel fair? Does it create tension?",
    relatedPOCs: [4],
  },
  {
    id: "objectives-understandable",
    text: "Are objectives understandable without reading docs?",
    category: "system",
    system: "objectives",
    why: "Players shouldn't need to read docs to understand objectives. UI/UX must be clear.",
    howToTest: "Show objectives to new players. Do they understand what to do?",
    relatedPOCs: [4],
  },

  // System: Super Encounter
  {
    id: "super-climax-not-chore",
    text: "Does the Super feel like a climax, not a chore?",
    category: "system",
    system: "super",
    why: "Super is the dramatic peak. If it feels like a chore, the climax fails.",
    howToTest: "Playtest Super encounter. Do players feel excitement? Or annoyance?",
    relatedPOCs: [6],
  },
  {
    id: "super-escape-skill",
    text: "Can players escape reliably with skill, and does it feel earned?",
    category: "system",
    system: "super",
    why: "Super should be escapable with skill. If it's random, it feels unfair.",
    howToTest: "Test escape scenarios. Do skilled players escape? Do unskilled players die?",
    relatedPOCs: [6],
  },
  {
    id: "super-stun-strategic",
    text: "Is stun satisfying and scarce enough to be strategic?",
    category: "system",
    system: "super",
    why: "Stun requires explosives (expensive). It must feel like a meaningful choice, not spam.",
    howToTest: "Test stun usage. Do players save it? Or spam it? Does it feel satisfying?",
    relatedPOCs: [5, 6],
  },

  // Integration
  {
    id: "integration-fragile-interactions",
    text: "Which system interaction is most fragile (heat↔AI, destruction↔sync, economy↔tools)?",
    category: "integration",
    why: "System interactions create edge cases. We need to identify the most fragile ones.",
    howToTest: "Test system interactions. Which break most often? Which create unexpected behavior?",
    relatedPOCs: [8],
  },
  {
    id: "integration-minimal-polish",
    text: "What is the minimal 'polish set' required to sell the fantasy (audio/UI/juice)?",
    category: "integration",
    why: "Demo scope is 4 weeks. We need to identify minimum viable polish.",
    howToTest: "Test with/without polish elements. What's the minimum that sells the fantasy?",
    relatedPOCs: [8],
  },
];

export function getQuestionsByPOC(pocId: number): Question[] {
  return QUESTIONS.filter((q) => q.relatedPOCs.includes(pocId));
}

export function getQuestionsByCategory(category: Question["category"]): Question[] {
  return QUESTIONS.filter((q) => q.category === category);
}

export function getQuestionsByPillar(pillar: Question["pillar"]): Question[] {
  return QUESTIONS.filter((q) => q.pillar === pillar);
}

export function getQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}
