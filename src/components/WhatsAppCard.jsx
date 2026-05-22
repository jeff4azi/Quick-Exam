import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const WhatsAppCard = () => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setVisible(false);
    setTimeout(() => setShow(false), 500);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 right-4 z-50 w-[280px] max-w-[calc(100vw-2rem)]
      bg-white dark:bg-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
      dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 border border-gray-100 dark:border-slate-700
      transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-90 pointer-events-none"}`}
    >
      <a
        href="https://whatsapp.com/channel/0029Vb6t7rnKrWQx4oL6m31f"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        {/* WhatsApp Icon */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 bg-green-500 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
          <div className="relative size-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200 dark:shadow-none transition-transform group-hover:scale-110">
            <FaWhatsapp size={28} />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-black text-slate-900 dark:text-white text-[15px] leading-tight tracking-tight">
            Join the Community
          </h4>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-snug">
            Get Updates and Challenge Yourself! ⚡️
          </p>
        </div>
      </a>

      {/* Close Button */}
      <button
        className="absolute top-3 right-3 size-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all active:scale-90"
        onClick={handleClose}
      >
        <FiX size={16} />
      </button>

      {/* Active Badge */}
      <div className="absolute -top-2 -left-2 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg uppercase tracking-tighter">
        Active
      </div>
    </div>
  );
};

export default WhatsAppCard;
