import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ReactGA from "react-ga4";
import {
  FiChevronLeft,
  FiBookOpen,
  FiLayers,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

const ChooseCourseScreen = ({
  selectedQuestionCount,
  setSelectedQuestionCount,
  courses,
  selectedCourse,
  setSelectedCourse,
  setAnswers,
  userProfile, 
  loadingProfile
}) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const userCollege = userProfile?.college;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ----------------------------- FILTER COURSES ----------------------------- */
  const filteredCourses = useMemo(() => {
    if (!Array.isArray(courses)) return [];
    return courses.filter(course => {
      if (!Array.isArray(course.colleges)) return false;
      if (course.colleges.includes("ALL")) return true;
      if (!userCollege) return false;
      return course.colleges.includes(userCollege);
    });
  }, [courses, userCollege]);

  /* ----------------------------- GROUP COURSES ------------------------------ */
  const groupedCourses = useMemo(() => {
    return filteredCourses.reduce((acc, course) => {
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
  const getAvailableQuestionOptions = questions => {
    const options = [30, 50, 70, 100];
    const filtered = options.filter(opt => (questions?.length || 0) >= opt);
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
    setAnswers([]);
    navigate("/exam");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-500 pb-10">
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-all"
          >
            <FiChevronLeft className="-translate-x-1/18 size-6 text-slate-600 dark:text-slate-300" />
          </button>
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
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-2xl mx-auto px-6 mt-4 space-y-10">
        {loadingProfile ? (
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
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">No Courses Available</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-[280px] leading-relaxed font-medium">
              We couldn't find any 100 level courses for your profile. 
              {userProfile?.year !== "1" && " Access is currently restricted to 100 Level students."}
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
          groupOrder.map(group =>
            groupedCourses[group]?.length > 0 ? (
              <section key={group} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 mb-4 px-1">
                  <FiLayers className="text-blue-600 dark:text-blue-400" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
                    {groupTitles[group]}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {groupedCourses[group].map(course => {
                    const isSelected = selectedCourse?.id === course.id;
                    return (
                      <button
                        key={course.id}
                        onClick={() => handleSelectCourse(course)}
                        className={`group w-full text-left p-5 rounded-[2rem] border-2 transition-all active:scale-[0.98] ${
                          isSelected
                            ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200"
                            : "bg-white dark:bg-slate-800 border-white dark:border-slate-800 hover:border-blue-100 shadow-sm"
                        }`}
                      >
                        <div className="flex justify-between">
                          <div className="max-w-[80%]">
                            <h2 className={`text-xl font-black ${isSelected ? "text-white" : "text-slate-900 dark:text-white"}`}>
                              {course.name}
                            </h2>
                            <p className={`text-sm mt-1 leading-snug ${isSelected ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>
                              {course.title}
                            </p>

                            {/* RE-ADDED THE BADGE STYLING */}
                            <div className={`inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                            }`}>
                              <FiBookOpen />
                              {course.questions?.length || 0} Questions
                            </div>
                          </div>

                          <div className={`size-10 shrink-0 rounded-2xl flex items-center justify-center ${
                            isSelected ? "bg-white text-blue-600" : "bg-gray-50 dark:bg-slate-700 text-gray-300"
                          }`}>
                            {isSelected ? <FiCheckCircle size={22} /> : <FiChevronLeft className="rotate-180" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : null
          )
        )}
      </main>

      {/* QUESTION COUNT MODAL - ORIGINAL STYLING */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedCourse(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95">
            <button onClick={() => setSelectedCourse(null)} className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:bg-gray-100"><FiX /></button>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedCourse.name}</h3>
              <p className="text-slate-500 text-sm mt-1 font-medium italic">{selectedCourse.title}</p>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {getAvailableQuestionOptions(selectedCourse.questions).map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedQuestionCount(num)}
                    className={`py-4 rounded-2xl font-black transition-all ${
                      selectedQuestionCount === num ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
                    }`}
                  >
                    {num === "All" ? "Full Exam" : `${num} Qs`}
                  </button>
                ))}
              </div>
              <button onClick={handleStartExam} disabled={!selectedQuestionCount} className="w-full mt-6 py-4 rounded-2xl font-black bg-blue-600 text-white disabled:bg-gray-300 shadow-xl shadow-blue-100 dark:shadow-none">Start Exam</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseCourseScreen;