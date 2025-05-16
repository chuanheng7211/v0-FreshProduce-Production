"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample schedule data
const scheduleData = [
  {
    id: "SCH001",
    date: "May 13, 2025",
    shift: "Morning",
    department: "Assembly",
    headcount: 12,
    products: ["Product A", "Product C"],
    status: "Confirmed",
  },
  {
    id: "SCH002",
    date: "May 13, 2025",
    shift: "Evening",
    department: "Assembly",
    headcount: 10,
    products: ["Product B"],
    status: "Confirmed",
  },
  {
    id: "SCH003",
    date: "May 14, 2025",
    shift: "Morning",
    department: "Packaging",
    headcount: 8,
    products: ["Product A", "Product D"],
    status: "Pending",
  },
  {
    id: "SCH004",
    date: "May 14, 2025",
    shift: "Evening",
    department: "Assembly",
    headcount: 12,
    products: ["Product C"],
    status: "Confirmed",
  },
  {
    id: "SCH005",
    date: "May 15, 2025",
    shift: "Morning",
    department: "Quality Control",
    headcount: 6,
    products: ["Product A", "Product B", "Product E"],
    status: "Pending",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Confirmed":
      return <Badge className="bg-emerald-500">Confirmed</Badge>
    case "Pending":
      return <Badge variant="outline">Pending</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export default function UpcomingSchedule() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Shift</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Headcount</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scheduleData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.shift}</TableCell>
            <TableCell>{item.department}</TableCell>
            <TableCell>{item.headcount}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {item.products.map((product, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
