import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://ewoppvnwqagymvaqqijn.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3b3Bwdm53cWFneW12YXFxaWpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDkxNzIsImV4cCI6MjA3MzE4NTE3Mn0.CddLYrDXnJ-3-n2HzC41xmx8KaUnpI_uvhXl8T-ApFc"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)