import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import { FiChevronLeft, FiBookOpen, FiLayers, FiCheckCircle, FiX } from "react-icons/fi";

const ChooseCourseScreen = ({
  selectedQuestionCount,
  setSelectedQuestionCount,
  courses,
  selectedCourse,
  setSelectedCourse,
  setAnswers,
}) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAvailableQuestionOptions = (questions) => {
    const options = [30, 50, 70, 100];
    const filtered = options.filter((opt) => (questions?.length || 0) >= opt);
    return [...filtered, "All"];
  };

  const groupedCourses = Array.isArray(courses)
    ? courses.reduce((acc, course) => {
        if (!acc[course.group]) acc[course.group] = [];
        acc[course.group].push(course);
        return acc;
      }, {})
    : {};

  const groupTitles = {
    general: "General Courses",
    departmental: "Departmental Courses",
    vocational: "Vocational Courses",
  };

  const groupOrder = ["general", "departmental", "vocational"];

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedQuestionCount(null);
    ReactGA.event({
      category: "Course",
      action: "Select Course",
      label: course.id,
    });
  };

  const handleStartExam = () => {
    if (selectedCourse && selectedQuestionCount) {
      setAnswers([]);
      navigate("/exam");
    }
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
            <FiChevronLeft className="size-6 text-slate-600 dark:text-slate-300" />
          </button>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Select Course
          </h1>
        </div>
      </header>

      {/* COURSE LIST CONTAINER */}
      <main className="max-w-2xl mx-auto px-6 mt-4 space-y-10">
        {groupOrder.map((group) => (
          groupedCourses[group]?.length > 0 && (
            <section key={group} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3 mb-4 px-1">
                <FiLayers className="text-blue-600 dark:text-blue-400" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
                  {groupTitles[group]}
                </h3>
              </div>

              <div className="grid gap-4">
                {groupedCourses[group].map((course) => {
                  const isSelected = selectedCourse?.id === course.id;
                  return (
                    <button
                      key={course.id}
                      onClick={() => handleSelectCourse(course)}
                      className={`group relative w-full text-left p-5 rounded-[2rem] border-2 transition-all duration-300 active:scale-[0.98] ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200 dark:shadow-none"
                          : "bg-white dark:bg-slate-800 border-white dark:border-slate-800 hover:border-blue-100 dark:hover:border-slate-700 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className={`text-xl font-black tracking-tight ${isSelected ? "text-white" : "text-slate-900 dark:text-white"}`}>
                            {course.name.toUpperCase()}
                          </h2>
                          <p className={`text-sm font-medium leading-snug ${isSelected ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>
                            {course.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                          </p>
                          <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isSelected ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          }`}>
                            <FiBookOpen />
                            {course.questions?.length || 0} Questions
                          </div>
                        </div>
                        
                        <div className={`size-10 rounded-2xl flex items-center justify-center transition-all ${
                          isSelected ? "bg-white text-blue-600" : "bg-gray-50 dark:bg-slate-700 text-gray-300"
                        }`}>
                          {isSelected ? <FiCheckCircle size={22} /> : <FiChevronLeft className="rotate-180" size={20} />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )
        ))}
      </main>

      {/* QUESTION COUNT MODAL (Standardized with your ConfirmOverlay style) */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedCourse(null)} />
          
          <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-sm p-8 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400"
            >
              <FiX size={20} />
            </button>

            <div className="text-center">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                Setup Exam
              </span>
              <h3 className="mt-4 text-2xl font-black text-slate-900 dark:text-white">
                {selectedCourse.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                How many questions do you want to attempt?
              </p>

              <div className="grid grid-cols-2 gap-3 mt-8">
                {getAvailableQuestionOptions(selectedCourse.questions).map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedQuestionCount(num)}
                    className={`py-4 rounded-2xl font-black transition-all active:scale-95 border-2 ${
                      selectedQuestionCount === num
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-50 dark:bg-slate-700 border-transparent text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {num === "All" ? "Full Exam" : `${num} Qs`}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <button
                  onClick={handleStartExam}
                  disabled={!selectedQuestionCount}
                  className={`w-full py-4.5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-2 ${
                    selectedQuestionCount
                      ? "bg-blue-600 text-white shadow-blue-200 dark:shadow-none hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Start Now
                  <FiChevronLeft className="rotate-180" />
                </button>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="w-full py-3 font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseCourseScreen;