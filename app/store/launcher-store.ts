"use client"
// ─────────────────────────────────────────────
// app/store/launcher-store.ts
// ─────────────────────────────────────────────

import { create } from "zustand"
import type {
  PageInstance,
  FolderInstance,
  DraggingState,
  ResizingState,
  LaunchingApp,
} from "@/types/launcher"
import { INITIAL_PAGES } from "@/app/engine/initial-data"

type LauncherState = {
  pages: PageInstance[]
  setPages: (updater: (prev: PageInstance[]) => PageInstance[]) => void

  folders: FolderInstance[]
  setFolders: (updater: (prev: FolderInstance[]) => FolderInstance[]) => void

  currentPage: number
  setCurrentPage: (page: number | ((prev: number) => number)) => void

  isEditMode: boolean
  toggleEditMode: () => void
  setEditMode: (val: boolean) => void

  orientation: "portrait" | "landscape"
  setOrientation: (o: "portrait" | "landscape") => void

  dragging: DraggingState | null
  setDragging: (d: DraggingState | null) => void

  resizing: ResizingState | null
  setResizing: (r: ResizingState | null) => void

  dropTarget: string | null
  setDropTarget: (id: string | null) => void

  launchingApp: LaunchingApp | null
  setLaunchingApp: (app: LaunchingApp | null) => void

  activeDockApp: string | null
  setActiveDockApp: (id: string | null) => void
}

export const useLauncherStore = create<LauncherState>((set) => ({
  pages: INITIAL_PAGES,
  setPages: (updater) => set((s) => ({ pages: updater(s.pages) })),

  folders: [],
  setFolders: (updater) => set((s) => ({ folders: updater(s.folders) })),

  currentPage: 0,
  setCurrentPage: (page) =>
    set((s) => ({
      currentPage: typeof page === "function" ? page(s.currentPage) : page,
    })),

  isEditMode: false,
  toggleEditMode: () => set((s) => ({ isEditMode: !s.isEditMode })),
  setEditMode: (val) => set({ isEditMode: val }),

  orientation: "landscape",
  setOrientation: (o) => set({ orientation: o }),

  dragging: null,
  setDragging: (d) => set({ dragging: d }),

  resizing: null,
  setResizing: (r) => set({ resizing: r }),

  dropTarget: null,
  setDropTarget: (id) => set({ dropTarget: id }),

  launchingApp: null,
  setLaunchingApp: (app) => set({ launchingApp: app }),

  activeDockApp: null,
  setActiveDockApp: (id) => set({ activeDockApp: id }),
}))