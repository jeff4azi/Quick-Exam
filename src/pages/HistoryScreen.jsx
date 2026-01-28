import React, { useState, useEffect } from "react";
import { FaClipboardList, FaChevronRight, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmOverlay from "../components/ConfirmOverlay";

const HistoryScreen = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  // Fetch history from localStorage
  useEffect(() => {
    const storedHistory = (JSON.parse(localStorage.getItem("examHistory")) || []).reverse();
    setHistoryData(storedHistory);
  }, []);

  // Scroll shadow effect for header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalExams = historyData.length;

  // Stats calculations
  const bestScore =
    totalExams > 0 ? Math.max(...historyData.map((h) => (h.score / h.total) * 100)) : 0;
  const avgScore =
    totalExams > 0
      ? Math.round(historyData.reduce((acc, h) => acc + (h.score / h.total) * 100, 0) / totalExams)
      : 0;

  // Performance color styling
  const getPerformanceStyles = (percent) => {
    if (percent >= 80) return "border-l-[#22C55E] dark:border-l-[#16A34A]"; // Green
    if (percent >= 50) return "border-l-[#2563EB] dark:border-l-[#60A5FA]"; // Blue/Neutral
    return "border-l-[#EF4444] dark:border-l-[#DC2626]"; // Red
  };

  // ---------- DELETE FUNCTIONS ----------
  const deleteExam = (id) => {
    const updated = historyData.filter((exam) => exam.id !== id);
    setHistoryData(updated);
    localStorage.setItem("examHistory", JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    setHistoryData([]);
    localStorage.removeItem("examHistory");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-[#111827] text-[#1F2937] dark:text-[#F3F4F6] font-sans antialiased transition-colors duration-300">

      {/* Header */}
      <header
        className={`flex items-center justify-between gap-5 px-5 py-6 sticky top-0 z-50 bg-[#FFFFFF] dark:bg-[#1E293B] transition-shadow duration-200 ${isScrolled ? "shadow-sm dark:shadow-black/40" : "shadow-none"
          }`}
      >
        <div className="flex gap-3 items-center">
        <button
          className="bg-gray-100 dark:bg-gray-700 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
          <h1 className="text-2xl font-semibold dark:text-white">Exam History</h1>
        </div>
        {totalExams > 0 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
            onClick={() => setOverlayOpen(true)}
          >
            <FaTrash size={18} />
          </button>
        )}
      </header>

      <main className="max-w-md mx-auto pb-8">
        {/* Summary Strip */}
        {totalExams > 0 && (
          <section className="mt-4 px-4">
            <div className="grid grid-cols-3 gap-1 bg-[#FFFFFF] dark:bg-[#1E293B] rounded-2xl p-4 shadow-sm border border-[#D1D5DB] dark:border-[#4B5563]">
              <SummaryItem label="Total" value={totalExams} />
              <SummaryItem label="Average" value={`${bestScore.toFixed(1)}%`} />
              <SummaryItem label="Average" value={`${avgScore.toFixed(1)}%`} />
            </div>
          </section>
        )}

        {/* History List / Empty State */}
        <section className="mt-6 px-4 space-y-3">
          {totalExams === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 opacity-60">
              <FaClipboardList size={48} className="text-[#9CA3AF]" />
              <h3 className="mt-4 text-lg font-medium">No exams taken yet</h3>
              <p className="text-sm text-[#9CA3AF] dark:text-[#D1D5DB]">
                Your completed exams will appear here.
              </p>
            </div>
          ) : (
            historyData.map((exam) => {
              const percent = Math.round((exam.score / exam.total) * 100);
              return (
                <div
                  key={exam.id}
                  className={`group flex justify-between items-center p-4 
                    bg-[#FFFFFF] dark:bg-[#1E293B] 
                    rounded-xl border-l-4 shadow-sm border-y border-r border-y-[#D1D5DB] border-r-[#D1D5DB] 
                    dark:border-y-[#4B5563] dark:border-r-[#4B5563]
                    ${getPerformanceStyles(percent)}
                    active:scale-[0.98] transition-all duration-200
                  `}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-base leading-tight">{exam.course}</span>
                    <span className="text-xs text-[#9CA3AF] dark:text-[#D1D5DB] mt-1">{exam.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-[#1F2937] dark:text-[#F3F4F6]">
                        {exam.score}
                        <span className="text-xs font-normal text-[#9CA3AF]">/{exam.total}</span>
                      </div>
                      <div
                        className={`text-xs font-semibold ${percent >= 50 ? "text-[#22C55E]" : "text-[#EF4444]"
                          }`}
                      >
                        {percent}%
                      </div>
                    </div>

                    {/* Delete Single Exam */}
                    <button
                      onClick={() => deleteExam(exam.id)}
                      className="p-2 rounded-full bg-red-100 dark:bg-red-700 text-red-600 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 transition-colors"
                      title="Delete Exam"
                    >
                      <FaTrash size={14} />
                    </button>

                    <FaChevronRight
                      className="text-[#D1D5DB] group-hover:text-[#2563EB] transition-colors"
                      size={12}
                    />
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>

      <ConfirmOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        onConfirm={clearAllHistory}
        title="Delete All History?"
        message="This will remove all saved exam history. Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />

    </div>
  );
};

// Sub-component for Summary Items
const SummaryItem = ({ label, value }) => (
  <div className="text-center">
    <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] dark:text-[#D1D5DB] font-semibold">{label}</p>
    <p className="text-xl font-bold text-[#1F2937] dark:text-[#F3F4F6]">{value}</p>
  </div>
);

export default HistoryScreen;