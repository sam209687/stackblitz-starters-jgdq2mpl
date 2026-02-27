"use client"

import { create } from "zustand"

export type WidgetInstance = {
  id: string
  type: string
  x: number
  y: number
  w: number
  h: number
  config?: any
}

type LauncherState = {
  isEditMode: boolean
  isPro: boolean
  orientation: "portrait" | "landscape"

  layoutPortrait: WidgetInstance[]
  layoutLandscape: WidgetInstance[]

  activeDockApp: string | null
  setActiveDockApp: (id: string | null) => void

  // ✅ DRAG ENGINE
  draggingWidgetId: string | null
  setDraggingWidgetId: (id: string | null) => void

  toggleEditMode: () => void
  setOrientation: (o: "portrait" | "landscape") => void

  addWidget: (w: WidgetInstance) => void
  updateWidget: (id: string, data: Partial<WidgetInstance>) => void
  removeWidget: (id: string) => void
}

export const useLauncherStore = create<LauncherState>((set, get) => ({
  isEditMode: false,
  isPro: false,
  orientation: "landscape",

  layoutPortrait: [],

  // ✅ TEST WIDGET (drag visibility)
  layoutLandscape: [
    {
      id: "clock1",
      type: "clock",
      x: 1,
      y: 1,
      w: 3,
      h: 2,
    },
  ],

  activeDockApp: null,
  setActiveDockApp: (id) => set({ activeDockApp: id }),

  draggingWidgetId: null,
  setDraggingWidgetId: (id) => {
    console.log("🟡 draggingWidgetId:", id)
    set({ draggingWidgetId: id })
  },

  toggleEditMode: () =>
    set((state) => ({
      isEditMode: !state.isEditMode,
    })),

  setOrientation: (o) => set({ orientation: o }),

  addWidget: (widget) => {
    const key =
      get().orientation === "portrait"
        ? "layoutPortrait"
        : "layoutLandscape"

    set({
      [key]: [...get()[key], widget],
    } as Pick<LauncherState, "layoutPortrait" | "layoutLandscape">)
  },

  updateWidget: (id, data) => {
    console.log("🧠 updateWidget:", id, data)

    const key =
      get().orientation === "portrait"
        ? "layoutPortrait"
        : "layoutLandscape"

    set({
      [key]: get()[key].map((w) =>
        w.id === id ? { ...w, ...data } : w
      ),
    } as Pick<LauncherState, "layoutPortrait" | "layoutLandscape">)
  },

  removeWidget: (id) => {
    const key =
      get().orientation === "portrait"
        ? "layoutPortrait"
        : "layoutLandscape"

    set({
      [key]: get()[key].filter((w) => w.id !== id),
    } as Pick<LauncherState, "layoutPortrait" | "layoutLandscape">)
  },
}))