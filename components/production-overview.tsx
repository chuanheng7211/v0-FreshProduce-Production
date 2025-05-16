"use client"

import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

// Sample production data
const productionData = [
  { name: "On Schedule", value: 70, color: "#10b981" },
  { name: "Delayed", value: 20, color: "#f59e0b" },
  { name: "At Risk", value: 10, color: "#ef4444" },
]

// Detailed production data
const detailedProductionData = [
  {
    id: "PRD001",
    product: "Product A",
    status: "On Schedule",
    efficiency: 92,
    completion: 75,
    startDate: "2025-05-01",
    endDate: "2025-05-15",
  },
  {
    id: "PRD002",
    product: "Product B",
    status: "Delayed",
    efficiency: 78,
    completion: 45,
    startDate: "2025-05-03",
    endDate: "2025-05-18",
  },
  {
    id: "PRD003",
    product: "Product C",
    status: "On Schedule",
    efficiency: 95,
    completion: 60,
    startDate: "2025-05-05",
    endDate: "2025-05-20",
  },
  {
    id: "PRD004",
    product: "Product D",
    status: "At Risk",
    efficiency: 65,
    completion: 30,
    startDate: "2025-05-07",
    endDate: "2025-05-22",
  },
  {
    id: "PRD005",
    product: "Product E",
    status: "On Schedule",
    efficiency: 88,
    completion: 80,
    startDate: "2025-05-10",
    endDate: "2025-05-25",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On Schedule":
      return <Badge className="bg-emerald-500">On Schedule</Badge>
    case "Delayed":
      return <Badge className="bg-amber-500">Delayed</Badge>
    case "At Risk":
      return <Badge className="bg-red-500">At Risk</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

interface ProductionOverviewProps {
  detailed?: boolean
}

export default function ProductionOverview({ detailed = false }: ProductionOverviewProps) {
  if (detailed) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Efficiency</TableHead>
            <TableHead>Completion</TableHead>
            <TableHead>Timeline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {detailedProductionData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.product}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{item.efficiency}%</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={item.completion} className="h-2 w-[60px]" />
                  <span className="text-xs">{item.completion}%</span>
                </div>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {item.startDate} to {item.endDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={productionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {productionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Overall Efficiency</span>
          <span className="font-medium">87.3%</span>
        </div>
        <Progress value={87.3} className="h-2" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Resource Utilization</span>
          <span className="font-medium">92.1%</span>
        </div>
        <Progress value={92.1} className="h-2" />
      </div>
    </div>
  )
}
