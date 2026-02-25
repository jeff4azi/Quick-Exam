import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiShield, FiZap, FiStar } from "react-icons/fi"; // Added FiZap, FiStar
import { FaCrown } from "react-icons/fa"; // Added FaCrown
import Logo from "../images/Logo";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";

const PremiumPage = ({ onActivatePremium, isPremium }) => {
  const navigate = useNavigate();
  const [premiumCode, setPremiumCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function redeemPremiumCode(userId, code) {
    const { data: codeEntry, error } = await supabase
      .from("premium_codes")
      .select("*")
      .eq("code", code)
      .eq("used", false)
      .single();

    if (error || !codeEntry) {
      return { success: false, message: "Invalid or already used code." };
    }

    const { error: updateError } = await supabase
      .from("premium_codes")
      .update({ used: true })
      .eq("id", codeEntry.id);

    if (updateError) return { success: false, message: "Failed to redeem code." };

    const { error: userUpdateError } = await supabase
      .from("profiles")
      .update({ is_premium: true })
      .eq("id", userId);

    if (userUpdateError) return { success: false, message: "Failed to activate premium." };

    return { success: true, message: "Premium activated!" };
  }

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!premiumCode) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const { data: { user }, error: userError } = await withTimeout(
        supabase.auth.getUser(),
        15000,
        "Session check took too long. Please try again."
      );
      if (userError || !user) throw new Error("Please log in again.");

      const result = await withTimeout(
        redeemPremiumCode(user.id, premiumCode.trim()),
        15000,
        "Verifying the premium code took too long. Please try again."
      );

      if (result.success) {
        setStatus({ type: "success", message: result.message });
        onActivatePremium?.();
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  // --- PREMIUM ACTIVE UI ---
  if (isPremium) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6 flex flex-col items-center justify-center text-center">
        <button
          onClick={() => navigate(-1)}
          className="p-3 absolute top-6 left-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 active:scale-95 transition-all"
        >
          <FiArrowLeft size={20} />
        </button>

        <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-slate-700 shadow-xl relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute -top-10 -right-10 size-32 bg-amber-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="size-20 bg-amber-400 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-none mb-6 rotate-3">
              <FaCrown className="text-white text-4xl" />
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Premium Active
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
              You've unlocked full access to all features and removed all ads.
            </p>

            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl">
                <FiZap className="text-amber-500" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">No Advertisements</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl">
                <FiStar className="text-blue-500" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Priority Features</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-10 w-full bg-slate-900 dark:bg-white dark:text-slate-900 py-4 rounded-2xl font-black text-white transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- REDEMPTION UI (Default) ---
  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6 flex flex-col">
      <div className="mx-auto mb-10 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="p-3 absolute top-6 left-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 active:scale-95 transition-all"
        >
          <FiArrowLeft size={20} />
        </button>
        <Logo className="size-10 opacity-20" />
      </div>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Unlock Premium Access
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm px-4">
            Premium access is activated using a valid premium code.
          </p>
        </div>

        <form onSubmit={handleActivate} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiShield className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Enter premium code"
              value={premiumCode}
              onChange={(e) => setPremiumCode(e.target.value.toUpperCase())}
              className="w-full pl-12 pr-4 py-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-800 dark:text-white font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all text-center tracking-widest uppercase"
              required
              disabled={loading}
            />
          </div>

          {status.message && (
            <p className={`text-center text-xs font-bold ${status.type === 'error' ? 'text-red-500' : 'text-green-500'} animate-in fade-in zoom-in`}>
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 dark:bg-blue-700 py-5 rounded-2xl font-black text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 mt-2 ${loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-blue-800 hover:-translate-y-1 active:scale-95 active:translate-y-0"
              }`}
          >
            {loading ? "Verifying..." : "Activate Premium"}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-gray-100 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest text-center mb-6">
            Don’t have a code? Follow these steps:
          </p>
          <div className="space-y-4 px-2">
            {["Obtain a valid premium code", "Enter the code above", "Premium access unlocks instantly"].map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="size-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto py-8 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
            <FiCheckCircle size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Premium detected automatically
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;