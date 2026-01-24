import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactGA from "react-ga4";

const ChooseCourseScreen = ({ selectedQuestionCount, setSelectedQuestionCount, courses, selectedCourse, setSelectedCourse }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Determine available question options
  const getAvailableQuestionOptions = (questions) => {
    const options = [30, 50, 70, 100];
    return options.filter(opt => questions.length >= opt).concat(
      questions.length > 0 ? ["All"] : []
    );
  };

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle selecting a course
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedQuestionCount(null); // reset overlay
    ReactGA.event({
      category: "Course",
      action: "Select Course",
      label: course.id,
    });
  };

  // Handle starting exam
  const handleStartExam = () => {
    if (selectedCourse && selectedQuestionCount) {
      navigate("/exam");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div
        className={`flex items-center gap-5 px-5 py-6 sticky top-0 right-0 left-0 bg-gray-50 dark:bg-gray-900 z-50 transition-shadow duration-200 ${isScrolled ? "shadow-sm dark:shadow-black/40" : "shadow-none"
          }`}
      >
        <button
          className="bg-gray-100 dark:bg-gray-700 p-2 rounded-xl shadow-sm active:scale-95 hover:scale-105 duration-200"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold dark:text-gray-200">
          Select Course
        </h1>
      </div>

      {/* Course List */}
      <div className="px-5 space-y-3 flex flex-col items-center">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map(course => (
            <button
              key={course.id}
              onClick={() => handleSelectCourse(course)}
              className={`w-full lg:max-w-2xl text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] ${selectedCourse?.id === course.id
                  ? "bg-indigo-100 border-indigo-400 dark:bg-indigo-900/40 dark:border-indigo-600"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {course.questions?.length || 0} Questions
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {course.name}
                  </h2>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5 15.75 12l-7.5 7.5"
                  />
                </svg>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500">No courses available</p>
        )}
      </div>

      {/* Floating Overlay for Question Count */}
      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center w-11/12 max-w-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              {selectedCourse.name}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Pick number of questions
            </p>
            <div className="flex gap-3 justify-center flex-wrap mb-4">
              {getAvailableQuestionOptions(selectedCourse.questions).map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedQuestionCount(num)}
                  className={`px-5 py-2 rounded-xl font-semibold transition ${selectedQuestionCount === num
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-red-400 hover:text-white"
                    }`}
                >
                  {num === "All" ? "All" : num}
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartExam}
                disabled={!selectedQuestionCount}
                className={`px-6 py-2 rounded-xl font-bold transition shadow-md ${selectedQuestionCount
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                Start Exam
              </button>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseCourseScreen;