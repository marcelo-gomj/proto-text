import { createClient } from '@supabase/supabase-js';

const urlSupabase : string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const anonSupabase : string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(urlSupabase, anonSupabase);  