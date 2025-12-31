"use client";

import { useCallback, useMemo, useState } from "react";
import usePartySocket from "partysocket/react";

type Vec3 = { x: number; y: number; z: number };

export interface Player {
  id: string;
  position: Vec3;
  rotation: number;
}

type MultiplayerState = {
  connected: boolean;
  playerId: string | null;
  players: Map<string, Player>;
};

type ServerMessage =
  | { type: "init"; playerId: string; players: Player[] }
  | { type: "player-joined"; player: Player }
  | { type: "player-left"; playerId: string }
  | { type: "player-moved"; playerId: string; position: Vec3; rotation: number };

function safeParseMessage(data: unknown): ServerMessage | null {
  if (typeof data !== "string") return null;
  try {
    return JSON.parse(data) as ServerMessage;
  } catch {
    return null;
  }
}

export function useMultiplayer({
  host,
  roomId,
}: {
  host: string;
  roomId: string;
}) {
  const [state, setState] = useState<MultiplayerState>({
    connected: false,
    playerId: null,
    players: new Map(),
  });

  const socket = usePartySocket({
    host,
    room: roomId,
    onOpen() {
      setState((prev) => ({ ...prev, connected: true }));
    },
    onClose() {
      setState((prev) => ({ ...prev, connected: false }));
    },
    onMessage(event) {
      const parsed = safeParseMessage(event.data);
      if (!parsed) return;

      switch (parsed.type) {
        case "init": {
          setState((prev) => ({
            ...prev,
            playerId: parsed.playerId,
            players: new Map(parsed.players.map((p) => [p.id, p])),
          }));
          return;
        }

        case "player-joined": {
          setState((prev) => {
            const players = new Map(prev.players);
            players.set(parsed.player.id, parsed.player);
            return { ...prev, players };
          });
          return;
        }

        case "player-left": {
          setState((prev) => {
            const players = new Map(prev.players);
            players.delete(parsed.playerId);
            return { ...prev, players };
          });
          return;
        }

        case "player-moved": {
          setState((prev) => {
            const players = new Map(prev.players);
            const existing = players.get(parsed.playerId);
            if (!existing) return { ...prev, players };
            players.set(parsed.playerId, {
              ...existing,
              position: parsed.position,
              rotation: parsed.rotation,
            });
            return { ...prev, players };
          });
          return;
        }
      }
    },
  });

  const sendMove = useCallback(
    (position: Vec3, rotation: number) => {
      if (socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify({ type: "move", position, rotation }));
    },
    [socket]
  );

  const playersArray = useMemo(
    () => Array.from(state.players.values()),
    [state.players]
  );

  return { ...state, playersArray, sendMove };
}

