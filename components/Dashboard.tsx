"use client"

import WidgetRenderer from "@/components/widget-renderer"
import SmartDock from "@/components/dock"
import { useOrientation } from "@/app/hooks/useOrientation"
// import { useOrientation } from "@/hooks/useOrientation"

export default function Dashboard() {
  useOrientation()

  return (
    <main className="w-screen h-screen overflow-hidden">
      <WidgetRenderer />
      <SmartDock />
    </main>
  )
}