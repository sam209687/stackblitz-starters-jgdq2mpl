"use client"
// ─────────────────────────────────────────────
// components/client-only.tsx
// ─────────────────────────────────────────────
// Renders children only after the component has
// mounted on the client. Returns null on the
// server, preventing ALL hydration mismatches
// from window/Date/screen-size usage.
//
// Usage:
//   <ClientOnly fallback={<Spinner />}>
//     <AnythingThatUsesWindow />
//   </ClientOnly>

import { useState, useEffect, ReactNode } from "react"

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

export default function ClientOnly({ children, fallback = null }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{fallback}</>
  return <>{children}</>
}