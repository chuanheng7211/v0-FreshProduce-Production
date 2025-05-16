"use client"

import LaborPlanningView from "@/components/labor-planning-view"
import ProtectedRoute from "@/components/protected-route"

export default function LaborPlanning() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "labor" }}>
      <div className="h-[calc(100vh-60px)]">
        <LaborPlanningView />
      </div>
    </ProtectedRoute>
  )
}
