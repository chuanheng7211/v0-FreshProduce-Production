"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

// Sample forecast data
const forecastData = [
  { month: "Jun", pessimistic: 3800, expected: 4200, optimistic: 4600 },
  { month: "Jul", pessimistic: 4000, expected: 4500, optimistic: 5000 },
  { month: "Aug", pessimistic: 4200, expected: 4700, optimistic: 5200 },
]

// Detailed forecast data with accuracy metrics
const detailedForecastData = [
  { model: "Time Series", accuracy: 92, error: 8 },
  { model: "ML Regression", accuracy: 94, error: 6 },
  { model: "Ensemble", accuracy: 95, error: 5 },
  { model: "Seasonal", accuracy: 91, error: 9 },
  { model: "Trend-based", accuracy: 89, error: 11 },
]

interface ForecastChartProps {
  detailed?: boolean
}

export default function ForecastChart({ detailed = false }: ForecastChartProps) {
  if (detailed) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={detailedForecastData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="model" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy %" />
          <Bar dataKey="error" fill="#ff7300" name="Error %" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={forecastData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="pessimistic" stackId="1" stroke="#8884d8" fill="#8884d8" name="Pessimistic" />
        <Area type="monotone" dataKey="expected" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Expected" />
        <Area type="monotone" dataKey="optimistic" stackId="3" stroke="#ffc658" fill="#ffc658" name="Optimistic" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
