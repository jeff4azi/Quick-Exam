import { useNavigate } from "react-router-dom";
import WhatsAppCard from "../components/WhatsAppCard";
import { useEffect, useState, useRef } from "react";
import ReactGA from "react-ga4";
import BannerAd from "../components/BannerAd";
import ConfirmOverlay from "../components/ConfirmOverlay";
import { FaCrown } from "react-icons/fa";
import Avatar from "../components/Avatar";
import NavBar from "../components/NavBar";
import Logo from "../images/Logo";
import { toPng } from "html-to-image";

const ResultScreen = ({
  questions,
  results,
  answers,
  setAnswers,
  setHasRetaken,
  selectedCourse,
  userProfile,
  isPremium,
  questionType,
  timeTaken,
}) => {
  const navigate = useNavigate();
  const [showAd, setShowAd] = useState(true);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const shareRef = useRef(null);

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkQuery.matches);
    const listener = (e) => setIsDarkMode(e.matches);
    darkQuery.addEventListener("change", listener);
    return () => darkQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    ReactGA.event({
      category: "Exam",
      action: "View Results",
      label: selectedCourse.id,
    });
  }, [selectedCourse.id]);

  const userData = userProfile || { full_name: "Scholar", college: "" };
  const formatNum = (num) => String(num).padStart(2, "0");
  const answeredCount = answers.filter((a) => a !== undefined).length;

  const handleShareImage = async () => {
    setSharing(true);
    if (!shareRef.current) return;

    try {
      const dataUrl = await toPng(shareRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: isDarkMode ? "#030712" : "#f8fafc", // bg-gray-950 or bg-slate-50
        useCORS: true,
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "quizbolt-result.png", {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My QuizBolt Result",
          text: `I scored ${scorePercentage}% in ${selectedCourse.name}`,
        });
      } else {
        const link = document.createElement("a");
        link.download = "quizbolt-result.png";
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
    setSharing(false);
  };

  const timeTakenSafe = timeTaken ?? 0;
  const minutes = String(Math.floor(timeTakenSafe / 60)).padStart(2, "0");
  const seconds = String(timeTakenSafe % 60).padStart(2, "0");
  const scorePercentage = Math.round(
    (results.correct / (results.answered || questions.length)) * 100,
  );
  const strokeDasharray = 2 * Math.PI * 90;
  const strokeDashoffset =
    strokeDasharray - (scorePercentage / 100) * strokeDasharray;

  const getFeedback = () => {
    if (scorePercentage >= 80)
      return {
        msg: `Outstanding work, ${userData.full_name.split(" ")[0]}!`,
        color: "text-green-500",
      };
    if (scorePercentage >= 60)
      return {
        msg: `Great job, ${userData.full_name.split(" ")[0]}!`,
        color: "text-blue-500",
      };
    if (scorePercentage >= 45)
      return {
        msg: `Good effort, ${userData.full_name.split(" ")[0]}.`,
        color: "text-amber-500",
      };
    return {
      msg: `Don't give up, ${userData.full_name.split(" ")[0]}.`,
      color: "text-red-500",
    };
  };

  const feedback = getFeedback();

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-gray-950 p-6 lg:p-10 pb-32 lg:pb-32 flex flex-col lg:max-w-2xl mx-auto transition-colors duration-300">
      <header className="flex justify-between items-center mb-8 lg:px-16">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 py-2 px-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider font-bold">
            Time
          </span>
          <span className="font-mono text-[#2563EB] dark:text-[#22D3EE] font-bold text-lg">
            {minutes}:{seconds}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-gray-800 dark:text-gray-200 leading-none">
              {userData.full_name}
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
              {userData.college}
            </p>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="relative rounded-2xl"
          >
            <Avatar avatarUrl={userProfile?.avatar_url} size="sm" />
            {isPremium && (
              <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-1 border-2 border-white dark:border-gray-950 shadow-md">
                <FaCrown className="text-[8px] text-white" />
              </div>
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center space-y-8 lg:px-16">
        <div
          onClick={() => navigate("/history")}
          className="relative flex items-center justify-center cursor-pointer group"
        >
          <svg className="size-56 transform -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="90"
              className="stroke-gray-200 dark:stroke-gray-800"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="112"
              cy="112"
              r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 1s ease-out",
              }}
              className="text-[#2563EB] dark:text-[#22D3EE]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-black text-gray-800 dark:text-white">
              {scorePercentage}
              <span className="text-2xl">%</span>
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest">
              Score
            </span>
          </div>
        </div>

        <div className="text-center px-4">
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            {selectedCourse.name}
          </h1>
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
            {questionType === "theory" ? "Theory" : questionType === "fib" ? "Fill in the Blanks" : "Objectives"}
          </p>
          <p className={`text-sm mt-2 font-bold ${feedback.color}`}>
            {feedback.msg}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 w-full p-6 grid grid-cols-2 gap-4 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
          <StatItem
            label="Answered"
            value={formatNum(answeredCount)}
            color="bg-blue-500"
            textColor="text-[#2563EB] dark:text-blue-400"
          />
          <StatItem
            label="Total"
            value={formatNum(questions.length)}
            color="bg-gray-400"
            textColor="text-gray-600 dark:text-gray-300"
          />
          <StatItem
            label="Correct"
            value={formatNum(results.correct)}
            color="bg-green-500"
            textColor="text-green-600 dark:text-green-400"
          />
          <StatItem
            label="Wrong"
            value={formatNum(results.wrong)}
            color="bg-red-500"
            textColor="text-red-600 dark:text-red-400"
          />
        </div>
      </main>

      <footer className="mt-10 flex justify-around items-center bg-white dark:bg-gray-900 p-4 lg:mx-64 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <ActionButton
          label="Retake"
          disabled={!isPremium}
          color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          onLockedClick={() => setPremiumOverlayOpen(true)}
          onClick={() => {
            setAnswers([]);
            navigate("/exam");
            setHasRetaken(true);
          }}
          icon={
            <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          }
        />
        <ActionButton
          label="Review"
          disabled={!isPremium}
          color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          onLockedClick={() => setPremiumOverlayOpen(true)}
          onClick={() => navigate("/review-answers")}
          icon={
            <>
              <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </>
          }
        />
        <ActionButton
          label={sharing ? "Sharing..." : "Share"}
          color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          onClick={handleShareImage}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          }
        />
      </footer>

      {/* --- HIDDEN SHAREABLE IMAGE COMPONENT (DARK MODE READY) --- */}
      <div className="fixed top-0 left-0 opacity-0 pointer-events-none">
        <div
          ref={shareRef}
          className="w-[350px] h-[500px] bg-slate-50 dark:bg-gray-950 p-7 flex flex-col justify-between shadow-2xl overflow-hidden relative"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 pr-4 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-800">
              <div className="relative">
                <Avatar
                  avatarUrl={userProfile?.avatar_url}
                  size="sm"
                  className="ring-2 ring-blue-50 dark:ring-blue-900/20"
                />
                {isPremium && (
                  <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5 border-2 border-white dark:border-gray-900">
                    <FaCrown className="text-[6px] text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-slate-800 dark:text-white leading-none truncate max-w-[120px]">
                  {userData.full_name}
                </span>
                <span className="text-[9px] font-medium text-slate-400 mt-1 uppercase tracking-tight truncate max-w-[120px]">
                  {userData.college}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-xl">
                <Logo className="w-8 h-8" />
              </div>
              <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tighter text-center mr-1.5">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Center Score */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="bg-blue-100/50 dark:bg-blue-900/30 px-3 py-1 rounded-full mb-4">
              <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                {selectedCourse.name}
              </p>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute size-32 bg-blue-200 dark:bg-blue-500 blur-[40px] opacity-30 dark:opacity-20 rounded-full" />
              <svg className="size-40 -rotate-90 drop-shadow-sm">
                {/* Background Circle (The "grayed out" part) */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  /* CHANGE THIS: Replace className with stroke attribute */
                  stroke={isDarkMode ? "#1f2937" : "#e2e8f0"} // gray-800 for dark, slate-200 for light
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* Progress Circle (The blue part) */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#2563EB"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={
                    2 * Math.PI * 70 -
                    (scorePercentage / 100) * (2 * Math.PI * 70)
                  }
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter">
                  {scorePercentage}
                  <span className="text-xl">%</span>
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Accuracy
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex gap-3 px-2">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-[2rem] flex-1 flex flex-col items-center shadow-sm border border-slate-100 dark:border-gray-800">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">
                Questions
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-800 dark:text-white">
                  {formatNum(questions.length)}
                </span>
                <span className="text-[9px] font-bold text-blue-500 uppercase">
                  {questionType === "theory" ? "thy" : questionType === "fib" ? "fib" : "obj"}
                </span>
              </div>
            </div>
            <div className="bg-slate-900 dark:bg-slate-800 p-4 rounded-[2rem] flex-1 flex flex-col items-center shadow-lg">
              <span className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                Duration
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-white">
                  {minutes}:{seconds}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  Min
                </span>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center pt-2">
            <p className="text-[14px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight italic">
              "Think you can beat this?"
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              Challenge yourself at{" "}
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                quizbolt.site
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 right-6 pointer-events-auto">
        <WhatsAppCard />
      </div>
      {!isPremium && showAd && <BannerAd onAdClose={() => setShowAd(false)} />}
      <ConfirmOverlay
        isOpen={isPremiumOverlayOpen}
        onClose={() => setPremiumOverlayOpen(false)}
        onConfirm={() => navigate("/premium")}
        title="Unlock Premium Analysis"
        message="Get Premium to retake exams instantly and review detailed answers for every question."
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

const StatItem = ({ label, value, color, textColor }) => (
  <div className="flex items-center gap-3 p-2">
    <div className={`size-2 rounded-full ${color}`}></div>
    <div className="flex flex-col">
      <span className={`text-xl font-bold leading-none ${textColor}`}>
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold mt-1">
        {label}
      </span>
    </div>
  </div>
);

const ActionButton = ({
  label,
  icon,
  onClick,
  onLockedClick,
  color,
  disabled,
}) => (
  <button
    onClick={disabled ? onLockedClick : onClick}
    className={`relative flex flex-col items-center gap-2 group ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
  >
    <div
      className={`p-3 rounded-2xl transition-all duration-200 ${!disabled && "group-hover:scale-110 group-active:scale-95"} ${color}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="size-6"
      >
        {icon}
      </svg>
      {disabled && (
        <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1 border-2 border-white dark:border-gray-950 shadow-md">
          <FaCrown className="text-[8px] text-white" />
        </div>
      )}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500 dark:text-gray-400">
      {label}
    </span>
  </button>
);

export default ResultScreen;
