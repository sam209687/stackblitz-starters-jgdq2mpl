"use client"

import { useLauncherStore } from "@/app/store/launcher-store"

type Props = {
  icon: string
}

export default function DockItem({ icon }: Props) {
  const setActiveDockApp = useLauncherStore(
    (s) => s.setActiveDockApp
  )

  return (
    <button
      onClick={() => setActiveDockApp(icon)}
      className="flex flex-col items-center justify-center text-white active:scale-90 transition"
    >
      {icon}
    </button>
  )
}