"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import { AVAILABLE_ROLES } from "@/context/auth-context"
import { UserIcon } from "lucide-react"
import type { UserRole } from "@/types/auth"

export function RoleSwitcher() {
  const { user, switchRole } = useAuth()

  const handleRoleChange = (role: UserRole) => {
    switchRole(role)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span>
            Role: {user?.role.replace("_", " ").charAt(0).toUpperCase() + user?.role.replace("_", " ").slice(1)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {AVAILABLE_ROLES.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => handleRoleChange(role.id as UserRole)}
            className={user?.role === role.id ? "bg-accent" : ""}
          >
            <div className="flex flex-col">
              <span>{role.name}</span>
              <span className="text-xs text-muted-foreground">{role.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
