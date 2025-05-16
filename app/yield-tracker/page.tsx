"use client"

import YieldTrackerView from "@/components/yield-tracker-view"
import ProtectedRoute from "@/components/protected-route"

export default function YieldTracker() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "production" }}>
      <div className="h-[calc(100vh-60px)]">
        <YieldTrackerView />
      </div>
    </ProtectedRoute>
  )
}
