"use client"

import { useLauncherStore } from "@/app/store/launcher-store"

export default function ResizeHandle({ id }: { id: string }) {
  const updateWidget = useLauncherStore((s) => s.updateWidget)

  const handleResize = () => {
    updateWidget(id, { w: 2, h: 2 }) // temp logic
  }

  return (
    <div
      onClick={handleResize}
      className="absolute bottom-0 right-0 w-4 h-4 bg-white/70 cursor-se-resize"
    />
  )
}