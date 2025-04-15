"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"

const data = [
  { day: "1", hydration: 64, redness: 37, oiliness: 50, elasticity: 69, pores: 41, wrinkles: 47, pigmentation: 42 },
  { day: "5", hydration: 65, redness: 36, oiliness: 51, elasticity: 70, pores: 40, wrinkles: 46, pigmentation: 42 },
  { day: "10", hydration: 66, redness: 34, oiliness: 52, elasticity: 71, pores: 39, wrinkles: 46, pigmentation: 41 },
  { day: "15", hydration: 67, redness: 33, oiliness: 52, elasticity: 71, pores: 39, wrinkles: 45, pigmentation: 41 },
  { day: "20", hydration: 67, redness: 33, oiliness: 51, elasticity: 72, pores: 38, wrinkles: 45, pigmentation: 41 },
  { day: "25", hydration: 68, redness: 32, oiliness: 52, elasticity: 72, pores: 38, wrinkles: 45, pigmentation: 41 },
  { day: "30", hydration: 68, redness: 32, oiliness: 52, elasticity: 72, pores: 38, wrinkles: 45, pigmentation: 41 },
]

const biomarkerColors = {
  hydration: "#3b82f6", // blue
  redness: "#ef4444", // red
  oiliness: "#f59e0b", // amber
  elasticity: "#8b5cf6", // purple
  pores: "#10b981", // green
  wrinkles: "#6b7280", // gray
  pigmentation: "#ec4899", // pink
}

export function SkinHealthChart() {
  const [activeBiomarkers, setActiveBiomarkers] = useState({
    hydration: true,
    redness: true,
    oiliness: true,
    elasticity: true,
    pores: false,
    wrinkles: false,
    pigmentation: false,
  })

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "12px",
              padding: "8px",
            }}
          />
          {activeBiomarkers.hydration && (
            <Line
              type="monotone"
              dataKey="hydration"
              stroke={biomarkerColors.hydration}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Hydration"
            />
          )}
          {activeBiomarkers.redness && (
            <Line
              type="monotone"
              dataKey="redness"
              stroke={biomarkerColors.redness}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Redness"
            />
          )}
          {activeBiomarkers.oiliness && (
            <Line
              type="monotone"
              dataKey="oiliness"
              stroke={biomarkerColors.oiliness}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Oiliness"
            />
          )}
          {activeBiomarkers.elasticity && (
            <Line
              type="monotone"
              dataKey="elasticity"
              stroke={biomarkerColors.elasticity}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Elasticity"
            />
          )}
          {activeBiomarkers.pores && (
            <Line
              type="monotone"
              dataKey="pores"
              stroke={biomarkerColors.pores}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Pores"
            />
          )}
          {activeBiomarkers.wrinkles && (
            <Line
              type="monotone"
              dataKey="wrinkles"
              stroke={biomarkerColors.wrinkles}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Wrinkles"
            />
          )}
          {activeBiomarkers.pigmentation && (
            <Line
              type="monotone"
              dataKey="pigmentation"
              stroke={biomarkerColors.pigmentation}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Pigmentation"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
