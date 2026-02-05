import { useEffect, useState, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FiLock, FiLoader } from "react-icons/fi";

// Static cache to prevent flickers between route changes
let authCache = {
  user: null,
  isAuthenticated: null,
  profileValid: null,
};

const ProtectedRoute = ({ children, stateCheck = true }) => {
  const [loading, setLoading] = useState(authCache.isAuthenticated === null);
  const [isAuthenticated, setIsAuthenticated] = useState(authCache.isAuthenticated || false);
  const [userStateValid, setUserStateValid] = useState(authCache.profileValid || false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      // 1. Check if we already have the answer in cache to skip the network hit
      if (authCache.isAuthenticated !== null) {
        if (!stateCheck || authCache.profileValid !== null) {
          if (isMounted) setLoading(false);
          return;
        }
      }

      // 2. Fetch User from Supabase
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        authCache = { user: null, isAuthenticated: false, profileValid: false };
        if (isMounted) {
          setIsAuthenticated(false);
          setLoading(false);
        }
        return;
      }

      // 3. Optional State Check (Onboarding)
      let isValid = true;
      if (stateCheck) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("onboarding_complete")
          .eq("id", user.id)
          .single();
        
        isValid = !profileError && !!profile?.onboarding_complete;
      }

      // 4. Update Static Cache for next route change
      authCache = { user, isAuthenticated: true, profileValid: isValid };

      if (isMounted) {
        setIsAuthenticated(true);
        setUserStateValid(isValid);
        setLoading(false);
      }
    };

    checkAuth();
    return () => { isMounted = false; };
  }, [stateCheck]);

  // Prevent children from re-rendering while loading is true
  const content = useMemo(() => children, [children]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
        {/* Animated Loading Visual */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <div className="absolute size-24 bg-blue-500/20 dark:bg-blue-400/10 rounded-[2rem] animate-ping" />
          
          {/* The Core Icon */}
          <div className="relative size-20 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-700 flex items-center justify-center">
            <FiLock className="size-8 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
        </div>

        {/* Textual Feedback */}
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Securing Connection
          </h2>
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
            <FiLoader className="animate-spin" />
            Verifying Identity
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-10 opacity-30">
          <p className="text-xs font-black uppercase tracking-widest dark:text-white">Quiz Bolt ⚡</p>
        </div>
      </div>
    );
  }

  // Final Redirect Logic
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (stateCheck && !userStateValid) {
    return <Navigate to="/onboarding" replace />;
  }

  return content;
};

export default ProtectedRoute;