import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUser } from "react-icons/fi";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add your signup logic here (e.g., Firebase, Supabase, or API)
    console.log("Creating account for:", formData);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">

      {/* Main Card Container */}
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700">

        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-6 scale-110">
            <Logo className={"h-36 w-36"} />
          </div>
          <h1 className="text-4xl font-black text-center tracking-tight text-slate-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
            Join the Quiz Bolt community
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSignUp} className="w-full space-y-4">

          {/* Full Name Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              required
            />
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiLock className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
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

          <p className="text-[11px] text-slate-500 dark:text-slate-400 px-2 leading-relaxed">
            By signing up, you agree to our <span className="text-blue-600 font-bold">Terms</span> and <span className="text-blue-600 font-bold">Privacy Policy</span>.
          </p>

          {/* Primary Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-700 py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 active:translate-y-0 flex items-center justify-center gap-2 group mt-4"
          >
            <span>Create Account</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Login Footer */}
        <p className="mt-8 text-slate-500 dark:text-slate-400 font-medium text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
};

export default SignUpScreen;