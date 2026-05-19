import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaHistory,
  FaChevronRight,
  FaTrashAlt,
  FaTrophy,
  FaChartLine,
  FaLayerGroup,
  FaRedoAlt,
  FaFire,
} from "react-icons/fa";
import {
  FiTrash2,
  FiClock,
  FiRefreshCw,
  FiTarget,
  FiAlertCircle,
  FiPieChart,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import ConfirmOverlay from "../components/ConfirmOverlay";
import { supabase } from "../supabaseClient";
import { withTimeout } from "../utils/withTimeout";
import NavBar from "../components/NavBar";
import { useVisibilityRefresh } from "../hooks/useVisibilityRefresh";

const formatTime = (seconds) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

/* -------------------------------------------------------------------------- */
/*  CHART TAB OPTIONS                                                           */
/* -------------------------------------------------------------------------- */
const CHART_TABS = [
  { key: "score", label: "Score %" },
  { key: "time", label: "Time taken" },
  { key: "questions", label: "Questions" },
];

/* -------------------------------------------------------------------------- */
/*  MAIN SCREEN                                                                 */
/* -------------------------------------------------------------------------- */
const HistoryScreen = ({ isPremium, setQuestionType }) => {
  const [historyData, setHistoryData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);
  const [chartTab, setChartTab] = useState("score");

  const navigate = useNavigate();

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await withTimeout(
      supabase.auth.getUser(),
      15000,
      "Session check took too long while loading history.",
    );

    if (userError || !user) {
      setHistoryData([]);
      setLoading(false);
      return;
    }

    const { data, error } = await withTimeout(
      supabase
        .from("exam_attempts")
        .select(
          `id, course_id, score, total_questions, date_taken, time_taken, is_retake, type`,
        )
        .eq("user_id", user.id)
        .order("date_taken", { ascending: false }),
      15000,
      "Loading your history took too long. Please try again.",
    );

    if (error) {
      console.error("Failed to fetch history:", error.message);
      setHistoryData([]);
    } else {
      setHistoryData(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);
  useVisibilityRefresh(fetchHistory);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------------------- STATS ---------------------------------- */
  const totalExams = historyData.length;

  const bestScore =
    totalExams > 0
      ? Math.max(
          ...historyData.map(
            (h) => (Number(h.score) / Number(h.total_questions)) * 100,
          ),
        )
      : 0;

  const avgScore =
    totalExams > 0
      ? Math.round(
          historyData.reduce(
            (acc, h) =>
              acc + (Number(h.score) / Number(h.total_questions)) * 100,
            0,
          ) / totalExams,
        )
      : 0;

  const avgTime =
    totalExams > 0
      ? Math.round(
          historyData.reduce((acc, h) => acc + (Number(h.time_taken) || 0), 0) /
            totalExams,
        )
      : 0;

  const retakeCount = historyData.filter((h) => h.is_retake).length;
  const retakeRate =
    totalExams > 0 ? Math.round((retakeCount / totalExams) * 100) : 0;

  /* ----------------------------- STREAK ------------------------------------ */
  const streak = useMemo(() => {
    if (!historyData.length) return 0;
    const dateSet = new Set(
      historyData.map((r) =>
        new Date(r.date_taken).toLocaleDateString("en-CA"),
      ),
    );
    let count = 0;
    const today = new Date();
    for (let offset = 0; ; offset++) {
      const d = new Date(today);
      d.setDate(today.getDate() - offset);
      if (dateSet.has(d.toLocaleDateString("en-CA"))) count++;
      else break;
    }
    return count;
  }, [historyData]);

  /* ----------------------- INSIGHTS: top + worst course ------------------- */
  const courseInsights = useMemo(() => {
    const map = {};
    historyData.forEach((h) => {
      if (!h.course_id || !h.total_questions) return;
      const pct = (Number(h.score) / Number(h.total_questions)) * 100;
      if (!map[h.course_id]) map[h.course_id] = { total: 0, count: 0 };
      map[h.course_id].total += pct;
      map[h.course_id].count += 1;
    });
    const entries = Object.entries(map).map(([id, v]) => ({
      id,
      avg: Math.round(v.total / v.count),
      count: v.count,
    }));
    entries.sort((a, b) => b.avg - a.avg);
    return {
      top: entries[0] || null,
      worst: entries[entries.length - 1] || null,
    };
  }, [historyData]);

  /* ----------------------- MODE SPLIT ------------------------------------- */
  const modeSplit = useMemo(() => {
    const counts = { OBJ: 0, FIB: 0, THY: 0 };
    historyData.forEach((h) => {
      if (h.type && counts[h.type] !== undefined) counts[h.type]++;
    });
    const total = historyData.length || 1;
    return {
      obj: Math.round((counts.OBJ / total) * 100),
      fib: Math.round((counts.FIB / total) * 100),
      thy: Math.round((counts.THY / total) * 100),
    };
  }, [historyData]);

  /* ----------------------- CHART DATA (last 15) ---------------------------- */
  const chartData = useMemo(() => {
    return [...historyData]
      .slice(0, 15)
      .reverse()
      .map((h, i) => ({
        idx: i + 1,
        score: Math.round(
          (Number(h.score) / Number(h.total_questions || 1)) * 100,
        ),
        time: Number(h.time_taken) || 0,
        questions: Number(h.total_questions) || 0,
      }));
  }, [historyData]);

  /* ----------------------- WEEKLY ACTIVITY (last 7 days) ------------------ */
  const weeklyActivity = useMemo(() => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const key = d.toLocaleDateString("en-CA");
      const active = historyData.some(
        (h) => new Date(h.date_taken).toLocaleDateString("en-CA") === key,
      );
      return { day: days[d.getDay()], active };
    });
  }, [historyData]);

  /* ----------------------- DELETE ----------------------------------------- */
  const deleteExam = async (id) => {
    const { error } = await withTimeout(
      supabase.from("exam_attempts").delete().eq("id", id),
      15000,
      "Deleting this attempt took too long.",
    );
    if (!error) setHistoryData((prev) => prev.filter((e) => e.id !== id));
  };

  const clearAllHistory = async () => {
    const {
      data: { user },
    } = await withTimeout(
      supabase.auth.getUser(),
      15000,
      "Session check failed.",
    );
    if (!user) return;
    const { error } = await withTimeout(
      supabase.from("exam_attempts").delete().eq("user_id", user.id),
      15000,
      "Clearing history took too long.",
    );
    if (!error) {
      setHistoryData([]);
      setOverlayOpen(false);
    }
  };

  /* ======================= RENDER ========================================= */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <header
        className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-100 dark:border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight">Activity Log</h1>
          {totalExams > 0 && (
            <button
              onClick={() => setOverlayOpen(true)}
              className="p-2.5 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <FiTrash2 size={18} />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-2 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-b-2 mb-4" />
            <p className="text-slate-400 text-sm font-medium">
              Loading history...
            </p>
          </div>
        ) : totalExams === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <FaHistory size={28} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-black">No history yet</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-[220px] leading-relaxed">
              Complete an exam to start tracking your performance here.
            </p>
          </div>
        ) : (
          <>
            {/* ---- STAT CARDS ---- */}
            <section className="mt-4 mb-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 ml-1 mb-3">
                Overview
              </p>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <StatCard
                  label="Exams done"
                  value={totalExams}
                  icon={<FaLayerGroup />}
                  color="blue"
                />
                <StatCard
                  label="Best score"
                  value={`${Math.round(bestScore)}%`}
                  icon={<FaTrophy />}
                  color="amber"
                />
                <StatCard
                  label="Avg. score"
                  value={`${avgScore}%`}
                  icon={<FaChartLine />}
                  color="green"
                />
                <StatCard
                  label="Avg. time"
                  value={formatTime(avgTime) || "—"}
                  icon={<FiClock />}
                  color="purple"
                />
                <StatCard
                  label="Retake rate"
                  value={totalExams > 0 ? `${retakeRate}%` : "—"}
                  sub={retakeCount > 0 ? `${retakeCount} retakes` : null}
                  icon={<FiRefreshCw />}
                  color="red"
                  wide
                />
              </div>
            </section>

            {/* ---- PERFORMANCE TREND CHART ---- */}
            {chartData.length > 1 && (
              <section className="mb-6">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 ml-1 mb-3">
                  Performance trend
                </p>

                {/* Tab switcher */}
                <div className="flex gap-2 mb-4">
                  {CHART_TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setChartTab(t.key)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        chartTab === t.key
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-gray-100 dark:border-slate-700"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                {chartTab === "score" && (
                  <div className="flex gap-4 mb-2 ml-1">
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="inline-block w-3 h-0.5 bg-blue-500 rounded" />{" "}
                      Score
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span
                        className="inline-block w-3 h-0.5 bg-emerald-500 rounded"
                        style={{
                          borderTop: "2px dashed #1D9E75",
                          background: "transparent",
                        }}
                      />{" "}
                      Passing (50%)
                    </span>
                  </div>
                )}

                <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
                  <ResponsiveContainer width="100%" height={180}>
                    {chartTab === "score" ? (
                      <LineChart
                        data={chartData}
                        margin={{ top: 8, right: 12, left: -10, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(0,0,0,0.06)"
                        />
                        <XAxis
                          dataKey="idx"
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v) => `${v}%`}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                            fontSize: 12,
                          }}
                          formatter={(v) => [`${v}%`, "Score"]}
                          labelFormatter={(l) => `Attempt ${l}`}
                        />
                        <ReferenceLine
                          y={50}
                          stroke="#1D9E75"
                          strokeDasharray="5 4"
                          strokeWidth={1.5}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#378ADD"
                          strokeWidth={2.5}
                          dot={{ r: 3.5, fill: "#378ADD", strokeWidth: 0 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    ) : chartTab === "time" ? (
                      <BarChart
                        data={chartData}
                        margin={{ top: 8, right: 12, left: -10, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(0,0,0,0.06)"
                        />
                        <XAxis
                          dataKey="idx"
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v) => `${Math.floor(v / 60)}m`}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                            fontSize: 12,
                          }}
                          formatter={(v) => [formatTime(v), "Time"]}
                          labelFormatter={(l) => `Attempt ${l}`}
                        />
                        <Bar
                          dataKey="time"
                          fill="#7F77DD"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    ) : (
                      <BarChart
                        data={chartData}
                        margin={{ top: 8, right: 12, left: -10, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(0,0,0,0.06)"
                        />
                        <XAxis
                          dataKey="idx"
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#94a3b8" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                            fontSize: 12,
                          }}
                          formatter={(v) => [v, "Questions"]}
                          labelFormatter={(l) => `Attempt ${l}`}
                        />
                        <Bar
                          dataKey="questions"
                          fill="#1D9E75"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                  <p className="text-center text-[10px] text-slate-400 mt-2">
                    Last {chartData.length} attempts
                  </p>
                </div>
              </section>
            )}

            {/* ---- INSIGHTS ---- */}
            <section className="mb-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 ml-1 mb-3">
                Insights
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {/* Streak */}
                <div className="col-span-2 bg-white dark:bg-slate-800 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <FaFire className="text-orange-500" size={14} />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                      Daily streak
                    </span>
                    <span className="ml-auto text-base font-black text-orange-500">
                      {streak} {streak === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2">
                    {weeklyActivity.map((d, i) => (
                      <div
                        key={i}
                        className={`flex-1 aspect-square rounded-xl flex items-center justify-center text-[11px] font-bold transition-all ${
                          d.active
                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                            : "bg-gray-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {d.day}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">
                    {streak > 0
                      ? `Keep it up! You've studied ${streak} day${streak > 1 ? "s" : ""} in a row.`
                      : "Start a streak — take an exam today!"}
                  </p>
                </div>

                {/* Top course */}
                {courseInsights.top && (
                  <InsightCard
                    icon={<FiTarget size={13} />}
                    label="Top subject"
                    value={courseInsights.top.id}
                    sub={`Avg. ${courseInsights.top.avg}% · ${courseInsights.top.count} exam${courseInsights.top.count > 1 ? "s" : ""}`}
                    colorClass="text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                  />
                )}

                {/* Needs work */}
                {courseInsights.worst &&
                  courseInsights.worst.id !== courseInsights.top?.id && (
                    <InsightCard
                      icon={<FiAlertCircle size={13} />}
                      label="Needs work"
                      value={courseInsights.worst.id}
                      sub={`Avg. ${courseInsights.worst.avg}% — try retaking`}
                      colorClass="text-red-500 bg-red-50 dark:bg-red-900/20"
                    />
                  )}

                {/* Mode split */}
                <div className="col-span-2 bg-white dark:bg-slate-800 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <FiPieChart size={13} className="text-blue-500" />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                      Mode split
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[
                      {
                        label: "Objective",
                        pct: modeSplit.obj,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Fill in blank",
                        pct: modeSplit.fib,
                        color: "bg-emerald-500",
                      },
                      {
                        label: "Theory",
                        pct: modeSplit.thy,
                        color: "bg-amber-500",
                      },
                    ]
                      .filter((m) => m.pct > 0)
                      .map((m) => (
                        <div key={m.label} className="flex-1">
                          <div className="h-2 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden mb-1.5">
                            <div
                              className={`h-full rounded-full ${m.color}`}
                              style={{ width: `${m.pct}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500">
                            {m.label}
                          </p>
                          <p className="text-xs font-black text-slate-700 dark:text-slate-300">
                            {m.pct}%
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ---- HISTORY LIST ---- */}
            <section>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 ml-1 mb-3">
                Recent attempts
              </p>
              <div className="space-y-2.5">
                {historyData.map((exam) => (
                  <HistoryItem
                    key={exam.id}
                    exam={{
                      ...exam,
                      course: exam.course_id,
                      total: exam.total_questions,
                      date: new Date(exam.date_taken).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      ),
                    }}
                    onDelete={() => deleteExam(exam.id)}
                    setQuestionType={setQuestionType}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <ConfirmOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        onConfirm={clearAllHistory}
        title="Clear History"
        message="This action cannot be undone. All your progress data will be reset."
        danger={true}
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
        isPremium={isPremium}
        onLockedClick={() => setPremiumOverlayOpen(true)}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  STAT CARD                                                                   */
/* -------------------------------------------------------------------------- */
const StatCard = ({ label, value, sub, icon, color, wide = false }) => {
  const iconColors = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    green: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    purple: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    red: "text-red-500 bg-red-50 dark:bg-red-900/20",
  };
  return (
    <div
      className={`bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 shadow-sm ${wide ? "col-span-2" : ""}`}
    >
      <div
        className={`size-8 rounded-xl flex items-center justify-center mb-2.5 ${iconColors[color]}`}
      >
        {icon}
      </div>
      <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-none">
        {value}
        {sub && (
          <span className="text-xs font-medium text-slate-400 ml-1.5">
            {sub}
          </span>
        )}
      </p>
      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-1">
        {label}
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  INSIGHT CARD                                                                */
/* -------------------------------------------------------------------------- */
const InsightCard = ({ icon, label, value, sub, colorClass }) => (
  <div className="bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 shadow-sm">
    <div
      className={`size-7 rounded-lg flex items-center justify-center mb-2 ${colorClass}`}
    >
      {icon}
    </div>
    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
      {label}
    </p>
    <p className="text-base font-black text-slate-900 dark:text-white mt-0.5 truncate">
      {value}
    </p>
    <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{sub}</p>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  HISTORY ITEM                                                                */
/* -------------------------------------------------------------------------- */
const HistoryItem = ({ exam, onDelete, setQuestionType }) => {
  const navigate = useNavigate();
  const score = parseFloat((Number(exam.score) || 0).toFixed(2));
  const total = Number(exam.total) || 1;
  const percent = Math.round((score / total) * 100);
  const isPassed = percent >= 50;
  const formattedTime = formatTime(exam.time_taken);

  const progressColor =
    percent >= 70 ? "#1D9E75" : percent >= 50 ? "#378ADD" : "#E24B4A";

  const handleRetake = () => {
    const typeMap = { THY: "theory", FIB: "fib", OBJ: "objective" };
    const qType = typeMap[exam.type] ?? "objective";
    if (setQuestionType) setQuestionType(qType);
    navigate(`/choose-course?course=${exam.course_id}`);
  };

  return (
    <div
      onClick={handleRetake}
      className={`group relative p-3.5 sm:p-4 rounded-[1.5rem] border flex items-center justify-between transition-all duration-200 active:scale-[0.98] cursor-pointer ${
        exam.is_retake
          ? "border-purple-200 dark:border-purple-900/40 bg-purple-50/30 dark:bg-purple-900/10"
          : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800"
      }`}
    >
      <div className="flex flex-col gap-1 min-w-0 mr-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-black text-slate-900 dark:text-white truncate max-w-[130px] sm:max-w-none text-sm sm:text-base">
            {exam.course?.toLowerCase() || "Course"}
          </span>
          {exam.type && (
            <span
              className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0 ${
                exam.type === "THY"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  : exam.type === "FIB"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              }`}
            >
              {exam.type === "THY"
                ? "Theory"
                : exam.type === "FIB"
                  ? "Fill in Blanks"
                  : "Obj"}
            </span>
          )}
          {exam.is_retake && (
            <FaRedoAlt size={10} className="text-purple-400" title="Retake" />
          )}
        </div>
        <span className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
          <span>{exam.date}</span>
          <span>·</span>
          <span>{total} Qs</span>
          {formattedTime && (
            <>
              <span>·</span>
              <FiClock size={10} className="opacity-70" />
              <span>{formattedTime}</span>
            </>
          )}
        </span>
        {/* Inline progress bar */}
        <div className="w-24 h-1 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden mt-0.5">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${percent}%`, backgroundColor: progressColor }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="text-right">
          <p className="text-lg font-black leading-none text-slate-900 dark:text-white">
            {score}
            <span className="text-xs text-slate-300 dark:text-slate-600 font-medium ml-0.5">
              /{total}
            </span>
          </p>
          <p
            className={`text-[10px] font-black mt-0.5 ${isPassed ? "text-emerald-500" : "text-red-500"}`}
          >
            {percent}% {isPassed ? "PASS" : "FAIL"}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex"
        >
          <FaTrashAlt size={12} />
        </button>
        <div className="p-1.5 rounded-full bg-gray-50 dark:bg-slate-700 text-slate-300">
          <FaChevronRight size={10} />
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
