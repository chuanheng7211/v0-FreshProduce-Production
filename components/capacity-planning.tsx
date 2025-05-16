"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample capacity data
const capacityData = [
  { month: "Jun", demand: 4200, capacity: 5000, utilization: 84 },
  { month: "Jul", demand: 4500, capacity: 5000, utilization: 90 },
  { month: "Aug", demand: 4700, capacity: 5000, utilization: 94 },
  { month: "Sep", demand: 5200, capacity: 5000, utilization: 104 },
  { month: "Oct", demand: 5500, capacity: 6000, utilization: 92 },
  { month: "Nov", demand: 5800, capacity: 6000, utilization: 97 },
]

export default function CapacityPlanning() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="planning">Planning</TabsTrigger>
        <TabsTrigger value="optimization">Optimization</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Capacity vs. Demand</CardTitle>
            <CardDescription>Projected capacity and demand over the next 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={capacityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="demand" stroke="#8884d8" name="Forecasted Demand" />
                <Line type="monotone" dataKey="capacity" stroke="#82ca9d" name="Available Capacity" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Capacity Utilization</CardTitle>
              <CardDescription>Projected utilization rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={capacityData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 120]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="utilization" stroke="#ff7300" name="Utilization %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capacity Alerts</CardTitle>
              <CardDescription>Potential capacity issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="font-medium text-red-800">Overcapacity in September</div>
                  <div className="text-sm text-red-700 mt-1">
                    Forecasted demand exceeds capacity by 4%. Consider increasing capacity or adjusting production
                    schedule.
                  </div>
                </div>
                <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
                  <div className="font-medium text-amber-800">High Utilization in November</div>
                  <div className="text-sm text-amber-700 mt-1">
                    Projected utilization at 97%. Consider contingency planning for potential demand increases.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="planning" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Capacity Planning</CardTitle>
            <CardDescription>Plan and adjust production capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="planning-period">Planning Period</Label>
                  <Select defaultValue="6months">
                    <SelectTrigger id="planning-period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="12months">12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity-type">Capacity Type</Label>
                  <Select defaultValue="production">
                    <SelectTrigger id="capacity-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="workforce">Workforce</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Capacity Adjustment</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="p-4">
                    <div className="text-sm font-medium mb-2">June 2025</div>
                    <Input type="number" defaultValue="5000" />
                    <div className="text-xs text-muted-foreground mt-1">Current: 5000 units</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm font-medium mb-2">July 2025</div>
                    <Input type="number" defaultValue="5000" />
                    <div className="text-xs text-muted-foreground mt-1">Current: 5000 units</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm font-medium mb-2">August 2025</div>
                    <Input type="number" defaultValue="5000" />
                    <div className="text-xs text-muted-foreground mt-1">Current: 5000 units</div>
                  </Card>
                  <Card className="p-4 border-red-200">
                    <div className="text-sm font-medium mb-2">September 2025</div>
                    <Input type="number" defaultValue="5000" className="border-red-200" />
                    <div className="text-xs text-red-500 mt-1">Overcapacity alert</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm font-medium mb-2">October 2025</div>
                    <Input type="number" defaultValue="6000" />
                    <div className="text-xs text-muted-foreground mt-1">Current: 6000 units</div>
                  </Card>
                  <Card className="p-4 border-amber-200">
                    <div className="text-sm font-medium mb-2">November 2025</div>
                    <Input type="number" defaultValue="6000" className="border-amber-200" />
                    <div className="text-xs text-amber-500 mt-1">High utilization</div>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="optimization" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Capacity Optimization</CardTitle>
            <CardDescription>Optimize capacity utilization and efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Optimization Goals</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="cost-weight" className="text-sm">
                      Cost Reduction
                    </Label>
                    <div className="flex items-center gap-2">
                      <Slider id="cost-weight" defaultValue={[30]} max={100} step={5} />
                      <span className="w-12 text-sm">30%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utilization-weight" className="text-sm">
                      Utilization
                    </Label>
                    <div className="flex items-center gap-2">
                      <Slider id="utilization-weight" defaultValue={[40]} max={100} step={5} />
                      <span className="w-12 text-sm">40%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flexibility-weight" className="text-sm">
                      Flexibility
                    </Label>
                    <div className="flex items-center gap-2">
                      <Slider id="flexibility-weight" defaultValue={[30]} max={100} step={5} />
                      <span className="w-12 text-sm">30%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Optimization Recommendations</Label>
                <div className="space-y-2">
                  <Card className="p-4">
                    <div className="font-medium">Increase September Capacity</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Increase capacity from 5000 to 5500 units to address forecasted demand.
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">Apply</Button>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="font-medium">Shift Production Schedule</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Move 300 units of Product B production from September to August to balance capacity.
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">Apply</Button>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="font-medium">Optimize Resource Allocation</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Reallocate resources from Packaging Unit 1 (40% utilized) to Assembly Line 2 (100% utilized).
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">Apply</Button>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply All Recommendations</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
