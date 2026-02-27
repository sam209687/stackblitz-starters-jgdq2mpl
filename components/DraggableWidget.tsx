import { WidgetInstance, useLauncherStore } from "@/app/store/launcher-store"
import { motion } from "framer-motion"
// import { WidgetInstance } from "@/store/launcher-store"
// import { useLauncherStore } from "@/store/launcher-store"

type Props = {
    widget: WidgetInstance
  }

  export function DraggableWidget({ widget }: Props) {
  const updateWidget = useLauncherStore(
    (s) => s.updateWidget
  )

  return (
    <motion.div
      drag
      onDragEnd={(e, info) => {
        const newX = Math.round(info.point.x / 100)
        const newY = Math.round(info.point.y / 100)

        updateWidget(widget.id, {
          x: newX,
          y: newY,
        })
      }}
    >
      {widget.type}
    </motion.div>
  )
}