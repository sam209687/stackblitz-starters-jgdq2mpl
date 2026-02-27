"use client"
// ─────────────────────────────────────────────
// components/grid/edit-mode-hint.tsx
// ─────────────────────────────────────────────

import { useLauncherStore } from "@/app/store/launcher-store"
import { useTheme }         from "@/app/theme/theme-context"
import { DOCK_HEIGHT }      from "@/app/engine/constants"

export default function EditModeHint() {
  const isEditMode = useLauncherStore((s) => s.isEditMode)
  const theme      = useTheme()
  if (!isEditMode) return null

  const hints = [
    { icon: "📁", text: "Drag app onto app → folder" },
    { icon: "◀▶", text: "Drag to edge → change page" },
    { icon: "↘", text: "Corner handle → resize widget" },
  ]

  return (
    <div style={{
      position: "absolute",
      bottom: DOCK_HEIGHT + 32,
      right: 16,
      background: theme.glass,
      backdropFilter: theme.glassBlur,
      borderRadius: 14,
      padding: "10px 14px",
      border: `1px solid ${theme.glassBorder}`,
      boxShadow: theme.glassShadow,
      zIndex: 500,
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      {hints.map(h => (
        <div key={h.icon} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12 }}>{h.icon}</span>
          <span style={{ color: theme.textMuted, fontSize: 10, fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap" }}>{h.text}</span>
        </div>
      ))}
    </div>
  )
}