import { Navigate, useLocation } from "react-router-dom";
import { FiLock, FiLoader, FiWifiOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, stateCheck = true }) => {
  const { user, loading, profileValid, hasAvatar, connectionError } = useAuth();
  const location = useLocation();

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
          <p className="text-xs font-black uppercase tracking-widest dark:text-white">
            Quiz Bolt ⚡
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If there's a connection error, show retry screen instead of redirecting to onboarding
  if (connectionError) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 px-6">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute size-24 bg-red-500/20 dark:bg-red-400/10 rounded-[2rem] animate-pulse" />
          <div className="relative size-20 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-700 flex items-center justify-center">
            <FiWifiOff className="size-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <div className="text-center space-y-3 max-w-sm">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Connection Lost
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
            Unable to reach the server. Check your internet connection and try
            again.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95"
        >
          Retry Connection
        </button>
        <div className="absolute bottom-10 opacity-30">
          <p className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
            Quiz Bolt ⚡
          </p>
        </div>
      </div>
    );
  }

  if (stateCheck && !profileValid) {
    return <Navigate to="/onboarding" replace />;
  }

  // Force avatar upload before accessing main app, except on upload screen itself
  if (
    user &&
    profileValid &&
    !hasAvatar &&
    location.pathname !== "/upload-profile-pic"
  ) {
    const skip =
      typeof window !== "undefined" &&
      localStorage.getItem("skipAvatar") === "true";
    if (!skip) {
      return <Navigate to="/upload-profile-pic" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
