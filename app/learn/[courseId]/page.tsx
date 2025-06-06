"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Code, Coins, Shield, Zap, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import useSound from "use-sound"
import { toast } from "react-hot-toast"

const courses = {
  "polygon-basics": {
    title: "Polygon Basics",
    description: "Learn the fundamentals of the Polygon Network",
    icon: <Shield className="w-12 h-12" />,
    difficulty: "Beginner",
    duration: "2 hours",
    color: "bg-purple-600",
    content:
      "This course covers the basics of Polygon, including its architecture, consensus mechanism, and how it relates to Ethereum. You'll learn about the benefits of using Polygon for scalability and lower transaction costs.",
    modules: [
      {
        title: "Introduction to Polygon",
        content: "Learn about the history and purpose of Polygon...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/polygon-network.jpg",
      },
      {
        title: "Polygon Architecture",
        content: "Explore the technical architecture of Polygon...",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/polygon-architecture.jpg",
      },
      {
        title: "Consensus Mechanism",
        content: "Understand how Polygon achieves consensus...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/consensus-mechanism.jpg",
      },
      {
        title: "Polygon vs Ethereum",
        content: "Compare Polygon and Ethereum in terms of scalability...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/polygon-vs-ethereum.jpg",
      },
      {
        title: "Use Cases and Applications",
        content: "Discover real-world applications built on Polygon...",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/polygon-use-cases.jpg",
      },
    ],
    tokenReward: 1000,
  },
  "ethereum-fundamentals": {
    title: "Ethereum Fundamentals",
    description: "Understand the core concepts of Ethereum",
    icon: <Zap className="w-12 h-12" />,
    difficulty: "Beginner",
    duration: "3 hours",
    color: "bg-blue-600",
    content:
      "This course provides a comprehensive introduction to Ethereum, covering its history, key concepts, and underlying technology. You'll gain a solid understanding of smart contracts, gas fees, and the Ethereum Virtual Machine (EVM).",
    modules: [
      {
        title: "What is Ethereum?",
        content: "Introduction to Ethereum blockchain...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/ethereum.jpg",
      },
      {
        title: "Blockchain Basics",
        content: "Fundamental concepts of blockchain technology...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/blockchain-basics.jpg",
      },
      {
        title: "Smart Contracts",
        content: "Understanding smart contracts on Ethereum...",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/smart-contracts.jpg",
      },
      {
        title: "Ethereum Virtual Machine",
        content: "Exploring the Ethereum Virtual Machine (EVM)...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/evm.jpg",
      },
      {
        title: "Gas and Transaction Fees",
        content: "Learn about gas and transaction fees on Ethereum...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/gas-fees.jpg",
      },
    ],
    tokenReward: 1500,
  },
  "defi-on-polygon": {
    title: "DeFi on Polygon",
    description: "Explore decentralized finance applications on Polygon",
    icon: <Coins className="w-12 h-12" />,
    difficulty: "Intermediate",
    duration: "4 hours",
    color: "bg-green-600",
    content:
      "Dive into the world of Decentralized Finance (DeFi) on the Polygon network. This course covers various DeFi protocols, yield farming, liquidity provision, and how to interact with DeFi applications on Polygon.",
    modules: [
      {
        title: "Introduction to DeFi",
        content: "What is DeFi and how does it work?",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/defi.jpg",
      },
      {
        title: "DeFi Protocols on Polygon",
        content: "Explore popular DeFi protocols on Polygon...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/defi-protocols.jpg",
      },
      {
        title: "Yield Farming Strategies",
        content: "Learn about yield farming strategies on Polygon...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/yield-farming.jpg",
      },
      {
        title: "Liquidity Provision",
        content: "Understand liquidity provision in DeFi...",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/liquidity-provision.jpg",
      },
      {
        title: "Risks and Security in DeFi",
        content: "Learn about the risks and security considerations in DeFi...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/defi-security.jpg",
      },
    ],
    tokenReward: 2000,
  },
  "smart-contracts": {
    title: "Smart Contract Development",
    description: "Learn to write and deploy smart contracts on Ethereum and Polygon",
    icon: <Code className="w-12 h-12" />,
    difficulty: "Advanced",
    duration: "6 hours",
    color: "bg-yellow-600",
    content:
      "This hands-on course teaches you how to develop, test, and deploy smart contracts on both Ethereum and Polygon. You'll learn Solidity programming and best practices for writing secure and efficient smart contracts.",
    modules: [
      {
        title: "Solidity Basics",
        content: "Learn the fundamentals of Solidity programming...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/solidity.jpg",
      },
      {
        title: "Smart Contract Structure",
        content: "Understand the structure of smart contracts...",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/smart-contract-structure.jpg",
      },
      {
        title: "Testing Smart Contracts",
        content: "Learn how to test your smart contracts...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/testing-smart-contracts.jpg",
      },
      {
        title: "Deployment on Ethereum and Polygon",
        content: "Deploy your smart contracts on Ethereum and Polygon...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/deployment.jpg",
      },
      {
        title: "Smart Contract Security",
        content: "Learn about security best practices for smart contracts...",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/smart-contract-security.jpg",
      },
    ],
    tokenReward: 3000,
  },
  "scaling-solutions": {
    title: "Blockchain Scaling Solutions",
    description: "Compare different scaling solutions including Polygon",
    icon: <BookOpen className="w-12 h-12" />,
    difficulty: "Intermediate",
    duration: "3 hours",
    color: "bg-red-600",
    content:
      "Explore various blockchain scaling solutions, with a focus on Polygon. This course compares different approaches to scaling, including Layer 2 solutions, sidechains, and other scaling technologies.",
    modules: [
      {
        title: "Blockchain Scaling Challenges",
        content: "Understanding the challenges of scaling blockchains...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/scaling-challenges.jpg",
      },
      {
        title: "Layer 2 Solutions",
        content: "Learn about Layer 2 scaling solutions...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/layer-2.jpg",
      },
      {
        title: "Sidechains and Plasma",
        content: "Explore sidechains and Plasma technologies...",
        video: "https://www.youtube.com/embed/IijtdpAtOt0",
        image: "/images/sidechains.jpg",
      },
      {
        title: "Rollups and State Channels",
        content: "Understand rollups and state channels...",
        video: "https://www.youtube.com/embed/M5BZou6C01w",
        image: "/images/rollups.jpg",
      },
      {
        title: "Comparing Scaling Solutions",
        content: "Compare different scaling solutions...",
        video: "https://www.youtube.com/embed/GWUwFDFOipo",
        image: "/images/comparing-solutions.jpg",
      },
    ],
    tokenReward: 1800,
  },
}

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const course = courses[courseId as keyof typeof courses]

  const [progress, setProgress] = useState(0)
  const [activeModule, setActiveModule] = useState(0)
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 })
  const [playSelect] = useSound("/sounds/select.mp3", { volume: 0.5 })

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`courseProgress_${courseId}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [courseId])

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress)
    localStorage.setItem(`courseProgress_${courseId}`, JSON.stringify(newProgress))
    if (newProgress === 100) {
      toast.success(
        `Congratulations! You've completed the ${course.title} course and earned ${course.tokenReward} P4D tokens!`,
      )
    }
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen dark flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/learn">
              <Button variant="ghost" className="text-purple-400 text-lg">
                <ArrowLeft className="mr-2 h-6 w-6" /> Back to Courses
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50 mb-8">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className={`mr-6 p-4 ${course.color} rounded-full`}>{course.icon}</div>
                  <div>
                    <CardTitle className="text-3xl text-white mb-2">{course.title}</CardTitle>

                    <CardDescription className="text-xl text-gray-400">{course.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="text-lg px-3 py-1 bg-blue-600">{course.difficulty}</Badge>
                  <Badge className="text-lg px-3 py-1 bg-green-600">{course.duration}</Badge>
                  <Badge className="text-lg px-3 py-1 bg-yellow-600">Reward: {course.tokenReward} P4D</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 text-lg">{course.content}</p>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white mb-4">Course Modules</h3>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="video">Video</TabsTrigger>
                      <TabsTrigger value="image">Image</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-gray-300">{course.modules[activeModule].content}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="video" className="mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-w-16 aspect-h-9">
                            <iframe
                              src={course.modules[activeModule].video}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            ></iframe>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="image" className="mt-4">
                      <Card>
                        <CardContent className="p-4">
                          <Image
                            src={course.modules[activeModule].image || "/placeholder.svg"}
                            alt={course.modules[activeModule].title}
                            width={800}
                            height={450}
                            className="rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setActiveModule(index)
                        playSelect()
                      }}
                      onMouseEnter={() => playHover()}
                    >
                      <Card
                        className={`bg-gray-800 border-gray-700 cursor-pointer ${activeModule === index ? "ring-2 ring-purple-500" : ""}`}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <span className="text-white">{module.title}</span>
                          {index <= Math.floor(progress / (100 / course.modules.length)) && (
                            <CheckCircle className="text-green-500 h-5 w-5" />
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-400">Course Progress</span>
                    <span className="text-gray-400">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
                  onClick={() => {
                    playSelect()
                    const newProgress = Math.min(100, progress + Math.floor(100 / course.modules.length))
                    updateProgress(newProgress)
                  }}
                >
                  {progress >= 100 ? "Review Course" : "Continue Learning"}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
