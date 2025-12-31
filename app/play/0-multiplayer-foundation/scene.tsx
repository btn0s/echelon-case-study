"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { LocalPlayer } from "./local-player";
import { RemotePlayer } from "./remote-player";
import type { Player } from "./use-multiplayer";

export function MultiplayerScene({
  connected,
  playerId,
  players,
  sendMove,
}: {
  connected: boolean;
  playerId: string | null;
  players: Player[];
  sendMove: (position: { x: number; y: number; z: number }, rotation: number) => void;
}) {
  if (!connected) {
    return (
      <div className="h-full w-full grid place-items-center text-sm text-muted-foreground">
        Connecting…
      </div>
    );
  }

  return (
    <Canvas camera={{ position: [0, 10, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {players.map((player) =>
        player.id === playerId ? (
          <LocalPlayer
            key={player.id}
            initialPosition={player.position}
            onMove={sendMove}
          />
        ) : (
          <RemotePlayer key={player.id} player={player} />
        )
      )}

      <OrbitControls />
    </Canvas>
  );
}

