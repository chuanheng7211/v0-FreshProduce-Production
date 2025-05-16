"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"

interface PermissionGateProps {
  children: React.ReactNode
  action: string
  subject: string
  fallback?: React.ReactNode
}

export function PermissionGate({ children, action, subject, fallback = null }: PermissionGateProps) {
  const { can } = useAuth()

  if (!can(action, subject)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
