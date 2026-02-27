"use client"
// components/bento/bento-calls.tsx
// Recent calls + quick dial

import { useState } from "react"
import { useTheme } from "@/app/theme/theme-context"

const CONTACTS = [
  { name:"Rahul Mehta",   role:"CEO", avatar:"RM", call:"incoming", time:"10:32 AM", color:"#3b82f6" },
  { name:"Priya Sharma",  role:"CFO", avatar:"PS", call:"outgoing", time:"9:14 AM",  color:"#10b981" },
  { name:"Sales Team",    role:"Group", avatar:"ST", call:"missed",  time:"8:45 AM",  color:"#dc2626" },
]

const QUICK = [
  { name:"Office",  avatar:"🏢", color:"#3b82f6" },
  { name:"Rahul",   avatar:"👤", color:"#10b981" },
  { name:"Driver",  avatar:"🚗", color:"#f59e0b" },
  { name:"Support", avatar:"🛟", color:"#8b5cf6" },
]

export default function BentoCalls() {
  const t = useTheme()
  const [calling, setCalling] = useState<string|null>(null)

  return (
    <div className={t.cardClass} style={{ padding:"16px 18px", height:"100%", display:"flex", flexDirection:"column", gap:10 }}>
      <span className="label-xs" style={{ color:t.t3 }}>PHONE</span>

      {/* Quick dial */}
      <div style={{ display:"flex", gap:8 }}>
        {QUICK.map(q => (
          <button key={q.name} onClick={() => setCalling(q.name)} style={{
            flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
            padding:"8px 4px", borderRadius:10,
            background: calling===q.name ? `${q.color}18` : (t.mode==="dark"?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"),
            border:`1px solid ${calling===q.name ? q.color+"55" : t.cardBorder}`,
            cursor:"pointer", transition:"all .15s",
          }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:`${q.color}20`, border:`1.5px solid ${q.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{q.avatar}</div>
            <span style={{ color:t.t3, fontSize:9, fontWeight:600 }}>{q.name}</span>
          </button>
        ))}
      </div>

      {/* Recent calls */}
      <div style={{ display:"flex", flexDirection:"column", gap:6, flex:1 }}>
        <div className="label-xs" style={{ color:t.t3, fontSize:9 }}>RECENT</div>
        {CONTACTS.map((c,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:10, background:t.mode==="dark"?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)", border:`1px solid ${t.cardBorder}` }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:`${c.color}20`, border:`1.5px solid ${c.color}44`, display:"flex", alignItems:"center", justifyContent:"center", color:c.color, fontSize:11, fontWeight:700, flexShrink:0 }}>{c.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ color:t.t1, fontSize:12, fontWeight:600 }}>{c.name}</div>
              <div style={{ color:t.t3, fontSize:10 }}>{c.role}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ color:c.call==="missed"?t.a1:t.t3, fontSize:10, fontWeight:600 }}>{c.call==="missed"?"MISSED":c.call==="incoming"?"↙":"↗"}</div>
              <div style={{ color:t.t3, fontSize:9, marginTop:1 }}>{c.time}</div>
            </div>
            <button onClick={() => setCalling(c.name)} style={{ width:28, height:28, borderRadius:"50%", background:`${t.green}18`, border:`1px solid ${t.green}44`, color:t.green, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>📞</button>
          </div>
        ))}
      </div>
    </div>
  )
}