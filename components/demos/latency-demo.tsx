"use client"

import { useState, useEffect, useRef } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DemoContainer } from "./demo-container"

const LATENCY_OPTIONS = [0, 50, 100, 150, 200] as const
const BOX_SIZE = 32
const SPEED_PX_PER_SEC = 260

interface Position {
  x: number
  y: number
}

type InputState = { w: boolean; a: boolean; s: boolean; d: boolean }

function isWASDKey(key: string) {
  const k = key.toLowerCase()
  return k === "w" || k === "a" || k === "s" || k === "d"
}

function applyKey(input: InputState, key: string, pressed: boolean): InputState {
  const k = key.toLowerCase()
  if (k !== "w" && k !== "a" && k !== "s" && k !== "d") return input
  return { ...input, [k]: pressed }
}

function directionFromInput(input: InputState): Position {
  const x = (input.d ? 1 : 0) + (input.a ? -1 : 0)
  const y = (input.s ? 1 : 0) + (input.w ? -1 : 0)
  if (x === 0 && y === 0) return { x: 0, y: 0 }
  if (x !== 0 && y !== 0) return { x: x * 0.707, y: y * 0.707 }
  return { x, y }
}

export function LatencyDemo() {
  const [latency, setLatency] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const positionRef = useRef<Position>({ x: 0, y: 0 })
  const inputNowRef = useRef<InputState>({ w: false, a: false, s: false, d: false })
  const inputHistoryRef = useRef<Array<{ t: number; input: InputState }>>([])
  const lastFrameTimeRef = useRef<number | null>(null)
  const [, setRenderTick] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const demo = demoRef.current
    if (!container || !demo) return

    // Initialize position to center
    const updatePositionToCenter = () => {
      const rect = container.getBoundingClientRect()
      positionRef.current = {
        x: rect.width / 2,
        y: rect.height / 2,
      }
      setRenderTick((t) => t + 1)
    }

    updatePositionToCenter()
    const resizeObserver = new ResizeObserver(updatePositionToCenter)
    resizeObserver.observe(container)

    const isDemoFocused = () => {
      const activeElement = document.activeElement
      const demoContainer = demo.closest(".rounded-lg.border.bg-card")
      return (
        demoContainer === activeElement ||
        (demoContainer && demoContainer.contains(activeElement))
      )
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return

      if (!isDemoFocused()) return

      e.preventDefault()

      const now = performance.now()
      inputNowRef.current = applyKey(inputNowRef.current, e.key, true)
      inputHistoryRef.current.push({ t: now, input: inputNowRef.current })
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isWASDKey(e.key)) return

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
      while (history.length > 0 && history[0].t < cutoff) history.shift()

      // Find latest snapshot <= targetTime (history is append-only, so scan from end)
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i]!.t <= targetTime) return history[i]!.input
      }

      // If we have no snapshot old enough yet, treat as no-input.
      return { w: false, a: false, s: false, d: false }
    }

    // Smooth animation loop using RAF. Always render smoothly; latency is applied to *input sampling*.
    const animate = (rafNow: number) => {
      if (!isDemoFocused()) {
        lastFrameTimeRef.current = rafNow
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const prev = lastFrameTimeRef.current ?? rafNow
      const dtSec = Math.min(0.05, (rafNow - prev) / 1000) // clamp big stalls
      lastFrameTimeRef.current = rafNow

      const rect = container.getBoundingClientRect()
      const bounds = { width: rect.width, height: rect.height }

      const delayed = getDelayedInput(rafNow)
      const dir = directionFromInput(delayed)

      if (dir.x !== 0 || dir.y !== 0) {
        positionRef.current = {
          x: Math.max(
            BOX_SIZE / 2,
            Math.min(
              bounds.width - BOX_SIZE / 2,
              positionRef.current.x + dir.x * SPEED_PX_PER_SEC * dtSec
            )
          ),
          y: Math.max(
            BOX_SIZE / 2,
            Math.min(
              bounds.height - BOX_SIZE / 2,
              positionRef.current.y + dir.y * SPEED_PX_PER_SEC * dtSec
            )
          ),
        }
        setRenderTick((t) => t + 1)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    lastFrameTimeRef.current = null
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      resizeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [latency])

  return (
    <DemoContainer
      title="Latency Simulator"
      description="Click the demo area and use WASD keys to move. Adjust latency to feel the difference."
      controls={
        <div className="w-full flex justify-center">
          <Select
            items={LATENCY_OPTIONS.map((ms) => ({
              label: `${ms}ms`,
              value: ms.toString(),
            }))}
            value={latency.toString()}
            onValueChange={(value) => {
              if (!value) return
              setLatency(Number.parseInt(value, 10))
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
      }
    >
      <div ref={demoRef} className="w-full h-full">
        <div ref={containerRef} className="w-full h-full">
          <div
            className="absolute bg-primary rounded"
            style={{
              width: BOX_SIZE,
              height: BOX_SIZE,
              left: positionRef.current.x - BOX_SIZE / 2,
              top: positionRef.current.y - BOX_SIZE / 2,
            }}
          />
        </div>
      </div>
    </DemoContainer>
  )
}
