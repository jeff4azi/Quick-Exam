import React, { useEffect, useMemo, useState, useCallback } from "react";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";
import ProfileSheet from "../components/ProfileSheet";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import ConfirmOverlay from "../components/ConfirmOverlay";
import NavBar from "../components/NavBar";
import { useVisibilityRefresh } from "../hooks/useVisibilityRefresh";

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
    0,
  );
  return weekStart.toISOString();
};

const LeaderboardScreen = ({
  courses,
  isPremium: isUserPremium,
  userProfile,
}) => {
  const [attempts, setAttempts] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);
  const [universityFilter, setUniversityFilter] = useState("mine");
  const [questionCountFilter, setQuestionCountFilter] = useState("all");

  useEffect(() => {
    setSelectedCourseId("all");
    setQuestionCountFilter("all");
  }, [universityFilter]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetProfile, setSheetProfile] = useState(null);
  const [sheetStats, setSheetStats] = useState(null);
  const [sheetIsPremium, setSheetIsPremium] = useState(false);

  const navigate = useNavigate();

  const fetchLeaderboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const weekStartIso = getCurrentWeekStartIso();

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
            is_retake,
            university
          `,
          )
          .eq("is_retake", false)
          .gte("date_taken", weekStartIso),
        15000,
        "Loading leaderboard took too long. Please try again.",
      );

      if (attemptsError) {
        console.error(
          "Failed to fetch leaderboard attempts:",
          attemptsError.message,
          attemptsError.details,
        );
        setAttempts([]);
        setProfiles({});
        setLoading(false);
        return;
      }

      const safeAttempts = attemptsData || [];
      setAttempts(safeAttempts);

      const userIds = Array.from(
        new Set(safeAttempts.map((a) => a.user_id).filter(Boolean)),
      );

      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await withTimeout(
          supabase
            .from("profiles")
            .select(
              "id, full_name, user_name, year, college, is_premium, avatar_url, department",
            )
            .in("id", userIds),
          15000,
          "Loading leaderboard profiles took too long.",
        );

        if (profilesError) {
          console.error(
            "Failed to fetch leaderboard profiles:",
            profilesError.message,
          );
          setProfiles({});
        } else {
          const profileMap = {};
          (profilesData || []).forEach((p) => {
            profileMap[p.id] = {
              full_name: p.full_name,
              user_name: p.user_name,
              year: p.year,
              college: p.college,
              avatar_url: p.avatar_url,
              isPremium: p.is_premium === true,
              department: p.department || "General Studies",
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
        "We couldn't load the leaderboard right now. Please try again shortly.",
      );
      setAttempts([]);
      setProfiles({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  // Re-fetch leaderboard whenever the tab regains focus after being idle/hidden
  useVisibilityRefresh(fetchLeaderboardData);

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

    // 1. University filter
    const universityFiltered =
      universityFilter === "mine"
        ? attempts.filter((a) => a.university === userProfile?.university)
        : attempts;

    // 2. Course filter
    const courseFiltered =
      selectedCourseId === "all"
        ? universityFiltered
        : universityFiltered.filter((a) => a.course_id === selectedCourseId);

    // 3. Question count filter
    const filteredAttempts =
      questionCountFilter === "all"
        ? courseFiltered
        : courseFiltered.filter(
            (a) => Number(a.total_questions) === questionCountFilter,
          );

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
          university: attempt.university ?? null,
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
      const userName = profile.user_name || null;
      const year = profile.year || "1";

      return {
        ...entry,
        bestPercent: Math.round(entry.bestPercent),
        avgTimeSeconds,
        fullName, // primary display name
        userName, // handle/slug (not used as display fallback)
        year,
        university: entry.university,
        avatarUrl: profile.avatar_url || null,
        isPremium: profile.isPremium === true,
        department: profile.department,
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
  }, [
    attempts,
    profiles,
    selectedCourseId,
    universityFilter,
    userProfile,
    questionCountFilter,
  ]);

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

      <main className="max-w-2xl mx-auto px-6 pt-4 pb-32">
        <section className="mb-4">
          <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">
            Leaderboard Scope
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setUniversityFilter("mine")}
              className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all ${
                universityFilter === "mine"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              🏫 My University
            </button>
            <button
              onClick={() => setUniversityFilter("all")}
              className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all ${
                universityFilter === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              🌍 Global
            </button>
          </div>
        </section>
        {/* Question count filter */}
        <section className="mb-4">
          <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">
            Questions
          </label>
          <div className="flex gap-2">
            {["all", 30, 50, 70, 100].map((count) => (
              <button
                key={count}
                onClick={() => setQuestionCountFilter(count)}
                className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all ${
                  questionCountFilter === count
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {count === "all" ? "All" : count}
              </button>
            ))}
          </div>
        </section>
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
                  fullName={entry.fullName}
                  userName={entry.userName}
                  year={entry.year}
                  avatarUrl={entry.avatarUrl}
                  isPremium={entry.isPremium}
                  bestPercent={entry.bestPercent}
                  attempts={entry.attemptsCount}
                  avgTime={formatTime(entry.avgTimeSeconds)}
                  university={entry.university}
                  onClick={() => {
                    const profile = profiles[entry.userId] || {};
                    setSheetProfile({
                      full_name: entry.fullName,
                      user_name: entry.userName || null,
                      college: profile.college || "TASUED",
                      avatar_url: entry.avatarUrl,
                      department: entry.department,
                      university: entry.university,
                      year: entry.year,
                    });
                    setSheetStats({
                      rank: `#${index + 1}`,
                      bestScore: `${entry.bestPercent}%`,
                    });
                    setSheetIsPremium(entry.isPremium);
                    setIsSheetOpen(true);
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <ProfileSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        userProfile={sheetProfile}
        isPremium={sheetIsPremium}
        stats={sheetStats}
      />

      <ConfirmOverlay
        isOpen={isPremiumOverlayOpen}
        onClose={() => setPremiumOverlayOpen(false)}
        onConfirm={() => navigate("/premium")}
        title="Unlock Premium Features"
        message="Get Premium to save questions for revision, bookmark during exams, and enjoy an ad-free experience."
        confirmText="Get Premium"
        cancelText="Maybe later"
      />

      <NavBar
        isPremium={isUserPremium}
        onLockedClick={() => setPremiumOverlayOpen(true)}
      />
    </div>
  );
};

const LeaderboardRow = ({
  rank,
  fullName,
  userName,
  university,
  avatarUrl,
  isPremium,
  bestPercent,
  attempts,
  avgTime,
  onClick,
}) => {
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
    <div
      className="group flex items-center justify-between p-4 rounded-[1.8rem] bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-300 active:scale-[0.98] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-3">
          <div
            className={`size-10 rounded-2xl flex items-center justify-center font-black text-sm ${badgeBg}`}
          >
            {badgeIcon ? badgeIcon : <span>#{rank}</span>}
          </div>
          <Avatar avatarUrl={avatarUrl} size="sm" lazy={true} />
        </div>
        <div className="min-w-0">
          <p className="font-black text-slate-900 dark:text-white truncate flex items-center gap-1.5">
            {fullName}
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
            {userName ? `@${userName} • ` : ""}
            {university}
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
