"use client"
// ─────────────────────────────────────────────
// components/widget-renderer.tsx
// ─────────────────────────────────────────────
// Positions one widget using responsive layout
// metrics. Receives cell size from parent so
// all widgets share the same computed grid.

import { useLauncherStore } from "@/app/store/launcher-store"
import { widgetRegistry }   from "@/app/engine/widget-registry"
import { useTheme }         from "@/app/theme/theme-context"
import { CARD_RADIUS, RESIZE_HANDLE_PX } from "@/app/engine/constants"
import type { LayoutMetrics } from "@/app/engine/layout-engine"

type Props = { id: string; pageIdx: number; metrics: LayoutMetrics }

export default function WidgetRenderer({ id, pageIdx, metrics }: Props) {
  const {
    pages, setPages,
    dragging, setDragging,
    resizing, setResizing,
    isEditMode,
  } = useLauncherStore()
  const theme = useTheme()

  const { cell, offsetX, offsetY } = metrics
  const widget = pages[pageIdx]?.widgets.find((w) => w.id === id)
  if (!widget) return null

  const Component = widgetRegistry[widget.type]
  if (!Component) return null

  const isDraggingThis = dragging?.kind === "widget" && dragging.id === id
  const dispX = isDraggingThis ? dragging!.curX : widget.x
  const dispY = isDraggingThis ? dragging!.curY : widget.y

  const startDrag = (e: React.MouseEvent) => {
    if (!isEditMode) return
    e.stopPropagation()
    setDragging({
      kind: "widget", id, pageIdx,
      origX: widget.x, origY: widget.y,
      curX:  widget.x, curY:  widget.y,
      mouseX: e.clientX, mouseY: e.clientY,
    })
  }

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setResizing({
      id, pageIdx,
      origW: widget.w, origH: widget.h,
      mouseX: e.clientX, mouseY: e.clientY,
    })
  }

  const removeWidget = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPages((prev) =>
      prev.map((pg, pi) =>
        pi !== pageIdx ? pg : { ...pg, widgets: pg.widgets.filter((w) => w.id !== id) }
      )
    )
  }

  return (
    <div
      onMouseDown={startDrag}
      className={isEditMode && !isDraggingThis ? "edit-wobble" : ""}
      style={{
        position: "absolute",
        left:   offsetX + dispX * cell,
        top:    offsetY + dispY * cell,
        width:  widget.w * cell,
        height: widget.h * cell,
        transition: isDraggingThis ? "none" : "left 0.25s ease, top 0.25s ease",
        borderRadius: CARD_RADIUS,
        overflow: "hidden",
        boxShadow: isEditMode
          ? `0 0 0 2px ${theme.editBorder}, ${theme.glassShadow}`
          : theme.glassShadow,
        zIndex: isDraggingThis ? 500 : 10,
        cursor: isEditMode ? "move" : "default",
      }}
    >
      <Component />

      {/* Resize handle */}
      {isEditMode && (
        <div
          onMouseDown={startResize}
          style={{
            position: "absolute", right: 0, bottom: 0,
            width: RESIZE_HANDLE_PX, height: RESIZE_HANDLE_PX,
            background: theme.editResizeBg,
            borderRadius: `${CARD_RADIUS}px 0 ${CARD_RADIUS}px 0`,
            cursor: "se-resize",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: "white", fontWeight: 900,
            boxShadow: "0 0 10px rgba(99,102,241,0.6)",
            zIndex: 20,
          }}
        >
          ↘
        </div>
      )}

      {/* Remove button */}
      {isEditMode && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          onClick={removeWidget}
          style={{
            position: "absolute", top: 8, right: 8,
            width: 22, height: 22, borderRadius: "50%",
            background: theme.editRemoveBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 12, fontWeight: 900, color: "white",
            boxShadow: `0 0 8px ${theme.accentGlow}`,
            zIndex: 20,
          }}
        >
          ✕
        </div>
      )}
    </div>
  )
}