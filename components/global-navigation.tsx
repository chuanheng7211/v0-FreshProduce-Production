"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, LineChart, Users, Scale, FileSpreadsheet, Settings, Home } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function GlobalNavigation() {
  const pathname = usePathname()
  const { can } = useAuth()

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      permission: { action: "read", subject: "dashboard" },
    },
    {
      title: "Forecast Explorer",
      href: "/forecast-explorer",
      icon: LineChart,
      permission: { action: "read", subject: "forecast" },
    },
    {
      title: "Product Summary",
      href: "/product-summary",
      icon: BarChart3,
      permission: { action: "read", subject: "production" },
    },
    {
      title: "Labor Planning",
      href: "/labor-planning",
      icon: Users,
      permission: { action: "read", subject: "labor" },
    },
    {
      title: "Yield Tracker",
      href: "/yield-tracker",
      icon: Scale,
      permission: { action: "read", subject: "production" },
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileSpreadsheet,
      permission: { action: "read", subject: "report" },
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      permission: { action: "read", subject: "settings" },
    },
  ]

  // Filter routes based on user permissions
  const filteredRoutes = routes.filter((route) => can(route.permission.action, route.permission.subject))

  return (
    <div className="flex h-full w-[70px] flex-col items-center border-r bg-background py-4">
      <div className="flex flex-col items-center gap-4">
        {filteredRoutes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-10 w-10 rounded-full", pathname === route.href && "bg-primary/10 text-primary")}
            >
              <route.icon className="h-5 w-5" />
              <span className="sr-only">{route.title}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
