"use client";

import { useCallback, useMemo, useState } from "react";
import usePartySocket from "partysocket/react";
import type { InputState, Vec3 } from "./movement";

export interface Player {
  id: string;
  position: Vec3;
  rotation: number;
  lastProcessedInputSeq?: number; // Only for local player reconciliation
  snapshotTime?: number; // Server timestamp for interpolation
}

export interface SnapshotPlayer {
  id: string;
  position: Vec3;
  rotation: number;
  lastProcessedInputSeq: number;
}

type MultiplayerState = {
  connected: boolean;
  playerId: string | null;
  players: Map<string, Player>;
  // Local player reconciliation state
  pendingInputs: Array<{ seq: number; dt: number; keys: InputState }>;
  lastAckSeq: number;
  authoritativeLocalState: Vec3 | null;
};

type ServerMessage =
  | { type: "init"; playerId: string; players: Player[] }
  | { type: "player-joined"; player: Player }
  | { type: "player-left"; playerId: string }
  | {
      type: "snapshot";
      serverTime: number;
      tick: number;
      players: SnapshotPlayer[];
    };

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
    pendingInputs: [],
    lastAckSeq: 0,
    authoritativeLocalState: null,
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
            // Reset reconciliation state on reconnect
            pendingInputs: [],
            lastAckSeq: 0,
            authoritativeLocalState: null,
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

        case "snapshot": {
          setState((prev) => {
            const players = new Map(prev.players);
            const localPlayerSnapshot = parsed.players.find(
              (p) => p.id === prev.playerId
            );

            // Update all players from snapshot
            for (const snapshotPlayer of parsed.players) {
              players.set(snapshotPlayer.id, {
                id: snapshotPlayer.id,
                position: snapshotPlayer.position,
                rotation: snapshotPlayer.rotation,
                lastProcessedInputSeq:
                  snapshotPlayer.id === prev.playerId
                    ? snapshotPlayer.lastProcessedInputSeq
                    : undefined,
                snapshotTime: parsed.serverTime,
              });
            }

            // Reconciliation for local player
            if (localPlayerSnapshot && prev.playerId) {
              const newAckSeq = localPlayerSnapshot.lastProcessedInputSeq;

              // Drop acknowledged inputs
              const remainingInputs = prev.pendingInputs.filter(
                (input) => input.seq > newAckSeq
              );

              return {
                ...prev,
                players,
                lastAckSeq: newAckSeq,
                authoritativeLocalState: localPlayerSnapshot.position,
                pendingInputs: remainingInputs,
              };
            }

            return { ...prev, players };
          });
          return;
        }
      }
    },
  });

  const sendInput = useCallback(
    (seq: number, dt: number, keys: InputState) => {
      if (socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify({ type: "input", seq, dt, keys }));

      // Track pending input
      setState((prev) => ({
        ...prev,
        pendingInputs: [...prev.pendingInputs, { seq, dt, keys }],
      }));
    },
    [socket]
  );

  const playersArray = useMemo(
    () => Array.from(state.players.values()),
    [state.players]
  );

  return {
    ...state,
    playersArray,
    sendInput,
  };
}
