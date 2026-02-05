import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ReactGA from "react-ga4";
import { supabase } from "../supabaseClient";
import {
  FiChevronLeft,
  FiBookOpen,
  FiLayers,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

// REMOVED: export default StartExam; (This was causing the conflict)

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
  const [userProfile, setUserProfile] = useState(null); // Changed from profile to userProfile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get the currently authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) return setUserProfile(null);

        // 2️⃣ Fetch the user's profile row from 'profiles' table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (profileError) throw profileError;

        // 3️⃣ Merge the data and set profile
        setUserProfile({
          full_name: user.user_metadata?.full_name || "Scholar",
          college: profileData?.college || "TASUED",
          department: profileData?.department || "General Studies",
          year: profileData?.year || "1",
        });

      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Extract college from Supabase profile (e.g., "COSIT", "COVTED")
  const userCollege = userProfile?.college; // Changed from profile to userProfile

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

      // show to everyone
      if (course.colleges.includes("ALL")) return true;

      // show if user's college matches
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
            <FiChevronLeft className="size-6 text-slate-600 dark:text-slate-300" />
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

      {/* COURSE LIST */}
      <main className="max-w-2xl mx-auto px-6 mt-4 space-y-10">
        {groupOrder.map(group =>
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
        )}
      </main>

      {/* QUESTION COUNT MODAL */}
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
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedCourse.name}</h3>
              <p className="text-slate-500 text-sm mt-1 font-medium italic">{selectedCourse.title}</p>

              <div className="grid grid-cols-2 gap-3 mt-8">
                {getAvailableQuestionOptions(selectedCourse.questions).map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedQuestionCount(num)}
                    className={`py-4 rounded-2xl font-black transition-all ${
                      selectedQuestionCount === num
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
                    }`}
                  >
                    {num === "All" ? "Full Exam" : `${num} Qs`}
                  </button>
                ))}
              </div>

              <button
                onClick={handleStartExam}
                disabled={!selectedQuestionCount}
                className="w-full mt-6 py-4 rounded-2xl font-black bg-blue-600 text-white disabled:bg-gray-300 transition-all shadow-xl shadow-blue-100 dark:shadow-none"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseCourseScreen;