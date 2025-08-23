"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Beaker, TrendingUp, Camera, CloudRain, History, ArrowRight } from "lucide-react"
import { CropSuitabilityModal } from "@/components/advisory-modals/crop-suitability-modal"
import { FertilizerModal } from "@/components/advisory-modals/fertilizer-modal"
import { DiseaseDetectorModal } from "@/components/advisory-modals/disease-detector-modal"
import { YieldPredictorModal } from "@/components/advisory-modals/yield-predictor-modal"
import { WeatherRiskModal } from "@/components/advisory-modals/weather-risk-modal"
import { AdvisoryHistoryModal } from "@/components/advisory-modals/advisory-history-modal"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import { Gradient3DBackground } from "@/components/gradient-3d-background"

export default function DashboardPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const { t } = useLanguage()
  const { theme } = useTheme()

  const advisoryCards = [
    {
      id: "crop-suitability",
      title: t("cropSuitabilityAdvisor"),
      description: t("cropSuitabilityDesc"),
      icon: Leaf,
      color: "bg-primary/20 text-primary border-primary/30",
      hoverColor: "hover:bg-primary/30",
    },
    {
      id: "fertilizer-advisor",
      title: t("fertilizerAdvisor"),
      description: t("fertilizerDesc"),
      icon: Beaker,
      color: "bg-secondary/20 text-secondary border-secondary/30",
      hoverColor: "hover:bg-secondary/30",
    },
    {
      id: "yield-predictor",
      title: t("yieldPredictor"),
      description: t("yieldPredictorDesc"),
      icon: TrendingUp,
      color: "bg-accent/20 text-accent border-accent/30",
      hoverColor: "hover:bg-accent/30",
    },
    {
      id: "disease-detector",
      title: t("diseaseDetector"),
      description: t("diseaseDetectorDesc"),
      icon: Camera,
      color: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      hoverColor: "hover:bg-chart-2/30",
    },
    {
      id: "weather-risk",
      title: t("weatherRiskAdvisor"),
      description: t("weatherRiskDesc"),
      icon: CloudRain,
      color: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      hoverColor: "hover:bg-chart-3/30",
    },
    {
      id: "advisory-history",
      title: t("advisoryHistory"),
      description: t("advisoryHistoryDesc"),
      icon: History,
      color: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      hoverColor: "hover:bg-chart-4/30",
    },
  ]

  const handleCardClick = (cardId: string) => {
    setActiveModal(cardId)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
  }

  return (
    <>
      <Gradient3DBackground />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Dashboard Header */}
        <div className="mb-8 text-center">
          <div className="bg-background/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("dashboardTitle")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("dashboardSubtitle")}</p>
          </div>
        </div>

        {/* Advisory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {advisoryCards.map((card) => {
            const IconComponent = card.icon
            return (
              <Card
                key={card.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-background/20 backdrop-blur-md border border-white/20 shadow-xl ${card.hoverColor} group`}
                onClick={() => handleCardClick(card.id)}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${card.color} backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors text-foreground">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary/20 group-hover:text-primary transition-colors backdrop-blur-sm"
                  >
                    {t("getAdvisory")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-primary/10 backdrop-blur-md border border-primary/30 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">150+</CardTitle>
              <CardDescription className="text-muted-foreground">{t("advisoriesGenerated")}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-secondary/10 backdrop-blur-md border border-secondary/30 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-secondary">98%</CardTitle>
              <CardDescription className="text-muted-foreground">{t("accuracyRate")}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-accent/10 backdrop-blur-md border border-accent/30 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-accent">24/7</CardTitle>
              <CardDescription className="text-muted-foreground">{t("aiSupport")}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("recentActivity")}
          </h2>
          <div className="space-y-4">
            <Card className="bg-background/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t("cropSuitabilityAdvisor")}</p>
                    <p className="text-sm text-muted-foreground">Recommended: Groundnut for your soil conditions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 bg-background/20 backdrop-blur-sm border-white/20"
                  >
                    {t("viewDetails")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-secondary/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                    <CloudRain className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t("weatherRiskAdvisor")}</p>
                    <p className="text-sm text-muted-foreground">Moderate pest risk detected for next week</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 bg-background/20 backdrop-blur-sm border-white/20"
                  >
                    {t("viewDetails")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal Components */}
        <CropSuitabilityModal
          open={activeModal === "crop-suitability"}
          onOpenChange={(open) => !open && handleCloseModal()}
        />
        <FertilizerModal
          open={activeModal === "fertilizer-advisor"}
          onOpenChange={(open) => !open && handleCloseModal()}
        />
        <DiseaseDetectorModal
          open={activeModal === "disease-detector"}
          onOpenChange={(open) => !open && handleCloseModal()}
        />
        <YieldPredictorModal
          open={activeModal === "yield-predictor"}
          onOpenChange={(open) => !open && handleCloseModal()}
        />
        <WeatherRiskModal open={activeModal === "weather-risk"} onOpenChange={(open) => !open && handleCloseModal()} />
        <AdvisoryHistoryModal
          open={activeModal === "advisory-history"}
          onOpenChange={(open) => !open && handleCloseModal()}
        />
      </div>
    </>
  )
}
