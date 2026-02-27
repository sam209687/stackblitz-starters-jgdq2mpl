"use client"
// components/bento/bento-nav.tsx
// Navigation card — turn-by-turn + trip info

import { useState } from "react"
import { useTheme } from "@/app/theme/theme-context"

const ROUTE_STEPS = [
  { dir: "↗", road: "Turn right on MG Road", dist: "0.8 km", active: true },
  { dir: "↑",  road: "Continue on NH-44", dist: "12 km", active: false },
  { dir: "↙", road: "Exit at Silk Board", dist: "14.2 km", active: false },
]

export default function BentoNav() {
  const t = useTheme()
  const [expanded, setExpanded] = useState(false)
  const active = ROUTE_STEPS[0]

  return (
    <div className={t.cardClass} style={{ padding:"18px 20px", height:"100%", display:"flex", flexDirection:"column", gap:12 }}>
      {/* Accent glow */}
      <div style={{ position:"absolute", bottom:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(16,185,129,0.12)", filter:"blur(32px)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span className="label-xs" style={{ color:t.t3 }}>NAVIGATION</span>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:t.green, boxShadow:`0 0 6px ${t.green}` }} />
          <span style={{ color:t.green, fontSize:11, fontWeight:600 }}>LIVE</span>
        </div>
      </div>

      {/* Next turn — hero */}
      <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
        <div style={{
          width:44, height:44, borderRadius:12, flexShrink:0,
          background:`linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))`,
          border:`1px solid rgba(16,185,129,0.25)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:22, color:"#10b981",
        }}>
          {active.dir}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ color:t.t1, fontSize:14, fontWeight:600, lineHeight:1.3 }}>{active.road}</div>
          <div style={{ color:"#10b981", fontSize:12, marginTop:4, fontFamily:"JetBrains Mono, monospace", fontWeight:500 }}>{active.dist}</div>
        </div>
      </div>

      {/* Trip stats row */}
      <div style={{ display:"flex", gap:10, borderTop:`1px solid ${t.cardBorder}`, paddingTop:10 }}>
        {[
          { label:"ETA", value:"12 min" },
          { label:"DIST", value:"14.2 km" },
          { label:"ARR", value:"3:42 PM" },
        ].map(s => (
          <div key={s.label} style={{ flex:1, textAlign:"center" }}>
            <div className="label-xs" style={{ color:t.t3 }}>{s.label}</div>
            <div className="num-lg" style={{ color:t.t1, fontSize:14, marginTop:3 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Route steps */}
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {ROUTE_STEPS.slice(1).map((step,i) => (
          <div key={i} style={{ display:"flex", gap:8, alignItems:"center", opacity:.65 }}>
            <span style={{ color:t.t3, width:16, textAlign:"center", fontSize:12 }}>{step.dir}</span>
            <span style={{ color:t.t2, fontSize:11, flex:1 }}>{step.road}</span>
            <span style={{ color:t.t3, fontSize:10, fontFamily:"JetBrains Mono, monospace" }}>{step.dist}</span>
          </div>
        ))}
      </div>
    </div>
  )
}