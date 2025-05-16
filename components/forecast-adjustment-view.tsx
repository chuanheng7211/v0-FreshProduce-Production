"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle2,
  Download,
  Filter,
  Info,
  Pencil,
  Save,
  Search,
  X,
  ClipboardList,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "@/components/header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Sample data for the forecast adjustment
const forecastData = [
  {
    id: "f1",
    product: "Product A",
    customer: "ABC Corporation",
    category: "Finished Goods",
    historical: 1200,
    systemForecast: 1250,
    adjustedForecast: 1250,
    lastYear: 1150,
    trend: "increase",
    notes: "",
    rawRequired: 1563,
    laborHours: 125,
    yieldRate: 0.8,
    unitWeight: 1.25,
    timePerUnit: 0.1,
    confirmed: false,
    tasksGenerated: false,
  },
  {
    id: "f2",
    product: "Product B",
    customer: "XYZ Industries",
    category: "Finished Goods",
    historical: 850,
    systemForecast: 800,
    adjustedForecast: 800,
    lastYear: 900,
    trend: "decrease",
    notes: "",
    rawRequired: 1000,
    laborHours: 80,
    yieldRate: 0.8,
    unitWeight: 1.25,
    timePerUnit: 0.1,
    confirmed: false,
    tasksGenerated: false,
  },
  {
    id: "f3",
    product: "Ingredient X",
    customer: "Internal",
    category: "Raw Materials",
    historical: 2000,
    systemForecast: 2100,
    adjustedForecast: 2100,
    lastYear: 1900,
    trend: "increase",
    notes: "",
    rawRequired: 2625,
    laborHours: 105,
    yieldRate: 0.8,
    unitWeight: 1.25,
    timePerUnit: 0.05,
    confirmed: true,
    tasksGenerated: true,
  },
  {
    id: "f4",
    product: "Product C",
    customer: "123 Enterprises",
    category: "Finished Goods",
    historical: 500,
    systemForecast: 550,
    adjustedForecast: 550,
    lastYear: 480,
    trend: "increase",
    notes: "",
    rawRequired: 688,
    laborHours: 55,
    yieldRate: 0.8,
    unitWeight: 1.25,
    timePerUnit: 0.1,
    confirmed: false,
    tasksGenerated: false,
  },
  {
    id: "f5",
    product: "Ingredient Y",
    customer: "Internal",
    category: "Raw Materials",
    historical: 1500,
    systemForecast: 1450,
    adjustedForecast: 1450,
    lastYear: 1550,
    trend: "decrease",
    notes: "",
    rawRequired: 1813,
    laborHours: 73,
    yieldRate: 0.8,
    unitWeight: 1.25,
    timePerUnit: 0.05,
    confirmed: true,
    tasksGenerated: false,
  },
]

// Sample customers and products
const customers = [
  { id: "cust1", name: "ABC Corporation" },
  { id: "cust2", name: "XYZ Industries" },
  { id: "cust3", name: "123 Enterprises" },
  { id: "cust4", name: "Internal" },
]

const products = [
  { id: "prod1", name: "Product A", category: "Finished Goods" },
  { id: "prod2", name: "Product B", category: "Finished Goods" },
  { id: "prod3", name: "Ingredient X", category: "Raw Materials" },
  { id: "prod4", name: "Ingredient Y", category: "Raw Materials" },
  { id: "prod5", name: "Product C", category: "Finished Goods" },
]

// Sample task types for each product
const productTasks = {
  "Product A": ["Cutting", "Assembly", "Packaging", "Quality Control"],
  "Product B": ["Mixing", "Molding", "Packaging", "Quality Control"],
  "Product C": ["Cutting", "Welding", "Finishing", "Quality Control"],
  "Ingredient X": ["Sourcing", "Processing", "Quality Control"],
  "Ingredient Y": ["Sourcing", "Processing", "Quality Control"],
}

export default function ForecastAdjustmentView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [customerFilter, setCustomerFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showUpdatedOnly, setShowUpdatedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editedData, setEditedData] = useState(forecastData)
  const [dateRange, setDateRange] = useState({ from: "2025-05-01", to: "2025-05-31" })
  const [selectedForecast, setSelectedForecast] = useState<any>(null)
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false)
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const { toast } = useToast()

  // Filter data based on search query and filters
  const filteredData = editedData.filter(
    (item) =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (customerFilter === "all" || item.customer === customerFilter) &&
      (categoryFilter === "all" || item.category === categoryFilter) &&
      (!showUpdatedOnly || item.adjustedForecast !== item.systemForecast),
  )

  // Handle forecast adjustment
  const handleAdjustment = (id: string, value: string) => {
    const numValue = Number(value) || 0
    setEditedData(
      editedData.map((item) => {
        if (item.id === id) {
          // Auto-calculate raw material and labor hours
          const rawRequired = (numValue * item.unitWeight) / item.yieldRate
          const laborHours = numValue * item.timePerUnit

          return {
            ...item,
            adjustedForecast: numValue,
            rawRequired,
            laborHours,
            confirmed: false, // Reset confirmation when forecast is adjusted
            tasksGenerated: false, // Reset task generation when forecast is adjusted
          }
        }
        return item
      }),
    )
  }

  // Handle notes
  const handleNotes = (id: string, value: string) => {
    setEditedData(editedData.map((item) => (item.id === id ? { ...item, notes: value } : item)))
  }

  // Get trend badge
  const getTrendBadge = (trend: string, forecast: number, lastYear: number) => {
    const percentChange = ((forecast - lastYear) / lastYear) * 100

    if (trend === "increase") {
      return (
        <Badge className="bg-blue-500 flex items-center gap-1">
          <ArrowUp className="h-3 w-3" /> +{percentChange.toFixed(1)}%
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-500 flex items-center gap-1">
          <ArrowDown className="h-3 w-3" /> {percentChange.toFixed(1)}%
        </Badge>
      )
    }
  }

  // Handle forecast confirmation
  const handleConfirmForecast = (id: string) => {
    setEditedData(editedData.map((item) => (item.id === id ? { ...item, confirmed: !item.confirmed } : item)))
  }

  // Open task generation dialog
  const openTaskGenerationDialog = (forecast: any) => {
    setSelectedForecast(forecast)
    setTaskDialogOpen(true)
  }

  // Generate tasks from forecast
  const generateTasks = () => {
    if (!selectedForecast) return

    setIsGeneratingTasks(true)

    // Simulate API call
    setTimeout(() => {
      setEditedData(
        editedData.map((item) => (item.id === selectedForecast.id ? { ...item, tasksGenerated: true } : item)),
      )

      setIsGeneratingTasks(false)
      setTaskDialogOpen(false)

      toast({
        title: "Tasks generated successfully",
        description: `${productTasks[selectedForecast.product].length} tasks created for ${selectedForecast.product}`,
      })
    }, 1000)
  }

  return (
    <div className="flex h-full">
      {/* Left Panel (Filters) */}
      <div className={`border-r bg-background transition-all duration-200 ${showFilters ? "w-64" : "w-0 -ml-64"}`}>
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
                <Select value={customerFilter} onValueChange={setCustomerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.name}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
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
                <Label>Date Range</Label>
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-updated"
                  checked={showUpdatedOnly}
                  onCheckedChange={(checked) => setShowUpdatedOnly(checked as boolean)}
                />
                <Label htmlFor="show-updated">Show only updated forecasts</Label>
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
        <Header />

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
            <Button variant={editMode ? "default" : "outline"} onClick={() => setEditMode(!editMode)}>
              {editMode ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Adjustments
                </>
              ) : (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Forecasts
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Forecast Adjustment</CardTitle>
                <CardDescription>Review and adjust forecasts for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="table" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                    <TabsTrigger value="resource">Resource Impact</TabsTrigger>
                    <TabsTrigger value="tasks">Generated Tasks</TabsTrigger>
                  </TabsList>
                  <TabsContent value="table">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Historical</TableHead>
                            <TableHead>System Forecast</TableHead>
                            <TableHead>Adjusted Forecast</TableHead>
                            <TableHead>vs. Last Year</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredData.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div className="font-medium">{item.product}</div>
                                <Badge variant="outline" className="mt-1">
                                  {item.category}
                                </Badge>
                              </TableCell>
                              <TableCell>{item.customer}</TableCell>
                              <TableCell>{item.historical}</TableCell>
                              <TableCell>{item.systemForecast}</TableCell>
                              <TableCell>
                                {editMode ? (
                                  <Input
                                    type="number"
                                    value={item.adjustedForecast}
                                    onChange={(e) => handleAdjustment(item.id, e.target.value)}
                                    className={cn(
                                      "w-24",
                                      item.adjustedForecast > item.systemForecast * 1.1 && "border-amber-500",
                                      item.adjustedForecast < item.systemForecast * 0.9 && "border-red-500",
                                    )}
                                  />
                                ) : (
                                  <div
                                    className={cn(
                                      item.adjustedForecast > item.systemForecast && "text-blue-500",
                                      item.adjustedForecast < item.systemForecast && "text-red-500",
                                    )}
                                  >
                                    {item.adjustedForecast}
                                    {item.adjustedForecast !== item.systemForecast && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Info className="h-4 w-4 inline ml-1" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>
                                              Adjusted from system forecast of {item.systemForecast} (
                                              {(
                                                ((item.adjustedForecast - item.systemForecast) / item.systemForecast) *
                                                100
                                              ).toFixed(1)}
                                              %)
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>{getTrendBadge(item.trend, item.adjustedForecast, item.lastYear)}</TableCell>
                              <TableCell>
                                {item.confirmed ? (
                                  <Badge className="bg-green-500">Confirmed</Badge>
                                ) : (
                                  <Badge variant="outline">Draft</Badge>
                                )}
                                {item.tasksGenerated && <Badge className="ml-1 bg-blue-500">Tasks Generated</Badge>}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    variant={item.confirmed ? "outline" : "default"}
                                    size="sm"
                                    onClick={() => handleConfirmForecast(item.id)}
                                  >
                                    {item.confirmed ? "Unconfirm" : "Confirm"}
                                  </Button>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!item.confirmed || item.tasksGenerated}
                                    onClick={() => openTaskGenerationDialog(item)}
                                  >
                                    <ClipboardList className="h-4 w-4 mr-1" />
                                    {item.tasksGenerated ? "Tasks Created" : "Generate Tasks"}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="resource">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Adjusted Forecast</TableHead>
                            <TableHead>Raw Material Required</TableHead>
                            <TableHead>Labor Hours</TableHead>
                            <TableHead>Yield Rate</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredData.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <div className="font-medium">{item.product}</div>
                                <Badge variant="outline" className="mt-1">
                                  {item.category}
                                </Badge>
                              </TableCell>
                              <TableCell>{item.adjustedForecast}</TableCell>
                              <TableCell>{item.rawRequired.toFixed(1)}</TableCell>
                              <TableCell>{item.laborHours.toFixed(1)}</TableCell>
                              <TableCell>{(item.yieldRate * 100).toFixed(1)}%</TableCell>
                              <TableCell>
                                {item.confirmed ? (
                                  <Badge className="bg-green-500">Confirmed</Badge>
                                ) : (
                                  <Badge variant="outline">Draft</Badge>
                                )}
                                {item.tasksGenerated && <Badge className="ml-1 bg-blue-500">Tasks Generated</Badge>}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 p-4 border rounded-md bg-muted/50">
                      <h3 className="font-medium mb-2">Resource Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Raw Material Required</p>
                          <p className="text-xl font-medium">
                            {filteredData.reduce((sum, item) => sum + item.rawRequired, 0).toFixed(1)} units
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Labor Hours</p>
                          <p className="text-xl font-medium">
                            {filteredData.reduce((sum, item) => sum + item.laborHours, 0).toFixed(1)} hours
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Average Yield Rate</p>
                          <p className="text-xl font-medium">
                            {(
                              (filteredData.reduce((sum, item) => sum + item.yieldRate, 0) / filteredData.length) *
                              100
                            ).toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="tasks">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Task Type</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Estimated Hours</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredData
                            .filter((item) => item.tasksGenerated)
                            .flatMap((item) =>
                              productTasks[item.product].map((task, index) => ({
                                id: `${item.id}-${index}`,
                                product: item.product,
                                taskType: task,
                                quantity: item.adjustedForecast,
                                estimatedHours: item.laborHours / productTasks[item.product].length,
                                status: "Pending Assignment",
                              })),
                            )
                            .map((task) => (
                              <TableRow key={task.id}>
                                <TableCell>{task.product}</TableCell>
                                <TableCell>{task.taskType}</TableCell>
                                <TableCell>{task.quantity}</TableCell>
                                <TableCell>{task.estimatedHours.toFixed(1)} hours</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{task.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">
                                    Assign Labor
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          {filteredData.filter((item) => item.tasksGenerated).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                                No tasks have been generated yet. Confirm a forecast and click "Generate Tasks" to
                                create tasks.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {filteredData.filter((item) => item.confirmed).length} of {filteredData.length} forecasts confirmed
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save All Changes</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Task Generation Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Tasks from Forecast</DialogTitle>
            <DialogDescription>This will create production tasks based on the confirmed forecast.</DialogDescription>
          </DialogHeader>

          {selectedForecast && (
            <div className="py-4">
              <div className="mb-4 p-3 border rounded-md bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{selectedForecast.product}</h3>
                    <p className="text-sm text-muted-foreground">{selectedForecast.customer}</p>
                  </div>
                  <Badge className="bg-green-500">Confirmed</Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Quantity:</span> {selectedForecast.adjustedForecast}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Labor Hours:</span> {selectedForecast.laborHours.toFixed(1)}
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-2">Tasks to be generated:</h4>
              <div className="space-y-2 mb-4">
                {productTasks[selectedForecast.product].map((task, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{task}</div>
                      <div className="text-sm text-muted-foreground">
                        Estimated time:{" "}
                        {(selectedForecast.laborHours / productTasks[selectedForecast.product].length).toFixed(1)} hours
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
                <p className="text-amber-800">
                  These tasks will be available for assignment in the Labor Planning section after generation.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={generateTasks} disabled={isGeneratingTasks}>
              {isGeneratingTasks ? "Generating..." : "Generate Tasks"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
