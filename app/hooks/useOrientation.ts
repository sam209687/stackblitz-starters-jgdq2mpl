"use client"

import { useEffect } from "react"
import { useLauncherStore } from "../store/launcher-store"

export function useOrientation() {
  const setOrientation = useLauncherStore(s => s.setOrientation)

  useEffect(() => {
    const update = () => {
      const isPortrait = window.innerHeight > window.innerWidth
      setOrientation(isPortrait ? "portrait" : "landscape")
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [setOrientation])
}