import { Navigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

/**
 * GuestRoute - Only allows unauthenticated users to access certain pages
 * Redirects authenticated users to the home page
 * Used for pages like Login, SignUp, Reset Password, etc.
 */
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
        {/* Animated Loading Visual */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Ring */}
          <div className="absolute size-24 bg-blue-500/20 dark:bg-blue-400/10 rounded-[2rem] animate-ping" />

          {/* The Core Icon */}
          <div className="relative size-20 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-slate-700 flex items-center justify-center">
            <FiLoader className="size-8 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
        </div>

        {/* Textual Feedback */}
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Loading
          </h2>
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
            <FiLoader className="animate-spin" />
            Please Wait
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

  // If user is authenticated, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, show the guest page (login, signup, etc.)
  return children;
};

export default GuestRoute;
