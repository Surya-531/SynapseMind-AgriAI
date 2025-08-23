"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Brain, Shield, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: CheckCircle,
      title: t("accurateRecommendations"),
      description: t("accurateRecommendationsDesc"),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Clock,
      title: t("realTimeInsights"),
      description: t("realTimeInsightsDesc"),
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Shield,
      title: t("blockchainVerification"),
      description: t("blockchainVerificationDesc"),
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Users,
      title: t("expertSupport"),
      description: t("expertSupportDesc"),
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t("aboutTitle")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("aboutSubtitle")}</p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl text-primary mb-4">{t("ourMissionTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              {t("ourMissionDesc")}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("howItWorksTitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("howItWorksDesc")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Data Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gather soil, weather, and crop data from multiple reliable sources and sensors
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-secondary/50 transition-colors">
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced machine learning algorithms process and analyze the collected data
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-accent/50 transition-colors">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive tailored advice and actionable insights for your specific farming needs
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("whyChooseUsTitle")}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <Card className="border-2 border-secondary/20 bg-secondary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl text-secondary mb-4">{t("ourTeamTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              {t("ourTeamDesc")}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">10,000+</CardTitle>
              <CardDescription>Active Farmers</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-secondary/5 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-secondary">98%</CardTitle>
              <CardDescription>Accuracy Rate</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-accent">50+</CardTitle>
              <CardDescription>Crop Types</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center bg-chart-2/5 border-chart-2/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-chart-2">24/7</CardTitle>
              <CardDescription>AI Support</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}
