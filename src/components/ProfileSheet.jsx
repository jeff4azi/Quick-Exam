import React from "react";
import { FaCrown, FaTrophy } from "react-icons/fa";
import { FiX, FiShield, FiZap } from "react-icons/fi";

const ProfileSheet = ({ isOpen, onClose, userProfile, isPremium, stats }) => {
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

        <div className="px-8 pb-12 overflow-y-auto max-h-[80vh]">
          {/* User Info Section */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <div className="size-20 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-200 dark:shadow-none">
                {userProfile?.full_name?.charAt(0) || "S"}
              </div>
              {isPremium && (
                <div className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-2xl border-4 border-gray-50 dark:border-slate-900 shadow-lg">
                  <FaCrown className="text-white text-xs" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {userProfile?.full_name || "Scholar Name"}
              </h3>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                {isPremium ? "Premium Member" : "Free Tier"}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-8">
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
                College
              </p>
              <p className="font-black text-slate-900 dark:text-white">
                {userProfile?.college || "TASUED"}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 text-center">
              <FiZap className="mx-auto text-amber-500 mb-1" />
              <p className="text-xs font-bold text-slate-400 uppercase">
                Best
              </p>
              <p className="font-black text-slate-900 dark:text-white">
                {stats?.bestScore || "0%"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSheet;
