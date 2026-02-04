import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo"; 
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";

const AuthGate = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // 1. Trigger Google Auth Provider here (Firebase/Supabase/NextAuth)
      console.log("Triggering Google Auth popup...");
      
      // 2. On success:
      navigate("/onboarding");
    } catch (error) {
      console.error("Google Auth Failed", error);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">
      
      {/* Main Container */}
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center text-center space-y-4">
          <div className="scale-90 mb-2">
            <Logo />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-[80%]">
            Sign in to continue your progress and maintain your streak.
          </p>
        </div>

        {/* The Action Area */}
        <div className="w-full space-y-6">
          
          {/* Hero Google Button - Styled to be the primary focus */}
          <button
            onClick={handleGoogleLogin}
            className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-100 dark:hover:border-blue-900/30 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]"
          >
            {/* Icon */}
            <FcGoogle className="text-2xl shrink-0" />
            
            {/* Text */}
            <span className="text-lg font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Continue with Google
            </span>

            {/* Subtle Arrow that appears on hover */}
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-600 dark:text-blue-400">
              <FiArrowRight className="text-xl" />
            </div>
          </button>

          {/* Terms Footer (Optional but good for UX) */}
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium px-6">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthGate;