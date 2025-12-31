"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Player } from "./use-multiplayer";

export function RemotePlayer({ player }: { player: Player }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPositionRef = useRef(
    new THREE.Vector3(player.position.x, 0.5, player.position.z)
  );

  useEffect(() => {
    targetPositionRef.current.set(player.position.x, 0.5, player.position.z);
  }, [player.position.x, player.position.z]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.lerp(
      targetPositionRef.current,
      Math.min(1, delta * 10)
    );
  });

  return (
    <mesh ref={meshRef} position={[player.position.x, 0.5, player.position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
  );
}

