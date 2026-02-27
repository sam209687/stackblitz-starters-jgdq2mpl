"use client"
// components/dock/smart-dock.tsx — v4
// Premium bottom navigation dock

import { useState } from "react"
import { useTheme } from "@/app/theme/theme-context"
import { useLaunchAnimation } from "@/app/hooks/useLaunchAnimation"
import { DOCK_HEIGHT } from "@/app/engine/constants"
import LaunchOverlay from "@/components/apps/launch-overlay"

const NAV_ITEMS = [
  { id:"home",   icon:"⊞",  label:"Dashboard" },
  { id:"nav",    icon:"🧭",  label:"Navigate"  },
  { id:"apps",   icon:"⊟",  label:"All Apps"  },
  { id:"phone",  icon:"📞",  label:"Phone"     },
  { id:"media",  icon:"🎵",  label:"Media"     },
  { id:"settings",icon:"⚙️",label:"Settings"  },
]

export default function SmartDock() {
  const t = useTheme()
  const { launch } = useLaunchAnimation()
  const [active, setActive] = useState("home")

  return (
    <>
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        height:DOCK_HEIGHT,
        background:t.dock,
        backdropFilter:"blur(32px) saturate(180%)",
        borderTop:`1px solid ${t.dockBorder}`,
        display:"flex", alignItems:"center",
        paddingInline:24, gap:4,
        zIndex:1000,
        boxShadow: t.mode==="dark"
          ? "0 -1px 0 rgba(255,255,255,0.04), 0 -8px 40px rgba(0,0,0,0.6)"
          : "0 -1px 0 rgba(255,255,255,0.8), 0 -4px 20px rgba(0,0,0,0.07)",
      }}>

        {/* Left: BizDrive indicator */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginRight:16, paddingRight:16, borderRight:`1px solid ${t.dockBorder}` }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:t.green, boxShadow:`0 0 8px ${t.green}` }} />
          <span style={{ color:t.t3, fontSize:10, fontWeight:700, letterSpacing:1, fontFamily:"JetBrains Mono, monospace" }}>ONLINE</span>
        </div>

        {/* Nav items */}
        <div style={{ display:"flex", flex:1, justifyContent:"center", gap:4 }}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  setActive(item.id)
                  launch({ id:item.id, icon:item.icon, label:item.label }, e)
                }}
                style={{
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  gap:3, padding:"6px 18px", borderRadius:12,
                  border:`1px solid ${isActive ? t.a1+"44" : "transparent"}`,
                  background: isActive ? t.a3 : "transparent",
                  cursor:"pointer", transition:"all .2s ease",
                  boxShadow: isActive ? `0 0 16px ${t.a2}` : "none",
                  transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  position:"relative",
                }}
              >
                <span style={{ fontSize:18, lineHeight:1, filter:isActive?"none":"grayscale(0.3)" }}>{item.icon}</span>
                <span style={{
                  fontSize:9, fontWeight:600, letterSpacing:.5,
                  color: isActive ? t.a1 : t.t3,
                  fontFamily:"Outfit, sans-serif",
                  transition:"color .2s",
                }}>{item.label}</span>

                {/* Active underline dot */}
                {isActive && (
                  <div style={{ position:"absolute", bottom:-1, left:"50%", transform:"translateX(-50%)", width:16, height:2, borderRadius:1, background:t.a1, boxShadow:`0 0 6px ${t.a1}` }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Right: quick info */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2, marginLeft:16, paddingLeft:16, borderLeft:`1px solid ${t.dockBorder}` }}>
          <span style={{ color:t.t3, fontSize:9, fontFamily:"JetBrains Mono, monospace", fontWeight:500 }}>0 km/h</span>
          <span style={{ color:t.green, fontSize:9, fontFamily:"JetBrains Mono, monospace", fontWeight:600 }}>PARKED</span>
        </div>
      </div>

      <LaunchOverlay />
    </>
  )
}