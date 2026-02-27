"use client"

import { useLauncherStore } from "@/app/store/launcher-store"

export default function DeleteWidget({ id }: { id: string }) {
  const removeWidget = useLauncherStore((s) => s.removeWidget)

  return (
    <button
      onClick={() => removeWidget(id)}
      className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 z-50"
    >
      ✕
    </button>
  )
}