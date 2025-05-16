"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for the production time calculator
const productionData = [
  {
    id: 1,
    product: "Product A",
    forecast: 470,
    timePerUnit: 0.05,
    totalTime: 23.5,
    laborHours: 23.5,
    staffNeeded: 3,
  },
  {
    id: 2,
    product: "Product B",
    forecast: 320,
    timePerUnit: 0.08,
    totalTime: 25.6,
    laborHours: 25.6,
    staffNeeded: 4,
  },
  {
    id: 3,
    product: "Product C",
    forecast: 250,
    timePerUnit: 0.12,
    totalTime: 30.0,
    laborHours: 30.0,
    staffNeeded: 4,
  },
  {
    id: 4,
    product: "Product D",
    forecast: 180,
    timePerUnit: 0.15,
    totalTime: 27.0,
    laborHours: 27.0,
    staffNeeded: 4,
  },
  {
    id: 5,
    product: "Product E",
    forecast: 120,
    timePerUnit: 0.2,
    totalTime: 24.0,
    laborHours: 24.0,
    staffNeeded: 3,
  },
]

// Sample chart data
const laborChartData = [
  { day: "Monday", laborHours: 28, staffNeeded: 4 },
  { day: "Tuesday", laborHours: 32, staffNeeded: 4 },
  { day: "Wednesday", laborHours: 30, staffNeeded: 4 },
  { day: "Thursday", laborHours: 26, staffNeeded: 4 },
  { day: "Friday", laborHours: 24, staffNeeded: 3 },
  { day: "Saturday", laborHours: 10, staffNeeded: 2 },
  { day: "Sunday", laborHours: 0, staffNeeded: 0 },
]

export default function ProductionTimeCalculator() {
  const [date, setDate] = useState("")
  const [shift, setShift] = useState("")
  const [hoursPerShift, setHoursPerShift] = useState("8")

  // Calculate totals
  const totalForecast = productionData.reduce((sum, item) => sum + item.forecast, 0)
  const totalTime = productionData.reduce((sum, item) => sum + item.totalTime, 0)
  const totalLaborHours = productionData.reduce((sum, item) => sum + item.laborHours, 0)
  const maxStaffNeeded = Math.max(...productionData.map((item) => item.staffNeeded))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Production Date
          </label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label htmlFor="shift" className="text-sm font-medium">
            Shift
          </label>
          <Select value={shift} onValueChange={setShift}>
            <SelectTrigger id="shift">
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (6am-2pm)</SelectItem>
              <SelectItem value="afternoon">Afternoon (2pm-10pm)</SelectItem>
              <SelectItem value="night">Night (10pm-6am)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="hours-per-shift" className="text-sm font-medium">
            Hours Per Shift
          </label>
          <Input
            id="hours-per-shift"
            type="number"
            value={hoursPerShift}
            onChange={(e) => setHoursPerShift(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">By Product</TabsTrigger>
          <TabsTrigger value="days">By Day</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Forecast Qty</TableHead>
                      <TableHead>Time Per Unit (hrs)</TableHead>
                      <TableHead>Total Time (hrs)</TableHead>
                      <TableHead>Labor Hours</TableHead>
                      <TableHead>Staff Needed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productionData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.forecast}</TableCell>
                        <TableCell>{item.timePerUnit.toFixed(2)}</TableCell>
                        <TableCell>{item.totalTime.toFixed(1)}</TableCell>
                        <TableCell>{item.laborHours.toFixed(1)}</TableCell>
                        <TableCell>{item.staffNeeded}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Production Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Forecast</p>
                    <p className="text-xl font-medium">{totalForecast} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Production Time</p>
                    <p className="text-xl font-medium">{totalTime.toFixed(1)} hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Labor Hours</p>
                    <p className="text-xl font-medium">{totalLaborHours.toFixed(1)} hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Staff Needed</p>
                    <p className="text-xl font-medium">{maxStaffNeeded} workers</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="days" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={laborChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="laborHours" fill="#8884d8" name="Labor Hours" />
                  <Bar yAxisId="right" dataKey="staffNeeded" fill="#82ca9d" name="Staff Needed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Labor Hours</TableHead>
                      <TableHead>Staff Needed</TableHead>
                      <TableHead>Shift Length</TableHead>
                      <TableHead>Utilization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {laborChartData.map((item) => (
                      <TableRow key={item.day}>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>{item.laborHours}</TableCell>
                        <TableCell>{item.staffNeeded}</TableCell>
                        <TableCell>8 hours</TableCell>
                        <TableCell>
                          {item.laborHours > 0
                            ? `${((item.laborHours / (item.staffNeeded * 8)) * 100).toFixed(1)}%`
                            : "N/A"}
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

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button variant="outline">Save Draft</Button>
        <Button>Proceed to Task Assignment</Button>
      </div>
    </div>
  )
}
