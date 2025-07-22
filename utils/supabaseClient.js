import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qsvfjpbsmvjcrzcyusca.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdmZqcGJzbXZqY3J6Y3l1c2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MjA4NjIsImV4cCI6MjA2NzM5Njg2Mn0.bLpVACQ0xY3dMCVZTEGYjui7bOQtAR51-VpwsbQX5QM';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
