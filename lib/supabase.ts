import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

// Create a single supabase client for server-side operations
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient<Database>(supabaseUrl, supabaseKey)
}

// For client components, we need to create a singleton to avoid duplicated clients
let clientInstance: ReturnType<typeof createClient<Database>> | null = null

export const createClientSupabaseClient = () => {
  if (clientInstance) return clientInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  clientInstance = createClient<Database>(supabaseUrl, supabaseKey)
  return clientInstance
}
