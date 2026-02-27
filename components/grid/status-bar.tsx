"use client"
// components/grid/status-bar.tsx — v6

import { useState, useEffect } from "react"
import { useTheme }         from "@/app/theme/theme-context"
import { useSettingsStore } from "@/app/store/settings-store"
import { STATUS_BAR_HEIGHT } from "@/app/engine/constants"

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export default function StatusBar() {
  const t  = useTheme()
  const st = useSettingsStore()
  const c  = st.connectivity
  const [now, setNow] = useState<Date|null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const h    = now?.getHours().toString().padStart(2,"0")   ?? "--"
  const m    = now?.getMinutes().toString().padStart(2,"0") ?? "--"
  const date = now ? `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}` : ""

  return (
    <div style={{
      position:"fixed", top:0, left:0, right:0,
      height:STATUS_BAR_HEIGHT,
      background:t.dock,
      backdropFilter:"blur(32px) saturate(180%)",
      borderBottom:`1px solid ${t.dockBorder}`,
      display:"flex", alignItems:"center",
      paddingInline:14, gap:8,
      zIndex:2000,
    }}>
      {/* Brand mark */}
      <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
        <div style={{ width:18, height:18, borderRadius:5, background:t.a1, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ color:"white", fontSize:10, fontWeight:800 }}>B</span>
        </div>
        <span style={{ color:t.t2, fontSize:11, fontWeight:700, letterSpacing:.5 }}>BizDrive</span>
      </div>

      <div style={{ width:1, height:13, background:t.dockBorder }} />

      {/* Date */}
      <span suppressHydrationWarning style={{ color:t.t3, fontSize:11, flexShrink:0 }}>{date}</span>

      {/* Connectivity micro-indicators */}
      <div style={{ display:"flex", gap:3, alignItems:"center" }}>
        {[
          { icon:"🔵", on:c.bluetooth,    color:"#3b82f6" },
          { icon:"📶", on:c.wifi,         color:"#10b981" },
          { icon:"🔕", on:c.doNotDisturb, color:"#8b5cf6" },
        ].map((x,i) => (
          <div key={i} style={{
            width:16, height:16, borderRadius:4, fontSize:9,
            background: x.on ? `${x.color}22` : "transparent",
            display:"flex", alignItems:"center", justifyContent:"center",
            opacity: x.on ? 1 : 0.28, transition:"all .25s",
          }}>
            {x.icon}
          </div>
        ))}
      </div>

      {/* Center: clock */}
      <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
        <div suppressHydrationWarning style={{ color:t.t1, fontSize:13, fontFamily:"JetBrains Mono,monospace", fontWeight:600, letterSpacing:2 }}>
          {h}:{m}
        </div>
      </div>

      {/* Right: sys icons + controls */}
      <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
        {/* Signal bars */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:1.5, height:12 }}>
          {[3,5,8,11].map((bh,i) => (
            <div key={i} style={{ width:3, height:bh, borderRadius:1.5, background: i<3 ? t.a1 : t.t3+"55" }} />
          ))}
        </div>

        {/* Battery */}
        <div style={{ display:"flex", alignItems:"center", gap:1 }}>
          <div style={{ width:20, height:10, borderRadius:2.5, border:`1.5px solid ${t.t2}`, padding:1.5, display:"flex" }}>
            <div style={{ width:"76%", borderRadius:1, background:t.green }} />
          </div>
          <div style={{ width:2, height:4, borderRadius:"0 1px 1px 0", background:t.t2 }} />
        </div>

        {/* Theme toggle */}
        <button onClick={e=>{e.stopPropagation();t.toggle()}} style={{
          width:30, height:16, borderRadius:8, background:t.a3,
          border:`1.5px solid ${t.a1}66`, cursor:"pointer",
          display:"flex", alignItems:"center", padding:"0 2px",
          transition:"background .3s",
        }}>
          <div style={{ width:12, height:12, borderRadius:"50%", background:t.a1, transform:t.mode==="dark"?"translateX(0)":"translateX(13px)", transition:"transform .3s", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7 }}>
            {t.mode==="dark"?"🌙":"☀️"}
          </div>
        </button>

        {/* Settings button */}
        <button
          onClick={e=>{e.stopPropagation();st.setSettingsOpen(true)}}
          style={{
            width:24, height:24, borderRadius:7,
            background: st.settingsOpen ? t.a3 : (t.mode==="dark"?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.06)"),
            border:`1px solid ${st.settingsOpen ? t.a1+"66" : t.cardBorder}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, cursor:"pointer", transition:"all .2s",
          }}
          title="Open Settings"
        >
          ⚙️
        </button>
      </div>
    </div>
  )
}