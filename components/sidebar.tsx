"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Calendar,
  ClipboardList,
  FileSpreadsheet,
  Home,
  Scale,
  Settings,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Forecast Review", href: "/forecast-review", icon: TrendingUp },
  { name: "Forecast Adjustment", href: "/forecast-adjustment", icon: BarChart3 },
  { name: "Production Calculator", href: "/production-calculator", icon: ClipboardList },
  { name: "Task Assignment", href: "/task-assignment", icon: Users },
  { name: "Yield Calculator", href: "/yield-calculator", icon: Scale },
  { name: "Inventory", href: "/inventory", icon: Warehouse },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Reports", href: "/reports", icon: FileSpreadsheet },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <TrendingUp className="h-6 w-6" />
            <span>ForecastPro</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}
