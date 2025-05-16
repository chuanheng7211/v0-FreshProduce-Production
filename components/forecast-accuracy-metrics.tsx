"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample accuracy data
const accuracyData = [
  { model: "Time Series", mape: 8.2, rmse: 245, r2: 0.92 },
  { model: "ML Regression", mape: 6.5, rmse: 198, r2: 0.94 },
  { model: "Ensemble", mape: 5.3, rmse: 175, r2: 0.95 },
  { model: "Seasonal", mape: 9.1, rmse: 267, r2: 0.91 },
  { model: "Trend-based", mape: 10.8, rmse: 312, r2: 0.89 },
]

// Historical accuracy data
const historicalAccuracyData = [
  { month: "Dec", accuracy: 91, error: 9 },
  { month: "Jan", accuracy: 89, error: 11 },
  { month: "Feb", accuracy: 92, error: 8 },
  { month: "Mar", accuracy: 94, error: 6 },
  { month: "Apr", accuracy: 93, error: 7 },
  { month: "May", accuracy: 95, error: 5 },
]

interface ForecastAccuracyMetricsProps {
  detailed?: boolean
}

export default function ForecastAccuracyMetrics({ detailed = false }: ForecastAccuracyMetricsProps) {
  if (detailed) {
    return (
      <div className="space-y-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={historicalAccuracyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#8884d8" name="Accuracy %" />
            <Line type="monotone" dataKey="error" stroke="#ff7300" name="Error %" />
          </LineChart>
        </ResponsiveContainer>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>MAPE (%)</TableHead>
              <TableHead>RMSE</TableHead>
              <TableHead>R² Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accuracyData.map((item) => (
              <TableRow key={item.model}>
                <TableCell className="font-medium">{item.model}</TableCell>
                <TableCell>{item.mape}%</TableCell>
                <TableCell>{item.rmse}</TableCell>
                <TableCell>{item.r2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={accuracyData}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis type="category" dataKey="model" />
        <Tooltip />
        <Legend />
        <Bar dataKey="r2" fill="#8884d8" name="R² Score (x100)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
