"use client"

import { useEffect, useState } from "react"

export default function MoonPhase() {
  const moonPhases = "ZYXWVUTSRQPONMLKJIHGFEDCBA"
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhaseIndex((prevIndex) => {
        return prevIndex >= moonPhases.length - 1 ? 0 : prevIndex + 1
      })
    }, 200)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="inline-block font-moonphases align-bottom">
      {moonPhases.charAt(currentPhaseIndex)}
    </div>
  )
}
