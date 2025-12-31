import type { PartyConnection, PartyKitServer } from "partykit/server";

type Vec3 = { x: number; y: number; z: number };
type InputState = { w: boolean; a: boolean; s: boolean; d: boolean };

const DEFAULT_INPUT: InputState = { w: false, a: false, s: false, d: false };

interface PlayerState {
  id: string;
  position: Vec3;
  rotation: number;
  lastProcessedInputSeq: number;
  currentInput: InputState;
}

interface GameState {
  players: Record<string, PlayerState>;
  tick: number;
}

type PartyRoom = {
  storage: {
    get<T>(key: string): Promise<T | null>;
    put<T>(key: string, value: T): Promise<void>;
    getAlarm(): Promise<number | null>;
    setAlarm(scheduledTime: number): Promise<void>;
  };
  broadcast(message: string, without?: string[]): void;
  connections: Map<string, PartyConnection>;
};

const TICK_RATE_MS = 50; // 20Hz
const TICK_DELTA_TIME = TICK_RATE_MS / 1000; // Convert to seconds

// Shared movement simulation (must match client)
function directionFromInput(input: InputState): Vec3 {
  const x = (input.d ? 1 : 0) + (input.a ? -1 : 0);
  const z = (input.s ? 1 : 0) + (input.w ? -1 : 0);
  if (x !== 0 && z !== 0) {
    return { x: x * 0.707, y: 0, z: z * 0.707 };
  }
  return { x, y: 0, z };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function simulateMovement(
  position: Vec3,
  input: InputState,
  deltaTime: number
): Vec3 {
  const dir = directionFromInput(input);
  if (dir.x === 0 && dir.z === 0) return position;

  const speed = 5;
  const movement = {
    x: dir.x * speed * deltaTime,
    y: 0,
    z: dir.z * speed * deltaTime,
  };

  return {
    x: clamp(position.x + movement.x, -9.5, 9.5),
    y: 0.5,
    z: clamp(position.z + movement.z, -9.5, 9.5),
  };
}

function parseJson(message: string): unknown {
  try {
    return JSON.parse(message);
  } catch {
    return null;
  }
}

function isInputMessage(
  data: unknown
): data is { type: "input"; seq: number; dt: number; keys: InputState } {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  const keys = d.keys as Record<string, unknown> | undefined;
  return (
    d.type === "input" &&
    typeof d.seq === "number" &&
    typeof d.dt === "number" &&
    typeof keys === "object" &&
    keys !== null &&
    typeof keys.w === "boolean" &&
    typeof keys.a === "boolean" &&
    typeof keys.s === "boolean" &&
    typeof keys.d === "boolean"
  );
}

async function loadState(room: PartyRoom): Promise<GameState> {
  const raw =
    (await room.storage.get<unknown>("state")) ??
    ({ players: {}, tick: 0 } satisfies GameState);

  // Migrate older stored shapes (e.g. transform-sync) into the current schema.
  if (typeof raw !== "object" || raw === null) {
    return { players: {}, tick: 0 };
  }

  const r = raw as Record<string, unknown>;
  const rawPlayers = (r.players ?? {}) as Record<string, unknown>;
  const tick = typeof r.tick === "number" ? r.tick : 0;

  const players: Record<string, PlayerState> = {};
  for (const [id, maybePlayer] of Object.entries(rawPlayers)) {
    if (typeof maybePlayer !== "object" || maybePlayer === null) continue;
    const p = maybePlayer as Record<string, unknown>;
    const pos = (p.position ?? {}) as Record<string, unknown>;

    const position: Vec3 = {
      x: typeof pos.x === "number" ? pos.x : 0,
      y: typeof pos.y === "number" ? pos.y : 0.5,
      z: typeof pos.z === "number" ? pos.z : 0,
    };

    const currentInputRaw = p.currentInput as Record<string, unknown> | undefined;
    const currentInput: InputState =
      currentInputRaw &&
      typeof currentInputRaw.w === "boolean" &&
      typeof currentInputRaw.a === "boolean" &&
      typeof currentInputRaw.s === "boolean" &&
      typeof currentInputRaw.d === "boolean"
        ? {
            w: currentInputRaw.w,
            a: currentInputRaw.a,
            s: currentInputRaw.s,
            d: currentInputRaw.d,
          }
        : DEFAULT_INPUT;

    players[id] = {
      id: typeof p.id === "string" ? p.id : id,
      position,
      rotation: typeof p.rotation === "number" ? p.rotation : 0,
      lastProcessedInputSeq:
        typeof p.lastProcessedInputSeq === "number" ? p.lastProcessedInputSeq : 0,
      currentInput,
    };
  }

  return { players, tick };
}

function broadcastSnapshot(room: PartyRoom, state: GameState) {
  const snapshot = {
    type: "snapshot" as const,
    serverTime: Date.now(),
    tick: state.tick,
    players: Object.values(state.players).map((p) => ({
      id: p.id,
      position: p.position,
      rotation: p.rotation,
      lastProcessedInputSeq: p.lastProcessedInputSeq,
    })),
  };
  room.broadcast(JSON.stringify(snapshot));
}

function tickSimulation(room: PartyRoom, state: GameState) {
  // Advance simulation for all players
  for (const playerId in state.players) {
    const player = state.players[playerId]!;
    player.position = simulateMovement(
      player.position,
      player.currentInput ?? DEFAULT_INPUT,
      TICK_DELTA_TIME
    );
  }

  state.tick++;
  broadcastSnapshot(room, state);
}

async function ensureTickScheduled(room: PartyRoom) {
  const existing = await room.storage.getAlarm();
  const next = Date.now() + TICK_RATE_MS;
  // If no alarm exists, or it's scheduled far in the future, schedule soon.
  if (existing === null || existing > next + 5) {
    await room.storage.setAlarm(next);
  }
}

export default {
  async onConnect(connection: PartyConnection, room: PartyRoom) {
    const state = await loadState(room);
    console.log(`[poc0] connect ${connection.id}`);

    const player: PlayerState = {
      id: connection.id,
      position: { x: 0, y: 0.5, z: 0 },
      rotation: 0,
      lastProcessedInputSeq: 0,
      currentInput: { w: false, a: false, s: false, d: false },
    };

    state.players[connection.id] = player;

    // Ensure the room has a recurring tick scheduled via alarms.
    // PartyKit runs `onAlarm` even if the room goes idle.
    await ensureTickScheduled(room);

    // Send initial snapshot
    connection.send(
      JSON.stringify({
        type: "init",
        playerId: connection.id,
        players: Object.values(state.players).map((p) => ({
          id: p.id,
          position: p.position,
          rotation: p.rotation,
        })),
      })
    );

    // Broadcast snapshot so new player sees current state
    broadcastSnapshot(room, state);

    room.broadcast(
      JSON.stringify({
        type: "player-joined",
        player: {
          id: player.id,
          position: player.position,
          rotation: player.rotation,
        },
      }),
      [connection.id]
    );

    await room.storage.put("state", state);
  },

  async onMessage(message: string, connection: PartyConnection, room: PartyRoom) {
    const data = parseJson(message);
    if (!isInputMessage(data)) return;

    const state = await loadState(room);
    const player = state.players[connection.id];
    if (!player) return;

    // Update player's current input (server uses latest input for simulation)
    player.currentInput = data.keys;

    // Track last processed sequence number
    if (data.seq > player.lastProcessedInputSeq) {
      player.lastProcessedInputSeq = data.seq;
    }

    await room.storage.put("state", state);
  },

  async onClose(connection: PartyConnection, room: PartyRoom) {
    const state = await loadState(room);
    delete state.players[connection.id];
    console.log(`[poc0] close ${connection.id}`);

    // If the room becomes empty, stop future ticks by cancelling the alarm.
    if (Object.keys(state.players).length === 0) {
      await room.storage.setAlarm(Date.now() - 1);
    }

    room.broadcast(
      JSON.stringify({
        type: "player-left",
        playerId: connection.id,
      })
    );

    await room.storage.put("state", state);
  },

  async onAlarm(room: PartyRoom) {
    const state = await loadState(room);

    // If empty, don't reschedule.
    if (Object.keys(state.players).length === 0) return;

    tickSimulation(room, state);
    await room.storage.put("state", state);

    // Schedule next tick.
    await room.storage.setAlarm(Date.now() + TICK_RATE_MS);
  },
} satisfies PartyKitServer;
