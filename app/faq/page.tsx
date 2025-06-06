"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navbar from "@/components/navbar"

const faqs = [
  {
    question: "What is Polygon?",
    answer:
      "Polygon is a Layer 2 scaling solution for Ethereum that aims to provide faster and cheaper transactions while maintaining the security of the Ethereum mainnet.",
  },
  {
    question: "How do I get started with Polygon for Dummies?",
    answer:
      "To get started, simply create an account on our platform. You can then explore our interactive lessons, play educational games, and complete missions to learn about blockchain and Polygon.",
  },
  {
    question: "Do I need any prior knowledge to use Polygon for Dummies?",
    answer:
      "No prior knowledge is required! Our platform is designed for beginners and gradually introduces more advanced concepts as you progress.",
  },
  {
    question: "Are the games on Polygon for Dummies free to play?",
    answer:
      "Yes, all games and educational content on Polygon for Dummies are free to access. We believe in making blockchain education accessible to everyone.",
  },
  {
    question: "How can I earn rewards on the platform?",
    answer:
      "You can earn rewards by completing lessons, playing games, and participating in missions. These rewards may include XP points, badges, and sometimes even crypto tokens (subject to legal restrictions).",
  },
]

export default function FAQPage() {
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
                <CardTitle className="text-2xl text-white">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-gray-400">
                  Find answers to common questions about Polygon for Dummies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-white hover:text-purple-400">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
