"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

const resources = [
  {
    id: "docs",
    title: "Documentation",
    items: [
      { title: "Polygon Docs", url: "https://polygon.technology/developers" },
      { title: "Polygon Academy", url: "https://academy.polygon.technology/" },
      { title: "Polygon Blog", url: "https://blog.polygon.technology/" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    items: [
      { title: "Polygon SDK", url: "https://github.com/maticnetwork/matic-sdk" },
      { title: "Polygon Faucet", url: "https://faucet.polygon.technology/" },
      { title: "Polygon Bridge", url: "https://wallet.polygon.technology/bridge" },
    ],
  },
  {
    id: "community",
    title: "Community",
    items: [
      { title: "Polygon Discord", url: "https://discord.com/invite/polygon" },
      { title: "Polygon Forum", url: "https://forum.polygon.technology/" },
      { title: "Polygon Twitter", url: "https://twitter.com/0xPolygon" },
    ],
  },
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("docs")

  return (
    <div className="min-h-screen dark flex flex-col">
      <Navbar />
      <main className="flex-1 p-2 md:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link href="/">
              <Button variant="ghost" className="text-purple-400 text-sm p-1">
                <ArrowLeft className="mr-1 h-3 w-3" /> Back to Home
              </Button>
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/50 border-purple-900/50">
              <CardHeader className="p-4">
                <CardTitle className="text-xl text-white">Polygon Resources</CardTitle>
                <CardDescription className="text-gray-400 text-sm">
                  Explore helpful resources to further your understanding of Polygon
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 gap-2">
                    {resources.map((resource) => (
                      <TabsTrigger
                        key={resource.id}
                        value={resource.id}
                        className="text-xs py-1 px-2 data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                      >
                        {resource.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {resources.map((resource) => (
                    <TabsContent key={resource.id} value={resource.id}>
                      <Card className="bg-black/30 border-purple-900/30 mt-2">
                        <CardHeader className="p-2">
                          <CardTitle className="text-lg text-white">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                          <ul className="space-y-1">
                            {resource.items.map((item, index) => (
                              <motion.li
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              >
                                <Link
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-400 hover:text-purple-300 flex items-center text-sm"
                                >
                                  {item.title}
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
