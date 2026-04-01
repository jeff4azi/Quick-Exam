import React, { useState, useEffect, useMemo } from "react";
import { FiX, FiVolume2, FiVolumeX } from "react-icons/fi";

// 1. Database with unique WhatsApp numbers
const AD_DATABASE = [
  {
    type: "image",
    url: "https://res.cloudinary.com/dxdnhc1hm/image/upload/v1770389975/Advertise_Here_20260206_152335_0000_lg0smh.png",
    duration: 5,
    whatsapp: "2347015585397",
    message:
      "Hi, I’d like to advertise on Quiz Bolt. Can you share pricing and details?",
  },
  {
    type: "image",
    url: "https://res.cloudinary.com/dxdnhc1hm/image/upload/v1773144280/Advertise_Here_20260206_152922_0000_bns87b.png",
    duration: 5,
    whatsapp: "2347015585397",
    message:
      "Hi, I’d like to advertise on Quiz Bolt. Can you share pricing and details?",
  },
  {
    type: "image",
    url: "https://res.cloudinary.com/dxdnhc1hm/image/upload/v1770557375/BackgroundEraser_20260208_141707632_sk6ng9.jpg",
    duration: 5,
    whatsapp: "2348159767554",
    message:
      "Hi, I saw your flyer and wanted to connect. Can you tell me more about what you do?",
  },
  {
    type: "image",
    url: "https://res.cloudinary.com/dxdnhc1hm/image/upload/v1775054933/2347015585397_whb6dw.png",
    duration: 5,
    whatsapp: "2347015585397",
    message:
      "Hi, I’m interested in getting a website built. Can you share your pricing and examples of your work?",
  },
];

function resizeCloudinaryUrl(url) {
   if (!url.includes("cloudinary.com")) return url;

   // Base size
   let w = 800;
   let h = 1131;

   const width = window.innerWidth;

   if (width < 768) {
     // Mobile
     w = 600;
     h = 849;
   } else if (width < 1024) {
     // Tablet
     w = 700;
     h = 992;
   }
   // Desktop stays at 800x1131

   return url.replace(
     "/upload/",
     `/upload/w_${w},h_${h},c_fill,q_auto,f_auto/`,
   );
}

const BannerAd = ({ onAdClose }) => {
  const currentAd = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * AD_DATABASE.length);
    return AD_DATABASE[randomIndex];
  }, []);

  const [timeLeft, setTimeLeft] = useState(currentAd?.duration || 5);
  const [isClosable, setIsClosable] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Only starts counting when the image/video is actually loaded
    if (isReady && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isReady && timeLeft === 0) {
      setIsClosable(true);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [timeLeft, isReady]);

  const handleClose = () => {
    setIsVisible(false);
    document.body.style.overflow = "auto";
    if (onAdClose) onAdClose();
  };

  if (!isVisible || !currentAd) return null;

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / currentAd.duration) * circumference;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-500"
        onClick={isClosable ? handleClose : undefined}
      />

      {/* 2. Responsive Aspect Ratio: A4 on mobile, 16:9 on LG */}
      <div className="relative w-full max-w-md aspect-[1/1.414] bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-slate-800 animate-in zoom-in-95 duration-500">
        {/* 3. Clickable WhatsApp Area */}
        <a
          href={`https://wa.me/${currentAd.whatsapp}?text=${encodeURIComponent(currentAd.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full bg-slate-100 dark:bg-slate-950 relative overflow-hidden cursor-pointer"
        >
          {/* Loading state spinner */}
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="size-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}

          {currentAd.type === "video" ? (
            <video
              src={resizeCloudinaryUrl(currentAd.url)}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onCanPlayThrough={() => setIsReady(true)}
              // 4. Object-contain prevents cropping
              className={`w-full h-full object-contain transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
            />
          ) : (
            <img
              src={resizeCloudinaryUrl(currentAd.url)}
              alt="Sponsored Content"
              onLoad={() => setIsReady(true)}
              // 4. Object-contain prevents cropping
              className={`w-full h-full object-contain transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </a>

        {currentAd.type === "video" && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevents opening WhatsApp link
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-6 right-6 size-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white z-10 active:scale-90 transition-all"
          >
            {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
          </button>
        )}

        <div className="absolute top-6 right-6 z-10 pointer-events-auto">
          {!isClosable ? (
            <div className="relative size-12 flex items-center justify-center bg-black/40 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
              <svg className="absolute inset-0 size-full -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="white"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={circumference}
                  style={{
                    strokeDashoffset,
                    transition: "stroke-dashoffset 1s linear",
                  }}
                  className="opacity-90"
                />
              </svg>
              <span className="text-xs font-black text-white">{timeLeft}</span>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevents opening WhatsApp link
                handleClose();
              }}
              className="size-12 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full shadow-2xl active:scale-90 hover:scale-105 transition-all border border-slate-200 dark:border-slate-700"
            >
              <FiX size={24} />
            </button>
          )}
        </div>

        <div className="absolute bottom-6 left-6 pointer-events-none">
          <div className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em]">
              Sponsored
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;