"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Leaf, Globe, Sun, Moon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

const languages = [
  { code: "en" as const, name: "English", flag: "🇺🇸" },
  { code: "ta" as const, name: "தமிழ்", flag: "🇮🇳" },
  { code: "hi" as const, name: "हिंदी", flag: "🇮🇳" },
]

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/dashboard", label: t("dashboard") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/20 backdrop-blur-md rounded-lg border border-white/20">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SynapseMind AgriAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Language Toggle & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="hidden sm:flex bg-background/20 backdrop-blur-sm border-white/20 hover:bg-background/30"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex bg-background/20 backdrop-blur-sm border-white/20 hover:bg-background/30"
              >
                <Globe className="h-4 w-4 mr-2" />
                {languages.find((lang) => lang.code === language)?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-md border-white/20">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="flex items-center space-x-2 hover:bg-background/50"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden bg-background/20 backdrop-blur-sm border-white/20"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-background/80 backdrop-blur-md border-white/20"
            >
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Theme Toggle */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Theme</p>
                  <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start mb-2">
                    {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </Button>
                </div>

                {/* Mobile Language Toggle */}
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-2">Language</p>
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setLanguage(lang.code)}
                      className="w-full justify-start mb-1"
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
