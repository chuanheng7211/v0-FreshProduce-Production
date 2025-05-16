"use client"

import ForecastAdjustmentView from "@/components/forecast-adjustment-view"
import ProtectedRoute from "@/components/protected-route"

export default function ForecastAdjustment() {
  return (
    <ProtectedRoute requiredPermission={{ action: "update", subject: "forecast" }}>
      <div className="h-[calc(100vh-60px)]">
        <ForecastAdjustmentView />
      </div>
    </ProtectedRoute>
  )
}
