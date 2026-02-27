"use client"

import { useLauncherStore } from "@/app/store/launcher-store"

export default function DockPanels() {
  const activeDockApp = useLauncherStore(
    (s) => s.activeDockApp
  )
  const setActiveDockApp = useLauncherStore(
    (s) => s.setActiveDockApp
  )

  if (!activeDockApp) return null

  return (
    <div
      className="absolute inset-0 bg-black/70 z-30 flex items-center justify-center"
      onClick={() => setActiveDockApp(null)}
    >
      <div
        className="bg-white text-black p-10 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {activeDockApp.toUpperCase()} PANEL
      </div>
    </div>
  )
}