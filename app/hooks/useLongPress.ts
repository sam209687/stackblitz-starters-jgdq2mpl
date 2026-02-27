"use client"
// app/hooks/useLongPress.ts
// Respects the longPressToEdit setting from the
// settings store — if disabled, long press does
// nothing (safer while driving).

import { useRef } from "react"
import { LONG_PRESS_MS } from "@/app/engine/constants"

type Options = {
  onLongPress: () => void
  onClick?: () => void
  disabled?: boolean   // set true when longPressToEdit is off
}

export function useLongPress({ onLongPress, onClick, disabled }: Options) {
  const timer     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggered = useRef(false)
  const moved     = useRef(false)
  const startPos  = useRef({ x: 0, y: 0 })

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return
    triggered.current = false
    moved.current     = false
    const pos = "touches" in e ? e.touches[0] : e
    startPos.current = { x: pos.clientX, y: pos.clientY }

    timer.current = setTimeout(() => {
      if (!moved.current) {
        triggered.current = true
        onLongPress()
      }
    }, LONG_PRESS_MS)
  }

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current)
  }

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = "touches" in e ? e.touches[0] : e
    const dx = Math.abs(pos.clientX - startPos.current.x)
    const dy = Math.abs(pos.clientY - startPos.current.y)
    if (dx > 8 || dy > 8) {
      moved.current = true
      cancel()
    }
  }

  const handleClick = () => {
    if (triggered.current) { triggered.current = false; return }
    onClick?.()
  }

  return {
    onMouseDown:  start,
    onMouseUp:    cancel,
    onMouseMove:  move,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd:   cancel,
    onTouchMove:  move,
    onClick:      handleClick,
  }
}