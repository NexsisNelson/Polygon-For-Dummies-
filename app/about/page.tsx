"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen dark flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-purple-400">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white">About Polygon for Dummies</CardTitle>
                <CardDescription className="text-gray-400">
                  Learn about our mission and vision for blockchain education
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p>
                  Polygon for Dummies is an innovative educational platform designed to make learning about blockchain
                  technology and the Polygon network accessible to everyone. Our mission is to bridge the gap between
                  complex blockchain concepts and everyday users, empowering individuals to understand and participate
                  in the decentralized future.
                </p>
                <p>
                  Through interactive games, engaging lessons, and hands-on experiences, we aim to demystify concepts
                  like smart contracts, decentralized finance (DeFi), and non-fungible tokens (NFTs). Our platform is
                  built on the belief that blockchain education should be fun, intuitive, and rewarding.
                </p>
                <p>
                  Whether you're a complete beginner or looking to deepen your understanding of blockchain technology,
                  Polygon for Dummies provides a supportive learning environment tailored to your needs. Join us on this
                  exciting journey to explore the potential of Web3 and the Polygon ecosystem!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
