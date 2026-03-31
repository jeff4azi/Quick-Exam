import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ReactGA from "react-ga4";
import {
  FiBookOpen,
  FiLayers,
  FiX,
} from "react-icons/fi";
import { FaCrown, FaWhatsapp } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import ConfirmOverlay from "../components/ConfirmOverlay";
import NavBar from "../components/NavBar";
import {
  loadFavouriteCourseIds,
  toggleFavouriteCourseId,
} from "../utils/favouriteCourses";
import { clearExamSession } from "../utils/examSessionStorage";

const ChooseCourseScreen = ({
  selectedQuestionCount,
  setSelectedQuestionCount,
  courses,
  selectedCourse,
  setSelectedCourse,
  setAnswers,
  userProfile,
  loadingProfile,
  isPremium,
  coursesLoading,
  questionType,
  setQuestionType,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);
  const [theoryOverlayOpen, setTheoryOverlayOpen] = useState(false);
  const [favouriteIds, setFavouriteIds] = useState(() =>
    loadFavouriteCourseIds(),
  );

  const userCollege = userProfile?.college;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ----------------------------- FILTER COURSES ----------------------------- */
  const filteredCourses = useMemo(() => {
    if (!Array.isArray(courses)) return [];
    return courses.filter((course) => {
      if (!course) return false;
      if (!Array.isArray(course.colleges)) return false;
      const collegeMatch =
        course.colleges.includes("ALL") ||
        (userCollege && course.colleges.includes(userCollege));
      if (!collegeMatch) return false;
      if (questionType === "theory") return (course.theoryQuestionCount || 0) > 0;
      return true;
    });
  }, [courses, userCollege, questionType]);

  // If Home deep-links to a course, preselect it
  useEffect(() => {
    try {
      const params = new URLSearchParams(location?.search || "");
      const courseId = params.get("course");
      if (!courseId) return;
      const match = filteredCourses.find((c) => c?.id === courseId);
      if (match) {
        setSelectedCourse(match);
        setSelectedQuestionCount(null);
      }
    } catch {
      // ignore
    }
  }, [
    filteredCourses,
    location?.search,
    setSelectedCourse,
    setSelectedQuestionCount,
  ]);

  /* ----------------------------- GROUP COURSES ------------------------------ */
  const groupedCourses = useMemo(() => {
    return filteredCourses.reduce((acc, course) => {
      if (!course) return acc;
      if (!acc[course.group]) acc[course.group] = [];
      acc[course.group].push(course);
      return acc;
    }, {});
  }, [filteredCourses]);

  const groupTitles = {
    general: "General Courses",
    departmental: "Departmental Courses",
    vocational: "Vocational Courses",
  };

  const groupOrder = ["general", "departmental", "vocational"];

  /* ----------------------------- HELPERS ------------------------------------ */
  const getAvailableQuestionOptions = (course) => {
    if (questionType === "theory") {
      const theoryOptions = [3, 5, 7, 10];
      const count = course?.theoryQuestionCount || 0;
      const filtered = theoryOptions.filter(opt => count >= opt);
      return [...filtered, "All"];
    }
    const options = [30, 50, 70, 100];
    const filtered = options.filter(opt => (course?.questionCount || 0) >= opt);
    return [...filtered, "All"];
  };

  const handleSelectCourse = course => {
    setSelectedCourse(course);
    setSelectedQuestionCount(null);
    ReactGA.event({
      category: "Course",
      action: "Select Course",
      label: course.id,
    });
  };

  const handleStartExam = () => {
    if (!selectedCourse || !selectedQuestionCount) return;
    clearExamSession();
    setAnswers([]);
    navigate("/exam");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-500 pb-32">
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-slate-800"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Select Course
            </h1>
            {userCollege && (
              <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                {userCollege} Faculty
              </p>
            )}
          </div>
          <a
            href="https://wa.me/2348134497640?text=Hello%20I%20want%20to%20request%20a%20course.%0A%0ASchool:%20%0ACourse%20Name:%20%0ADo%20you%20have%20materials%3F%20(Yes%2FNo)%0A%0AI%20understand%20I%20need%20to%20send%20PDFs%20or%20notes."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto px-4 py-2 text-xs font-black rounded-xl bg-green-500 text-white shadow-md active:scale-95 flex items-center gap-1 transition-all"
          >
            <FaWhatsapp className="inline-block size-4 mr-1" />
            Request Course
          </a>
        </div>

        {/* TABS */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="inline-flex bg-gray-100 dark:bg-slate-800 rounded-2xl p-1 gap-1">
            {[
              { key: "objective", label: "Objective" },
              { key: "theory", label: "Theory" },
            ].map(({ key, label }) => {
              const isLocked = key === "theory" && !isPremium;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (isLocked) {
                      setTheoryOverlayOpen(true);
                      return;
                    }
                    setQuestionType(key);
                    setSelectedCourse(null);
                    setSelectedQuestionCount(null);
                  }}
                  className={`relative px-5 py-2 rounded-xl text-xs font-black transition-all ${questionType === key
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                >
                  {label}
                  {isLocked && (
                    <div className="absolute -top-2 -right-2 bg-amber-400 dark:bg-yellow-500 rounded-full p-1 border-2 border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-center">
                      <FaCrown className="text-[7px] text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-2xl mx-auto px-6 mt-4 space-y-10">
        {loadingProfile || coursesLoading ? (
          <div className="flex justify-center py-20 text-slate-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">
            Fetching Courses...
          </div>
        ) : filteredCourses.length === 0 ? (
          /* EMPTY STATE - RESTORED STYLING */
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
              <div className="relative size-24 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl flex items-center justify-center border border-gray-100 dark:border-slate-700">
                <FiLayers className="size-10 text-blue-500" />
                <FiX className="absolute -top-1 -right-1 size-6 text-red-500 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Nothing here yet
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-[280px] leading-relaxed font-medium">
              We don’t have courses for your faculty at the moment. We’re
              actively adding more courses stay tuned.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-8 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg"
            >
              Go Back Home
            </button>
          </div>
        ) : (
          /* COURSE LIST - FULL ORIGINAL STYLING */
          groupOrder.map((group) =>
            groupedCourses[group]?.length > 0 ? (
              <section
                key={group}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <div className="flex items-center gap-3 mb-4 px-1">
                  <FiLayers className="text-blue-600 dark:text-blue-400" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
                    {groupTitles[group]}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {groupedCourses[group].map((course) => {
                    const isSelected = selectedCourse?.id === course.id;
                    const isFavourite = favouriteIds.includes(course.id);
                    return (
                      <div
                        key={course.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelectCourse(course)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelectCourse(course);
                          }
                        }}
                        className={`group w-full text-left p-5 rounded-[2rem] border-2 transition-all active:scale-[0.98] cursor-pointer ${isSelected
                            ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200"
                            : "bg-white dark:bg-slate-800 border-white dark:border-slate-800 hover:border-blue-100 shadow-sm"
                          }`}
                      >
                        <div className="flex justify-between">
                          <div className="max-w-[80%]">
                            <h2
                              className={`text-xl font-black ${isSelected ? "text-white" : "text-slate-900 dark:text-white"}`}
                            >
                              {course.name}
                            </h2>
                            <p
                              className={`text-sm mt-1 leading-snug ${isSelected ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}
                            >
                              {course.title}
                            </p>

                            {/* RE-ADDED THE BADGE STYLING */}
                            <div
                              className={`inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                                }`}
                            >
                              <FiBookOpen />
                              {(questionType === "theory" ? course.theoryQuestionCount : course.questionCount) || 0} Questions
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const next = toggleFavouriteCourseId(course.id);
                                setFavouriteIds(next);
                              }}
                              className={`size-10 shrink-0 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${isSelected
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300"
                                }`}
                              title={
                                isFavourite
                                  ? "Remove from favourites"
                                  : "Add to favourites"
                              }
                              aria-pressed={isFavourite}
                            >
                              {isFavourite ? (
                                <IoHeart
                                  className={
                                    isSelected ? "text-white" : "text-rose-500"
                                  }
                                  size={22}
                                />
                              ) : (
                                <IoHeartOutline size={22} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null,
          )
        )}
      </main>

      {/* QUESTION COUNT MODAL - ORIGINAL STYLING */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setSelectedCourse(null)}
          />
          <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:bg-gray-100"
            >
              <FiX />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {selectedCourse.name}
              </h3>
              <p className="text-slate-500 text-sm mt-1 font-medium italic">
                {selectedCourse.title}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {getAvailableQuestionOptions(selectedCourse).map(
                  (num) => {
                    const isLocked = !isPremium && num !== 30; // Only 30 questions allowed for free users

                    return (
                      <button
                        key={num}
                        onClick={() => {
                          if (isLocked) {
                            setPremiumOverlayOpen(true);
                            return;
                          }
                          setSelectedQuestionCount(num);
                        }}
                        className={`relative py-4 rounded-2xl font-black transition-all ${selectedQuestionCount === num
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                            : "bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
                          } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        {num === "All" ? "Full Exam" : `${num} Qs`}

                        {/* PREMIUM OVERLAY ICON */}
                        {isLocked && (
                          <div className="absolute -top-2 -right-2 bg-amber-400 dark:bg-yellow-500 rounded-full p-1 border-2 border-gray-50 dark:border-slate-900 shadow-sm flex items-center justify-center">
                            <FaCrown className="text-[8px] text-white" />
                          </div>
                        )}
                      </button>
                    );
                  },
                )}
              </div>
              <button
                onClick={handleStartExam}
                disabled={!selectedQuestionCount}
                className="w-full mt-6 py-4 rounded-2xl font-black bg-blue-600 text-white disabled:bg-gray-300 shadow-xl shadow-blue-100 dark:shadow-none"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmOverlay
        isOpen={isPremiumOverlayOpen}
        onClose={() => setPremiumOverlayOpen(false)}
        onConfirm={() => navigate("/premium")}
        title="Unlock Full Exam Access"
        message="Upgrade to Premium to unlock longer exams and full-question modes for all your courses."
        confirmText="Get Premium"
        cancelText="Maybe later"
      />

      <ConfirmOverlay
        isOpen={theoryOverlayOpen}
        onClose={() => setTheoryOverlayOpen(false)}
        onConfirm={() => navigate("/premium")}
        title="Theory Mode is Premium"
        message="Upgrade to Premium to access theory questions and test your written knowledge across all courses."
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

export default ChooseCourseScreen;