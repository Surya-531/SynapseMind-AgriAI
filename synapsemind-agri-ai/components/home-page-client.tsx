"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Brain, Users, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Gradient3DBackground } from "@/components/gradient-3d-background"

export function HomePageClient() {
  const { t } = useLanguage()

  return (
    <>
      <Gradient3DBackground />
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("heroTitle")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed backdrop-blur-sm bg-background/30 rounded-lg p-4">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-primary/80 backdrop-blur-md border border-white/20 hover:bg-primary/90 shadow-lg"
              >
                <Link href="/dashboard">{t("startAdvisory")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-background/20 backdrop-blur-md border border-white/30 hover:bg-background/30 shadow-lg"
              >
                <Link href="/about">{t("learnMore")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("featuresTitle")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto backdrop-blur-sm bg-background/20 rounded-lg p-4">
                {t("featuresSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-background/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{t("cropSuitabilityTitle")}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t("cropSuitabilityDesc")}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-background/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-background/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/20 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-foreground">{t("yieldPredictionTitle")}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t("yieldPredictionDesc")}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-background/20 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-background/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/20 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-foreground">{t("expertAdvisoryTitle")}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t("expertAdvisoryDesc")}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <div className="bg-background/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("ctaTitle")}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">{t("ctaSubtitle")}</p>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-primary/80 backdrop-blur-md border border-white/20 hover:bg-primary/90 shadow-lg"
              >
                <Link href="/dashboard">{t("getStartedNow")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
