import React from 'react'

const ChooseCourseOverlay = ({setShowChooseCourseOverlay}) => {
  return (
    <div onClick={() => setShowChooseCourseOverlay(false)}  className="fixed inset-0 bg-black/50 flex items-center justify-center">
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
          <button className="course-button">CSC 101</button>
          <button className="course-button">MTH 102</button>
          <button className="course-button">PHY 103</button>
          <button className="course-button">CHM 104</button>
          <button className="course-button">BIO 105</button>
          <button className="course-button">ENG 106</button>
        </div>
      </div>
    </div>
  )
}

export default ChooseCourseOverlay