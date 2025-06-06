"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Info, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/navbar"
import { useWeb3React } from "@web3-react/core"

export default function NFTCreatorGame() {
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [nftImage, setNftImage] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [nftCreated, setNftCreated] = useState(false)
  const { active, account } = useWeb3React()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNftImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const createNFT = () => {
    if (nftName && nftDescription && nftImage) {
      setNftCreated(true)
    }
  }

  const resetNFT = () => {
    setNftName("")
    setNftDescription("")
    setNftImage(null)
    setNftCreated(false)
  }

  useEffect(() => {
    if (!active) {
      resetNFT()
    }
  }, [active])

  return (
    <div className="min-h-screen dark flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="ghost" className="text-purple-400">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white">NFT Creator</CardTitle>
                <CardDescription className="text-gray-400">
                  Create your own NFT and learn about digital ownership
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!active ? (
                  <div className="text-center">
                    <p className="text-gray-300 mb-4">Please connect your wallet to create an NFT.</p>
                  </div>
                ) : !nftCreated ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nft-name" className="text-white">
                        NFT Name
                      </Label>
                      <Input
                        id="nft-name"
                        value={nftName}
                        onChange={(e) => setNftName(e.target.value)}
                        className="bg-black/30 border-purple-900/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nft-description" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="nft-description"
                        value={nftDescription}
                        onChange={(e) => setNftDescription(e.target.value)}
                        className="bg-black/30 border-purple-900/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nft-image" className="text-white">
                        Image
                      </Label>
                      <div className="mt-2">
                        <Label
                          htmlFor="nft-image"
                          className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded inline-flex items-center"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Label>
                        <Input
                          id="nft-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      {nftImage && (
                        <img
                          src={nftImage || "/placeholder.svg"}
                          alt="NFT Preview"
                          className="mt-4 max-w-full h-auto rounded"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl text-white mb-4">Your NFT has been created!</h3>
                    <div className="bg-purple-900/30 p-4 rounded-lg">
                      <img
                        src={nftImage! || "/placeholder.svg"}
                        alt="Created NFT"
                        className="mx-auto max-w-full h-auto rounded mb-4"
                      />
                      <h4 className="text-lg text-white">{nftName}</h4>
                      <p className="text-gray-400">{nftDescription}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {active &&
                  (!nftCreated ? (
                    <Button
                      onClick={createNFT}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={!nftName || !nftDescription || !nftImage}
                    >
                      Create NFT
                    </Button>
                  ) : (
                    <Button onClick={resetNFT} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Create Another NFT
                    </Button>
                  ))}
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>

      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="icon" className="text-purple-400" onClick={() => setShowInfo(!showInfo)}>
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
          <Card className="bg-black/90 border-purple-900/50">
            <CardHeader>
              <CardTitle className="text-white">NFT Creator</CardTitle>
              <CardDescription className="text-gray-400">How it works</CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>This game simulates the process of creating an NFT (Non-Fungible Token) on the Polygon network.</p>
              <p className="mt-2">
                NFTs are unique digital assets that represent ownership of a specific item or piece of content on the
                blockchain.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-purple-400 w-full" onClick={() => setShowInfo(false)}>
                Got it
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
