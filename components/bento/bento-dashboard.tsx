"use client"
// ─────────────────────────────────────────────
// components/bento/bento-dashboard.tsx — v6
// ─────────────────────────────────────────────
// RESPONSIVE: auto-detects viewport and remaps
//   cards to fit without overflow in any
//   orientation or resolution.
//
// DRAG-TO-SWAP: native HTML5 drag, works on any
//   touch device via touch-action polyfill.
//
// RESIZE: mouse-drag from bottom-right handle,
//   snaps to grid cells, bounded by grid edges.
//
// PER-CARD EDITOR: accent color (presets +
//   custom picker), opacity, text scale, toggle
//   visibility — slides in over the card.

import { useState, useRef, useCallback, useEffect, createContext, useContext } from "react"
import { useTheme }          from "@/app/theme/theme-context"
import { useSettingsStore }  from "@/app/store/settings-store"
import { useLauncherStore }  from "@/app/store/launcher-store"
import { DOCK_HEIGHT, STATUS_BAR_HEIGHT } from "@/app/engine/constants"
import type { CardId, CardLayout } from "@/app/store/settings-store"

// Inline card context — avoids a separate import that StackBlitz may not resolve
type CardCtx = { id:CardId; accent:string; textScale:number; opacity:number; radius:number; blur:number }
const CardContext = createContext<CardCtx>({ id:"clock", accent:"#dc2626", textScale:1, opacity:0.78, radius:18, blur:28 })
const CardProvider = CardContext.Provider
export const useCard = () => useContext(CardContext)

import BentoClock     from "./bento-clock"
import BentoNav       from "./bento-nav"
import BentoMusic     from "./bento-music"
import BentoWeather   from "./bento-weather"
import BentoQuickApps from "./bento-quick-apps"
import BentoTrip      from "./bento-trip"
import BentoSchedule  from "./bento-schedule"
import BentoCalls     from "./bento-calls"

const COMPONENTS: Record<CardId, React.ComponentType> = {
  clock: BentoClock, nav: BentoNav, music: BentoMusic,
  weather: BentoWeather, apps: BentoQuickApps,
  trip: BentoTrip, schedule: BentoSchedule, calls: BentoCalls,
}
const LABELS: Record<CardId, string> = {
  clock:"Clock", nav:"Navigation", music:"Music", weather:"Weather",
  apps:"Quick Apps", trip:"Vehicle", schedule:"Schedule", calls:"Phone",
}
const ICON: Record<CardId, string> = {
  clock:"🕐", nav:"🧭", music:"🎵", weather:"⛅",
  apps:"⊞", trip:"🚗", schedule:"📅", calls:"📞",
}
const ACCENT_PRESETS = [
  "#dc2626","#ea580c","#d97706","#16a34a",
  "#0891b2","#2563eb","#7c3aed","#db2777",
  "#e2e8f0","#475569",
]

// ─── Responsive viewport hook ─────────────────────────────────────────────────
function useViewport() {
  const [vp, setVp] = useState({ w: 1280, h: 720 })
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("orientationchange", update)
    }
  }, [])
  return vp
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ on, onChange, accent }: { on:boolean; onChange:(v:boolean)=>void; accent:string }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); onChange(!on) }}
      style={{
        width:40, height:22, borderRadius:11, border:"none",
        background: on ? accent : "rgba(120,135,160,0.3)",
        cursor:"pointer", position:"relative",
        transition:"background .25s", flexShrink:0,
      }}
    >
      <div style={{
        position:"absolute", top:3, left: on ? 20 : 3,
        width:16, height:16, borderRadius:"50%", background:"#fff",
        transition:"left .25s", boxShadow:"0 1px 4px rgba(0,0,0,0.4)",
      }} />
    </button>
  )
}

// ─── Per-card editor overlay ──────────────────────────────────────────────────
function CardEditor({ card, onClose }: { card:CardLayout; onClose:()=>void }) {
  const t          = useTheme()
  const updateCard = useSettingsStore(s => s.updateCard)

  function SliderRow({ label, k, min, max, step }: {
    label: string; k: "cardOpacity"|"textScale"; min:number; max:number; step:number
  }) {
    return (
      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
          <span style={{ color:t.t2, fontSize:11, fontWeight:600 }}>{label}</span>
          <span style={{ color:t.ta, fontSize:11, fontFamily:"JetBrains Mono,monospace" }}>
            {(card[k] as number).toFixed(2)}
          </span>
        </div>
        <input type="range" min={min} max={max} step={step}
          value={card[k] as number}
          onChange={e => updateCard(card.id, { [k]: parseFloat(e.target.value) })}
          style={{ width:"100%", accentColor:card.accentColor, cursor:"pointer" }}
        />
      </div>
    )
  }

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position:"absolute", inset:0, zIndex:60, borderRadius:"inherit",
        background: t.mode==="dark" ? "rgba(3,5,14,0.97)" : "rgba(246,248,255,0.97)",
        backdropFilter:"blur(20px)",
        padding:"16px", overflowY:"auto",
        display:"flex", flexDirection:"column", gap:4,
      }}
    >
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:18 }}>{ICON[card.id]}</span>
          <span style={{ color:t.t1, fontSize:13, fontWeight:700 }}>{LABELS[card.id]}</span>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", color:t.t3, cursor:"pointer", fontSize:20, lineHeight:1, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>

      {/* Accent color */}
      <div style={{ marginBottom:14 }}>
        <div style={{ color:t.t3, fontSize:9, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", fontFamily:"JetBrains Mono,monospace", marginBottom:9 }}>
          ACCENT COLOR
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {ACCENT_PRESETS.map(c => (
            <button key={c} onClick={() => updateCard(card.id, { accentColor:c })} style={{
              width:26, height:26, borderRadius:"50%", background:c,
              border:`2.5px solid ${card.accentColor===c ? "white" : "transparent"}`,
              cursor:"pointer",
              boxShadow: card.accentColor===c ? `0 0 10px ${c}` : "none",
              transition:"all .15s",
            }}/>
          ))}
          {/* Custom picker */}
          <label style={{
            width:26, height:26, borderRadius:"50%", cursor:"pointer",
            background:"conic-gradient(red,yellow,lime,cyan,blue,magenta,red)",
            border:"2px dashed rgba(255,255,255,0.4)",
            display:"flex", alignItems:"center", justifyContent:"center",
            overflow:"hidden",
          }}>
            <input
              type="color" value={card.accentColor}
              onChange={e => updateCard(card.id, { accentColor:e.target.value })}
              style={{ opacity:0, position:"absolute", pointerEvents:"none" }}
            />
          </label>
        </div>
      </div>

      <SliderRow label="GLASS OPACITY" k="cardOpacity" min={0.25} max={1} step={0.05} />
      <SliderRow label="TEXT SCALE"    k="textScale"   min={0.7}  max={1.35} step={0.05} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBlock:10, borderTop:`1px solid ${t.cardBorder}`, marginTop:4 }}>
        <div>
          <div style={{ color:t.t1, fontSize:12, fontWeight:600 }}>Show on dashboard</div>
          <div style={{ color:t.t3, fontSize:10, marginTop:2 }}>Hidden cards appear in edit mode only</div>
        </div>
        <Toggle on={card.visible} onChange={v => updateCard(card.id, { visible:v })} accent={card.accentColor} />
      </div>
    </div>
  )
}

// ─── Resize handle ────────────────────────────────────────────────────────────
function ResizeHandle({ cardId, accent, gridPad, gridGap }: {
  cardId: CardId; accent: string; gridPad: number; gridGap: number
}) {
  const { updateCard, gridCols, gridRows } = useSettingsStore()
  const startRef = useRef({ mx:0, my:0, w:1, h:1 })

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    const card = useSettingsStore.getState().cards.find(c => c.id === cardId)!
    startRef.current = { mx:e.clientX, my:e.clientY, w:card.colSpan, h:card.rowSpan }

    const availW = window.innerWidth  - gridPad * 2 - gridGap * (gridCols - 1)
    const availH = window.innerHeight - DOCK_HEIGHT - STATUS_BAR_HEIGHT - gridPad * 2 - gridGap * (gridRows - 1)
    const cellW  = availW / gridCols
    const cellH  = availH / gridRows

    const onMove = (ev: PointerEvent) => {
      const c   = useSettingsStore.getState().cards.find(c => c.id === cardId)!
      const dW  = Math.round((ev.clientX - startRef.current.mx) / (cellW + gridGap))
      const dH  = Math.round((ev.clientY - startRef.current.my) / (cellH + gridGap))
      updateCard(cardId, {
        colSpan: Math.max(1, Math.min(gridCols - c.col + 1, startRef.current.w + dW)),
        rowSpan: Math.max(1, Math.min(gridRows - c.row + 1, startRef.current.h + dH)),
      })
    }
    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  return (
    <div
      onPointerDown={onPointerDown}
      title="Drag to resize"
      style={{
        position:"absolute", right:0, bottom:0,
        width:24, height:24,
        borderRadius:"12px 0 18px 0",
        background: accent,
        cursor:"se-resize", zIndex:25,
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:`0 0 12px ${accent}88`,
        userSelect:"none",
        touchAction:"none",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 9L9 2M5 9L9 5M9 9H9" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

// ─── Single card wrapper ──────────────────────────────────────────────────────
type WrapperProps = {
  card: CardLayout
  isEditMode: boolean
  draggingId: CardId|null
  dragOverId: CardId|null
  onDragStart: (id:CardId) => void
  onDragOver:  (id:CardId) => void
  onDrop:      (id:CardId) => void
  gridPad: number
  gridGap: number
}

function CardWrapper({ card, isEditMode, draggingId, dragOverId, onDragStart, onDragOver, onDrop, gridPad, gridGap }: WrapperProps) {
  const t                     = useTheme()
  const { cardRadius, cardBlur } = useSettingsStore()
  const [editing, setEditing] = useState(false)

  const Comp  = COMPONENTS[card.id]
  const isMe  = draggingId === card.id
  const isOver = dragOverId === card.id && !isMe
  const radius = cardRadius

  if (!card.visible && !isEditMode) return null

  return (
    <CardProvider value={{
      id: card.id, accent: card.accentColor,
      textScale: card.textScale, opacity: card.cardOpacity,
      radius, blur: cardBlur,
    }}>
      <div
        draggable={isEditMode && !editing}
        onDragStart={e => { e.stopPropagation(); onDragStart(card.id) }}
        onDragOver={e => { e.preventDefault(); e.stopPropagation(); onDragOver(card.id) }}
        onDrop={e => { e.preventDefault(); e.stopPropagation(); onDrop(card.id) }}
        onDragEnd={() => onDrop(card.id)}
        className="fade-up"
        style={{
          gridColumn: `${card.col} / span ${card.colSpan}`,
          gridRow:    `${card.row} / span ${card.rowSpan}`,
          position:   "relative",
          borderRadius: radius,
          overflow:   "hidden",
          minWidth:   0,
          minHeight:  0,
          background: t.mode==="dark"
            ? `rgba(10,14,26,${card.cardOpacity})`
            : `rgba(255,255,255,${card.cardOpacity})`,
          backdropFilter: `blur(${cardBlur}px) saturate(165%)`,
          border: `1px solid ${
            isOver      ? card.accentColor + "aa" :
            isEditMode  ? card.accentColor + "55" :
            t.cardBorder
          }`,
          boxShadow: isOver
            ? `0 0 0 2px ${card.accentColor}66, 0 8px 32px rgba(0,0,0,.6)`
            : `0 2px 20px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.05)`,
          opacity:   isMe ? 0.25 : !card.visible ? 0.35 : 1,
          cursor:    isEditMode && !editing ? "grab" : "default",
          transition:"opacity .2s, box-shadow .2s, border-color .2s",
          animationDelay: `${(card.col - 1 + (card.row - 1) * 4) * 40}ms`,
          animationFillMode:"both",
        }}
      >
        {/* Card content, scaled */}
        <div style={{
          width:"100%", height:"100%",
          fontSize: `${card.textScale}em`,
          filter: !card.visible && isEditMode ? "grayscale(1) brightness(0.3)" : "none",
          transition: "filter .2s",
        }}>
          <Comp />
        </div>

        {/* ── Edit mode overlays ── */}
        {isEditMode && !editing && (
          <>
            {/* Top accent gradient bar */}
            <div style={{
              position:"absolute", top:0, left:0, right:0, height:3,
              background:`linear-gradient(90deg, ${card.accentColor}, transparent 75%)`,
              borderRadius:`${radius}px ${radius}px 0 0`,
              zIndex:10, pointerEvents:"none",
            }}/>

            {/* Edit button — top right */}
            <button
              onClick={e => { e.stopPropagation(); setEditing(true) }}
              style={{
                position:"absolute", top:8, right:8, zIndex:20,
                width:28, height:28, borderRadius:9,
                background: card.accentColor,
                border:"none", cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:13, boxShadow:`0 2px 10px ${card.accentColor}66`,
              }}
            >✏️</button>

            {/* Drag hint label — bottom left */}
            <div style={{
              position:"absolute", bottom:8, left:8, zIndex:10,
              background:"rgba(0,0,0,.6)", backdropFilter:"blur(8px)",
              borderRadius:5, padding:"2px 8px",
              color:"rgba(255,255,255,.6)", fontSize:8.5,
              fontWeight:700, letterSpacing:1.2,
              fontFamily:"JetBrains Mono,monospace",
              pointerEvents:"none",
            }}>
              {ICON[card.id]} {LABELS[card.id].toUpperCase()}
            </div>

            {/* Resize handle */}
            <ResizeHandle
              cardId={card.id}
              accent={card.accentColor}
              gridPad={gridPad}
              gridGap={gridGap}
            />
          </>
        )}

        {/* Card editor panel */}
        {isEditMode && editing && (
          <CardEditor card={card} onClose={() => setEditing(false)} />
        )}
      </div>
    </CardProvider>
  )
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
// Portrait position map — 2 columns × 4 rows, every card gets a slot
const PORTRAIT_MAP: Record<CardId, { col:number; row:number; colSpan:number; rowSpan:number }> = {
  clock:    { col:1, row:1, colSpan:1, rowSpan:1 },
  nav:      { col:2, row:1, colSpan:1, rowSpan:1 },
  trip:     { col:1, row:2, colSpan:1, rowSpan:1 },
  music:    { col:2, row:2, colSpan:1, rowSpan:1 },
  weather:  { col:1, row:3, colSpan:1, rowSpan:1 },
  schedule: { col:2, row:3, colSpan:1, rowSpan:1 },
  calls:    { col:1, row:4, colSpan:1, rowSpan:1 },
  apps:     { col:2, row:4, colSpan:1, rowSpan:1 },
}

export default function BentoDashboard() {
  const t          = useTheme()
  const st         = useSettingsStore()
  const isEditMode = useLauncherStore(s => s.isEditMode)
  const vp         = useViewport()

  const isPortrait = vp.w < vp.h

  // Landscape: use user-configured grid; Portrait: fixed 2×4 grid
  const cols = isPortrait ? 2 : st.gridCols
  const rows = isPortrait ? 4 : st.gridRows

  // Portrait: remap stored col/row → portrait positions so cards always fit.
  // Landscape: use cards as-is (user drag/resize positions).
  const displayCards = isPortrait
    ? st.cards.map(c => ({ ...c, ...PORTRAIT_MAP[c.id] }))
    : st.cards

  // Drag state (landscape-only swap; portrait is fixed layout)
  const [draggingId, setDraggingId] = useState<CardId|null>(null)
  const [dragOverId, setDragOverId] = useState<CardId|null>(null)

  const handleDrop = useCallback((targetId: CardId) => {
    const fromId = draggingId
    setDraggingId(null)
    setDragOverId(null)
    if (!fromId || fromId === targetId || isPortrait) return
    const cards = useSettingsStore.getState().cards
    const a = cards.find(c => c.id === fromId)!
    const b = cards.find(c => c.id === targetId)!
    st.setCards(cards.map(c => {
      if (c.id === fromId)   return { ...c, col:b.col, row:b.row, colSpan:b.colSpan, rowSpan:b.rowSpan }
      if (c.id === targetId) return { ...c, col:a.col, row:a.row, colSpan:a.colSpan, rowSpan:a.rowSpan }
      return c
    }))
  }, [draggingId, isPortrait, st])

  // Portrait card height: each row gets an equal slice of usable height
  const portraitCellH = isPortrait
    ? Math.floor((vp.h - DOCK_HEIGHT - STATUS_BAR_HEIGHT - st.gridPad * 2 - st.gridGap * 3) / 4)
    : 0

  return (
    <div
      style={{
        position:"absolute",
        top:    STATUS_BAR_HEIGHT + st.gridPad,
        left:   st.gridPad,
        right:  st.gridPad,
        // Portrait: let the grid be exactly tall enough for 4 fixed-height rows
        // so it never overflows AND never has blank space
        ...(isPortrait
          ? { height: portraitCellH * 4 + st.gridGap * 3, bottom:"auto" }
          : { bottom: DOCK_HEIGHT + st.gridPad }),
        display:"grid",
        gap:    st.gridGap,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: isPortrait
          ? `repeat(4, ${portraitCellH}px)`   // explicit px rows → no overflow
          : `repeat(${rows}, 1fr)`,
      }}
    >
      {/* Edit mode hint (landscape only — portrait is read-only layout) */}
      {isEditMode && !isPortrait && (
        <div style={{
          position:"absolute",
          top:-30, left:0, right:0,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          paddingInline:2, pointerEvents:"none",
        }}>
          <span style={{ color:t.t3, fontSize:9, fontWeight:700, letterSpacing:1.4, fontFamily:"JetBrains Mono,monospace" }}>
            ↔ DRAG TO SWAP  ·  ↘ RESIZE  ·  ✏️ CARD OPTIONS
          </span>
          <button
            onClick={() => st.resetLayout()}
            style={{ pointerEvents:"all", background:`${t.a1}22`, border:`1px solid ${t.a1}55`, borderRadius:7, color:t.ta, fontSize:9, fontWeight:700, letterSpacing:.4, padding:"3px 12px", cursor:"pointer", fontFamily:"JetBrains Mono,monospace" }}
          >
            ↺ RESET
          </button>
        </div>
      )}

      {displayCards.map(card => (
        <CardWrapper
          key={card.id}
          card={card}
          isEditMode={isEditMode && !isPortrait}
          draggingId={draggingId}
          dragOverId={dragOverId}
          onDragStart={setDraggingId}
          onDragOver={setDragOverId}
          onDrop={handleDrop}
          gridPad={st.gridPad}
          gridGap={st.gridGap}
        />
      ))}
    </div>
  )
}