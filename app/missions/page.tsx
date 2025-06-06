"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Clock, Trophy, Star, ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Navbar from "@/components/navbar"

export default function MissionsPage() {
  const [filter, setFilter] = useState("all")

  // Mock missions data
  const missions = [
    {
      id: 1,
      title: "Polygon Basics",
      description: "Complete the Polygon Basics learning module",
      reward: "50 XP",
      progress: 100,
      status: "completed",
      type: "learning",
      difficulty: "beginner",
    },
    {
      id: 2,
      title: "Token Master",
      description: "Score 100 points in the Token Toss game",
      reward: "75 XP + Token Master Badge",
      progress: 65,
      status: "in-progress",
      type: "game",
      difficulty: "intermediate",
    },
    {
      id: 3,
      title: "Bridge Builder",
      description: "Complete all levels in the Bridge Builder game",
      reward: "100 XP + Bridge Expert Badge",
      progress: 0,
      status: "not-started",
      type: "game",
      difficulty: "advanced",
    },
    {
      id: 4,
      title: "DeFi Explorer",
      description: "Learn about DeFi on Polygon and complete the quiz",
      reward: "80 XP",
      progress: 0,
      status: "not-started",
      type: "learning",
      difficulty: "intermediate",
    },
    {
      id: 5,
      title: "NFT Creator",
      description: "Create your first NFT in the NFT Creator game",
      reward: "60 XP + NFT Creator Badge",
      progress: 0,
      status: "not-started",
      type: "game",
      difficulty: "beginner",
    },
    {
      id: 6,
      title: "Gas Fee Expert",
      description: "Win 5 races in the Gas Racer game",
      reward: "90 XP",
      progress: 40,
      status: "in-progress",
      type: "game",
      difficulty: "intermediate",
    },
  ]

  const filteredMissions =
    filter === "all"
      ? missions
      : missions.filter((mission) =>
          filter === "completed"
            ? mission.status === "completed"
            : filter === "in-progress"
              ? mission.status === "in-progress"
              : mission.status === "not-started",
        )

  return (
    <div className="min-h-screen dark flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" className="text-purple-400">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-purple-400 border-purple-800">
                  <Filter className="mr-2 h-4 w-4" /> Filter:{" "}
                  {filter.charAt(0).toUpperCase() + filter.slice(1).replace("-", " ")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-purple-900/50">
                <DropdownMenuItem
                  className="text-white hover:bg-purple-900/50 cursor-pointer"
                  onClick={() => setFilter("all")}
                >
                  All Missions
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-white hover:bg-purple-900/50 cursor-pointer"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-white hover:bg-purple-900/50 cursor-pointer"
                  onClick={() => setFilter("in-progress")}
                >
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-white hover:bg-purple-900/50 cursor-pointer"
                  onClick={() => setFilter("not-started")}
                >
                  Not Started
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50 mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Missions</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete missions to earn XP, badges, and learn about Polygon Network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="bg-black/30 border-purple-900/30">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mb-2">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {missions.filter((m) => m.status === "completed").length}
                      </p>
                      <p className="text-gray-400 text-sm">Completed</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/30 border-purple-900/30">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-2">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {missions.filter((m) => m.status === "in-progress").length}
                      </p>
                      <p className="text-gray-400 text-sm">In Progress</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/30 border-purple-900/30">
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mb-2">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-white text-lg font-bold">{missions.length}</p>
                      <p className="text-gray-400 text-sm">Total Missions</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {filteredMissions.map((mission) => (
                    <Card key={mission.id} className="bg-black/30 border-purple-900/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="text-white font-medium">{mission.title}</h3>
                              <Badge
                                className={`ml-2 ${
                                  mission.difficulty === "beginner"
                                    ? "bg-green-600"
                                    : mission.difficulty === "intermediate"
                                      ? "bg-blue-600"
                                      : "bg-purple-600"
                                }`}
                              >
                                {mission.difficulty}
                              </Badge>
                              <Badge
                                className={`ml-2 ${mission.type === "learning" ? "bg-yellow-600" : "bg-pink-600"}`}
                              >
                                {mission.type}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{mission.description}</p>
                            <div className="flex items-center mb-2">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-gray-300 text-sm">Reward: {mission.reward}</span>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-gray-400 text-xs">Progress</span>
                                <span className="text-gray-400 text-xs">{mission.progress}%</span>
                              </div>
                              <Progress
                                value={mission.progress}
                                className="h-2"
                                indicatorColor={
                                  mission.status === "completed"
                                    ? "bg-green-600"
                                    : mission.status === "in-progress"
                                      ? "bg-blue-600"
                                      : "bg-gray-600"
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <Button
                              className={`w-full md:w-auto ${
                                mission.status === "completed"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-purple-600 hover:bg-purple-700"
                              } text-white`}
                              disabled={mission.status === "completed"}
                            >
                              {mission.status === "completed"
                                ? "Completed"
                                : mission.status === "in-progress"
                                  ? "Continue"
                                  : "Start Mission"}
                              {mission.status !== "completed" && <ArrowRight className="ml-2 h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
