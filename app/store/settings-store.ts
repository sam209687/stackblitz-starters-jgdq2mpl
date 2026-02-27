"use client"
// ─────────────────────────────────────────────
// app/store/settings-store.ts
// ─────────────────────────────────────────────
// All user-configurable preferences. Lives
// separately from launcher-store so settings
// can be persisted/reset independently.

import { create } from "zustand"
import { persist } from "zustand/middleware"

// ── Card layout types ────────────────────────────────────────────────────────

export type CardId =
  | "clock" | "nav" | "music" | "weather"
  | "trip"  | "schedule" | "calls" | "apps"

// Each card has a position in the CSS grid (col, row) and a size (colSpan, rowSpan)
export type CardLayout = {
  id: CardId
  col: number      // 1-based grid column start
  row: number      // 1-based grid row start
  colSpan: number  // how many columns it occupies
  rowSpan: number  // how many rows it occupies
  visible: boolean
  // Per-card customization
  accentColor: string
  cardOpacity: number    // 0.4 – 1.0
  textScale: number      // 0.8 – 1.2
}

// ── Connectivity ─────────────────────────────────────────────────────────────

export type ConnectivityState = {
  bluetooth: boolean
  wifi: boolean
  hotspot: boolean
  doNotDisturb: boolean
}

// ── Settings store ────────────────────────────────────────────────────────────

type SettingsState = {
  // Layout
  cards: CardLayout[]
  setCards: (cards: CardLayout[]) => void
  updateCard: (id: CardId, patch: Partial<CardLayout>) => void
  resetLayout: () => void

  // Edit mode gate
  longPressToEdit: boolean   // if false, edit only accessible via Settings
  setLongPressToEdit: (v: boolean) => void

  // Connectivity
  connectivity: ConnectivityState
  setConnectivity: (patch: Partial<ConnectivityState>) => void

  // Grid config
  gridCols: number   // 2–6 columns
  gridRows: number   // 1–4 rows
  gridGap: number    // 6–20px
  gridPad: number    // 8–24px
  setGridConfig: (patch: Partial<{ gridCols: number; gridRows: number; gridGap: number; gridPad: number }>) => void

  // Global visual
  globalAccent: string
  setGlobalAccent: (color: string) => void
  cardRadius: number     // 8–28px
  setCardRadius: (v: number) => void
  cardBlur: number       // 8–40px
  setCardBlur: (v: number) => void

  // Settings panel open state
  settingsOpen: boolean
  setSettingsOpen: (v: boolean) => void
  settingsTab: "layout" | "connectivity" | "display" | "general"
  setSettingsTab: (t: "layout" | "connectivity" | "display" | "general") => void
}

// ── Default card layout ────────────────────────────────────────────────────────

export const DEFAULT_CARDS: CardLayout[] = [
  { id:"clock",    col:1, row:1, colSpan:1, rowSpan:1, visible:true, accentColor:"#dc2626", cardOpacity:0.78, textScale:1 },
  { id:"nav",      col:2, row:1, colSpan:1, rowSpan:1, visible:true, accentColor:"#10b981", cardOpacity:0.78, textScale:1 },
  { id:"trip",     col:3, row:1, colSpan:1, rowSpan:2, visible:true, accentColor:"#3b82f6", cardOpacity:0.78, textScale:1 },
  { id:"schedule", col:4, row:1, colSpan:1, rowSpan:2, visible:true, accentColor:"#8b5cf6", cardOpacity:0.78, textScale:1 },
  { id:"music",    col:1, row:2, colSpan:1, rowSpan:1, visible:true, accentColor:"#a855f7", cardOpacity:0.78, textScale:1 },
  { id:"weather",  col:2, row:2, colSpan:1, rowSpan:1, visible:true, accentColor:"#06b6d4", cardOpacity:0.78, textScale:1 },
  { id:"calls",    col:3, row:2, colSpan:1, rowSpan:1, visible:true, accentColor:"#10b981", cardOpacity:0.78, textScale:1 },
  { id:"apps",     col:4, row:2, colSpan:1, rowSpan:1, visible:true, accentColor:"#f59e0b", cardOpacity:0.78, textScale:1 },
]

// ── Store ─────────────────────────────────────────────────────────────────────

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      cards: DEFAULT_CARDS,
      setCards: (cards) => set({ cards }),
      updateCard: (id, patch) => set(s => ({
        cards: s.cards.map(c => c.id === id ? { ...c, ...patch } : c)
      })),
      resetLayout: () => set({ cards: DEFAULT_CARDS }),

      longPressToEdit: false,   // OFF by default — safer for drivers
      setLongPressToEdit: (v) => set({ longPressToEdit: v }),

      connectivity: { bluetooth: true, wifi: true, hotspot: false, doNotDisturb: false },
      setConnectivity: (patch) => set(s => ({ connectivity: { ...s.connectivity, ...patch } })),

      gridCols: 4,
      gridRows: 2,
      gridGap: 10,
      gridPad: 12,
      setGridConfig: (patch) => set(s => ({ ...s, ...patch })),

      globalAccent: "#dc2626",
      setGlobalAccent: (color) => set({ globalAccent: color }),
      cardRadius: 18,
      setCardRadius: (v) => set({ cardRadius: v }),
      cardBlur: 28,
      setCardBlur: (v) => set({ cardBlur: v }),

      settingsOpen: false,
      setSettingsOpen: (v) => set({ settingsOpen: v }),
      settingsTab: "layout",
      setSettingsTab: (t) => set({ settingsTab: t }),
    }),
    {
      name: "bizdrive-settings",
      // Only persist non-UI-state keys
      partialize: (s) => ({
        cards: s.cards,
        longPressToEdit: s.longPressToEdit,
        connectivity: s.connectivity,
        gridCols: s.gridCols,
        gridRows: s.gridRows,
        gridGap: s.gridGap,
        gridPad: s.gridPad,
        globalAccent: s.globalAccent,
        cardRadius: s.cardRadius,
        cardBlur: s.cardBlur,
      }),
    }
  )
)