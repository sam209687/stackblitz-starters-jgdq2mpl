"use client"
// components/bento/bento-quick-apps.tsx
// Business quick-launch grid

import { useState } from "react"
import { useTheme } from "@/app/theme/theme-context"
import { useLaunchAnimation } from "@/app/hooks/useLaunchAnimation"

const APPS = [
  { icon:"📞", label:"Phone",    color:"#10b981", bg:"rgba(16,185,129,0.12)" },
  { icon:"💬", label:"Messages", color:"#3b82f6", bg:"rgba(59,130,246,0.12)" },
  { icon:"📧", label:"Email",    color:"#f59e0b", bg:"rgba(245,158,11,0.12)" },
  { icon:"📅", label:"Calendar", color:"#8b5cf6", bg:"rgba(139,92,246,0.12)" },
  { icon:"🗺️", label:"Maps",    color:"#06b6d4", bg:"rgba(6,182,212,0.12)"  },
  { icon:"📷", label:"Camera",   color:"#ec4899", bg:"rgba(236,72,153,0.12)" },
  { icon:"🎵", label:"Spotify",  color:"#a855f7", bg:"rgba(168,85,247,0.12)" },
  { icon:"⚙️", label:"Settings", color:"#6b7280", bg:"rgba(107,114,128,0.12)" },
]

export default function BentoQuickApps() {
  const t = useTheme()
  const { launch } = useLaunchAnimation()
  const [pressed, setPressed] = useState<string|null>(null)

  return (
    <div className={t.cardClass} style={{ padding:"16px", height:"100%", display:"flex", flexDirection:"column", gap:10 }}>
      <span className="label-xs" style={{ color:t.t3 }}>QUICK LAUNCH</span>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, flex:1, alignContent:"start" }}>
        {APPS.map(app => (
          <button
            key={app.label}
            onMouseDown={() => setPressed(app.label)}
            onMouseUp={() => setPressed(null)}
            onClick={(e) => { launch({ id:app.label, icon:app.icon, label:app.label }, e) }}
            style={{
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              gap:5, padding:"10px 4px",
              borderRadius:13,
              background: pressed===app.label ? app.bg : (t.mode==="dark"?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)"),
              border:`1px solid ${pressed===app.label ? app.color+"44" : t.cardBorder}`,
              cursor:"pointer",
              transform: pressed===app.label ? "scale(0.93)" : "scale(1)",
              transition:"all .15s ease",
              boxShadow: pressed===app.label ? `0 0 12px ${app.color}33` : "none",
            }}
          >
            <span style={{ fontSize:20 }}>{app.icon}</span>
            <span style={{ color:t.t3, fontSize:9, fontWeight:600, letterSpacing:.5 }}>{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}