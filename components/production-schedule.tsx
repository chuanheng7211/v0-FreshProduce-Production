"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus } from "lucide-react"

// Sample production schedule data
const scheduleData = [
  {
    id: "PRD001",
    product: "Product A",
    quantity: 1500,
    startDate: "2025-05-15",
    endDate: "2025-05-20",
    department: "Assembly",
    status: "Scheduled",
    priority: "High",
  },
  {
    id: "PRD002",
    product: "Product B",
    quantity: 800,
    startDate: "2025-05-18",
    endDate: "2025-05-22",
    department: "Assembly",
    status: "Scheduled",
    priority: "Medium",
  },
  {
    id: "PRD003",
    product: "Product C",
    quantity: 1200,
    startDate: "2025-05-20",
    endDate: "2025-05-25",
    department: "Packaging",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "PRD004",
    product: "Product D",
    quantity: 500,
    startDate: "2025-05-22",
    endDate: "2025-05-26",
    department: "Assembly",
    status: "Scheduled",
    priority: "Low",
  },
  {
    id: "PRD005",
    product: "Product E",
    quantity: 2000,
    startDate: "2025-05-25",
    endDate: "2025-05-30",
    department: "Quality Control",
    status: "Pending",
    priority: "High",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Scheduled":
      return <Badge className="bg-emerald-500">Scheduled</Badge>
    case "In Progress":
      return <Badge className="bg-blue-500">In Progress</Badge>
    case "Pending":
      return <Badge variant="outline">Pending</Badge>
    case "Completed":
      return <Badge className="bg-gray-500">Completed</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "High":
      return <Badge className="bg-red-500">High</Badge>
    case "Medium":
      return <Badge className="bg-amber-500">Medium</Badge>
    case "Low":
      return <Badge className="bg-green-500">Low</Badge>
    default:
      return <Badge>{priority}</Badge>
  }
}

export default function ProductionSchedule() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            May 2025
          </Button>
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="outline" size="sm">
            Week
          </Button>
          <Button variant="outline" size="sm">
            Month
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Production Run
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Production Run</DialogTitle>
              <DialogDescription>Create a new production run for scheduling</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Product
                </Label>
                <Select>
                  <SelectTrigger id="product" className="col-span-3">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="productA">Product A</SelectItem>
                    <SelectItem value="productB">Product B</SelectItem>
                    <SelectItem value="productC">Product C</SelectItem>
                    <SelectItem value="productD">Product D</SelectItem>
                    <SelectItem value="productE">Product E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input id="quantity" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-date" className="text-right">
                  Start Date
                </Label>
                <Input id="start-date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end-date" className="text-right">
                  End Date
                </Label>
                <Input id="end-date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select>
                  <SelectTrigger id="department" className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assembly">Assembly</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                    <SelectItem value="quality">Quality Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select>
                  <SelectTrigger id="priority" className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Production Run</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">Production Runs for {date?.toLocaleDateString()}</h3>
          <div className="border rounded-md p-4 h-[220px] overflow-auto">
            <p className="text-sm text-muted-foreground">No production runs scheduled for this date.</p>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-xs">
                {item.startDate} to {item.endDate}
              </TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>{getPriorityBadge(item.priority)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
