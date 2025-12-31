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

const UPDATE_FREQUENCY_OPTIONS = [10, 20, 30] as const;
const LATENCY_OPTIONS = [0, 50, 100, 150, 200] as const;
const BOX_SIZE = 32;
const CIRCLE_RADIUS = 80;
const CIRCLE_SPEED = 0.5; // radians per second
const JITTER_MAX_MS = 30;

interface Position {
  x: number;
  y: number;
}

interface Snapshot {
  offset: Position; // Offset relative to pane center
  deliverAt: number;
}

export function InterpolationDemo() {
  const [updateFrequency, setUpdateFrequency] = useState<number>(20);
  const [latency, setLatency] = useState<number>(100);
  const [jitterEnabled, setJitterEnabled] = useState<boolean>(false);
  const [interpolateEnabled, setInterpolateEnabled] = useState<boolean>(true);
  
  const [serverPosition, setServerPosition] = useState<Position>({ x: 0, y: 0 });
  const [clientRenderPosition, setClientRenderPosition] = useState<Position>({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const serverPosRef = useRef<Position>({ x: 0, y: 0 });
  const clientRenderPosRef = useRef<Position>({ x: 0, y: 0 });
  const clientTargetPosRef = useRef<Position>({ x: 0, y: 0 });
  
  const timeRef = useRef<number>(0);
  const lastSnapshotTimeRef = useRef<number>(0);
  const snapshotQueueRef = useRef<Snapshot[]>([]);
  const lastFrameTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const demo = demoRef.current;
    if (!container || !demo) return;

    // Initialize positions to center
    const updatePositionsToCenter = () => {
      const rect = container.getBoundingClientRect();
      const center = {
        x: rect.width / 4, // Left pane (server)
        y: rect.height / 2,
      };
      serverPosRef.current = center;
      clientRenderPosRef.current = { x: rect.width * 0.75, y: rect.height / 2 }; // Right pane (client)
      clientTargetPosRef.current = clientRenderPosRef.current;
      setServerPosition(serverPosRef.current);
      setClientRenderPosition(clientRenderPosRef.current);
    };

    updatePositionsToCenter();
    const resizeObserver = new ResizeObserver(updatePositionsToCenter);
    resizeObserver.observe(container);

    const isDemoActive = () => {
      const root = demo.closest("[data-game-container]") as HTMLElement | null;
      return root?.dataset.active === "true";
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
      const serverCenterX = rect.width / 4;
      const serverCenterY = rect.height / 2;
      const clientCenterX = rect.width * 0.75;
      const clientCenterY = rect.height / 2;

      // Update server position (ground truth) - circular motion
      timeRef.current += dtSec * CIRCLE_SPEED;
      const serverX = serverCenterX + CIRCLE_RADIUS * Math.cos(timeRef.current);
      const serverY = serverCenterY + CIRCLE_RADIUS * Math.sin(timeRef.current);
      
      serverPosRef.current = { x: serverX, y: serverY };
      setServerPosition(serverPosRef.current);

      // Emit snapshots at the specified frequency
      const snapshotIntervalMs = 1000 / updateFrequency;
      if (rafNow - lastSnapshotTimeRef.current >= snapshotIntervalMs) {
        lastSnapshotTimeRef.current = rafNow;
        
        // Calculate jitter offset if enabled
        const jitterOffset = jitterEnabled
          ? (Math.random() * 2 - 1) * JITTER_MAX_MS
          : 0;
        
        // Store offset relative to server center (not absolute position)
        const offset = {
          x: serverPosRef.current.x - serverCenterX,
          y: serverPosRef.current.y - serverCenterY,
        };
        
        const deliverAt = rafNow + latency + jitterOffset;
        snapshotQueueRef.current.push({
          offset,
          deliverAt,
        });
      }

      // Process delivered snapshots
      const now = rafNow;
      while (
        snapshotQueueRef.current.length > 0 &&
        snapshotQueueRef.current[0]!.deliverAt <= now
      ) {
        const snapshot = snapshotQueueRef.current.shift()!;
        // Convert offset to client pane coordinates
        clientTargetPosRef.current = {
          x: clientCenterX + snapshot.offset.x,
          y: clientCenterY + snapshot.offset.y,
        };
        
        // If snapping, immediately update render position
        if (!interpolateEnabled) {
          clientRenderPosRef.current = { ...clientTargetPosRef.current };
          setClientRenderPosition(clientRenderPosRef.current);
        }
      }

      // Update client render position (interpolation)
      if (interpolateEnabled) {
        // Lerp toward target position
        const alpha = Math.min(1, dtSec * 10); // Similar to RemotePlayer lerp factor
        clientRenderPosRef.current = {
          x: clientRenderPosRef.current.x +
            (clientTargetPosRef.current.x - clientRenderPosRef.current.x) * alpha,
          y: clientRenderPosRef.current.y +
            (clientTargetPosRef.current.y - clientRenderPosRef.current.y) * alpha,
        };
        setClientRenderPosition(clientRenderPosRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastFrameTimeRef.current = null;
    lastSnapshotTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateFrequency, latency, jitterEnabled, interpolateEnabled]);

  return (
    <DemoContainer
      controls={
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Mode</span>
              <Select
                value={interpolateEnabled ? "interpolate" : "snap"}
                onValueChange={(value) => {
                  setInterpolateEnabled(value === "interpolate");
                }}
              >
                <SelectTrigger aria-label="Interpolation mode" className="min-w-32 justify-between">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="snap">Snap</SelectItem>
                    <SelectItem value="interpolate">Interpolate</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Update rate</span>
              <Select
                value={updateFrequency.toString()}
                onValueChange={(value) => {
                  if (!value) return;
                  const parsed = Number.parseInt(value, 10);
                  if ((UPDATE_FREQUENCY_OPTIONS as readonly number[]).includes(parsed)) {
                    setUpdateFrequency(parsed);
                  }
                }}
              >
                <SelectTrigger aria-label="Update frequency" className="min-w-24 justify-between">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {UPDATE_FREQUENCY_OPTIONS.map((hz) => (
                      <SelectItem key={hz} value={hz.toString()}>
                        {hz}Hz
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

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
                htmlFor="jitter-toggle"
                className="text-xs text-muted-foreground cursor-pointer select-none"
              >
                Jitter
              </label>
              <Switch
                id="jitter-toggle"
                checked={jitterEnabled}
                onCheckedChange={setJitterEnabled}
                aria-label="Enable network jitter"
              />
            </div>
          </div>
        </div>
      }
    >
      <div ref={demoRef} className="w-full h-full relative">
        <div ref={containerRef} className="w-full h-full relative">
          {/* Divider line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
          
          {/* Labels */}
          <div className="absolute top-2 left-2 text-xs text-muted-foreground">
            Server (truth)
          </div>
          <div className="absolute top-2 right-2 text-xs text-muted-foreground">
            Client (rendered)
          </div>

          {/* Server box (ground truth) */}
          <div
            className="absolute bg-primary rounded border-2 border-primary/80"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: serverPosition.x - BOX_SIZE / 2,
              top: serverPosition.y - BOX_SIZE / 2,
            }}
            title="Server position (ground truth)"
          />

          {/* Client box (rendered) */}
          <div
            className={`absolute rounded ${
              interpolateEnabled
                ? "bg-emerald-500 border-2 border-emerald-500/80"
                : "bg-orange-500 border-2 border-orange-500/80"
            }`}
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: clientRenderPosition.x - BOX_SIZE / 2,
              top: clientRenderPosition.y - BOX_SIZE / 2,
            }}
            title={
              interpolateEnabled
                ? "Client position (interpolated)"
                : "Client position (snapped)"
            }
          />
        </div>
      </div>
    </DemoContainer>
  );
}
