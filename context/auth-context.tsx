"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { UserRole } from "@/types/auth"

// Define available roles
export const AVAILABLE_ROLES = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all features",
  },
  {
    id: "production_lead",
    name: "Production Lead",
    description: "Manage production and workforce",
  },
  {
    id: "sales",
    name: "Sales Team",
    description: "View and adjust forecasts",
  },
  {
    id: "planner",
    name: "Planner",
    description: "Plan production and resources",
  },
  {
    id: "staff",
    name: "Staff",
    description: "View assigned tasks",
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "View-only access",
  },
]

// Define permissions for each role
const rolePermissions = {
  admin: {
    dashboard: ["read", "create", "update", "delete"],
    forecast: ["read", "create", "update", "delete"],
    production: ["read", "create", "update", "delete"],
    labor: ["read", "create", "update", "delete"],
    report: ["read", "create", "update", "delete"],
    settings: ["read", "create", "update", "delete"],
  },
  production_lead: {
    dashboard: ["read"],
    forecast: ["read"],
    production: ["read", "create", "update"],
    labor: ["read", "create", "update"],
    report: ["read"],
    settings: ["read"],
  },
  sales: {
    dashboard: ["read"],
    forecast: ["read", "update"],
    production: ["read"],
    labor: ["read"],
    report: ["read"],
    settings: ["read"],
  },
  planner: {
    dashboard: ["read"],
    forecast: ["read"],
    production: ["read", "update"],
    labor: ["read", "update"],
    report: ["read"],
    settings: ["read"],
  },
  staff: {
    dashboard: ["read"],
    forecast: ["read"],
    production: ["read"],
    labor: ["read"],
    report: ["read"],
    settings: ["read"],
  },
  viewer: {
    dashboard: ["read"],
    forecast: ["read"],
    production: ["read"],
    labor: ["read"],
    report: ["read"],
    settings: ["read"],
  },
}

// Define user type
type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
  can: (action: string, subject: string) => boolean
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Simulate loading user from storage on mount
  useEffect(() => {
    // In a real app, you would check for a token in localStorage
    // and validate it with your backend
    const mockUser: User = {
      id: "user1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      avatar: "/placeholder.svg?height=32&width=32",
    }
    setUser(mockUser)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    // and receive a token
    const mockUser: User = {
      id: "user1",
      name: "John Doe",
      email,
      role: "admin",
      avatar: "/placeholder.svg?height=32&width=32",
    }
    setUser(mockUser)
  }

  // Logout function
  const logout = () => {
    // In a real app, you would clear the token from localStorage
    setUser(null)
  }

  // Switch role function (for demo purposes)
  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  // Permission check function
  const can = (action: string, subject: string) => {
    if (!user) return false

    const permissions = rolePermissions[user.role as keyof typeof rolePermissions]
    if (!permissions) return false

    const subjectPermissions = permissions[subject as keyof typeof permissions]
    if (!subjectPermissions) return false

    return subjectPermissions.includes(action)
  }

  return <AuthContext.Provider value={{ user, login, logout, switchRole, can }}>{children}</AuthContext.Provider>
}

// Auth hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
