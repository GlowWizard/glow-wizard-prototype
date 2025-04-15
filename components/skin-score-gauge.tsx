"use client"

import { useEffect, useState } from "react"

interface SkinScoreGaugeProps {
  score: number
}

export function SkinScoreGauge({ score }: SkinScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev < score) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 20)

    return () => clearInterval(interval)
  }, [score])

  // Calculate the angle for the gauge needle
  const angle = (animatedScore / 100) * 180 - 90

  // Determine color based on score
  const getColor = (score: number) => {
    if (score < 60) return "#ef4444" // red
    if (score < 75) return "#f59e0b" // amber
    return "#10b981" // green
  }

  const scoreColor = getColor(animatedScore)

  return (
    <div className="relative w-36 h-18">
      {/* Gauge background */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute bottom-0 w-full h-full rounded-t-full bg-gray-100"></div>
      </div>

      {/* Gauge segments */}
      <div className="absolute bottom-0 left-0 w-full h-full">
        <div className="absolute bottom-0 left-0 w-1/3 h-full origin-bottom-right rotate-[-60deg] bg-red-100"></div>
        <div className="absolute bottom-0 left-1/3 w-1/3 h-full origin-bottom-left rotate-[0deg] bg-amber-100"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full origin-bottom-left rotate-[60deg] bg-green-100"></div>
      </div>

      {/* Gauge needle */}
      <div
        className="absolute bottom-0 left-1/2 w-1 h-[70px] -ml-[0.5px] origin-bottom transition-transform duration-500"
        style={{
          transform: `rotate(${angle}deg)`,
          backgroundColor: scoreColor,
        }}
      >
        <div
          className="absolute -top-1 -left-[5px] w-[11px] h-[11px] rounded-full"
          style={{ backgroundColor: scoreColor }}
        ></div>
      </div>

      {/* Center point */}
      <div className="absolute bottom-0 left-1/2 w-4 h-4 -ml-2 -mb-2 rounded-full bg-white border-2 border-gray-300 z-10"></div>

      {/* Score display */}
      <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-center">
        <div className="text-2xl font-bold" style={{ color: scoreColor }}>
          {animatedScore}
        </div>
        <div className="text-xs text-muted-foreground">out of 100</div>
      </div>
    </div>
  )
}
