"use client"
// components/bento/bento-trip.tsx
// Trip & vehicle stats — business driver metrics

import { useTheme } from "@/app/theme/theme-context"

export default function BentoTrip() {
  const t = useTheme()

  const stats = [
    { label:"SPEED", value:"0", unit:"km/h", color:t.blue,   bar:0 },
    { label:"FUEL",  value:"68", unit:"%",   color:t.green,  bar:68 },
    { label:"RANGE", value:"312",unit:"km",  color:t.amber,  bar:82 },
    { label:"TEMP",  value:"82", unit:"°C",  color:t.purple, bar:55 },
  ]

  return (
    <div className={t.cardClass} style={{ padding:"16px 18px", height:"100%", display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span className="label-xs" style={{ color:t.t3 }}>VEHICLE STATUS</span>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:t.green, animation:"pulse 2s infinite" }} />
          <span style={{ color:t.green, fontSize:10, fontWeight:600 }}>ENGINE ON</span>
        </div>
      </div>

      {/* Stats */}
      {stats.map(s => (
        <div key={s.label}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <span className="label-xs" style={{ color:t.t3, fontSize:9 }}>{s.label}</span>
            <span className="num-lg" style={{ color:t.t1, fontSize:13 }}>{s.value}<span style={{ color:t.t3, fontSize:10, marginLeft:2 }}>{s.unit}</span></span>
          </div>
          <div style={{ height:3, background:t.mode==="dark"?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${s.bar}%`, background:s.color, borderRadius:2, transition:"width .5s ease" }} />
          </div>
        </div>
      ))}

      {/* Today trip */}
      <div style={{ borderTop:`1px solid ${t.cardBorder}`, paddingTop:8, display:"flex", gap:0 }}>
        {[
          { label:"TODAY",    value:"0 km" },
          { label:"TRIPS",    value:"0" },
          { label:"IDLE",     value:"0 min" },
        ].map((s,i) => (
          <div key={s.label} style={{ flex:1, textAlign:"center", borderRight: i<2?`1px solid ${t.cardBorder}`:"none" }}>
            <div className="label-xs" style={{ color:t.t3, fontSize:9 }}>{s.label}</div>
            <div className="num-lg" style={{ color:t.t1, fontSize:14, marginTop:3 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}