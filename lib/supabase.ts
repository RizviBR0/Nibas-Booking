import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = "https://xzcrjpjrqfpjznljdtbu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y3JqcGpycWZwanpubGpkdGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMzI3NzIsImV4cCI6MjA4MTkwODc3Mn0.ZRcLiJwLWpQ66Nk9hJzT825Uvfr6TzcX4KQlJPXYsHE";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
