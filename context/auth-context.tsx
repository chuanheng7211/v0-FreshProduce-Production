"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { type User, type UserRole, rolePermissions, roleVisibleViews } from "@/types/auth"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  switchRole: (role: UserRole) => void
  can: (action: string, subject: string) => boolean
  getVisibleViews: () => string[]
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Default user for development
const DEFAULT_USER = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin" as UserRole,
  department: "Management",
  avatar: "/placeholder.svg?height=32&width=32",
}

// Role switcher options
export const AVAILABLE_ROLES = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all features",
  },
  {
    id: "production_lead",
    name: "Production Lead",
    description: "Access to task assignments and material requirements",
  },
  {
    id: "sales",
    name: "Sales Team",
    description: "Access to forecasts and customer order trends",
  },
  {
    id: "planner",
    name: "Planner",
    description: "Access to planning and forecasting features",
  },
  {
    id: "staff",
    name: "Staff",
    description: "Limited access to assigned tasks",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const supabase = createClientSupabaseClient()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        // Get user profile from database
        const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

        if (profile) {
          setAuthState({
            user: {
              id: profile.id,
              name: profile.name || session.user.email?.split("@")[0] || "User",
              email: session.user.email || "",
              role: profile.role as UserRole,
              department: profile.department,
              avatar: profile.avatar_url,
            },
            isAuthenticated: true,
            isLoading: false,
          })
        } else {
          // For development, set a default user
          setAuthState({
            user: DEFAULT_USER,
            isAuthenticated: true,
            isLoading: false,
          })
        }
      } else {
        // For development, set a default user
        setAuthState({
          user: DEFAULT_USER,
          isAuthenticated: true,
          isLoading: false,
        })
      }
    }

    checkSession()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Get user profile from database
        const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

        if (profile) {
          setAuthState({
            user: {
              id: profile.id,
              name: profile.name || session.user.email?.split("@")[0] || "User",
              email: session.user.email || "",
              role: profile.role as UserRole,
              department: profile.department,
              avatar: profile.avatar_url,
            },
            isAuthenticated: true,
            isLoading: false,
          })
        }
      } else if (event === "SIGNED_OUT") {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Function to switch between roles for demonstration
  const switchRole = (role: UserRole) => {
    if (authState.user) {
      setAuthState({
        ...authState,
        user: {
          ...authState.user,
          role,
        },
      })
    }
  }

  const can = (action: string, subject: string): boolean => {
    if (!authState.user) return false

    const userRole = authState.user.role
    const permissions = rolePermissions[userRole]

    // Check for admin with manage all permission
    if (permissions.some((p) => p.action === "manage" && p.subject === "all")) {
      return true
    }

    // Check for specific permission
    return permissions.some(
      (p) => (p.action === action && p.subject === subject) || (p.action === action && p.subject === "all"),
    )
  }

  // Get visible views based on user role
  const getVisibleViews = (): string[] => {
    if (!authState.user) return []
    return roleVisibleViews[authState.user.role]
  }

  // Login function
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  // Logout function
  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        switchRole,
        can,
        getVisibleViews,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
