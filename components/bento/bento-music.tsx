"use client"
// components/bento/bento-music.tsx

import { useState, useEffect, useRef } from "react"
import { useTheme } from "@/app/theme/theme-context"

const TRACKS = [
  { title:"Blinding Lights", artist:"The Weeknd", progress:42, color:"#a855f7" },
  { title:"Starboy", artist:"The Weeknd ft. Daft Punk", progress:18, color:"#ec4899" },
  { title:"Save Your Tears", artist:"The Weeknd", progress:71, color:"#06b6d4" },
]

export default function BentoMusic() {
  const t = useTheme()
  const [playing, setPlaying] = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [angle, setAngle] = useState(0)
  const rafRef = useRef<number>()
  const track = TRACKS[trackIdx]

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current!); return }
    const tick = () => { setAngle(a => a + 0.3); rafRef.current = requestAnimationFrame(tick) }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current!)
  }, [playing])

  const prev = () => setTrackIdx(i => (i - 1 + TRACKS.length) % TRACKS.length)
  const next = () => setTrackIdx(i => (i + 1) % TRACKS.length)

  return (
    <div className={t.cardClass} style={{ padding:"18px 20px", height:"100%", display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ position:"absolute", top:-20, left:-20, width:100, height:100, borderRadius:"50%", background:`${track.color}20`, filter:"blur(36px)", pointerEvents:"none", transition:"background .5s" }} />

      <span className="label-xs" style={{ color:t.t3 }}>NOW PLAYING</span>

      {/* Album disc + info */}
      <div style={{ display:"flex", gap:14, alignItems:"center" }}>
        {/* Spinning disc */}
        <div style={{ position:"relative", width:52, height:52, flexShrink:0 }}>
          <div style={{
            width:52, height:52, borderRadius:"50%",
            background:`conic-gradient(${track.color}, ${track.color}88, ${track.color}44, ${track.color})`,
            transform:`rotate(${angle}deg)`,
            boxShadow: playing ? `0 0 18px ${track.color}66` : "none",
            transition:"box-shadow .4s",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{ width:16, height:16, borderRadius:"50%", background:t.card, border:`2px solid ${t.cardBorder}` }} />
          </div>
        </div>

        {/* Track info */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ color:t.t1, fontSize:14, fontWeight:700, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{track.title}</div>
          <div style={{ color:t.t2, fontSize:11, marginTop:2 }}>{track.artist}</div>
          {/* Track dots */}
          <div style={{ display:"flex", gap:4, marginTop:8 }}>
            {TRACKS.map((_,i) => (
              <div key={i} onClick={() => setTrackIdx(i)} style={{ width:i===trackIdx?16:5, height:5, borderRadius:3, background:i===trackIdx?track.color:t.t3, cursor:"pointer", transition:"all .25s" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div style={{ height:3, background:t.mode==="dark"?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)", borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${track.progress}%`, background:`linear-gradient(90deg, ${track.color}, ${track.color}aa)`, borderRadius:2, animation:"progressFill .6s ease", transition:"width .3s" }} />
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
          <span className="num-lg" style={{ color:t.t3, fontSize:10 }}>1:{track.progress < 50 ? "2" : "4"}{Math.floor(track.progress/10)}</span>
          <span className="num-lg" style={{ color:t.t3, fontSize:10 }}>3:22</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20 }}>
        {[
          { icon:"⏮", action:prev, size:16 },
          { icon: playing ? "⏸" : "▶", action:()=>setPlaying(p=>!p), size:22, primary:true },
          { icon:"⏭", action:next, size:16 },
        ].map((btn,i) => (
          <button key={i} onClick={btn.action} style={{
            width: btn.primary?44:32, height:btn.primary?44:32, borderRadius:"50%",
            background: btn.primary?track.color:"transparent",
            border: btn.primary?"none":`1px solid ${t.cardBorder}`,
            color: btn.primary?"white":t.t2,
            fontSize:btn.size, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow: btn.primary?`0 0 16px ${track.color}55`:"none",
            transition:"all .2s",
          }}>
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  )
}