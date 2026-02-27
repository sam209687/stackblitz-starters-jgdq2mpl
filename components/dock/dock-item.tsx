"use client"
// ─────────────────────────────────────────────
// components/dock/dock-item.tsx
// ─────────────────────────────────────────────

import { useLauncherStore }   from "@/app/store/launcher-store"
import { useLaunchAnimation } from "@/app/hooks/useLaunchAnimation"
import { useTheme }           from "@/app/theme/theme-context"
import type { DockApp }       from "@/types/launcher"

type Props = { app: DockApp }

export default function DockItem({ app }: Props) {
  const activeDockApp    = useLauncherStore((s) => s.activeDockApp)
  const setActiveDockApp = useLauncherStore((s) => s.setActiveDockApp)
  const { launch }       = useLaunchAnimation()
  const theme            = useTheme()

  const isActive = activeDockApp === app.id

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveDockApp(app.id)
    launch(app, e)
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 4,
        paddingInline: "clamp(10px, 2vw, 24px)",
        paddingBlock: 8,
        borderRadius: 14, border: "none",
        background: isActive ? theme.dockItemActive : "transparent",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isActive ? theme.dockItemActiveShadow : "none",
        transform: isActive ? "scale(1.08) translateY(-2px)" : "scale(1)",
        position: "relative",
      }}
    >
      <span style={{ fontSize: "clamp(18px, 2.2vw, 26px)" }}>{app.icon}</span>
      <span style={{
        color: isActive ? theme.accent : theme.textMuted,
        fontSize: "clamp(9px, 0.9vw, 11px)",
        fontFamily: "DM Sans, sans-serif",
        fontWeight: isActive ? 700 : 400,
        transition: "color 0.2s",
        letterSpacing: 0.3,
      }}>
        {app.label}
      </span>

      {/* Active indicator dot */}
      {isActive && (
        <div style={{
          position: "absolute", bottom: 2,
          width: 4, height: 4, borderRadius: "50%",
          background: theme.accent,
          boxShadow: `0 0 6px ${theme.accentGlow}`,
        }} />
      )}
    </button>
  )
}