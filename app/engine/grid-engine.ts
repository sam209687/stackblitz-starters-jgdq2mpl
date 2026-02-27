import { GridItem } from "@/types/grid"

export const GRID_COLS = 12

export function checkCollision(
  layout: GridItem[],
  item: GridItem
): boolean {
  return layout.some((w: GridItem) => {
    if (w.id === item.id) return false

    return !(
      item.x + item.w <= w.x ||
      item.x >= w.x + w.w ||
      item.y + item.h <= w.y ||
      item.y >= w.y + w.h
    )
  })
}