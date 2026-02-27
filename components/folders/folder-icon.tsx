"use client"
// ─────────────────────────────────────────────
// components/folders/folder-icon.tsx
// ─────────────────────────────────────────────

import { useState }         from "react"
import { useTheme }         from "@/app/theme/theme-context"
import { APP_ICON_PAD, APP_RADIUS_FRACTION } from "@/app/engine/constants"
import type { FolderInstance } from "@/types/launcher"
import type { LayoutMetrics }  from "@/app/engine/layout-engine"

type Props = { folder: FolderInstance; isEditMode: boolean; metrics: LayoutMetrics }

export default function FolderIcon({ folder, isEditMode, metrics }: Props) {
  const theme   = useTheme()
  const [open, setOpen] = useState(false)
  const { cell, offsetX, offsetY } = metrics

  const iconSize = cell - APP_ICON_PAD * 2
  const radius   = iconSize * APP_RADIUS_FRACTION
  const miniEmoji = Math.max(10, cell * 0.12)

  return (
    <>
      <div
        onClick={() => !isEditMode && setOpen(true)}
        style={{
          position: "absolute",
          left:   offsetX + folder.x * cell + APP_ICON_PAD,
          top:    offsetY + folder.y * cell + APP_ICON_PAD,
          width:  iconSize, height: iconSize,
          borderRadius: radius,
          background: theme.glass,
          backdropFilter: theme.glassBlur,
          border: `1px solid ${theme.glassBorder}`,
          boxShadow: theme.glassShadow,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          cursor: isEditMode ? "default" : "pointer",
          zIndex: 10, gap: 3,
        }}
      >
        {/* Mini icon grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 4 }}>
          {folder.apps.slice(0, 4).map((a) => (
            <span key={a.id} style={{ fontSize: miniEmoji, lineHeight: 1 }}>{a.icon}</span>
          ))}
        </div>
        <span style={{
          color: theme.textMuted, fontSize: Math.max(8, cell * 0.09),
          fontFamily: "DM Sans, sans-serif", fontWeight: 500,
        }}>
          {folder.label}
        </span>
      </div>

      {/* Full-screen overlay */}
      {open && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: theme.mode === "dark"
              ? "rgba(0,0,0,0.85)"
              : "rgba(200,200,220,0.70)",
            backdropFilter: "blur(28px)",
            zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: theme.glass,
              backdropFilter: theme.glassBlur,
              borderRadius: 24, padding: 28,
              minWidth: 280, maxWidth: 360,
              border: `1px solid ${theme.glassBorder}`,
              boxShadow: theme.glassShadow,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              color: theme.textPrimary, fontWeight: 700, marginBottom: 20,
              textAlign: "center", fontSize: 16,
              fontFamily: "DM Sans, sans-serif",
            }}>
              {folder.label}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
              {folder.apps.map((a) => (
                <div key={a.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: theme.accentSoft,
                    border: `1px solid ${theme.glassBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26,
                  }}>{a.icon}</div>
                  <div style={{ color: theme.textSecondary, fontSize: 10, fontFamily: "DM Sans, sans-serif", textAlign: "center" }}>{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}