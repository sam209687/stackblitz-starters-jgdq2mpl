"use client"
// ─────────────────────────────────────────────
// components/grid/page-edge-indicators.tsx
// ─────────────────────────────────────────────

import { useLauncherStore }  from "@/app/store/launcher-store"
import { useTheme }          from "@/app/theme/theme-context"
import { DOCK_HEIGHT, STATUS_BAR_HEIGHT, PAGE_SWIPE_ZONE } from "@/app/engine/constants"

export default function PageEdgeIndicators() {
  const dragging    = useLauncherStore((s) => s.dragging)
  const currentPage = useLauncherStore((s) => s.currentPage)
  const pages       = useLauncherStore((s) => s.pages)
  const theme       = useTheme()
  if (!dragging) return null

  const edgeStyle: React.CSSProperties = {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
    bottom: DOCK_HEIGHT,
    width: PAGE_SWIPE_ZONE,
    display: "flex", alignItems: "center", justifyContent: "center",
    pointerEvents: "none",
    zIndex: 200,
  }

  return (
    <>
      {currentPage > 0 && (
        <div style={{
          ...edgeStyle, left: 0,
          background: `linear-gradient(to right, ${theme.accentSoft}, transparent)`,
        }}>
          <span style={{ color: theme.accent, fontSize: 22, opacity: 0.8, fontWeight: 700 }}>◀</span>
        </div>
      )}
      {currentPage < pages.length - 1 && (
        <div style={{
          ...edgeStyle, right: 0,
          background: `linear-gradient(to left, ${theme.accentSoft}, transparent)`,
        }}>
          <span style={{ color: theme.accent, fontSize: 22, opacity: 0.8, fontWeight: 700 }}>▶</span>
        </div>
      )}
    </>
  )
}