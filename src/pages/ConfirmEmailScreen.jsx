import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiMail,
  FiArrowLeft,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { supabase } from "../supabaseClient";

function SiGmail({ size, color, className, ...props }) {
  // Use the standard react-icons default size of 1em if not provided
  const iconSize = size || "1em";

  return (
    <svg
      viewBox="0 -31.5 256 256"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid"
      width={iconSize}
      height={iconSize}
      className={className}
      {...props}
    >
      {color ? (
        // Single color version if a color prop is actively passed
        <g fill={color}>
          <path d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z" />
          <path d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z" />
          <polygon points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061" />
          <path d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z" />
          <path d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z" />
        </g>
      ) : (
        // Standard full-color layout using your provided SVG color codes
        <g id="SVGRepo_iconCarrier">
          <g>
            <path
              d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z"
              fill="#4285F4"
            />
            <path
              d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z"
              fill="#34A853"
            />
            <polygon
              fill="#EA4335"
              points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061"
            />
            <path
              d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z"
              fill="#FBBC04"
            />
            <path
              d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z"
              fill="#C5221F"
            />
          </g>
        </g>
      )}
    </svg>
  );
}

function SiMicrosoftoutlook({ size, color, className, ...props }) {
  // Use the standard react-icons default size of 1em if not provided
  const iconSize = size || "1em";

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      className={className}
      {...props}
    >
      {color ? (
        // Single color version if a color prop is actively passed
        <g fill={color}>
          <rect x="10" y="2" width="20" height="28" rx="2" />
          <rect x="0" y="7" width="18" height="18" rx="2" />
          <path
            d="M14 16.0693V15.903C14 13.0222 11.9272 11 9.01582 11C6.08861 11 4 13.036 4 15.9307V16.097C4 18.9778 6.07278 21 9 21C11.9114 21 14 18.964 14 16.0693ZM11.6424 16.097C11.6424 18.0083 10.5665 19.1579 9.01582 19.1579C7.46519 19.1579 6.37342 17.9806 6.37342 16.0693V15.903C6.37342 13.9917 7.44937 12.8421 9 12.8421C10.5348 12.8421 11.6424 14.0194 11.6424 15.9307V16.097Z"
            fill="inherit"
            style={{ mixBlendMode: "difference" }}
          />
        </g>
      ) : (
        // Standard full-color layout using your provided complex SVG design
        <g id="SVGRepo_iconCarrier">
          <rect
            x="10"
            y="2"
            width="20"
            height="28"
            rx="2"
            fill="#1066B5"
          ></rect>
          <rect
            x="10"
            y="2"
            width="20"
            height="28"
            rx="2"
            fill="url(#paint0_linear_87_7742)"
          ></rect>
          <rect x="10" y="5" width="10" height="10" fill="#32A9E7"></rect>
          <rect x="10" y="15" width="10" height="10" fill="#167EB4"></rect>
          <rect x="20" y="15" width="10" height="10" fill="#32A9E7"></rect>
          <rect x="20" y="5" width="10" height="10" fill="#58D9FD"></rect>
          <mask
            id="mask0_87_7742"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="8"
            y="14"
            width="24"
            height="16"
          >
            <path
              d="M8 14H30C31.1046 14 32 14.8954 32 16V28C32 29.1046 31.1046 30 30 30H10C8.89543 30 8 29.1046 8 28V14Z"
              fill="url(#paint1_linear_87_7742)"
            ></path>
          </mask>
          <g mask="url(#mask0_87_7742)">
            <path d="M32 14V18H30V14H32Z" fill="#135298"></path>
            <path
              d="M32 30V16L7 30H32Z"
              fill="url(#paint2_linear_87_7742)"
            ></path>
            <path
              d="M8 30V16L33 30H8Z"
              fill="url(#paint3_linear_87_7742)"
            ></path>
          </g>
          <path
            d="M8 12C8 10.3431 9.34315 9 11 9H17C18.6569 9 20 10.3431 20 12V24C20 25.6569 18.6569 27 17 27H8V12Z"
            fill="#000000"
            fillOpacity="0.3"
          ></path>
          <rect
            y="7"
            width="18"
            height="18"
            rx="2"
            fill="url(#paint4_linear_87_7742)"
          ></rect>
          <path
            d="M14 16.0693V15.903C14 13.0222 11.9272 11 9.01582 11C6.08861 11 4 13.036 4 15.9307V16.097C4 18.9778 6.07278 21 9 21C11.9114 21 14 18.964 14 16.0693ZM11.6424 16.097C11.6424 18.0083 10.5665 19.1579 9.01582 19.1579C7.46519 19.1579 6.37342 17.9806 6.37342 16.0693V15.903C6.37342 13.9917 7.44937 12.8421 9 12.8421C10.5348 12.8421 11.6424 14.0194 11.6424 15.9307V16.097Z"
            fill="white"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_87_7742"
              x1="10"
              y1="16"
              x2="30"
              y2="16"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#064484"></stop>
              <stop offset="1" stopColor="#0F65B5"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear_87_7742"
              x1="8"
              y1="26.7692"
              x2="32"
              y2="26.7692"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1B366F"></stop>
              <stop offset="1" stopColor="#2657B0"></stop>
            </linearGradient>
            <linearGradient
              id="paint2_linear_87_7742"
              x1="32"
              y1="23"
              x2="8"
              y2="23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#44DCFD"></stop>
              <stop offset="0.453125" stopColor="#259ED0"></stop>
            </linearGradient>
            <linearGradient
              id="paint3_linear_87_7742"
              x1="8"
              y1="23"
              x2="32"
              y2="23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#259ED0"></stop>
              <stop offset="1" stopColor="#44DCFD"></stop>
            </linearGradient>
            <linearGradient
              id="paint4_linear_87_7742"
              x1="0"
              y1="16"
              x2="18"
              y2="16"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#064484"></stop>
              <stop offset="1" stopColor="#0F65B5"></stop>
            </linearGradient>
          </defs>
        </g>
      )}
    </svg>
  );
}

const MAIL_APPS = [
  {
    label: "Gmail",
    url: "https://mail.google.com",
    appUrl: "googlegmail://",
    Icon: SiGmail,
    iconColor: "text-red-500",
    bg: "bg-white dark:bg-slate-800",
    border: "border border-gray-200 dark:border-slate-700",
    text: "text-slate-800 dark:text-slate-100",
  },
  {
    label: "Outlook",
    url: "https://outlook.live.com",
    appUrl: "ms-outlook://",
    Icon: SiMicrosoftoutlook,
    iconColor: "text-blue-500",
    bg: "bg-white dark:bg-slate-800",
    border: "border border-gray-200 dark:border-slate-700",
    text: "text-slate-800 dark:text-slate-100",
  },
  {
    label: "Apple Mail",
    url: null,
    appUrl: "message://",
    Icon: MdOutlineMail,
    iconColor: "text-sky-500",
    bg: "bg-white dark:bg-slate-800",
    border: "border border-gray-200 dark:border-slate-700",
    text: "text-slate-800 dark:text-slate-100",
    appleOnly: true,
  },
];

const ConfirmEmailScreen = () => {
  useDocumentTitle("Confirm Email | QuizBolt");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState(null);
  const [cooldown, setCooldown] = useState(60);

  const emailFromState = location.state?.email || null;
  const email = emailFromState || "your email";
  const hasEmail = !!emailFromState;
  const canResend = hasEmail && cooldown === 0;

  useEffect(() => {
    if (!hasEmail || cooldown <= 0) return;
    const timerId = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [cooldown, hasEmail]);

  const handleResendEmail = async () => {
    setLoading(true);
    setResendStatus(null);
    try {
      if (!hasEmail || cooldown > 0) {
        setResendStatus("error");
        return;
      }
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: emailFromState,
      });
      if (error) throw error;
      setResendStatus("success");
      setCooldown(60);
    } catch (err) {
      console.error("Resend error:", err.message);
      setResendStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMailApp = (app) => {
    window.location.href = app.appUrl;
    if (app.url) {
      setTimeout(() => window.open(app.url, "_blank"), 1500);
    }
  };

  const visibleApps = MAIL_APPS.filter(
    (app) => !app.appleOnly || /iphone|ipad|mac/i.test(navigator.userAgent),
  );

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">
      <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in duration-700">
        {/* Icon/Logo Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6 bg-blue-100 dark:bg-blue-600/20 p-6 rounded-full animate-bounce">
            <FiMail className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-black text-center tracking-tight text-slate-900 dark:text-white mb-2">
            Check Email
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
            Verification link sent to
          </p>
          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm mt-1">
            {email}
          </span>
        </div>

        {/* Feedback Messages */}
        {resendStatus === "success" && (
          <div className="w-full mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl text-green-600 dark:text-green-400 text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <FiCheckCircle /> New link sent successfully!
          </div>
        )}
        {resendStatus === "error" && !canResend && (
          <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
            We couldn&apos;t detect your email. Please sign in again to request
            a new link.
          </div>
        )}

        {/* Mail App Buttons */}
        <div className="w-full space-y-3 mb-4">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center mb-3">
            Open your inbox
          </p>
          {visibleApps.map((app) => (
            <button
              key={app.label}
              onClick={() => handleOpenMailApp(app)}
              className={`w-full ${app.bg} ${app.border} ${app.text} py-3.5 px-5 rounded-2xl font-semibold text-sm shadow-sm transition-all flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0`}
            >
              <span className={`${app.iconColor} flex-shrink-0`}>
                <app.Icon size={20} />
              </span>
              <span className="flex-1 text-left">Open {app.label}</span>
              <span className="text-slate-300 dark:text-slate-600 text-lg leading-none">
                ›
              </span>
            </button>
          ))}
        </div>

        {/* Resend Button */}
        <button
          onClick={handleResendEmail}
          disabled={loading || !canResend}
          className="w-full py-4 rounded-2xl font-bold text-slate-500 dark:text-slate-400 text-sm transition-all flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-40"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} />
          {!hasEmail
            ? "Email not available"
            : loading
              ? "Sending..."
              : cooldown > 0
                ? `Resend in ${String(Math.floor(cooldown / 60)).padStart(2, "0")}:${String(cooldown % 60).padStart(2, "0")}`
                : "Resend Verification Link"}
        </button>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <FiArrowLeft />
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmailScreen;

import useDocumentTitle from "../hooks/useDocumentTitle";