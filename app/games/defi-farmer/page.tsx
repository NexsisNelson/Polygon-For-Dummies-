"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info, Droplet, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

export default function DeFiFarmerGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [crops, setCrops] = useState(0)
  const [water, setWater] = useState(100)
  const [sunlight, setSunlight] = useState(100)
  const [yield, setYield] = useState(0)
  const { isConnected } = useWeb3()

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        setCrops((prev) => prev + 1)
        setWater((prev) => Math.max(0, prev - 2))
        setSunlight((prev) => Math.max(0, prev - 2))
        setYield((prev) => prev + 0.1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [gameStarted])

  const startGame = () => setGameStarted(true)
  const resetGame = () => {
    setGameStarted(false)
    setCrops(0)
    setWater(100)
    setSunlight(100)
    setYield(0)
  }

  const addWater = () => setWater((prev) => Math.min(100, prev + 20))
  const addSunlight = () => setSunlight((prev) => Math.min(100, prev + 20))

  useEffect(() => {
    if (!isConnected) {
      resetGame()
    }
  }, [isConnected]) // Removed resetGame from dependencies

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="ghost" className="text-purple-600 dark:text-purple-400">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">DeFi Farmer</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Learn about yield farming and liquidity provision
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Please connect your wallet to play DeFi Farmer.
                    </p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Start farming to learn about yield generation in DeFi!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Farming
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Crops: {crops}</span>
                      <span className="text-gray-700 dark:text-gray-300">Yield: {yield.toFixed(2)}%</span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 dark:text-gray-300">Water</span>
                        <span className="text-gray-700 dark:text-gray-300">{water}%</span>
                      </div>
                      <Progress value={water} className="h-2" indicatorColor="bg-blue-500" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 dark:text-gray-300">Sunlight</span>
                        <span className="text-gray-700 dark:text-gray-300">{sunlight}%</span>
                      </div>
                      <Progress value={sunlight} className="h-2" indicatorColor="bg-yellow-500" />
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Button onClick={addWater} className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Droplet className="mr-2 h-4 w-4" /> Add Water
                      </Button>
                      <Button onClick={addSunlight} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Sun className="mr-2 h-4 w-4" /> Add Sunlight
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {gameStarted && (
                  <Button onClick={resetGame} variant="outline" className="w-full">
                    Reset Farm
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="text-purple-600 dark:text-purple-400"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 right-4 z-10 w-80"
        >
          <Card className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-900/50">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">DeFi Farmer</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>
                This game simulates yield farming in DeFi. Your crops represent your staked assets, while water and
                sunlight represent different factors that affect your yield.
              </p>
              <p className="mt-2">Keep your crops well-maintained to maximize your yield!</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-purple-600 dark:text-purple-400 w-full"
                onClick={() => setShowInfo(false)}
              >
                Got it
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
