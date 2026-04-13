import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useColleges(universityId) {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    if (!universityId) {
      setColleges([]);
      return;
    }
    supabase
      .from("colleges")
      .select("id, name")
      .eq("university_id", universityId.toLowerCase())
      .order("id")
      .then(({ data }) => {
        if (data) setColleges(data);
      });
  }, [universityId]);

  return colleges;
}
