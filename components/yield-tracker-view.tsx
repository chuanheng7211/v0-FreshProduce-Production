"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
  BarChart3,
  LineChart,
  Scale,
  Percent,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample yield data
const yieldData = [
  {
    id: "y1",
    product: "Product A",
    batch: "BA-2025-0501",
    date: "2025-05-01",
    rawMaterial: 1250,
    finishedProduct: 1000,
    waste: 250,
    yieldRate: 0.8,
    target: 0.85,
    variance: -0.05,
    status: "below-target",
    notes: "Equipment calibration issue",
  },
  {
    id: "y2",
    product: "Product B",
    batch: "BB-2025-0502",
    date: "2025-05-02",
    rawMaterial: 800,
    finishedProduct: 680,
    waste: 120,
    yieldRate: 0.85,
    target: 0.85,
    variance: 0,
    status: "on-target",
    notes: "",
  },
  {
    id: "y3",
    product: "Ingredient X",
    batch: "IX-2025-0503",
    date: "2025-05-03",
    rawMaterial: 2000,
    finishedProduct: 1500,
    waste: 500,
    yieldRate: 0.75,
    target: 0.8,
    variance: -0.05,
    status: "below-target",
    notes: "Raw material quality issues",
  },
  {
    id: "y4",
    product: "Product A",
    batch: "BA-2025-0505",
    date: "2025-05-05",
    rawMaterial: 1250,
    finishedProduct: 1075,
    waste: 175,
    yieldRate: 0.86,
    target: 0.85,
    variance: 0.01,
    status: "above-target",
    notes: "Process improvements implemented",
  },
  {
    id: "y5",
    product: "Ingredient Y",
    batch: "IY-2025-0506",
    date: "2025-05-06",
    rawMaterial: 1500,
    finishedProduct: 1275,
    waste: 225,
    yieldRate: 0.85,
    target: 0.8,
    variance: 0.05,
    status: "above-target",
    notes: "New equipment performing well",
  },
]

// Sample trend data
const trendData = [
  { date: "2025-04-01", yieldRate: 0.78, target: 0.85 },
  { date: "2025-04-08", yieldRate: 0.79, target: 0.85 },
  { date: "2025-04-15", yieldRate: 0.81, target: 0.85 },
  { date: "2025-04-22", yieldRate: 0.82, target: 0.85 },
  { date: "2025-04-29", yieldRate: 0.83, target: 0.85 },
  { date: "2025-05-06", yieldRate: 0.84, target: 0.85 },
]

// Sample waste categories
const wasteData = [
  { name: "Process Loss", value: 45, color: "#8884d8" },
  { name: "Quality Rejects", value: 25, color: "#82ca9d" },
  { name: "Setup/Changeover", value: 15, color: "#ffc658" },
  { name: "Equipment Issues", value: 10, color: "#ff8042" },
  { name: "Other", value: 5, color: "#0088fe" },
]

export default function YieldTrackerView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [productFilter, setProductFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(true)
  const [dateRange, setDateRange] = useState({ from: "2025-05-01", to: "2025-05-31" })

  // Filter and sort yield data
  const filteredYieldData = yieldData
    .filter(
      (item) =>
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (productFilter === "all" || item.product === productFilter) &&
        (statusFilter === "all" || item.status === statusFilter),
    )
    .sort((a, b) => {
      const fieldA = a[sortField as keyof typeof a]
      const fieldB = b[sortField as keyof typeof b]

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      } else {
        return sortDirection === "asc"
          ? (fieldA as number) - (fieldB as number)
          : (fieldB as number) - (fieldA as number)
      }
    })

  // Calculate overall metrics
  const overallMetrics = {
    averageYield: yieldData.reduce((sum, item) => sum + item.yieldRate, 0) / yieldData.length,
    totalWaste: yieldData.reduce((sum, item) => sum + item.waste, 0),
    totalProduction: yieldData.reduce((sum, item) => sum + item.finishedProduct, 0),
    belowTargetCount: yieldData.filter((item) => item.status === "below-target").length,
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "above-target":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Above Target
          </Badge>
        )
      case "on-target":
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <Scale className="h-3 w-3" /> On Target
          </Badge>
        )
      case "below-target":
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <TrendingDown className="h-3 w-3" /> Below Target
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
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
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product</label>
                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="Product A">Product A</SelectItem>
                    <SelectItem value="Product B">Product B</SelectItem>
                    <SelectItem value="Ingredient X">Ingredient X</SelectItem>
                    <SelectItem value="Ingredient Y">Ingredient Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="above-target">Above Target</SelectItem>
                    <SelectItem value="on-target">On Target</SelectItem>
                    <SelectItem value="below-target">Below Target</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  />
                  <Input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  />
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
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date(dateRange.from).toLocaleDateString()} - {new Date(dateRange.to).toLocaleDateString()}
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Yield Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(overallMetrics.averageYield * 100).toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">vs. target of 85%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Production</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallMetrics.totalProduction.toLocaleString()} lbs</div>
                  <p className="text-xs text-muted-foreground">Finished goods</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Waste</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallMetrics.totalWaste.toLocaleString()} lbs</div>
                  <p className="text-xs text-muted-foreground">Material loss</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Below Target Batches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallMetrics.belowTargetCount}</div>
                  <p className="text-xs text-muted-foreground">Requiring attention</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="table" className="space-y-4">
              <TabsList>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Batch Data
                </TabsTrigger>
                <TabsTrigger value="trends" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Yield Trends
                </TabsTrigger>
                <TabsTrigger value="waste" className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Waste Analysis
                </TabsTrigger>
              </TabsList>
              <TabsContent value="table" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Batch Yield Data</CardTitle>
                    <CardDescription>Detailed yield information by batch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                              Date
                              {sortField === "date" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("product")}>
                              Product
                              {sortField === "product" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead>Batch</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("rawMaterial")}>
                              Raw Material
                              {sortField === "rawMaterial" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead>Finished Product</TableHead>
                            <TableHead>Waste</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("yieldRate")}>
                              Yield Rate
                              {sortField === "yieldRate" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredYieldData.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                              <TableCell className="font-medium">{item.product}</TableCell>
                              <TableCell>{item.batch}</TableCell>
                              <TableCell>{item.rawMaterial} lbs</TableCell>
                              <TableCell>{item.finishedProduct} lbs</TableCell>
                              <TableCell>{item.waste} lbs</TableCell>
                              <TableCell
                                className={
                                  item.yieldRate >= item.target
                                    ? "text-green-600"
                                    : item.yieldRate >= item.target - 0.05
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }
                              >
                                {(item.yieldRate * 100).toFixed(1)}%
                              </TableCell>
                              <TableCell>{(item.target * 100).toFixed(1)}%</TableCell>
                              <TableCell>{getStatusBadge(item.status)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Yield Rate Trends</CardTitle>
                    <CardDescription>Weekly yield rate performance vs. targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <RechartsLineChart
                        data={trendData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(date) =>
                            new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                          }
                        />
                        <YAxis domain={[0.7, 0.9]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                        <Tooltip
                          formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                          labelFormatter={(label) => new Date(label).toLocaleDateString()}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="yieldRate"
                          stroke="#8884d8"
                          name="Actual Yield"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#82ca9d"
                          name="Target Yield"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Yield Performance by Product</CardTitle>
                    <CardDescription>Comparison of yield rates across products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { name: "Product A", actual: 0.83, target: 0.85 },
                          { name: "Product B", actual: 0.85, target: 0.85 },
                          { name: "Ingredient X", actual: 0.75, target: 0.8 },
                          { name: "Ingredient Y", actual: 0.85, target: 0.8 },
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
                        <YAxis domain={[0.7, 0.9]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                        <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                        <Legend />
                        <Bar dataKey="actual" fill="#8884d8" name="Actual Yield" />
                        <Bar dataKey="target" fill="#82ca9d" name="Target Yield" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="waste" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Waste Categories</CardTitle>
                    <CardDescription>Breakdown of waste by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={wasteData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {wasteData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                      <div>
                        <h3 className="font-medium mb-4">Top Waste Contributors</h3>
                        <div className="space-y-4">
                          {wasteData.map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{item.name}</span>
                                <span className="text-sm">{item.value}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                ></div>
                              </div>
                              {index === 0 && (
                                <div className="flex items-center text-xs text-amber-600">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Highest contributor to waste
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Waste Reduction Opportunities</CardTitle>
                    <CardDescription>Areas with potential for improvement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Area</TableHead>
                            <TableHead>Current Waste</TableHead>
                            <TableHead>Potential Savings</TableHead>
                            <TableHead>Yield Impact</TableHead>
                            <TableHead>Priority</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Process Loss Reduction</TableCell>
                            <TableCell>45%</TableCell>
                            <TableCell>112.5 lbs/day</TableCell>
                            <TableCell>+3.2%</TableCell>
                            <TableCell>
                              <Badge className="bg-red-500">High</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Quality Control Improvements</TableCell>
                            <TableCell>25%</TableCell>
                            <TableCell>62.5 lbs/day</TableCell>
                            <TableCell>+1.8%</TableCell>
                            <TableCell>
                              <Badge className="bg-amber-500">Medium</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Setup Time Optimization</TableCell>
                            <TableCell>15%</TableCell>
                            <TableCell>37.5 lbs/day</TableCell>
                            <TableCell>+1.1%</TableCell>
                            <TableCell>
                              <Badge className="bg-amber-500">Medium</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Equipment Maintenance</TableCell>
                            <TableCell>10%</TableCell>
                            <TableCell>25 lbs/day</TableCell>
                            <TableCell>+0.7%</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-500">Low</Badge>
                            </TableCell>
                          </TableRow>
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
