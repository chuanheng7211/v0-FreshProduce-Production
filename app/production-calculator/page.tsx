"use client"

import ProductionTimeCalculator from "@/components/production-time-calculator"
import ProtectedRoute from "@/components/protected-route"

export default function ProductionCalculator() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "production" }}>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Production Time Calculator</h1>
        <ProductionTimeCalculator />
      </div>
    </ProtectedRoute>
  )
}
