"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"

// This is a mock function to simulate searching across pages
// In a real application, you would implement a proper search algorithm
function searchPages(query: string) {
  const allPages = [
    { title: "Home", content: "Welcome to Polygon for Dummies", url: "/" },
    { title: "Learn", content: "Start your journey in blockchain education", url: "/learn" },
    { title: "Games", content: "Play interactive games to understand blockchain concepts", url: "/games" },
    { title: "Resources", content: "Explore additional materials about Polygon and blockchain", url: "/resources" },
    { title: "Missions", content: "Complete challenges to earn rewards", url: "/missions" },
    { title: "About", content: "Learn about our mission and vision", url: "/about" },
    { title: "FAQ", content: "Find answers to common questions", url: "/faq" },
    { title: "Contact", content: "Get in touch with us", url: "/contact" },
  ]

  return allPages.filter(
    (page) =>
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.content.toLowerCase().includes(query.toLowerCase()),
  )
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<Array<{ title: string; content: string; url: string }>>([])

  useEffect(() => {
    const searchResults = searchPages(query)
    setResults(searchResults)
  }, [query])

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
                <CardTitle className="text-2xl text-white">Search Results</CardTitle>
                <CardDescription className="text-gray-400">
                  Showing results for: <span className="text-purple-400">{query}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <ul className="space-y-4">
                    {results.map((result, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link href={result.url} className="block">
                          <h3 className="text-lg font-semibold text-purple-400">{result.title}</h3>
                          <p className="text-gray-300">{result.content}</p>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300">No results found for your search query.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
