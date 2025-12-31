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
const TICKRATE_OPTIONS = [10, 20, 30] as const
const CORRECTION_OPTIONS = ["snap", "smooth"] as const
const SMOOTHING_OPTIONS = [6, 12, 24] as const

type InputState = { w: boolean; a: boolean; s: boolean; d: boolean }
type Vec2 = { x: number; y: number }
type CorrectionMode = (typeof CORRECTION_OPTIONS)[number]
type Packet = { deliverAt: number; pos: Vec2 }

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

function clampToBounds(pos: Vec2, bounds: { width: number; height: number }): Vec2 {
  return {
    x: Math.max(BOX_SIZE / 2, Math.min(bounds.width - BOX_SIZE / 2, pos.x)),
    y: Math.max(BOX_SIZE / 2, Math.min(bounds.height - BOX_SIZE / 2, pos.y)),
  }
}

export function ReconciliationDemo() {
  const [latency, setLatency] = useState<(typeof LATENCY_OPTIONS)[number]>(100)
  const [tickRate, setTickRate] = useState<(typeof TICKRATE_OPTIONS)[number]>(20)
  const [mode, setMode] = useState<CorrectionMode>("smooth")
  const [smoothing, setSmoothing] = useState<(typeof SMOOTHING_OPTIONS)[number]>(12)
  const [predictedPos, setPredictedPos] = useState<Vec2>({ x: 0, y: 0 })
  const [serverPos, setServerPos] = useState<Vec2>({ x: 0, y: 0 })
  const [correctedPos, setCorrectedPos] = useState<Vec2>({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)

  const animationFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number | null>(null)
  const nextServerTickAtRef = useRef<number | null>(null)

  const inputNowRef = useRef<InputState>({ w: false, a: false, s: false, d: false })
  const inputHistoryRef = useRef<Array<{ t: number; input: InputState }>>([])

  // Client-side prediction (what you *think* is true)
  const predictedPosRef = useRef<Vec2>({ x: 0, y: 0 })

  // Server authoritative position (what the server says is true)
  const serverPosRef = useRef<Vec2>({ x: 0, y: 0 })

  // What the player *sees* after correction (predicted + offset)
  const correctionOffsetRef = useRef<Vec2>({ x: 0, y: 0 })
  const desiredOffsetRef = useRef<Vec2>({ x: 0, y: 0 })

  const inFlightRef = useRef<Packet[]>([])

  const serverTickIntervalMs = useMemo(() => 1000 / tickRate, [tickRate])

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

  const setModeFromValue = (value: string | null) => {
    if (!value) return
    if ((CORRECTION_OPTIONS as readonly string[]).includes(value)) {
      setMode(value as CorrectionMode)
    }
  }

  const setSmoothingFromValue = (value: string | null) => {
    if (!value) return
    const parsed = Number.parseInt(value, 10)
    if ((SMOOTHING_OPTIONS as readonly number[]).includes(parsed)) {
      setSmoothing(parsed as (typeof SMOOTHING_OPTIONS)[number])
    }
  }

  useEffect(() => {
    const container = containerRef.current
    const demo = demoRef.current
    if (!container || !demo) return

    const updateToCenter = () => {
      const rect = container.getBoundingClientRect()
      const centered = { x: rect.width / 2, y: rect.height / 2 }
      predictedPosRef.current = centered
      serverPosRef.current = centered
      correctionOffsetRef.current = { x: 0, y: 0 }
      desiredOffsetRef.current = { x: 0, y: 0 }
      inFlightRef.current = []
      setPredictedPos(centered)
      setServerPos(centered)
      setCorrectedPos(centered)
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

      const cutoff = now - 2000
      while (history.length > 0 && history[0]!.t < cutoff) history.shift()

      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i]!.t <= targetTime) return history[i]!.input
      }

      return { w: false, a: false, s: false, d: false }
    }

    const scheduleServerUpdateToClient = (now: number, pos: Vec2) => {
      // Server -> client RTT is modeled by `latency` here.
      const deliverAt = now + latency
      inFlightRef.current.push({ deliverAt, pos })
      inFlightRef.current.sort((a, b) => a.deliverAt - b.deliverAt)
    }

    const deliverPackets = (now: number) => {
      const q = inFlightRef.current
      while (q.length > 0 && q[0]!.deliverAt <= now) {
        const p = q.shift()!
        const predicted = predictedPosRef.current
        const desired = { x: p.pos.x - predicted.x, y: p.pos.y - predicted.y }

        desiredOffsetRef.current = desired

        if (mode === "snap") {
          correctionOffsetRef.current = desired
        }
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

      // Client prediction: immediate input.
      const dir = directionFromInput(inputNowRef.current)
      if (dir.x !== 0 || dir.y !== 0) {
        predictedPosRef.current = clampToBounds(
          {
            x: predictedPosRef.current.x + dir.x * SPEED_PX_PER_SEC * dtSec,
            y: predictedPosRef.current.y + dir.y * SPEED_PX_PER_SEC * dtSec,
          },
          bounds
        )
      }

      // Server authoritative sim: delayed input.
      const serverInput = getDelayedInput(rafNow)
      const sDir = directionFromInput(serverInput)
      if (sDir.x !== 0 || sDir.y !== 0) {
        serverPosRef.current = clampToBounds(
          {
            x: serverPosRef.current.x + sDir.x * SPEED_PX_PER_SEC * dtSec,
            y: serverPosRef.current.y + sDir.y * SPEED_PX_PER_SEC * dtSec,
          },
          bounds
        )
      }

      // Server tick: periodically send authoritative position back to client.
      const nextAt = nextServerTickAtRef.current ?? rafNow
      let cursor = nextAt
      while (cursor <= rafNow) {
        scheduleServerUpdateToClient(cursor, { ...serverPosRef.current })
        cursor += serverTickIntervalMs
      }
      nextServerTickAtRef.current = cursor

      // Apply server corrections on arrival.
      deliverPackets(rafNow)

      // Smooth correction: offset lerps toward desired.
      if (mode === "smooth") {
        const alpha = Math.min(1, dtSec * smoothing)
        correctionOffsetRef.current = {
          x:
            correctionOffsetRef.current.x +
            (desiredOffsetRef.current.x - correctionOffsetRef.current.x) * alpha,
          y:
            correctionOffsetRef.current.y +
            (desiredOffsetRef.current.y - correctionOffsetRef.current.y) * alpha,
        }
      }

      const corrected = {
        x: predictedPosRef.current.x + correctionOffsetRef.current.x,
        y: predictedPosRef.current.y + correctionOffsetRef.current.y,
      }

      setPredictedPos({ ...predictedPosRef.current })
      setServerPos({ ...serverPosRef.current })
      setCorrectedPos(corrected)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    lastFrameTimeRef.current = null
    nextServerTickAtRef.current = null
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
  }, [latency, mode, serverTickIntervalMs, smoothing])

  const legend = useMemo(
    () => [
      { label: "Predicted", className: "bg-primary" },
      { label: "Corrected view", className: "bg-emerald-500/80" },
      { label: "Server truth", className: "border border-red-500 bg-transparent" },
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
            <span className="text-xs text-muted-foreground">Update rate</span>
            <Select value={tickRate.toString()} onValueChange={setTickRateFromValue}>
              <SelectTrigger aria-label="Update rate" className="min-w-28 justify-between">
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
            <span className="text-xs text-muted-foreground">Correction</span>
            <Select value={mode} onValueChange={setModeFromValue}>
              <SelectTrigger aria-label="Correction mode" className="min-w-28 justify-between">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CORRECTION_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Smoothing</span>
            <Select
              value={smoothing.toString()}
              onValueChange={setSmoothingFromValue}
              disabled={mode !== "smooth"}
            >
              <SelectTrigger aria-label="Smoothing" className="min-w-28 justify-between">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SMOOTHING_OPTIONS.map((v) => (
                    <SelectItem key={v} value={v.toString()}>
                      {v}x
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

          {/* Corrected view */}
          <div
            className="absolute rounded-sm bg-emerald-500/80"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: correctedPos.x - BOX_SIZE / 2,
              top: correctedPos.y - BOX_SIZE / 2,
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

          {/* Predicted */}
          <div
            className="absolute rounded-sm bg-primary"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: predictedPos.x - BOX_SIZE / 2,
              top: predictedPos.y - BOX_SIZE / 2,
            }}
          />
        </div>
      </div>
    </DemoContainer>
  )
}

