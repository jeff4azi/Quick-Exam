import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiZap, FiArrowLeft, FiCheckCircle, FiShield } from "react-icons/fi";
import Logo from "../images/Logo";
import { supabase } from "../supabaseClient"; // Ensure this path is correct

const PremiumPage = ({ onActivatePremium }) => {
  const navigate = useNavigate();
  const [premiumCode, setPremiumCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Your backend logic wired in
  async function redeemPremiumCode(userId, code) {
    // 1. Check if the code exists and is unused
    const { data: codeEntry, error } = await supabase
      .from("premium_codes")
      .select("*")
      .eq("code", code)
      .eq("used", false)
      .single();

    if (error || !codeEntry) {
      return { success: false, message: "Invalid or already used code." };
    }

    // 2. Update code to used
    const { error: updateError } = await supabase
      .from("premium_codes")
      .update({ used: true })
      .eq("id", codeEntry.id);

    if (updateError) return { success: false, message: "Failed to redeem code." };

    // 3. Grant premium to user
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
      // Get the current logged-in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be logged in to activate premium.");
      }

      // Call the redemption logic
      const result = await redeemPremiumCode(user.id, premiumCode.trim());

      if (result.success) {
        setStatus({ type: "success", message: result.message });
        onActivatePremium?.();
        // Optional: Redirect to home after a short delay
        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6 flex flex-col">

      {/* Header Navigation */}
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

        {/* Top Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Unlock Premium Access
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm px-4">
            Premium access is activated using a valid premium code.
          </p>
        </div>

        {/* Middle Section: Input and Button */}
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

        {/* Steps Section */}
        <div className="mt-12 pt-10 border-t border-gray-100 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest text-center mb-6">
            Don’t have a code? Follow these steps:
          </p>

          <div className="space-y-4 px-2">
            {["Obtain a valid premium code",
              "Enter the code above",
              "Premium access unlocks instantly"
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="size-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto py-8 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
            <FiCheckCircle size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {status.type === 'success' ? "Premium Active" : "Premium detected automatically"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;