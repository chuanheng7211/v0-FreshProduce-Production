"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for the forecast review panel
const weeklyData = [
  { week: "Week 1", historical: 450, forecast1: 470, forecast2: 460, forecast3: 480 },
  { week: "Week 2", historical: 480, forecast1: 490, forecast2: 500, forecast3: 485 },
  { week: "Week 3", historical: 520, forecast1: 530, forecast2: 515, forecast3: 525 },
  { week: "Week 4", historical: 500, forecast1: 510, forecast2: 505, forecast3: 515 },
  { week: "Week 5", historical: null, forecast1: 530, forecast2: 520, forecast3: 540 },
  { week: "Week 6", historical: null, forecast1: 550, forecast2: 535, forecast3: 560 },
  { week: "Week 7", historical: null, forecast1: 570, forecast2: 550, forecast3: 580 },
  { week: "Week 8", historical: null, forecast1: 560, forecast2: 545, forecast3: 570 },
]

const monthlyData = [
  { month: "Jan", historical: 1800, forecast1: 1850, forecast2: 1820, forecast3: 1870 },
  { month: "Feb", historical: 1900, forecast1: 1950, forecast2: 1930, forecast3: 1960 },
  { month: "Mar", historical: 2100, forecast1: 2150, forecast2: 2120, forecast3: 2170 },
  { month: "Apr", historical: 2000, forecast1: 2050, forecast2: 2030, forecast3: 2070 },
  { month: "May", historical: null, forecast1: 2100, forecast2: 2080, forecast3: 2120 },
  { month: "Jun", historical: null, forecast1: 2200, forecast2: 2150, forecast3: 2250 },
]

// Sample customers and products
const customers = [
  { id: "cust1", name: "ABC Corporation" },
  { id: "cust2", name: "XYZ Industries" },
  { id: "cust3", name: "123 Enterprises" },
  { id: "cust4", name: "Global Foods" },
  { id: "cust5", name: "Metro Distributors" },
]

const products = [
  { id: "prod1", name: "Product A" },
  { id: "prod2", name: "Product B" },
  { id: "prod3", name: "Product C" },
  { id: "prod4", name: "Product D" },
  { id: "prod5", name: "Product E" },
]

export default function ForecastReviewPanel() {
  const [customer, setCustomer] = useState("")
  const [product, setProduct] = useState("")
  const [viewType, setViewType] = useState("quantity")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="customer" className="text-sm font-medium">
            Customer
          </label>
          <Select value={customer} onValueChange={setCustomer}>
            <SelectTrigger id="customer">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((cust) => (
                <SelectItem key={cust.id} value={cust.id}>
                  {cust.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="product" className="text-sm font-medium">
            Product
          </label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger id="product">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((prod) => (
                <SelectItem key={prod.id} value={prod.id}>
                  {prod.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">View Type</label>
          <div className="flex gap-2">
            <Button
              variant={viewType === "quantity" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("quantity")}
            >
              Quantity
            </Button>
            <Button
              variant={viewType === "weight" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("weight")}
            >
              Weight (lbs)
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={weeklyData}
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
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="#8884d8"
                    name="Historical"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="forecast1" stroke="#82ca9d" name="Time Series Model" />
                  <Line type="monotone" dataKey="forecast2" stroke="#ffc658" name="ML Regression Model" />
                  <Line type="monotone" dataKey="forecast3" stroke="#ff7300" name="Ensemble Model" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Model Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Time Series", accuracy: 92, error: 8 },
                      { name: "ML Regression", accuracy: 94, error: 6 },
                      { name: "Ensemble", accuracy: 95, error: 5 },
                    ]}
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
                    <Bar dataKey="accuracy" fill="#82ca9d" name="Accuracy %" />
                    <Bar dataKey="error" fill="#ff7300" name="Error %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Forecast Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Historical (4 weeks)</p>
                      <p className="text-xl font-medium">1,950 units</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Forecast (8 weeks)</p>
                      <p className="text-xl font-medium">4,210 units</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Weekly</p>
                      <p className="text-xl font-medium">526 units</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Trend</p>
                      <p className="text-xl font-medium">+5.2%</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Notes</p>
                    <p className="text-sm text-muted-foreground">
                      The ensemble model shows the highest accuracy for this product. Week 5 forecast may be high due to
                      seasonal factors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={monthlyData}
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
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="#8884d8"
                    name="Historical"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="forecast1" stroke="#82ca9d" name="Time Series Model" />
                  <Line type="monotone" dataKey="forecast2" stroke="#ffc658" name="ML Regression Model" />
                  <Line type="monotone" dataKey="forecast3" stroke="#ff7300" name="Ensemble Model" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Model Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Time Series", accuracy: 91, error: 9 },
                      { name: "ML Regression", accuracy: 93, error: 7 },
                      { name: "Ensemble", accuracy: 94, error: 6 },
                    ]}
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
                    <Bar dataKey="accuracy" fill="#82ca9d" name="Accuracy %" />
                    <Bar dataKey="error" fill="#ff7300" name="Error %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Forecast Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Historical (4 months)</p>
                      <p className="text-xl font-medium">7,800 units</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Forecast (6 months)</p>
                      <p className="text-xl font-medium">12,250 units</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Monthly</p>
                      <p className="text-xl font-medium">2,042 units</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Trend</p>
                      <p className="text-xl font-medium">+4.8%</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Notes</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly view shows consistent growth pattern. June forecast may need adjustment due to expected
                      promotional activities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Export Data</Button>
        <Button>Proceed to Adjustment</Button>
      </div>
    </div>
  )
}
