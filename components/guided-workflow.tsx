"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { CheckCircle, AlertCircle, Circle } from "lucide-react"

export default function GuidedWorkflow() {
  const pathname = usePathname()
  const router = useRouter()
  const { can } = useAuth()

  // Define the workflow steps
  const workflowSteps = [
    {
      id: 1,
      name: "Review Forecasts",
      href: "/forecast-explorer",
      status: "complete", // complete, warning, pending
      permission: { action: "read", subject: "forecast" },
    },
    {
      id: 2,
      name: "Adjust Forecasts",
      href: "/forecast-adjustment",
      status: "warning",
      permission: { action: "update", subject: "forecast" },
    },
    {
      id: 3,
      name: "Assign Labor",
      href: "/labor-planning",
      status: "pending",
      permission: { action: "update", subject: "labor" },
    },
    {
      id: 4,
      name: "Check Yield",
      href: "/yield-tracker",
      status: "pending",
      permission: { action: "read", subject: "production" },
    },
    {
      id: 5,
      name: "Export Plan",
      href: "/reports",
      status: "pending",
      permission: { action: "read", subject: "report" },
    },
  ]

  // Filter steps based on user permissions
  const filteredSteps = workflowSteps.filter((step) => can(step.permission.action, step.permission.subject))

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "pending":
        return <Circle className="h-5 w-5 text-gray-300" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  // Get status text color
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-500"
      case "warning":
        return "text-amber-500"
      case "pending":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  if (pathname === "/login") return null

  return (
    <div className="border-b bg-gray-50 px-4 py-2">
      <div className="flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-4">
          {filteredSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {index > 0 && <div className="mx-2 h-px w-8 bg-gray-300" />}
              <Button
                variant="ghost"
                className={cn("flex items-center space-x-2", pathname === step.href && "bg-gray-100")}
                onClick={() => router.push(step.href)}
              >
                {getStatusIcon(step.status)}
                <span className={cn("text-sm font-medium", getStatusTextColor(step.status))}>{step.name}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
