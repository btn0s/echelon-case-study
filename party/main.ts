import type { PartyConnection, PartyKitServer } from "partykit/server";

type Vec3 = { x: number; y: number; z: number };

interface Player {
  id: string;
  position: Vec3;
  rotation: number;
}

interface GameState {
  players: Record<string, Player>;
}

function parseJson(message: string): unknown {
  try {
    return JSON.parse(message);
  } catch {
    return null;
  }
}

function isMoveMessage(
  data: unknown
): data is { type: "move"; position: Vec3; rotation: number } {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  const position = d.position as Record<string, unknown> | undefined;
  return (
    d.type === "move" &&
    typeof d.rotation === "number" &&
    typeof position === "object" &&
    position !== null &&
    typeof position.x === "number" &&
    typeof position.y === "number" &&
    typeof position.z === "number"
  );
}

type PartyRoom = {
  storage: {
    get<T>(key: string): Promise<T | null>;
    put<T>(key: string, value: T): Promise<void>;
  };
  broadcast(message: string, without?: string[]): void;
};

async function loadState(room: PartyRoom) {
  return (
    (await room.storage.get<GameState>("state")) ??
    ({ players: {} } satisfies GameState)
  );
}

export default {
  async onConnect(connection: PartyConnection, room: PartyRoom) {
    const state = await loadState(room);
    console.log(`[poc0] connect ${connection.id}`);

    const player: Player = {
      id: connection.id,
      position: { x: 0, y: 0.5, z: 0 },
      rotation: 0,
    };

    state.players[connection.id] = player;

    connection.send(
      JSON.stringify({
        type: "init",
        playerId: connection.id,
        players: Object.values(state.players),
      })
    );

    room.broadcast(
      JSON.stringify({
        type: "player-joined",
        player,
      }),
      [connection.id]
    );

    await room.storage.put("state", state);
  },

  async onMessage(message: string, connection: PartyConnection, room: PartyRoom) {
    const data = parseJson(message);
    if (!isMoveMessage(data)) return;

    const state = await loadState(room);
    const current = state.players[connection.id];
    if (!current) return;

    state.players[connection.id] = {
      ...current,
      position: data.position,
      rotation: data.rotation,
    };

    room.broadcast(
      JSON.stringify({
        type: "player-moved",
        playerId: connection.id,
        position: data.position,
        rotation: data.rotation,
      })
    );

    await room.storage.put("state", state);
  },

  async onClose(connection: PartyConnection, room: PartyRoom) {
    const state = await loadState(room);
    delete state.players[connection.id];
    console.log(`[poc0] close ${connection.id}`);

    room.broadcast(
      JSON.stringify({
        type: "player-left",
        playerId: connection.id,
      })
    );

    await room.storage.put("state", state);
  },
} satisfies PartyKitServer;

