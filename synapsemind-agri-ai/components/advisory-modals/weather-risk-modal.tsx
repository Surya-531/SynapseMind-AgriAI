"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRain, CheckCircle, AlertTriangle, Sun, Droplets } from "lucide-react"

interface WeatherRiskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WeatherRiskModal({ open, onOpenChange }: WeatherRiskModalProps) {
  const [formData, setFormData] = useState({
    location: "",
    cropType: "",
  })
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    setShowResult(true)
  }

  const handleReset = () => {
    setFormData({ location: "", cropType: "" })
    setShowResult(false)
  }

  const handleClose = () => {
    handleReset()
    onOpenChange(false)
  }

  if (showResult) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-chart-3" />
              Weather & Risk Assessment
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Weather Forecast */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Sun className="h-5 w-5" />
                  7-Day Weather Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium">Today</p>
                    <p className="text-blue-600">28°C</p>
                    <p className="text-muted-foreground">Sunny</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Tomorrow</p>
                    <p className="text-blue-600">26°C</p>
                    <p className="text-muted-foreground">Cloudy</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Day 3</p>
                    <p className="text-blue-600">24°C</p>
                    <p className="text-muted-foreground">Light Rain</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Day 4-7</p>
                    <p className="text-blue-600">25-27°C</p>
                    <p className="text-muted-foreground">Partly Cloudy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Pest Risk: Moderate</h4>
                  <p className="text-sm text-muted-foreground">
                    Aphid activity expected to increase due to humid conditions. Monitor crops closely.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Disease Risk: Low</h4>
                  <p className="text-sm text-muted-foreground">
                    Current weather conditions are not favorable for fungal diseases.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Irrigation Recommendation:</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduce watering by 30% due to expected rainfall on Day 3.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Droplets className="h-5 w-5" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Apply preventive pest control spray before Day 2
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Harvest mature crops before expected rainfall
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    Check drainage systems to prevent waterlogging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">Verify on ICP Blockchain</Button>
              <Button variant="outline" onClick={handleReset} className="bg-transparent">
                New Assessment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-chart-3" />
            Weather & Risk Advisor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="location">Farm Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., Chennai, Tamil Nadu"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="cropType">Primary Crop</Label>
            <Input
              id="cropType"
              type="text"
              placeholder="e.g., Rice, Wheat, Cotton"
              value={formData.cropType}
              onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
              required
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">What you'll get:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 7-day weather forecast</li>
              <li>• Pest and disease risk assessment</li>
              <li>• Irrigation recommendations</li>
              <li>• Preventive action suggestions</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Analyzing Weather..." : "Get Weather Report"}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} className="bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
