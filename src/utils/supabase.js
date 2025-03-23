import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Singleton instance
let instance = null;
let currentToken = null;

const supabaseClient = async (supabaseAccessToken) => {
  if (!instance || currentToken !== supabaseAccessToken) {
    instance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`
        }
      }
    });
    currentToken = supabaseAccessToken;
  } else {
    // Update authorization header
    instance.rest.headers.Authorization = `Bearer ${supabaseAccessToken}`;
  }

  return instance;
};
export { supabaseUrl };
export default supabaseClient;