"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for the forecast adjustment input
const weeklyForecastData = [
  { id: 1, week: "Week 1 (May 13-19)", systemForecast: 470, adjustedForecast: 470, notes: "" },
  { id: 2, week: "Week 2 (May 20-26)", systemForecast: 490, adjustedForecast: 490, notes: "" },
  { id: 3, week: "Week 3 (May 27-Jun 2)", systemForecast: 530, adjustedForecast: 500, notes: "Adjusted for holiday" },
  { id: 4, week: "Week 4 (Jun 3-9)", systemForecast: 510, adjustedForecast: 510, notes: "" },
  { id: 5, week: "Week 5 (Jun 10-16)", systemForecast: 530, adjustedForecast: 550, notes: "Promotion planned" },
  { id: 6, week: "Week 6 (Jun 17-23)", systemForecast: 550, adjustedForecast: 570, notes: "Promotion continues" },
  { id: 7, week: "Week 7 (Jun 24-30)", systemForecast: 570, adjustedForecast: 570, notes: "" },
  { id: 8, week: "Week 8 (Jul 1-7)", systemForecast: 560, adjustedForecast: 540, notes: "Holiday week" },
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

export default function ForecastAdjustmentInput() {
  const [customer, setCustomer] = useState("")
  const [product, setProduct] = useState("")
  const [forecastData, setForecastData] = useState(weeklyForecastData)
  const [viewType, setViewType] = useState("quantity")

  // Function to handle forecast adjustments
  const handleAdjustment = (id: number, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setForecastData(forecastData.map((item) => (item.id === id ? { ...item, adjustedForecast: numValue } : item)))
  }

  // Function to handle notes
  const handleNotes = (id: number, value: string) => {
    setForecastData(forecastData.map((item) => (item.id === id ? { ...item, notes: value } : item)))
  }

  // Prepare chart data
  const chartData = forecastData.map((item) => ({
    week: `Week ${item.id}`,
    systemForecast: item.systemForecast,
    adjustedForecast: item.adjustedForecast,
  }))

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

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Week</TableHead>
                      <TableHead>System Forecast</TableHead>
                      <TableHead>Adjusted Forecast</TableHead>
                      <TableHead>Difference</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forecastData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.week}</TableCell>
                        <TableCell>{item.systemForecast}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.adjustedForecast}
                            onChange={(e) => handleAdjustment(item.id, e.target.value)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell
                          className={item.adjustedForecast !== item.systemForecast ? "text-amber-600 font-medium" : ""}
                        >
                          {item.adjustedForecast - item.systemForecast}
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.notes}
                            onChange={(e) => handleNotes(item.id, e.target.value)}
                            placeholder="Add notes..."
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={chartData}
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
                    dataKey="systemForecast"
                    stroke="#8884d8"
                    name="System Forecast"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="adjustedForecast"
                    stroke="#82ca9d"
                    name="Adjusted Forecast"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-medium">Forecast Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total System Forecast</p>
                  <p className="text-xl font-medium">4,210 units</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Adjusted Forecast</p>
                  <p className="text-xl font-medium">4,200 units</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Adjustment</p>
                  <p className="text-xl font-medium">-10 units</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adjustment %</p>
                  <p className="text-xl font-medium">-0.2%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to System Forecast</Button>
        <Button variant="outline">Save Draft</Button>
        <Button>Save Final Forecast</Button>
      </div>
    </div>
  )
}
