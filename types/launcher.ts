// ─────────────────────────────────────────────
// types/launcher.ts
// ─────────────────────────────────────────────

export type WidgetInstance = {
    id: string
    type: string
    x: number
    y: number
    w: number
    h: number
    config?: Record<string, unknown>
  }
  
  export type AppInstance = {
    id: string
    icon: string
    label: string
    x: number
    y: number
  }
  
  export type FolderInstance = {
    id: string
    label: string
    apps: AppInstance[]
    x: number
    y: number
    pageIdx: number
  }
  
  export type PageInstance = {
    id: string
    widgets: WidgetInstance[]
    apps: AppInstance[]
  }
  
  export type DockApp = {
    id: string
    icon: string
    label: string
  }
  
  export type DraggingState = {
    kind: "widget" | "app"
    id: string
    pageIdx: number
    origX: number
    origY: number
    curX: number
    curY: number
    mouseX: number
    mouseY: number
  }
  
  export type ResizingState = {
    id: string
    pageIdx: number
    origW: number
    origH: number
    mouseX: number
    mouseY: number
  }
  
  export type LaunchingApp = {
    id: string
    icon: string
    label: string
    x: number
    y: number
  }