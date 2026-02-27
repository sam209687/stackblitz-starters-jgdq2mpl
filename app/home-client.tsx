"use client"

import { useRef, useEffect } from "react"
import SmartDock from "@/components/dock"
import DockPanels from "@/components/dock-panels"
import GridOverlay from "@/components/grid-overlay"
import WidgetRenderer from "@/components/widget-renderer"
import { useOrientation } from "./hooks/useOrientation"
import { useLauncherStore } from "./store/launcher-store"

export default function HomeClient() {
  useOrientation()

  const toggleEditMode = useLauncherStore((s) => s.toggleEditMode)
  const isEditMode = useLauncherStore((s) => s.isEditMode)
  const orientation = useLauncherStore((s) => s.orientation)
  const layoutPortrait = useLauncherStore((s) => s.layoutPortrait)
  const layoutLandscape = useLauncherStore((s) => s.layoutLandscape)

  const timer = useRef<NodeJS.Timeout | null>(null)
  const longPressTriggered = useRef(false)

  const layout =
    orientation === "portrait" ? layoutPortrait : layoutLandscape

  /* ---------------- DEBUG ---------------- */

  useEffect(() => {
    console.log("✏️ Edit mode:", isEditMode)
  }, [isEditMode])

  useEffect(() => {
    console.log("🧭 Orientation:", orientation)
    console.log("🧩 Active layout:", layout)
  }, [orientation, layout])

  /* ---------------- ESC EXIT ---------------- */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isEditMode) {
        console.log("⎋ ESC → exit edit mode")
        toggleEditMode()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isEditMode, toggleEditMode])

  /* ---------------- UI ---------------- */

  return (
    <main
      className="w-screen h-screen overflow-hidden relative select-none"
      onMouseDown={() => {
        if (isEditMode) return

        longPressTriggered.current = false

        timer.current = setTimeout(() => {
          console.log("⏱️ Long press → ENTER edit mode")
          toggleEditMode()
          longPressTriggered.current = true
        }, 600)
      }}
      onMouseUp={() => {
        if (timer.current) clearTimeout(timer.current)
      }}
      onMouseLeave={() => {
        if (timer.current) clearTimeout(timer.current)
      }}
      onClick={() => {
        if (longPressTriggered.current) {
          longPressTriggered.current = false
          return
        }

        if (isEditMode) {
          console.log("🖱 Click → EXIT edit mode")
          toggleEditMode()
        }
      }}
    >
      {/* EDIT BADGE */}
      {isEditMode && (
        <div className="absolute top-4 left-4 z-[999] bg-red-500 text-white px-3 py-1 rounded">
          EDIT MODE
        </div>
      )}

      {/* GRID */}
      <GridOverlay />

      {/* WIDGETS */}
      {layout.map((widget) => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}

      {/* PANELS */}
      <DockPanels />

      {/* DOCK */}
      <SmartDock />
    </main>
  )
}