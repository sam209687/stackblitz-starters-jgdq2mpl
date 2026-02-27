"use client"
// ─────────────────────────────────────────────
// components/apps/launch-overlay.tsx
// ─────────────────────────────────────────────

import { useLauncherStore } from "@/app/store/launcher-store"
import { useTheme }         from "@/app/theme/theme-context"

export default function LaunchOverlay() {
  const launchingApp = useLauncherStore((s) => s.launchingApp)
  const theme        = useTheme()
  if (!launchingApp) return null

  return (
    <div style={{
      position: "fixed",
      left: launchingApp.x, top: launchingApp.y,
      width: 56, height: 56,
      background: `radial-gradient(circle, ${theme.accent} 0%, ${theme.accentGlow} 50%, transparent 100%)`,
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
      transformOrigin: "center center",
      animation: "zoomLaunch 0.65s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
      zIndex: 9998, pointerEvents: "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 22,
    }}>
      {launchingApp.icon}
    </div>
  )
}