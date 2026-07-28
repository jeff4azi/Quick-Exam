import { useCallback, useEffect, useRef, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import CoursePicker from "../components/CoursePicker";
import FlashCard from "../components/FlashCard";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiShuffle,
  FiEye,
  FiEyeOff,
  FiRotateCcw,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import flashCardIcon from "../images/flash-card.webp";

const FREE_CARD_LIMIT = 20;

// ─── helpers ─────────────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── Premium Gate Overlay ─────────────────────────────────────────────────────
const PremiumGateOverlay = ({ onUpgrade, onDismiss }) => (
  <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300" />
    <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95 slide-in-from-bottom-8 duration-300 ease-out">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 size-20 rounded-3xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
          <FaCrown className="text-amber-500" size={36} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
          Free limit reached
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 px-2">
          You&apos;ve studied {FREE_CARD_LIMIT} cards. Upgrade to Premium for
          unlimited flashcards.
        </p>
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={onUpgrade}
            className="w-full py-4 rounded-2xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FaCrown size={14} /> Go Premium
          </button>
          <button
            onClick={onDismiss}
            className="w-full py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Checkbox Row ─────────────────────────────────────────────────────────────
const CheckRow = ({ label, checked, onChange, disabled = false }) => (
  <button
    type="button"
    onClick={() => !disabled && onChange(!checked)}
    className={`flex items-center gap-3 w-full text-left transition-opacity ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
  >
    <span
      className={`size-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors duration-150 ${
        checked
          ? "bg-violet-600 border-violet-600"
          : "border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
      }`}
    >
      {checked && <FiCheck className="size-3 text-white" strokeWidth={3} />}
    </span>
    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
      {label}
    </span>
  </button>
);

// ─── Setup Screen ─────────────────────────────────────────────────────────────
const SetupScreen = ({ course, isPremium, onBack, onStart }) => {
  // Derive available types from course metadata
  const hasObjective = (course?.questionCount || 0) > 0;
  const hasTheory = (course?.theoryQuestionCount || 0) > 0;
  const hasFib = (course?.fibQuestionCount || 0) > 0;

  const hasDifficulty =
    course?.difficultyCounts &&
    Object.values(course.difficultyCounts).some((v) => v > 0);
  const hasSections =
    course?.sectionCounts &&
    Object.values(course.sectionCounts).some((v) => v > 0);

  // Selected question types (start with all available)
  const [selectedTypes, setSelectedTypes] = useState(() => {
    const init = {};
    if (hasObjective) init.objective = true;
    if (hasTheory) init.theory = true;
    if (hasFib) init.fib = true;
    return init;
  });

  // Difficulty filter — only relevant when objective/all selected
  const [selectedDifficulties, setSelectedDifficulties] = useState(() => {
    if (!hasDifficulty) return {};
    const d = {};
    Object.keys(course.difficultyCounts || {}).forEach((k) => {
      if ((course.difficultyCounts[k] || 0) > 0) d[k] = true;
    });
    return d;
  });

  // Section filter
  const [selectedSections, setSelectedSections] = useState(() => {
    if (!hasSections) return {};
    const s = {};
    Object.keys(course.sectionCounts || {}).forEach((k) => {
      if ((course.sectionCounts[k] || 0) > 0) s[k] = true;
    });
    return s;
  });

  const CARD_COUNTS = [10, 20, 30, 50];
  const [cardCount, setCardCount] = useState(20);
  const [doShuffle, setDoShuffle] = useState(true);

  // Estimate available cards given selections
  const estimateAvailable = () => {
    let total = 0;
    if (selectedTypes.objective) {
      let base = course?.questionCount || 0;
      if (hasDifficulty) {
        const activeDiffs = Object.keys(selectedDifficulties).filter(
          (k) => selectedDifficulties[k],
        );
        if (
          activeDiffs.length > 0 &&
          activeDiffs.length < Object.keys(selectedDifficulties).length
        ) {
          base = activeDiffs.reduce(
            (sum, d) => sum + (course?.difficultyCounts?.[d] || 0),
            0,
          );
        }
      }
      total += base;
    }
    if (selectedTypes.theory) total += course?.theoryQuestionCount || 0;
    if (selectedTypes.fib) total += course?.fibQuestionCount || 0;
    return total;
  };

  const available = estimateAvailable();
  const anyTypeSelected = Object.values(selectedTypes).some(Boolean);

  const toggleType = (type) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  const toggleDifficulty = (key) => {
    setSelectedDifficulties((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleSection = (key) => {
    setSelectedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStart = () => {
    if (!anyTypeSelected) return;
    const types = Object.keys(selectedTypes).filter((k) => selectedTypes[k]);
    const difficulties = hasDifficulty
      ? Object.keys(selectedDifficulties).filter((k) => selectedDifficulties[k])
      : null;
    const sections = hasSections
      ? Object.keys(selectedSections).filter((k) => selectedSections[k])
      : null;
    onStart({ types, difficulties, sections, cardCount, doShuffle });
  };

  const showDifficultyFilter =
    hasDifficulty &&
    (selectedTypes.objective || (!selectedTypes.theory && !selectedTypes.fib));
  const showSectionFilter =
    hasSections &&
    (selectedTypes.objective || (!selectedTypes.theory && !selectedTypes.fib));

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col lg:pb-[100px]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md px-6 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all"
          >
            <FiChevronLeft className="size-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Study Session
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {course?.name}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto pb-32">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Question Type */}
          {(hasObjective || hasTheory || hasFib) && (
            <div className="bg-white dark:bg-slate-800 rounded-[1.75rem] p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3.5">
                Question Type
              </p>
              <div className="space-y-3">
                {hasObjective && (
                  <CheckRow
                    label="Objective"
                    checked={!!selectedTypes.objective}
                    onChange={() => toggleType("objective")}
                  />
                )}
                {hasFib && (
                  <CheckRow
                    label="Fill in the Blank"
                    checked={!!selectedTypes.fib}
                    onChange={() => toggleType("fib")}
                  />
                )}
                {hasTheory && (
                  <CheckRow
                    label={
                      <span className="flex items-center gap-2">
                        Theory
                        {!isPremium && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[9px] font-black">
                            <FaCrown size={8} /> PRO
                          </span>
                        )}
                      </span>
                    }
                    checked={!!selectedTypes.theory}
                    onChange={() => isPremium && toggleType("theory")}
                    disabled={!isPremium}
                  />
                )}
              </div>
            </div>
          )}

          {/* Difficulty */}
          {showDifficultyFilter && (
            <div className="bg-white dark:bg-slate-800 rounded-[1.75rem] p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3.5">
                Difficulty
              </p>
              <div className="space-y-3">
                {Object.keys(course.difficultyCounts || {})
                  .filter((k) => (course.difficultyCounts[k] || 0) > 0)
                  .map((diff) => (
                    <CheckRow
                      key={diff}
                      label={diff}
                      checked={!!selectedDifficulties[diff]}
                      onChange={() => toggleDifficulty(diff)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Sections */}
          {showSectionFilter && (
            <div className="bg-white dark:bg-slate-800 rounded-[1.75rem] p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3.5">
                Sections
              </p>
              <div className="space-y-3">
                {Object.keys(course.sectionCounts || {})
                  .filter((k) => (course.sectionCounts[k] || 0) > 0)
                  .map((sec) => (
                    <CheckRow
                      key={sec}
                      label={sec}
                      checked={!!selectedSections[sec]}
                      onChange={() => toggleSection(sec)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Card count */}
          <div className="bg-white dark:bg-slate-800 rounded-[1.75rem] p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-baseline justify-between mb-3.5">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Cards
              </p>
              <p className="text-[11px] font-bold text-violet-600 dark:text-violet-400">
                {available} available
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...CARD_COUNTS, "All"]
                .filter((c) => c === "All" || c <= available)
                .map((c) => {
                  const val = c === "All" ? available : c;
                  const locked = !isPremium && val > FREE_CARD_LIMIT;
                  const isActive = cardCount === val;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => !locked && setCardCount(val)}
                      className={`relative px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                        locked
                          ? "border-gray-100 dark:border-slate-700 text-gray-300 dark:text-slate-600 cursor-not-allowed"
                          : isActive
                            ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                            : "bg-white dark:bg-slate-700/60 border-gray-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-violet-300"
                      }`}
                    >
                      {c}
                      {locked && (
                        <span className="absolute -top-1.5 -right-1 bg-amber-500 rounded-full p-0.5 shadow-sm">
                          <FaCrown className="text-[7px] text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Shuffle */}
          <div className="bg-white dark:bg-slate-800 rounded-[1.75rem] p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3.5">
              Random Order
            </p>
            <CheckRow
              label="Shuffle cards before starting"
              checked={doShuffle}
              onChange={setDoShuffle}
            />
          </div>
        </div>
      </div>

      {/* Start CTA */}
      <div className="fixed bottom-0 inset-x-0 px-6 py-4 bg-gray-50/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-gray-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleStart}
            disabled={!anyTypeSelected || available === 0}
            className="lg:translate-x-30 w-full py-4 rounded-2xl font-black text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-[0.98] text-base"
          >
            Start Studying
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Session Complete Screen ──────────────────────────────────────────────────
const SessionCompleteScreen = ({
  totalViewed,
  reviewCount,
  onReviewAgain,
  onFinish,
}) => (
  <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center px-6">
    <div className="w-full max-w-sm text-center">
      {/* Icon */}
      <div className="mx-auto mb-6 size-24 rounded-3xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center shadow-lg shadow-violet-100 dark:shadow-none">
        <FiCheckCircle className="size-12 text-violet-600 dark:text-violet-400" />
      </div>

      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
        Session Complete
      </h2>
      <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
        You studied {totalViewed} card{totalViewed !== 1 ? "s" : ""}
        {reviewCount > 0 ? `, ${reviewCount} marked for review` : "."}
      </p>

      <div className="flex gap-3">
        {reviewCount > 0 && (
          <button
            onClick={onReviewAgain}
            className="flex-1 py-4 rounded-2xl font-black text-white bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-95"
          >
            Review Again
          </button>
        )}
        <button
          onClick={onFinish}
          className={`flex-1 py-4 rounded-2xl font-black transition-all active:scale-95 ${
            reviewCount > 0
              ? "text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
              : "text-white bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-200 dark:shadow-none"
          }`}
        >
          Finish
        </button>
      </div>
    </div>
  </div>
);

// ─── Study Session (the card experience) ─────────────────────────────────────
const StudySession = ({
  cards,
  course,
  isPremium,
  onFinish,
  onNavigatePremium,
}) => {
  const [queue, setQueue] = useState(() => [...cards]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewSet, setReviewSet] = useState([]); // indices of "Need to Review" cards from original cards array
  const [viewedCount, setViewedCount] = useState(0);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Touch / swipe support
  const touchStartX = useRef(null);
  const cardRef = useRef(null);

  const currentCard = queue[currentIndex] ?? null;
  const total = queue.length;

  // Derive contextual info for the card header
  const topic = currentCard?.topic || currentCard?.section || null;
  const difficulty = currentCard?.difficulty || null;
  const cardNum = currentIndex + 1;

  const handleFlip = () => setIsFlipped((f) => !f);

  const advance = useCallback(() => {
    setIsFlipped(false);
    const next = currentIndex + 1;
    if (next >= total) {
      setIsDone(true);
    } else {
      setCurrentIndex(next);
      setViewedCount((c) => c + 1);
    }
  }, [currentIndex, total]);

  const handleUseful = () => {
    advance();
  };

  const handleNeedReview = () => {
    // Track the original card for review set count
    setReviewSet((prev) => [...prev, currentCard]);
    // Push card to back of queue (append a copy)
    setQueue((prev) => {
      const newQueue = [...prev];
      newQueue.push(currentCard);
      return newQueue;
    });
    advance();
  };


  // Swipe left = next, swipe right = prev (only when not flipped and revealed)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0 && isFlipped) advance(); // swipe left = next
    if (delta > 0 && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsFlipped(false);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (!isFlipped) handleFlip();
        else advance();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
        setIsFlipped(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFlipped, currentIndex, advance]);

  if (isDone) {
    // How many unique "Need to Review" cards were marked
    const uniqueReviewIds = new Set(reviewSet.map((c) => c?.id));
    return (
      <SessionCompleteScreen
        totalViewed={viewedCount + 1}
        reviewCount={uniqueReviewIds.size}
        onReviewAgain={() => {
          // Build a deduplicated review deck
          const seen = new Set();
          const reviewCards = reviewSet.filter((c) => {
            if (seen.has(c?.id)) return false;
            seen.add(c?.id);
            return true;
          });
          setQueue(reviewCards);
          setCurrentIndex(0);
          setIsFlipped(false);
          setReviewSet([]);
          setViewedCount(0);
          setIsDone(false);
        }}
        onFinish={onFinish}
      />
    );
  }

  if (!currentCard) return null;

  // Premium gate check
  if (!isPremium && viewedCount >= FREE_CARD_LIMIT && showPremiumGate) {
    return (
      <PremiumGateOverlay onUpgrade={onNavigatePremium} onDismiss={onFinish} />
    );
  }

  const progress = (cardNum / total) * 100;

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex flex-col transition-colors duration-500">
      {/* Premium gate */}
      {showPremiumGate && (
        <PremiumGateOverlay
          onUpgrade={onNavigatePremium}
          onDismiss={onFinish}
        />
      )}

      {/* Header */}
      {!focusMode ? (
        <div className="sticky top-0 z-30 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-md px-5 pt-6 pb-2">
          <div className="max-w-2xl mx-auto flex justify-between items-center mb-4">
            <button
              onClick={onFinish}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
            >
              <FiChevronLeft className="size-6 text-slate-600 dark:text-slate-300" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-0.5">
                Flashcards
              </span>
              <div className="font-black text-slate-900 dark:text-white">
                {cardNum}{" "}
                <span className="text-slate-400 font-medium">/ {total}</span>
              </div>
            </div>

            {/* Focus Mode toggle */}
            <button
              onClick={() => setFocusMode(true)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
              aria-label="Enable focus mode"
              title="Focus Mode"
            >
              <FiEye className="size-5 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="max-w-2xl mx-auto">
            <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>) : <div className="h-30" />
      }

      {/* Focus mode exit button */}
      {focusMode && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={() => setFocusMode(false)}
            className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
            aria-label="Exit focus mode"
          >
            <FiEyeOff className="size-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>
      )}

      {/* Card area */}
      <div className="flex-1 px-5 pt-4 pb-36 overflow-y-auto flex flex-col">
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
          {/* Contextual info bar */}
          {!focusMode && (topic || difficulty) && (
            <div className="flex items-center gap-2 flex-wrap animate-in fade-in duration-300">
              {topic && (
                <span className="px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 text-[11px] font-bold tracking-wide">
                  {topic}
                </span>
              )}
              {difficulty && (
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                    difficulty === "Easy"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                      : difficulty === "Hard"
                        ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                        : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {difficulty}
                </span>
              )}
            </div>
          )}

          {/* The flip card */}
          <div
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full"
          >
            <FlashCard
              question={currentCard}
              courseId={course?.id}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />
          </div>

          {/* "Did this help?" — only shown after reveal */}
          {isFlipped && (
            <div className="bg-white dark:bg-slate-800 rounded-[1.75rem] p-4 border border-gray-100 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-[11px] font-black uppercase tracking-widest text-center text-slate-400 dark:text-slate-500 mb-3">
                Did this help?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleNeedReview}
                  className="flex-1 py-3 rounded-2xl font-black text-sm text-slate-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 border border-gray-100 dark:border-slate-600 transition-all active:scale-95"
                >
                  👎 Need to Review
                </button>
                <button
                  onClick={handleUseful}
                  className="flex-1 py-3 rounded-2xl font-black text-sm text-white bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-200 dark:shadow-none transition-all active:scale-95"
                >
                  👍 Useful
                </button>
              </div>
            </div>
          )}

          {/* Swipe hint — only before first reveal, not in focus mode */}
          {!isFlipped && !focusMode && cardNum === 1 && (
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 animate-in fade-in duration-500">
              Tap the card to reveal · Swipe to navigate
            </p>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 inset-x-0 px-6 py-3 z-40 lg:translate-x-31">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-3 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-3">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex((i) => i - 1);
                  setIsFlipped(false);
                }
              }}
              disabled={currentIndex === 0}
              className="size-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-20 transition-all active:scale-90"
            >
              <FiChevronLeft size={24} />
            </button>

            <button
              onClick={() => {
                if (!isPremium && viewedCount >= FREE_CARD_LIMIT) {
                  setShowPremiumGate(true);
                  return;
                }
                advance();
              }}
              className="flex-1 h-14 rounded-[1.8rem] font-black text-white bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Next Card <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main FlashcardsScreen ────────────────────────────────────────────────────
const FlashcardsScreen = ({ courses, coursesLoading, isPremium }) => {
  const navigate = useNavigate();
  useDocumentTitle("Flashcards | QuizBolt");

  // phase: "pick" | "setup" | "loading" | "study"
  const [phase, setPhase] = useState("pick");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sessionCards, setSessionCards] = useState([]);
  const [loadError, setLoadError] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setPhase("setup");
  };

  const handleSetupStart = useCallback(
    async ({ types, difficulties, sections, cardCount, doShuffle }) => {
      if (!selectedCourse) return;
      setPhase("loading");
      setLoadError(null);

      try {
        const base =
          selectedCourse.questionsEndpoint ||
          `/courses/${selectedCourse.id}/questions`;
        const baseUrl = `${API_BASE_URL}${base}`;

        const buildUrl = (params = {}) => {
          const url = new URL(baseUrl, window.location.origin);
          Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null) url.searchParams.append(k, v);
          });
          return url.toString();
        };

        let allCards = [];

        // Fetch each requested type
        if (types.includes("objective")) {
          const params = {};
          // Apply difficulty filter if applicable
          if (difficulties && difficulties.length > 0) {
            // Fetch per difficulty and merge
            const fetches = await Promise.all(
              difficulties.map((d) => fetch(buildUrl({ difficulty: d }))),
            );
            const jsons = await Promise.all(fetches.map((r) => r.json()));
            fetches.forEach((r, i) => {
              if (r.ok && Array.isArray(jsons[i])) {
                allCards.push(...jsons[i]);
              }
            });
          } else if (sections && sections.length > 0) {
            // Fetch per section and merge
            const fetches = await Promise.all(
              sections.map((s) => fetch(buildUrl({ section: s }))),
            );
            const jsons = await Promise.all(fetches.map((r) => r.json()));
            fetches.forEach((r, i) => {
              if (r.ok && Array.isArray(jsons[i])) {
                allCards.push(...jsons[i]);
              }
            });
          } else {
            const res = await fetch(buildUrl(params));
            if (res.ok) {
              const data = await res.json();
              if (Array.isArray(data)) allCards.push(...data);
            }
          }
        }

        if (types.includes("theory")) {
          const res = await fetch(buildUrl({ type: "theory" }));
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data))
              allCards.push(...data.map((q) => ({ ...q, type: "theory" })));
          }
        }

        if (types.includes("fib")) {
          const res = await fetch(buildUrl({ type: "fib" }));
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data))
              allCards.push(...data.map((q) => ({ ...q, type: "fib" })));
          }
        }

        // Deduplicate by id
        const seen = new Set();
        allCards = allCards.filter((c) => {
          if (!c?.id || seen.has(c.id)) return false;
          seen.add(c.id);
          return true;
        });

        if (allCards.length === 0) {
          setLoadError("No cards found for the selected filters.");
          setPhase("setup");
          return;
        }

        // Shuffle if requested
        const ordered = doShuffle ? shuffle(allCards) : allCards;

        // Slice to card count
        const picked = ordered.slice(0, cardCount);

        setSessionCards(picked);
        setPhase("study");
      } catch (err) {
        console.error("[Flashcards] fetch error:", err);
        setLoadError("Failed to load cards. Please try again.");
        setPhase("setup");
      }
    },
    [selectedCourse],
  );

  const handleFinish = () => {
    setPhase("pick");
    setSelectedCourse(null);
    setSessionCards([]);
    setLoadError(null);
  };

  // ── phase: pick ──
  if (phase === "pick") {
    return (
      <CoursePicker
        courses={courses}
        loading={coursesLoading}
        onSelect={handleCourseSelect}
        onBack={() => navigate("/")}
        title="Flashcards"
        subtitle="Pick a course to study"
        mode="flashcard"
      />
    );
  }

  // ── phase: setup ──
  if (phase === "setup") {
    return (
      <>
        {loadError && (
          <div className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-sm pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300">
              {loadError}
            </div>
          </div>
        )}
        <SetupScreen
          course={selectedCourse}
          isPremium={isPremium}
          onBack={() => {
            setPhase("pick");
            setSelectedCourse(null);
            setLoadError(null);
          }}
          onStart={handleSetupStart}
        />
      </>
    );
  }

  // ── phase: loading ──
  if (phase === "loading") {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-violet-500/10 animate-ping" />
            <div className="relative size-16 rounded-3xl bg-white dark:bg-slate-800 border border-violet-100 dark:border-slate-700 flex items-center justify-center shadow-lg">
              <FiLoader className="size-8 text-violet-600 animate-spin" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Preparing your cards...
          </p>
        </div>
      </div>
    );
  }

  // ── phase: study ──
  if (phase === "study") {
    return (
      <StudySession
        cards={sessionCards}
        course={selectedCourse}
        isPremium={isPremium}
        onFinish={handleFinish}
        onNavigatePremium={() => navigate("/premium")}
      />
    );
  }

  return null;
};

export default FlashcardsScreen;
