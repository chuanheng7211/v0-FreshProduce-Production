"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowDown,
  ArrowUp,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  BarChart3,
  LineChart,
  Scale,
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample product data
const productData = [
  {
    id: "prod1",
    name: "Product A",
    category: "Finished Goods",
    forecastQty: 1950,
    forecastWeight: 975,
    yieldRate: 0.8,
    rawMaterial: 1219,
    waste: 244,
    finalForecast: 1950,
    status: "stable",
    trend: "+5.2%",
  },
  {
    id: "prod2",
    name: "Product B",
    category: "Finished Goods",
    forecastQty: 1200,
    forecastWeight: 600,
    yieldRate: 0.85,
    rawMaterial: 706,
    waste: 106,
    finalForecast: 1250,
    status: "increased",
    trend: "+8.7%",
  },
  {
    id: "prod3",
    name: "Ingredient X",
    category: "Raw Materials",
    forecastQty: 3000,
    forecastWeight: 1500,
    yieldRate: 0.75,
    rawMaterial: 2000,
    waste: 500,
    finalForecast: 2900,
    status: "decreased",
    trend: "-3.3%",
  },
  {
    id: "prod4",
    name: "Ingredient Y",
    category: "Raw Materials",
    forecastQty: 2500,
    forecastWeight: 1250,
    yieldRate: 0.82,
    rawMaterial: 1524,
    waste: 274,
    finalForecast: 2500,
    status: "stable",
    trend: "+0.8%",
  },
  {
    id: "prod5",
    name: "Product C",
    category: "Finished Goods",
    forecastQty: 800,
    forecastWeight: 400,
    yieldRate: 0.78,
    rawMaterial: 513,
    waste: 113,
    finalForecast: 850,
    status: "increased",
    trend: "+6.3%",
  },
]

// Sample chart data
const categoryData = [
  { name: "Finished Goods", value: 3950, color: "#8884d8" },
  { name: "Raw Materials", value: 5500, color: "#82ca9d" },
]

const yieldData = [
  { name: "Product A", yieldRate: 80 },
  { name: "Product B", yieldRate: 85 },
  { name: "Ingredient X", yieldRate: 75 },
  { name: "Ingredient Y", yieldRate: 82 },
  { name: "Product C", yieldRate: 78 },
]

export default function ProductSummaryView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showFilters, setShowFilters] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  // Filter and sort products
  const filteredProducts = productData
    .filter(
      (product) =>
        (categoryFilter === "all" || product.category === categoryFilter) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
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

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "increased":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <ArrowUp className="h-3 w-3" /> Increased
          </Badge>
        )
      case "decreased":
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <ArrowDown className="h-3 w-3" /> Decreased
          </Badge>
        )
      case "stable":
        return <Badge className="bg-blue-500">Stable</Badge>
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
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                    <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="increased">Increased</SelectItem>
                    <SelectItem value="decreased">Decreased</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Yield Rate</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select yield rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rates</SelectItem>
                    <SelectItem value="high">High ({">"}80%)</SelectItem>
                    <SelectItem value="medium">Medium (70-80%)</SelectItem>
                    <SelectItem value="low">Low ({"<"}70%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" defaultValue="2025-05-01" />
                  <Input type="date" defaultValue="2025-05-31" />
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
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <Tabs defaultValue="table" className="space-y-4">
              <TabsList>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Table View
                </TabsTrigger>
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Charts
                </TabsTrigger>
                <TabsTrigger value="yield" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Yield Analysis
                </TabsTrigger>
              </TabsList>
              <TabsContent value="table" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Product & Ingredient Summary</CardTitle>
                    <CardDescription>Overview of all products and ingredients with forecast data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                              Product Name
                              {sortField === "name" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("forecastQty")}>
                              Forecast Qty
                              {sortField === "forecastQty" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("forecastWeight")}>
                              Forecast Weight
                              {sortField === "forecastWeight" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("yieldRate")}>
                              Yield Rate
                              {sortField === "yieldRate" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("rawMaterial")}>
                              Raw Material
                              {sortField === "rawMaterial" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("waste")}>
                              Waste
                              {sortField === "waste" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("finalForecast")}>
                              Final Forecast
                              {sortField === "finalForecast" &&
                                (sortDirection === "asc" ? (
                                  <ArrowUp className="inline ml-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="inline ml-1 h-3 w-3" />
                                ))}
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.map((product) => (
                            <TableRow
                              key={product.id}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => setSelectedProduct(product.id)}
                            >
                              <TableCell className="font-medium">
                                {product.name}
                                <Badge variant="outline" className="ml-2">
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell>{product.forecastQty}</TableCell>
                              <TableCell>{product.forecastWeight} lbs</TableCell>
                              <TableCell
                                className={
                                  product.yieldRate >= 0.8
                                    ? "text-green-600"
                                    : product.yieldRate >= 0.7
                                      ? "text-amber-600"
                                      : "text-red-600"
                                }
                              >
                                {(product.yieldRate * 100).toFixed(1)}%
                              </TableCell>
                              <TableCell>{product.rawMaterial} lbs</TableCell>
                              <TableCell>{product.waste} lbs</TableCell>
                              <TableCell>{product.finalForecast}</TableCell>
                              <TableCell>{getStatusBadge(product.status)}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Forecast</DropdownMenuItem>
                                    <DropdownMenuItem>View History</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {selectedProduct && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                      <CardDescription>Detailed information for the selected product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h3 className="font-medium mb-2">Product Information</h3>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="text-sm text-muted-foreground">Name:</div>
                              <div className="text-sm font-medium">
                                {productData.find((p) => p.id === selectedProduct)?.name}
                              </div>
                              <div className="text-sm text-muted-foreground">Category:</div>
                              <div className="text-sm font-medium">
                                {productData.find((p) => p.id === selectedProduct)?.category}
                              </div>
                              <div className="text-sm text-muted-foreground">Forecast Quantity:</div>
                              <div className="text-sm font-medium">
                                {productData.find((p) => p.id === selectedProduct)?.forecastQty} units
                              </div>
                              <div className="text-sm text-muted-foreground">Forecast Weight:</div>
                              <div className="text-sm font-medium">
                                {productData.find((p) => p.id === selectedProduct)?.forecastWeight} lbs
                              </div>
                              <div className="text-sm text-muted-foreground">Yield Rate:</div>
                              <div className="text-sm font-medium">
                                {(productData.find((p) => p.id === selectedProduct)?.yieldRate || 0) * 100}%
                              </div>
                              <div className="text-sm text-muted-foreground">Raw Material:</div>
                              <div className="text-sm font-medium">
                                {productData.find((p) => p.id === selectedProduct)?.rawMaterial} lbs
                              </div>
                              <div className="text-sm text-muted-foreground">Waste:</div>
                              <div className="text-sm font-medium">
                                {productData.find((p) => p.id === selectedProduct)?.waste} lbs
                              </div>
                              <div className="text-sm text-muted-foreground">Trend:</div>
                              <div className="text-sm font-medium">
                                {productData.find((p) => p.id === selectedProduct)?.trend}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Material Breakdown</h3>
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={[
                                  {
                                    name: "Finished Product",
                                    value: productData.find((p) => p.id === selectedProduct)?.forecastWeight || 0,
                                    color: "#82ca9d",
                                  },
                                  {
                                    name: "Waste",
                                    value: productData.find((p) => p.id === selectedProduct)?.waste || 0,
                                    color: "#ff7300",
                                  },
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {[
                                  { name: "Finished Product", value: 0, color: "#82ca9d" },
                                  { name: "Waste", value: 0, color: "#ff7300" },
                                ].map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="charts" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Forecast by Category</CardTitle>
                      <CardDescription>Distribution of forecast by product category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Products by Forecast</CardTitle>
                      <CardDescription>Products with highest forecast quantities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={productData.sort((a, b) => b.forecastQty - a.forecastQty).slice(0, 5)}
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
                          <Bar dataKey="forecastQty" fill="#8884d8" name="Forecast Quantity" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="yield" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Yield Rate Analysis</CardTitle>
                    <CardDescription>Comparison of yield rates across products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={yieldData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="yieldRate"
                          fill="#8884d8"
                          name="Yield Rate (%)"
                          label={{ position: "top", formatter: (value: number) => `${value}%` }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Waste Analysis</CardTitle>
                    <CardDescription>Raw material waste by product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Raw Material (lbs)</TableHead>
                            <TableHead>Finished Weight (lbs)</TableHead>
                            <TableHead>Waste (lbs)</TableHead>
                            <TableHead>Waste %</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {productData
                            .sort((a, b) => b.waste / b.rawMaterial - a.waste / a.rawMaterial)
                            .map((product) => (
                              <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.rawMaterial}</TableCell>
                                <TableCell>{product.forecastWeight}</TableCell>
                                <TableCell>{product.waste}</TableCell>
                                <TableCell
                                  className={
                                    product.waste / product.rawMaterial <= 0.15
                                      ? "text-green-600"
                                      : product.waste / product.rawMaterial <= 0.25
                                        ? "text-amber-600"
                                        : "text-red-600"
                                  }
                                >
                                  {((product.waste / product.rawMaterial) * 100).toFixed(1)}%
                                </TableCell>
                                <TableCell>
                                  {product.waste / product.rawMaterial <= 0.15 ? (
                                    <Badge className="bg-green-500">Good</Badge>
                                  ) : product.waste / product.rawMaterial <= 0.25 ? (
                                    <Badge className="bg-amber-500">Average</Badge>
                                  ) : (
                                    <Badge className="bg-red-500">High Waste</Badge>
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
