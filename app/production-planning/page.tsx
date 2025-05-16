import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductionSchedule from "@/components/production-schedule"
import ResourceAllocation from "@/components/resource-allocation"
import CapacityPlanning from "@/components/capacity-planning"

export default function ProductionPlanningPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Production Planning</h1>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Production Schedule</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Schedule</CardTitle>
              <CardDescription>Manage and optimize production schedules based on forecasts</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductionSchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>Allocate resources efficiently across production lines</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourceAllocation />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Capacity Planning</CardTitle>
              <CardDescription>Plan and optimize production capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <CapacityPlanning />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
