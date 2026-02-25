import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      await resetPassword(email);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6 scale-110">
            <Logo className={"h-36 w-36"} />
          </div>
          <h1 className="text-4xl font-black text-center tracking-tight text-slate-900 dark:text-white mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
            We'll send you a link to reset your password
          </p>
        </div>

        {error && (
          <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}
        {status === "success" && (
          <div className="w-full mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl text-green-600 dark:text-green-400 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
            Check your inbox for the reset link.
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiMail className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 dark:bg-blue-700 py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group mt-2 ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-700 hover:-translate-y-1 active:scale-95 active:translate-y-0"
            }`}
          >
            <span>{loading ? "Sending..." : "Send reset link"}</span>
          </button>
        </form>

        <p className="mt-10 text-slate-500 dark:text-slate-400 font-medium text-sm">
          Remembered your password?{' '}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Sign In
          </button>
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
