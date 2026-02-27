"use client"

import { useRef } from "react"
import { useLauncherStore, WidgetInstance } from "@/app/store/launcher-store"
import { widgetRegistry } from "@/app/engine/widget-registry"

export default function WidgetRenderer({
  widget,
}: {
  widget: WidgetInstance
}) {
  const ref = useRef<HTMLDivElement>(null)

  const isEditMode = useLauncherStore((s) => s.isEditMode)
  const updateWidget = useLauncherStore((s) => s.updateWidget)
  const setDraggingWidgetId = useLauncherStore(
    (s: any) => s.setDraggingWidgetId
  )

  const Component = widgetRegistry[widget.type]

  if (!Component) {
    console.error("❌ Component not found for type:", widget.type)
    return null
  }

  const startDrag = (e: React.MouseEvent) => {
    if (!isEditMode) {
      console.log("🚫 Drag blocked — not in edit mode")
      return
    }

    console.log("🟢 DRAG START:", widget.id)

    setDraggingWidgetId(widget.id)

    const startX = e.clientX
    const startY = e.clientY

    const handleMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY

      const gridX = Math.round(dx / 100)
      const gridY = Math.round(dy / 100)

      console.log("📦 Dragging:", {
        id: widget.id,
        dx,
        dy,
        gridX,
        gridY,
      })

      updateWidget(widget.id, {
        x: widget.x + gridX,
        y: widget.y + gridY,
      })
    }

    const handleUp = () => {
      console.log("🔴 DRAG END:", widget.id)

      setDraggingWidgetId(null)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)
  }

  return (
    <div
      ref={ref}
      onMouseDown={startDrag}
      className={`absolute ${isEditMode ? "cursor-move" : ""}`}
      style={{
        left: widget.x * 100,
        top: widget.y * 100,
        width: widget.w * 100,
        height: widget.h * 100,
      }}
    >
      <Component {...widget.config} />
    </div>
  )
}