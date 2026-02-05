import React, { useState, useEffect } from "react";
import { FaHistory, FaChevronRight, FaTrashAlt, FaTrophy, FaChartLine, FaLayerGroup } from "react-icons/fa";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmOverlay from "../components/ConfirmOverlay";

const HistoryScreen = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  // Fetch history from localStorage
  useEffect(() => {
    const data = localStorage.getItem("examHistory");
    if (data) {
      const storedHistory = (JSON.parse(data) || []).reverse();
      setHistoryData(storedHistory);
    }
  }, []);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalExams = historyData.length;

  // Optimized Stat Calculations
  const bestScore = totalExams > 0 
    ? Math.max(...historyData.map((h) => (Number(h.score) / Number(h.total)) * 100)) 
    : 0;

  const avgScore = totalExams > 0 
    ? Math.round(historyData.reduce((acc, h) => acc + (Number(h.score) / Number(h.total)) * 100, 0) / totalExams) 
    : 0;

  const deleteExam = (id) => {
    const updated = historyData.filter((exam) => exam.id !== id);
    setHistoryData(updated);
    localStorage.setItem("examHistory", JSON.stringify(updated.reverse())); // Store in original order
  };

  const clearAllHistory = () => {
    setHistoryData([]);
    localStorage.removeItem("examHistory");
    setOverlayOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* Sleek Glass Header */}
      <header className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled 
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
                  exam={exam} 
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

  return (
    <div className="group relative bg-white dark:bg-slate-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-none transition-all duration-300 active:scale-[0.98]">
      <div className="flex flex-col gap-0.5">
        <span className="font-black text-slate-900 dark:text-white capitalize truncate max-w-[150px] sm:max-w-none">
          {exam.course?.toLowerCase() || "Course"}
        </span>
        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-2">
          {exam.date} • {total} Qs
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