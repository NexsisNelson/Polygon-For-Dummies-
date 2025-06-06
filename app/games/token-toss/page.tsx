"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Physics, useBox, usePlane } from "@react-three/cannon"
import { Environment, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import { ArrowLeft, RefreshCw, Info } from "lucide-react"
import Link from "next/link"
import { useWeb3 } from "@/lib/web3"

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1e1e2f" />
    </mesh>
  )
}

function Coin({ position, onCollide }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    rotation: [Math.random(), Math.random(), Math.random()],
    onCollide: (e) => onCollide(e),
  }))

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
      <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

export default function TokenTossGame() {
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [coins, setCoins] = useState([])
  const controls = useAnimation()
  const gameAreaRef = useRef(null)
  const { isConnected } = useWeb3()

  const handleToss = () => {
    if (coins.length < 10) {
      const newCoin = {
        id: Date.now(),
        position: [Math.random() * 4 - 2, 5, Math.random() * 4 - 2],
      }
      setCoins([...coins, newCoin])
    }
  }

  const handleCoinCollide = (e) => {
    if (e.contact.impactVelocity > 1.5) {
      setScore((prev) => prev + Math.floor(e.contact.impactVelocity))
    }
  }

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setCoins([])
  }

  const resetGame = () => {
    setGameStarted(false)
    setScore(0)
    setCoins([])
  }

  useEffect(() => {
    if (!isConnected) {
      setGameStarted(false)
      setScore(0)
      setCoins([])
    }
  }, [isConnected])

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
                <CardTitle className="text-white">Token Toss Game</CardTitle>
                <CardDescription className="text-gray-400">How to play</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Toss tokens onto the platform to earn points. The harder they land, the more points you earn!</p>
                <p className="mt-2">
                  This game represents how tokens are transferred on the Polygon Network - fast, efficient, and with low
                  fees.
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

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 px-4 py-2 rounded-full">
          <p className="text-purple-400 font-bold">Score: {score}</p>
        </div>

        <div className="h-screen w-full" ref={gameAreaRef}>
          {!isConnected ? (
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
                    <CardTitle className="text-white text-center">Token Toss</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                      Learn about tokens on Polygon
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p>
                      Toss tokens and learn how transactions work on the Polygon Network. The harder they land, the more
                      points you earn!
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
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleToss}
                disabled={coins.length >= 10}
              >
                Toss Token
              </Button>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-950"
                onClick={resetGame}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          )}

          <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
            <Physics>
              <Plane />
              {gameStarted &&
                coins.map((coin) => <Coin key={coin.id} position={coin.position} onCollide={handleCoinCollide} />)}
            </Physics>
            <Environment preset="night" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </main>
    </div>
  )
}
