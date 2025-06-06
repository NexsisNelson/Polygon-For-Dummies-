"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ThreeDPolygonLogo from "@/components/three-d-polygon-logo"
import { PolygonIcon } from "@/components/polygon-icon"
import { useAuth } from "@/lib/auth-context"

export default function HeroSection() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleButtonClick = (path: string) => {
    if (isAuthenticated) {
      router.push(path)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-black to-purple-950 py-16 sm:py-24">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 flex items-center">
              <PolygonIcon className="w-12 h-12 mr-4" />
              <span>
                <span className="block">Polygon Network</span>
                <span className="block text-purple-400">for Dummies</span>
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Learn about Web3 and the Polygon Network through fun, interactive games and challenges. No technical
              background required!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => handleButtonClick("/learn")}
              >
                Start Learning
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500 text-purple-400 hover:bg-purple-950"
                onClick={() => handleButtonClick("/games")}
              >
                Play Games
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] w-full">
          <ThreeDPolygonLogo />
        </div>
      </div>
    </div>
  )
}
