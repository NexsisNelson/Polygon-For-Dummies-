"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

// Pages that don't require authentication
const publicPages = ["/", "/login", "/signup"]

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip protection for public pages
    if (publicPages.includes(pathname)) {
      return
    }

    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return null
  }

  // If on a protected page and not authenticated, don't render children
  if (!publicPages.includes(pathname) && !isAuthenticated) {
    return null
  }

  // Otherwise, render the children
  return <>{children}</>
}
