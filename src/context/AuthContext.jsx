import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileValid, setProfileValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasAvatar, setHasAvatar] = useState(false);
  // Track whether we already did the initial load so visibility handler
  // doesn't fire a redundant profile check on the very first paint.
  const initialLoadDone = useRef(false);

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

  const syncProfileFromSession = async (session) => {
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
  };

  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data } = await supabase
      .from("profiles")
      .select("onboarding_complete, avatar_url")
      .eq("id", session.user.id)
      .single();

    setProfileValid(!!data?.onboarding_complete);
    setHasAvatar(!!data?.avatar_url);
  };

  useEffect(() => {
    // 1. Restore session on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      syncProfileFromSession(session).finally(() => {
        initialLoadDone.current = true;
      });
    });

    // 2. Listen for all auth state changes (including TOKEN_REFRESHED)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        syncProfileFromSession(session);
      }
    );

    // 3. When tab regains visibility, force a session refresh so Supabase
    //    re-validates the token that may have expired while the tab was hidden.
    const handleVisibilityChange = async () => {
      if (document.visibilityState !== "visible" || !initialLoadDone.current) {
        return;
      }
      try {
        // refreshSession() forces a new JWT from Supabase and fires
        // onAuthStateChange with TOKEN_REFRESHED, which updates the user state.
        const { data, error } = await supabase.auth.refreshSession();
        if (error) {
          // Session truly expired — log the user out gracefully
          console.warn("[Auth] Session could not be refreshed on focus:", error.message);
          await supabase.auth.signOut();
        } else if (data?.session) {
          // onAuthStateChange will fire and keep everything in sync
        }
      } catch (err) {
        console.error("[Auth] Visibility refresh failed:", err);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      listener.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
