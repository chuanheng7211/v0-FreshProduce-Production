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
  Calendar,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
  FileText,
  BarChart3,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Share2,
  Mail,
  Clock,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Sample report data
const reportData = [
  {
    id: "r1",
    name: "Monthly Production Summary",
    category: "Production",
    format: "PDF",
    lastGenerated: "2025-04-30",
    frequency: "Monthly",
    scheduled: true,
    recipients: ["Production Manager", "CEO"],
  },
  {
    id: "r2",
    name: "Weekly Yield Analysis",
    category: "Quality",
    format: "Excel",
    lastGenerated: "2025-05-05",
    frequency: "Weekly",
    scheduled: true,
    recipients: ["Quality Manager", "Production Manager"],
  },
  {
    id: "r3",
    name: "Daily Production Log",
    category: "Production",
    format: "Excel",
    lastGenerated: "2025-05-10",
    frequency: "Daily",
    scheduled: true,
    recipients: ["Shift Supervisors", "Production Manager"],
  },
  {
    id: "r4",
    name: "Inventory Status Report",
    category: "Inventory",
    format: "PDF",
    lastGenerated: "2025-05-08",
    frequency: "Weekly",
    scheduled: false,
    recipients: [],
  },
  {
    id: "r5",
    name: "Labor Utilization Report",
    category: "Labor",
    format: "Excel",
    lastGenerated: "2025-04-30",
    frequency: "Monthly",
    scheduled: true,
    recipients: ["HR Manager", "Production Manager", "CEO"],
  },
  {
    id: "r6",
    name: "Forecast Accuracy Analysis",
    category: "Forecasting",
    format: "PDF",
    lastGenerated: "2025-04-30",
    frequency: "Monthly",
    scheduled: false,
    recipients: [],
  },
  {
    id: "r7",
    name: "Waste Reduction Opportunities",
    category: "Quality",
    format: "Excel",
    lastGenerated: "2025-04-30",
    frequency: "Monthly",
    scheduled: true,
    recipients: ["Quality Manager", "Production Manager"],
  },
]

// Sample export history
const exportHistory = [
  {
    id: "e1",
    reportName: "Monthly Production Summary",
    exportedBy: "John Smith",
    exportDate: "2025-04-30 09:15",
    format: "PDF",
    status: "Completed",
  },
  {
    id: "e2",
    reportName: "Weekly Yield Analysis",
    exportedBy: "Jane Doe",
    exportDate: "2025-05-05 14:30",
    format: "Excel",
    status: "Completed",
  },
  {
    id: "e3",
    reportName: "Daily Production Log",
    exportedBy: "System",
    exportDate: "2025-05-10 06:00",
    format: "Excel",
    status: "Completed",
  },
  {
    id: "e4",
    reportName: "Inventory Status Report",
    exportedBy: "Mike Johnson",
    exportDate: "2025-05-08 11:45",
    format: "PDF",
    status: "Completed",
  },
  {
    id: "e5",
    reportName: "Custom Sales Analysis",
    exportedBy: "Sarah Williams",
    exportDate: "2025-05-07 15:20",
    format: "Excel",
    status: "Failed",
  },
]

export default function ExportReportCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  // Filter reports based on search query and filters
  const filteredReports = reportData.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "all" || report.category === categoryFilter) &&
      (formatFilter === "all" || report.format === formatFilter),
  )

  // Toggle report selection
  const toggleReportSelection = (reportId: string) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    } else {
      setSelectedReports([...selectedReports, reportId])
    }
  }

  // Toggle all reports selection
  const toggleAllReports = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(filteredReports.map((report) => report.id))
    }
  }

  // Get format icon
  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <FilePdf className="h-4 w-4 text-red-500" />
      case "Excel":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4" />
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
                <Label>Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Quality">Quality</SelectItem>
                    <SelectItem value="Inventory">Inventory</SelectItem>
                    <SelectItem value="Labor">Labor</SelectItem>
                    <SelectItem value="Forecasting">Forecasting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={formatFilter} onValueChange={setFormatFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Formats</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frequencies</SelectItem>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" defaultValue="2025-05-01" />
                  <Input type="date" defaultValue="2025-05-31" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="scheduled-only" />
                <Label htmlFor="scheduled-only">Show only scheduled reports</Label>
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
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              May 2025
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <Tabs defaultValue="reports" className="space-y-4">
              <TabsList>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Available Reports
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Export History
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Scheduled Reports
                </TabsTrigger>
              </TabsList>
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Reports</CardTitle>
                    <CardDescription>Select reports to export or schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">
                              <Checkbox
                                checked={
                                  selectedReports.length === filteredReports.length && filteredReports.length > 0
                                }
                                onCheckedChange={toggleAllReports}
                              />
                            </TableHead>
                            <TableHead>Report Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Format</TableHead>
                            <TableHead>Last Generated</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.map((report) => (
                            <TableRow key={report.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedReports.includes(report.id)}
                                  onCheckedChange={() => toggleReportSelection(report.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{report.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{report.category}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {getFormatIcon(report.format)}
                                  {report.format}
                                </div>
                              </TableCell>
                              <TableCell>{new Date(report.lastGenerated).toLocaleDateString()}</TableCell>
                              <TableCell>{report.frequency}</TableCell>
                              <TableCell>
                                {report.scheduled ? (
                                  <Badge className="bg-green-500">Scheduled</Badge>
                                ) : (
                                  <Badge variant="outline">On-demand</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Export
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Schedule
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {selectedReports.length > 0 && (
                      <div className="mt-4 p-4 border rounded-md bg-muted/50 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{selectedReports.length} reports selected</p>
                          <p className="text-sm text-muted-foreground">Select an action to perform on these reports</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule Selected
                          </Button>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Export Selected
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Export History</CardTitle>
                    <CardDescription>Recent report exports and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Report Name</TableHead>
                            <TableHead>Exported By</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Format</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exportHistory.map((export_) => (
                            <TableRow key={export_.id}>
                              <TableCell className="font-medium">{export_.reportName}</TableCell>
                              <TableCell>{export_.exportedBy}</TableCell>
                              <TableCell>{export_.exportDate}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {getFormatIcon(export_.format)}
                                  {export_.format}
                                </div>
                              </TableCell>
                              <TableCell>
                                {export_.status === "Completed" ? (
                                  <Badge className="bg-green-500">Completed</Badge>
                                ) : (
                                  <Badge className="bg-red-500">Failed</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  {export_.status === "Completed" && (
                                    <>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Share2 className="h-4 w-4 mr-1" />
                                        Share
                                      </Button>
                                    </>
                                  )}
                                  {export_.status === "Failed" && (
                                    <Button variant="outline" size="sm">
                                      <BarChart3 className="h-4 w-4 mr-1" />
                                      View Error
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="scheduled" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>Reports configured for automatic generation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Report Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Next Run</TableHead>
                            <TableHead>Recipients</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reportData
                            .filter((report) => report.scheduled)
                            .map((report) => (
                              <TableRow key={report.id}>
                                <TableCell className="font-medium">{report.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{report.category}</Badge>
                                </TableCell>
                                <TableCell>{report.frequency}</TableCell>
                                <TableCell>
                                  {report.frequency === "Daily" && "Tomorrow, 06:00 AM"}
                                  {report.frequency === "Weekly" && "Next Monday, 06:00 AM"}
                                  {report.frequency === "Monthly" && "June 1, 2025, 06:00 AM"}
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    {report.recipients.map((recipient, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {recipient}
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Mail className="h-4 w-4 mr-1" />
                                      Edit Recipients
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      Edit Schedule
                                    </Button>
                                  </div>
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
