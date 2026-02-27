"use client"
// components/settings/connectivity-bar.tsx — v6
// Quick-access connectivity pill row — shown at
// top-right of the dashboard. One tap toggles,
// long tap opens full settings for that item.

import { useTheme }         from "@/app/theme/theme-context"
import { useSettingsStore } from "@/app/store/settings-store"
import { STATUS_BAR_HEIGHT } from "@/app/engine/constants"

type Pill = { icon:string; label:string; key:"bluetooth"|"wifi"|"hotspot"|"doNotDisturb"; color:string }

const PILLS: Pill[] = [
  { icon:"🔵", label:"BT",    key:"bluetooth",    color:"#3b82f6" },
  { icon:"📶", label:"WiFi",  key:"wifi",         color:"#10b981" },
  { icon:"📡", label:"Spot",  key:"hotspot",      color:"#f59e0b" },
  { icon:"🔕", label:"DND",   key:"doNotDisturb", color:"#8b5cf6" },
]

export default function ConnectivityBar() {
  const t  = useTheme()
  const st = useSettingsStore()
  const c  = st.connectivity

  return (
    <div style={{
      position:"absolute",
      top: STATUS_BAR_HEIGHT + 8,
      right: st.gridPad,
      display:"flex", alignItems:"center", gap:5,
      zIndex:600,
      // Semi-glass pill container
      background: t.mode==="dark" ? "rgba(5,8,20,0.7)" : "rgba(255,255,255,0.7)",
      backdropFilter:"blur(16px)",
      borderRadius:30,
      padding:"5px 10px 5px 8px",
      border:`1px solid ${t.cardBorder}`,
      boxShadow: t.mode==="dark" ? "0 2px 12px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.08)",
    }}>
      {PILLS.map(pill => {
        const on = c[pill.key]
        return (
          <button
            key={pill.key}
            onClick={e => { e.stopPropagation(); st.setConnectivity({ [pill.key]: !on }) }}
            title={on ? `${pill.label}: On — tap to disable` : `${pill.label}: Off — tap to enable`}
            style={{
              display:"flex", alignItems:"center", gap:4,
              padding:"4px 8px", borderRadius:20,
              background: on ? `${pill.color}20` : "transparent",
              border:`1px solid ${on ? pill.color+"55" : "transparent"}`,
              cursor:"pointer", transition:"all .2s ease",
              boxShadow: on ? `0 0 8px ${pill.color}44` : "none",
            }}
          >
            <span style={{ fontSize:12, opacity: on ? 1 : 0.4 }}>{pill.icon}</span>
            <span style={{
              fontSize:9, fontWeight:700, letterSpacing:.4,
              color: on ? pill.color : t.t3,
              fontFamily:"JetBrains Mono,monospace",
              transition:"color .2s",
            }}>
              {pill.label}
            </span>
            {/* Active dot */}
            <div style={{
              width:4, height:4, borderRadius:"50%",
              background: on ? pill.color : "transparent",
              boxShadow: on ? `0 0 4px ${pill.color}` : "none",
              transition:"all .2s",
            }} />
          </button>
        )
      })}

      {/* Divider */}
      <div style={{ width:1, height:14, background:t.cardBorder, marginInline:2 }} />

      {/* Settings shortcut */}
      <button
        onClick={e => { e.stopPropagation(); st.setSettingsTab("connectivity"); st.setSettingsOpen(true) }}
        style={{
          width:22, height:22, borderRadius:"50%",
          background:"transparent", border:"none",
          cursor:"pointer", fontSize:13, opacity:.5,
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"opacity .2s",
        }}
        title="Open connectivity settings"
      >
        ⚙️
      </button>
    </div>
  )
}