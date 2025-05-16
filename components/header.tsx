"use client"

import { useAuth } from "@/context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { BellIcon, HelpCircle, Settings } from "lucide-react"
import { RoleSwitcher } from "./role-switcher"

export default function Header() {
  const { user } = useAuth()

  // Function to get role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator"
      case "production_lead":
        return "Production Lead"
      case "sales":
        return "Sales Team"
      case "planner":
        return "Planner"
      case "staff":
        return "Staff"
      case "viewer":
        return "Viewer"
      default:
        return role.replace("_", " ").charAt(0).toUpperCase() + role.replace("_", " ").slice(1)
    }
  }

  // Function to get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500"
      case "production_lead":
        return "bg-blue-500"
      case "sales":
        return "bg-green-500"
      case "planner":
        return "bg-amber-500"
      case "staff":
        return "bg-slate-500"
      case "viewer":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static lg:h-[60px] lg:px-6">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Sales Forecasting & Production Planning</h1>
      </div>
      <div className="flex items-center gap-2">
        <RoleSwitcher />
        <Button variant="outline" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                <Badge className={`mt-2 ${getRoleBadgeColor(user?.role || "")}`}>
                  {getRoleDisplayName(user?.role || "")}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
