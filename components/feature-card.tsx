"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Coins, BracketsIcon as Bridge, Fuel, ImageIcon, Shield, type LucideIcon } from "lucide-react"
import { PolygonLogo } from "@/components/polygon-logo"

// Map of icon names to their components
const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Coins,
  Bridge,
  Fuel,
  ImageIcon,
  Shield,
}

// Map of feature titles to their background images and gradient colors
const featureBackgrounds: Record<string, { image: string; gradient: string }> = {
  "Polygon Basics": {
    image: "/images/polygon-network.jpg",
    gradient: "from-purple-600 to-blue-600",
  },
  "Token Toss": {
    image: "/images/token-toss.jpg",
    gradient: "from-yellow-400 to-orange-500",
  },
  "Bridge Builder": {
    image: "/images/bridge-builder.jpg",
    gradient: "from-green-400 to-blue-500",
  },
  "Gas Racer": {
    image: "/images/gas-racer.jpg",
    gradient: "from-red-500 to-pink-500",
  },
  "NFT Creator": {
    image: "/images/nft-creator.jpg",
    gradient: "from-indigo-400 to-purple-500",
  },
  "Validator Simulator": {
    image: "/images/validator-simulator.jpg",
    gradient: "from-blue-400 to-teal-500",
  },
}

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  onClick: () => void
}

export default function FeatureCard({ title, description, icon, onClick }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  // Use the icon from our map, or default to BookOpen if not found
  const Icon = iconMap[icon] || BookOpen

  const background = featureBackgrounds[title] || {
    image: "/images/default-background.jpg",
    gradient: "from-gray-600 to-gray-800",
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 20,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <Card className="overflow-hidden h-full relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${background.image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${background.gradient} opacity-80 z-10`} />
        <CardContent className="p-6 pt-8 relative z-20">
          <div className="mb-4 flex justify-center">
            <motion.div
              animate={{
                y: isHovered ? [0, -10, 0] : 0,
                rotateZ: isHovered ? [0, -5, 5, 0] : 0,
              }}
              transition={{
                duration: 1,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                repeatType: "loop",
              }}
              className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
            >
              {title === "Polygon Basics" ? (
                <PolygonLogo className="w-10 h-10" />
              ) : (
                <Icon className="w-8 h-8 text-white" />
              )}
            </motion.div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 text-center">{title}</h3>
          <p className="text-white text-center">{description}</p>
        </CardContent>

        <CardFooter className="p-6 pt-0 relative z-20">
          <Button
            variant="secondary"
            className="w-full text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            onClick={onClick}
          >
            Explore
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
