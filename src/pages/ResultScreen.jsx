import { useNavigate } from "react-router-dom";
import WhatsAppCard from "../components/WhatsAppCard";
import { useEffect, useState, useRef } from "react";
import ReactGA from "react-ga4";
import BannerAd from "../components/BannerAd";
import ConfirmOverlay from "../components/ConfirmOverlay";
import { FaCrown } from "react-icons/fa";
import Avatar from "../components/Avatar";
import NavBar from "../components/NavBar";

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
}) => {
  const navigate = useNavigate();
  const [showAd, setShowAd] = useState(true);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);
  const [sharing, setSharing] = useState(false);

  const userData = userProfile || { full_name: "Scholar", college: "" }; // use App.jsx profile

  const formatNum = (num) => String(num).padStart(2, "0");
  const answeredCount = answers.filter((a) => a !== undefined).length;

  const shareRef = useRef(null);

  useEffect(() => {
    ReactGA.event({
      category: "Exam",
      action: "View Results",
      label: selectedCourse.id,
    });
  }, [selectedCourse.id]);

  const handleShareImage = async () => {
    setSharing(true);
    if (!shareRef.current) return;

    try {
      const dataUrl = await toPng(shareRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 🔥 makes image sharp
        backgroundColor: "#ffffff", // 🔥 prevents dark/transparent issues
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
        // fallback
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

  const getLatestResult = () => {
    const history = JSON.parse(localStorage.getItem("examHistory")) || [];
    const courseResults = history.filter(
      (r) => r.course === selectedCourse.name,
    );
    return courseResults.length > 0
      ? courseResults[courseResults.length - 1]
      : null;
  };

  const latestResult = getLatestResult();
  if (!latestResult) return null;

  const timeTaken = latestResult?.timeTaken ?? 0;
  const minutes = String(Math.floor(timeTaken / 60)).padStart(2, "0");
  const seconds = String(timeTaken % 60).padStart(2, "0");

  const scorePercentage = Math.round(
    (results.correct / questions.length) * 100,
  );
  const strokeDasharray = 2 * Math.PI * 90;
  const strokeDashoffset =
    strokeDasharray - (scorePercentage / 100) * strokeDasharray;

  // DYNAMIC FEEDBACK LOGIC
  const getFeedback = () => {
    if (scorePercentage >= 80)
      return {
        msg: `Outstanding work, ${userData.full_name.split(" ")[0]}! You've mastered this.`,
        color: "text-green-500",
      };
    if (scorePercentage >= 60)
      return {
        msg: `Great job, ${userData.full_name.split(" ")[0]}! You're on the right track.`,
        color: "text-blue-500",
      };
    if (scorePercentage >= 45)
      return {
        msg: `Good effort, ${userData.full_name.split(" ")[0]}. A little more study and you'll ace it!`,
        color: "text-amber-500",
      };
    return {
      msg: `Don't give up, ${userData.full_name.split(" ")[0]}. Review your errors and try again!`,
      color: "text-red-500",
    };
  };

  const feedback = getFeedback();

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-gray-950 p-6 lg:p-10 pb-32 flex flex-col lg:max-w-2xl mx-auto transition-colors duration-300">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 py-2 px-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider font-bold">
            Time
          </span>
          <span className="font-mono text-[#2563EB] dark:text-[#22D3EE] font-bold text-lg">
            {minutes}:{seconds}
          </span>
        </div>

        {/* Profile picture and college */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-gray-800 dark:text-gray-200 leading-none">
              {userData.full_name}
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
              {userData.college}
            </p>
          </div>

          {/* Avatar Container */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
          >
            <Avatar
              avatarUrl={userProfile?.avatar_url}
              size="sm"
              className="shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300"
            />

            {/* Premium Crown Badge */}
            {isPremium && (
              <div className="absolute -top-1 -right-1 bg-amber-400 dark:bg-yellow-500 rounded-full p-1 border-2 border-white dark:border-gray-950 shadow-md flex items-center justify-center">
                <FaCrown className="text-[8px] text-white" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Main Score Visual */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8">
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
              className="text-[#2563EB] dark:text-[#22D3EE] stroke-round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform duration-300">
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
          <p
            className={`text-sm mt-2 font-bold leading-relaxed ${feedback.color}`}
          >
            {feedback.msg}
          </p>
          {userData.college && (
            <span className="inline-block mt-3 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase rounded-full tracking-widest">
              {userData.college}
            </span>
          )}
        </div>

        {/* Detailed Stats Grid */}
        <div className="bg-white dark:bg-gray-900 w-full p-6 grid grid-cols-2 gap-4 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
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

      {/* Footer Actions */}
      <footer className="mt-10 flex justify-around items-center bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
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
          onClick={() => {
            navigate("/review-answers");
          }}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          }
        />
      </footer>

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

      <div className="fixed top-0 left-0 opacity-0 pointer-events-none">
        <div
          ref={shareRef}
          className="w-[350px] h-[500px] bg-white rounded-3xl p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-black text-gray-800">QuizBolt ⚡</h1>

            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">
              RESULT
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              {selectedCourse.name}
            </p>

            <div className="text-7xl font-black text-blue-600 mt-3">
              {scorePercentage}%
            </div>

            <p className="text-gray-500 text-sm mt-3 px-4">{feedback.msg}</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">Can you beat my score?</p>

            <div className="text-[10px] text-gray-300">quizbolt.site</div>
          </div>
        </div>
      </div>
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
      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-1">
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
    className={`relative flex flex-col items-center gap-2 group ${
      disabled ? "cursor-not-allowed opacity-60" : ""
    }`}
  >
    <div
      className={`p-3 rounded-2xl transition-all duration-200 ${
        !disabled && "group-hover:scale-110 group-active:scale-95"
      } ${color}`}
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

      {/* Crown Overlay */}
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
