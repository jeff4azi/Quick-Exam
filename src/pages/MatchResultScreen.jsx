import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FiChevronLeft, FiClock, FiRefreshCw, FiZap } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

const formatTime = (ms) => `${(ms / 1000).toFixed(2)}s`;

const getMedal = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

const MatchResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { timeMs, attempts, courseId, courseName } = location.state || {};

  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLB, setLoadingLB] = useState(true);
  const [myRank, setMyRank] = useState(null);
  const [myUserId, setMyUserId] = useState(null);

  // Redirect if arrived without state
  useEffect(() => {
    if (!timeMs || !courseId) navigate("/match", { replace: true });
  }, [timeMs, courseId, navigate]);

  // Fetch today's leaderboard for this course
  useEffect(() => {
    if (!courseId) return;

    const load = async () => {
      setLoadingLB(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setMyUserId(user?.id ?? null);

        // Start of today in UTC
        const todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0);

        const { data, error } = await supabase
          .from("match_attempts")
          .select("user_id, time_ms, created_at, profiles(full_name, avatar_url)")
          .eq("course_id", courseId)
          .gte("created_at", todayStart.toISOString())
          .order("time_ms", { ascending: true })
          .limit(20);

        if (error) throw error;

        // Keep only best attempt per user
        const bestByUser = new Map();
        (data || []).forEach((row) => {
          const existing = bestByUser.get(row.user_id);
          if (!existing || row.time_ms < existing.time_ms) {
            bestByUser.set(row.user_id, row);
          }
        });

        const sorted = Array.from(bestByUser.values()).sort(
          (a, b) => a.time_ms - b.time_ms
        );

        setLeaderboard(sorted);

        const rank = sorted.findIndex((r) => r.user_id === user?.id);
        setMyRank(rank !== -1 ? rank + 1 : null);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoadingLB(false);
      }
    };

    load();
  }, [courseId]);

  if (!timeMs || !courseId) return null;

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-500">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md px-5 pt-5 pb-3 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/match")}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all"
          >
            <FiChevronLeft className="size-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900 dark:text-white">Results</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{courseName}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-5">

          {/* Score card */}
          <div className="bg-emerald-600 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-200 dark:shadow-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FiZap className="size-6 text-yellow-300" />
              </div>
              <div>
                <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">All matched!</p>
                <p className="text-white font-black text-lg">{courseName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <FiClock className="size-3 text-emerald-200" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Time</p>
                </div>
                <p className="text-2xl font-black tabular-nums">{formatTime(timeMs)}</p>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-1">Attempts</p>
                <p className="text-2xl font-black tabular-nums">{attempts}</p>
              </div>
            </div>

            {myRank && (
              <div className="mt-3 bg-white/15 rounded-2xl px-4 py-3 flex items-center gap-2">
                <FaTrophy className="text-yellow-300 size-4" />
                <p className="text-sm font-black">
                  You ranked <span className="text-yellow-300">#{myRank}</span> today
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/match", { state: { courseId, courseName, replay: true } })}
              className="flex-1 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <FiRefreshCw className="size-4" />
              Play Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm active:scale-95 transition-all shadow-sm"
            >
              Home
            </button>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaTrophy className="text-amber-400 size-4" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Today's Leaderboard
              </h2>
            </div>

            {loadingLB ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 animate-pulse" />
                ))}
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-5 text-center text-sm text-slate-400">
                No attempts yet today. You're first!
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((row, i) => {
                  const isMe = row.user_id === myUserId;
                  const rank = i + 1;
                  const medal = getMedal(rank);
                  const name = row.profiles?.full_name?.split(" ")[0] || "Player";

                  return (
                    <div
                      key={row.user_id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                        isMe
                          ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                          : "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700"
                      }`}
                    >
                      <span className="w-7 text-center text-sm font-black text-slate-400 dark:text-slate-500">
                        {medal || `#${rank}`}
                      </span>
                      <div className="size-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-black text-slate-500 dark:text-slate-300 shrink-0">
                        {name[0].toUpperCase()}
                      </div>
                      <p className={`flex-1 text-sm font-bold truncate ${isMe ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-200"}`}>
                        {name} {isMe && <span className="text-[10px] font-black text-emerald-500">(you)</span>}
                      </p>
                      <span className={`text-sm font-black tabular-nums ${isMe ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                        {formatTime(row.time_ms)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResultScreen;
