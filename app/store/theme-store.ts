import { create } from "zustand"

type ThemeMode = "light" | "dark" | "amoled"

type ThemeState = {
  mode: ThemeMode
  accent: string
  setMode: (m: ThemeMode) => void
  setAccent: (c: string) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "dark",
  accent: "#3b82f6",

  setMode: (mode) => {
    document.documentElement.dataset.theme = mode
    set({ mode })
  },

  setAccent: (accent) => {
    document.documentElement.style.setProperty(
      "--accent",
      accent
    )
    set({ accent })
  },
}))