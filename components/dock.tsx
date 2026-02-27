"use client"

import DockItem from "./dock-item"

// You can replace these with your real apps/icons
const apps = [
  { icon: "🗂", label: "Menu" },
  { icon: "📱", label: "Apps" },
  { icon: "🧭", label: "Navigation" },
  { icon: "⚙️", label: "Settings" },
]

export default function SmartDock() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-gray-900 flex justify-evenly items-center p-2 shadow-lg z-50">
      {apps.map((app) => (
        <DockItem key={app.label} icon={app.icon} label={app.label} />
      ))}
    </div>
  )
}