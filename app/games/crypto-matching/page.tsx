"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

const cryptoCards = [
  { id: 1, name: "Bitcoin", image: "/images/bitcoin.png" },
  { id: 2, name: "Ethereum", image: "/images/ethereum.png" },
  { id: 3, name: "Polygon", image: "/images/polygon.png" },
  { id: 4, name: "Cardano", image: "/images/cardano.png" },
  { id: 5, name: "Solana", image: "/images/solana.png" },
  { id: 6, name: "Polkadot", image: "/images/polkadot.png" },
  { id: 7, name: "Chainlink", image: "/images/chainlink.png" },
  { id: 8, name: "Uniswap", image: "/images/uniswap.png" },
]

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function CryptoMatchingGame() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const { isConnected } = useWeb3()

  useEffect(() => {
    if (gameStarted) {
      const shuffledCards = shuffleArray([...cryptoCards, ...cryptoCards])
      setCards(shuffledCards)
    }
  }, [gameStarted])

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedPairs.includes(cards[index].id)) return

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards
      if (cards[firstIndex].id === cards[secondIndex].id) {
        setMatchedPairs([...matchedPairs, cards[firstIndex].id])
      }
      setTimeout(() => setFlippedCards([]), 1000)
    }
  }

  const resetGame = () => {
    setCards([])
    setFlippedCards([])
    setMatchedPairs([])
    setGameStarted(true)
  }

  const startGame = () => {
    setGameStarted(true)
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
                <CardTitle className="text-2xl text-white">Crypto Matching</CardTitle>
                <CardDescription className="text-gray-200">
                  Match cryptocurrency pairs and learn about different blockchain projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center">
                    <p className="text-white mb-4">Please connect your wallet to play Crypto Matching.</p>
                  </div>
                ) : !gameStarted ? (
                  <div className="text-center">
                    <p className="text-white mb-4">
                      Start playing to learn about different cryptocurrencies and blockchain projects!
                    </p>
                    <Button onClick={startGame} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Start Game
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    {cards.map((card, index) => (
                      <Button
                        key={index}
                        onClick={() => handleCardClick(index)}
                        className={`h-24 w-24 p-2 ${
                          flippedCards.includes(index) || matchedPairs.includes(card.id)
                            ? "bg-purple-600"
                            : "bg-purple-800/50"
                        } hover:bg-purple-700/50 text-white`}
                      >
                        {flippedCards.includes(index) || matchedPairs.includes(card.id) ? (
                          <div className="flex flex-col items-center justify-center">
                            <Image src={card.image || "/placeholder.svg"} alt={card.name} width={40} height={40} />
                            <span className="text-xs mt-1">{card.name}</span>
                          </div>
                        ) : (
                          "?"
                        )}
                      </Button>
                    ))}
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
              <CardTitle className="text-white">Crypto Matching</CardTitle>
              <CardDescription className="text-gray-200">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-200">
              <p>This game helps you learn about different cryptocurrencies and blockchain projects.</p>
              <p className="mt-2">
                Match pairs of crypto logos to reveal their names and learn about various blockchain ecosystems.
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
