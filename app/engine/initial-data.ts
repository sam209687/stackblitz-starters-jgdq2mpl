// ─────────────────────────────────────────────
// app/engine/initial-data.ts
// ─────────────────────────────────────────────

import type { PageInstance, DockApp } from "@/types/launcher"

export const INITIAL_PAGES: PageInstance[] = [
  {
    id: "page-0",
    widgets: [
      { id: "clock1",   type: "clock",   x: 0, y: 0, w: 3, h: 2 },
      { id: "weather1", type: "weather", x: 3, y: 0, w: 2, h: 2 },
      { id: "music1",   type: "music",   x: 0, y: 2, w: 4, h: 2 },
      { id: "nav1",     type: "navcard", x: 4, y: 2, w: 3, h: 2 },
    ],
    apps: [
      { id: "a1", icon: "📞", label: "Phone",    x: 1, y: 4 },
      { id: "a2", icon: "💬", label: "Messages", x: 2, y: 4 },
      { id: "a3", icon: "🎵", label: "Spotify",  x: 3, y: 4 },
      { id: "a4", icon: "🗺️", label: "Maps",     x: 4, y: 4 },
      { id: "a5", icon: "📷", label: "Camera",   x: 5, y: 4 },
    ],
  },
  {
    id: "page-1",
    widgets: [],
    apps: [
      { id: "b1", icon: "🌐", label: "Browser",  x: 1, y: 1 },
      { id: "b2", icon: "📧", label: "Email",    x: 2, y: 1 },
      { id: "b3", icon: "🎮", label: "Games",    x: 3, y: 1 },
      { id: "b4", icon: "📺", label: "YouTube",  x: 4, y: 1 },
    ],
  },
]

export const DOCK_APPS: DockApp[] = [
  { id: "d1", icon: "🗂",  label: "Menu"       },
  { id: "d2", icon: "🏠",  label: "Home"       },
  { id: "d3", icon: "🧭",  label: "Navigation" },
  { id: "d4", icon: "📱",  label: "Apps"       },
  { id: "d5", icon: "⚙️", label: "Settings"   },
]