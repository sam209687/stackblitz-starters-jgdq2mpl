"use client"
// ─────────────────────────────────────────────
// app/engine/layout-engine.ts
// ─────────────────────────────────────────────
// Computes responsive grid metrics from actual
// viewport size. Returns null until mounted so
// the server render is skipped entirely — this
// prevents SSR/client hydration mismatches that
// occur when server dimensions ≠ client window.

import { useState, useEffect } from "react"
import { COLS, ROWS, DOCK_HEIGHT, STATUS_BAR_HEIGHT } from "./constants"

export type LayoutMetrics = {
  cell: number
  gridW: number
  gridH: number
  offsetX: number
  offsetY: number
  vw: number
  vh: number
  isLandscape: boolean
}

function compute(vw: number, vh: number): LayoutMetrics {
  const isLandscape = vw >= vh
  const usableW = vw
  const usableH = vh - DOCK_HEIGHT - STATUS_BAR_HEIGHT

  const cellFromW = Math.floor(usableW / COLS)
  const cellFromH = Math.floor(usableH / ROWS)
  const cell = Math.min(cellFromW, cellFromH)

  const gridW = cell * COLS
  const gridH = cell * ROWS
  const offsetX = Math.floor((usableW - gridW) / 2)
  const offsetY = STATUS_BAR_HEIGHT

  return { cell, gridW, gridH, offsetX, offsetY, vw, vh, isLandscape }
}

// Returns null on the server / before first mount.
// HomeClient renders nothing until this resolves.
export function useLayoutMetrics(): LayoutMetrics | null {
  const [metrics, setMetrics] = useState<LayoutMetrics | null>(null)

  useEffect(() => {
    const update = () =>
      setMetrics(compute(window.innerWidth, window.innerHeight))

    update() // run immediately on mount
    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("orientationchange", update)
    }
  }, [])

  return metrics
}