import { useNavigate } from "react-router-dom"

const ChooseCourseOverlay = ({ setShowChooseCourseOverlay, setQuestions, getRandom30, courses, selectedCourse, setSelectedCourse }) => {
  
  const navigate = useNavigate();

  const startExam = () => {
    navigate("/exam")
  }

  return (
    <div onClick={() => setShowChooseCourseOverlay(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div onClick={e => e.stopPropagation()} className="w-[90%] max-w-md bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold">Select Course</h2>

          <button onClick={() => setShowChooseCourseOverlay(false)} className="p-1 bg-[#DC2626] rounded-lg text-white flex items-center justify-center hover:scale-105 duration-200 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 focus:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-3 no-scrollbar">
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map(course => (
              <button
                key={course.id}
                onClick={() => {
                  setSelectedCourse(course);
                  setQuestions(getRandom30(course.questions));
                  startExam();
                }}
                className={`w-full py-4 rounded-lg ${selectedCourse?.id === course.id
                    ? "bg-gray-400"
                    : "bg-gray-100 hover:bg-gray-200 duration-200 ease-in active:bg-gray-300"
                  }`}
              >
                {course.name.toUpperCase()}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500">No courses available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChooseCourseOverlay