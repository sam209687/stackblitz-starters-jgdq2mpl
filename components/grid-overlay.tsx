"use client"

import { useLauncherStore } from "@/app/store/launcher-store"

export default function GridOverlay() {
  const isEditMode = useLauncherStore((s) => s.isEditMode)

  if (!isEditMode) return null

  return (
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-2 p-2 pointer-events-none z-0">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="border border-white/10 rounded"
        />
      ))}
    </div>
  )
}