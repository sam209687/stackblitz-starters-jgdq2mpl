"use client"
// ─────────────────────────────────────────────
// components/apps/app-icon.tsx
// ─────────────────────────────────────────────

import { useLauncherStore }   from "@/app/store/launcher-store"
import { useLaunchAnimation } from "@/app/hooks/useLaunchAnimation"
import { useTheme }           from "@/app/theme/theme-context"
import { APP_ICON_PAD, APP_RADIUS_FRACTION } from "@/app/engine/constants"
import type { AppInstance }   from "@/types/launcher"
import type { LayoutMetrics } from "@/app/engine/layout-engine"

type Props = { app: AppInstance; pageIdx: number; metrics: LayoutMetrics }

export default function AppIcon({ app, pageIdx, metrics }: Props) {
  const { isEditMode, dragging, setDragging, dropTarget, setPages } = useLauncherStore()
  const theme = useTheme()
  const { launch } = useLaunchAnimation()
  const { cell, offsetX, offsetY } = metrics

  const isDraggingThis = dragging?.kind === "app" && dragging.id === app.id
  const isDropTarget   = dropTarget === app.id

  const dispX = isDraggingThis ? dragging!.curX : app.x
  const dispY = isDraggingThis ? dragging!.curY : app.y

  const iconSize  = cell - APP_ICON_PAD * 2
  const radius    = iconSize * APP_RADIUS_FRACTION

  const startDrag = (e: React.MouseEvent) => {
    if (!isEditMode) return
    e.stopPropagation()
    setDragging({
      kind: "app", id: app.id, pageIdx,
      origX: app.x, origY: app.y,
      curX:  app.x, curY:  app.y,
      mouseX: e.clientX, mouseY: e.clientY,
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!isEditMode) launch(app, e)
  }

  const removeApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPages((prev) =>
      prev.map((pg, pi) =>
        pi !== pageIdx ? pg : { ...pg, apps: pg.apps.filter((a) => a.id !== app.id) }
      )
    )
  }

  return (
    <div
      onMouseDown={startDrag}
      onClick={handleClick}
      className={isEditMode && !isDraggingThis ? "edit-wobble" : ""}
      style={{
        position: "absolute",
        left:   offsetX + dispX * cell + APP_ICON_PAD,
        top:    offsetY + dispY * cell + APP_ICON_PAD,
        width:  iconSize,
        height: iconSize,
        transition: isDraggingThis ? "none" : "left 0.25s ease, top 0.25s ease",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        borderRadius: radius,
        background: isDropTarget ? theme.accentSoft : theme.glass,
        backdropFilter: theme.glassBlur,
        border: isDropTarget
          ? `2px dashed ${theme.accent}`
          : `1px solid ${theme.glassBorder}`,
        boxShadow: isDropTarget
          ? `0 0 20px ${theme.accentGlow}`
          : theme.glassShadow,
        zIndex: isDraggingThis ? 500 : 10,
        cursor: isEditMode ? "move" : "pointer",
        gap: 4,
      }}
    >
      <span style={{ fontSize: cell * 0.28, lineHeight: 1 }}>{app.icon}</span>
      <span style={{
        color: theme.textSecondary,
        fontSize: Math.max(9, cell * 0.1),
        fontFamily: "DM Sans, sans-serif",
        fontWeight: 500,
        textAlign: "center",
        lineHeight: 1.2,
        paddingInline: 4,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
      }}>
        {app.label}
      </span>

      {isDropTarget && (
        <div style={{
          position: "absolute", bottom: -20,
          color: theme.accent, fontSize: 9,
          whiteSpace: "nowrap", fontFamily: "DM Sans, sans-serif",
          background: theme.glass, backdropFilter: theme.glassBlur,
          padding: "2px 6px", borderRadius: 4,
          border: `1px solid ${theme.glassBorder}`,
        }}>
          Drop → folder
        </div>
      )}

      {isEditMode && !isDraggingThis && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          onClick={removeApp}
          style={{
            position: "absolute", top: -6, right: -6,
            width: 18, height: 18, borderRadius: "50%",
            background: theme.editRemoveBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 10, fontWeight: 900, color: "white",
            boxShadow: `0 0 6px ${theme.accentGlow}`,
            zIndex: 20,
          }}
        >
          ✕
        </div>
      )}
    </div>
  )
}