"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Download, Filter, Search, SlidersHorizontal, Users, Clock, CalendarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Sample data for labor planning
const staffData = [
  {
    id: "staff1",
    name: "John Smith",
    department: "Production",
    role: "Line Worker",
    skills: ["Cutting", "Assembly", "Packaging"],
    availability: "Full-time",
    hoursPerWeek: 40,
    assignedHours: 32,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "staff2",
    name: "Jane Doe",
    department: "Production",
    role: "Supervisor",
    skills: ["Quality Control", "Training", "Scheduling"],
    availability: "Full-time",
    hoursPerWeek: 40,
    assignedHours: 38,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "staff3",
    name: "Mike Johnson",
    department: "Packaging",
    role: "Packager",
    skills: ["Packaging", "Labeling", "Inventory"],
    availability: "Part-time",
    hoursPerWeek: 20,
    assignedHours: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "staff4",
    name: "Sarah Williams",
    department: "Production",
    role: "Line Worker",
    skills: ["Assembly", "Packaging", "Quality Control"],
    availability: "Full-time",
    hoursPerWeek: 40,
    assignedHours: 28,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "staff5",
    name: "Robert Brown",
    department: "Maintenance",
    role: "Technician",
    skills: ["Equipment Repair", "Preventative Maintenance", "Troubleshooting"],
    availability: "Full-time",
    hoursPerWeek: 40,
    assignedHours: 35,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const departmentData = [
  {
    id: "dept1",
    name: "Production",
    totalStaff: 15,
    assignedHours: 520,
    totalCapacity: 600,
    utilization: 0.87,
  },
  {
    id: "dept2",
    name: "Packaging",
    totalStaff: 8,
    assignedHours: 240,
    totalCapacity: 320,
    utilization: 0.75,
  },
  {
    id: "dept3",
    name: "Quality Control",
    totalStaff: 4,
    assignedHours: 140,
    totalCapacity: 160,
    utilization: 0.88,
  },
  {
    id: "dept4",
    name: "Maintenance",
    totalStaff: 3,
    assignedHours: 95,
    totalCapacity: 120,
    utilization: 0.79,
  },
]

const shiftData = [
  {
    id: "shift1",
    name: "Morning Shift",
    startTime: "06:00",
    endTime: "14:00",
    staffCount: 12,
    departments: ["Production", "Packaging", "Quality Control"],
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "shift2",
    name: "Afternoon Shift",
    startTime: "14:00",
    endTime: "22:00",
    staffCount: 10,
    departments: ["Production", "Packaging"],
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    id: "shift3",
    name: "Night Shift",
    startTime: "22:00",
    endTime: "06:00",
    staffCount: 8,
    departments: ["Production", "Maintenance"],
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  },
  {
    id: "shift4",
    name: "Weekend Shift",
    startTime: "08:00",
    endTime: "20:00",
    staffCount: 6,
    departments: ["Production", "Packaging", "Maintenance"],
    daysOfWeek: ["Saturday", "Sunday"],
  },
]

export default function LaborPlanningView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState("2025-05-12")

  // Filter staff based on search query and filters
  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (departmentFilter === "all" || staff.department === departmentFilter) &&
      (roleFilter === "all" || staff.role === roleFilter),
  )

  // Calculate utilization percentage
  const calculateUtilization = (assigned: number, total: number) => {
    return (assigned / total) * 100
  }

  // Get utilization color based on percentage
  const getUtilizationColor = (percentage: number) => {
    if (percentage < 70) return "bg-blue-500"
    if (percentage < 90) return "bg-green-500"
    return "bg-red-500"
  }

  return (
    <div className="flex h-full">
      {/* Left Panel (Filters) */}
      <div className={`border-r bg-background transition-all duration-200 ${showFilters ? "w-64" : "w-0 -ml-64"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
              <SlidersHorizontal className="h-4 w-4" />
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
                    <SelectItem value="Quality Control">Quality Control</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Line Worker">Line Worker</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Packager">Packager</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Utilization</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select utilization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="under">Under-utilized ({"<"}70%)</SelectItem>
                    <SelectItem value="optimal">Optimal (70-90%)</SelectItem>
                    <SelectItem value="over">Over-utilized ({">"}90%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Skills</Label>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-cutting" />
                    <label htmlFor="skill-cutting" className="text-sm">
                      Cutting
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-assembly" />
                    <label htmlFor="skill-assembly" className="text-sm">
                      Assembly
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-packaging" />
                    <label htmlFor="skill-packaging" className="text-sm">
                      Packaging
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-qc" />
                    <label htmlFor="skill-qc" className="text-sm">
                      Quality Control
                    </label>
                  </div>
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
                placeholder="Search staff..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-05-05">May 5-11, 2025</SelectItem>
                <SelectItem value="2025-05-12">May 12-18, 2025</SelectItem>
                <SelectItem value="2025-05-19">May 19-25, 2025</SelectItem>
                <SelectItem value="2025-05-26">May 26-Jun 1, 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <Tabs defaultValue="staff" className="space-y-4">
              <TabsList>
                <TabsTrigger value="staff" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Staff Utilization
                </TabsTrigger>
                <TabsTrigger value="departments" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Department Capacity
                </TabsTrigger>
                <TabsTrigger value="shifts" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Shift Planning
                </TabsTrigger>
              </TabsList>
              <TabsContent value="staff" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Utilization</CardTitle>
                    <CardDescription>View and manage staff hours and assignments</CardDescription>
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
                            <TableHead>Availability</TableHead>
                            <TableHead>Utilization</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStaff.map((staff) => (
                            <TableRow key={staff.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar>
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
                              <TableCell>{staff.department}</TableCell>
                              <TableCell>{staff.role}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {staff.skills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {staff.availability}
                                  <Badge variant="outline" className="ml-1">
                                    {staff.hoursPerWeek}h/week
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="w-full">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{staff.assignedHours}h</span>
                                    <span>{staff.hoursPerWeek}h</span>
                                  </div>
                                  <Progress
                                    value={calculateUtilization(staff.assignedHours, staff.hoursPerWeek)}
                                    className={getUtilizationColor(
                                      calculateUtilization(staff.assignedHours, staff.hoursPerWeek),
                                    )}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="departments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Capacity</CardTitle>
                    <CardDescription>Overview of department workload and capacity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead>Total Staff</TableHead>
                            <TableHead>Assigned Hours</TableHead>
                            <TableHead>Total Capacity</TableHead>
                            <TableHead>Utilization</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {departmentData.map((dept) => (
                            <TableRow key={dept.id}>
                              <TableCell className="font-medium">{dept.name}</TableCell>
                              <TableCell>{dept.totalStaff}</TableCell>
                              <TableCell>{dept.assignedHours}h</TableCell>
                              <TableCell>{dept.totalCapacity}h</TableCell>
                              <TableCell>
                                <div className="w-full">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{(dept.utilization * 100).toFixed(0)}%</span>
                                  </div>
                                  <Progress
                                    value={dept.utilization * 100}
                                    className={getUtilizationColor(dept.utilization * 100)}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="shifts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Shift Planning</CardTitle>
                    <CardDescription>Manage production shifts and staff assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Shift Name</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Staff Count</TableHead>
                            <TableHead>Departments</TableHead>
                            <TableHead>Days</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shiftData.map((shift) => (
                            <TableRow key={shift.id}>
                              <TableCell className="font-medium">{shift.name}</TableCell>
                              <TableCell>
                                {shift.startTime} - {shift.endTime}
                              </TableCell>
                              <TableCell>{shift.staffCount}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {shift.departments.map((dept, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {dept}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {shift.daysOfWeek.map((day, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {day.substring(0, 3)}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
