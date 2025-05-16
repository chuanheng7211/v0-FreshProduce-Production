"use client"

import ProductSummaryView from "@/components/product-summary-view"
import ProtectedRoute from "@/components/protected-route"

export default function ProductSummary() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "production" }}>
      <div className="h-[calc(100vh-60px)]">
        <ProductSummaryView />
      </div>
    </ProtectedRoute>
  )
}
