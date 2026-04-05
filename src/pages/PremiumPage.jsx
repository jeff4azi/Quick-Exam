import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import { FaCrown } from "react-icons/fa"; // Added FaCrown
import Logo from "../images/Logo";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";
import { API_BASE_URL } from "../apiConfig";

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
      // 🔥 STEP 1: Always get fresh session
      let {
        data: { session },
        error: sessionError,
      } = await withTimeout(
        supabase.auth.getSession(),
        15000,
        "Session check took too long. Please try again.",
      );

      if (sessionError) throw sessionError;

      // 🔥 STEP 2: If session missing/expired → refresh
      if (!session) {
        console.warn("Session missing. Attempting refresh...");
        const { data: refreshData, error: refreshError } =
          await supabase.auth.refreshSession();
        if (refreshError) throw refreshError;
        session = refreshData.session;
      }

      const user = session?.user;
      if (!user) throw new Error("Please log in again.");
      const token = session.access_token;

      // 🔥 STEP 3: Call backend
      const response = await fetch(
        `${API_BASE_URL}/api/premium/redeem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            code: premiumCode.trim(),
          }),
        },
      );

      const result = await response.json();

      // 🔥 STEP 4: Handle backend result
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
      "Hello, I just paid ₦2000 for QuizBolt Premium.\n\nName/Email:\n\nHere is my receipt:",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setStatus({ type: "success", message: "Account number copied!" });
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
            Get full access to all courses and practice questions for this
            semester.
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
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 text-center mb-3">
              <p className="text-sm font-black text-slate-800 dark:text-white mb-2">
                Full Semester Access — ₦2,000
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Pay to the account below and send your receipt
              </p>

              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 space-y-1">
                <p>Bank: Palmpay</p>
                <div className="flex items-center justify-center gap-2">
                  <p>Account No: 8911504030</p>
                  <button
                    type="button"
                    onClick={() => handleCopy("8911504030")}
                    className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md font-bold active:scale-95"
                  >
                    Copy
                  </button>
                </div>
                <p>Name: Jeffrey Austin</p>
              </div>

              <p className="text-[10px] text-slate-400 mt-3">
                Payments are confirmed within a few minutes
              </p>
            </div>
            <button
              type="button"
              onClick={handleGetCode}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-sm hover:underline active:scale-95 transition-all"
            >
              I’ve Made Payment — Send Receipt
            </button>
          </div>
        </form>

        <div className="mt-12 pt-10 border-t border-gray-100 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest text-center mb-2">
            What You Get
          </p>
          <p className="text-center text-xs text-slate-400 mb-6">
            Trusted by students preparing for exams this semester
          </p>
          <div className="space-y-4 px-2 pb-8">
            {[
              "Unlimited Questions in Every Exam",
              "Full Flashcard Decks + Shuffle",
              "Theory Exam Mode",
              "No Ads",
              "Bookmark Questions",
              "Retake Exams",
              "Review Answers & See Failures",
              "More Question Count Options (30, 50+)",
              "Auto-Advance Questions",
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
