"use client"

import ForecastReviewPanel from "@/components/forecast-review-panel"
import ProtectedRoute from "@/components/protected-route"

export default function ForecastReview() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "forecast" }}>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Forecast Review</h1>
        <ForecastReviewPanel />
      </div>
    </ProtectedRoute>
  )
}
