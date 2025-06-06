"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Menu,
  X,
  Moon,
  Sun,
  User,
  Settings,
  Award,
  BookOpen,
  Search,
  Home,
  Gamepad,
  Briefcase,
  HelpCircle,
  Coins,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { PolygonIcon } from "@/components/polygon-icon"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/learn", icon: BookOpen, label: "Learn", protected: true },
    { href: "/games", icon: Gamepad, label: "Games", protected: true },
    { href: "/missions", icon: Award, label: "Missions", protected: true },
    { href: "/resources", icon: Briefcase, label: "Resources", protected: true },
    { href: "/token-earnings", icon: Coins, label: "Token Earnings", protected: true },
    { href: "/profile", icon: User, label: "Profile", protected: true },
  ]

  // Filter nav items based on authentication status
  const filteredNavItems = navItems.filter((item) => !item.protected || isAuthenticated)

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <PolygonIcon className="w-8 h-8 mr-2" />
              <span className="text-white font-bold text-xl">Polygon for Dummies</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/30 border-purple-900/30 text-white w-40 pr-8"
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full text-gray-400">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-4 text-purple-400 border-purple-800"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={logout} className="text-purple-400 border-purple-800">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-purple-400 border-purple-800">
                  Login
                </Button>
              </Link>
            )}
            <WalletConnect />
          </div>

          <div className="md:hidden flex items-center">
            <WalletConnect />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-purple-400 ml-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-purple-900/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white hover:bg-purple-900/30 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </div>
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="text-gray-300 hover:text-white hover:bg-purple-900/30 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full text-left"
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </div>
              </button>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 hover:text-white hover:bg-purple-900/30 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </div>
              </Link>
            )}
            <Link
              href="/settings"
              className="text-gray-300 hover:text-white hover:bg-purple-900/30 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
            </Link>
            <Link
              href="/faq"
              className="text-gray-300 hover:text-white hover:bg-purple-900/30 block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </div>
            </Link>
            <form onSubmit={handleSearch} className="relative mt-3">
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/30 border-purple-900/30 text-white w-full pr-8"
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full text-gray-400">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <div className="pt-4 pb-3 border-t border-purple-900/30">
            <div className="flex items-center px-5">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="text-purple-400 border-purple-800"
              >
                {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
