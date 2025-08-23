"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, CheckCircle, Leaf, Beaker, Camera, Shield } from "lucide-react"

interface AdvisoryHistoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockHistory = [
  {
    id: "ADV-001",
    type: "Crop Suitability",
    title: "Groundnut Recommendation",
    date: "2024-01-15",
    status: "verified",
    icon: Leaf,
    result: "Recommended groundnut cultivation based on soil pH 6.8 and moisture 25%",
    confidence: "94%",
  },
  {
    id: "ADV-002",
    type: "Disease Detection",
    title: "Leaf Spot Detected",
    date: "2024-01-12",
    status: "pending",
    icon: Camera,
    result: "Detected leaf spot disease with 89% confidence. Treatment plan provided.",
    confidence: "89%",
  },
  {
    id: "ADV-003",
    type: "Fertilizer Plan",
    title: "NPK Fertilizer Schedule",
    date: "2024-01-10",
    status: "verified",
    icon: Beaker,
    result: "Custom fertilizer plan for rice cultivation - NPK 12-32-16 recommended",
    confidence: "96%",
  },
  {
    id: "ADV-004",
    type: "Weather Risk",
    title: "Pest Risk Assessment",
    date: "2024-01-08",
    status: "verified",
    icon: Shield,
    result: "Moderate pest risk identified. Preventive measures recommended.",
    confidence: "91%",
  },
]

export function AdvisoryHistoryModal({ open, onOpenChange }: AdvisoryHistoryModalProps) {
  const [selectedAdvisory, setSelectedAdvisory] = useState<string | null>(null)

  const handleVerifyOnICP = (advisoryId: string) => {
    // Simulate ICP blockchain verification
    console.log(`Verifying advisory ${advisoryId} on ICP blockchain`)
    alert(`Advisory ${advisoryId} verification initiated on ICP blockchain`)
  }

  const handleClose = () => {
    setSelectedAdvisory(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-chart-4" />
            Advisory History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-primary">24</CardTitle>
                <CardDescription className="text-sm">Total Advisories</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-green-600">18</CardTitle>
                <CardDescription className="text-sm">Verified on ICP</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-blue-600">93%</CardTitle>
                <CardDescription className="text-sm">Avg. Accuracy</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Advisory List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Advisories</h3>
            {mockHistory.map((advisory) => {
              const IconComponent = advisory.icon
              return (
                <Card key={advisory.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{advisory.title}</h4>
                            <Badge variant={advisory.status === "verified" ? "default" : "secondary"}>
                              {advisory.status === "verified" ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </>
                              ) : (
                                "Pending"
                              )}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{advisory.result}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>ID: {advisory.id}</span>
                            <span>Date: {advisory.date}</span>
                            <span>Confidence: {advisory.confidence}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant={advisory.status === "verified" ? "outline" : "default"}
                          onClick={() => handleVerifyOnICP(advisory.id)}
                          className="bg-transparent"
                        >
                          {advisory.status === "verified" ? "Re-verify on ICP" : "Verify on ICP"}
                        </Button>
                        <Button size="sm" variant="ghost">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Load More */}
          <div className="text-center pt-4">
            <Button variant="outline" className="bg-transparent">
              Load More Advisories
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
