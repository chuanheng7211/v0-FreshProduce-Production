"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { month: "Jan", actual: 4000, forecast: 4200 },
  { month: "Feb", actual: 3000, forecast: 3100 },
  { month: "Mar", actual: 2000, forecast: 2400 },
  { month: "Apr", actual: 2780, forecast: 2500 },
  { month: "May", actual: 1890, forecast: 2100 },
  { month: "Jun", actual: 2390, forecast: 2200 },
  { month: "Jul", actual: 3490, forecast: 3200 },
  { month: "Aug", actual: 3490, forecast: 3400 },
  { month: "Sep", actual: 4000, forecast: 3800 },
  { month: "Oct", actual: 4500, forecast: 4300 },
  { month: "Nov", actual: 4100, forecast: 4000 },
  { month: "Dec", actual: 4900, forecast: 4800 },
]

// Detailed data with product categories
const detailedData = [
  { month: "Jan", actual: 4000, forecast: 4200, productA: 1500, productB: 1200, productC: 1300 },
  { month: "Feb", actual: 3000, forecast: 3100, productA: 1000, productB: 1000, productC: 1000 },
  { month: "Mar", actual: 2000, forecast: 2400, productA: 800, productB: 700, productC: 500 },
  { month: "Apr", actual: 2780, forecast: 2500, productA: 1000, productB: 980, productC: 800 },
  { month: "May", actual: 1890, forecast: 2100, productA: 700, productB: 680, productC: 510 },
  { month: "Jun", actual: 2390, forecast: 2200, productA: 800, productB: 790, productC: 800 },
]

interface SalesChartProps {
  detailed?: boolean
}

export default function SalesChart({ detailed = false }: SalesChartProps) {
  const chartData = detailed ? detailedData : data

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={chartData}
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
        <Line type="monotone" dataKey="actual" stroke="#8884d8" activeDot={{ r: 8 }} name="Actual Sales" />
        <Line type="monotone" dataKey="forecast" stroke="#82ca9d" name="Forecasted Sales" />
        {detailed && (
          <>
            <Line type="monotone" dataKey="productA" stroke="#ff7300" name="Product A" />
            <Line type="monotone" dataKey="productB" stroke="#0088fe" name="Product B" />
            <Line type="monotone" dataKey="productC" stroke="#00C49F" name="Product C" />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
