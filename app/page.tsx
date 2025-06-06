"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeatureCard from "@/components/feature-card"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ShapeMorph } from "@/components/shape-morph"
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleFeatureClick = (path: string) => {
    if (isAuthenticated) {
      router.push(path)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen dark flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ShapeMorph />
        <HeroSection />

        <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Learn Through Play</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Polygon Basics"
              description="Learn the fundamentals of Polygon Network through interactive lessons"
              icon="BookOpen"
              onClick={() => handleFeatureClick("/learn")}
            />

            <FeatureCard
              title="Token Toss"
              description="Play a fun game to understand how tokens work on Polygon"
              icon="Coins"
              onClick={() => handleFeatureClick("/games/token-toss")}
            />

            <FeatureCard
              title="Bridge Builder"
              description="Build bridges between networks to understand cross-chain operations"
              icon="Bridge"
              onClick={() => handleFeatureClick("/games/bridge-builder")}
            />

            <FeatureCard
              title="Gas Racer"
              description="Race to understand how gas fees work on Polygon vs Ethereum"
              icon="Fuel"
              onClick={() => handleFeatureClick("/games/gas-racer")}
            />

            <FeatureCard
              title="NFT Creator"
              description="Create your own NFT and learn about digital ownership"
              icon="Image"
              onClick={() => handleFeatureClick("/games/nft-creator")}
            />

            <FeatureCard
              title="Validator Simulator"
              description="Simulate being a validator on the Polygon network"
              icon="Shield"
              onClick={() => handleFeatureClick("/games/validator-sim")}
            />
          </div>
        </section>

        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Why Learn About Polygon?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-purple-600 p-2 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Fast and Low-Cost Transactions</h3>
                    <p className="text-gray-300">
                      Experience lightning-fast transactions with minimal fees on the Polygon network.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-purple-600 p-2 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Ethereum Compatibility</h3>
                    <p className="text-gray-300">
                      Leverage Ethereum's robust ecosystem while enjoying Polygon's scalability benefits.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-purple-600 p-2 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Growing Ecosystem</h3>
                    <p className="text-gray-300">
                      Join a rapidly expanding network of dApps, DeFi protocols, and NFT platforms.
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-96 w-full"
              >
                <Image
                  src="/images/polygon-ecosystem.png"
                  alt="Polygon Ecosystem"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Ready to Start Your Polygon Journey?</h2>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => (isAuthenticated ? router.push("/learn") : router.push("/signup"))}
            >
              {isAuthenticated ? "Start Learning" : "Get Started Now"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
