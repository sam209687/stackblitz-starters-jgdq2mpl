// ─────────────────────────────────────────────
// app/engine/collision.ts
// ─────────────────────────────────────────────
// Resolves grid collisions between widgets.
// When a moving widget overlaps others, push
// them away so they never stack.

import type { WidgetInstance } from "@/types/launcher"

function overlaps(a: WidgetInstance, b: WidgetInstance): boolean {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  )
}

export function resolveCollision(
  layout: WidgetInstance[],
  moving: WidgetInstance
): WidgetInstance[] {
  return layout.map((w) => {
    if (w.id === moving.id) return w
    if (!overlaps(moving, w)) return w
    // Push the colliding widget below the moving one
    return { ...w, y: moving.y + moving.h }
  })
}