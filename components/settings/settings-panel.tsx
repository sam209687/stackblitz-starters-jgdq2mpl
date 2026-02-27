"use client"
// ─────────────────────────────────────────────
// components/settings/settings-panel.tsx — v6
// ─────────────────────────────────────────────
// 4-tab settings panel:
//   Layout      — grid config, card visibility, enter/exit customize
//   Connectivity— BT, WiFi, hotspot, DND + device list
//   Display     — theme, accent, radius, blur
//   General     — long press safety toggle, system info

import { useTheme }         from "@/app/theme/theme-context"
// import { useSettingsStore } from "@/app/store/settings-store"
import { useLauncherStore } from "@/app/store/launcher-store"
import { CardId, useSettingsStore } from "@/app/store/settings-store"
// import type { CardId }      from "@/app/store/settings-store"

const LABELS: Record<CardId, string> = {
  clock:"Clock", nav:"Navigation", music:"Music", weather:"Weather",
  apps:"Quick Apps", trip:"Vehicle", schedule:"Schedule", calls:"Phone",
}
const ICONS: Record<CardId, string> = {
  clock:"🕐", nav:"🧭", music:"🎵", weather:"⛅",
  apps:"⊞", trip:"🚗", schedule:"📅", calls:"📞",
}
const ACCENT_PRESETS = [
  "#dc2626","#ea580c","#d97706","#16a34a",
  "#0891b2","#2563eb","#7c3aed","#db2777",
]

// ── Shared primitives ─────────────────────────────────────────────────────────

function Toggle({ on, onChange, accent }: { on:boolean; onChange:(v:boolean)=>void; accent?:string }) {
  const t = useTheme()
  const c = accent ?? t.a1
  return (
    <button
      onClick={e => { e.stopPropagation(); onChange(!on) }}
      style={{
        width:44, height:24, borderRadius:12, border:"none",
        background: on ? c : (t.mode==="dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"),
        cursor:"pointer", position:"relative", transition:"background .25s", flexShrink:0,
      }}
    >
      <div style={{
        position:"absolute", top:3, left: on ? 23 : 3,
        width:18, height:18, borderRadius:"50%", background:"white",
        transition:"left .25s", boxShadow:"0 1px 6px rgba(0,0,0,.4)",
      }} />
    </button>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const t = useTheme()
  return (
    <div style={{
      color:t.t3, fontSize:9, fontWeight:800, letterSpacing:2,
      textTransform:"uppercase", fontFamily:"JetBrains Mono,monospace",
      paddingTop:16, paddingBottom:8,
    }}>
      {children}
    </div>
  )
}

function SettingRow({ icon, label, sub, right }: { icon?:string; label:React.ReactNode; sub?:string; right?:React.ReactNode }) {
  const t = useTheme()
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:12,
      paddingBlock:12, borderBottom:`1px solid ${t.cardBorder}`,
    }}>
      {icon && (
        <div style={{ width:36, height:36, borderRadius:10, background: t.mode==="dark"?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
          {icon}
        </div>
      )}
      <div style={{ flex:1 }}>
        <div style={{ color:t.t1, fontSize:13, fontWeight:500 }}>{label}</div>
        {sub && <div style={{ color:t.t3, fontSize:10, marginTop:2, lineHeight:1.4 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

function SliderRow({ label, sub, value, min, max, step, unit, onChange }: {
  label:string; sub?:string; value:number; min:number; max:number; step:number; unit?:string; onChange:(v:number)=>void
}) {
  const t = useTheme()
  return (
    <div style={{ paddingBlock:12, borderBottom:`1px solid ${t.cardBorder}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
        <div>
          <div style={{ color:t.t1, fontSize:13, fontWeight:500 }}>{label}</div>
          {sub && <div style={{ color:t.t3, fontSize:10, marginTop:1 }}>{sub}</div>}
        </div>
        <span style={{ color:t.ta, fontSize:12, fontFamily:"JetBrains Mono,monospace", fontWeight:600, alignSelf:"center" }}>
          {value}{unit ?? ""}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width:"100%", accentColor:t.a1, cursor:"pointer" }}
      />
    </div>
  )
}

// ── Tab: Layout ───────────────────────────────────────────────────────────────
function TabLayout() {
  const t              = useTheme()
  const st             = useSettingsStore()
  const isEditMode     = useLauncherStore(s => s.isEditMode)
  const toggleEditMode = useLauncherStore(s => s.toggleEditMode)
  const setEditMode    = useLauncherStore(s => s.setEditMode)

  return (
    <>
      <SectionLabel>Customize Layout</SectionLabel>
      {/* Enter/Exit customize */}
      <div style={{
        padding:"14px 16px", borderRadius:14, marginBottom:4,
        background: isEditMode ? `${t.a1}18` : (t.mode==="dark"?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"),
        border:`1px solid ${isEditMode ? t.a1+"55" : t.cardBorder}`,
      }}>
        <div style={{ color:t.t1, fontSize:13, fontWeight:600, marginBottom:4 }}>
          {isEditMode ? "✅ Customize Mode Active" : "✏️ Customize Dashboard Layout"}
        </div>
        <div style={{ color:t.t3, fontSize:11, lineHeight:1.5, marginBottom:12 }}>
          {isEditMode
            ? "Drag cards to swap · Resize from corner · Tap ✏️ for card options"
            : "Drag & drop cards, resize them, and change colors from the dashboard"
          }
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button
            onClick={() => { toggleEditMode(); st.setSettingsOpen(false) }}
            style={{
              flex:1, padding:"10px 0", borderRadius:10,
              background: isEditMode ? t.a1 : `${t.a1}18`,
              border:`1px solid ${t.a1}66`,
              color: isEditMode ? "white" : t.ta,
              fontSize:12, fontWeight:700, cursor:"pointer",
              fontFamily:"JetBrains Mono,monospace",
            }}
          >
            {isEditMode ? "EXIT CUSTOMIZE" : "ENTER CUSTOMIZE"}
          </button>
          <button
            onClick={() => st.resetLayout()}
            style={{
              padding:"10px 16px", borderRadius:10, border:`1px solid ${t.cardBorder}`,
              background:"transparent", color:t.t2,
              fontSize:12, fontWeight:700, cursor:"pointer",
            }}
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <SectionLabel>Grid Configuration</SectionLabel>
      <SliderRow label="Columns" sub="Cards per row" value={st.gridCols} min={2} max={5} step={1} onChange={v => st.setGridConfig({ gridCols:v })} />
      <SliderRow label="Rows" value={st.gridRows} min={1} max={4} step={1} onChange={v => st.setGridConfig({ gridRows:v })} />
      <SliderRow label="Card Gap" sub="Space between cards" value={st.gridGap} unit="px" min={4} max={20} step={2} onChange={v => st.setGridConfig({ gridGap:v })} />
      <SliderRow label="Padding" sub="Outer margin" value={st.gridPad} unit="px" min={6} max={28} step={2} onChange={v => st.setGridConfig({ gridPad:v })} />

      <SectionLabel>Card Visibility</SectionLabel>
      {st.cards.map(card => (
        <div key={card.id} style={{ display:"flex", alignItems:"center", gap:12, paddingBlock:11, borderBottom:`1px solid ${t.cardBorder}` }}>
          <div style={{ width:38, height:38, borderRadius:10, background:`${card.accentColor}18`, border:`1px solid ${card.accentColor}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
            {ICONS[card.id]}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ color:t.t1, fontSize:13, fontWeight:500 }}>{LABELS[card.id]}</div>
            <div style={{ color:t.t3, fontSize:10, marginTop:1 }}>
              {card.colSpan}×{card.rowSpan} · {card.visible ? "Visible" : "Hidden"}
            </div>
          </div>
          <Toggle on={card.visible} onChange={v => st.updateCard(card.id, { visible:v })} accent={card.accentColor} />
        </div>
      ))}
    </>
  )
}

// ── Tab: Connectivity ─────────────────────────────────────────────────────────
function TabConnectivity() {
  const t  = useTheme()
  const st = useSettingsStore()
  const c  = st.connectivity

  type ConnKey = keyof typeof c

  const ConnItem = ({ icon, label, sub, k, activeColor }: { icon:string; label:string; sub:string; k:ConnKey; activeColor?:string }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, paddingBlock:12, borderBottom:`1px solid ${t.cardBorder}` }}>
      <div style={{
        width:42, height:42, borderRadius:12, flexShrink:0,
        background: c[k] ? `${activeColor ?? t.a1}18` : (t.mode==="dark"?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"),
        border:`1px solid ${c[k] ? (activeColor ?? t.a1)+"44" : t.cardBorder}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:20, transition:"all .25s",
      }}>
        {icon}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ color:t.t1, fontSize:13, fontWeight:500 }}>{label}</div>
        <div style={{ color: c[k] ? (activeColor ?? t.green) : t.t3, fontSize:10, marginTop:2, fontWeight: c[k] ? 600 : 400 }}>
          {c[k] ? "Enabled" : sub}
        </div>
      </div>
      <Toggle on={c[k]} onChange={v => st.setConnectivity({ [k]:v })} accent={activeColor ?? t.a1} />
    </div>
  )

  return (
    <>
      <SectionLabel>Wireless</SectionLabel>
      <ConnItem icon="🔵" label="Bluetooth"     sub="Tap to enable"   k="bluetooth"    activeColor="#3b82f6" />
      <ConnItem icon="📶" label="Wi-Fi"          sub="Not connected"   k="wifi"         activeColor="#10b981" />
      <ConnItem icon="📡" label="Mobile Hotspot" sub="Hotspot is off"  k="hotspot"      activeColor="#f59e0b" />

      <SectionLabel>Focus</SectionLabel>
      <ConnItem icon="🔕" label="Do Not Disturb" sub="All alerts active" k="doNotDisturb" activeColor="#8b5cf6" />

      {/* Bluetooth devices when on */}
      {c.bluetooth && (
        <>
          <SectionLabel>Paired Bluetooth Devices</SectionLabel>
          {[
            { name:"iPhone 15 Pro", type:"Phone",     status:"Connected", icon:"📱", color:"#3b82f6" },
            { name:"AirPods Pro 2", type:"Audio",     status:"Paired",    icon:"🎧", color:"#8b5cf6" },
            { name:"CarPlay System",type:"Integrated",status:"Active",    icon:"🚗", color:"#10b981" },
          ].map((d,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, paddingBlock:11, borderBottom:`1px solid ${t.cardBorder}` }}>
              <div style={{ width:36, height:36, borderRadius:9, background:`${d.color}18`, border:`1px solid ${d.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>{d.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ color:t.t1, fontSize:12, fontWeight:600 }}>{d.name}</div>
                <div style={{ color:t.t3, fontSize:10 }}>{d.type}</div>
              </div>
              <span style={{ color: d.status==="Connected"||d.status==="Active" ? t.green : t.t3, fontSize:10, fontWeight:700 }}>{d.status}</span>
            </div>
          ))}
        </>
      )}
    </>
  )
}

// ── Tab: Display ──────────────────────────────────────────────────────────────
function TabDisplay() {
  const t  = useTheme()
  const st = useSettingsStore()

  return (
    <>
      <SectionLabel>Theme</SectionLabel>
      <SettingRow
        icon={t.mode==="dark"?"🌙":"☀️"}
        label="Dark Mode"
        sub={`Currently ${t.mode === "dark" ? "Dark" : "Light"} — tap to switch`}
        right={<Toggle on={t.mode==="dark"} onChange={() => t.toggle()} />}
      />

      <SectionLabel>Global Accent Color</SectionLabel>
      <div style={{ paddingBottom:16, borderBottom:`1px solid ${t.cardBorder}` }}>
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:10 }}>
          {ACCENT_PRESETS.map(c => (
            <button key={c} onClick={() => st.setGlobalAccent(c)} style={{
              width:32, height:32, borderRadius:"50%", background:c,
              border:`3px solid ${st.globalAccent===c?"white":"transparent"}`,
              cursor:"pointer",
              boxShadow: st.globalAccent===c ? `0 0 12px ${c}` : "none",
              transition:"all .15s",
            }}/>
          ))}
          <label style={{ width:32, height:32, borderRadius:"50%", overflow:"hidden", cursor:"pointer", border:"2px dashed rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.05)" }}>
            <span style={{ fontSize:16 }}>🎨</span>
            <input type="color" value={st.globalAccent} onChange={e => st.setGlobalAccent(e.target.value)} style={{ opacity:0, position:"absolute", pointerEvents:"none" }} />
          </label>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, color:t.t3, fontSize:11 }}>
          <div style={{ width:20, height:20, borderRadius:5, background:st.globalAccent }} />
          <span style={{ fontFamily:"JetBrains Mono,monospace" }}>{st.globalAccent}</span>
        </div>
      </div>

      <SectionLabel>Card Style</SectionLabel>
      <SliderRow label="Corner Radius" value={st.cardRadius} unit="px" min={4} max={32} step={2} onChange={st.setCardRadius} />
      <SliderRow label="Glass Blur"    value={st.cardBlur}   unit="px" min={4} max={52} step={4} onChange={st.setCardBlur} sub="Backdrop blur intensity" />
    </>
  )
}

// ── Tab: General ──────────────────────────────────────────────────────────────
function TabGeneral() {
  const t  = useTheme()
  const st = useSettingsStore()

  return (
    <>
      <SectionLabel>Safety</SectionLabel>

      {/* Long press warning card */}
      <div style={{
        padding:"14px 16px", borderRadius:14, marginBottom:4,
        background: st.longPressToEdit
          ? "rgba(245,158,11,0.10)"
          : "rgba(16,185,129,0.08)",
        border:`1px solid ${st.longPressToEdit ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.25)"}`,
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <div style={{ fontSize:22 }}>{st.longPressToEdit ? "⚠️" : "🛡️"}</div>
          <Toggle on={st.longPressToEdit} onChange={st.setLongPressToEdit} />
        </div>
        <div style={{ color:t.t1, fontSize:13, fontWeight:600, marginBottom:5 }}>
          Long Press to Customize
        </div>
        <div style={{ color:t.t2, fontSize:11, lineHeight:1.6 }}>
          {st.longPressToEdit
            ? "⚠️ ENABLED — Holding the screen for 0.6s enters customize mode. This can trigger accidentally while driving on bumpy roads."
            : "✅ DISABLED (Recommended) — Customize mode is only accessible through Settings → Layout. This prevents accidental layout changes while driving."
          }
        </div>
      </div>

      <SectionLabel>System</SectionLabel>
      <SettingRow icon="💡" label="Display Brightness" sub="Auto-adjust based on ambient light" right={<span style={{ color:t.ta, fontSize:11, fontFamily:"JetBrains Mono,monospace" }}>Auto</span>} />
      <SettingRow icon="⏱️" label="Screen Timeout" sub="Turn off display when parked" right={<span style={{ color:t.ta, fontSize:11, fontFamily:"JetBrains Mono,monospace" }}>30 min</span>} />
      <SettingRow icon="🖐️" label="Touch Sensitivity" sub="Enhanced for driving gloves" right={<span style={{ color:t.ta, fontSize:11, fontFamily:"JetBrains Mono,monospace" }}>High</span>} />
      <SettingRow icon="🔊" label="Alert Volume" sub="Navigation and call alerts" right={<span style={{ color:t.ta, fontSize:11, fontFamily:"JetBrains Mono,monospace" }}>80%</span>} />

      <SectionLabel>About</SectionLabel>
      {[
        ["Application",  "BizDrive Launcher"],
        ["Version",      "v6.0.0"],
        ["Build",        "2026.02.27"],
        ["Platform",     "Android Auto Head Unit"],
      ].map(([k,v]) => (
        <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBlock:11, borderBottom:`1px solid ${t.cardBorder}` }}>
          <span style={{ color:t.t2, fontSize:12 }}>{k}</span>
          <span style={{ color:t.t3, fontSize:11, fontFamily:"JetBrains Mono,monospace" }}>{v}</span>
        </div>
      ))}
    </>
  )
}

// ── Main panel ────────────────────────────────────────────────────────────────
const TABS = [
  { id:"layout"       as const, label:"Layout",     icon:"⊞"  },
  { id:"connectivity" as const, label:"Connection",  icon:"📶" },
  { id:"display"      as const, label:"Display",     icon:"🎨" },
  { id:"general"      as const, label:"General",     icon:"⚙️" },
]

export default function SettingsPanel() {
  const t  = useTheme()
  const st = useSettingsStore()
  if (!st.settingsOpen) return null

  const content = {
    layout:       <TabLayout />,
    connectivity: <TabConnectivity />,
    display:      <TabDisplay />,
    general:      <TabGeneral />,
  }[st.settingsTab]

  return (
    <>
      {/* Scrim */}
      <div
        onClick={() => st.setSettingsOpen(false)}
        style={{
          position:"fixed", inset:0, zIndex:4000,
          background: t.mode==="dark" ? "rgba(0,0,0,.72)" : "rgba(20,30,60,.35)",
          backdropFilter:"blur(5px)",
        }}
      />

      {/* Drawer */}
      <div style={{
        position:"fixed", top:0, right:0, bottom:0,
        width:"min(440px, 92vw)",
        zIndex:4001,
        display:"flex", flexDirection:"column",
        background: t.mode==="dark" ? "rgba(5,8,18,0.98)" : "rgba(244,246,255,0.98)",
        backdropFilter:"blur(36px) saturate(200%)",
        borderLeft:`1px solid ${t.cardBorder}`,
        boxShadow:"-12px 0 60px rgba(0,0,0,.55)",
        animation:"slideIn .28s cubic-bezier(.32,.72,0,1)",
      }}>
        {/* Header */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"18px 20px",
          borderBottom:`1px solid ${t.cardBorder}`,
          flexShrink:0,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:30, height:30, borderRadius:9, background:t.a1, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>⚙️</div>
            <div>
              <div style={{ color:t.t1, fontSize:15, fontWeight:700, lineHeight:1 }}>Settings</div>
              <div style={{ color:t.t3, fontSize:10, marginTop:2 }}>BizDrive Launcher</div>
            </div>
          </div>
          <button onClick={() => st.setSettingsOpen(false)} style={{ background:"none", border:"none", color:t.t3, cursor:"pointer", fontSize:24, lineHeight:1, padding:"0 4px", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, padding:"10px 12px", borderBottom:`1px solid ${t.cardBorder}`, flexShrink:0 }}>
          {TABS.map(tab => {
            const active = st.settingsTab === tab.id
            return (
              <button key={tab.id} onClick={() => st.setSettingsTab(tab.id)} style={{
                flex:1, display:"flex", flexDirection:"column",
                alignItems:"center", gap:4,
                padding:"8px 4px", borderRadius:11, border:"none",
                background: active ? t.a3 : "transparent",
                cursor:"pointer", transition:"background .2s",
              }}>
                <span style={{ fontSize:17 }}>{tab.icon}</span>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:.4, color: active ? t.ta : t.t3, transition:"color .2s" }}>
                  {tab.label.toUpperCase()}
                </span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:"4px 20px 24px" }}>
          {content}
        </div>
      </div>
    </>
  )
}