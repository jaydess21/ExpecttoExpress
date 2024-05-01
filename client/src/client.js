//supabase client to connect it to react to supabase
import { createClient } from "@supabase/supabase-js";

const URL = "https://qgscsdcwesvbsrmfjlft.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnc2NzZGN3ZXN2YnNybWZqbGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwMjMzOTMsImV4cCI6MjAyOTU5OTM5M30._s760OBzlQUD_P72wcPjsYLqg-1KbKzvxoDIqp56xNY";

export const supabase = createClient(URL, API_KEY);
