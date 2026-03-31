import React, { useState } from "react";
import { FaCrown, FaTrophy } from "react-icons/fa";
import { FiX, FiShield, FiZap } from "react-icons/fi";
import Avatar from "./Avatar";

const ProfileSheet = ({ isOpen, onClose, userProfile, isPremium, stats }) => {
  const [isImageOverlayOpen, setIsImageOverlayOpen] = useState(false);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop - darkens the top part of the screen */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div className="relative w-full max-w-2xl mx-auto bg-gray-50 dark:bg-slate-900 rounded-t-[3rem] shadow-2xl animate-in slide-in-from-bottom-full duration-500 overflow-hidden">
        {/* Grabber Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Header with Close Button */}
        <div className="px-8 flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-slate-500"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="px-8 pb-12 max-h-[80vh]">
          {/* User Info Section */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <button
                onClick={() => {
                  setIsImageOverlayOpen(true);
                }}
                className="pl-4 pr-2 scale-150 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[2rem] transition-transform active:scale-95"
              >
                <Avatar
                  avatarUrl={userProfile?.avatar_url}
                  size="md"
                  className="rounded-[2rem] shadow-xl shadow-blue-200 dark:shadow-none"
                />
                {isPremium && (
                  <div className="absolute -top-2 -right-1 bg-amber-400 p-1 rounded-2xl border-3 border-gray-50 dark:border-slate-900 shadow-lg">
                    <FaCrown className="text-white text-xs" />
                  </div>
                )}
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {userProfile?.full_name || "Scholar Name"}
              </h3>
              {userProfile?.user_name ? (
                <p className="text-slate-400 dark:text-slate-500 font-bold text-xs tracking-wider">
                  @{userProfile.user_name}
                </p>
              ) : null}
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                {isPremium ? "Premium Member" : "Free Tier"}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 text-center">
              <FaTrophy className="mx-auto text-blue-500 mb-1" />
              <p className="text-xs font-bold text-slate-400 uppercase">Rank</p>
              <p className="font-black text-slate-900 dark:text-white">
                {stats?.rank || "#0"}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 text-center">
              <FiShield className="mx-auto text-orange-500 mb-1" />
              <p className="text-xs font-bold text-slate-400 uppercase">
                {userProfile?.university == "TASUED" ? "College" :"Faculty"}
              </p>
              <p className="font-black text-slate-900 dark:text-white">
                {userProfile?.college || "—"}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 text-center">
              <FiZap className="mx-auto text-amber-500 mb-1" />
              <p className="text-xs font-bold text-slate-400 uppercase">Best</p>
              <p className="font-black text-slate-900 dark:text-white">
                {stats?.bestScore || "0%"}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 text-center">
              <FiShield className="mx-auto text-purple-500 mb-1" />
              <p className="text-xs font-bold text-slate-400 uppercase">
                Level
              </p>
              <p className="font-black text-slate-900 dark:text-white">
                {userProfile?.year ? `${userProfile.year}00` : "—"}
              </p>
            </div>
          </div>

          {/* Department Section */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <FiShield className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Department
              </p>
              <p className="font-bold text-slate-900 dark:text-white truncate">
                {userProfile?.department}
              </p>
            </div>
          </div>

          {/* University Section */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-center gap-4 mt-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
              <FiShield className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                University
              </p>
              <p className="font-bold text-slate-900 dark:text-white truncate">
                {userProfile?.university || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Image Overlay */}
      {isImageOverlayOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => {
            setIsImageOverlayOpen(false);
          }}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={
                userProfile?.avatar_url && userProfile.avatar_url !== "NULL"
                  ? userProfile.avatar_url
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt={`${userProfile?.full_name || "User"}'s profile picture`}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.src =
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
              }}
            />
            <button
              onClick={() => setIsImageOverlayOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSheet;
