"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiplayerScene } from "./scene";
import { useMultiplayer } from "./use-multiplayer";

const DEFAULT_ROOM = "poc0";

function getDefaultHost() {
  return process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "localhost:1999";
}

export function MultiplayerFoundationPlayground() {
  const host = useMemo(() => getDefaultHost(), []);
  const [roomId, setRoomId] = useState(DEFAULT_ROOM);
  const [appliedRoomId, setAppliedRoomId] = useState(DEFAULT_ROOM);

  const { connected, playerId, playersArray, sendMove } = useMultiplayer({
    host,
    roomId: appliedRoomId,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">POC 0: Multiplayer Foundation</div>
          <div className="text-xs text-muted-foreground">
            Server: <span className="font-mono">{host}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Room: <span className="font-mono">{appliedRoomId}</span> · Players:{" "}
            <span className="font-mono">{playersArray.length}</span>
            {playerId ? (
              <>
                {" "}
                · You: <span className="font-mono">{playerId}</span>
              </>
            ) : null}
          </div>
          <div className="text-xs text-muted-foreground">
            Docs:{" "}
            <Link
              href="/poc/0-multiplayer-foundation"
              className="underline underline-offset-2 hover:text-foreground"
            >
              /poc/0-multiplayer-foundation
            </Link>
          </div>
        </div>

        <form
          className="flex items-end gap-2 self-end"
          onSubmit={(e) => {
            e.preventDefault();
            const trimmed = roomId.trim();
            setAppliedRoomId(trimmed.length > 0 ? trimmed : DEFAULT_ROOM);
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="text-xs text-muted-foreground">Room</div>
            <Input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-56"
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button type="submit">Join</Button>
        </form>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="h-[70vh] min-h-[520px] w-full">
          <MultiplayerScene
            connected={connected}
            playerId={playerId}
            players={playersArray}
            sendMove={sendMove}
          />
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Open this page in two tabs (same room) to see sync.
      </div>
    </div>
  );
}

