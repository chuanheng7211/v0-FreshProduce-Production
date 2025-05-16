"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForecastParameters() {
  return (
    <Tabs defaultValue="ensemble">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="timeseries">Time Series</TabsTrigger>
        <TabsTrigger value="regression">ML Regression</TabsTrigger>
        <TabsTrigger value="ensemble">Ensemble</TabsTrigger>
        <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
        <TabsTrigger value="trend">Trend-based</TabsTrigger>
      </TabsList>

      <TabsContent value="ensemble" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Ensemble Model Parameters</CardTitle>
            <CardDescription>Configure the ensemble forecasting model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Model Weights</Label>
              <div className="grid gap-2">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="timeseries-weight" className="text-sm">
                    Time Series
                  </Label>
                  <div className="flex items-center gap-2">
                    <Slider id="timeseries-weight" defaultValue={[30]} max={100} step={5} />
                    <span className="w-12 text-sm">30%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="regression-weight" className="text-sm">
                    ML Regression
                  </Label>
                  <div className="flex items-center gap-2">
                    <Slider id="regression-weight" defaultValue={[40]} max={100} step={5} />
                    <span className="w-12 text-sm">40%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="seasonal-weight" className="text-sm">
                    Seasonal
                  </Label>
                  <div className="flex items-center gap-2">
                    <Slider id="seasonal-weight" defaultValue={[20]} max={100} step={5} />
                    <span className="w-12 text-sm">20%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="trend-weight" className="text-sm">
                    Trend-based
                  </Label>
                  <div className="flex items-center gap-2">
                    <Slider id="trend-weight" defaultValue={[10]} max={100} step={5} />
                    <span className="w-12 text-sm">10%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Advanced Settings</Label>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-weight" className="text-sm">
                    Auto-adjust Weights
                  </Label>
                  <Switch id="auto-weight" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="outlier-detection" className="text-sm">
                    Outlier Detection
                  </Label>
                  <Switch id="outlier-detection" defaultChecked />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="learning-rate" className="text-sm">
                    Learning Rate
                  </Label>
                  <Input id="learning-rate" type="number" defaultValue="0.01" min="0.001" max="1" step="0.001" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Apply Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="timeseries" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Time Series Model Parameters</CardTitle>
            <CardDescription>Configure the time series forecasting model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="p-value">AR Order (p)</Label>
                  <Input id="p-value" type="number" defaultValue="2" min="0" max="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-value">Differencing (d)</Label>
                  <Input id="d-value" type="number" defaultValue="1" min="0" max="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q-value">MA Order (q)</Label>
                  <Input id="q-value" type="number" defaultValue="2" min="0" max="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="s-value">Seasonal Period (s)</Label>
                  <Input id="s-value" type="number" defaultValue="12" min="0" max="52" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-arima" defaultChecked />
                <Label htmlFor="auto-arima">Auto ARIMA Parameter Selection</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Apply Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Other tabs would be implemented similarly */}
      <TabsContent value="regression" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>ML Regression Parameters</CardTitle>
            <CardDescription>Configure the machine learning regression model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* ML Regression specific parameters would go here */}
              <p className="text-muted-foreground">Configure machine learning regression parameters here.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="seasonal" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Model Parameters</CardTitle>
            <CardDescription>Configure the seasonal decomposition model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Seasonal model specific parameters would go here */}
              <p className="text-muted-foreground">Configure seasonal decomposition parameters here.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trend" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Trend-based Model Parameters</CardTitle>
            <CardDescription>Configure the trend-based forecasting model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Trend-based model specific parameters would go here */}
              <p className="text-muted-foreground">Configure trend-based forecasting parameters here.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
