"use client";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DemoContainer } from "./demo-container";

const LATENCY_OPTIONS = [0, 50, 100, 150, 200] as const;
const BOX_SIZE = 32;
const SPEED_PX_PER_SEC = 260;

interface Position {
  x: number;
  y: number;
}

type InputState = { w: boolean; a: boolean; s: boolean; d: boolean };

function isWASDKey(key: string) {
  const k = key.toLowerCase();
  return k === "w" || k === "a" || k === "s" || k === "d";
}

function applyKey(
  input: InputState,
  key: string,
  pressed: boolean
): InputState {
  const k = key.toLowerCase();
  if (k !== "w" && k !== "a" && k !== "s" && k !== "d") return input;
  return { ...input, [k]: pressed };
}

function directionFromInput(input: InputState): Position {
  const x = (input.d ? 1 : 0) + (input.a ? -1 : 0);
  const y = (input.s ? 1 : 0) + (input.w ? -1 : 0);
  if (x === 0 && y === 0) return { x: 0, y: 0 };
  if (x !== 0 && y !== 0) return { x: x * 0.707, y: y * 0.707 };
  return { x, y };
}

function distance(a: Position, b: Position): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function PredictionDemo() {
  const [latency, setLatency] = useState<number>(100);
  const [predictionEnabled, setPredictionEnabled] = useState<boolean>(false);
  const [clientPosition, setClientPosition] = useState<Position>({ x: 0, y: 0 });
  const [serverPosition, setServerPosition] = useState<Position>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const clientPosRef = useRef<Position>({ x: 0, y: 0 });
  const serverPosRef = useRef<Position>({ x: 0, y: 0 });
  const inputNowRef = useRef<InputState>({
    w: false,
    a: false,
    s: false,
    d: false,
  });
  const inputHistoryRef = useRef<Array<{ t: number; input: InputState }>>([]);
  const lastFrameTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const demo = demoRef.current;
    if (!container || !demo) return;

    // Initialize positions to center
    const updatePositionsToCenter = () => {
      const rect = container.getBoundingClientRect();
      const center = {
        x: rect.width / 2,
        y: rect.height / 2,
      };
      clientPosRef.current = center;
      serverPosRef.current = center;
      setClientPosition(center);
      setServerPosition(center);
    };

    updatePositionsToCenter();
    const resizeObserver = new ResizeObserver(updatePositionsToCenter);
    resizeObserver.observe(container);

    const isDemoActive = () => {
      const root = demo.closest("[data-game-container]") as HTMLElement | null;
      return root?.dataset.active === "true";
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return;

      if (!isDemoActive()) return;

      e.preventDefault();

      const now = performance.now();
      inputNowRef.current = applyKey(inputNowRef.current, e.key, true);
      inputHistoryRef.current.push({ t: now, input: inputNowRef.current });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return;

      if (!isDemoActive()) return;

      e.preventDefault();

      const now = performance.now();
      inputNowRef.current = applyKey(inputNowRef.current, e.key, false);
      inputHistoryRef.current.push({ t: now, input: inputNowRef.current });
    };

    const getDelayedInput = (now: number): InputState => {
      if (latency === 0) return inputNowRef.current;

      const targetTime = now - latency;
      const history = inputHistoryRef.current;

      // Drop old history (keep last ~2s)
      const cutoff = now - 2000;
      while (history.length > 0 && history[0]!.t < cutoff) history.shift();

      // Find latest snapshot <= targetTime (history is append-only, so scan from end)
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i]!.t <= targetTime) return history[i]!.input;
      }

      // If we have no snapshot old enough yet, treat as no-input.
      return { w: false, a: false, s: false, d: false };
    };

    // Smooth animation loop using RAF
    const animate = (rafNow: number) => {
      if (!isDemoActive()) {
        lastFrameTimeRef.current = rafNow;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const prev = lastFrameTimeRef.current ?? rafNow;
      const dtSec = Math.min(0.05, (rafNow - prev) / 1000); // clamp big stalls
      lastFrameTimeRef.current = rafNow;

      const rect = container.getBoundingClientRect();
      const bounds = { width: rect.width, height: rect.height };

      // Get immediate and delayed inputs
      const inputNow = inputNowRef.current;
      const inputDelayed = getDelayedInput(rafNow);

      // Client position: uses immediate input if prediction ON, delayed if OFF
      const clientInput = predictionEnabled ? inputNow : inputDelayed;
      const clientDir = directionFromInput(clientInput);

      if (clientDir.x !== 0 || clientDir.y !== 0) {
        const nextClient = {
          x: Math.max(
            BOX_SIZE / 2,
            Math.min(
              bounds.width - BOX_SIZE / 2,
              clientPosRef.current.x + clientDir.x * SPEED_PX_PER_SEC * dtSec
            )
          ),
          y: Math.max(
            BOX_SIZE / 2,
            Math.min(
              bounds.height - BOX_SIZE / 2,
              clientPosRef.current.y + clientDir.y * SPEED_PX_PER_SEC * dtSec
            )
          ),
        };
        clientPosRef.current = nextClient;
        setClientPosition(nextClient);
      }

      // Server position: always uses delayed input (authoritative)
      const serverDir = directionFromInput(inputDelayed);

      if (serverDir.x !== 0 || serverDir.y !== 0) {
        const nextServer = {
          x: Math.max(
            BOX_SIZE / 2,
            Math.min(
              bounds.width - BOX_SIZE / 2,
              serverPosRef.current.x + serverDir.x * SPEED_PX_PER_SEC * dtSec
            )
          ),
          y: Math.max(
            BOX_SIZE / 2,
            Math.min(
              bounds.height - BOX_SIZE / 2,
              serverPosRef.current.y + serverDir.y * SPEED_PX_PER_SEC * dtSec
            )
          ),
        };
        serverPosRef.current = nextServer;
        setServerPosition(nextServer);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    lastFrameTimeRef.current = null;
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      resizeObserver.disconnect();
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [latency, predictionEnabled]);

  const clientStyle = {
    width: BOX_SIZE,
    height: BOX_SIZE,
    left: clientPosition.x - BOX_SIZE / 2,
    top: clientPosition.y - BOX_SIZE / 2,
  };

  const serverStyle = {
    width: BOX_SIZE,
    height: BOX_SIZE,
    left: serverPosition.x - BOX_SIZE / 2,
    top: serverPosition.y - BOX_SIZE / 2,
  };

  const divergence = distance(clientPosition, serverPosition);
  const divergencePx = Math.round(divergence);

  return (
    <DemoContainer
      controls={
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Latency</span>
              <Select
                value={latency.toString()}
                onValueChange={(value) => {
                  if (!value) return;
                  const parsed = Number.parseInt(value, 10);
                  if ((LATENCY_OPTIONS as readonly number[]).includes(parsed)) {
                    setLatency(parsed);
                  }
                }}
              >
                <SelectTrigger aria-label="Latency" className="min-w-28 justify-between">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {LATENCY_OPTIONS.map((ms) => (
                      <SelectItem key={ms} value={ms.toString()}>
                        {ms}ms
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="prediction-toggle"
                className="text-xs text-muted-foreground cursor-pointer select-none"
              >
                Prediction
              </label>
              <Switch
                id="prediction-toggle"
                checked={predictionEnabled}
                onCheckedChange={setPredictionEnabled}
                aria-label="Enable client-side prediction"
              />
            </div>

            {predictionEnabled && divergencePx > 0 && (
              <div className="text-xs text-muted-foreground">
                Divergence: <span className="font-mono">{divergencePx}px</span>
              </div>
            )}
          </div>
        </div>
      }
    >
      <div ref={demoRef} className="w-full h-full relative">
        <div ref={containerRef} className="w-full h-full">
          {/* Server box (authoritative, always delayed) */}
          <div
            className="absolute bg-muted-foreground/40 rounded border border-muted-foreground/60"
            style={serverStyle}
            title="Server (authoritative)"
          />
          {/* Client box (local, prediction-dependent) */}
          <div
            className={`absolute rounded ${
              predictionEnabled
                ? "bg-primary border-2 border-primary/80"
                : "bg-primary/60 border border-primary/40"
            }`}
            style={clientStyle}
            title={predictionEnabled ? "Client (predicted)" : "Client (waiting for server)"}
          />
        </div>
      </div>
    </DemoContainer>
  );
}
