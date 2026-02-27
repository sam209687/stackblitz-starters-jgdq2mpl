"use client"
// ─────────────────────────────────────────────
// components/widgets/clock-widget.tsx
// ─────────────────────────────────────────────
// suppressHydrationWarning on all time-derived
// nodes so React ignores the server/client
// date mismatch instead of throwing.

import { useState, useEffect } from "react"
import { useTheme } from "@/app/theme/theme-context"
import { CARD_RADIUS } from "@/app/engine/constants"

const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export default function ClockWidget() {
  const theme = useTheme()
  // Start with null — render placeholder until mounted
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const h = time ? time.getHours().toString().padStart(2, "0") : "--"
  const m = time ? time.getMinutes().toString().padStart(2, "0") : "--"
  const s = time ? time.getSeconds().toString().padStart(2, "0") : "--"
  const dayStr   = time ? DAYS[time.getDay()]   : ""
  const dateStr  = time ? `${MONTHS[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}` : ""

  return (
    <div
      className="w-full h-full flex flex-col justify-between"
      style={{
        background: theme.glass,
        backdropFilter: theme.glassBlur,
        border: `1px solid ${theme.glassBorder}`,
        boxShadow: theme.glassShadow,
        padding: "14px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent glow blob */}
      <div style={{
        position: "absolute", top: -24, right: -24,
        width: 90, height: 90, borderRadius: "50%",
        background: theme.accentGlow,
        filter: "blur(32px)",
        pointerEvents: "none",
      }} />

      <div suppressHydrationWarning>
        <div style={{ color: theme.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}
          suppressHydrationWarning>
          {dayStr}
        </div>
        <div style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2, fontFamily: "DM Sans, sans-serif" }}
          suppressHydrationWarning>
          {dateStr}
        </div>
      </div>

      <div suppressHydrationWarning>
        <div
          suppressHydrationWarning
          style={{
            fontFamily: "DM Mono, Courier New, monospace",
            fontSize: "clamp(24px, 3.5vw, 48px)",
            fontWeight: 700,
            color: theme.textPrimary,
            letterSpacing: 3,
            lineHeight: 1,
          }}>
          {h}<span style={{ color: theme.accent, animation: "blink 1s step-end infinite" }}>:</span>{m}
        </div>
        <div suppressHydrationWarning
          style={{ color: theme.textMuted, fontSize: 11, fontFamily: "DM Mono, monospace", marginTop: 4, letterSpacing: 1 }}>
          :{s}
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${theme.accent}, transparent)`,
      }} />
    </div>
  )
}