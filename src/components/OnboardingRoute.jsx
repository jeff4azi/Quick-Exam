import { Navigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const OnboardingRoute = ({ children }) => {
  const { user, loading, profileValid } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
          <FiLoader className="animate-spin text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold">Checking your profile...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profileValid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OnboardingRoute;
