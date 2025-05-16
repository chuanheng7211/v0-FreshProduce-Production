"use client"

import ExportReportCenter from "@/components/export-report-center"
import ProtectedRoute from "@/components/protected-route"

export default function Reports() {
  return (
    <ProtectedRoute requiredPermission={{ action: "read", subject: "report" }}>
      <div className="h-[calc(100vh-60px)]">
        <ExportReportCenter />
      </div>
    </ProtectedRoute>
  )
}
