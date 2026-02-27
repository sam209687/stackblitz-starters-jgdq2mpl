"use client"

import { useRef } from "react"
import { useLauncherStore } from "@/app/store/launcher-store"
import { GRID } from "@/app/engine/grid-config"
import type { WidgetInstance } from "@/app/store/launcher-store"

export default function DraggableWidget({
  widget,
  children,
}: {
  widget: WidgetInstance
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  const isEditMode = useLauncherStore((s) => s.isEditMode)
  const updateWidget = useLauncherStore((s) => s.updateWidget)

  const start = useRef({ x: 0, y: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return

    e.stopPropagation()

    start.current = {
      x: e.clientX,
      y: e.clientY,
    }

    const startGridX = widget.x
    const startGridY = widget.y

    const handleMove = (ev: MouseEvent) => {
      const dx = ev.clientX - start.current.x
      const dy = ev.clientY - start.current.y

      const colWidth =
        ref.current!.parentElement!.offsetWidth / GRID.COLS

      const moveX = Math.round(dx / colWidth)
      const moveY = Math.round(dy / GRID.ROW_HEIGHT)

      updateWidget(widget.id, {
        x: Math.max(1, startGridX + moveX),
        y: Math.max(1, startGridY + moveY),
      })
    }

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)
  }

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      style={{
        gridColumn: `${widget.x} / span ${widget.w}`,
        gridRow: `${widget.y} / span ${widget.h}`,
      }}
      className={isEditMode ? "ring-2 ring-cyan-400 cursor-move z-50" : ""}
    >
      {children}
    </div>
  )
}