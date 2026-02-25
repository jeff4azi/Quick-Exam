import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiArrowLeft, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { supabase } from "../supabaseClient";

const ConfirmEmailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState(null); // 'success' | 'error'
  const [cooldown, setCooldown] = useState(60); // seconds before user can resend

  const emailFromState = location.state?.email || null;
  const email = emailFromState || "your email";
  const hasEmail = !!emailFromState;
  const canResend = hasEmail && cooldown === 0;

  useEffect(() => {
    if (!hasEmail) return;

    if (cooldown <= 0) return;

    const timerId = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [cooldown, hasEmail]);

  const handleResendEmail = async () => {
    setLoading(true);
    setResendStatus(null);
    
    try {
      if (!hasEmail) {
        setResendStatus("error");
        return;
      }

      if (cooldown > 0) {
        return;
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: emailFromState,
      });

      if (error) throw error;
      setResendStatus('success');
      setCooldown(60);
    } catch (err) {
      console.error("Resend error:", err.message);
      setResendStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700">
        
        {/* Icon/Logo Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6 bg-blue-100 dark:bg-blue-600/20 p-6 rounded-full animate-bounce">
            <FiMail className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-black text-center tracking-tight text-slate-900 dark:text-white mb-2">
            Check Email
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
            Verification link sent to
          </p>
          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm mt-1">
            {email}
          </span>
        </div>

        {/* Info Card */}
        <div className="w-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 rounded-3xl shadow-sm mb-8 text-center">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            We’ve sent a magic link to your inbox. Please click the link to confirm your account and start quizzing!
          </p>
        </div>

        {/* Feedback Messages */}
        {resendStatus === 'success' && (
          <div className="w-full mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl text-green-600 dark:text-green-400 text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <FiCheckCircle /> New link sent successfully!
          </div>
        )}

        {resendStatus === 'error' && !canResend && (
          <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
            We couldn&apos;t detect your email. Please sign in again to request a new link.
          </div>
        )}

        <div className="w-full space-y-4">
          <button
            onClick={() => window.open("mailto:")} // Helpful shortcut to open mail apps
            className="w-full bg-blue-600 dark:bg-blue-700 py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 active:translate-y-0"
          >
            Open Mail App
          </button>

          <button
            onClick={handleResendEmail}
            disabled={loading || !canResend}
            className="w-full py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-300 text-sm transition-all flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
          >
            <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
            {!hasEmail
              ? "Email not available"
              : loading
                ? "Sending..."
                : cooldown > 0
                  ? `Resend available in ${String(Math.floor(cooldown / 60)).padStart(2, "0")}:${String(cooldown % 60).padStart(2, "0")}`
                  : "Resend Verification Link"}
          </button>
        </div>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/login")}
          className="mt-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FiArrowLeft />
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmailScreen;