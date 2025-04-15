"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ZoomIn, ZoomOut, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BiomarkerDetailProps {
  biomarker: string
  onBack: () => void
}

const biomarkerInfo = {
  redness: {
    title: "Redness",
    description: "Skin inflammation level",
    value: 32,
    unit: "%",
    status: "good",
    color: "#ef4444",
    data: [
      { date: "Mar 15", value: 37 },
      { date: "Mar 22", value: 35 },
      { date: "Mar 29", value: 34 },
      { date: "Apr 5", value: 33 },
      { date: "Apr 12", value: 32 },
    ],
    insights: [
      "Your skin redness has decreased by 5% in the last 30 days",
      "Redness is most concentrated around the nose and cheeks",
      "Current level is better than 68% of people in your age group",
    ],
    recommendations: [
      "Continue using products with anti-inflammatory ingredients",
      "Avoid hot water when cleansing",
      "Consider adding a soothing toner to your routine",
    ],
  },
  wrinkles: {
    title: "Wrinkles",
    description: "Fine lines & wrinkles",
    value: 45,
    unit: "%",
    status: "normal",
    color: "#6b7280",
    data: [
      { date: "Mar 15", value: 47 },
      { date: "Mar 22", value: 47 },
      { date: "Mar 29", value: 46 },
      { date: "Apr 5", value: 46 },
      { date: "Apr 12", value: 45 },
    ],
    insights: [
      "Your wrinkle score has improved slightly in the last 30 days",
      "Fine lines are most visible around the eyes and forehead",
      "Current level is average for people in your age group",
    ],
    recommendations: [
      "Continue using retinol products in your evening routine",
      "Consider adding peptides to boost collagen production",
      "Ensure consistent use of broad-spectrum SPF daily",
    ],
  },
  pores: {
    title: "Pores",
    description: "Pore size & visibility",
    value: 38,
    unit: "%",
    status: "good",
    color: "#10b981",
    data: [
      { date: "Mar 15", value: 41 },
      { date: "Mar 22", value: 40 },
      { date: "Mar 29", value: 39 },
      { date: "Apr 5", value: 39 },
      { date: "Apr 12", value: 38 },
    ],
    insights: [
      "Your pore visibility has decreased by 3% in the last 30 days",
      "Pores are most visible in the T-zone area",
      "Current level is better than 62% of people in your age group",
    ],
    recommendations: [
      "Continue with regular gentle exfoliation 2-3 times weekly",
      "Use non-comedogenic products to prevent clogging",
      "Consider adding niacinamide to help minimize pore appearance",
    ],
  },
  hydration: {
    title: "Hydration",
    description: "Skin moisture content",
    value: 68,
    unit: "%",
    status: "normal",
    color: "#3b82f6",
    data: [
      { date: "Mar 15", value: 64 },
      { date: "Mar 22", value: 65 },
      { date: "Mar 29", value: 66 },
      { date: "Apr 5", value: 67 },
      { date: "Apr 12", value: 68 },
    ],
    insights: [
      "Your skin hydration has improved by 4% in the last 30 days",
      "Hydration is most improved in the cheek areas",
      "Current level is better than 55% of people in your age group",
    ],
    recommendations: [
      "Continue using hyaluronic acid serums",
      "Maintain consistent water intake throughout the day",
      "Consider adding a hydrating face mask weekly",
    ],
  },
  oiliness: {
    title: "Oiliness",
    description: "Sebum production",
    value: 52,
    unit: "%",
    status: "caution",
    color: "#f59e0b",
    data: [
      { date: "Mar 15", value: 50 },
      { date: "Mar 22", value: 51 },
      { date: "Mar 29", value: 52 },
      { date: "Apr 5", value: 52 },
      { date: "Apr 12", value: 52 },
    ],
    insights: [
      "Your skin oiliness has increased slightly in the last 30 days",
      "Oil production is highest in the T-zone",
      "Current level is higher than 60% of people in your age group",
    ],
    recommendations: [
      "Use oil-control products in your morning routine",
      "Consider adding salicylic acid to help control sebum",
      "Use blotting papers throughout the day as needed",
    ],
  },
  pigmentation: {
    title: "Pigmentation",
    description: "Melanin distribution",
    value: 41,
    unit: "%",
    status: "normal",
    color: "#ec4899",
    data: [
      { date: "Mar 15", value: 42 },
      { date: "Mar 22", value: 42 },
      { date: "Mar 29", value: 41 },
      { date: "Apr 5", value: 41 },
      { date: "Apr 12", value: 41 },
    ],
    insights: [
      "Your pigmentation has remained stable in the last 30 days",
      "Pigmentation is most visible on the cheeks and forehead",
      "Current level is average for people in your age group",
    ],
    recommendations: [
      "Continue using vitamin C serum in your morning routine",
      "Ensure consistent use of broad-spectrum SPF daily",
      "Consider adding tranexamic acid for targeted treatment",
    ],
  },
  elasticity: {
    title: "Elasticity",
    description: "Skin firmness",
    value: 72,
    unit: "%",
    status: "good",
    color: "#8b5cf6",
    data: [
      { date: "Mar 15", value: 69 },
      { date: "Mar 22", value: 70 },
      { date: "Mar 29", value: 71 },
      { date: "Apr 5", value: 71 },
      { date: "Apr 12", value: 72 },
    ],
    insights: [
      "Your skin elasticity has improved by 3% in the last 30 days",
      "Elasticity is most improved in the cheek and jaw areas",
      "Current level is better than 75% of people in your age group",
    ],
    recommendations: [
      "Continue using peptide-rich products",
      "Consider adding facial massage to your routine",
      "Maintain consistent use of antioxidants",
    ],
  },
}

export function BiomarkerDetail({ biomarker, onBack }: BiomarkerDetailProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [timeRange, setTimeRange] = useState("30d")

  const info = biomarkerInfo[biomarker]

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2 h-8 w-8 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">{info.title} Analysis</h3>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Current Status</CardTitle>
          <CardDescription>{info.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold" style={{ color: info.color }}>
                  {info.value}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">{info.unit}</span>
              </div>
              <p className="text-sm mt-1 capitalize">{info.status}</p>
            </div>
            <div
              className="h-16 w-16 rounded-full border-4 flex items-center justify-center"
              style={{ borderColor: info.color }}
            >
              <div className="text-sm font-medium">
                {info.status === "good" ? "Good" : info.status === "normal" ? "Normal" : "Needs Work"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Trend Analysis</CardTitle>
              <CardDescription>Historical data</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.5))}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.5))}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className="text-xs">Last 30 days</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-1">
              <Button
                variant={timeRange === "7d" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => setTimeRange("7d")}
              >
                7D
              </Button>
              <Button
                variant={timeRange === "30d" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => setTimeRange("30d")}
              >
                30D
              </Button>
              <Button
                variant={timeRange === "90d" ? "secondary" : "ghost"}
                size="sm"
                className="h-6 text-xs px-2"
                onClick={() => setTimeRange("90d")}
              >
                90D
              </Button>
            </div>
          </div>

          <div className="h-[180px] w-full" style={{ height: `${180 * zoomLevel}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={info.data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
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
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={info.color}
                  fill={`${info.color}20`}
                  strokeWidth={2}
                  name={info.title}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-medium">Key Insights</h4>
            <ul className="text-xs space-y-1">
              {info.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="rounded-full h-1.5 w-1.5 mt-1.5" style={{ backgroundColor: info.color }}></div>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recommendations</CardTitle>
          <CardDescription>Based on your {info.title.toLowerCase()} analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-xs space-y-2">
            {info.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 pb-2 border-b last:border-0 last:pb-0">
                <div className="rounded-full h-5 w-5 flex items-center justify-center bg-gray-100 mt-0.5">
                  <span className="text-xs">{index + 1}</span>
                </div>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
