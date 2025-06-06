"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Code, Coins, Shield, Zap, ArrowRight, Rocket, Brain, Globe, Lock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import useSound from "use-sound"
import { toast } from "react-hot-toast"

const courses = [
  {
    id: "polygon-basics",
    title: "Polygon Basics",
    description: "Learn the fundamentals of the Polygon Network",
    icon: <Shield className="w-8 h-8" />,
    difficulty: "Beginner",
    duration: "2 hours",
    color: "bg-purple-600",
    tokenReward: 1000,
  },
  {
    id: "ethereum-fundamentals",
    title: "Ethereum Fundamentals",
    description: "Understand the core concepts of Ethereum",
    icon: <Zap className="w-8 h-8" />,
    difficulty: "Beginner",
    duration: "3 hours",
    color: "bg-blue-600",
    tokenReward: 1500,
  },
  {
    id: "defi-on-polygon",
    title: "DeFi on Polygon",
    description: "Explore decentralized finance applications on Polygon",
    icon: <Coins className="w-8 h-8" />,
    difficulty: "Intermediate",
    duration: "4 hours",
    color: "bg-green-600",
    tokenReward: 2000,
  },
  {
    id: "smart-contracts",
    title: "Smart Contract Development",
    description: "Learn to write and deploy smart contracts on Ethereum and Polygon",
    icon: <Code className="w-8 h-8" />,
    difficulty: "Advanced",
    duration: "6 hours",
    color: "bg-red-600",
    tokenReward: 3000,
  },
  {
    id: "scaling-solutions",
    title: "Blockchain Scaling Solutions",
    description: "Compare different scaling solutions including Polygon",
    icon: <Rocket className="w-8 h-8" />,
    difficulty: "Intermediate",
    duration: "3 hours",
    color: "bg-yellow-600",
    tokenReward: 1800,
  },
  {
    id: "crypto-economics",
    title: "Crypto Economics",
    description: "Understand the economic principles behind cryptocurrencies",
    icon: <Brain className="w-8 h-8" />,
    difficulty: "Intermediate",
    duration: "4 hours",
    color: "bg-pink-600",
    tokenReward: 2200,
  },
  {
    id: "web3-development",
    title: "Web3 Development",
    description: "Build decentralized applications (dApps) on Ethereum and Polygon",
    icon: <Globe className="w-8 h-8" />,
    difficulty: "Advanced",
    duration: "8 hours",
    color: "bg-indigo-600",
    tokenReward: 4000,
  },
  {
    id: "blockchain-security",
    title: "Blockchain Security",
    description: "Learn about security best practices in blockchain development",
    icon: <Lock className="w-8 h-8" />,
    difficulty: "Advanced",
    duration: "5 hours",
    color: "bg-orange-600",
    tokenReward: 2500,
  },
]

export default function LearnPage() {
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null)
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 })
  const [playSelect] = useSound("/sounds/select.mp3", { volume: 0.5 })

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("courseProgress")
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    } else {
      // Initialize progress if not found in localStorage
      const initialProgress = courses.reduce(
        (acc, course) => {
          acc[course.id] = 0
          return acc
        },
        {} as Record<string, number>,
      )
      setProgress(initialProgress)
      localStorage.setItem("courseProgress", JSON.stringify(initialProgress))
    }
  }, [])

  const resetProgress = () => {
    const resetProgress = courses.reduce(
      (acc, course) => {
        acc[course.id] = 0
        return acc
      },
      {} as Record<string, number>,
    )
    setProgress(resetProgress)
    localStorage.setItem("courseProgress", JSON.stringify(resetProgress))
    toast.success("Course progress has been reset!")
  }

  return (
    <div className="min-h-screen dark flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" className="text-purple-400 text-lg">
                <ArrowLeft className="mr-2 h-6 w-6" /> Back to Home
              </Button>
            </Link>
            <Button variant="outline" className="text-red-400 border-red-400" onClick={resetProgress}>
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Progress
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Learning Journey</h1>
            <p className="text-xl text-gray-400">Explore our courses and level up your blockchain skills</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => {
                    setHoveredCourse(course.id)
                    playHover()
                  }}
                  onHoverEnd={() => setHoveredCourse(null)}
                >
                  <Card className="bg-black/50 border-purple-900/50 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`mr-4 p-3 ${course.color} rounded-full`}>{course.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                          <p className="text-sm text-gray-400">{course.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-blue-600">{course.difficulty}</Badge>
                        <Badge className="bg-green-600">{course.duration}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-400">{progress[course.id] || 0}%</span>
                        </div>
                        <Progress value={progress[course.id] || 0} className="h-2" />
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-yellow-400 font-semibold">Reward: {course.tokenReward} P4D</span>
                        <Link href={`/learn/${course.id}`}>
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => playSelect()}>
                            {progress[course.id] > 0 ? "Continue" : "Start"} Course
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                    {hoveredCourse === course.id && (
                      <motion.div
                        className="absolute inset-0 bg-purple-600 opacity-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
