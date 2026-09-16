import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * The Supabase anon key is a public key — it is safe to ship in the client
 * bundle because every table is protected by Row-Level Security. When the
 * environment variables are absent the app stays fully functional in
 * "frontend-only" mode: orders simply route through WhatsApp as before.
 */
export const supabaseConfigured = Boolean(url && anonKey)

export const supabase = supabaseConfigured ? createClient(url, anonKey) : null

export default supabase
