"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Clock, Download, Filter, Search, X, ClipboardList, Users, UserPlus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Sample task data
const taskData = [
  {
    id: "t1",
    name: "Product A - Cutting",
    product: "Product A",
    taskType: "Cutting",
    quantity: 1250,
    estimatedHours: 31.25,
    assignedTo: [],
    startDate: "2025-05-15",
    endDate: "2025-05-16",
    status: "Pending Assignment",
    priority: "High",
    department: "Production",
  },
  {
    id: "t2",
    name: "Product A - Assembly",
    product: "Product A",
    taskType: "Assembly",
    quantity: 1250,
    estimatedHours: 31.25,
    assignedTo: [
      {
        id: "user1",
        name: "John Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Production",
        role: "Assembler",
      },
    ],
    startDate: "2025-05-17",
    endDate: "2025-05-18",
    status: "Assigned",
    priority: "High",
    department: "Production",
  },
  {
    id: "t3",
    name: "Product B - Mixing",
    product: "Product B",
    taskType: "Mixing",
    quantity: 800,
    estimatedHours: 20,
    assignedTo: [],
    startDate: "",
    endDate: "",
    status: "Pending Assignment",
    priority: "Medium",
    department: "Production",
  },
  {
    id: "t4",
    name: "Ingredient X - Processing",
    product: "Ingredient X",
    taskType: "Processing",
    quantity: 2100,
    estimatedHours: 35,
    assignedTo: [
      {
        id: "user2",
        name: "Jane Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Production",
        role: "Processor",
      },
      {
        id: "user3",
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        department: "Production",
        role: "Assistant",
      },
    ],
    startDate: "2025-05-20",
    endDate: "2025-05-22",
    status: "Assigned",
    priority: "High",
    department: "Production",
  },
  {
    id: "t5",
    name: "Product C - Packaging",
    product: "Product C",
    taskType: "Packaging",
    quantity: 550,
    estimatedHours: 13.75,
    assignedTo: [],
    startDate: "",
    endDate: "",
    status: "Pending Assignment",
    priority: "Low",
    department: "Packaging",
  },
]

// Sample staff data
const staffData = [
  {
    id: "user1",
    name: "John Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Production",
    role: "Assembler",
    skills: ["Assembly", "Packaging"],
    availability: "Available",
    currentLoad: 32,
  },
  {
    id: "user2",
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Production",
    role: "Processor",
    skills: ["Processing", "Quality Control"],
    availability: "Assigned",
    currentLoad: 35,
  },
  {
    id: "user3",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Production",
    role: "Assistant",
    skills: ["Cutting", "Assembly", "Processing"],
    availability: "Available",
    currentLoad: 20,
  },
  {
    id: "user4",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Packaging",
    role: "Packager",
    skills: ["Packaging", "Quality Control"],
    availability: "Available",
    currentLoad: 0,
  },
  {
    id: "user5",
    name: "Robert Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Production",
    role: "Cutter",
    skills: ["Cutting", "Assembly"],
    availability: "Available",
    currentLoad: 15,
  },
]

// Format time function
const formatTime = (hours: number) => {
  const days = Math.floor(hours / 8)
  const remainingHours = Math.round((hours % 8) * 10) / 10

  if (days > 0) {
    return `${days}d ${remainingHours}h`
  }
  return `${remainingHours}h`
}

export default function TaskAssignmentView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [tasks, setTasks] = useState(taskData)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<string[]>([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const { toast } = useToast()

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (departmentFilter === "all" || task.department === departmentFilter) &&
      (statusFilter === "all" || task.status === statusFilter) &&
      (priorityFilter === "all" || task.priority === priorityFilter),
  )

  // Open assignment dialog
  const openAssignDialog = (task: any) => {
    setSelectedTask(task)
    setSelectedStaff(task.assignedTo.map((staff: any) => staff.id))
    setStartDate(task.startDate || "")
    setEndDate(task.endDate || "")
    setAssignDialogOpen(true)
  }

  // Toggle staff selection
  const toggleStaffSelection = (staffId: string) => {
    if (selectedStaff.includes(staffId)) {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId))
    } else {
      setSelectedStaff([...selectedStaff, staffId])
    }
  }

  // Assign staff to task
  const assignStaffToTask = () => {
    if (!selectedTask) return

    const assignedStaff = staffData.filter((staff) => selectedStaff.includes(staff.id))

    setTasks(
      tasks.map((task) => {
        if (task.id === selectedTask.id) {
          return {
            ...task,
            assignedTo: assignedStaff,
            startDate,
            endDate,
            status: assignedStaff.length > 0 ? "Assigned" : "Pending Assignment",
          }
        }
        return task
      }),
    )

    setAssignDialogOpen(false)

    toast({
      title: "Staff assigned successfully",
      description: `${assignedStaff.length} staff members assigned to ${selectedTask.name}`,
    })
  }

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-500">High</Badge>
      case "Medium":
        return <Badge className="bg-amber-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-blue-500">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Assigned":
        return <Badge className="bg-green-500">Assigned</Badge>
      case "Pending Assignment":
        return <Badge variant="outline">Pending Assignment</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex h-full">
      {/* Left Panel (Filters) */}
      <div className={`border-r bg-background transition-all duration-200 ${showFilters ? "w-64" : "w-0 -ml-64"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Packaging">Packaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="Pending Assignment">Pending Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" defaultValue="2025-05-01" />
                  <Input type="date" defaultValue="2025-05-31" />
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!showFilters && (
              <Button variant="outline" size="icon" onClick={() => setShowFilters(true)}>
                <Filter className="h-4 w-4" />
              </Button>
            )}
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              May 2025
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <Tabs defaultValue="tasks" className="space-y-4">
              <TabsList>
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="staff" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Staff
                </TabsTrigger>
                <TabsTrigger value="forecast-tasks" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Forecast Tasks
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tasks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Task Assignment</CardTitle>
                    <CardDescription>Assign staff to production tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Estimated Time</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTasks.map((task) => (
                            <TableRow key={task.id}>
                              <TableCell>
                                <div className="font-medium">{task.name}</div>
                                <div className="text-sm text-muted-foreground">{task.department}</div>
                              </TableCell>
                              <TableCell>{task.quantity}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  {formatTime(task.estimatedHours)}
                                </div>
                                {task.startDate && task.endDate && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(task.startDate).toLocaleDateString()} -{" "}
                                    {new Date(task.endDate).toLocaleDateString()}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                {task.assignedTo.length > 0 ? (
                                  <div className="flex -space-x-2">
                                    {task.assignedTo.map((staff: any, index: number) => (
                                      <TooltipProvider key={staff.id}>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Avatar className="h-8 w-8 border-2 border-background">
                                              <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                                              <AvatarFallback>
                                                {staff.name
                                                  .split(" ")
                                                  .map((n: string) => n[0])
                                                  .join("")}
                                              </AvatarFallback>
                                            </Avatar>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>{staff.name}</p>
                                            <p className="text-xs text-muted-foreground">{staff.role}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    ))}
                                  </div>
                                ) : (
                                  <Badge variant="outline">Unassigned</Badge>
                                )}
                              </TableCell>
                              <TableCell>{getStatusBadge(task.status)}</TableCell>
                              <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" onClick={() => openAssignDialog(task)}>
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  Assign
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="staff" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Availability</CardTitle>
                    <CardDescription>View staff workload and availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Staff</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Skills</TableHead>
                            <TableHead>Current Load</TableHead>
                            <TableHead>Availability</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {staffData.map((staff) => (
                            <TableRow key={staff.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                                    <AvatarFallback>
                                      {staff.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{staff.name}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{staff.department}</TableCell>
                              <TableCell>{staff.role}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {staff.skills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="w-full bg-muted rounded-full h-2.5">
                                  <div
                                    className={cn(
                                      "h-2.5 rounded-full",
                                      staff.currentLoad < 20
                                        ? "bg-green-500"
                                        : staff.currentLoad < 32
                                          ? "bg-amber-500"
                                          : "bg-red-500",
                                    )}
                                    style={{ width: `${Math.min(staff.currentLoad, 40) * 2.5}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {formatTime(staff.currentLoad)} / {formatTime(40)}
                                </div>
                              </TableCell>
                              <TableCell>
                                {staff.availability === "Available" ? (
                                  <Badge className="bg-green-500">Available</Badge>
                                ) : (
                                  <Badge className="bg-amber-500">Assigned</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="forecast-tasks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Forecast-Generated Tasks</CardTitle>
                    <CardDescription>Tasks generated from confirmed forecasts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Task Type</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Estimated Hours</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              id: "ft1",
                              product: "Product A",
                              taskType: "Cutting",
                              quantity: 1250,
                              estimatedHours: 31.25,
                              status: "Pending Assignment",
                            },
                            {
                              id: "ft2",
                              product: "Product A",
                              taskType: "Assembly",
                              quantity: 1250,
                              estimatedHours: 31.25,
                              status: "Pending Assignment",
                            },
                            {
                              id: "ft3",
                              product: "Product A",
                              taskType: "Packaging",
                              quantity: 1250,
                              estimatedHours: 31.25,
                              status: "Pending Assignment",
                            },
                            {
                              id: "ft4",
                              product: "Product A",
                              taskType: "Quality Control",
                              quantity: 1250,
                              estimatedHours: 31.25,
                              status: "Pending Assignment",
                            },
                            {
                              id: "ft5",
                              product: "Ingredient X",
                              taskType: "Sourcing",
                              quantity: 2100,
                              estimatedHours: 35,
                              status: "Assigned",
                            },
                            {
                              id: "ft6",
                              product: "Ingredient X",
                              taskType: "Processing",
                              quantity: 2100,
                              estimatedHours: 35,
                              status: "Assigned",
                            },
                            {
                              id: "ft7",
                              product: "Ingredient X",
                              taskType: "Quality Control",
                              quantity: 2100,
                              estimatedHours: 35,
                              status: "Pending Assignment",
                            },
                          ].map((task) => (
                            <TableRow key={task.id}>
                              <TableCell>{task.product}</TableCell>
                              <TableCell>{task.taskType}</TableCell>
                              <TableCell>{task.quantity}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                  {formatTime(task.estimatedHours)}
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(task.status)}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  Assign
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing tasks from confirmed forecasts for May 2025
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export Tasks
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Staff Assignment Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Assign Staff to Task</DialogTitle>
            <DialogDescription>Select staff members to assign to this task.</DialogDescription>
          </DialogHeader>

          {selectedTask && (
            <div className="py-4">
              <div className="mb-4 p-3 border rounded-md bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{selectedTask.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTask.department}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    {formatTime(selectedTask.estimatedHours)}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Quantity:</span> {selectedTask.quantity}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Priority:</span> {selectedTask.priority}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Schedule</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <div className="space-y-1">
                      <Label className="text-xs" htmlFor="start-date">
                        Start Date
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs" htmlFor="end-date">
                        End Date
                      </Label>
                      <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Available Staff</Label>
                  <div className="border rounded-md max-h-[240px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]"></TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Skills</TableHead>
                          <TableHead>Current Load</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staffData.map((staff) => (
                          <TableRow key={staff.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedStaff.includes(staff.id)}
                                onCheckedChange={() => toggleStaffSelection(staff.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                                  <AvatarFallback>
                                    {staff.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{staff.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {staff.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="outline"
                                    className={cn(
                                      "text-xs",
                                      skill === selectedTask.taskType && "bg-green-100 border-green-500",
                                    )}
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="w-full bg-muted rounded-full h-2.5">
                                <div
                                  className={cn(
                                    "h-2.5 rounded-full",
                                    staff.currentLoad < 20
                                      ? "bg-green-500"
                                      : staff.currentLoad < 32
                                        ? "bg-amber-500"
                                        : "bg-red-500",
                                  )}
                                  style={{ width: `${Math.min(staff.currentLoad, 40) * 2.5}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {formatTime(staff.currentLoad)} / {formatTime(40)}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={assignStaffToTask}>Assign Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
