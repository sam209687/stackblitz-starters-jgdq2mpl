"use client"
// components/grid/edit-mode-badge.tsx — v6

import { useLauncherStore } from "@/app/store/launcher-store"
import { useTheme }         from "@/app/theme/theme-context"
import { STATUS_BAR_HEIGHT } from "@/app/engine/constants"

export default function EditModeBadge() {
  const isEditMode = useLauncherStore(s => s.isEditMode)
  const setEditMode = useLauncherStore(s => s.setEditMode)
  const t = useTheme()
  if (!isEditMode) return null

  return (
    <div style={{
      position:"fixed",
      top: STATUS_BAR_HEIGHT + 8,
      left:"50%", transform:"translateX(-50%)",
      display:"flex", alignItems:"center", gap:10,
      background: t.a1,
      color:"white",
      padding:"6px 16px 6px 14px",
      borderRadius:24,
      fontSize:11, fontWeight:700,
      fontFamily:"JetBrains Mono,monospace",
      letterSpacing:.5,
      zIndex:1500,
      animation:"pulseRing 1.5s infinite",
      boxShadow:`0 4px 20px ${t.a2}`,
      whiteSpace:"nowrap",
      cursor:"pointer",
    }}
    onClick={() => setEditMode(false)}
    title="Click to exit customize mode"
    >
      ✏️ CUSTOMIZE MODE
      <span style={{ opacity:.75, fontSize:10, borderLeft:"1px solid rgba(255,255,255,0.4)", paddingLeft:8 }}>
        TAP TO EXIT
      </span>
    </div>
  )
}