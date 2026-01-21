import { useEffect, useState } from "react";

const RevisionTestModal = ({ onTakeTest }) => {
  const [open, setOpen] = useState(false);

  // Delay before showing modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 750); // 0.75s delay

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-[90%] max-w-md bg-gray-800 rounded-2xl shadow-2xl p-6 animate-[scaleIn_0.25s_ease-out] text-gray-200">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-1 text-white">
            Revision Test Available
          </h2>
          <p className="text-sm text-gray-400">
            EDU 101 – Official Lecturer Revision Questions
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-5 leading-relaxed">
          Prepare with the official revision questions extracted from the lecturer’s PDF. This test simulates real exam conditions.
        </p>

        {/* Test Details */}
        <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <span>📘</span>
            <span className="font-medium text-gray-200">Course:</span>
            <span>EDU 101</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>❓</span>
            <span className="font-medium text-gray-200">Questions:</span>
            <span>30 questions</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>⏱</span>
            <span className="font-medium text-gray-200">Duration:</span>
            <span>10 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>📄</span>
            <span className="font-medium text-gray-200">Source:</span>
            <span>Official lecturer PDF</span>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onTakeTest}
          className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-semibold text-lg
                     hover:bg-blue-500 active:scale-95 transition"
        >
          Take Revision Test
        </button>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default RevisionTestModal;