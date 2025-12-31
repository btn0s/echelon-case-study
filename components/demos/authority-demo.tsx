"use client"

import { useEffect, useRef, useState } from "react"

type LogLine = {
  id: string
  t: number
  text: string
}

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function AuthorityDemo() {
  const [isNearTerminal, setIsNearTerminal] = useState(true)
  const [objectiveComplete, setObjectiveComplete] = useState(false)
  const [serverBusy, setServerBusy] = useState(false)
  const [log, setLog] = useState<LogLine[]>(() => [
    {
      id: nowId(),
      t: performance.now(),
      text: "Server online. Objective: incomplete.",
    },
  ])

  const timerRef = useRef<number | null>(null)

  const push = (text: string) => {
    setLog((prev) => [{ id: nowId(), t: performance.now(), text }, ...prev].slice(0, 12))
  }

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const reset = () => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setObjectiveComplete(false)
    setServerBusy(false)
    setLog([
      { id: nowId(), t: performance.now(), text: "Server online. Objective: incomplete." },
    ])
  }

  const sendCheatComplete = () => {
    push('Client → Server: "objective-complete" (direct claim)')
    // Server authority: never accept a direct "complete" claim.
    push("Server: rejected (clients don't decide objective state).")
  }

  const sendInteract = () => {
    if (serverBusy) return
    push('Client → Server: "interact terminal"')

    if (!isNearTerminal) {
      push("Server: rejected (not in range).")
      return
    }

    if (objectiveComplete) {
      push("Server: rejected (already complete).")
      return
    }

    setServerBusy(true)
    push("Server: accepted (starting 3s server-side timer).")

    timerRef.current = window.setTimeout(() => {
      setObjectiveComplete(true)
      setServerBusy(false)
      timerRef.current = null
      push('Server → All: "objective-complete" (authoritative broadcast)')
    }, 3000)
  }

  return (
    <div className="my-6 rounded-lg border bg-card shadow-xs overflow-hidden">
      <div className="border-b p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground select-none" htmlFor="near-terminal">
            Near terminal
          </label>
          <input
            id="near-terminal"
            type="checkbox"
            checked={isNearTerminal}
            onChange={(e) => setIsNearTerminal(e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Objective</span>
          <span
            className={[
              "text-xs rounded-md px-2 py-1 border",
              objectiveComplete ? "bg-emerald-500/10 border-emerald-500/30" : "bg-muted/20",
            ].join(" ")}
          >
            {objectiveComplete ? "complete" : "incomplete"}
          </span>
          {serverBusy ? (
            <span className="text-xs text-muted-foreground">(server running timer…)</span>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="h-8 px-3 rounded-md border bg-background hover:bg-muted/40 text-xs"
            onClick={sendInteract}
            disabled={serverBusy}
          >
            Interact (valid)
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-md border bg-background hover:bg-muted/40 text-xs"
            onClick={sendCheatComplete}
          >
            Complete (cheat)
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-md border bg-background hover:bg-muted/40 text-xs"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-muted-foreground mb-2">Event log (newest first)</div>
        <div className="grid gap-1">
          {log.map((line) => (
            <div key={line.id} className="font-mono text-xs text-foreground/90">
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

