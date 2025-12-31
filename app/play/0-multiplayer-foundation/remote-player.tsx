"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Player } from "./use-multiplayer";

type Snapshot = {
  position: THREE.Vector3;
  timestamp: number;
};

// With a 20Hz server tick (50ms), a ~2-tick delay gives us two snapshots to blend between.
const BUFFER_DELAY_MS = 100;
const MAX_BUFFER_SIZE = 8;

export function RemotePlayer({ player }: { player: Player }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const snapshotBufferRef = useRef<Snapshot[]>([]);

  // Buffer snapshots using the same clock domain as the render loop (performance.now()).
  // Using server epoch time (Date.now) here can break interpolation due to clock skew.
  useEffect(() => {
    const timestamp = performance.now();
    const snapshot: Snapshot = {
      position: new THREE.Vector3(player.position.x, 0.5, player.position.z),
      timestamp,
    };

    snapshotBufferRef.current.push(snapshot);
    // Keep buffer size limited
    if (snapshotBufferRef.current.length > MAX_BUFFER_SIZE) {
      snapshotBufferRef.current.shift();
    }
  }, [player.position.x, player.position.z]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const buffer = snapshotBufferRef.current;
    if (buffer.length === 0) return;

    const now = performance.now();
    const renderTime = now - BUFFER_DELAY_MS;

    // Find the two snapshots to interpolate between
    let prev: Snapshot | null = null;
    let next: Snapshot | null = null;

    for (let i = 0; i < buffer.length; i++) {
      const snap = buffer[i]!;
      if (snap.timestamp <= renderTime) {
        prev = snap;
      } else {
        next = snap;
        break;
      }
    }

    // If we have both prev and next, interpolate at renderTime.
    if (prev && next) {
      const timeDiff = next.timestamp - prev.timestamp;
      const t = timeDiff > 0 ? (renderTime - prev.timestamp) / timeDiff : 0;
      const clampedT = Math.max(0, Math.min(1, t));

      const interpolated = new THREE.Vector3().lerpVectors(
        prev.position,
        next.position,
        clampedT
      );
      meshRef.current.position.copy(interpolated);
    } else if (prev) {
      // Only have previous, ease toward it.
      meshRef.current.position.lerp(prev.position, Math.min(1, delta * 10));
    } else if (next) {
      // Only have next (shouldn't happen with delay, but handle it)
      meshRef.current.position.lerp(next.position, Math.min(1, delta * 10));
    }
  });

  return (
    <mesh ref={meshRef} position={[player.position.x, 0.5, player.position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
  );
}

