"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

const puzzles = [
  {
    code: `
function transfer(address to, uint256 amount) public {
  require(balances[msg.sender] >= amount, "Insufficient balance");
  balances[msg.sender] -= amount;
  balances[to] += amount;
}
    `,
    question: "What's the purpose of the 'require' statement in this function?",
    options: [
      "To check if the sender has enough balance",
      "To verify the recipient's address",
      "To ensure the amount is positive",
      "To check if the contract has enough balance",
    ],
    correctAnswer: 0,
  },
  // Add more puzzles here
]

export default function SmartContractPuzzleGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const { isConnected } = useWeb3()

  const startGame = () => setGameStarted(true)
  const resetGame = () => {
    setGameStarted(false)
    setCurrentPuzzle(0)
    setSelectedAnswer(null)
    setScore(0)
  }

  const checkAnswer = () => {
    if (selectedAnswer === puzzles[currentPuzzle].correctAnswer) {
      setScore((prev) => prev + 1)
    }
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle((prev) => prev + 1)
      setSelectedAnswer(null)
    } else {
      // Game finished
      alert(`Game Over! Your score: ${score + 1}/${puzzles.length}`)
      resetGame()
    }
  }

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
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Smart Contract Puzzle</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Solve puzzles to understand smart contract logic
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Please connect your wallet to play Smart Contract Puzzle.
                    </p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Start solving puzzles to learn about smart contract logic!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Puzzle
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
                      <code className="text-sm text-gray-800 dark:text-gray-200">{puzzles[currentPuzzle].code}</code>
                    </pre>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">{puzzles[currentPuzzle].question}</p>
                    <div className="space-y-2">
                      {puzzles[currentPuzzle].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === index ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedAnswer(index)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    <Button
                      onClick={checkAnswer}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {gameStarted && (
                  <div className="w-full flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Puzzle {currentPuzzle + 1} of {puzzles.length}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">Score: {score}</span>
                  </div>
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
              <CardTitle className="text-gray-900 dark:text-white">Smart Contract Puzzle</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>This game presents you with smart contract code snippets and questions about their functionality.</p>
              <p className="mt-2">
                Analyze the code and choose the correct answer to learn about smart contract concepts!
              </p>
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
