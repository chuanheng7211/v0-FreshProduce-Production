"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Download, FileSpreadsheet, FileIcon as FilePdf, Mail, Calendar } from "lucide-react"

export default function ExportReports() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [format, setFormat] = useState("excel")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="report-type" className="text-sm font-medium">
            Report Type
          </label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger id="report-type">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forecast">Sales Forecast</SelectItem>
              <SelectItem value="production">Production Plan</SelectItem>
              <SelectItem value="labor">Labor Schedule</SelectItem>
              <SelectItem value="material">Material Requirements</SelectItem>
              <SelectItem value="efficiency">Efficiency Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="date-range" className="text-sm font-medium">
            Date Range
          </label>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger id="date-range">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-week">Current Week</SelectItem>
              <SelectItem value="next-week">Next Week</SelectItem>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="format" className="text-sm font-medium">
            Export Format
          </label>
          <div className="flex gap-2">
            <Button
              variant={format === "excel" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("excel")}
              className="flex-1"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button
              variant={format === "pdf" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("pdf")}
              className="flex-1"
            >
              <FilePdf className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      {dateRange === "custom" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="start-date" className="text-sm font-medium">
              Start Date
            </label>
            <Input id="start-date" type="date" />
          </div>
          <div className="space-y-2">
            <label htmlFor="end-date" className="text-sm font-medium">
              End Date
            </label>
            <Input id="end-date" type="date" />
          </div>
        </div>
      )}

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forecast">Forecast Reports</TabsTrigger>
          <TabsTrigger value="production">Production Reports</TabsTrigger>
          <TabsTrigger value="resource">Resource Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Forecast Report Options</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-historical" />
                      <Label htmlFor="include-historical">Include Historical Data</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-system-forecast" defaultChecked />
                      <Label htmlFor="include-system-forecast">Include System Forecast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-adjusted-forecast" defaultChecked />
                      <Label htmlFor="include-adjusted-forecast">Include Adjusted Forecast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-variance" />
                      <Label htmlFor="include-variance">Include Variance Analysis</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="group-by-product" defaultChecked />
                      <Label htmlFor="group-by-product">Group by Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="group-by-customer" />
                      <Label htmlFor="group-by-customer">Group by Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-charts" defaultChecked />
                      <Label htmlFor="include-charts">Include Charts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-notes" />
                      <Label htmlFor="include-notes">Include Notes</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center gap-4 h-[200px]">
                  <FileSpreadsheet className="h-16 w-16 text-muted-foreground" />
                  <h3 className="font-medium">Sales Forecast Report</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Export detailed sales forecast with historical data and predictions
                  </p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Forecast
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center gap-4 h-[200px]">
                  <Calendar className="h-16 w-16 text-muted-foreground" />
                  <h3 className="font-medium">Forecast Calendar</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Export forecast data in calendar format for planning
                  </p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Production Report Options</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-tasks" defaultChecked />
                      <Label htmlFor="include-tasks">Include Production Tasks</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-labor" defaultChecked />
                      <Label htmlFor="include-labor">Include Labor Requirements</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-materials" defaultChecked />
                      <Label htmlFor="include-materials">Include Material Requirements</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-efficiency" />
                      <Label htmlFor="include-efficiency">Include Efficiency Metrics</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="daily-breakdown" defaultChecked />
                      <Label htmlFor="daily-breakdown">Daily Breakdown</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weekly-summary" defaultChecked />
                      <Label htmlFor="weekly-summary">Weekly Summary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-production-charts" defaultChecked />
                      <Label htmlFor="include-production-charts">Include Charts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-production-notes" />
                      <Label htmlFor="include-production-notes">Include Notes</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center gap-4 h-[200px]">
                  <FileSpreadsheet className="h-16 w-16 text-muted-foreground" />
                  <h3 className="font-medium">Production Plan Report</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Export detailed production plan with tasks and resource allocation
                  </p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Production Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center gap-4 h-[200px]">
                  <Mail className="h-16 w-16 text-muted-foreground" />
                  <h3 className="font-medium">Email Reports</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Send reports directly to stakeholders via email
                  </p>
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="resource" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Resource Report Options</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-staff-schedule" defaultChecked />
                      <Label htmlFor="include-staff-schedule">Include Staff Schedule</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-utilization" defaultChecked />
                      <Label htmlFor="include-utilization">Include Utilization Metrics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-skills" />
                      <Label htmlFor="include-skills">Include Skills Matrix</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-capacity" defaultChecked />
                      <Label htmlFor="include-capacity">Include Capacity Analysis</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="individual-schedules" defaultChecked />
                      <Label htmlFor="individual-schedules">Individual Schedules</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="department-summary" defaultChecked />
                      <Label htmlFor="department-summary">Department Summary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-resource-charts" defaultChecked />
                      <Label htmlFor="include-resource-charts">Include Charts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-resource-notes" />
                      <Label htmlFor="include-resource-notes">Include Notes</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center gap-4 h-[200px]">
                  <FileSpreadsheet className="h-16 w-16 text-muted-foreground" />
                  <h3 className="font-medium">Labor Schedule Report</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Export detailed labor schedule with staff assignments
                  </p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Labor Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center gap-4 h-[200px]">
                  <FileSpreadsheet className="h-16 w-16 text-muted-foreground" />
                  <h3 className="font-medium">Material Requirements Report</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Export detailed material requirements with yield calculations
                  </p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Material Requirements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset Options</Button>
        <Button variant="outline">Save Report Template</Button>
        <Button>Generate Report</Button>
      </div>
    </div>
  )
}
