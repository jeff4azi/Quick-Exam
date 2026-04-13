import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useUniversities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("universities")
      .select("id, name")
      .order("name", { ascending: false })
      .then(({ data }) => {
        if (data) setUniversities(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { universities, loading };
}
