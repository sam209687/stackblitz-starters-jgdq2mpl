"use client"

import { useEffect, useState } from "react"

export default function ClockWidget() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString())

    update()
    const i = setInterval(update, 1000)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="bg-black/60 text-white p-4 rounded-xl text-xl">
      {time}
    </div>
  )
}