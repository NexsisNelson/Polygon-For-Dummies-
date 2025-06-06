import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-900/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Polygon Network for Dummies</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              A fun, interactive way to learn about the Polygon Network and Web3 technology through games and
              challenges. Join our community and start your blockchain journey today!
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="text-gray-400 hover:text-purple-400">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-purple-400">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://discord.com" className="text-gray-400 hover:text-purple-400">
                <Discord className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-purple-400">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-purple-400">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="text-gray-400 hover:text-purple-400">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-gray-400 hover:text-purple-400">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/missions" className="text-gray-400 hover:text-purple-400">
                  Missions
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-purple-400">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-purple-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-purple-400">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Learn</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learn/basics" className="text-gray-400 hover:text-purple-400">
                  Polygon Basics
                </Link>
              </li>
              <li>
                <Link href="/learn/tokens" className="text-gray-400 hover:text-purple-400">
                  Tokens & NFTs
                </Link>
              </li>
              <li>
                <Link href="/learn/defi" className="text-gray-400 hover:text-purple-400">
                  DeFi on Polygon
                </Link>
              </li>
              <li>
                <Link href="/learn/scaling" className="text-gray-400 hover:text-purple-400">
                  Scaling Solutions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-900/30 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Polygon Network for Dummies. All rights reserved.
          </p>
          <p className="text-gray-500 mt-2">Built with ❤️ by Nexsosphere Technologies for the community.</p>
        </div>
      </div>
    </footer>
  )
}
