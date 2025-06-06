"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export default function BlockchainTicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [winner, setWinner] = useState(null)
  const { isConnected, account } = useWeb3()

  const handleClick = (index) => {
    if (winner || board[index]) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  const calculateWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  const startGame = () => {
    setGameStarted(true)
    resetGame()
  }

  useEffect(() => {
    if (!isConnected) {
      setGameStarted(false)
    }
  }, [isConnected])

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
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
                <CardTitle className="text-2xl text-white">Blockchain Tic Tac Toe</CardTitle>
                <CardDescription className="text-gray-200">
                  Play Tic Tac Toe and learn about blockchain transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center">
                    <p className="text-white mb-4">Please connect your wallet to play Blockchain Tic Tac Toe.</p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-white mb-4">
                      Start playing to learn about transaction signing and state changes on the blockchain!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Game
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {board.map((square, index) => (
                        <Button
                          key={index}
                          onClick={() => handleClick(index)}
                          className="h-20 text-4xl font-bold bg-purple-800/50 hover:bg-purple-700/50 text-white"
                          disabled={!!square || !!winner}
                        >
                          {square}
                        </Button>
                      ))}
                    </div>
                    {winner && <div className="text-center text-white text-2xl font-bold">Winner: {winner}</div>}
                    <div className="text-center text-white">{isXNext ? "X" : "O"}'s turn</div>
                    <div className="text-center text-gray-200 text-sm">
                      Each move represents a transaction on the blockchain.
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {gameStarted && (
                  <Button onClick={resetGame} variant="outline" className="w-full text-white border-white">
                    <RefreshCw className="mr-2 h-4 w-4" /> New Game
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
              <CardTitle className="text-white">Blockchain Tic Tac Toe</CardTitle>
              <CardDescription className="text-gray-200">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-200">
              <p>This game simulates how transactions work on a blockchain.</p>
              <p className="mt-2">
                Each move represents a transaction that updates the game state (the board) on the blockchain.
              </p>
              <p className="mt-2">
                In a real blockchain game, each move would require signing a transaction with your wallet.
              </p>
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
