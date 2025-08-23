"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"

export function Gradient3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createGradient = (x: number, y: number, radius: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)

      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)") // Green
        gradient.addColorStop(0.3, "rgba(59, 130, 246, 0.2)") // Blue
        gradient.addColorStop(0.6, "rgba(20, 184, 166, 0.15)") // Teal
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      } else {
        gradient.addColorStop(0, "rgba(34, 197, 94, 0.15)") // Green
        gradient.addColorStop(0.3, "rgba(59, 130, 246, 0.1)") // Blue
        gradient.addColorStop(0.6, "rgba(20, 184, 166, 0.08)") // Teal
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      }

      return gradient
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.005

      // Create multiple flowing gradients
      const gradients = [
        {
          x: canvas.width * 0.2 + Math.sin(time) * 200,
          y: canvas.height * 0.3 + Math.cos(time * 0.8) * 150,
          radius: 300 + Math.sin(time * 0.5) * 100,
        },
        {
          x: canvas.width * 0.8 + Math.cos(time * 1.2) * 250,
          y: canvas.height * 0.7 + Math.sin(time * 0.6) * 200,
          radius: 400 + Math.cos(time * 0.3) * 120,
        },
        {
          x: canvas.width * 0.5 + Math.sin(time * 0.4) * 300,
          y: canvas.height * 0.1 + Math.cos(time * 1.1) * 100,
          radius: 250 + Math.sin(time * 0.7) * 80,
        },
      ]

      gradients.forEach((grad) => {
        ctx.fillStyle = createGradient(grad.x, grad.y, grad.radius)
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: theme === "dark" ? "#0a0a0a" : "#fafafa" }}
    />
  )
}
