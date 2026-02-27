"use client"
// ─────────────────────────────────────────────
// components/grid/page-dots.tsx
// ─────────────────────────────────────────────

import { useLauncherStore }  from "@/app/store/launcher-store"
import { useTheme }          from "@/app/theme/theme-context"
import { DOCK_HEIGHT }       from "@/app/engine/constants"

export default function PageDots() {
  const pages          = useLauncherStore((s) => s.pages)
  const currentPage    = useLauncherStore((s) => s.currentPage)
  const setCurrentPage = useLauncherStore((s) => s.setCurrentPage)
  const theme          = useTheme()

  return (
    <div style={{
      position: "absolute",
      bottom: DOCK_HEIGHT + 10,
      left: "50%", transform: "translateX(-50%)",
      display: "flex", gap: 6, alignItems: "center",
      zIndex: 100,
    }}>
      {pages.map((_, i) => (
        <div
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{
            width:  i === currentPage ? 18 : 6,
            height: 6,
            borderRadius: 3,
            background: i === currentPage ? theme.dotActive : theme.dotInactive,
            transition: "all 0.3s ease",
            cursor: "pointer",
            boxShadow: i === currentPage ? `0 0 8px ${theme.accentGlow}` : "none",
          }}
        />
      ))}
    </div>
  )
}