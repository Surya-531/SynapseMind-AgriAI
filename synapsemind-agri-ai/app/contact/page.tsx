"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t("contactTitle")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("contactSubtitle")}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t("contactFormTitle")}</CardTitle>
              <CardDescription className="text-base">{t("getInTouchDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t("nameLabel")}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("emailLabel")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t("phoneLabel")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t("messageLabel")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your farming needs or questions..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6">
                  {isSubmitting ? "Sending..." : t("sendMessage")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card className="border-2 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary">{t("contactInfoTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("emailAddress")}</h3>
                  <p className="text-muted-foreground">support@synapsemind-agri.ai</p>
                  <p className="text-muted-foreground">partnerships@synapsemind-agri.ai</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("phoneNumber")}</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-muted-foreground">+91 87654 32109</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("officeAddress")}</h3>
                  <p className="text-muted-foreground">
                    123 Innovation Hub
                    <br />
                    Tech Park, Chennai
                    <br />
                    Tamil Nadu 600001, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t("businessHours")}</h3>
                  <p className="text-muted-foreground">{t("mondayToFriday")}</p>
                  <p className="text-muted-foreground">{t("saturday")}</p>
                  <p className="text-muted-foreground">{t("sunday")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="text-xl text-accent">{t("followUs")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <Instagram className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border-2 border-chart-3/20 bg-chart-3/5">
            <CardHeader>
              <CardTitle className="text-xl">Quick Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Need immediate assistance? Our AI support is available 24/7 to help with your farming questions.
              </p>
              <Button className="w-full">Start AI Chat Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
