import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiEdit2,
  FiCheck,
  FiLoader,
  FiUser,
  FiBookOpen,
  FiShield,
  FiInfo,
  FiLogOut,
  FiAlertTriangle,
  FiZap,
} from "react-icons/fi";
import { FaCrown, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { HiOutlineMoon } from "react-icons/hi";

const Profile = ({
  userProfile,
  isPremium,
  onUpdateProfile,
  onLogout,
  isDarkMode,
  toggleDarkMode,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || "",
    department: userProfile?.department || "",
  });

  // Keep local form state in sync when profile data changes
  useEffect(() => {
    if (!userProfile || isEditing || isSaving) return;
    setFormData({
      full_name: userProfile.full_name || "",
      department: userProfile.department || "",
    });
  }, [userProfile, isEditing, isSaving]);

  const handleSave = async () => {
    if (!onUpdateProfile) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      await onUpdateProfile(formData);
    } catch (err) {
      console.error("Failed to save profile:", err.message);
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 flex flex-col overflow-hidden relative">

      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-transform"
        >
          <FiChevronLeft className="size-6 text-slate-700 dark:text-slate-200" />
        </button>
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">My Profile</h2>
        <div className="w-12"></div> {/* Spacer for symmetry */}
      </div>

      <div className="flex-1 px-6 overflow-y-auto no-scrollbar pb-32">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-4 mb-8">
          <div className="relative">
            <div className="size-28 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200 dark:shadow-none">
              {formData.full_name.charAt(0) || "S"}
            </div>
            {isPremium && (
              <div className="absolute -top-2 -right-2 bg-amber-400 dark:bg-yellow-500 rounded-2xl p-2 border-4 border-gray-50 dark:border-slate-900 shadow-lg">
                <FaCrown className="text-sm text-white" />
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {isPremium ? "Premium Scholar" : "Standard Account"}
            </span>
          </div>
        </div>

        {/* Input Fields Container */}
        <div className="space-y-4">
          {/* Full Name Field */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm transition-all">
            <div className="flex items-center gap-4 mb-2">
              <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                <FiUser size={20} />
              </div>
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Full Name</label>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-900/50 border-none rounded-xl p-3 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
              />
            ) : (
              <p className="text-lg font-bold text-slate-800 dark:text-white px-1">
                {formData.full_name || "Scholar"}
              </p>
            )}
          </div>

          {/* Department Field */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm transition-all">
            <div className="flex items-center gap-4 mb-2">
              <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                <FiBookOpen size={20} />
              </div>
              <label className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Department</label>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-gray-50 dark:bg-slate-900/50 border-none rounded-xl p-3 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter department"
              />
            ) : (
              <p className="text-lg font-bold text-slate-800 dark:text-white px-1">
                {formData.department || "TASUED Student"}
              </p>
            )}
          </div>

          {/* Non-Editable College Info */}
          <div className="bg-gray-100/50 dark:bg-slate-800/40 p-5 rounded-[2rem] border border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                <FiShield size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">College</p>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{userProfile?.college || "TASUED"}</p>
              </div>
            </div>
          </div>

          {/* Level Info (Non-Editable) */}
          <div className="bg-gray-100/50 dark:bg-slate-800/40 p-5 rounded-[2rem] border border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                <FiZap size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Level</p>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  Level {userProfile?.year || "1"}00 Student
                </p>
              </div>
            </div>
          </div>

          {/* Premium & App Section */}
          {!isPremium && (
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-5 shadow-lg shadow-blue-200 dark:shadow-none relative overflow-hidden">
              <div className="absolute -right-6 -top-6 size-28 bg-white/10 rounded-full blur-2xl" />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <FiZap className="text-yellow-300 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg">Upgrade to Premium</h4>
                    <p className="text-blue-100 text-[11px] leading-relaxed font-medium">
                      Remove ads and unlock a smoother exam experience.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/premium")}
                  className="shrink-0 px-4 py-2 rounded-full bg-white/90 text-blue-700 text-xs font-bold uppercase tracking-wide hover:bg-white"
                >
                  View Plans
                </button>
              </div>
            </div>
          )}

          {/* Community Links */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://chat.whatsapp.com/FMPmsBbwU9kL6t2vJ6C8qq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-9 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                      <FaWhatsapp size={18} />
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      WhatsApp Group
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/17RabkxuWY/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-9 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      <FaFacebookF size={16} />
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Facebook Page
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@codejeffrey18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-9 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-black dark:text-white">
                      <SiTiktok size={16} />
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      TikTok
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* App Settings */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              App
            </h3>
            <button
              type="button"
              onClick={() => navigate("/about-page")}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/60 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                  <FiInfo />
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  About Quiz Bolt
                </span>
              </div>
            </button>
            <a
              href="https://wa.me/2347015585397?text=Hi%20Quiz%20Bolt%20Support,%20I%20found%20an%20issue..."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/60 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-2xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-500">
                  <FiAlertTriangle />
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Report a Problem
                </span>
              </div>
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                  <FiLogOut />
                </span>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Sign Out
                </span>
              </div>
            </button>
          </div>

          {/* Appearance / Dark Mode */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="size-9 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-blue-300">
                <HiOutlineMoon className="text-lg" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Dark Mode
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Toggle between light and dark themes.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isDarkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white size-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  isDarkMode ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Edit Profile Button */}
      <button
        type="button"
        disabled={isSaving}
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
        className="absolute bottom-8 right-6"
      >
        <div
          className={`size-14 rounded-full flex items-center justify-center shadow-xl shadow-blue-200 dark:shadow-none transition-all ${
            isSaving
              ? "bg-green-600/80 cursor-wait"
              : isEditing
              ? "bg-green-600 hover:bg-green-700 active:scale-95"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {isSaving ? (
            <FiLoader className="text-white text-xl animate-spin" />
          ) : isEditing ? (
            <FiCheck className="text-white text-xl" />
          ) : (
            <FiEdit2 className="text-white text-xl" />
          )}
        </div>
      </button>
    </div>
  );
};

export default Profile;