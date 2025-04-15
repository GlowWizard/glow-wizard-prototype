"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp, Minus, ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

interface BiomarkerCardProps {
  title: string
  value: number
  unit: string
  status: "good" | "normal" | "caution" | "warning"
  icon: ReactNode
  description: string
  change: number
  onClick?: () => void
}

export function BiomarkerCard({ title, value, unit, status, icon, description, change, onClick }: BiomarkerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-700"
      case "normal":
        return "bg-blue-100 text-blue-700"
      case "caution":
        return "bg-amber-100 text-amber-700"
      case "warning":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500"
      case "normal":
        return "bg-blue-500"
      case "caution":
        return "bg-amber-500"
      case "warning":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <ArrowUp className="h-3 w-3 text-green-500" />
    } else if (change < 0) {
      return <ArrowDown className="h-3 w-3 text-red-500" />
    }
    return <Minus className="h-3 w-3 text-gray-500" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) {
      return "text-green-500"
    } else if (change < 0) {
      return "text-red-500"
    }
    return "text-gray-500"
  }

  return (
    <Card className="overflow-hidden" onClick={onClick}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full p-1.5 bg-gray-100">{icon}</div>
            <div>
              <div className="flex items-center">
                <h3 className="text-sm font-medium">{title}</h3>
                <div className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(status)}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="mt-2 space-y-1">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline">
              <span className="text-lg font-bold">{value}</span>
              <span className="ml-1 text-xs text-muted-foreground">{unit}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              {getChangeIcon(change)}
              <span className={getChangeColor(change)}>
                {change > 0 ? "+" : ""}
                {change}
                {unit}
              </span>
            </div>
          </div>
          <Progress
            value={value}
            max={100}
            className="h-1.5 bg-gray-100"
            indicatorClassName={getProgressColor(status)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
