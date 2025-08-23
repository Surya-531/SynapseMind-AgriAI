"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Beaker, CheckCircle } from "lucide-react"

interface FertilizerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FertilizerModal({ open, onOpenChange }: FertilizerModalProps) {
  const [formData, setFormData] = useState({
    cropType: "",
    growthStage: "",
    soilType: "",
    fieldSize: "",
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
    setFormData({ cropType: "", growthStage: "", soilType: "", fieldSize: "" })
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
              <CheckCircle className="h-5 w-5 text-secondary" />
              Fertilizer Plan Result
            </DialogTitle>
          </DialogHeader>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="text-secondary">Custom Fertilizer Plan</CardTitle>
              <CardDescription>
                Optimized for {formData.cropType} at {formData.growthStage} stage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Primary Application:</h4>
                <p className="text-sm text-muted-foreground">NPK 12-32-16 at 150kg/hectare during planting</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Secondary Application:</h4>
                <p className="text-sm text-muted-foreground">Urea 46% at 50kg/hectare after 4 weeks</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Micronutrients:</h4>
                <p className="text-sm text-muted-foreground">Zinc sulfate 25kg/hectare, Boron 2kg/hectare</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Verify on ICP Blockchain</Button>
                <Button variant="outline" onClick={handleReset} className="bg-transparent">
                  New Plan
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
            <Beaker className="h-5 w-5 text-secondary" />
            Fertilizer Advisor
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
            <Label htmlFor="growthStage">Growth Stage</Label>
            <Select
              value={formData.growthStage}
              onValueChange={(value) => setFormData({ ...formData, growthStage: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select growth stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seedling">Seedling</SelectItem>
                <SelectItem value="vegetative">Vegetative</SelectItem>
                <SelectItem value="flowering">Flowering</SelectItem>
                <SelectItem value="fruiting">Fruiting</SelectItem>
                <SelectItem value="maturity">Maturity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="soilType">Soil Type</Label>
            <Select value={formData.soilType} onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">Clay</SelectItem>
                <SelectItem value="sandy">Sandy</SelectItem>
                <SelectItem value="loamy">Loamy</SelectItem>
                <SelectItem value="silt">Silt</SelectItem>
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

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating Plan..." : "Get Fertilizer Plan"}
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
