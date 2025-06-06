"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/navbar"
import { useWeb3React } from "@web3-react/core"

export default function GasRacerGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [polygonProgress, setPolygonProgress] = useState(0)
  const [ethereumProgress, setEthereumProgress] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)
  const { active, account } = useWeb3React()

  useEffect(() => {
    if (gameStarted) {
      const polygonInterval = setInterval(() => {
        setPolygonProgress((prev) => {
          if (prev >= 100) {
            clearInterval(polygonInterval)
            if (!winner) setWinner("Polygon")
            return 100
          }
          return prev + Math.random() * 5
        })
      }, 100)

      const ethereumInterval = setInterval(() => {
        setEthereumProgress((prev) => {
          if (prev >= 100) {
            clearInterval(ethereumInterval)
            if (!winner) setWinner("Ethereum")
            return 100
          }
          return prev + Math.random() * 2
        })
      }, 100)

      return () => {
        clearInterval(polygonInterval)
        clearInterval(ethereumInterval)
      }
    }
  }, [gameStarted, winner])

  const startGame = () => {
    setGameStarted(true)
    setPolygonProgress(0)
    setEthereumProgress(0)
    setWinner(null)
  }

  const resetGame = () => {
    setGameStarted(false)
    setPolygonProgress(0)
    setEthereumProgress(0)
    setWinner(null)
  }

  useEffect(() => {
    if (!active) {
      resetGame()
    }
  }, [active]) // Removed resetGame from dependencies

  return (
    <div className="min-h-screen dark flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="ghost" className="text-purple-400">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Gas Racer</CardTitle>
                <CardDescription className="text-gray-400">
                  Race to understand gas fees on Polygon vs Ethereum
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!active ? (
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">Please connect your wallet to play Gas Racer.</p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">
                      Click start to begin the race and see how transaction speeds compare between Polygon and Ethereum!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Race
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white mb-2">Polygon</h3>
                      <Progress value={polygonProgress} className="h-4" indicatorColor="bg-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2">Ethereum</h3>
                      <Progress value={ethereumProgress} className="h-4" indicatorColor="bg-blue-500" />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {winner && (
                  <div className="text-center w-full">
                    <p className="text-xl text-white mb-4">
                      {winner === "Polygon" ? "Polygon wins!" : "Ethereum wins!"}
                    </p>
                    <Button onClick={resetGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Race Again
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>

      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" className="text-purple-400" onClick={() => setShowInfo(!showInfo)}>
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
          <Card className="bg-black/90 border-purple-900/50">
            <CardHeader>
              <CardTitle className="text-white">Gas Racer</CardTitle>
              <CardDescription className="text-gray-400">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>This game simulates the speed difference in transaction processing between Polygon and Ethereum.</p>
              <p className="mt-2">
                Polygon typically processes transactions faster and with lower fees, which is represented by its faster
                progress in the race.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-purple-400 w-full" onClick={() => setShowInfo(false)}>
                Got it
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
