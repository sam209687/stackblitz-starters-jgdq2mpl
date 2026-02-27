"use client"
import AppsPanel from "@/components/panels/apps-panel"
import MusicPanel from "@/components/panels/music-panel"
import NavPanel from "@/components/panels/nav-panel"
import SettingsPanel from "@/components/panels/settings-panel"

export const dockApps = [
  { id: "nav", label: "Nav", icon: "🧭", component: NavPanel },
  { id: "music", label: "Music", icon: "🎵", component: MusicPanel },
  { id: "apps", label: "Apps", icon: "📦", component: AppsPanel },
  { id: "settings", label: "Settings", icon: "⚙️", component: SettingsPanel },
]