import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { supabase } from "../supabaseClient";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 🔑 Supabase login
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const user = data.user;
      if (!user) throw new Error("Login failed. Please try again.");

      navigate("/");

    } catch (err) {
      setError(err.message);
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
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
            TASUED PDFs questions made simple
          </p>
        </div>

        {error && (
          <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-5">
          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiMail className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiLock className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end px-1">
            <button
              type="button"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 dark:bg-blue-700 py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group mt-2 ${
              loading 
                ? "opacity-70 cursor-not-allowed" 
                : "hover:bg-blue-700 hover:-translate-y-1 active:scale-95 active:translate-y-0"
            }`}
          >
            <span>{loading ? "Signing In..." : "Sign In"}</span>
            {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-10 text-slate-500 dark:text-slate-400 font-medium text-sm">
          New to Quiz Bolt?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;