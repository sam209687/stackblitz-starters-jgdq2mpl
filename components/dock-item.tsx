"use client"

import { useLauncherStore } from "@/app/store/launcher-store"

type DockItemProps = {
  icon: string
  label: string
}

export default function DockItem({ icon, label }: DockItemProps) {
  const setActiveDockApp = useLauncherStore((s) => s.setActiveDockApp)
  const activeDockApp = useLauncherStore((s) => s.activeDockApp)

  const isActive = activeDockApp === icon

  return (
    <button
      onClick={() => setActiveDockApp(icon)}
      className={`
        flex flex-col items-center justify-center
        px-3 py-1 rounded-md
        transition-transform duration-150
        ${isActive ? "bg-blue-500 scale-105" : "bg-gray-700 hover:bg-gray-600"}
        active:scale-95
      `}
    >
      {/* Icon placeholder */}
      <div className="text-lg">{icon}</div>
      {/* Label below icon */}
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}