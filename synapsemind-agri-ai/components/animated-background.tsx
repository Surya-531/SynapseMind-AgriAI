"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useTheme } from "@/contexts/theme-context"
import type * as THREE from "three"

function FloatingParticles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 100

  // Generate random positions for particles
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    const isGreen = Math.random() > 0.5
    if (isDark) {
      // Brighter, more neon colors for dark mode
      colors[i * 3] = isGreen ? 0.3 : 0.2 // R
      colors[i * 3 + 1] = isGreen ? 1.0 : 0.6 // G
      colors[i * 3 + 2] = isGreen ? 0.4 : 1.0 // B
    } else {
      // Softer colors for light mode
      colors[i * 3] = isGreen ? 0.2 : 0.1 // R
      colors[i * 3 + 1] = isGreen ? 0.8 : 0.4 // G
      colors[i * 3 + 2] = isGreen ? 0.3 : 0.9 // B
    }
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05

      // Gentle floating motion
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        size={isDark ? 0.08 : 0.05}
        vertexColors
        transparent
        opacity={isDark ? 0.8 : 0.6}
        sizeAttenuation={true}
      />
    </Points>
  )
}

function WaveEffect({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry
      const positions = geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] =
          Math.sin(x * 0.5 + state.clock.elapsedTime) * 0.3 + Math.cos(y * 0.3 + state.clock.elapsedTime * 0.7) * 0.2
      }

      geometry.attributes.position.needsUpdate = true
      geometry.computeVertexNormals()
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshBasicMaterial color={isDark ? "#10b981" : "#22c55e"} transparent opacity={isDark ? 0.15 : 0.1} wireframe />
    </mesh>
  )
}

export function AnimatedBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-tr from-transparent via-primary/20 to-transparent animate-pulse"
              : "bg-gradient-to-tr from-transparent via-primary/10 to-transparent animate-pulse"
          }`}
        />
        <div
          className={`absolute inset-0 ${isDark ? "opacity-50" : "opacity-30"}`}
          style={{
            background: isDark
              ? `
              radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `
              : `
              radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
            `,
            animation: "gradientFlow 15s ease-in-out infinite",
          }}
        />
      </div>

      <div className={`absolute inset-0 ${isDark ? "opacity-60" : "opacity-40"}`}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={isDark ? 0.7 : 0.5} />
          <FloatingParticles isDark={isDark} />
          <WaveEffect isDark={isDark} />
        </Canvas>
      </div>
    </div>
  )
}
