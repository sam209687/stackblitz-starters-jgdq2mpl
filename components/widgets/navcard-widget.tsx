"use client"
// ─────────────────────────────────────────────
// components/widgets/navcard-widget.tsx
// ─────────────────────────────────────────────

import { useTheme } from "@/app/theme/theme-context"

export default function NavCardWidget() {
  const theme = useTheme()

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
        position: "absolute", bottom: -20, right: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(16,185,129,0.12)",
        filter: "blur(28px)",
        pointerEvents: "none",
      }} />

      <div style={{ color: theme.textMuted, fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}>
        🧭 Navigation
      </div>

      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 32, height: 32, borderRadius: 10,
          background: "rgba(16,185,129,0.2)",
          border: "1px solid rgba(16,185,129,0.3)",
          fontSize: 16, marginBottom: 6,
        }}>↗</div>
        <div style={{ color: theme.textPrimary, fontSize: 13, fontWeight: 700, fontFamily: "DM Sans, sans-serif", lineHeight: 1.3 }}>
          Turn right on MG Road
        </div>
        <div style={{ color: "rgba(16,185,129,0.9)", fontSize: 11, marginTop: 4, fontFamily: "DM Mono, monospace" }}>
          0.8 km
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: theme.textSecondary, fontSize: 11, fontFamily: "DM Sans, sans-serif" }}>ETA 12 min</span>
        <span style={{ color: theme.textMuted, fontSize: 10, fontFamily: "DM Sans, sans-serif" }}>via NH-44</span>
      </div>
    </div>
  )
}