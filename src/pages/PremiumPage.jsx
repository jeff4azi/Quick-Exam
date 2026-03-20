import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import { FaCrown } from "react-icons/fa"; // Added FaCrown
import Logo from "../images/Logo";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";

const PremiumPage = ({ onActivatePremium, isPremium }) => {
  const navigate = useNavigate();
  const [premiumCode, setPremiumCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!premiumCode) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // 1️⃣ Get logged-in user
      const {
        data: { user },
      } = await withTimeout(
        supabase.auth.getUser(),
        15000,
        "Session check took too long. Please try again.",
      );

      if (!user) throw new Error("Please log in again.");

      // 2️⃣ Call your backend endpoint
      const response = await fetch(
        "https://quizbolt-ashy.vercel.app/api/premium/redeem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            code: premiumCode.trim(),
          }),
        },
      );

      const result = await response.json();

      // 3️⃣ Update UI based on result
      if (result.success) {
        setStatus({ type: "success", message: result.message });
        onActivatePremium?.();
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Unexpected error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetCode = () => {
    const phoneNumber = "2347015585397"; // Your WhatsApp number here
    const message = encodeURIComponent(
      "Hello! I'd like to purchase a Premium Code for the app.",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
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
      <div className="mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="p-3 absolute top-6 left-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 active:scale-95 transition-all"
        >
          <FiArrowLeft size={20} />
        </button>
        <Logo className="w-[175px]" />
      </div>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Go Premium — Unlock Full Access
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm px-4">
            Unlock the full experience and power your progress.
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
            <p
              className={`text-center text-xs font-bold ${status.type === "error" ? "text-red-500" : "text-green-500"} animate-in fade-in zoom-in`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 dark:bg-blue-700 py-5 rounded-2xl font-black text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 mt-2 ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-800 hover:-translate-y-1 active:scale-95 active:translate-y-0"
            }`}
          >
            {loading ? "Verifying..." : "Activate Premium"}
          </button>
          {/* WhatsApp Purchase Link */}
          <div className="pt-4 flex flex-col items-center">
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">
              Don't have a code?
            </p>
            <button
              type="button"
              onClick={handleGetCode}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-sm hover:underline active:scale-95 transition-all"
            >
              Get Premium Code via WhatsApp
            </button>
          </div>
        </form>

        <div className="mt-12 pt-10 border-t border-gray-100 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest text-center mb-6">
            What You Get
          </p>
          <div className="space-y-4 px-2 pb-8">
            {[
              "More Questions to Answer",
              "No Ads",
              "Bookmark Questions",
              "Retake Exams",
              "Review Answers & See Failures",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="size-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
