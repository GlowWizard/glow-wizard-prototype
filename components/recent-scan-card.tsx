import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function RecentScanCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Scan</CardTitle>
        <CardDescription>Detailed analysis from today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Skin scan visualization"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Face Scan</p>
                  <p className="text-xs text-white/80">Today, 9:30 AM</p>
                </div>
                <Button variant="secondary" size="sm" className="h-8 gap-1">
                  Details
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-md border p-2">
            <p className="text-xs text-muted-foreground">Detected Issues</p>
            <p className="text-sm font-medium">Mild dehydration</p>
          </div>
          <div className="rounded-md border p-2">
            <p className="text-xs text-muted-foreground">Improvements</p>
            <p className="text-sm font-medium">Barrier function +5%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
