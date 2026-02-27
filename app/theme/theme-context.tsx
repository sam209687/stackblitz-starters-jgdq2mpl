"use client"
// ─────────────────────────────────────────────
// app/theme/theme-context.tsx  — v4
// ─────────────────────────────────────────────

import { createContext, useContext, useState, ReactNode } from "react"

export type ThemeMode = "dark" | "light"

export type Theme = {
  mode: ThemeMode
  toggle: () => void
  // Backgrounds
  bg: string
  bgMesh: string
  // Cards
  card: string
  cardBorder: string
  cardShadow: string
  cardHover: string
  cardClass: string
  // Dock
  dock: string
  dockBorder: string
  // Text
  t1: string   // primary
  t2: string   // secondary
  t3: string   // muted
  ta: string   // accent tinted
  // Accent (OnePlus business red)
  a1: string
  a2: string   // glow
  a3: string   // soft tint
  // Status / semantic
  green: string
  blue: string
  amber: string
  purple: string
}

const DARK: Theme = {
  mode: "dark", toggle: () => {},
  bg: "linear-gradient(145deg, #050810 0%, #080C14 60%, #060910 100%)",
  bgMesh: [
    "radial-gradient(ellipse 60% 50% at 15% 40%, rgba(220,38,38,0.05) 0%, transparent 70%)",
    "radial-gradient(ellipse 50% 60% at 85% 20%, rgba(59,130,246,0.04) 0%, transparent 70%)",
    "radial-gradient(ellipse 40% 40% at 50% 90%, rgba(99,102,241,0.03) 0%, transparent 70%)",
  ].join(","),
  card: "rgba(10,14,26,0.78)",
  cardBorder: "rgba(255,255,255,0.07)",
  cardShadow: "0 2px 16px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
  cardHover: "rgba(255,255,255,0.11)",
  cardClass: "bento-card",
  dock: "rgba(5,8,18,0.92)",
  dockBorder: "rgba(255,255,255,0.06)",
  t1: "rgba(240,244,255,0.95)",
  t2: "rgba(180,192,220,0.75)",
  t3: "rgba(120,135,168,0.55)",
  ta: "#ef6363",
  a1: "#dc2626",
  a2: "rgba(220,38,38,0.38)",
  a3: "rgba(220,38,38,0.10)",
  green:  "#10b981",
  blue:   "#3b82f6",
  amber:  "#f59e0b",
  purple: "#8b5cf6",
}

const LIGHT: Theme = {
  mode: "light", toggle: () => {},
  bg: "linear-gradient(145deg, #dde3f0 0%, #e8edf8 60%, #d8dfee 100%)",
  bgMesh: [
    "radial-gradient(ellipse 60% 50% at 15% 40%, rgba(220,38,38,0.06) 0%, transparent 70%)",
    "radial-gradient(ellipse 50% 60% at 85% 20%, rgba(59,130,246,0.05) 0%, transparent 70%)",
  ].join(","),
  card: "rgba(255,255,255,0.70)",
  cardBorder: "rgba(255,255,255,0.88)",
  cardShadow: "0 2px 16px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.9)",
  cardHover: "rgba(0,0,0,0.04)",
  cardClass: "bento-card-light",
  dock: "rgba(255,255,255,0.80)",
  dockBorder: "rgba(255,255,255,0.9)",
  t1: "rgba(10,14,26,0.92)",
  t2: "rgba(30,40,70,0.65)",
  t3: "rgba(30,40,70,0.38)",
  ta: "#b91c1c",
  a1: "#dc2626",
  a2: "rgba(220,38,38,0.25)",
  a3: "rgba(220,38,38,0.08)",
  green:  "#059669",
  blue:   "#2563eb",
  amber:  "#d97706",
  purple: "#7c3aed",
}

const Ctx = createContext<Theme>(DARK)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark")
  const toggle = () => setMode(m => m === "dark" ? "light" : "dark")
  const theme = { ...(mode === "dark" ? DARK : LIGHT), toggle }
  return <Ctx.Provider value={theme}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)