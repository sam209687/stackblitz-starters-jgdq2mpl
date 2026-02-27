// ─────────────────────────────────────────────
// app/layout.tsx
// ─────────────────────────────────────────────
// Wraps the entire app in ThemeProvider so every
// component has access to the current theme.

import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/app/theme/theme-context"

export const metadata: Metadata = {
  title: "Car Launcher",
  description: "Head unit launcher",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: "hidden", width: "100vw", height: "100vh" }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}