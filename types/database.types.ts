export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: string
          department: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role: string
          department?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: string
          department?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          unit_of_measure: string
          production_time_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          unit_of_measure: string
          production_time_minutes: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string | null
          unit_of_measure?: string
          production_time_minutes?: number
          created_at?: string
        }
      }
      sales_data: {
        Row: {
          id: string
          product_id: string
          date: string
          quantity: number
          revenue: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          date: string
          quantity: number
          revenue: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          date?: string
          quantity?: number
          revenue?: number
          created_at?: string
        }
      }
      forecasts: {
        Row: {
          id: string
          product_id: string
          date: string
          forecast_quantity: number
          forecast_revenue: number
          confidence_level: number | null
          created_by: string | null
          model_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          date: string
          forecast_quantity: number
          forecast_revenue: number
          confidence_level?: number | null
          created_by?: string | null
          model_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          date?: string
          forecast_quantity?: number
          forecast_revenue?: number
          confidence_level?: number | null
          created_by?: string | null
          model_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      production_schedules: {
        Row: {
          id: string
          product_id: string
          start_date: string
          end_date: string
          planned_quantity: number
          status: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          start_date: string
          end_date: string
          planned_quantity: number
          status: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          start_date?: string
          end_date?: string
          planned_quantity?: number
          status?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          production_schedule_id: string
          name: string
          description: string | null
          estimated_hours: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          production_schedule_id: string
          name: string
          description?: string | null
          estimated_hours: number
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          production_schedule_id?: string
          name?: string
          description?: string | null
          estimated_hours?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      staff_assignments: {
        Row: {
          id: string
          task_id: string
          user_id: string
          assigned_date: string
          hours_allocated: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          user_id: string
          assigned_date: string
          hours_allocated: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          user_id?: string
          assigned_date?: string
          hours_allocated?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      yield_tracking: {
        Row: {
          id: string
          production_schedule_id: string
          date: string
          actual_quantity: number
          defect_quantity: number
          efficiency_percentage: number | null
          notes: string | null
          recorded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          production_schedule_id: string
          date: string
          actual_quantity: number
          defect_quantity?: number
          efficiency_percentage?: number | null
          notes?: string | null
          recorded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          production_schedule_id?: string
          date?: string
          actual_quantity?: number
          defect_quantity?: number
          efficiency_percentage?: number | null
          notes?: string | null
          recorded_by?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
