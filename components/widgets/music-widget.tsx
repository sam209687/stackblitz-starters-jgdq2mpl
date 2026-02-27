"use client"
// ─────────────────────────────────────────────
// components/widgets/music-widget.tsx
// ─────────────────────────────────────────────

import { useState } from "react"
import { useTheme } from "@/app/theme/theme-context"

export default function MusicWidget() {
  const theme = useTheme()
  const [playing, setPlaying] = useState(false)
  const [progress] = useState(42)

  return (
    <div
      className="w-full h-full flex flex-col justify-between"
      style={{
        background: theme.glass,
        backdropFilter: theme.glassBlur,
        border: `1px solid ${theme.glassBorder}`,
        boxShadow: theme.glassShadow,
        padding: "12px 14px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(168,85,247,0.12)",
        filter: "blur(28px)",
        pointerEvents: "none",
      }} />

      <div style={{ color: theme.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}>
        Now Playing
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minHeight: 0 }}>
        {/* Album art disc */}
        <div style={{
          width: "clamp(36px, 4vw, 52px)", height: "clamp(36px, 4vw, 52px)",
          borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(14px, 2vw, 20px)",
          boxShadow: playing ? "0 0 20px rgba(168,85,247,0.5)" : "none",
          animation: playing ? "spin 5s linear infinite" : "none",
          transition: "box-shadow 0.3s",
          position: "relative",
        }}>
          🎵
          {/* Center dot */}
          <div style={{
            position: "absolute", width: 8, height: 8, borderRadius: "50%",
            background: theme.glass, backdropFilter: theme.glassBlur,
            border: `2px solid ${theme.glassBorder}`,
          }} />
        </div>

        {/* Track info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: theme.textPrimary, fontSize: 13, fontWeight: 700, fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Blinding Lights
          </div>
          <div style={{ color: theme.textSecondary, fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>
            The Weeknd
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: theme.textSecondary, fontSize: 14, padding: 4 }}>⏮</button>
          <button
            onClick={() => setPlaying(p => !p)}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: theme.accent,
              border: "none", cursor: "pointer",
              color: "white", fontSize: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 12px ${theme.accentGlow}`,
            }}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: theme.textSecondary, fontSize: 14, padding: 4 }}>⏭</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: theme.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${progress}%`, height: "100%", background: theme.accent, borderRadius: 2 }} />
      </div>
    </div>
  )
}