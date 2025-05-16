"use client"

import ForecastExplorerView from "@/components/forecast-explorer-view"
import ProtectedRoute from "@/components/protected-route"

export default function ForecastExplorer() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "forecast" }}>
      <div className="h-[calc(100vh-60px)]">
        <ForecastExplorerView />
      </div>
    </ProtectedRoute>
  )
}
