import React, { useState, useEffect } from "react";

const WhatsAppCard = () => {
  const [visible, setVisible] = useState(false); // slide-in control
  const [show, setShow] = useState(true); // visibility control

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    e.preventDefault(); // prevent navigation from <a>
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 w-64 
    bg-green-500 bg-gradient-to-r from-green-400 to-green-600 
    text-white rounded-xl shadow-lg p-4 flex items-center gap-3 cursor-pointer transform transition-transform duration-500
    ${visible ? "translate-x-0" : "translate-x-[150%]"}`}
    >
      {/* WhatsApp Link */}
      <a
        href="https://chat.whatsapp.com/FMPmsBbwU9kL6t2vJ6C8qq"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 flex-1"
      >
        {/* WhatsApp Icon */}
        <div>
          <svg
            fill="none"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
          >
            <path
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6,59a1,1,0,0,1-.95-1.32L9,46.06A27.1,27.1,0,0,1,13,13,26.93,26.93,0,0,1,51,13h0A26.94,26.94,0,0,1,20.22,56.23L6.2,59Zm14.35-4.85a1,1,0,0,1,.45.11A24.94,24.94,0,0,0,49.63,14.37h0a24.93,24.93,0,0,0-35.26,0,25.08,25.08,0,0,0-3.4,31,1,1,0,0,1,.1.86L7.51,56.72,20.17,54.2Z"
            />
            <path
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M39.17,46a8.46,8.46,0,0,1-.92,0c-5.31-.58-12-5.83-13.89-7.68h0c-1.85-1.85-7.11-8.58-7.68-13.89-.46-4.24,2.37-7.12,3.61-8.17a2.87,2.87,0,0,1,2-.69l2.7.09a1,1,0,0,1,.9.65c.6,1.59,2.54,6.88,2.54,8.25,0,1.2-1.06,2.13-2,2.95-.2.17-.47.41-.63.58a28.74,28.74,0,0,0,3.61,5.16,28.77,28.77,0,0,0,5.16,3.61c.17-.17.41-.44.58-.63.82-.94,1.75-2,3-2,1.37,0,6.66,1.94,8.25,2.54a1,1,0,0,1,.65.9l.09,2.7a3,3,0,0,1-.69,2A9.82,9.82,0,0,1,39.17,46ZM25.78,36.88c1.65,1.65,8,6.6,12.69,7.11,3.29.35,5.59-1.92,6.43-2.91a1,1,0,0,0,.22-.66l-.07-2a47.65,47.65,0,0,0-6.92-2.18c-.32,0-1.11.93-1.45,1.32-.68.78-1.22,1.39-2,1.39-1.27,0-5.7-3.28-6.69-4.27S23.75,29.23,23.75,28c0-.75.61-1.29,1.39-2,.38-.34,1.29-1.12,1.32-1.45a47.7,47.7,0,0,0-2.18-6.92l-2-.07a1,1,0,0,0-.66.22c-1,.84-3.27,3.14-2.91,6.42.51,4.72,5.46,11,7.11,12.69Zm9,0Z"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h4 className="font-bold text-lg leading-tight">Join our WhatsApp group</h4>
          <p className="text-sm opacity-90">Share your scores and challenge friends!</p>
        </div>
      </a>

      {/* Close Button */}
      <button
        className="absolute top-1 right-1 p-1 hover:scale-110 transition-transform"
        onClick={handleClose}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppCard;