"use client"
// ─────────────────────────────────────────────
// components/widgets/weather-widget.tsx
// ─────────────────────────────────────────────

import { useTheme } from "@/app/theme/theme-context"

const CONDITIONS = [
  { icon: "⛅", label: "Partly Cloudy", temp: "24°" },
]

export default function WeatherWidget() {
  const theme = useTheme()
  const c = CONDITIONS[0]

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
      <div style={{
        position: "absolute", bottom: -16, left: -16,
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(99,179,237,0.15)",
        filter: "blur(24px)",
        pointerEvents: "none",
      }} />

      <div style={{ color: theme.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}>
        Chennai, IN
      </div>

      <div style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1 }}>{c.icon}</div>

      <div>
        <div style={{ color: theme.textPrimary, fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, fontFamily: "DM Mono, monospace", lineHeight: 1 }}>
          {c.temp}C
        </div>
        <div style={{ color: theme.textSecondary, fontSize: 11, marginTop: 4, fontFamily: "DM Sans, sans-serif" }}>
          {c.label}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {["↑ 28°", "↓ 20°"].map(t => (
            <span key={t} style={{ color: theme.textMuted, fontSize: 10, fontFamily: "DM Mono, monospace" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}