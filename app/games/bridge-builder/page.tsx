"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { ArrowLeft, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useWeb3React } from "@web3-react/core"

function Bridge({ startPosition, endPosition, isBuilding, isComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isBuilding && progress < 1) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 0.01, 1))
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isBuilding, progress])

  useEffect(() => {
    if (isComplete) {
      setProgress(1)
    }
  }, [isComplete])

  const bridgeLength = Math.sqrt(
    Math.pow(endPosition[0] - startPosition[0], 2) + Math.pow(endPosition[2] - startPosition[2], 2),
  )

  const angle = Math.atan2(endPosition[2] - startPosition[2], endPosition[0] - startPosition[0])

  return (
    <group position={[startPosition[0], 0.5, startPosition[2]]} rotation={[0, angle, 0]}>
      <mesh position={[(bridgeLength * progress) / 2, 0, 0]} scale={[bridgeLength * progress, 0.1, 0.5]}>
        <boxGeometry />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    </group>
  )
}

function Network({ position, name, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.5, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, 1, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  )
}

export default function BridgeBuilderGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [buildingBridge, setBuildingBridge] = useState(false)
  const [bridgeComplete, setBridgeComplete] = useState(false)
  const [message, setMessage] = useState("")
  const { active, account } = useWeb3React()

  const levels = [
    {
      from: { name: "Ethereum", position: [-5, 0, 0], color: "#627EEA" },
      to: { name: "Polygon", position: [5, 0, 0], color: "#8247E5" },
      description: "Build a bridge from Ethereum to Polygon to transfer assets faster and with lower fees.",
    },
    {
      from: { name: "Polygon", position: [-5, 0, -5], color: "#8247E5" },
      to: { name: "Avalanche", position: [5, 0, 5], color: "#E84142" },
      description: "Connect Polygon to Avalanche to enable cross-chain interoperability.",
    },
    {
      from: { name: "Polygon zkEVM", position: [-5, 0, 0], color: "#8247E5" },
      to: { name: "Ethereum", position: [5, 0, 0], color: "#627EEA" },
      description: "Create a zero-knowledge bridge for secure and private transactions.",
    },
  ]

  const startGame = () => {
    setGameStarted(true)
    setCurrentLevel(0)
    setBridgeComplete(false)
  }

  const buildBridge = () => {
    setBuildingBridge(true)
    setMessage("Building bridge... transferring assets securely")

    setTimeout(() => {
      setBuildingBridge(false)
      setBridgeComplete(true)
      setMessage("Bridge complete! Assets transferred successfully")
    }, 5000)
  }

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((prev) => prev + 1)
      setBridgeComplete(false)
    } else {
      setMessage("Congratulations! You've completed all bridge building challenges!")
    }
  }

  useEffect(() => {
    if (!active) {
      setGameStarted(false)
      setCurrentLevel(0)
      setBridgeComplete(false)
      setBuildingBridge(false)
      setMessage("")
    }
  }, [active])

  return (
    <div className="min-h-screen dark flex flex-col">
      <Navbar />

      <main className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10">
          <Link href="/games">
            <Button variant="ghost" className="text-purple-400">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
            </Button>
          </Link>
        </div>

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
                <CardTitle className="text-white">Bridge Builder</CardTitle>
                <CardDescription className="text-gray-400">How to play</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Build bridges between different blockchain networks to understand how cross-chain transfers work.</p>
                <p className="mt-2">
                  Bridges allow assets to move between different blockchains, enabling interoperability in the Web3
                  ecosystem.
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

        {message && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 px-4 py-2 rounded-full">
            <p className="text-purple-400 font-bold">{message}</p>
          </div>
        )}

        <div className="h-screen w-full">
          {!active ? (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-80 bg-black/90 border-purple-900/50">
                  <CardHeader>
                    <CardTitle className="text-white text-center">Connect Wallet</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                      Please connect your wallet to play
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          ) : !gameStarted ? (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="w-80 bg-black/90 border-purple-900/50">
                  <CardHeader>
                    <CardTitle className="text-white text-center">Bridge Builder</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                      Learn about cross-chain bridges
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p>
                      Build bridges between different blockchain networks to understand how assets can move across
                      chains in the Web3 ecosystem.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={startGame}>
                      Start Game
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          ) : (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
              <Card className="bg-black/80 border-purple-900/50 mb-4 w-80">
                <CardContent className="p-4">
                  <p className="text-gray-300 text-sm">{levels[currentLevel].description}</p>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                {!bridgeComplete ? (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={buildBridge}
                    disabled={buildingBridge}
                  >
                    Build Bridge
                  </Button>
                ) : (
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={nextLevel}>
                    Next Level <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          <Canvas camera={{ position: [0, 10, 15], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {gameStarted && (
              <>
                <Network
                  position={[levels[currentLevel].from.position[0], 0, levels[currentLevel].from.position[2]]}
                  name={levels[currentLevel].from.name}
                  color={levels[currentLevel].from.color}
                />
                <Network
                  position={[levels[currentLevel].to.position[0], 0, levels[currentLevel].to.position[2]]}
                  name={levels[currentLevel].to.name}
                  color={levels[currentLevel].to.color}
                />
                <Bridge
                  startPosition={levels[currentLevel].from.position}
                  endPosition={levels[currentLevel].to.position}
                  isBuilding={buildingBridge}
                  isComplete={bridgeComplete}
                />
              </>
            )}

            <Environment preset="night" />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </main>
    </div>
  )
}
