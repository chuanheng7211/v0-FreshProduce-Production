"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LockIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: { action: string; subject: string }
}

export default function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { can } = useAuth()
  const router = useRouter()

  // Check if the user has the required permission
  if (requiredPermission && !can(requiredPermission.action, requiredPermission.subject)) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockIcon className="h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              Your current role doesn't have permission to access this page. Try switching to a different role using the
              role switcher in the header.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")} className="w-full">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
