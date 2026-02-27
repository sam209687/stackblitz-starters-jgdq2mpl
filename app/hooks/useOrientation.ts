"use client"
// app/hooks/useOrientation.ts
// Detects real viewport orientation and updates
// the store. Also computes effective grid columns
// so portrait mode automatically reflows cards.

import { useEffect } from "react"
import { useLauncherStore } from "@/app/store/launcher-store"

export function useOrientation() {
  const setOrientation = useLauncherStore(s => s.setOrientation)

  useEffect(() => {
    const update = () => {
      const isLandscape = window.innerWidth >= window.innerHeight
      setOrientation(isLandscape ? "landscape" : "portrait")
    }
    update()
    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("orientationchange", update)
    }
  }, [setOrientation])
}