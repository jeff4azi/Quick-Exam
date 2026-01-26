import React from "react";

const ConfirmOverlay = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
  danger = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-11/12 max-w-md p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{title}</h2>

        {/* Message */}
        <p className="text-slate-700 dark:text-slate-300 mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-slate-900 dark:text-slate-100 font-semibold hover:brightness-105 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-xl font-semibold text-white shadow-md transition hover:brightness-110 ${danger ? "bg-red-500 dark:bg-red-600" : "bg-green-500 dark:bg-green-600"
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOverlay;