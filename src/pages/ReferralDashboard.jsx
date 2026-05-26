import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiCopy, FiLoader } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const TARGET_FRIENDS = 5;
const PREMIUM_DAYS = 7;

const formatShortDate = (dateValue) => {
  if (!dateValue) return "—";
  try {
    return new Date(dateValue).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
};

const ReferralDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [referralCode, setReferralCode] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);
      try {
        // 1) Get referral code from profiles
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("referral_code")
          .eq("id", user.id)
          .single();
        if (profileError) throw profileError;

        setReferralCode(profile?.referral_code ?? null);

        // 2) Get referrals with referred user's name
        const { data: referralsData, error: referralsError } = await supabase
          .from("referrals")
          .select(`
            id,
            is_validated,
            created_at,
            referred:referred_id (
              full_name,
              user_name
            )
          `)
          .eq("referrer_id", user.id)
          .order("created_at", { ascending: false });

        if (referralsError) throw referralsError;
        setReferrals(Array.isArray(referralsData) ? referralsData : []);
      } catch (err) {
        setError(err?.message || "Failed to load referral data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  const stats = useMemo(() => {
    const validated = referrals.filter((r) => r.is_validated).length;
    const total = referrals.length;
    const stillNeeded = Math.max(0, TARGET_FRIENDS - validated);
    const progress = TARGET_FRIENDS
      ? Math.min(validated / TARGET_FRIENDS, 1)
      : 0;

    return { validated, total, stillNeeded, progress };
  }, [referrals]);

  const copyToClipboard = async (value, key) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  };

  const referralSignupLink = useMemo(() => {
    if (!referralCode) return "";
    // Use same origin so dev/staging/prod both work.
    return `${window.location.origin}/signup?ref=${encodeURIComponent(
      referralCode,
    )}`;
  }, [referralCode]);

  const shareViaWhatsApp = () => {
    if (!referralCode) return;
    const message = `Join QuizBolt using my referral code: ${referralCode}\n${referralSignupLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const ring = useMemo(() => {
    const radius = 96;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - stats.progress);

    return { radius, circumference, dashOffset };
  }, [stats.progress]);

  if (authLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
          <FiLoader className="animate-spin text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
          <FiLoader className="animate-spin text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold">Loading referral dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-11 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} />
          </button>

          <div className="text-center">
            <h1 className="text-lg font-black tracking-tight">
              Referral Dashboard
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Earn premium by inviting friends
            </p>
          </div>

          <div className="size-11" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-28 pt-6 lg:px-8">
        <div className="text-white">
          <div>
            {error && (
              <div className="mb-5 rounded-2xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-200 text-sm font-semibold">
                {error}
              </div>
            )}

            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56">
                <svg width="100%" height="100%" viewBox="0 0 224 224">
                  <circle
                    cx="112"
                    cy="112"
                    r={ring.radius}
                    stroke="#334155"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="112"
                    cy="112"
                    r={ring.radius}
                    stroke="#14b8a6"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={ring.circumference}
                    strokeDashoffset={ring.dashOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 112 112)"
                    style={{ transition: "stroke-dashoffset 500ms ease" }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                  <div className="text-5xl sm:text-6xl font-black">
                    {stats.validated}
                  </div>
                  <div className="text-sm sm:text-base opacity-70 font-bold mt-2">
                    of {TARGET_FRIENDS}
                  </div>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-300">
                {stats.stillNeeded > 0 ? (
                  <>
                    {stats.stillNeeded} more friends needed for {PREMIUM_DAYS}{" "}
                    days premium
                  </>
                ) : (
                  <>Referral goal completed. Premium unlocked soon.</>
                )}
              </p>

              <div className="grid w-full grid-cols-3 gap-3 mt-2">
                <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">
                    Total invites
                  </p>
                  <p className="text-xl font-black mt-2">{stats.total}</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">
                    Validated invites
                  </p>
                  <p className="text-xl font-black mt-2 text-emerald-300">
                    {stats.validated}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">
                    Still needed
                  </p>
                  <p className="text-xl font-black mt-2 text-amber-300">
                    {stats.stillNeeded}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-5">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300 mb-3">
                  Your referral link
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={referralSignupLink}
                    className="flex-1 rounded-2xl bg-slate-800/60 border border-slate-700 px-4 py-3 text-sm text-slate-100 outline-none"
                    placeholder="Referral code needed"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(referralSignupLink, "link")}
                    className="size-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/15 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!referralSignupLink}
                    aria-label="Copy referral link"
                    title="Copy link"
                  >
                    {copiedKey === "link" ? (
                      <FiCheckCircle className="text-emerald-300" />
                    ) : (
                      <FiCopy />
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300 mb-3">
                  Or share your code
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={referralCode || ""}
                    className="flex-1 rounded-2xl bg-slate-800/60 border border-slate-700 px-4 py-3 text-sm text-slate-100 outline-none"
                    placeholder="No referral code yet"
                  />
                  <button
                    type="button"
                    onClick={shareViaWhatsApp}
                    className="size-11 rounded-2xl bg-green-500/15 border border-green-400/25 flex items-center justify-center hover:bg-green-500/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!referralCode}
                    aria-label="Share via WhatsApp"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp className="text-emerald-200" />
                  </button>
                </div>

                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(referralCode || "", "code")}
                    className="flex-1 rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm font-black hover:bg-white/15 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!referralCode}
                  >
                    {copiedKey === "code" ? "Copied" : "Copy code"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                  Your referrals
                </p>
                <p className="text-xs font-bold text-slate-400">
                  {stats.total} total
                </p>
              </div>

              <div className="mt-3 divide-y divide-white/10">
                {referrals.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-sm font-semibold">
                    No referrals yet. Share your code to get started.
                  </div>
                ) : (
                  referrals.map((r) => {
                    const referredName =
                      r.referred?.full_name ||
                      r.referred?.user_name ||
                      "Scholar";
                    const initial =
                      referredName?.trim()?.[0]?.toUpperCase() || "S";

                    return (
                      <div
                        key={r.id}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-9 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-200 flex items-center justify-center font-black text-sm shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <div className="font-black truncate">
                              {referredName}
                            </div>
                            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.08em] mt-1">
                              {r.is_validated ? "Verified" : "Pending"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-xs font-bold text-slate-400 shrink-0">
                            {formatShortDate(r.created_at)}
                          </div>
                          <div
                            className={`rounded-full px-3 py-1 text-[11px] font-black border ${
                              r.is_validated
                                ? "bg-emerald-400/15 text-emerald-200 border-emerald-400/25"
                                : "bg-white/5 text-slate-200 border-white/15"
                            }`}
                          >
                            {r.is_validated ? "Qualified" : "Pending"}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <p className="mt-4 text-xs text-slate-400 font-semibold">
  Low-quality or inactive referrals will not be counted.
</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralDashboard;