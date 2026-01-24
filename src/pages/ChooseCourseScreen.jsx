import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import ReactGA from "react-ga4";

const ChooseCourseScreen = ({ courses, selectedCourse, setSelectedCourse }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 0);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            className="size-6"
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

      <div className="px-5 space-y-3 flex flex-col items-center">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map(course => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                navigate("/exam");
                ReactGA.event({
                  category: "Course",
                  action: "Select Course",
                  label: course.id,
                });
              }}
              className={`w-full lg:max-w-2xl text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.98]
    ${selectedCourse?.id === course.id
                  ? "bg-indigo-100 border-indigo-400 dark:bg-indigo-900/40 dark:border-indigo-600"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  {/* Number of Questions */}
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {course.questions?.length || 0} Questions
                  </p>
                  {/* Course Name */}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {course.name}
                  </h2>
                </div>

                {/* Right side arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-gray-400"
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
    </div>
  )
}

export default ChooseCourseScreen