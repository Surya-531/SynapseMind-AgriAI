"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, CheckCircle } from "lucide-react"

interface CropSuitabilityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CropSuitabilityModal({ open, onOpenChange }: CropSuitabilityModalProps) {
  const [formData, setFormData] = useState({
    soilPH: "",
    moisture: "",
    temperature: "",
    rainfall: "",
  })
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    setShowResult(true)
  }

  const handleReset = () => {
    setFormData({ soilPH: "", moisture: "", temperature: "", rainfall: "" })
    setShowResult(false)
  }

  const handleClose = () => {
    handleReset()
    onOpenChange(false)
  }

  if (showResult) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Crop Recommendation Result
            </DialogTitle>
          </DialogHeader>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Recommended Crop: Groundnut</CardTitle>
              <CardDescription>Based on your soil conditions and climate data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Fertilizer Mix:</h4>
                <p className="text-sm text-muted-foreground">NPK 10-26-26 at 200kg/hectare during planting</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Irrigation Schedule:</h4>
                <p className="text-sm text-muted-foreground">Water every 7-10 days, 25-30mm per irrigation</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Potential Risks:</h4>
                <p className="text-sm text-muted-foreground">Monitor for leaf spot disease during humid conditions</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Verify on ICP Blockchain</Button>
                <Button variant="outline" onClick={handleReset} className="bg-transparent">
                  New Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Crop Suitability Advisor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="soilPH">Soil pH Level</Label>
            <Input
              id="soilPH"
              type="number"
              step="0.1"
              min="0"
              max="14"
              placeholder="e.g., 6.5"
              value={formData.soilPH}
              onChange={(e) => setFormData({ ...formData, soilPH: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="moisture">Soil Moisture (%)</Label>
            <Input
              id="moisture"
              type="number"
              min="0"
              max="100"
              placeholder="e.g., 25"
              value={formData.moisture}
              onChange={(e) => setFormData({ ...formData, moisture: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="temperature">Average Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              placeholder="e.g., 28"
              value={formData.temperature}
              onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
            <Input
              id="rainfall"
              type="number"
              placeholder="e.g., 800"
              value={formData.rainfall}
              onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Analyzing..." : "Get Recommendation"}
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
