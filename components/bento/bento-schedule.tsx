"use client"
// components/bento/bento-schedule.tsx
// Business calendar / meeting agenda

import { useState, useEffect } from "react"
import { useTheme } from "@/app/theme/theme-context"

const EVENTS = [
  { time:"2:00 PM", title:"Client Meeting — Infosys HQ", location:"Whitefield, BLR", color:"#3b82f6", duration:"1h" },
  { time:"4:30 PM", title:"Sales Review Call", location:"Zoom · Conference", color:"#8b5cf6", duration:"45m" },
  { time:"6:00 PM", title:"Dinner — The Leela Palace", location:"HAL Airport Rd", color:"#10b981", duration:"2h" },
]

export default function BentoSchedule() {
  const t = useTheme()
  const [now, setNow] = useState<Date|null>(null)
  useEffect(() => { setNow(new Date()) }, [])

  return (
    <div className={t.cardClass} style={{ padding:"16px 18px", height:"100%", display:"flex", flexDirection:"column", gap:10, overflowY:"hidden" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span className="label-xs" style={{ color:t.t3 }}>TODAY'S AGENDA</span>
        <span style={{ color:t.t2, fontSize:11, fontWeight:600 }} suppressHydrationWarning>
          {now ? `${now.toLocaleDateString("en-IN",{weekday:"short",month:"short",day:"numeric"})}` : ""}
        </span>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8, flex:1 }}>
        {EVENTS.map((ev, i) => (
          <div key={i} style={{
            display:"flex", gap:10, alignItems:"flex-start",
            padding:"10px 12px", borderRadius:12,
            background:t.mode==="dark"?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)",
            border:`1px solid ${t.cardBorder}`,
            position:"relative", overflow:"hidden",
          }}>
            {/* Color strip */}
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:ev.color, borderRadius:"12px 0 0 12px" }} />

            <div style={{ paddingLeft:6, flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ color:t.t1, fontSize:12, fontWeight:600, flex:1, lineHeight:1.3, paddingRight:8 }}>{ev.title}</div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", flexShrink:0, gap:1 }}>
                  <span className="num-lg" style={{ color:ev.color, fontSize:11 }}>{ev.time}</span>
                  <span style={{ color:t.t3, fontSize:9 }}>{ev.duration}</span>
                </div>
              </div>
              <div style={{ color:t.t3, fontSize:10, marginTop:3, display:"flex", alignItems:"center", gap:4 }}>
                <span>📍</span><span>{ev.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}