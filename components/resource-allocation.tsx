"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample resource data
const resourceData = [
  {
    id: "RES001",
    name: "Assembly Line 1",
    type: "Equipment",
    capacity: 2000,
    allocated: 1500,
    utilization: 75,
    availability: "Available",
  },
  {
    id: "RES002",
    name: "Assembly Line 2",
    type: "Equipment",
    capacity: 1800,
    allocated: 1800,
    utilization: 100,
    availability: "Fully Allocated",
  },
  {
    id: "RES003",
    name: "Packaging Unit 1",
    type: "Equipment",
    capacity: 3000,
    allocated: 1200,
    utilization: 40,
    availability: "Available",
  },
  {
    id: "RES004",
    name: "QC Station",
    type: "Equipment",
    capacity: 2500,
    allocated: 2000,
    utilization: 80,
    availability: "Available",
  },
  {
    id: "RES005",
    name: "Assembly Team",
    type: "Personnel",
    capacity: 160,
    allocated: 140,
    utilization: 87.5,
    availability: "Available",
  },
]

// Sample utilization data for chart
const utilizationData = [
  { name: "Assembly Line 1", utilization: 75 },
  { name: "Assembly Line 2", utilization: 100 },
  { name: "Packaging Unit 1", utilization: 40 },
  { name: "QC Station", utilization: 80 },
  { name: "Assembly Team", utilization: 87.5 },
]

export default function ResourceAllocation() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="equipment">Equipment</TabsTrigger>
        <TabsTrigger value="personnel">Personnel</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">5 equipment, 7 personnel</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Average Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76.5%</div>
              <Progress value={76.5} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Bottlenecks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Assembly Line 2 (100%)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Underutilized</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Packaging Unit 1 (40%)</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
            <CardDescription>Current allocation and utilization of resources</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={utilizationData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilization" fill="#8884d8" name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Current allocation of resources to production runs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Allocated</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourceData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.capacity}</TableCell>
                    <TableCell>{item.allocated}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={item.utilization}
                          className="h-2 w-[60px]"
                          indicatorClassName={
                            item.utilization > 90
                              ? "bg-red-500"
                              : item.utilization > 70
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }
                        />
                        <span className="text-xs">{item.utilization}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.availability}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="equipment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Equipment Resources</CardTitle>
            <CardDescription>Manage and allocate equipment resources</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourceData
                  .filter((item) => item.type === "Equipment")
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.capacity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={item.utilization}
                            className="h-2 w-[60px]"
                            indicatorClassName={
                              item.utilization > 90
                                ? "bg-red-500"
                                : item.utilization > 70
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }
                          />
                          <span className="text-xs">{item.utilization}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.availability}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Allocate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="personnel" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personnel Resources</CardTitle>
            <CardDescription>Manage and allocate personnel resources</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Capacity (hours)</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourceData
                  .filter((item) => item.type === "Personnel")
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.capacity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={item.utilization}
                            className="h-2 w-[60px]"
                            indicatorClassName={
                              item.utilization > 90
                                ? "bg-red-500"
                                : item.utilization > 70
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }
                          />
                          <span className="text-xs">{item.utilization}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.availability}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Schedule
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
