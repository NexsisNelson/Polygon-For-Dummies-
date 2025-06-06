"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

const mockTransactions = [
  {
    hash: "0x123...abc",
    from: "0xABC...123",
    to: "0xDEF...456",
    value: "1.5 ETH",
    gasPrice: "20 Gwei",
  },
  {
    hash: "0x456...def",
    from: "0xGHI...789",
    to: "0xJKL...012",
    value: "0.5 MATIC",
    gasPrice: "1 Gwei",
  },
  // Add more mock transactions here
]

export default function BlockchainExplorerGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [transactions, setTransactions] = useState(mockTransactions)
  const { isConnected } = useWeb3()

  const startGame = () => setGameStarted(true)
  const resetGame = () => {
    setGameStarted(false)
    setSearchTerm("")
    setTransactions(mockTransactions)
  }

  const handleSearch = () => {
    // In a real application, this would query a blockchain explorer API
    const filteredTransactions = mockTransactions.filter(
      (tx) => tx.hash.includes(searchTerm) || tx.from.includes(searchTerm) || tx.to.includes(searchTerm),
    )
    setTransactions(filteredTransactions)
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
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Blockchain Explorer</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Explore and understand blockchain transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Please connect your wallet to use the Blockchain Explorer.
                    </p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Start exploring blockchain transactions to learn about the network!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Exploring
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Search by transaction hash or address"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow"
                      />
                      <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {transactions.map((tx, index) => (
                        <Card key={index} className="bg-gray-50 dark:bg-gray-700">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Tx: {tx.hash}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">From: {tx.from}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">To: {tx.to}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{tx.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Gas: {tx.gasPrice}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {gameStarted && (
                  <Button onClick={resetGame} variant="outline" className="w-full">
                    Reset Explorer
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
              <CardTitle className="text-gray-900 dark:text-white">Blockchain Explorer</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              <p>This game simulates a blockchain explorer, allowing you to search and view transaction details.</p>
              <p className="mt-2">
                Learn about transaction hashes, addresses, values, and gas prices in a blockchain network!
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
