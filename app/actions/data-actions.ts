"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

// Fetch products
export async function getProducts() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").select("*").order("name")

  if (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }

  return data
}

// Fetch sales data for a specific product
export async function getProductSalesData(productId: string, startDate: string, endDate: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("sales_data")
    .select("*")
    .eq("product_id", productId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date")

  if (error) {
    console.error("Error fetching sales data:", error)
    throw new Error("Failed to fetch sales data")
  }

  return data
}

// Fetch forecasts for a specific product
export async function getProductForecasts(productId: string, startDate: string, endDate: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("forecasts")
    .select("*")
    .eq("product_id", productId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date")

  if (error) {
    console.error("Error fetching forecasts:", error)
    throw new Error("Failed to fetch forecasts")
  }

  return data
}

// Update a forecast
export async function updateForecast(
  forecastId: string,
  updates: { forecast_quantity?: number; forecast_revenue?: number },
) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("forecasts")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", forecastId)
    .select()
    .single()

  if (error) {
    console.error("Error updating forecast:", error)
    throw new Error("Failed to update forecast")
  }

  return data
}

// Get tasks with assignments
export async function getTasks(status?: string) {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("tasks").select(`
      *,
      production_schedules(
        *,
        products(*)
      ),
      staff_assignments(
        *,
        users(id, name, email, role)
      )
    `)

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tasks:", error)
    throw new Error("Failed to fetch tasks")
  }

  return data
}

// Create a new task
export async function createTask(task: {
  production_schedule_id: string
  name: string
  description?: string
  estimated_hours: number
  status: string
}) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("tasks").insert(task).select().single()

  if (error) {
    console.error("Error creating task:", error)
    throw new Error("Failed to create task")
  }

  return data
}

// Assign staff to a task
export async function assignStaffToTask(assignment: {
  task_id: string
  user_id: string
  assigned_date: string
  hours_allocated: number
  created_by: string
}) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("staff_assignments").insert(assignment).select().single()

  if (error) {
    console.error("Error assigning staff:", error)
    throw new Error("Failed to assign staff to task")
  }

  return data
}

// Get yield tracking data
export async function getYieldData(productionScheduleId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("yield_tracking")
    .select("*")
    .eq("production_schedule_id", productionScheduleId)
    .order("date")

  if (error) {
    console.error("Error fetching yield data:", error)
    throw new Error("Failed to fetch yield data")
  }

  return data
}

// Record yield data
export async function recordYieldData(yieldData: {
  production_schedule_id: string
  date: string
  actual_quantity: number
  defect_quantity: number
  efficiency_percentage?: number
  notes?: string
  recorded_by: string
}) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("yield_tracking").insert(yieldData).select().single()

  if (error) {
    console.error("Error recording yield data:", error)
    throw new Error("Failed to record yield data")
  }

  return data
}
