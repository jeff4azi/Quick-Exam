import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import BannerAd from "../components/BannerAd";
import ConfirmOverlay from "../components/ConfirmOverlay";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";
import Avatar from "../components/Avatar";
import NavBar from "../components/NavBar";

import { FaCrown, FaTrophy, FaFire } from "react-icons/fa";
import { FiStar, FiZap } from "react-icons/fi";
import { loadFavouriteCourseIds } from "../utils/favouriteCourses";

const getCurrentWeekStartIso = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const diff = day;
  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - diff,
    0,
    0,
    0,
    0,
  );
  return weekStart.toISOString();
};

const Home = ({ userProfile, loadingProfile, isPremium, courses }) => {
  const navigate = useNavigate();
  const [showAd, setShowAd] = useState(false);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);
  const [favouriteIds, setFavouriteIds] = useState(() =>
    loadFavouriteCourseIds(),
  );
  const [recentCourses, setRecentCourses] = useState([]);
  const [stats, setStats] = useState({
    bestScore: "--",
    position: "--",
    streak: 0,
  });

  useEffect(() => {
    if (isPremium) {
      setShowAd(false); // force hide if user is premium
      return;
    }

    const timer = setTimeout(() => setShowAd(true), 750);
    return () => clearTimeout(timer);
  }, [isPremium]);

  // Fetch best score and leaderboard position from Supabase
  useEffect(() => {
    const fetchSupabaseStats = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await withTimeout(
          supabase.auth.getUser(),
          15000,
          "Checking your session took too long.",
        );

        if (userError || !user) {
          return;
        }

        const weekStartIso = getCurrentWeekStartIso();

        const { data: attemptsData, error: attemptsError } = await withTimeout(
          supabase
            .from("exam_attempts")
            .select(
              "user_id, score, total_questions, time_taken, date_taken, is_retake",
            )
            .eq("is_retake", false)
            .gte("date_taken", weekStartIso),
          15000,
          "Loading your stats took too long.",
        );

        if (attemptsError || !attemptsData) {
          console.error("Failed to load attempts for stats:", attemptsError);
          return;
        }

        const attempts = attemptsData || [];

        // Best score for this user (weekly)
        const myAttempts = attempts.filter(
          (a) => a.user_id === user.id && a.total_questions,
        );
        let best = null;
        myAttempts.forEach((a) => {
          const pct = (Number(a.score) / Number(a.total_questions || 1)) * 100;
          if (!Number.isFinite(pct)) return;
          if (best === null || pct > best) best = pct;
        });

        // Leaderboard-like aggregation to get position
        const byUser = new Map();
        attempts.forEach((a) => {
          if (!a.user_id || !a.total_questions) return;
          const pct = (Number(a.score) / Number(a.total_questions || 1)) * 100;
          if (!Number.isFinite(pct)) return;
          const existing = byUser.get(a.user_id);
          if (!existing || pct > existing.bestPercent) {
            byUser.set(a.user_id, { bestPercent: pct });
          }
        });

        const sorted = Array.from(byUser.entries()).sort(
          (a, b) => b[1].bestPercent - a[1].bestPercent,
        );
        const idx = sorted.findIndex(([id]) => id === user.id);

        setStats((prev) => ({
          ...prev,
          bestScore: best !== null ? `${Math.round(best)}%` : "--",
          position: idx !== -1 ? `#${idx + 1}` : "--",
        }));
      } catch (err) {
        console.error("Failed to load Supabase stats:", err);
      }
    };

    fetchSupabaseStats();
  }, []);

  // Handle streak entirely via localStorage examHistory
  useEffect(() => {
    try {
      const history =
        JSON.parse(localStorage.getItem("examHistory") || "[]") || [];
      if (!Array.isArray(history) || history.length === 0) {
        setStats((prev) => ({ ...prev, streak: 0 }));
        return;
      }

      const dateSet = new Set(history.map((h) => h?.date).filter(Boolean));

      let streak = 0;
      const today = new Date();

      for (let offset = 0; ; offset++) {
        const d = new Date(today);
        d.setDate(today.getDate() - offset);
        const key = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        if (dateSet.has(key)) {
          streak += 1;
        } else {
          break;
        }
      }

      setStats((prev) => ({ ...prev, streak }));
    } catch (err) {
      console.error("Failed to compute streak from history:", err);
      setStats((prev) => ({ ...prev, streak: 0 }));
    }
  }, []);

  // Recently done courses carousel (last 5 attempts)
  useEffect(() => {
    try {
      const history =
        JSON.parse(localStorage.getItem("examHistory") || "[]") || [];
      const safe = Array.isArray(history) ? history : [];
      const last5 = safe.slice(-5).reverse();
      setRecentCourses(last5);
    } catch {
      setRecentCourses([]);
    }
  }, []);

  const favouriteCourses = useMemo(() => {
    const list = Array.isArray(courses) ? courses : [];
    const map = new Map(list.map((c) => [c?.id, c]));
    return favouriteIds
      .map((id) => map.get(id))
      .filter(Boolean);
  }, [courses, favouriteIds]);

  const firstName = loadingProfile
    ? "Scholar"
    : userProfile?.full_name?.split(" ")[0] || "Scholar";

  return (
    <div className="max-w-2xl mx-auto relative min-h-[100dvh] flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="px-6 pt-4 pb-7 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Logo className="w-12 lg:w-24 h-auto text-slate-800 dark:text-slate-100" />
          <p className="text-sm font-bold tracking-[0.2em] uppercase mt-2 text-slate-400">
            Quiz Bolt
          </p>
        </div>

        {/* User Avatar with Premium Crown - navigates to Profile */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl lg:scale-150"
        >
          {loadingProfile ? (
            <div className="size-10 rounded-2xl bg-blue-600 flex items-center justify-center text-sm text-white font-black shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300">
              ...
            </div>
          ) : (
            <Avatar avatarUrl={userProfile?.avatar_url} size="sm" />
          )}

          {/* Premium Badge */}
          {isPremium && (
            <div className="absolute -top-2 -right-2 bg-amber-400 dark:bg-yellow-500 rounded-full p-1 border-2 border-gray-50 dark:border-slate-900 shadow-sm flex items-center justify-center">
              <FaCrown className="text-[8px] text-white" />
            </div>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-32 pt-2 flex flex-col gap-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Greeting */}
        <div>
          <h1 className="mt-1 text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Hello, {firstName}!{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Ready for your next challenge?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Best Score",
              value: stats.bestScore,
              icon: <FiStar />,
              color: "text-amber-500",
              bg: "bg-amber-50 dark:bg-amber-900/20",
            },
            {
              label: "Position",
              value: stats.position || "--",
              icon: <FiZap />,
              color: "text-blue-500",
              bg: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              label: "Streak",
              value: stats.streak || 0,
              icon: <FaFire />,
              color: "text-orange-500",
              bg: "bg-orange-50 dark:bg-orange-900/20",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-3 rounded-[1.6rem] border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center"
            >
              <div
                className={`size-8 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-2`}
              >
                {stat.icon}
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-white leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Premium Call to Action (non-premium users) */}
        {!isPremium && (
          <div
            onClick={() => navigate("/premium")}
            className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-[2.25rem] shadow-xl shadow-blue-200 dark:shadow-none cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="absolute -right-6 -top-6 size-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-11 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <FiZap className="text-yellow-300 text-xl" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg leading-tight">
                    Go Premium
                  </h4>
                  <p className="text-blue-100 text-[11px] font-medium">
                    Unlock Unlimited Questions & No Interruptions
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recently done (carousel) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
              Recently done
            </h3>
            <button
              type="button"
              onClick={() => navigate("/history")}
              className="text-[11px] font-black text-blue-600 dark:text-blue-400"
            >
              View all
            </button>
          </div>

          {recentCourses.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 font-medium">
              No recent attempts yet. Complete an exam to see it here.
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
              {recentCourses.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate("/history")}
                  className="snap-start shrink-0 w-64 bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 text-left shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 truncate">
                        {item?.date || "—"}
                      </p>
                      <p className="mt-1 text-lg font-black text-slate-900 dark:text-white truncate">
                        {item?.course || "Course"}
                      </p>
                    </div>
                    <div className="size-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
                      {item?.score ?? 0}/{item?.total ?? 0}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                    <span>Best: {item?.score != null && item?.total ? `${Math.round((item.score / item.total) * 100)}%` : "—"}</span>
                    <span>•</span>
                    <span>Time: {item?.timeTaken != null ? `${Math.floor(item.timeTaken / 60)}m ${item.timeTaken % 60}s` : "—"}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Favourite courses */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
            Favourite courses
          </h3>

          {favouriteCourses.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 font-medium">
              You haven’t favourited any courses yet. Tap the heart on the Courses screen.
            </div>
          ) : (
            <div className="grid gap-4">
              {favouriteCourses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => navigate(`/choose-course?course=${course.id}`)}
                  className="w-full text-left p-5 rounded-[2rem] border-2 bg-white dark:bg-slate-800 border-white dark:border-slate-800 hover:border-blue-100 shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xl font-black text-slate-900 dark:text-white truncate">
                        {course.name}
                      </p>
                      <p className="text-sm mt-1 leading-snug text-slate-500 dark:text-slate-400 truncate">
                        {course.title}
                      </p>
                    </div>
                    <div className="shrink-0 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[10px] font-black tracking-wider text-blue-600 dark:text-blue-400">
                      {course.questionCount || 0} Qs
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <NavBar
        isPremium={isPremium}
        onLockedClick={() => setPremiumOverlayOpen(true)}
      />

      {!isPremium && showAd && <BannerAd onAdClose={() => setShowAd(false)} />}

      <ConfirmOverlay
        isOpen={isPremiumOverlayOpen}
        onClose={() => setPremiumOverlayOpen(false)}
        onConfirm={() => navigate("/premium")}
        title="Unlock Premium Features"
        message="Get Premium to save questions for revision, bookmark during exams, and enjoy an ad-free experience."
        confirmText="Get Premium"
        cancelText="Maybe later"
      />
    </div>
  );
};

export default Home;
