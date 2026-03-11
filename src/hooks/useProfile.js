import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await withTimeout(
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single(),
        15000,
        "Loading profile took too long."
      );

      if (profileError) throw profileError;
      setProfile(data);
    } catch (err) {
      setError(err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return { profile, loading, error, reloadProfile: loadProfile };
};

