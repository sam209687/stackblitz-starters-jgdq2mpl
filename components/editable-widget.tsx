"use client"

import { useLauncherStore } from "@/app/store/launcher-store"
import DeleteWidget from "./delete-widget"
import ResizeHandle from "./resize-handle"


export default function EditableWidget({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const isEditMode = useLauncherStore((s) => s.isEditMode)

  return (
    <div
      className={`relative w-full h-full ${
        isEditMode ? "animate-[wiggle_0.3s_infinite]" : ""
      }`}
    >
      {isEditMode && <DeleteWidget id={id} />}
      {children}
      {isEditMode && <ResizeHandle id={id} />}
    </div>
  )
}