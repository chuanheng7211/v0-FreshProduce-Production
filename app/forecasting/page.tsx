import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ForecastModelSelector from "@/components/forecast-model-selector"
import ForecastChart from "@/components/forecast-chart"
import ForecastAccuracyMetrics from "@/components/forecast-accuracy-metrics"
import ForecastParameters from "@/components/forecast-parameters"

export default function ForecastingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Sales Forecasting</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Forecast Models</CardTitle>
            <CardDescription>Select and configure prediction models</CardDescription>
          </CardHeader>
          <CardContent>
            <ForecastModelSelector />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accuracy Metrics</CardTitle>
            <CardDescription>Model performance evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <ForecastAccuracyMetrics />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="historical">Historical Accuracy</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Forecast</CardTitle>
              <CardDescription>Projected sales for the next 3 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ForecastChart detailed={true} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Parameters</CardTitle>
              <CardDescription>Configure forecasting model parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastParameters />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Accuracy</CardTitle>
              <CardDescription>Past performance of forecasting models</CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastAccuracyMetrics detailed={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
