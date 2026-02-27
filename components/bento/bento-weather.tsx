"use client"
// components/bento/bento-weather.tsx
// Rich weather card with AQI, UV, humidity

import { useTheme } from "@/app/theme/theme-context"

const HOURS = [
  { time:"Now", icon:"⛅", temp:24 },
  { time:"2PM", icon:"🌤", temp:26 },
  { time:"4PM", icon:"⛅", temp:25 },
  { time:"6PM", icon:"🌥", temp:22 },
  { time:"8PM", icon:"🌙", temp:19 },
]

export default function BentoWeather() {
  const t = useTheme()
  const maxT = Math.max(...HOURS.map(h=>h.temp))
  const minT = Math.min(...HOURS.map(h=>h.temp))

  return (
    <div className={t.cardClass} style={{ padding:"18px 20px", height:"100%", display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ position:"absolute", top:-10, right:-10, width:90, height:90, borderRadius:"50%", background:"rgba(99,179,237,0.10)", filter:"blur(28px)", pointerEvents:"none" }} />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div className="label-xs" style={{ color:t.t3 }}>CHENNAI, IN</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:6, marginTop:4 }}>
            <span className="num-lg" style={{ color:t.t1, fontSize:"clamp(28px,3.5vw,42px)" }}>24°</span>
            <span style={{ color:t.t2, fontSize:13, marginBottom:5 }}>Partly Cloudy</span>
          </div>
        </div>
        <div style={{ fontSize:36, lineHeight:1 }}>⛅</div>
      </div>

      {/* Stats row */}
      <div style={{ display:"flex", gap:8 }}>
        {[
          { icon:"💧", label:"HUMIDITY", val:"72%" },
          { icon:"💨", label:"WIND", val:"18 km/h" },
          { icon:"🌡", label:"FEELS", val:"27°C" },
        ].map(s => (
          <div key={s.label} style={{ flex:1, background:t.mode==="dark"?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", borderRadius:10, padding:"8px 6px", textAlign:"center", border:`1px solid ${t.cardBorder}` }}>
            <div style={{ fontSize:14 }}>{s.icon}</div>
            <div className="label-xs" style={{ color:t.t3, marginTop:3, fontSize:9 }}>{s.label}</div>
            <div className="num-lg" style={{ color:t.t1, fontSize:12, marginTop:2 }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* AQI + UV */}
      <div style={{ display:"flex", gap:8 }}>
        <div style={{ flex:1, borderRadius:10, padding:"8px 10px", background:"rgba(16,185,129,0.10)", border:"1px solid rgba(16,185,129,0.2)" }}>
          <div className="label-xs" style={{ color:t.green, fontSize:9 }}>AQI · GOOD</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
            <div style={{ flex:1, height:4, background:"rgba(255,255,255,0.1)", borderRadius:2, overflow:"hidden" }}>
              <div style={{ width:"28%", height:"100%", background:t.green, borderRadius:2 }} />
            </div>
            <span className="num-lg" style={{ color:t.green, fontSize:12 }}>42</span>
          </div>
        </div>
        <div style={{ flex:1, borderRadius:10, padding:"8px 10px", background:"rgba(245,158,11,0.10)", border:"1px solid rgba(245,158,11,0.2)" }}>
          <div className="label-xs" style={{ color:t.amber, fontSize:9 }}>UV INDEX</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
            <div style={{ flex:1, height:4, background:"rgba(255,255,255,0.1)", borderRadius:2, overflow:"hidden" }}>
              <div style={{ width:"60%", height:"100%", background:t.amber, borderRadius:2 }} />
            </div>
            <span className="num-lg" style={{ color:t.amber, fontSize:12 }}>6</span>
          </div>
        </div>
      </div>

      {/* Hourly strip */}
      <div style={{ display:"flex", gap:6, overflowX:"auto" }}>
        {HOURS.map((h,i) => (
          <div key={i} style={{
            flex:"0 0 auto", display:"flex", flexDirection:"column", alignItems:"center", gap:3,
            padding:"8px 8px", borderRadius:10,
            background: i===0?(t.mode==="dark"?"rgba(220,38,38,0.12)":"rgba(220,38,38,0.08)"):"transparent",
            border: i===0?`1px solid ${t.a1}3a`:`1px solid transparent`,
            minWidth:44,
          }}>
            <span style={{ color:i===0?t.ta:t.t3, fontSize:10, fontWeight:600 }}>{h.time}</span>
            <span style={{ fontSize:16 }}>{h.icon}</span>
            <span className="num-lg" style={{ color:i===0?t.t1:t.t2, fontSize:12 }}>{h.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}