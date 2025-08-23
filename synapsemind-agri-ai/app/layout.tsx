import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Manrope } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/contexts/theme-context"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "SynapseMind AgriAI - Smart Farming Advisory",
  description: "AI-powered agricultural advisory platform for modern farmers",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${manrope.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${manrope.style.fontFamily}, ${GeistSans.style.fontFamily};
  --font-sans: ${manrope.variable};
  --font-mono: ${GeistSans.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
