// ─────────────────────────────────────────────
// app/engine/widget-registry.ts
// ─────────────────────────────────────────────
// Add new widget types here. The key must match
// the `type` field on WidgetInstance.

import ClockWidget   from "@/components/widgets/clock-widget"
import WeatherWidget from "@/components/widgets/weather-widget"
import MusicWidget   from "@/components/widgets/music-widget"
import NavCardWidget from "@/components/widgets/navcard-widget"

export const widgetRegistry: Record<string, React.ComponentType> = {
  clock:   ClockWidget,
  weather: WeatherWidget,
  music:   MusicWidget,
  navcard: NavCardWidget,
}