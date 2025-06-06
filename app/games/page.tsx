"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import FeatureCard from "@/components/feature-card"

const games = [
  {
    title: "Token Toss",
    description: "Learn about token transfers by tossing coins",
    icon: "Coins",
    link: "/games/token-toss",
  },
  {
    title: "Bridge Builder",
    description: "Understand cross-chain operations by building bridges",
    icon: "Bridge",
    link: "/games/bridge-builder",
  },
  {
    title: "Gas Racer",
    description: "Race to understand gas fees on Polygon vs Ethereum",
    icon: "Fuel",
    link: "/games/gas-racer",
  },
  {
    title: "NFT Creator",
    description: "Create your own NFT and learn about digital ownership",
    icon: "Image",
    link: "/games/nft-creator",
  },
  {
    title: "Validator Simulator",
    description: "Simulate being a validator on the Polygon network",
    icon: "Shield",
    link: "/games/validator-sim",
  },
  {
    title: "DeFi Farmer",
    description: "Learn about yield farming and liquidity provision",
    icon: "Sprout",
    link: "/games/defi-farmer",
  },
  {
    title: "Smart Contract Puzzle",
    description: "Solve puzzles to understand smart contract logic",
    icon: "FileCode",
    link: "/games/smart-contract-puzzle",
  },
  {
    title: "Blockchain Explorer",
    description: "Explore and understand blockchain transactions",
    icon: "Search",
    link: "/games/blockchain-explorer",
  },
  {
    title: "Blockchain Tic Tac Toe",
    description: "Play Tic Tac Toe and learn about blockchain transactions",
    icon: "Hash",
    link: "/games/blockchain-tic-tac-toe",
  },
  {
    title: "Crypto Matching",
    description: "Match cryptocurrency pairs and learn about different projects",
    icon: "Layers",
    link: "/games/crypto-matching",
  },
  {
    title: "Blockchain Puzzle",
    description: "Match blockchain-related terms to learn key concepts",
    icon: "PuzzlePiece",
    link: "/games/blockchain-puzzle",
  },
  {
    title: "Consensus Simulator",
    description: "Simulate blockchain consensus mechanisms",
    icon: "Network",
    link: "/games/consensus-simulator",
  },
]

export default function GamesPage() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white/10 backdrop-blur-md border-purple-200/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Educational Games</CardTitle>
                <CardDescription className="text-gray-200">
                  Learn about Polygon Network through fun, interactive games
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <motion.div
                  key={game.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureCard
                    title={game.title}
                    description={game.description}
                    icon={game.icon}
                    onClick={() => (window.location.href = game.link)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
