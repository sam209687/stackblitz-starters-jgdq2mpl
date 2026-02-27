"use client"
// components/bento/bento-clock.tsx
// Large clock card — top left hero

import { useState, useEffect } from "react"
import { useTheme } from "@/app/theme/theme-context"

const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export default function BentoClock() {
  const t = useTheme()
  const [now, setNow] = useState<Date|null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const h  = now ? now.getHours().toString().padStart(2,"0") : "--"
  const m  = now ? now.getMinutes().toString().padStart(2,"0") : "--"
  const s  = now ? now.getSeconds().toString().padStart(2,"0") : "--"
  const ampm = now ? (now.getHours() >= 12 ? "PM" : "AM") : ""
  const day  = now ? DAYS[now.getDay()] : ""
  const date = now ? `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}` : ""

  return (
    <div className={t.cardClass} style={{ padding: "20px 22px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {/* Accent glow */}
      <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:t.a2, filter:"blur(40px)", pointerEvents:"none" }} />

      {/* Top label */}
      <div className="label-xs" style={{ color: t.t3 }}>LOCAL TIME</div>

      {/* Big clock */}
      <div suppressHydrationWarning style={{ display:"flex", alignItems:"flex-end", gap:6 }}>
        <div className="num-lg" style={{ fontSize:"clamp(42px,5.5vw,72px)", color:t.t1, letterSpacing:-1 }} suppressHydrationWarning>
          {h}
          <span style={{ color:t.a1, animation:"blink 1s step-end infinite", margin:"0 2px" }}>:</span>
          {m}
        </div>
        <div style={{ marginBottom:8, display:"flex", flexDirection:"column", gap:2 }}>
          <span style={{ color:t.a1, fontSize:13, fontWeight:700, lineHeight:1 }} suppressHydrationWarning>{ampm}</span>
          <span className="num-lg" style={{ color:t.t3, fontSize:16 }} suppressHydrationWarning>:{s}</span>
        </div>
      </div>

      {/* Bottom: day + date */}
      <div>
        <div style={{ color:t.t1, fontSize:15, fontWeight:600 }} suppressHydrationWarning>{day}</div>
        <div style={{ color:t.t3, fontSize:12, marginTop:2 }} suppressHydrationWarning>{date}</div>
      </div>

      {/* Thin accent bar */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${t.a1}, transparent 70%)` }} />
    </div>
  )
}