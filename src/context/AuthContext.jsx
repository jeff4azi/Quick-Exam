import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileValid, setProfileValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasAvatar, setHasAvatar] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  // Track whether we already did the initial load so visibility handler
  // doesn't fire a redundant profile check on the very first paint.
  const initialLoadDone = useRef(false);

  const resetPassword = async (email) => {
    if (!email) {
      throw new Error("Please provide a valid email address.");
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) {
      throw new Error(
        error.message || "Failed to send reset link. Please try again.",
      );
    }
  };

  const syncProfileFromSession = async (session) => {
    const currentUser = session?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      // Fast path: browser already knows it's offline
      if (!navigator.onLine) {
        console.warn("[Auth] Browser is offline — skipping profile fetch");
        setConnectionError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("onboarding_complete, avatar_url")
          .eq("id", currentUser.id)
          .single();

        // Network/connection errors have specific error codes
        if (
          error &&
          (error.code === "PGRST301" ||
            error.message?.includes("Failed to fetch") ||
            error.message?.includes("network"))
        ) {
          console.warn("[Auth] Network error fetching profile:", error.message);
          setConnectionError(true);
          setLoading(false);
          return;
        }

        // Other errors or no data means profile doesn't exist or is incomplete
        if (error || !data) {
          setProfileValid(false);
          setHasAvatar(false);
        } else {
          setProfileValid(!!data?.onboarding_complete);
          setHasAvatar(!!data?.avatar_url);
          setConnectionError(false);
        }
      } catch (err) {
        // Catch-all for network failures that throw (e.g., fetch rejection)
        console.warn("[Auth] Failed to fetch profile (network issue):", err);
        setConnectionError(true);
        setLoading(false);
        return;
      }
    } else {
      setProfileValid(false);
      setHasAvatar(false);
      setConnectionError(false);
    }

    setLoading(false);
  };

  const refreshProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_complete, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (
        error &&
        (error.code === "PGRST301" ||
          error.message?.includes("Failed to fetch") ||
          error.message?.includes("network"))
      ) {
        console.warn("[Auth] Network error refreshing profile:", error.message);
        setConnectionError(true);
        return;
      }

      if (!error && data) {
        setProfileValid(!!data?.onboarding_complete);
        setHasAvatar(!!data?.avatar_url);
        setConnectionError(false);
      }
    } catch (err) {
      console.warn("[Auth] Failed to refresh profile (network issue):", err);
      setConnectionError(true);
    }
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
      },
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
          console.warn(
            "[Auth] Session could not be refreshed on focus:",
            error.message,
          );
          await supabase.auth.signOut();
        } else if (data?.session) {
          // onAuthStateChange will fire and keep everything in sync
        }
      } catch (err) {
        console.error("[Auth] Visibility refresh failed:", err);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Auto-retry profile fetch when the browser comes back online
    const handleOnline = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        syncProfileFromSession(session);
      }
    };
    window.addEventListener("online", handleOnline);

    return () => {
      listener.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        profileValid,
        hasAvatar,
        connectionError,
        resetPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
