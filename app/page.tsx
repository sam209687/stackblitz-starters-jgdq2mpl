// ─────────────────────────────────────────────
// app/page.tsx
// ─────────────────────────────────────────────
// Wraps HomeClient in ClientOnly so the server
// renders only the loading shell. The launcher
// (which uses window dimensions + Date) mounts
// exclusively on the client — zero SSR mismatch.

import ClientOnly from "@/components/client-only"
import HomeClient from "./home-client"

const LoadingShell = () => (
  <div style={{
    width: "100vw",
    height: "100vh",
    background: "#030308",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <div style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      border: "2px solid rgba(220,38,38,0.25)",
      borderTopColor: "#dc2626",
      animation: "spin 0.8s linear infinite",
    }} />
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
)

export default function Page() {
  return (
    <ClientOnly fallback={<LoadingShell />}>
      <HomeClient />
    </ClientOnly>
  )
}