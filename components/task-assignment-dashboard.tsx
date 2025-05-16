"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Plus } from "lucide-react"

// Sample data for the task assignment dashboard
const taskData = [
  {
    id: 1,
    product: "Product A",
    quantity: 470,
    timeRequired: 23.5,
    assignedTo: "John Smith",
    status: "Assigned",
    startTime: "08:00",
    endTime: "12:00",
  },
  {
    id: 2,
    product: "Product B",
    quantity: 320,
    timeRequired: 25.6,
    assignedTo: "Jane Doe",
    status: "In Progress",
    startTime: "08:00",
    endTime: "14:00",
  },
  {
    id: 3,
    product: "Product C",
    quantity: 250,
    timeRequired: 30.0,
    assignedTo: "Robert Johnson",
    status: "Pending",
    startTime: "12:00",
    endTime: "18:00",
  },
  {
    id: 4,
    product: "Product D",
    quantity: 180,
    timeRequired: 27.0,
    assignedTo: "",
    status: "Unassigned",
    startTime: "",
    endTime: "",
  },
  {
    id: 5,
    product: "Product E",
    quantity: 120,
    timeRequired: 24.0,
    assignedTo: "",
    status: "Unassigned",
    startTime: "",
    endTime: "",
  },
]

// Sample workers data
const workers = [
  { id: "worker1", name: "John Smith", skills: ["Product A", "Product B", "Product C"], availability: "Full-time" },
  { id: "worker2", name: "Jane Doe", skills: ["Product A", "Product B", "Product D"], availability: "Full-time" },
  { id: "worker3", name: "Robert Johnson", skills: ["Product C", "Product E"], availability: "Full-time" },
  { id: "worker4", name: "Sarah Williams", skills: ["Product A", "Product D", "Product E"], availability: "Part-time" },
  { id: "worker5", name: "Michael Brown", skills: ["Product B", "Product C"], availability: "Part-time" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Assigned":
      return <Badge className="bg-blue-500">Assigned</Badge>
    case "In Progress":
      return <Badge className="bg-green-500">In Progress</Badge>
    case "Completed":
      return <Badge className="bg-gray-500">Completed</Badge>
    case "Pending":
      return <Badge variant="outline">Pending</Badge>
    case "Unassigned":
      return <Badge variant="destructive">Unassigned</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export default function TaskAssignmentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("calendar")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Production Date
          </label>
          <div className="relative">
            <Button variant="outline" className="w-full justify-start text-left font-normal" type="button">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : "Select date"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="view" className="text-sm font-medium">
            View Type
          </label>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger id="view">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="calendar">Calendar View</SelectItem>
              <SelectItem value="kanban">Kanban View</SelectItem>
              <SelectItem value="list">List View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Production Task</DialogTitle>
                <DialogDescription>Create a new production task and assign it to a worker</DialogDescription>
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
                  <Label htmlFor="worker" className="text-right">
                    Assign To
                  </Label>
                  <Select>
                    <SelectTrigger id="worker" className="col-span-3">
                      <SelectValue placeholder="Select worker" />
                    </SelectTrigger>
                    <SelectContent>
                      {workers.map((worker) => (
                        <SelectItem key={worker.id} value={worker.id}>
                          {worker.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-time" className="text-right">
                    Start Time
                  </Label>
                  <Input id="start-time" type="time" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-time" className="text-right">
                    End Time
                  </Label>
                  <Input id="end-time" type="time" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="workers">Workers</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="space-y-4">
          {view === "calendar" && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">Tasks for {date?.toLocaleDateString()}</h3>
                    <div className="border rounded-md p-4 h-[220px] overflow-auto">
                      {taskData.length > 0 ? (
                        <div className="space-y-2">
                          {taskData.map((task) => (
                            <div key={task.id} className="border rounded-md p-2">
                              <div className="flex justify-between items-center">
                                <div className="font-medium">{task.product}</div>
                                {getStatusBadge(task.status)}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {task.assignedTo ? `Assigned to: ${task.assignedTo}` : "Unassigned"}
                              </div>
                              {task.startTime && task.endTime && (
                                <div className="text-sm text-muted-foreground">
                                  Time: {task.startTime} - {task.endTime}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No tasks scheduled for this date.</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {view === "list" && (
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Time Required (hrs)</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Time Slot</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {taskData.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.product}</TableCell>
                          <TableCell>{task.quantity}</TableCell>
                          <TableCell>{task.timeRequired.toFixed(1)}</TableCell>
                          <TableCell>
                            {task.assignedTo ? (
                              task.assignedTo
                            ) : (
                              <Select>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Assign worker" />
                                </SelectTrigger>
                                <SelectContent>
                                  {workers.map((worker) => (
                                    <SelectItem key={worker.id} value={worker.id}>
                                      {worker.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </TableCell>
                          <TableCell>
                            {task.startTime && task.endTime ? (
                              `${task.startTime} - ${task.endTime}`
                            ) : (
                              <span className="text-muted-foreground">Not scheduled</span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
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
              </CardContent>
            </Card>
          )}

          {view === "kanban" && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium p-2 bg-muted rounded-md">Unassigned</h3>
                    <div className="border rounded-md p-2 min-h-[300px]">
                      {taskData
                        .filter((task) => task.status === "Unassigned")
                        .map((task) => (
                          <div key={task.id} className="border rounded-md p-2 mb-2">
                            <div className="font-medium">{task.product}</div>
                            <div className="text-sm text-muted-foreground mt-1">Quantity: {task.quantity}</div>
                            <div className="text-sm text-muted-foreground">
                              Time: {task.timeRequired.toFixed(1)} hrs
                            </div>
                            <div className="mt-2">
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Assign worker" />
                                </SelectTrigger>
                                <SelectContent>
                                  {workers.map((worker) => (
                                    <SelectItem key={worker.id} value={worker.id}>
                                      {worker.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium p-2 bg-muted rounded-md">Assigned / Pending</h3>
                    <div className="border rounded-md p-2 min-h-[300px]">
                      {taskData
                        .filter((task) => task.status === "Assigned" || task.status === "Pending")
                        .map((task) => (
                          <div key={task.id} className="border rounded-md p-2 mb-2">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{task.product}</div>
                              {getStatusBadge(task.status)}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Assigned to: {task.assignedTo}</div>
                            {task.startTime && task.endTime && (
                              <div className="text-sm text-muted-foreground">
                                Time: {task.startTime} - {task.endTime}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium p-2 bg-muted rounded-md">In Progress / Completed</h3>
                    <div className="border rounded-md p-2 min-h-[300px]">
                      {taskData
                        .filter((task) => task.status === "In Progress" || task.status === "Completed")
                        .map((task) => (
                          <div key={task.id} className="border rounded-md p-2 mb-2">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{task.product}</div>
                              {getStatusBadge(task.status)}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Assigned to: {task.assignedTo}</div>
                            {task.startTime && task.endTime && (
                              <div className="text-sm text-muted-foreground">
                                Time: {task.startTime} - {task.endTime}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="workers" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Worker</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Assigned Tasks</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workers.map((worker) => {
                      const assignedTasks = taskData.filter((task) => task.assignedTo === worker.name)
                      const totalHours = assignedTasks.reduce((sum, task) => sum + task.timeRequired, 0)
                      const utilization = totalHours > 0 ? (totalHours / 8) * 100 : 0

                      return (
                        <TableRow key={worker.id}>
                          <TableCell>{worker.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {worker.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{worker.availability}</TableCell>
                          <TableCell>{assignedTasks.length}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    utilization > 100
                                      ? "bg-red-500"
                                      : utilization > 80
                                        ? "bg-amber-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${Math.min(utilization, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs">{utilization.toFixed(0)}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Schedule
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button variant="outline">Save Draft</Button>
        <Button>Finalize Assignments</Button>
      </div>
    </div>
  )
}
