"use client"
// ─────────────────────────────────────────────
// app/hooks/useDragManager.ts
// ─────────────────────────────────────────────
// Accepts LayoutMetrics | null — does nothing
// until metrics are available (post-mount).

import { useEffect, useCallback, useRef } from "react"
import { useLauncherStore } from "@/app/store/launcher-store"
import { PAGE_SWIPE_ZONE, FOLDER_OVERLAP_FRACTION } from "@/app/engine/constants"
import type { FolderInstance } from "@/types/launcher"
import type { LayoutMetrics } from "@/app/engine/layout-engine"

export function useDragManager(
  containerRef: React.RefObject<HTMLElement>,
  metrics: LayoutMetrics | null
) {
  const {
    dragging, setDragging,
    resizing, setResizing,
    dropTarget, setDropTarget,
    pages, setPages,
    setFolders,
    currentPage, setCurrentPage,
  } = useLauncherStore()

  // Keep a ref so callbacks always see the latest values
  const metricsRef = useRef(metrics)
  useEffect(() => { metricsRef.current = metrics }, [metrics])

  const currentPageRef = useRef(currentPage)
  useEffect(() => { currentPageRef.current = currentPage }, [currentPage])

  const onMouseMove = useCallback((e: MouseEvent) => {
    const m = metricsRef.current
    if (!m) return  // not mounted yet
    const { cell } = m

    // ── Resize ──────────────────────────────────────────────────────────────
    if (resizing) {
      const dx = e.clientX - resizing.mouseX
      const dy = e.clientY - resizing.mouseY
      const newW = Math.max(1, resizing.origW + Math.round(dx / cell))
      const newH = Math.max(1, resizing.origH + Math.round(dy / cell))
      setPages((prev) =>
        prev.map((pg, pi) =>
          pi !== resizing.pageIdx ? pg : {
            ...pg,
            widgets: pg.widgets.map((w) =>
              w.id !== resizing.id ? w : { ...w, w: newW, h: newH }
            ),
          }
        )
      )
      return
    }

    if (!dragging) return

    const dx = e.clientX - dragging.mouseX
    const dy = e.clientY - dragging.mouseY
    const newGX = dragging.origX + Math.round(dx / cell)
    const newGY = dragging.origY + Math.round(dy / cell)

    // ── Page swipe ────────────────────────────────────────────────────────────
    const containerW = containerRef.current?.offsetWidth ?? window.innerWidth
    const page = currentPageRef.current

    if (e.clientX < PAGE_SWIPE_ZONE && page > 0) {
      setCurrentPage((p) => p - 1)
      setDragging({ ...dragging, mouseX: e.clientX, mouseY: e.clientY, origX: newGX, origY: newGY, pageIdx: page - 1 })
      return
    }
    if (e.clientX > containerW - PAGE_SWIPE_ZONE && page < pages.length - 1) {
      setCurrentPage((p) => p + 1)
      setDragging({ ...dragging, mouseX: e.clientX, mouseY: e.clientY, origX: newGX, origY: newGY, pageIdx: page + 1 })
      return
    }

    setDragging({ ...dragging, curX: newGX, curY: newGY })

    // ── Folder drop-target detection ──────────────────────────────────────────
    if (dragging.kind === "app") {
      const currentApps = pages[page]?.apps ?? []
      const hovered = currentApps.find(
        (a) =>
          a.id !== dragging.id &&
          Math.abs(a.x - newGX) < FOLDER_OVERLAP_FRACTION &&
          Math.abs(a.y - newGY) < FOLDER_OVERLAP_FRACTION
      )
      setDropTarget(hovered?.id ?? null)
    }
  }, [dragging, resizing, pages, containerRef, setDragging, setResizing, setCurrentPage, setDropTarget, setPages])

  const onMouseUp = useCallback(() => {
    if (resizing) { setResizing(null); return }
    if (!dragging) return

    // ── Folder creation ────────────────────────────────────────────────────────
    if (dragging.kind === "app" && dropTarget) {
      const pageApps = pages[dragging.pageIdx]?.apps ?? []
      const draggedApp = pageApps.find((a) => a.id === dragging.id)
      const targetApp  = pageApps.find((a) => a.id === dropTarget)

      if (draggedApp && targetApp) {
        const newFolder: FolderInstance = {
          id: `folder-${Date.now()}`,
          label: "Folder",
          apps: [draggedApp, targetApp],
          x: targetApp.x, y: targetApp.y,
          pageIdx: dragging.pageIdx,
        }
        setFolders((f) => [...f, newFolder])
        setPages((prev) =>
          prev.map((pg, pi) =>
            pi !== dragging.pageIdx ? pg : {
              ...pg,
              apps: pg.apps.filter(
                (a) => a.id !== dragging.id && a.id !== dropTarget
              ),
            }
          )
        )
      }
      setDropTarget(null)
      setDragging(null)
      return
    }

    if (dragging.kind === "widget") {
      setPages((prev) =>
        prev.map((pg, pi) =>
          pi !== dragging.pageIdx ? pg : {
            ...pg,
            widgets: pg.widgets.map((w) =>
              w.id !== dragging.id ? w : { ...w, x: dragging.curX, y: dragging.curY }
            ),
          }
        )
      )
    } else {
      setPages((prev) =>
        prev.map((pg, pi) =>
          pi !== dragging.pageIdx ? pg : {
            ...pg,
            apps: pg.apps.map((a) =>
              a.id !== dragging.id ? a : { ...a, x: dragging.curX, y: dragging.curY }
            ),
          }
        )
      )
    }

    setDropTarget(null)
    setDragging(null)
  }, [dragging, resizing, dropTarget, pages, setDragging, setResizing, setDropTarget, setPages, setFolders])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [onMouseMove, onMouseUp])
}