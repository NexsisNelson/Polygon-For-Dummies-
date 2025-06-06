"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Award, Trophy, Star, Clock, Settings, BookOpen, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import { useWeb3 } from "@/lib/web3"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { isConnected, account } = useWeb3()

  // Mock user data
  const user = {
    name: "CryptoLearner",
    level: 12,
    xp: 1250,
    nextLevelXp: 1500,
    completedLessons: 24,
    totalLessons: 36,
    joinedDate: "March 2023",
    achievements: [
      { id: 1, name: "First Steps", description: "Complete your first lesson", icon: "Trophy", date: "Mar 15, 2023" },
      {
        id: 2,
        name: "Bridge Master",
        description: "Complete the Bridge Builder game",
        icon: "Award",
        date: "Apr 2, 2023",
      },
      {
        id: 3,
        name: "Token Collector",
        description: "Earn 100 tokens in Token Toss",
        icon: "Star",
        date: "Apr 10, 2023",
      },
    ],
    recentActivity: [
      { id: 1, type: "lesson", name: "Polygon Basics", date: "2 days ago" },
      { id: 2, type: "game", name: "Gas Racer", score: 85, date: "3 days ago" },
      { id: 3, type: "game", name: "NFT Creator", date: "1 week ago" },
    ],
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen dark flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <Card className="w-full max-w-md bg-black/50 border-purple-900/50">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Connect Wallet</CardTitle>
              <CardDescription className="text-gray-400 text-center">
                Please connect your wallet to view your profile
              </CardDescription>
            </CardHeader>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" className="text-purple-400">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" className="text-purple-400 border-purple-800">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white text-3xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                    <p className="text-gray-400 mb-2">Joined {user.joinedDate}</p>
                    <p className="text-purple-400 font-mono text-sm mb-4">
                      {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Wallet Connected"}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge className="bg-purple-600 hover:bg-purple-700">Level {user.level}</Badge>
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        {user.completedLessons}/{user.totalLessons} Lessons
                      </Badge>
                      <Badge className="bg-green-600 hover:bg-green-700">{user.achievements.length} Achievements</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-900/50">
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-2">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="achievements"
                      className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                    >
                      Achievements
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                    >
                      Activity
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="overview" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white">Level Progress</span>
                        <span className="text-gray-400">
                          {user.xp}/{user.nextLevelXp} XP
                        </span>
                      </div>
                      <Progress value={(user.xp / user.nextLevelXp) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-black/30 border-purple-900/30">
                        <CardContent className="p-4 flex flex-col items-center">
                          <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                          <p className="text-white text-lg font-bold">{user.level}</p>
                          <p className="text-gray-400 text-sm">Current Level</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-black/30 border-purple-900/30">
                        <CardContent className="p-4 flex flex-col items-center">
                          <Award className="h-8 w-8 text-purple-500 mb-2" />
                          <p className="text-white text-lg font-bold">{user.achievements.length}</p>
                          <p className="text-gray-400 text-sm">Achievements</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-black/30 border-purple-900/30">
                        <CardContent className="p-4 flex flex-col items-center">
                          <Star className="h-8 w-8 text-blue-500 mb-2" />
                          <p className="text-white text-lg font-bold">{user.completedLessons}</p>
                          <p className="text-gray-400 text-sm">Lessons Completed</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-white text-lg font-medium mb-3">Recent Achievements</h3>
                      <div className="space-y-3">
                        {user.achievements.slice(0, 3).map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex items-center bg-black/30 border border-purple-900/30 rounded-lg p-3"
                          >
                            {achievement.icon === "Trophy" ? (
                              <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
                            ) : achievement.icon === "Award" ? (
                              <Award className="h-6 w-6 text-purple-500 mr-3" />
                            ) : (
                              <Star className="h-6 w-6 text-blue-500 mr-3" />
                            )}
                            <div>
                              <p className="text-white font-medium">{achievement.name}</p>
                              <p className="text-gray-400 text-sm">{achievement.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start bg-black/30 border border-purple-900/30 rounded-lg p-4"
                      >
                        {achievement.icon === "Trophy" ? (
                          <Trophy className="h-8 w-8 text-yellow-500 mr-3 mt-1" />
                        ) : achievement.icon === "Award" ? (
                          <Award className="h-8 w-8 text-purple-500 mr-3 mt-1" />
                        ) : (
                          <Star className="h-8 w-8 text-blue-500 mr-3 mt-1" />
                        )}
                        <div>
                          <p className="text-white font-medium">{achievement.name}</p>
                          <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-gray-400 text-xs">{achievement.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <div className="space-y-4">
                    {user.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between bg-black/30 border border-purple-900/30 rounded-lg p-4"
                      >
                        <div className="flex items-center">
                          {activity.type === "lesson" ? (
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                              <BookOpen className="h-5 w-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                              <Gamepad2 className="h-5 w-5 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-medium">{activity.name}</p>
                            <p className="text-gray-400 text-sm">
                              {activity.type === "lesson" ? "Completed lesson" : "Played game"}
                              {activity.score ? ` - Score: ${activity.score}` : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm">{activity.date}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
