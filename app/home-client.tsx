"use client"
// ─────────────────────────────────────────────
// app/home-client.tsx — v6
// ─────────────────────────────────────────────
// Wires together:
//   • Orientation detection (portrait/landscape)
//   • Long press gated by longPressToEdit setting
//   • Settings panel (drawer, all 4 tabs)
//   • Connectivity bar (top-right shortcut pills)
//   • Bento dashboard (responsive, drag/resize)
//   • Status bar + dock

import { useEffect }         from "react"
import { useTheme }          from "@/app/theme/theme-context"
import { useLauncherStore }  from "@/app/store/launcher-store"
import { useSettingsStore }  from "@/app/store/settings-store"
import { useLongPress }      from "@/app/hooks/useLongPress"
import { useOrientation }    from "@/app/hooks/useOrientation"
import StatusBar             from "@/components/grid/status-bar"
import SmartDock             from "@/components/dock/smart-dock"
import BentoDashboard        from "@/components/bento/bento-dashboard"
import SettingsPanel         from "@/components/settings/settings-panel"
import ConnectivityBar       from "@/components/settings/connectivity-bar"
import EditModeBadge         from "@/components/grid/edit-mode-badge"
import LaunchOverlay         from "@/components/apps/launch-overlay"

export default function HomeClient() {
  const t             = useTheme()
  const isEditMode    = useLauncherStore(s => s.isEditMode)
  const setEditMode   = useLauncherStore(s => s.setEditMode)
  const toggleEdit    = useLauncherStore(s => s.toggleEditMode)
  const longPressToEdit = useSettingsStore(s => s.longPressToEdit)

  // Live orientation tracking
  useOrientation()

  // Escape to exit edit/settings
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEditMode(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [setEditMode])

  // Long press — only enabled if longPressToEdit setting is ON
  const longPress = useLongPress({
    onLongPress: () => { if (!isEditMode) toggleEdit() },
    onClick:     () => { if (isEditMode) setEditMode(false) },
    disabled: !longPressToEdit,  // ← key safety gate
  })

  return (
    <main
      className="w-screen h-screen overflow-hidden relative select-none"
      style={{
        background:  t.bg,
        fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      }}
      {...longPress}
    >
      {/* Ambient background mesh */}
      <div style={{ position:"absolute", inset:0, background:t.bgMesh, pointerEvents:"none", zIndex:0 }} />

      {/* Film grain noise overlay */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:1, opacity:.022,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:"160px 160px",
      }} />

      {/* ── Fixed chrome ── */}
      <StatusBar />
      <SmartDock />

      {/* ── Dashboard ── */}
      <BentoDashboard />

      {/* ── Connectivity quick-access bar ── */}
      <ConnectivityBar />

      {/* ── Overlays ── */}
      <EditModeBadge />
      <LaunchOverlay />

      {/* ── Settings drawer ── */}
      <SettingsPanel />
    </main>
  )
}