"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info, RefreshCw, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

const nodes = [
  { id: 1, name: "Node 1" },
  { id: 2, name: "Node 2" },
  { id: 3, name: "Node 3" },
  { id: 4, name: "Node 4" },
  { id: 5, name: "Node 5" },
]

export default function ConsensusSimulatorGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [consensusProgress, setConsensusProgress] = useState(0)
  const [nodeStates, setNodeStates] = useState<Record<number, boolean>>({})
  const [round, setRound] = useState(1)
  const { isConnected } = useWeb3()

  const startGame = () => {
    setGameStarted(true)
    resetGame()
  }

  const resetGame = () => {
    setConsensusProgress(0)
    setNodeStates({})
    setRound(1)
  }

  const toggleNodeState = (nodeId: number) => {
    setNodeStates((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }))
  }

  const runConsensusRound = () => {
    const agreeingNodes = Object.values(nodeStates).filter(Boolean).length
    const newProgress = (agreeingNodes / nodes.length) * 100
    setConsensusProgress(newProgress)
    setRound((prev) => prev + 1)

    if (newProgress === 100) {
      alert("Consensus achieved! All nodes are in agreement.")
      resetGame()
    }
  }

  useEffect(() => {
    if (!isConnected) {
      setGameStarted(false)
    }
  }, [isConnected])

  return (
    <div className="min-h-screen dark flex flex-col bg-gradient-to-br from-blue-900 to-purple-900">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="ghost" className="text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white/10 backdrop-blur-md border-purple-200/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Consensus Simulator</CardTitle>
                <CardDescription className="text-gray-200">Simulate blockchain consensus mechanisms</CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center">
                    <p className="text-white mb-4">Please connect your wallet to play Consensus Simulator.</p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-white mb-4">
                      Start the simulation to learn about blockchain consensus mechanisms!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Simulation
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white mb-2">Consensus Progress</h3>
                      <Progress value={consensusProgress} className="h-4" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {nodes.map((node) => (
                        <Button
                          key={node.id}
                          onClick={() => toggleNodeState(node.id)}
                          className={`h-20 ${
                            nodeStates[node.id] ? "bg-green-600" : "bg-red-600"
                          } hover:opacity-80 text-white`}
                        >
                          <div className="flex flex-col items-center">
                            <span>{node.name}</span>
                            {nodeStates[node.id] ? <Check className="mt-2 h-6 w-6" /> : <X className="mt-2 h-6 w-6" />}
                          </div>
                        </Button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Round: {round}</span>
                      <Button onClick={runConsensusRound} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Run Consensus Round
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {gameStarted && (
                  <Button onClick={resetGame} variant="outline" className="w-full text-white border-white">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset Simulation
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>

      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" className="text-white" onClick={() => setShowInfo(!showInfo)}>
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
          <Card className="bg-white/10 backdrop-blur-md border-purple-200/20">
            <CardHeader>
              <CardTitle className="text-white">Consensus Simulator</CardTitle>
              <CardDescription className="text-gray-200">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-200">
              <p>This game simulates the consensus process in a blockchain network.</p>
              <p className="mt-2">Toggle nodes to agree or disagree, then run consensus rounds.</p>
              <p className="mt-2">Achieve 100% agreement to reach network consensus!</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-white w-full" onClick={() => setShowInfo(false)}>
                Got it
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
