"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, CheckCircle } from "lucide-react"

interface YieldPredictorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function YieldPredictorModal({ open, onOpenChange }: YieldPredictorModalProps) {
  const [formData, setFormData] = useState({
    cropType: "",
    fieldSize: "",
    plantingDate: "",
    irrigationType: "",
    fertilizer: "",
  })
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setLoading(false)
    setShowResult(true)
  }

  const handleReset = () => {
    setFormData({ cropType: "", fieldSize: "", plantingDate: "", irrigationType: "", fertilizer: "" })
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
              <CheckCircle className="h-5 w-5 text-accent" />
              Yield Prediction Result
            </DialogTitle>
          </DialogHeader>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-accent">Predicted Yield: 3.2 tons/hectare</CardTitle>
              <CardDescription>Based on current seasonal conditions and farming practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Yield Breakdown:</h4>
                <p className="text-sm text-muted-foreground">
                  Expected total harvest: {(Number.parseFloat(formData.fieldSize) * 3.2).toFixed(1)} tons
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Confidence Level:</h4>
                <p className="text-sm text-muted-foreground">
                  87% accuracy based on historical data and weather patterns
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Optimization Tips:</h4>
                <p className="text-sm text-muted-foreground">
                  Increase irrigation frequency by 15% during flowering stage to potentially boost yield by 0.3
                  tons/hectare
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Verify on ICP Blockchain</Button>
                <Button variant="outline" onClick={handleReset} className="bg-transparent">
                  New Prediction
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
            <TrendingUp className="h-5 w-5 text-accent" />
            Yield Predictor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cropType">Crop Type</Label>
            <Select value={formData.cropType} onValueChange={(value) => setFormData({ ...formData, cropType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="groundnut">Groundnut</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fieldSize">Field Size (hectares)</Label>
            <Input
              id="fieldSize"
              type="number"
              step="0.1"
              min="0"
              placeholder="e.g., 2.5"
              value={formData.fieldSize}
              onChange={(e) => setFormData({ ...formData, fieldSize: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="plantingDate">Planting Date</Label>
            <Input
              id="plantingDate"
              type="date"
              value={formData.plantingDate}
              onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="irrigationType">Irrigation Type</Label>
            <Select
              value={formData.irrigationType}
              onValueChange={(value) => setFormData({ ...formData, irrigationType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select irrigation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drip">Drip Irrigation</SelectItem>
                <SelectItem value="sprinkler">Sprinkler</SelectItem>
                <SelectItem value="flood">Flood Irrigation</SelectItem>
                <SelectItem value="rainfed">Rain-fed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fertilizer">Fertilizer Used</Label>
            <Select
              value={formData.fertilizer}
              onValueChange={(value) => setFormData({ ...formData, fertilizer: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fertilizer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="npk">NPK Chemical</SelectItem>
                <SelectItem value="urea">Urea</SelectItem>
                <SelectItem value="mixed">Mixed (Organic + Chemical)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Predicting Yield..." : "Predict Yield"}
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
