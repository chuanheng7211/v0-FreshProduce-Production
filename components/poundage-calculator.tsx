"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for the poundage calculator
const yieldData = [
  {
    id: 1,
    product: "Product A",
    finishedWeight: 1000,
    yieldRate: 0.8,
    rawMaterial: 1250,
    waste: 250,
  },
  {
    id: 2,
    product: "Product B",
    finishedWeight: 800,
    yieldRate: 0.85,
    rawMaterial: 941,
    waste: 141,
  },
  {
    id: 3,
    product: "Product C",
    finishedWeight: 1200,
    yieldRate: 0.75,
    rawMaterial: 1600,
    waste: 400,
  },
  {
    id: 4,
    product: "Product D",
    finishedWeight: 600,
    yieldRate: 0.82,
    rawMaterial: 732,
    waste: 132,
  },
  {
    id: 5,
    product: "Product E",
    finishedWeight: 400,
    yieldRate: 0.78,
    rawMaterial: 513,
    waste: 113,
  },
]

// Sample products
const products = [
  { id: "prod1", name: "Product A" },
  { id: "prod2", name: "Product B" },
  { id: "prod3", name: "Product C" },
  { id: "prod4", name: "Product D" },
  { id: "prod5", name: "Product E" },
]

export default function PoundageCalculator() {
  const [product, setProduct] = useState("")
  const [finishedWeight, setFinishedWeight] = useState("1000")
  const [yieldRate, setYieldRate] = useState("0.80")

  // Calculate raw material and waste
  const finishedWeightNum = Number.parseFloat(finishedWeight) || 0
  const yieldRateNum = Number.parseFloat(yieldRate) || 0.8
  const rawMaterial = yieldRateNum > 0 ? finishedWeightNum / yieldRateNum : 0
  const waste = rawMaterial - finishedWeightNum

  // Calculate totals
  const totalFinishedWeight = yieldData.reduce((sum, item) => sum + item.finishedWeight, 0)
  const totalRawMaterial = yieldData.reduce((sum, item) => sum + item.rawMaterial, 0)
  const totalWaste = yieldData.reduce((sum, item) => sum + item.waste, 0)
  const averageYieldRate = totalFinishedWeight / totalRawMaterial

  // Prepare chart data
  const pieChartData = [
    { name: "Finished Product", value: finishedWeightNum, color: "#82ca9d" },
    { name: "Waste", value: waste, color: "#ff7300" },
  ]

  const barChartData = yieldData.map((item) => ({
    name: item.product,
    finished: item.finishedWeight,
    raw: item.rawMaterial,
    waste: item.waste,
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
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
          <label htmlFor="finished-weight" className="text-sm font-medium">
            Finished Weight (lbs)
          </label>
          <Input
            id="finished-weight"
            type="number"
            value={finishedWeight}
            onChange={(e) => setFinishedWeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="yield-rate" className="text-sm font-medium">
            Yield Rate (0-1)
          </label>
          <Input
            id="yield-rate"
            type="number"
            min="0.1"
            max="1"
            step="0.01"
            value={yieldRate}
            onChange={(e) => setYieldRate(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-4">Material Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Calculation Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Finished Weight</p>
                  <p className="text-xl font-medium">{finishedWeightNum.toFixed(1)} lbs</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Yield Rate</p>
                  <p className="text-xl font-medium">{(yieldRateNum * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Raw Material Required</p>
                  <p className="text-xl font-medium">{rawMaterial.toFixed(1)} lbs</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Waste Generated</p>
                  <p className="text-xl font-medium">{waste.toFixed(1)} lbs</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">Add to Production Plan</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                      <TableHead>Product</TableHead>
                      <TableHead>Finished Weight (lbs)</TableHead>
                      <TableHead>Yield Rate</TableHead>
                      <TableHead>Raw Material (lbs)</TableHead>
                      <TableHead>Waste (lbs)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yieldData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.finishedWeight}</TableCell>
                        <TableCell>{(item.yieldRate * 100).toFixed(1)}%</TableCell>
                        <TableCell>{item.rawMaterial.toFixed(1)}</TableCell>
                        <TableCell>{item.waste.toFixed(1)}</TableCell>
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
                <h3 className="font-medium">Material Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Finished Weight</p>
                    <p className="text-xl font-medium">{totalFinishedWeight.toFixed(1)} lbs</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Raw Material</p>
                    <p className="text-xl font-medium">{totalRawMaterial.toFixed(1)} lbs</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Waste</p>
                    <p className="text-xl font-medium">{totalWaste.toFixed(1)} lbs</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Yield Rate</p>
                    <p className="text-xl font-medium">{(averageYieldRate * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={barChartData}
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
                  <Bar dataKey="finished" fill="#82ca9d" name="Finished Weight (lbs)" />
                  <Bar dataKey="raw" fill="#8884d8" name="Raw Material (lbs)" />
                  <Bar dataKey="waste" fill="#ff7300" name="Waste (lbs)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button variant="outline">Save Calculations</Button>
        <Button>Export to Report</Button>
      </div>
    </div>
  )
}
