"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DemoContainer } from "./demo-container"

const BOX_SIZE = 18
const SPEED_PX_PER_SEC = 260

const LATENCY_OPTIONS = [0, 50, 100, 150, 200] as const
const TICKRATE_OPTIONS = [10, 20, 30, 60] as const
const JITTER_OPTIONS = [0, 10, 25, 50] as const
const LOSS_OPTIONS = [0, 5, 10, 20] as const

type InputState = { w: boolean; a: boolean; s: boolean; d: boolean }

type Vec2 = { x: number; y: number }

function isWASDKey(key: string) {
  const k = key.toLowerCase()
  return k === "w" || k === "a" || k === "s" || k === "d"
}

function applyKey(input: InputState, key: string, pressed: boolean): InputState {
  const k = key.toLowerCase()
  if (k !== "w" && k !== "a" && k !== "s" && k !== "d") return input
  return { ...input, [k]: pressed }
}

function directionFromInput(input: InputState): Vec2 {
  const x = (input.d ? 1 : 0) + (input.a ? -1 : 0)
  const y = (input.s ? 1 : 0) + (input.w ? -1 : 0)
  if (x === 0 && y === 0) return { x: 0, y: 0 }
  if (x !== 0 && y !== 0) return { x: x * 0.707, y: y * 0.707 }
  return { x, y }
}

type Packet = { deliverAt: number; pos: Vec2 }

function clampToBounds(pos: Vec2, bounds: { width: number; height: number }): Vec2 {
  return {
    x: Math.max(BOX_SIZE / 2, Math.min(bounds.width - BOX_SIZE / 2, pos.x)),
    y: Math.max(BOX_SIZE / 2, Math.min(bounds.height - BOX_SIZE / 2, pos.y)),
  }
}

export function SnapshotInterpolationDemo() {
  const [latency, setLatency] = useState<(typeof LATENCY_OPTIONS)[number]>(100)
  const [tickRate, setTickRate] = useState<(typeof TICKRATE_OPTIONS)[number]>(20)
  const [jitter, setJitter] = useState<(typeof JITTER_OPTIONS)[number]>(10)
  const [loss, setLoss] = useState<(typeof LOSS_OPTIONS)[number]>(0)
  const [localPos, setLocalPos] = useState<Vec2>({ x: 0, y: 0 })
  const [serverPos, setServerPos] = useState<Vec2>({ x: 0, y: 0 })
  const [remotePos, setRemotePos] = useState<Vec2>({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)

  const animationFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number | null>(null)
  const nextSnapshotAtRef = useRef<number | null>(null)

  const inputNowRef = useRef<InputState>({ w: false, a: false, s: false, d: false })
  const inputHistoryRef = useRef<Array<{ t: number; input: InputState }>>([])

  const localPosRef = useRef<Vec2>({ x: 0, y: 0 })
  const serverPosRef = useRef<Vec2>({ x: 0, y: 0 })
  const remotePosRef = useRef<Vec2>({ x: 0, y: 0 })
  const remoteTargetRef = useRef<Vec2>({ x: 0, y: 0 })

  const inFlightRef = useRef<Packet[]>([])

  const tickIntervalMs = useMemo(() => 1000 / tickRate, [tickRate])
  const lossProb = useMemo(() => Math.max(0, Math.min(1, loss / 100)), [loss])

  const setLatencyFromValue = (value: string | null) => {
    if (!value) return
    const parsed = Number.parseInt(value, 10)
    if ((LATENCY_OPTIONS as readonly number[]).includes(parsed)) {
      setLatency(parsed as (typeof LATENCY_OPTIONS)[number])
    }
  }

  const setTickRateFromValue = (value: string | null) => {
    if (!value) return
    const parsed = Number.parseInt(value, 10)
    if ((TICKRATE_OPTIONS as readonly number[]).includes(parsed)) {
      setTickRate(parsed as (typeof TICKRATE_OPTIONS)[number])
    }
  }

  const setJitterFromValue = (value: string | null) => {
    if (!value) return
    const parsed = Number.parseInt(value, 10)
    if ((JITTER_OPTIONS as readonly number[]).includes(parsed)) {
      setJitter(parsed as (typeof JITTER_OPTIONS)[number])
    }
  }

  const setLossFromValue = (value: string | null) => {
    if (!value) return
    const parsed = Number.parseInt(value, 10)
    if ((LOSS_OPTIONS as readonly number[]).includes(parsed)) {
      setLoss(parsed as (typeof LOSS_OPTIONS)[number])
    }
  }

  useEffect(() => {
    const container = containerRef.current
    const demo = demoRef.current
    if (!container || !demo) return

    const updateToCenter = () => {
      const rect = container.getBoundingClientRect()
      const centered = { x: rect.width / 2, y: rect.height / 2 }
      localPosRef.current = centered
      serverPosRef.current = centered
      remotePosRef.current = centered
      remoteTargetRef.current = centered
      setLocalPos(centered)
      setServerPos(centered)
      setRemotePos(centered)
    }

    updateToCenter()
    const resizeObserver = new ResizeObserver(updateToCenter)
    resizeObserver.observe(container)

    const isDemoActive = () => {
      const root = demo.closest("[data-game-container]") as HTMLElement | null
      return root?.dataset.active === "true"
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return
      if (!isDemoActive()) return
      e.preventDefault()
      const now = performance.now()
      inputNowRef.current = applyKey(inputNowRef.current, e.key, true)
      inputHistoryRef.current.push({ t: now, input: inputNowRef.current })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return
      if (!isDemoActive()) return
      const now = performance.now()
      inputNowRef.current = applyKey(inputNowRef.current, e.key, false)
      inputHistoryRef.current.push({ t: now, input: inputNowRef.current })
    }

    const getDelayedInput = (now: number): InputState => {
      if (latency === 0) return inputNowRef.current

      const targetTime = now - latency
      const history = inputHistoryRef.current

      // Drop old history (keep last ~2s)
      const cutoff = now - 2000
      while (history.length > 0 && history[0]!.t < cutoff) history.shift()

      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i]!.t <= targetTime) return history[i]!.input
      }

      return { w: false, a: false, s: false, d: false }
    }

    const scheduleSnapshot = (now: number, pos: Vec2) => {
      if (Math.random() < lossProb) return

      const jitterMs =
        jitter === 0 ? 0 : (Math.random() * 2 - 1) * jitter // +/- jitter
      const deliverAt = now + latency + jitterMs

      inFlightRef.current.push({ deliverAt, pos })
      inFlightRef.current.sort((a, b) => a.deliverAt - b.deliverAt)
    }

    const deliverPackets = (now: number) => {
      const q = inFlightRef.current
      while (q.length > 0 && q[0]!.deliverAt <= now) {
        const p = q.shift()!
        remoteTargetRef.current = p.pos
      }
    }

    const animate = (rafNow: number) => {
      if (!isDemoActive()) {
        lastFrameTimeRef.current = rafNow
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const prev = lastFrameTimeRef.current ?? rafNow
      const dtSec = Math.min(0.05, (rafNow - prev) / 1000)
      lastFrameTimeRef.current = rafNow

      const rect = container.getBoundingClientRect()
      const bounds = { width: rect.width, height: rect.height }

      // Local: immediate input.
      const localDir = directionFromInput(inputNowRef.current)
      if (localDir.x !== 0 || localDir.y !== 0) {
        localPosRef.current = clampToBounds(
          {
            x: localPosRef.current.x + localDir.x * SPEED_PX_PER_SEC * dtSec,
            y: localPosRef.current.y + localDir.y * SPEED_PX_PER_SEC * dtSec,
          },
          bounds
        )
      }

      // Server: sees delayed input.
      const serverInput = getDelayedInput(rafNow)
      const serverDir = directionFromInput(serverInput)
      if (serverDir.x !== 0 || serverDir.y !== 0) {
        serverPosRef.current = clampToBounds(
          {
            x: serverPosRef.current.x + serverDir.x * SPEED_PX_PER_SEC * dtSec,
            y: serverPosRef.current.y + serverDir.y * SPEED_PX_PER_SEC * dtSec,
          },
          bounds
        )
      }

      // Server snapshots: fixed tick rate.
      const nextAt = nextSnapshotAtRef.current ?? rafNow
      let cursor = nextAt
      while (cursor <= rafNow) {
        scheduleSnapshot(cursor, { ...serverPosRef.current })
        cursor += tickIntervalMs
      }
      nextSnapshotAtRef.current = cursor

      // Remote: receives snapshots (latency/jitter/loss), then smooths toward latest.
      deliverPackets(rafNow)

      const smoothing = Math.min(1, dtSec * 12) // ~80ms-ish
      remotePosRef.current = {
        x:
          remotePosRef.current.x +
          (remoteTargetRef.current.x - remotePosRef.current.x) * smoothing,
        y:
          remotePosRef.current.y +
          (remoteTargetRef.current.y - remotePosRef.current.y) * smoothing,
      }

      setLocalPos({ ...localPosRef.current })
      setServerPos({ ...serverPosRef.current })
      setRemotePos({ ...remotePosRef.current })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    lastFrameTimeRef.current = null
    nextSnapshotAtRef.current = null
    inFlightRef.current = []
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      resizeObserver.disconnect()
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [jitter, latency, lossProb, tickIntervalMs])

  const legend = useMemo(
    () => [
      { label: "Local (you)", className: "bg-primary" },
      { label: "Server truth", className: "border border-red-500 bg-transparent" },
      { label: "Remote view", className: "bg-purple-500/80" },
    ],
    []
  )

  return (
    <DemoContainer
      controls={
        <div className="w-full flex flex-wrap gap-2 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Latency</span>
            <Select value={latency.toString()} onValueChange={setLatencyFromValue}>
              <SelectTrigger aria-label="Latency" className="min-w-28 justify-between">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {LATENCY_OPTIONS.map((ms) => (
                    <SelectItem key={ms} value={ms.toString()}>
                      {ms}ms RTT
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Tick rate</span>
            <Select value={tickRate.toString()} onValueChange={setTickRateFromValue}>
              <SelectTrigger aria-label="Tick rate" className="min-w-28 justify-between">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TICKRATE_OPTIONS.map((hz) => (
                    <SelectItem key={hz} value={hz.toString()}>
                      {hz} Hz
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Jitter</span>
            <Select value={jitter.toString()} onValueChange={setJitterFromValue}>
              <SelectTrigger aria-label="Jitter" className="min-w-28 justify-between">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {JITTER_OPTIONS.map((ms) => (
                    <SelectItem key={ms} value={ms.toString()}>
                      ±{ms}ms
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Loss</span>
            <Select value={loss.toString()} onValueChange={setLossFromValue}>
              <SelectTrigger aria-label="Packet loss" className="min-w-28 justify-between">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {LOSS_OPTIONS.map((pct) => (
                    <SelectItem key={pct} value={pct.toString()}>
                      {pct}%
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      }
    >
      <div ref={demoRef} className="w-full h-full relative">
        <div ref={containerRef} className="absolute inset-0">
          {/* Legend */}
          <div className="absolute bottom-2 left-2 flex gap-2 flex-wrap">
            {legend.map((item) => (
              <div
                key={item.label}
                className="bg-background/80 backdrop-blur-sm border rounded-md px-2 py-1 text-xs text-muted-foreground flex items-center gap-2"
              >
                <span className={`inline-block size-2 rounded-sm ${item.className}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Remote view */}
          <div
            className="absolute rounded-sm bg-purple-500/80"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: remotePos.x - BOX_SIZE / 2,
              top: remotePos.y - BOX_SIZE / 2,
            }}
          />

          {/* Server truth */}
          <div
            className="absolute rounded-sm border border-red-500"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: serverPos.x - BOX_SIZE / 2,
              top: serverPos.y - BOX_SIZE / 2,
            }}
          />

          {/* Local (you) */}
          <div
            className="absolute rounded-sm bg-primary"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: localPos.x - BOX_SIZE / 2,
              top: localPos.y - BOX_SIZE / 2,
            }}
          />
        </div>
      </div>
    </DemoContainer>
  )
}

