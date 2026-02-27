"use client"

import DockItem from "./dock-item"

export default function SmartDock() {
  return (
    <div className="fixed bottom-0 w-full h-20 flex justify-around items-center bg-black/60 backdrop-blur z-40">
      <DockItem icon="nav" />
      <DockItem icon="music" />
      <DockItem icon="apps" />
      <DockItem icon="settings" />
    </div>
  )
}