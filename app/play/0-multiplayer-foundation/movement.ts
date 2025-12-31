// Shared deterministic movement simulation (client + server)

export type InputState = { w: boolean; a: boolean; s: boolean; d: boolean };

export type Vec3 = { x: number; y: number; z: number };

const SPEED = 5; // units per second
const BOUNDS = { min: -9.5, max: 9.5 };

export function directionFromInput(input: InputState): Vec3 {
  const x = (input.d ? 1 : 0) + (input.a ? -1 : 0);
  const z = (input.s ? 1 : 0) + (input.w ? -1 : 0);

  // Normalize diagonals
  if (x !== 0 && z !== 0) {
    return { x: x * 0.707, y: 0, z: z * 0.707 };
  }
  return { x, y: 0, z };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function simulateMovement(
  position: Vec3,
  input: InputState,
  deltaTime: number
): Vec3 {
  const dir = directionFromInput(input);
  if (dir.x === 0 && dir.z === 0) return position;

  const movement = {
    x: dir.x * SPEED * deltaTime,
    y: 0,
    z: dir.z * SPEED * deltaTime,
  };

  return {
    x: clamp(position.x + movement.x, BOUNDS.min, BOUNDS.max),
    y: 0.5, // Always keep Y at 0.5
    z: clamp(position.z + movement.z, BOUNDS.min, BOUNDS.max),
  };
}
