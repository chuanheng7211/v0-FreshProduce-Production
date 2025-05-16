"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
import { Calendar, Download, Search, BarChart3, TableIcon, Filter, X, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample data for the forecast explorer
const forecastData = [
  { date: "2025-05-01", historical: 85, ma: 90, regression: 88, yoy: 92, combined: 90 },
  { date: "2025-05-02", historical: 82, ma: 85, regression: 84, yoy: 86, combined: 85 },
  { date: "2025-05-03", historical: 88, ma: 90, regression: 89, yoy: 91, combined: 90 },
  { date: "2025-05-04", historical: 90, ma: 92, regression: 91, yoy: 93, combined: 92 },
  { date: "2025-05-05", historical: 95, ma: 97, regression: 96, yoy: 98, combined: 97 },
  { date: "2025-05-06", historical: 100, ma: 102, regression: 101, yoy: 103, combined: 102 },
  { date: "2025-05-07", historical: 98, ma: 100, regression: 99, yoy: 101, combined: 100 },
  { date: "2025-05-08", historical: 96, ma: 98, regression: 97, yoy: 99, combined: 98 },
  { date: "2025-05-09", historical: 92, ma: 94, regression: 93, yoy: 95, combined: 94 },
  { date: "2025-05-10", historical: 90, ma: 92, regression: 91, yoy: 93, combined: 92 },
  { date: "2025-05-11", historical: 88, ma: 90, regression: 89, yoy: 91, combined: 90 },
  { date: "2025-05-12", historical: 85, ma: 87, regression: 86, yoy: 88, combined: 87 },
  { date: "2025-05-13", historical: null, ma: 90, regression: 88, yoy: 92, combined: 90 },
  { date: "2025-05-14", historical: null, ma: 92, regression: 90, yoy: 94, combined: 92 },
  { date: "2025-05-15", historical: null, ma: 95, regression: 93, yoy: 97, combined: 95 },
  { date: "2025-05-16", historical: null, ma: 98, regression: 96, yoy: 100, combined: 98 },
  { date: "2025-05-17", historical: null, ma: 100, regression: 98, yoy: 102, combined: 100 },
  { date: "2025-05-18", historical: null, ma: 102, regression: 100, yoy: 104, combined: 102 },
  { date: "2025-05-19", historical: null, ma: 105, regression: 103, yoy: 107, combined: 105 },
  { date: "2025-05-20", historical: null, ma: 108, regression: 106, yoy: 110, combined: 108 },
]

// Sample table data
const tableData = forecastData.map((item) => ({
  date: item.date,
  historical: item.historical,
  systemForecast: item.combined,
  adjustedForecast: item.combined,
  difference: 0,
  notes: "",
}))

// Sample monthly comparison data
const monthlyComparisonData = [
  { month: "Jan", thisYear: 2800, lastYear: 2500 },
  { month: "Feb", thisYear: 3200, lastYear: 2700 },
  { month: "Mar", thisYear: 3500, lastYear: 3000 },
  { month: "Apr", thisYear: 3300, lastYear: 2900 },
  { month: "May", thisYear: 3600, lastYear: 3100 },
  { month: "Jun", thisYear: 3800, lastYear: 3300 },
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
  { id: "prod1", name: "Product A", category: "Finished Goods" },
  { id: "prod2", name: "Product B", category: "Finished Goods" },
  { id: "prod3", name: "Ingredient X", category: "Raw Materials" },
  { id: "prod4", name: "Ingredient Y", category: "Raw Materials" },
  { id: "prod5", name: "Product C", category: "Finished Goods" },
]

export default function ForecastExplorerView() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({ from: "2025-05-01", to: "2025-05-20" })
  const [viewType, setViewType] = useState("daily")
  const [modelType, setModelType] = useState("combined")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(true)
  const [tableEditMode, setTableEditMode] = useState(false)
  const [editedData, setEditedData] = useState(tableData)

  // Function to handle forecast adjustments
  const handleAdjustment = (date: string, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setEditedData(
      editedData.map((item) =>
        item.date === date
          ? {
              ...item,
              adjustedForecast: numValue,
              difference: numValue - item.systemForecast,
            }
          : item,
      ),
    )
  }

  // Function to handle notes
  const handleNotes = (date: string, value: string) => {
    setEditedData(editedData.map((item) => (item.date === date ? { ...item, notes: value } : item)))
  }

  return (
    <div className="flex h-full">
      {/* Left Panel (Filters) */}
      <div className={`border-r bg-background transition-all duration-200 ${showFilters ? "w-80" : "w-0 -ml-80"}`}>
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
                <Label>Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Products/Ingredients</Label>
                <div className="space-y-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Select products
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <div className="p-2">
                        <Input
                          placeholder="Search products..."
                          className="mb-2"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="space-y-1">
                          {products
                            .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((product) => (
                              <div key={product.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`product-${product.id}`}
                                  checked={selectedProducts.includes(product.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedProducts([...selectedProducts, product.id])
                                    } else {
                                      setSelectedProducts(selectedProducts.filter((id) => id !== product.id))
                                    }
                                  }}
                                />
                                <Label htmlFor={`product-${product.id}`} className="text-sm">
                                  {product.name}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-wrap gap-1">
                    {selectedProducts.map((id) => {
                      const product = products.find((p) => p.id === id)
                      return product ? (
                        <Badge key={id} variant="secondary" className="flex items-center gap-1">
                          {product.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-3 w-3 rounded-full"
                            onClick={() => setSelectedProducts(selectedProducts.filter((p) => p !== id))}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="from-date" className="text-xs">
                      From
                    </Label>
                    <Input
                      id="from-date"
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="to-date" className="text-xs">
                      To
                    </Label>
                    <Input
                      id="to-date"
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>View Type</Label>
                <div className="flex gap-2">
                  <Button
                    variant={viewType === "daily" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewType("daily")}
                    className="flex-1"
                  >
                    Daily
                  </Button>
                  <Button
                    variant={viewType === "weekly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewType("weekly")}
                    className="flex-1"
                  >
                    Weekly
                  </Button>
                  <Button
                    variant={viewType === "monthly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewType("monthly")}
                    className="flex-1"
                  >
                    Monthly
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Forecast Model</Label>
                <Select value={modelType} onValueChange={setModelType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ma">Moving Average</SelectItem>
                    <SelectItem value="regression">Regression</SelectItem>
                    <SelectItem value="yoy">Year-over-Year</SelectItem>
                    <SelectItem value="combined">Combined Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Display Options</Label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-historical" defaultChecked />
                    <Label htmlFor="show-historical" className="text-sm">
                      Show Historical Data
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-forecast" defaultChecked />
                    <Label htmlFor="show-forecast" className="text-sm">
                      Show Forecast
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-adjusted" defaultChecked />
                    <Label htmlFor="show-adjusted" className="text-sm">
                      Show Adjusted Forecast
                    </Label>
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

      {/* Main Panel (Visualization) */}
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
              <Input placeholder="Search products..." className="pl-8" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange.from} to {dateRange.to}
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <div className="sticky top-0 z-10 bg-background pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Product A - ABC Corporation</h2>
                <Badge className="text-sm">Finished Goods</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div>Total Forecast: 1,950 units</div>
                <div>Growth: +5.2% vs. last year</div>
                <div>Accuracy: 92.4%</div>
              </div>
            </div>

            <Tabs defaultValue="chart" className="space-y-4">
              <TabsList>
                <TabsTrigger value="chart" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Line Chart
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <TableIcon className="h-4 w-4" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="comparison" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Comparison
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Forecast Chart</CardTitle>
                    <CardDescription>Historical data vs. predicted future orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart
                        data={forecastData}
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
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return `${date.getMonth() + 1}/${date.getDate()}`
                          }}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => {
                            const date = new Date(value)
                            return `Date: ${date.toLocaleDateString()}`
                          }}
                        />
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
                        <Line
                          type="monotone"
                          dataKey={modelType}
                          stroke="#82ca9d"
                          name={
                            modelType === "ma"
                              ? "Moving Average"
                              : modelType === "regression"
                                ? "Regression"
                                : modelType === "yoy"
                                  ? "Year-over-Year"
                                  : "Combined Model"
                          }
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Model Comparison</CardTitle>
                      <CardDescription>Accuracy of different forecasting models</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Moving Average</p>
                            <div className="flex items-center gap-2">
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: "92%" }} />
                              </div>
                              <span className="text-sm">92%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Regression</p>
                            <div className="flex items-center gap-2">
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: "89%" }} />
                              </div>
                              <span className="text-sm">89%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Year-over-Year</p>
                            <div className="flex items-center gap-2">
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500" style={{ width: "94%" }} />
                              </div>
                              <span className="text-sm">94%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Combined Model</p>
                            <div className="flex items-center gap-2">
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: "95%" }} />
                              </div>
                              <span className="text-sm">95%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Forecast Details</CardTitle>
                      <CardDescription>Summary statistics and notes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Historical</p>
                            <p className="text-xl font-medium">1,089 units</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Forecast</p>
                            <p className="text-xl font-medium">1,950 units</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Average Daily</p>
                            <p className="text-xl font-medium">97.5 units</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Growth Trend</p>
                            <p className="text-xl font-medium">+5.2%</p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <p className="text-sm font-medium mb-2">Notes</p>
                          <p className="text-sm text-muted-foreground">
                            The combined model shows the highest accuracy for this product. May 17-19 forecast may be
                            high due to seasonal factors.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="table" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Forecast Table</CardTitle>
                      <CardDescription>Raw forecast data with override capability</CardDescription>
                    </div>
                    <Button
                      variant={tableEditMode ? "default" : "outline"}
                      onClick={() => setTableEditMode(!tableEditMode)}
                    >
                      {tableEditMode ? "Save Changes" : "Edit Forecast"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Historical</TableHead>
                            <TableHead>System Forecast</TableHead>
                            <TableHead>Adjusted Forecast</TableHead>
                            <TableHead>Difference</TableHead>
                            <TableHead>Notes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {editedData.map((item) => (
                            <TableRow key={item.date}>
                              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                              <TableCell>{item.historical !== null ? item.historical : "-"}</TableCell>
                              <TableCell>{item.systemForecast}</TableCell>
                              <TableCell>
                                {tableEditMode && item.historical === null ? (
                                  <Input
                                    type="number"
                                    value={item.adjustedForecast}
                                    onChange={(e) => handleAdjustment(item.date, e.target.value)}
                                    className="w-24"
                                  />
                                ) : (
                                  item.adjustedForecast
                                )}
                              </TableCell>
                              <TableCell className={item.difference !== 0 ? "text-amber-600 font-medium" : ""}>
                                {item.difference !== 0 ? `${item.difference > 0 ? "+" : ""}${item.difference}` : "-"}
                              </TableCell>
                              <TableCell>
                                {tableEditMode ? (
                                  <Input
                                    value={item.notes}
                                    onChange={(e) => handleNotes(item.date, e.target.value)}
                                    placeholder="Add notes..."
                                  />
                                ) : (
                                  item.notes || "-"
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
              <TabsContent value="comparison" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Month-on-Month Comparison</CardTitle>
                    <CardDescription>Comparison of current year vs. previous year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={monthlyComparisonData}
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
                        <Bar dataKey="thisYear" fill="#8884d8" name="This Year" />
                        <Bar dataKey="lastYear" fill="#82ca9d" name="Last Year" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Analysis</CardTitle>
                    <CardDescription>Monthly growth percentages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>This Year</TableHead>
                            <TableHead>Last Year</TableHead>
                            <TableHead>Growth %</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {monthlyComparisonData.map((item) => {
                            const growth = ((item.thisYear - item.lastYear) / item.lastYear) * 100
                            return (
                              <TableRow key={item.month}>
                                <TableCell>{item.month}</TableCell>
                                <TableCell>{item.thisYear}</TableCell>
                                <TableCell>{item.lastYear}</TableCell>
                                <TableCell className={growth >= 0 ? "text-green-600" : "text-red-600"}>
                                  {growth.toFixed(1)}%
                                </TableCell>
                                <TableCell>
                                  {growth >= 10 ? (
                                    <Badge className="bg-green-500">Strong Growth</Badge>
                                  ) : growth >= 5 ? (
                                    <Badge className="bg-blue-500">Moderate Growth</Badge>
                                  ) : growth >= 0 ? (
                                    <Badge className="bg-yellow-500">Stable</Badge>
                                  ) : (
                                    <Badge className="bg-red-500">Declining</Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            )
                          })}
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
