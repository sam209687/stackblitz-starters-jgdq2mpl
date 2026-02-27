"use client"
// ─────────────────────────────────────────────
// app/hooks/useLaunchAnimation.ts
// ─────────────────────────────────────────────
// Captures the icon's screen position then sets
// launchingApp in the store, auto-clearing after
// the CSS animation completes.

import { useLauncherStore } from "@/app/store/launcher-store"

const ANIM_DURATION_MS = 700

export function useLaunchAnimation() {
  const setLaunchingApp = useLauncherStore((s) => s.setLaunchingApp)

  const launch = (
    app: { id: string; icon: string; label: string },
    e: React.MouseEvent<HTMLElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2

    setLaunchingApp({ ...app, x: cx, y: cy })
    setTimeout(() => setLaunchingApp(null), ANIM_DURATION_MS)
  }

  return { launch }
}