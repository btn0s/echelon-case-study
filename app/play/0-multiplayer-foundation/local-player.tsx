"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Vec3 = { x: number; y: number; z: number };

type InputState = { w: boolean; a: boolean; s: boolean; d: boolean };

function isWASDKey(key: string) {
  const k = key.toLowerCase();
  return k === "w" || k === "a" || k === "s" || k === "d";
}

function applyKey(input: InputState, key: string, pressed: boolean): InputState {
  const k = key.toLowerCase();
  if (k !== "w" && k !== "a" && k !== "s" && k !== "d") return input;
  return { ...input, [k]: pressed };
}

function directionFromInput(input: InputState) {
  const x = (input.d ? 1 : 0) + (input.a ? -1 : 0);
  const z = (input.s ? 1 : 0) + (input.w ? -1 : 0);

  // Normalize diagonals.
  if (x !== 0 && z !== 0) return { x: x * 0.707, z: z * 0.707 };
  return { x, z };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function LocalPlayer({
  initialPosition,
  onMove,
}: {
  initialPosition: Vec3;
  onMove: (position: Vec3, rotation: number) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const positionRef = useRef(
    new THREE.Vector3(initialPosition.x, 0.5, initialPosition.z)
  );
  const inputRef = useRef<InputState>({ w: false, a: false, s: false, d: false });
  const lastSentAtRef = useRef(0);

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

    const { x, z } = directionFromInput(inputRef.current);
    if (x === 0 && z === 0) return;

    const speed = 5; // units/s
    positionRef.current.x += x * speed * delta;
    positionRef.current.z += z * speed * delta;

    // Keep the player on the plane so it’s easier to observe.
    positionRef.current.x = clamp(positionRef.current.x, -9.5, 9.5);
    positionRef.current.z = clamp(positionRef.current.z, -9.5, 9.5);

    // Prediction: move immediately.
    meshRef.current.position.copy(positionRef.current);

    // Send to server at ~20Hz.
    const now = performance.now();
    if (now - lastSentAtRef.current > 50) {
      onMove(
        { x: positionRef.current.x, y: positionRef.current.y, z: positionRef.current.z },
        meshRef.current.rotation.y
      );
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

