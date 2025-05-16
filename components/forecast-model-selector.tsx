"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForecastModelSelector() {
  const [selectedModel, setSelectedModel] = useState("ensemble")
  const [seasonalityEnabled, setSeasonalityEnabled] = useState(true)
  const [confidenceInterval, setConfidenceInterval] = useState([85])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="model-type">Forecasting Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger id="model-type">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="timeseries">Time Series Analysis</SelectItem>
              <SelectItem value="regression">ML Regression</SelectItem>
              <SelectItem value="ensemble">Ensemble Model</SelectItem>
              <SelectItem value="seasonal">Seasonal Decomposition</SelectItem>
              <SelectItem value="trend">Trend-based Forecasting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="forecast-horizon">Forecast Horizon</Label>
          <Select defaultValue="3months">
            <SelectTrigger id="forecast-horizon">
              <SelectValue placeholder="Select horizon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="confidence-interval">Confidence Interval: {confidenceInterval}%</Label>
        </div>
        <Slider
          id="confidence-interval"
          min={50}
          max={99}
          step={1}
          value={confidenceInterval}
          onValueChange={setConfidenceInterval}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="seasonality" checked={seasonalityEnabled} onCheckedChange={setSeasonalityEnabled} />
        <Label htmlFor="seasonality">Include Seasonality Factors</Label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Data Range</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="start-date" className="text-xs">
                    Start Date
                  </Label>
                  <Input id="start-date" type="date" defaultValue="2024-01-01" />
                </div>
                <div>
                  <Label htmlFor="end-date" className="text-xs">
                    End Date
                  </Label>
                  <Input id="end-date" type="date" defaultValue="2025-05-12" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">External Factors</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="market-trends" defaultChecked />
                <Label htmlFor="market-trends" className="text-xs">
                  Market Trends
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="competitor-actions" />
                <Label htmlFor="competitor-actions" className="text-xs">
                  Competitor Actions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="economic-indicators" defaultChecked />
                <Label htmlFor="economic-indicators" className="text-xs">
                  Economic Indicators
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset</Button>
        <Button>Generate Forecast</Button>
      </div>
    </div>
  )
}
