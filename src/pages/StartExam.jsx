import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import BannerAd from "../components/BannerAd";

import { FaCrown, FaTrophy, FaGraduationCap } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { MdOutlineHistory } from 'react-icons/md';

const StartExam = ({
  userProfile,
  loadingProfile,
  isPremium,
}) => {

  const navigate = useNavigate();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (isPremium) {
      setShowAd(false); // force hide if user is premium
      return;
    }

    const timer = setTimeout(() => setShowAd(true), 750);
    return () => clearTimeout(timer);
  }, [isPremium]);


  return (
    <div className="max-w-2xl mx-auto relative h-[100dvh] flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <div className="p-6 flex justify-end items-center z-50">
        {/* User Initial Avatar with Premium Crown - navigates to Profile */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
        >
          <div className="size-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300">
            {loadingProfile ? "..." : (userProfile?.full_name?.charAt(0) || "S")}
          </div>

          {/* Premium Badge */}
          {isPremium && (
            <div className="absolute -top-2 -right-2 bg-amber-400 dark:bg-yellow-500 rounded-full p-1 border-2 border-gray-50 dark:border-slate-900 shadow-sm flex items-center justify-center">
              <FaCrown className="text-[8px] text-white" />
            </div>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mt-4 mb-8">
          <h2 className="text-gray-500 dark:text-slate-400 font-medium text-lg">Hello,</h2>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {loadingProfile ? "..." : (userProfile?.full_name?.split(' ')[0] || "Scholar")}!👋
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaGraduationCap size={80} className="text-blue-600" />
          </div>
          <div className="relative z-10">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {userProfile?.college || "TASUED"}
            </span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-3 mb-1">
              {userProfile?.department || "Ready to study?"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Level {userProfile?.year || "1"}00 Student
            </p>
          </div>
        </div>

        <div className="mt-auto mb-32 flex flex-col items-center opacity-40 grayscale">
          <Logo className="size-12" />
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-2 text-slate-400">Quiz Bolt</p>
        </div>
      </div>

      {/* Bottom CTA + Navbar */}
      <div className="mx-auto max-w-2xl fixed bottom-0 inset-x-0 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent dark:from-slate-900 dark:via-slate-900/90">
        <div className="space-y-3">
          <div className="px-6">
            <button
              onClick={() => navigate("/choose-course")}
              className="w-full bg-blue-600 dark:bg-blue-700 py-4.5 rounded-2xl font-black text-white text-lg shadow-xl shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all active:scale-95"
            >
              Choose Course
            </button>
          </div>
          

          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-100 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
            {/* History */}
            <button
              type="button"
              onClick={() => navigate("/history")}
              className="flex flex-col items-center flex-1 text-xs font-semibold text-slate-500 dark:text-slate-300"
            >
              <div className="size-9 rounded-2xl flex items-center justify-center mb-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600">
                <MdOutlineHistory size={18} />
              </div>
              <span>History</span>
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={() => navigate("/bookmarks")}
              className="flex flex-col items-center flex-1 text-xs font-semibold text-slate-500 dark:text-slate-300"
            >
              <div className="size-9 rounded-2xl flex items-center justify-center mb-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600">
                <FiBookmark size={18} />
              </div>
              <span>Saved</span>
            </button>

            {/* Leaderboard */}
            <button
              type="button"
              onClick={() => navigate("/leaderboard")}
              className="flex flex-col items-center flex-1 text-xs font-semibold text-slate-500 dark:text-slate-300"
            >
              <div className="size-9 rounded-2xl flex items-center justify-center mb-1 bg-amber-50 dark:bg-amber-900/30 text-amber-500">
                <FaTrophy size={16} />
              </div>
              <span>Leaders</span>
            </button>
          </div>
        </div>
      </div>
      {!isPremium && showAd && (
        <BannerAd onAdClose={() => setShowAd(false)} />
      )}
    </div>
  );
}

export default StartExam;