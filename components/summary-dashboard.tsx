"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for the summary dashboard
const forecastData = [
  { week: "Week 1", forecast: 2500, actual: 2450 },
  { week: "Week 2", forecast: 2700, actual: 2600 },
  { week: "Week 3", forecast: 3000, actual: 2900 },
  { week: "Week 4", forecast: 2800, actual: 2750 },
]

const laborData = [
  { week: "Week 1", needed: 120, assigned: 115 },
  { week: "Week 2", needed: 135, assigned: 130 },
  { week: "Week 3", needed: 150, assigned: 145 },
  { week: "Week 4", needed: 140, assigned: 140 },
]

const materialData = [
  { name: "Raw Material", value: 1250, color: "#8884d8" },
  { name: "Finished Product", value: 1000, color: "#82ca9d" },
  { name: "Waste", value: 250, color: "#ff7300" },
]

const efficiencyData = [
  { week: "Week 1", efficiency: 78 },
  { week: "Week 2", efficiency: 82 },
  { week: "Week 3", efficiency: 85 },
  { week: "Week 4", efficiency: 87 },
]

export default function SummaryDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Weekly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,000 units</div>
            <p className="text-xs text-muted-foreground">98.2% accuracy rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Labor Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">545 hours</div>
            <div className="flex items-center gap-2">
              <Progress value={97.3} className="h-2" />
              <span className="text-xs text-muted-foreground">97.3% assigned</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Raw Material</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 lbs</div>
            <p className="text-xs text-muted-foreground">80% yield rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Average Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <Progress value={83} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
          <TabsTrigger value="material">Material</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>
        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecast vs. Actual</CardTitle>
              <CardDescription>Weekly comparison of forecasted vs. actual sales</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={forecastData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="forecast" fill="#8884d8" name="Forecast" />
                  <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="labor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Labor Hours</CardTitle>
              <CardDescription>Weekly comparison of needed vs. assigned labor hours</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={laborData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="needed" fill="#8884d8" name="Needed Hours" />
                  <Bar dataKey="assigned" fill="#82ca9d" name="Assigned Hours" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="material" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Material Breakdown</CardTitle>
              <CardDescription>Breakdown of raw material, finished product, and waste</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={materialData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {materialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Trend</CardTitle>
              <CardDescription>Weekly trend of production efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={efficiencyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Efficiency %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
