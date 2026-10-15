import { createClient } from '@supabase/supabase-js';

// Safe environment variable resolution supporting Vite (import.meta.env) and Node/Next
const getEnvVar = (key: string): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) {
    return (import.meta as any).env[key];
  }
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key] as string;
  }
  return '';
};

export const supabaseUrl =
  getEnvVar('VITE_SUPABASE_URL') || 'https://placeholder-project.supabase.co';

export const supabasePublishableKey =
  getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') || 'placeholder-anon-key';

export const isSupabaseConfigured =
  Boolean(getEnvVar('VITE_SUPABASE_URL')) &&
  !getEnvVar('VITE_SUPABASE_URL').includes('placeholder-project');

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
