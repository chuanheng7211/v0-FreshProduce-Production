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

// Sample workforce schedule data
const scheduleData = [
  {
    id: "SCH001",
    date: "May 13, 2025",
    shift: "Morning",
    department: "Assembly",
    employees: 12,
    supervisor: "John Smith",
    status: "Confirmed",
  },
  {
    id: "SCH002",
    date: "May 13, 2025",
    shift: "Evening",
    department: "Assembly",
    employees: 10,
    supervisor: "Jane Doe",
    status: "Confirmed",
  },
  {
    id: "SCH003",
    date: "May 14, 2025",
    shift: "Morning",
    department: "Packaging",
    employees: 8,
    supervisor: "Robert Johnson",
    status: "Pending",
  },
  {
    id: "SCH004",
    date: "May 14, 2025",
    shift: "Evening",
    department: "Assembly",
    employees: 12,
    supervisor: "Sarah Williams",
    status: "Confirmed",
  },
  {
    id: "SCH005",
    date: "May 15, 2025",
    shift: "Morning",
    department: "Quality Control",
    employees: 6,
    supervisor: "Michael Brown",
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

export default function WorkforceSchedule() {
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
              Add Shift
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Shift</DialogTitle>
              <DialogDescription>Create a new shift in the workforce schedule</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shift-date" className="text-right">
                  Date
                </Label>
                <Input id="shift-date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shift-type" className="text-right">
                  Shift
                </Label>
                <Select>
                  <SelectTrigger id="shift-type" className="col-span-3">
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="night">Night</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="employees" className="text-right">
                  Employees
                </Label>
                <Input id="employees" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supervisor" className="text-right">
                  Supervisor
                </Label>
                <Select>
                  <SelectTrigger id="supervisor" className="col-span-3">
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="jane">Jane Doe</SelectItem>
                    <SelectItem value="robert">Robert Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Shift</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">Shifts for {date?.toLocaleDateString()}</h3>
          <div className="border rounded-md p-4 h-[220px] overflow-auto">
            <p className="text-sm text-muted-foreground">No shifts scheduled for this date.</p>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Shift</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.shift}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.employees}</TableCell>
              <TableCell>{item.supervisor}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
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
