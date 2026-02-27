import MusicWidget from "@/widgets/music"
import NavigationWidget from "@/widgets/navigation"
import ClockWidget from "@/components/widgets/clock-widget"
// import MusicWidget from "@/widgets/music"

export const widgetRegistry: Record<string, any> = {
  navigation: NavigationWidget,
  music: MusicWidget,
  clock: ClockWidget,
}

