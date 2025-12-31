"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { InputState, Vec3 } from "./movement";
import {
  directionFromInput,
  simulateMovement,
  clamp,
} from "./movement";

function isWASDKey(key: string) {
  const k = key.toLowerCase();
  return k === "w" || k === "a" || k === "s" || k === "d";
}

function applyKey(input: InputState, key: string, pressed: boolean): InputState {
  const k = key.toLowerCase();
  if (k !== "w" && k !== "a" && k !== "s" && k !== "d") return input;
  return { ...input, [k]: pressed };
}

export function LocalPlayer({
  initialPosition,
  onInput,
  authoritativeState,
  lastAckSeq,
  pendingInputs,
}: {
  initialPosition: Vec3;
  onInput: (seq: number, dt: number, keys: InputState) => void;
  authoritativeState: Vec3 | null;
  lastAckSeq: number;
  pendingInputs: Array<{ seq: number; dt: number; keys: InputState }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const positionRef = useRef(
    new THREE.Vector3(initialPosition.x, 0.5, initialPosition.z)
  );
  const inputRef = useRef<InputState>({ w: false, a: false, s: false, d: false });
  const lastSentAtRef = useRef(0);
  const seqRef = useRef(0);
  const lastReconciledSeqRef = useRef(0);

  // Reconciliation: snap to authoritative state and replay pending inputs
  useEffect(() => {
    if (authoritativeState && lastAckSeq !== lastReconciledSeqRef.current) {
      // Snap to authoritative position
      let reconciledPos: Vec3 = {
        x: authoritativeState.x,
        y: authoritativeState.y,
        z: authoritativeState.z,
      };

      // Replay all pending inputs that haven't been acknowledged
      for (const input of pendingInputs) {
        if (input.seq > lastAckSeq) {
          reconciledPos = simulateMovement(reconciledPos, input.keys, input.dt);
        }
      }

      positionRef.current.set(
        reconciledPos.x,
        reconciledPos.y,
        reconciledPos.z
      );
      if (meshRef.current) {
        meshRef.current.position.copy(positionRef.current);
      }

      lastReconciledSeqRef.current = lastAckSeq;
    }
  }, [authoritativeState?.x, authoritativeState?.y, authoritativeState?.z, lastAckSeq, pendingInputs]);

  // Reset position on initial spawn
  useEffect(() => {
    positionRef.current.set(initialPosition.x, 0.5, initialPosition.z);
    if (meshRef.current) {
      meshRef.current.position.copy(positionRef.current);
    }
  }, [initialPosition.x, initialPosition.z]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return;
      e.preventDefault();
      inputRef.current = applyKey(inputRef.current, e.key, true);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return;
      inputRef.current = applyKey(inputRef.current, e.key, false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Client-side prediction: simulate movement locally
    const predictedPosition = simulateMovement(
      {
        x: positionRef.current.x,
        y: positionRef.current.y,
        z: positionRef.current.z,
      },
      inputRef.current,
      delta
    );

    positionRef.current.set(
      predictedPosition.x,
      predictedPosition.y,
      predictedPosition.z
    );
    meshRef.current.position.copy(positionRef.current);

    // Send inputs to server at ~20Hz
    const now = performance.now();
    if (now - lastSentAtRef.current > 50) {
      seqRef.current++;
      onInput(seqRef.current, delta, { ...inputRef.current });
      lastSentAtRef.current = now;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[initialPosition.x, 0.5, initialPosition.z]}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}
