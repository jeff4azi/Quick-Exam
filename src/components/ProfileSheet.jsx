import React, { useState, useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import {
  FiX,
  FiBook,
  FiAward,
  FiClock,
  FiHash,
  FiBookOpen,
  FiHome,
  FiLayers,
  FiUser,
  FiList,
} from "react-icons/fi";
import Avatar from "./Avatar";
import { supabase } from "../supabaseClient";

const ProfileSheet = ({ isOpen, onClose, userProfile, isPremium, stats }) => {
  const [isImageOverlayOpen, setIsImageOverlayOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState(null);

  useEffect(() => {
    if (!isOpen || !stats?.bestCourseId) {
      setCourseTitle(null);
      return;
    }
    setCourseTitle(null);

    supabase
      .from("courses_meta")
      .select("title")
      .eq("course_code", stats.bestCourseId)
      .maybeSingle()
      .then(({ data }) => setCourseTitle(data?.title ?? null));
  }, [isOpen, stats?.bestCourseId]);

  if (!isOpen) return null;

  const formatBestTime = (t) => {
    if (!t || !Number.isFinite(t) || t === Infinity) return "—";
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const rankNum = stats?.rank
    ? parseInt(stats.rank.replace("#", ""), 10)
    : null;
  const isTop1 = rankNum === 1;
  const isTop2 = rankNum === 2;
  const isTop3 = rankNum === 3;

  const collegeLabel = ["TASUED", "BOUESTI"].includes(userProfile?.university)
    ? "College"
    : "Faculty";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl mx-auto bg-gray-50 dark:bg-slate-900 rounded-t-[2rem] shadow-2xl animate-in slide-in-from-bottom-full duration-500 overflow-hidden lg:translate-x-30">
        {/* Grabber */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-9 h-1 bg-gray-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-base font-black text-slate-900 dark:text-white">
            Profile
          </h2>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400"
          >
            <FiX size={14} />
          </button>
        </div>

        {/* Hero */}
        <div className="flex items-center gap-4 px-5 pt-1 pb-5">
          <button
            onClick={() => setIsImageOverlayOpen(true)}
            className="relative shrink-0 focus:outline-none"
          >
            <Avatar
              avatarUrl={userProfile?.avatar_url}
              size="lg"
              className="rounded-[1.1rem] shadow-sm"
            />
            {isPremium && (
              <div className="absolute -top-1.5 -right-1.5 bg-amber-400 p-1.5 rounded-lg border-2 border-gray-50 dark:border-slate-900">
                <FaCrown className="text-white text-[12px]" />
              </div>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-black text-slate-900 dark:text-white truncate leading-tight">
              {userProfile?.full_name || "Scholar"}
            </h3>
            {userProfile?.user_name && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5">
                @{userProfile.user_name}
              </p>
            )}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isPremium
                  ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
            >
              {isPremium && <FaCrown size={8} />}
              {isPremium ? "Premium" : "Free tier"}
            </span>
          </div>

          {stats?.rank && (
            <div className="shrink-0 flex flex-col items-center justify-center min-w-[72px]">
              <div
                className="relative flex flex-col items-center justify-center rounded-[1.4rem] px-4 py-3.5 overflow-hidden"
                style={{
                  background: isTop1
                    ? "linear-gradient(145deg, #f59e0b, #d97706, #b45309)"
                    : isTop2
                      ? "linear-gradient(145deg, #94a3b8, #64748b, #475569)"
                      : isTop3
                        ? "linear-gradient(145deg, #fb923c, #ea580c, #c2410c)"
                        : "linear-gradient(145deg, #3b82f6, #2563eb, #1d4ed8)",
                  boxShadow: isTop1
                    ? "0 0 20px rgba(245,158,11,0.55), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25)"
                    : isTop2
                      ? "0 0 20px rgba(148,163,184,0.4), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                      : isTop3
                        ? "0 0 20px rgba(251,146,60,0.5), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                        : "0 0 20px rgba(59,130,246,0.45), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                {/* Shine overlay */}
                <div
                  className="absolute inset-0 rounded-[1.4rem] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
                  }}
                />

                {(isTop1 || isTop2 || isTop3) && (
                  <FaCrown
                    size={12}
                    className="mb-1 relative z-10"
                    style={{
                      color: isTop1
                        ? "#fef3c7"
                        : isTop2
                          ? "#f1f5f9"
                          : "#ffedd5",
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                    }}
                  />
                )}

                <span
                  className="relative z-10 font-black leading-none tracking-tight"
                  style={{
                    fontSize: stats.rank.length > 3 ? "1.2rem" : "1.6rem",
                    color: "#ffffff",
                    textShadow: "0 2px 6px rgba(0,0,0,0.35)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stats.rank}
                </span>

                <span
                  className="relative z-10 text-[9px] font-black uppercase tracking-[0.2em] mt-1"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "0.18em",
                  }}
                >
                  RANK
                </span>
              </div>
            </div>
          )}
          
        </div>

        <div className="px-4 pb-10 space-y-3 max-h-[60vh] overflow-y-auto">
          {/* Best Performance section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 px-4 pt-3 pb-2">
              Best performance
            </p>

            <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-700">
              {[
                {
                  label: "Score",
                  value: stats?.bestScore || "—",
                  icon: FiAward,
                },
                {
                  label: "Time",
                  value: formatBestTime(stats?.bestTime),
                  icon: FiClock,
                },
                {
                  label: "Questions",
                  value: stats?.bestTotalQuestions ?? "—",
                  icon: FiList,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-0.5 px-4 pb-4 pt-1"
                >
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                    {label}
                  </span>
                  <span className="text-[17px] font-black text-slate-900 dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {stats?.bestCourseId && (
              <div className="flex items-center gap-3 px-4 py-3 border-t border-slate-100 dark:border-slate-700">
                <div className="size-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                  <FiBook
                    size={14}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Best Course
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {stats.bestCourseId?.replace(/([A-Za-z]+)(\d+)/, "$1 $2")}
                    {courseTitle && (
                      <span className="font-normal text-slate-400 dark:text-slate-500">
                        {" "}
                        — {courseTitle}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Academic info section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 px-4 pt-3 pb-2">
              Academic info
            </p>

            {[
              {
                label: "University",
                value: userProfile?.university,
                icon: FiHome,
              },
              {
                label: collegeLabel,
                value: userProfile?.college,
                icon: FiBookOpen,
              },
              {
                label: "Department",
                value: userProfile?.department,
                icon: FiLayers,
              },
              {
                label: "Level",
                value: userProfile?.year ? `${userProfile.year}00` : null,
                icon: FiUser,
              },
            ].map(({ label, value, icon: Icon }, i, arr) => (
              <div
                key={label}
                className={`flex items-center justify-between px-4 py-3 ${
                  i < arr.length - 1
                    ? "border-b border-slate-100 dark:border-slate-700"
                    : ""
                }`}
              >
                <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Icon
                    size={14}
                    className="text-slate-400 dark:text-slate-500 shrink-0"
                  />
                  {label}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white max-w-[55%] truncate text-right">
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isImageOverlayOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsImageOverlayOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={
                userProfile?.avatar_url && userProfile.avatar_url !== "NULL"
                  ? userProfile.avatar_url
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={`${userProfile?.full_name || "User"}'s profile picture`}
              className="max-w-full max-h-full object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
              }}
            />
            <button
              onClick={() => setIsImageOverlayOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSheet;
