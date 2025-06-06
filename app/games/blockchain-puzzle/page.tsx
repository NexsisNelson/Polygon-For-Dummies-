"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

const puzzlePieces = [
  { id: 1, content: "Block" },
  { id: 2, content: "Chain" },
  { id: 3, content: "Hash" },
  { id: 4, content: "Nonce" },
  { id: 5, content: "Merkle" },
  { id: 6, content: "Tree" },
]

export default function BlockchainPuzzleGame() {
  const [pieces, setPieces] = useState(puzzlePieces)
  const [selectedPieces, setSelectedPieces] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const { isConnected } = useWeb3()

  const shufflePieces = () => {
    setPieces([...pieces].sort(() => Math.random() - 0.5))
  }

  const handlePieceClick = (id: number) => {
    if (selectedPieces.includes(id)) {
      setSelectedPieces(selectedPieces.filter((pieceId) => pieceId !== id))
    } else {
      setSelectedPieces([...selectedPieces, id])
    }
  }

  const checkAnswer = () => {
    if (selectedPieces.length !== 2) return

    const [first, second] = selectedPieces
    const firstPiece = pieces.find((piece) => piece.id === first)
    const secondPiece = pieces.find((piece) => piece.id === second)

    if (
      (firstPiece?.content === "Block" && secondPiece?.content === "Chain") ||
      (firstPiece?.content === "Merkle" && secondPiece?.content === "Tree")
    ) {
      setScore(score + 1)
    }

    setSelectedPieces([])
  }

  useEffect(() => {
    if (selectedPieces.length === 2) {
      checkAnswer()
    }
  }, [selectedPieces])

  useEffect(() => {
    if (gameStarted) {
      shufflePieces()
    }
  }, [gameStarted])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setScore(0)
    setSelectedPieces([])
    setPieces(puzzlePieces)
  }

  return (
    <div className="min-h-screen dark flex flex-col bg-gradient-to-br from-purple-900 to-indigo-900">
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
                <CardTitle className="text-2xl text-white">Blockchain Puzzle</CardTitle>
                <CardDescription className="text-gray-200">
                  Match blockchain-related terms to learn key concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center">
                    <p className="text-white mb-4">Please connect your wallet to play Blockchain Puzzle.</p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-white mb-4">
                      Start playing to learn about important blockchain terms and concepts!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Game
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {pieces.map((piece) => (
                        <Button
                          key={piece.id}
                          onClick={() => handlePieceClick(piece.id)}
                          className={`h-20 text-lg font-bold ${
                            selectedPieces.includes(piece.id)
                              ? "bg-purple-600 text-white"
                              : "bg-white/20 text-white hover:bg-white/30"
                          }`}
                        >
                          {piece.content}
                        </Button>
                      ))}
                    </div>
                    <div className="text-center text-2xl font-bold text-white">Score: {score}</div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {gameStarted && (
                  <Button onClick={resetGame} variant="outline" className="w-full text-white border-white">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset Game
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
              <CardTitle className="text-white">Blockchain Puzzle</CardTitle>
              <CardDescription className="text-gray-200">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-200">
              <p>Match related blockchain terms to form correct pairs.</p>
              <p className="mt-2">For example, "Block" and "Chain" form a correct pair.</p>
              <p className="mt-2">Learn key blockchain concepts while improving your score!</p>
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
