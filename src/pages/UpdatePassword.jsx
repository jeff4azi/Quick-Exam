import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { supabase } from "../supabaseClient";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Supabase with detectSessionInUrl:true automatically exchanges the token
  // from the email link hash. We just wait for the PASSWORD_RECOVERY event.
  useEffect(() => {
    // Check if there's already an active recovery session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        setSessionReady(true);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const validate = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return false;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;

      setSuccess(true);
      // Sign out so the user logs in fresh with the new password
      await supabase.auth.signOut();
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      if (err.message?.toLowerCase().includes("expired") || err.message?.toLowerCase().includes("invalid")) {
        setError("This reset link has expired or is invalid. Please request a new one.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const strengthLevel = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const level = strengthLevel();

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6 scale-110">
            <Logo className={"h-36 w-36"} />
          </div>
          <h1 className="text-4xl font-black text-center tracking-tight text-slate-900 dark:text-white mb-2">
            New Password
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
            Choose a strong password to secure your account
          </p>
        </div>

        {success ? (
          <div className="w-full flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <FiCheckCircle className="text-3xl text-green-500" />
            </div>
            <div className="w-full p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl text-green-600 dark:text-green-400 text-sm font-semibold text-center">
              Password updated successfully. Redirecting you to login...
            </div>
          </div>
        ) : (
          <>
            {!sessionReady && (
              <div className="w-full mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-2xl text-yellow-700 dark:text-yellow-400 text-sm font-semibold">
                Verifying your reset link... If this persists, please request a new one.
              </div>
            )}

            {error && (
              <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              {/* New Password */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLock className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                {/* Strength indicator */}
                {password.length > 0 && (
                  <div className="space-y-1 px-1 animate-in fade-in duration-300">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < level ? strengthColors[level - 1] : "bg-gray-200 dark:bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-semibold ${strengthColors[level - 1]?.replace("bg-", "text-") || "text-gray-400"}`}>
                      {level > 0 ? strengthLabels[level - 1] : ""}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showConfirm ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                </button>
              </div>

              {/* Match indicator */}
              {confirm.length > 0 && (
                <p className={`text-xs font-semibold px-1 animate-in fade-in duration-300 ${
                  password === confirm ? "text-green-500" : "text-red-400"
                }`}>
                  {password === confirm ? "Passwords match" : "Passwords do not match"}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !sessionReady}
                className={`w-full bg-blue-600 dark:bg-blue-700 py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 mt-2 ${
                  loading || !sessionReady
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700 hover:-translate-y-1 active:scale-95 active:translate-y-0"
                }`}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>

            <button
              onClick={() => navigate("/login")}
              className="mt-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiArrowLeft />
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
