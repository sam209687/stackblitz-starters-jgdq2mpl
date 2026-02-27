"use client"
// ─────────────────────────────────────────────
// components/grid/grid-overlay.tsx
// ─────────────────────────────────────────────

import { useLauncherStore } from "@/app/store/launcher-store"
import { useTheme }         from "@/app/theme/theme-context"
import { COLS, ROWS }       from "@/app/engine/constants"
import type { LayoutMetrics } from "@/app/engine/layout-engine"

type Props = { metrics: LayoutMetrics }

export default function GridOverlay({ metrics }: Props) {
  const isEditMode = useLauncherStore((s) => s.isEditMode)
  const theme      = useTheme()
  if (!isEditMode) return null

  const { cell, offsetX, offsetY } = metrics

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {Array.from({ length: ROWS }).map((_, row) =>
        Array.from({ length: COLS }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            style={{
              position: "absolute",
              left: offsetX + col * cell,
              top:  offsetY + row * cell,
              width: cell, height: cell,
              border: `1px solid ${theme.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              borderRadius: 10,
              boxSizing: "border-box",
            }}
          />
        ))
      )}
    </div>
  )
}