import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkforceSchedule from "@/components/workforce-schedule"
import SkillsMatrix from "@/components/skills-matrix"
import WorkforceAnalytics from "@/components/workforce-analytics"

export default function WorkforcePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Workforce Scheduling</h1>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workforce Schedule</CardTitle>
              <CardDescription>Manage and optimize workforce scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkforceSchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Matrix</CardTitle>
              <CardDescription>Employee skills and competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <SkillsMatrix />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workforce Analytics</CardTitle>
              <CardDescription>Workforce performance and efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkforceAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
