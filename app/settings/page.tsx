"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, User, Bell, Shield, Wallet, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/navbar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

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
                <CardTitle className="text-2xl text-white">Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger
                      value="profile"
                      className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Notifications</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="wallet"
                      className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Wallet</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="display-name" className="text-white">
                          Display Name
                        </Label>
                        <Input
                          id="display-name"
                          placeholder="Your display name"
                          defaultValue="CryptoLearner"
                          className="bg-black/30 border-purple-900/30 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          defaultValue="user@example.com"
                          className="bg-black/30 border-purple-900/30 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-white">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          defaultValue="Blockchain enthusiast learning about Polygon Network"
                          className="bg-black/30 border-purple-900/30 text-white min-h-[100px]"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Moon className="h-4 w-4 text-purple-400" />
                          <Label htmlFor="dark-mode" className="text-white">
                            Dark Mode
                          </Label>
                        </div>
                        <Switch
                          id="dark-mode"
                          checked={isDarkMode}
                          onCheckedChange={toggleDarkMode}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Email Notifications</p>
                          <p className="text-gray-400 text-sm">Receive notifications via email</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-purple-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">New Lessons</p>
                          <p className="text-gray-400 text-sm">Get notified when new lessons are available</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-purple-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Achievement Alerts</p>
                          <p className="text-gray-400 text-sm">Get notified when you earn achievements</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-purple-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Marketing Emails</p>
                          <p className="text-gray-400 text-sm">Receive promotional content and updates</p>
                        </div>
                        <Switch className="data-[state=checked]:bg-purple-600" />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Preferences</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password" className="text-white">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          type="password"
                          placeholder="Enter current password"
                          className="bg-black/30 border-purple-900/30 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-white">
                          New Password
                        </Label>
                        <Input
                          id="new-password"
                          type="password"
                          placeholder="Enter new password"
                          className="bg-black/30 border-purple-900/30 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-white">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm new password"
                          className="bg-black/30 border-purple-900/30 text-white"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <Switch className="data-[state=checked]:bg-purple-600" />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Update Password</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="wallet" className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-black/30 border border-purple-900/30 rounded-lg p-4">
                        <p className="text-white font-medium">Connected Wallet</p>
                        <p className="text-purple-400 font-mono mt-2">0x1234...5678</p>
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <p className="text-gray-400 text-sm">Connected to Polygon Network</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white font-medium">Wallet Balance</p>
                        <div className="flex justify-between bg-black/30 border border-purple-900/30 rounded-lg p-4">
                          <span className="text-gray-400">MATIC</span>
                          <span className="text-white font-medium">25.5</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Disconnect</Button>
                        <Button className="flex-1 bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-900/30">
                          Switch Network
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
