import React from 'react'

const ChooseCourseOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-[90%] max-w-md bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold">Select Course</h2>

          <button className="p-2 bg-[#DC2626] rounded-lg text-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
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
          <button className="w-full py-4 bg-gray-100 rounded-lg">CSC 101</button>
          <button className="w-full py-4 bg-gray-100 rounded-lg">MTH 102</button>
          <button className="w-full py-4 bg-gray-100 rounded-lg">PHY 103</button>
          <button className="w-full py-4 bg-gray-100 rounded-lg">CHM 104</button>
          <button className="w-full py-4 bg-gray-100 rounded-lg">BIO 105</button>
          <button className="w-full py-4 bg-gray-100 rounded-lg">ENG 106</button>
        </div>
      </div>
    </div>
  )
}

export default ChooseCourseOverlay