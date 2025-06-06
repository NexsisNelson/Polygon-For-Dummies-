"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"

const topics = {
  basics: {
    title: "Polygon Basics",
    content:
      "Polygon is a Layer 2 scaling solution for Ethereum that aims to provide faster and cheaper transactions. It uses a technology called Plasma to process transactions off the main Ethereum chain.",
  },
  tokens: {
    title: "Tokens & NFTs",
    content:
      "Tokens on Polygon can be fungible (like cryptocurrencies) or non-fungible (NFTs). Fungible tokens are interchangeable, while NFTs represent unique digital assets.",
  },
  defi: {
    title: "DeFi on Polygon",
    content:
      "Decentralized Finance (DeFi) on Polygon allows for various financial operations like lending, borrowing, and trading without traditional intermediaries, all with lower fees than on Ethereum mainnet.",
  },
  scaling: {
    title: "Scaling Solutions",
    content:
      "Polygon uses a combination of Plasma technology and Proof of Stake (PoS) consensus to achieve high throughput and low transaction costs while maintaining security through periodic checkpoints to Ethereum.",
  },
}

export default function LearnTopicPage({ params }: { params: { topic: string } }) {
  const topic = topics[params.topic as keyof typeof topics]

  if (!topic) {
    return <div>Topic not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/learn">
              <Button variant="ghost" className="text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learn
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{topic.title}</CardTitle>
                <CardDescription>Expand your knowledge about {topic.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{topic.content}</p>
                {/* Add more detailed content, images, and interactive elements here */}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
