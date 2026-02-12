import React, { useState, useEffect } from "react";
import { FaHistory, FaChevronRight, FaTrashAlt, FaTrophy, FaChartLine, FaLayerGroup, FaRedoAlt } from "react-icons/fa";
import { FiArrowLeft, FiTrash2, FiClock, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmOverlay from "../components/ConfirmOverlay";
import { supabase } from "../supabaseClient";

const formatTime = (seconds) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};


const HistoryScreen = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("No user session");
        return;
      }

      const { data, error } = await supabase
        .from("exam_attempts")
        .select(`
        id,
        course_id,
        score,
        total_questions,
        date_taken,
        time_taken,
        is_retake
      `)
        .eq("user_id", user.id)
        .order("date_taken", { ascending: false });

      if (error) {
        console.error("Failed to fetch history:", error.message, error.details);
      }


      setHistoryData(data || []);
    };

    fetchHistory();
  }, []);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalExams = historyData.length;

  const bestScore =
    totalExams > 0
      ? Math.max(
        ...historyData.map(
          (h) => (Number(h.score) / Number(h.total_questions)) * 100
        )
      )
      : 0;

  const avgScore =
    totalExams > 0
      ? Math.round(
        historyData.reduce(
          (acc, h) =>
            acc +
            (Number(h.score) / Number(h.total_questions)) * 100,
          0
        ) / totalExams
      )
      : 0;

  const avgTime =
    totalExams > 0
      ? Math.round(
        historyData.reduce((acc, h) => acc + (Number(h.time_taken) || 0), 0) /
        totalExams
      )
      : 0;
  const formattedAvgTime = formatTime(avgTime);

  const retakeCount = historyData.filter(h => h.is_retake).length;

  const retakeRate =
    totalExams > 0
      ? Math.round((retakeCount / totalExams) * 100)
      : 0;
  const formattedRetake =
    totalExams > 0
      ? `${retakeRate}% (${retakeCount})`
      : "—";


  const deleteExam = async (id) => {
    const { error } = await supabase
      .from("exam_attempts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete failed:", error);
      return;
    }

    setHistoryData((prev) => prev.filter((exam) => exam.id !== id));
  };


  const clearAllHistory = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("exam_attempts")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Clear history failed:", error);
      return;
    }

    setHistoryData([]);
    setOverlayOpen(false);
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-500">

      {/* Sleek Glass Header */}
      <header className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-none border-b border-slate-100 dark:border-slate-800"
          : "bg-transparent"
        }`}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 active:scale-90 transition-all"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-black tracking-tight">Activity Log</h1>
          </div>

          {totalExams > 0 && (
            <button
              onClick={() => setOverlayOpen(true)}
              className="p-2.5 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <FiTrash2 size={20} />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-4 pb-20">

        {/* Stats Bento Grid */}
        {totalExams > 0 && (
          <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Completed" value={totalExams} icon={<FaLayerGroup />} color="blue" />
            <StatCard label="Best Score" value={`${Math.round(bestScore)}%`} icon={<FaTrophy />} color="amber" />
            <StatCard
              label="Retake Rate"
              value={formattedRetake}
              icon={<FiRefreshCw />}
              color="purple"
            />
            <StatCard
              label="Avg. Time"
              value={formattedAvgTime || "—"}
              icon={<FiClock />}
              color="purple"
            />
            <StatCard
              label="Avg. Perf."
              value={`${avgScore}%`}
              icon={<FaChartLine />}
              color="emerald"
              className="col-span-2 md:col-span-1"
            />
          </section>
        )}

        {/* History List */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
            Recent Attempts
          </h3>

          {totalExams === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FaHistory size={32} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold">No History Found</h3>
              <p className="text-slate-500 text-sm max-w-[200px]">Complete an exam to see your performance here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historyData.map((exam) => (
                <HistoryItem
                  key={exam.id}
                  exam={{
                    ...exam,
                    course: exam.course_id,
                    total: exam.total_questions,
                    date: new Date(exam.date_taken).toLocaleDateString(),
                  }}
                  onDelete={() => deleteExam(exam.id)}
                />

              ))}
            </div>
          )}
        </div>
      </main>

      <ConfirmOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        onConfirm={clearAllHistory}
        title="Clear History"
        message="This action cannot be undone. All your progress data will be reset."
        danger={true}
      />
    </div>
  );
};

/* --- STAT CARD COMPONENT --- */
const StatCard = ({ label, value, icon, color, className = "" }) => {
  const colors = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-500/10",
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-500/10",
    emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
    purple: "text-purple-600 bg-purple-50 dark:bg-purple-500/10",
    indigo: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10",
  };
  return (
    <div className={`bg-white dark:bg-slate-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm ${className}`}>
      <div className={`size-10 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{label}</p>
    </div>
  );
};

/* --- HISTORY ITEM COMPONENT --- */
const HistoryItem = ({ exam, onDelete }) => {
  // Ensure values are treated as numbers to avoid calculation errors
  const score = Number(exam.score) || 0;
  const total = Number(exam.total) || 1;
  const percent = Math.round((score / total) * 100);
  const isPassed = percent >= 50;
  const formattedTime = formatTime(exam.time_taken);
  const cardStyle = exam.is_retake
    ? "border-purple-200 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-900/10"
    : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50";

  return (
    <div className={`group relative p-5 rounded-[2rem] border flex items-center justify-between transition-all duration-300 active:scale-[0.98] hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-none ${cardStyle}`}>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="font-black text-slate-900 dark:text-white capitalize truncate max-w-[150px] sm:max-w-none">
            {exam.course?.toLowerCase() || "Course"}
          </span>

          {exam.is_retake && (
            <FaRedoAlt
              size={12}
              className="text-purple-400 opacity-70"
              title="Retake"
            />
          )}
        </div>

        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-3 flex-wrap">
          <span>{exam.date}</span>
          <span>• {total} Qs</span>

          {formattedTime && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiClock size={12} className="opacity-70" />
                {formattedTime}
              </span>
            </>
          )}

        </span>

      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xl font-black leading-none flex items-baseline justify-end">
            {score}
            <span className="text-xs text-slate-300 dark:text-slate-600 font-medium ml-0.5">/{total}</span>
          </p>
          <p className={`text-[10px] font-black mt-1 ${isPassed ? 'text-emerald-500' : 'text-red-500'}`}>
            {percent}% {isPassed ? 'PASSED' : 'FAILED'}
          </p>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
        >
          <FaTrashAlt size={14} />
        </button>

        <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-300">
          <FaChevronRight size={12} />
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;