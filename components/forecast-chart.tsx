"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProducts, getProductSalesData, getProductForecasts } from "@/app/actions/data-actions"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Product {
  id: string
  name: string
}

interface SalesData {
  id: string
  product_id: string
  date: string
  quantity: number
  revenue: number
}

interface ForecastData {
  id: string
  product_id: string
  date: string
  forecast_quantity: number
  forecast_revenue: number
  confidence_level: number | null
}

export default function ForecastChart() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
        if (data.length > 0) {
          setSelectedProduct(data[0].id)
        }
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load products")
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get sales and forecast data when product changes
  useEffect(() => {
    if (!selectedProduct) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Get data for the last 6 months and next 6 months
        const today = new Date()
        const sixMonthsAgo = new Date(today)
        sixMonthsAgo.setMonth(today.getMonth() - 6)

        const sixMonthsFromNow = new Date(today)
        sixMonthsFromNow.setMonth(today.getMonth() + 6)

        const startDate = sixMonthsAgo.toISOString().split("T")[0]
        const endDate = sixMonthsFromNow.toISOString().split("T")[0]

        const [sales, forecasts] = await Promise.all([
          getProductSalesData(selectedProduct, startDate, endDate),
          getProductForecasts(selectedProduct, startDate, endDate),
        ])

        setSalesData(sales)
        setForecastData(forecasts)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load data")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedProduct])

  // Combine sales and forecast data for the chart
  const chartData = [...salesData, ...forecastData]
    .reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })

      const existingEntry = acc.find((entry) => entry.date === date)

      if (existingEntry) {
        if ("quantity" in item) {
          existingEntry.actualQuantity = (item as SalesData).quantity
          existingEntry.actualRevenue = (item as SalesData).revenue
        } else {
          existingEntry.forecastQuantity = (item as ForecastData).forecast_quantity
          existingEntry.forecastRevenue = (item as ForecastData).forecast_revenue
        }
        return acc
      }

      const newEntry = {
        date,
        actualQuantity: "quantity" in item ? (item as SalesData).quantity : 0,
        forecastQuantity: "forecast_quantity" in item ? (item as ForecastData).forecast_quantity : 0,
        actualRevenue: "revenue" in item ? (item as SalesData).revenue : 0,
        forecastRevenue: "forecast_revenue" in item ? (item as ForecastData).forecast_revenue : 0,
      }

      return [...acc, newEntry]
    }, [] as any[])
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    })

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Sales Forecast</CardTitle>
          <CardDescription>Actual vs. forecasted sales</CardDescription>
        </div>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[350px] items-center justify-center">
            <p>Loading data...</p>
          </div>
        ) : error ? (
          <div className="flex h-[350px] items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="actualQuantity"
                name="Actual Quantity"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="forecastQuantity"
                name="Forecast Quantity"
                stroke="#82ca9d"
                strokeDasharray="5 5"
              />
              <Line yAxisId="right" type="monotone" dataKey="actualRevenue" name="Actual Revenue" stroke="#ff7300" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="forecastRevenue"
                name="Forecast Revenue"
                stroke="#0088fe"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
