"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Coins, BookOpen, Gamepad } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/navbar"

const courses = [
  { id: "polygon-basics", title: "Polygon Basics", tokenReward: 1000, color: "from-purple-500 to-purple-700" },
  {
    id: "ethereum-fundamentals",
    title: "Ethereum Fundamentals",
    tokenReward: 1500,
    color: "from-blue-500 to-blue-700",
  },
  { id: "defi-on-polygon", title: "DeFi on Polygon", tokenReward: 2000, color: "from-green-500 to-green-700" },
  {
    id: "smart-contracts",
    title: "Smart Contract Development",
    tokenReward: 3000,
    color: "from-yellow-500 to-yellow-700",
  },
  {
    id: "scaling-solutions",
    title: "Blockchain Scaling Solutions",
    tokenReward: 1800,
    color: "from-red-500 to-red-700",
  },
]

const games = [
  { id: "token-toss", title: "Token Toss", maxTokenReward: 500, color: "from-pink-500 to-pink-700" },
  { id: "bridge-builder", title: "Bridge Builder", maxTokenReward: 750, color: "from-indigo-500 to-indigo-700" },
  { id: "gas-racer", title: "Gas Racer", maxTokenReward: 600, color: "from-cyan-500 to-cyan-700" },
  { id: "nft-creator", title: "NFT Creator", maxTokenReward: 1000, color: "from-orange-500 to-orange-700" },
]

export default function TokenEarningsPage() {
  const [courseEarnings, setCourseEarnings] = useState<Record<string, number>>({})
  const [gameEarnings, setGameEarnings] = useState<Record<string, number>>({})

  useEffect(() => {
    // Load course progress and calculate earnings
    const courseProgress = courses.reduce(
      (acc, course) => {
        const progress = localStorage.getItem(`courseProgress_${course.id}`)
        acc[course.id] = progress ? Math.floor((Number.parseInt(progress) / 100) * course.tokenReward) : 0
        return acc
      },
      {} as Record<string, number>,
    )
    setCourseEarnings(courseProgress)

    // Simulate game earnings (replace with actual game data in a real application)
    const simulatedGameEarnings = games.reduce(
      (acc, game) => {
        acc[game.id] = Math.floor(Math.random() * game.maxTokenReward)
        return acc
      },
      {} as Record<string, number>,
    )
    setGameEarnings(simulatedGameEarnings)
  }, [])

  const totalEarnings =
    Object.values(courseEarnings).reduce((a, b) => a + b, 0) + Object.values(gameEarnings).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen dark flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-purple-400 text-lg">
                <ArrowLeft className="mr-2 h-6 w-6" /> Back to Home
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50 mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl text-white mb-2 flex items-center">
                  <Coins className="mr-2 h-8 w-8 text-yellow-400" />
                  P4D Token Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-4">
                  <span className="text-2xl text-white font-bold">Total Earnings:</span>
                  <span className="text-3xl font-bold text-white">{totalEarnings.toLocaleString()} P4D</span>
                </div>
                <Progress value={(totalEarnings / 50000) * 100} className="h-3" />
                <p className="text-gray-400 text-center">{totalEarnings.toLocaleString()} / 50,000 P4D earned</p>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white flex items-center">
                    <BookOpen className="mr-2 h-6 w-6 text-purple-400" />
                    Course Earnings
                  </h3>
                  {courses.map((course) => (
                    <Card key={course.id} className={`bg-gradient-to-r ${course.color}`}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <span className="text-white font-semibold">{course.title}</span>
                        <span className="text-white font-bold">
                          {courseEarnings[course.id]?.toLocaleString()} / {course.tokenReward.toLocaleString()} P4D
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white flex items-center">
                    <Gamepad className="mr-2 h-6 w-6 text-green-400" />
                    Game Earnings
                  </h3>
                  {games.map((game) => (
                    <Card key={game.id} className={`bg-gradient-to-r ${game.color}`}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <span className="text-white font-semibold">{game.title}</span>
                        <span className="text-white font-bold">{gameEarnings[game.id]?.toLocaleString()} P4D</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
