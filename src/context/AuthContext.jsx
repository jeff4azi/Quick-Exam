import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileValid, setProfileValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasAvatar, setHasAvatar] = useState(false);

  // Professional: centralize common auth helpers here so
  // screens like ResetPassword don't talk to Supabase directly.
  const resetPassword = async (email) => {
    if (!email) {
      throw new Error("Please provide a valid email address.");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      throw new Error(error.message || "Failed to send reset link. Please try again.");
    }
  };

  useEffect(() => {
    // 1. Restore session on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const { data } = await supabase
            .from("profiles")
            .select("onboarding_complete, avatar_url")
            .eq("id", currentUser.id)
            .single();

          setProfileValid(!!data?.onboarding_complete);
          setHasAvatar(!!data?.avatar_url);
        } else {
          setProfileValid(false);
          setHasAvatar(false);
        }

        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        profileValid,
        hasAvatar,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
