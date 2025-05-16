"use client"

import DashboardSummary from "@/components/dashboard-summary"
import GuidedWorkflow from "@/components/guided-workflow"
import ProtectedRoute from "@/components/protected-route"

export default function Home() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "dashboard" }}>
      <div className="container mx-auto py-6">
        <GuidedWorkflow />
        <div className="mt-6">
          <DashboardSummary />
        </div>
      </div>
    </ProtectedRoute>
  )
}
