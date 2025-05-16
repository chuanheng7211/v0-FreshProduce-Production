"use client"

import TaskAssignmentView from "@/components/task-assignment-view"
import ProtectedRoute from "@/components/protected-route"

export default function TaskAssignment() {
  return (
    <ProtectedRoute requiredPermission={{ action: "update", subject: "labor" }}>
      <div className="h-[calc(100vh-60px)]">
        <TaskAssignmentView />
      </div>
    </ProtectedRoute>
  )
}
