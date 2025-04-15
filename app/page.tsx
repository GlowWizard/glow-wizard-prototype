"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Calendar,
  Camera,
  ChevronRight,
  Clock,
  Droplets,
  History,
  Info,
  Layers,
  Shield,
  Sun,
  User,
  Zap,
  Droplet,
  Palette,
  Sparkles,
} from "lucide-react"
import { SkinHealthChart } from "@/components/skin-health-chart"
import { BiomarkerCard } from "@/components/biomarker-card"
import { SkinScoreGauge } from "@/components/skin-score-gauge"
import { BiomarkerDetail } from "@/components/biomarker-detail"
import { useState } from "react"

export default function SkinAnalysisPage() {
  const [selectedBiomarker, setSelectedBiomarker] = useState(null)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-teal-600" />
            <h1 className="text-xl font-semibold">SkinScan</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Info className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-4 px-4">
        <div className="container max-w-md mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Skin Analysis</h2>
              <Button variant="outline" size="sm" className="gap-1">
                <Camera className="h-4 w-4" />
                New Scan
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Overall Skin Health</CardTitle>
                <CardDescription>Based on 7 key biomarkers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-2">
                  <SkinScoreGauge score={76} />
                  <div className="mt-2 text-center">
                    <p className="text-sm text-muted-foreground">Your skin health is good</p>
                    <p className="text-xs text-muted-foreground mt-1">Last updated: Today, 9:30 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="biomarkers" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="biomarkers" className="mt-4 space-y-4">
                {selectedBiomarker ? (
                  <BiomarkerDetail biomarker={selectedBiomarker} onBack={() => setSelectedBiomarker(null)} />
                ) : (
                  <div className="grid gap-3">
                    <BiomarkerCard
                      title="Redness"
                      value={32}
                      unit="%"
                      status="good"
                      icon={<Palette className="h-4 w-4" />}
                      description="Inflammation level"
                      change={-5}
                      onClick={() => setSelectedBiomarker("redness")}
                    />
                    <BiomarkerCard
                      title="Wrinkles"
                      value={45}
                      unit="%"
                      status="normal"
                      icon={<Activity className="h-4 w-4" />}
                      description="Fine lines & wrinkles"
                      change={-2}
                      onClick={() => setSelectedBiomarker("wrinkles")}
                    />
                    <BiomarkerCard
                      title="Pores"
                      value={38}
                      unit="%"
                      status="good"
                      icon={<Layers className="h-4 w-4" />}
                      description="Pore size & visibility"
                      change={-3}
                      onClick={() => setSelectedBiomarker("pores")}
                    />
                    <BiomarkerCard
                      title="Hydration"
                      value={68}
                      unit="%"
                      status="normal"
                      icon={<Droplets className="h-4 w-4" />}
                      description="Skin moisture content"
                      change={+4}
                      onClick={() => setSelectedBiomarker("hydration")}
                    />
                    <BiomarkerCard
                      title="Oiliness"
                      value={52}
                      unit="%"
                      status="caution"
                      icon={<Droplet className="h-4 w-4" />}
                      description="Sebum production"
                      change={+2}
                      onClick={() => setSelectedBiomarker("oiliness")}
                    />
                    <BiomarkerCard
                      title="Pigmentation"
                      value={41}
                      unit="%"
                      status="normal"
                      icon={<Sun className="h-4 w-4" />}
                      description="Melanin distribution"
                      change={-1}
                      onClick={() => setSelectedBiomarker("pigmentation")}
                    />
                    <BiomarkerCard
                      title="Elasticity"
                      value={72}
                      unit="%"
                      status="good"
                      icon={<Zap className="h-4 w-4" />}
                      description="Skin firmness"
                      change={+3}
                      onClick={() => setSelectedBiomarker("elasticity")}
                    />
                  </div>
                )}
              </TabsContent>
              <TabsContent value="trends" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Biomarker Trends</CardTitle>
                    <CardDescription>30-day analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkinHealthChart />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Droplets className="h-3 w-3 mr-1" />
                        Hydration
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Palette className="h-3 w-3 mr-1" />
                        Redness
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Droplet className="h-3 w-3 mr-1" />
                        Oiliness
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Zap className="h-3 w-3 mr-1" />
                        Elasticity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Scan History</CardTitle>
                    <CardDescription>Previous analyses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: "Today, 9:30 AM", score: 76 },
                        { date: "Yesterday, 8:45 PM", score: 75 },
                        { date: "Apr 12, 2025, 10:15 AM", score: 73 },
                        { date: "Apr 10, 2025, 9:00 AM", score: 71 },
                        { date: "Apr 7, 2025, 8:30 PM", score: 70 },
                      ].map((scan, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div className="flex items-center gap-3">
                            <History className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{scan.date}</p>
                              <p className="text-xs text-muted-foreground">Score: {scan.score}/100</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="mt-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recommendations</CardTitle>
                <CardDescription>Based on your analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-amber-500" />
                      Reduce Oiliness
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Consider using oil-control products and a gentle cleanser twice daily.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      Maintain Hydration
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Continue using hyaluronic acid serum and increase water intake.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      Weekly Exfoliation
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Add a gentle chemical exfoliant 1-2 times weekly to improve texture.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-4">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex justify-around">
            <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
              <Activity className="h-5 w-5 mb-1" />
              <span className="text-xs">Dashboard</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Calendar</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
              <Camera className="h-5 w-5 mb-1" />
              <span className="text-xs">Scan</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-xs">History</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
