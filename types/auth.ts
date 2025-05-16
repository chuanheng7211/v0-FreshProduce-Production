export type UserRole = "admin" | "production_lead" | "sales" | "planner" | "staff" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface Permission {
  action: string
  subject: string
}

// Updated role permissions based on the requirements document
export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [{ action: "manage", subject: "all" }],
  production_lead: [
    { action: "read", subject: "forecast" },
    { action: "read", subject: "production" },
    { action: "manage", subject: "labor" },
    { action: "manage", subject: "task" },
    { action: "read", subject: "material" },
    { action: "manage", subject: "yield" },
  ],
  sales: [
    { action: "read", subject: "forecast" },
    { action: "update", subject: "forecast" },
    { action: "read", subject: "customer" },
    { action: "read", subject: "order" },
    { action: "read", subject: "report" },
  ],
  planner: [
    { action: "read", subject: "all" },
    { action: "create", subject: "forecast" },
    { action: "update", subject: "forecast" },
    { action: "create", subject: "production" },
    { action: "update", subject: "production" },
  ],
  staff: [
    { action: "read", subject: "task" },
    { action: "update", subject: "task" },
    { action: "read", subject: "labor" },
    { action: "read", subject: "material" },
  ],
  viewer: [
    { action: "read", subject: "forecast" },
    { action: "read", subject: "production" },
    { action: "read", subject: "report" },
  ],
}

// Define which tabs/views are visible to which roles
export const roleVisibleViews: Record<UserRole, string[]> = {
  admin: ["forecast", "production", "labor", "yield", "task", "report", "settings"],
  production_lead: ["task", "labor", "material", "yield"],
  sales: ["forecast", "customer", "order", "report"],
  planner: ["forecast", "production", "material", "report"],
  staff: ["task", "labor", "material"],
  viewer: ["forecast", "production", "report"],
}
