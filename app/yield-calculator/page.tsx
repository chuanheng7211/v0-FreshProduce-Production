"use client"

import PoundageCalculator from "@/components/poundage-calculator"
import ProtectedRoute from "@/components/protected-route"

export default function YieldCalculator() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "production" }}>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Yield & Poundage Calculator</h1>
        <PoundageCalculator />
      </div>
    </ProtectedRoute>
  )
}
