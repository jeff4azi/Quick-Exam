import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";

const getCurrentWeekStartIso = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const diff = day; // how many days since Sunday
  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - diff,
    0,
    0,
    0,
    0
  );
  return weekStart.toISOString();
};

const LeaderboardScreen = ({ courses }) => {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const weekStartIso = getCurrentWeekStartIso();

        // 1. Fetch all non‑retake attempts for the current week
        const { data: attemptsData, error: attemptsError } = await withTimeout(
          supabase
            .from("exam_attempts")
            .select(
              `
              id,
              user_id,
              course_id,
              score,
              total_questions,
              time_taken,
              date_taken,
              is_retake
            `
            )
            .eq("is_retake", false)
            .gte("date_taken", weekStartIso),
          15000,
          "Loading leaderboard took too long. Please try again."
        );

        if (attemptsError) {
          console.error(
            "Failed to fetch leaderboard attempts:",
            attemptsError.message,
            attemptsError.details
          );
          // Gracefully fall back to empty leaderboard instead of hard error
          setAttempts([]);
          setProfiles({});
          setLoading(false);
          return;
        }

        const safeAttempts = attemptsData || [];

        setAttempts(safeAttempts);

        // Fetch profile data (full_name + college + premium) for all users in these attempts
        const userIds = Array.from(
          new Set(safeAttempts.map((a) => a.user_id).filter(Boolean))
        );

        if (userIds.length > 0) {
          const { data: profilesData, error: profilesError } =
            await withTimeout(
              supabase
                .from("profiles")
                .select("id, full_name, college, is_premium")
                .in("id", userIds),
              15000,
              "Loading leaderboard profiles took too long."
            );

          if (profilesError) {
            console.error(
              "Failed to fetch leaderboard profiles:",
              profilesError.message,
              profilesError.details
            );
            setProfiles({});
          } else {
            const profileMap = {};
            (profilesData || []).forEach((p) => {
              profileMap[p.id] = {
                full_name: p.full_name,
                college: p.college,
                isPremium: p.is_premium === true,
              };
            });
            setProfiles(profileMap);
          }
        } else {
          setProfiles({});
        }
      } catch (err) {
        console.error("Leaderboard fetch error:", err.message);
        setError(
          "We couldn’t load the leaderboard right now. Please try again shortly."
        );
        setAttempts([]);
        setProfiles({});
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const courseOptions = useMemo(() => {
    if (!Array.isArray(courses) || courses.length === 0) {
      return [{ id: "all", label: "All Courses" }];
    }

    const deduped = [];
    const seen = new Set();

    courses.forEach((c) => {
      const id = c.id ?? c.course_id;
      if (!id || seen.has(id)) return;
      seen.add(id);
      deduped.push({
        id,
        label: c.name || c.title || c.code || "Course",
      });
    });

    return [{ id: "all", label: "All Courses" }, ...deduped];
  }, [courses]);

  const leaderboardEntries = useMemo(() => {
    if (!attempts.length) return [];

    // Apply course filter
    const filteredAttempts =
      selectedCourseId === "all"
        ? attempts
        : attempts.filter((a) => a.course_id === selectedCourseId);

    const byUser = new Map();

    filteredAttempts.forEach((attempt) => {
      if (!attempt.user_id || !attempt.total_questions) return;

      const percent =
        (Number(attempt.score) / Number(attempt.total_questions)) * 100;

      const key = attempt.user_id;
      const existing = byUser.get(key);

      if (!existing) {
        byUser.set(key, {
          userId: attempt.user_id,
          bestPercent: percent,
          attemptsCount: 1,
          totalTime: Number(attempt.time_taken) || 0,
        });
      } else {
        existing.bestPercent = Math.max(existing.bestPercent, percent);
        existing.attemptsCount += 1;
        existing.totalTime += Number(attempt.time_taken) || 0;
      }
    });

    const entries = Array.from(byUser.values()).map((entry) => {
      const avgTimeSeconds =
        entry.attemptsCount > 0
          ? Math.round(entry.totalTime / entry.attemptsCount)
          : 0;

      const profile = profiles[entry.userId] || {};
      const fullName = profile.full_name || "Scholar";
      const firstName = fullName.split(" ")[0] || fullName;
      const college = profile.college || "TASUED";

      return {
        ...entry,
        bestPercent: Math.round(entry.bestPercent),
        avgTimeSeconds,
        displayName: firstName,
        college,
        isPremium: profile.isPremium === true,
      };
    });

    // Sort by best score, then attempts count
    entries.sort((a, b) => {
      if (b.bestPercent !== a.bestPercent) {
        return b.bestPercent - a.bestPercent;
      }
      return b.attemptsCount - a.attemptsCount;
    });

    return entries;
  }, [attempts, profiles, selectedCourseId]);

  const formatTime = (seconds) => {
    if (!seconds) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-none border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-90 transition-all"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                Weekly Leaderboard
                <FaTrophy className="text-amber-400" />
              </h1>
              <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-400 dark:text-slate-500">
                Resets every Sunday
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300">
            <FaCrown className="text-xs" />
            <span>Top performers only</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-4 pb-20">
        {/* Course filter */}
        <section className="mb-4">
          <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">
            Filter by course
          </label>
          <div className="relative">
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {courseOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
              <span className="text-xs">▼</span>
            </div>
          </div>
        </section>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Loading leaderboard...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-4 text-sm text-red-600 dark:text-red-200 font-medium">
            {error}
          </div>
        ) : leaderboardEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <FaTrophy size={32} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold">No leaders yet this week</h3>
            <p className="text-slate-500 text-sm max-w-[220px]">
              Complete an exam (without a retake) to appear on the leaderboard.
            </p>
          </div>
        ) : (
          <section className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
              Top Scholars
            </h3>

            <div className="space-y-3">
              {leaderboardEntries.map((entry, index) => (
                <LeaderboardRow
                  key={entry.userId}
                  rank={index + 1}
                  name={entry.displayName}
                  college={entry.college}
                  isPremium={entry.isPremium}
                  bestPercent={entry.bestPercent}
                  attempts={entry.attemptsCount}
                  avgTime={formatTime(entry.avgTimeSeconds)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const LeaderboardRow = ({ rank, name, college, isPremium, bestPercent, attempts, avgTime }) => {
  const isTop1 = rank === 1;
  const isTop2 = rank === 2;
  const isTop3 = rank === 3;

  let badgeBg =
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";
  let badgeIcon = null;

  if (isTop1) {
    badgeBg =
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    badgeIcon = <FaCrown className="text-amber-400" />;
  } else if (isTop2) {
    badgeBg =
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";
    badgeIcon = <FaMedal className="text-slate-400" />;
  } else if (isTop3) {
    badgeBg =
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
    badgeIcon = <FaMedal className="text-orange-400" />;
  }

  return (
    <div className="group flex items-center justify-between p-4 rounded-[1.8rem] bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-300 active:scale-[0.98]">
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`size-10 rounded-2xl flex items-center justify-center font-black text-sm ${badgeBg}`}
        >
          {badgeIcon ? badgeIcon : <span>#{rank}</span>}
        </div>
        <div className="min-w-0">
          <p className="font-black text-slate-900 dark:text-white truncate flex items-center gap-1.5">
            {name}
            {isPremium && (
              <span
                className="inline-flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-500 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[0.12em]"
                title="Premium user"
              >
                <FaCrown className="mr-0.5" size={8} />
                PRO
              </span>
            )}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
            {college}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Best: {bestPercent}% • Attempts: {attempts}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          Avg. Time
        </p>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
          {avgTime}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardScreen;

