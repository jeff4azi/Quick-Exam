import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoHome,
  IoHomeOutline,
  IoLibrary,
  IoLibraryOutline,
  IoTime,
  IoTimeOutline,
  IoTrophy,
  IoTrophyOutline,
} from "react-icons/io5";
import { FaCrown } from "react-icons/fa";

const isActivePath = (pathname, target) => {
  if (!pathname) return false;
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(`${target}/`);
};

const NavItem = ({
  label,
  icon,
  active,
  onClick,
  locked,
  showCrown,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center flex-1 text-xs font-semibold transition-colors ${
        active
          ? "text-blue-600 dark:text-blue-400"
          : "text-slate-500 dark:text-slate-300"
      } ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <div
        className={`relative size-9 rounded-2xl flex items-center justify-center transition-all ${
          active
            ? "bg-blue-50 dark:bg-blue-900/20"
            : "bg-transparent group-active:scale-95"
        }`}
      >
        {icon}
        {showCrown && (
          <div className="absolute -top-1 -right-1 bg-amber-400 dark:bg-yellow-500 rounded-full p-1 border-2 border-gray-50 dark:border-slate-900 shadow-sm flex items-center justify-center">
            <FaCrown className="text-[8px] text-white" />
          </div>
        )}
      </div>
      <span>{label}</span>
    </button>
  );
};

const NavBar = ({ isPremium, onLockedClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname || "/";

  const go = (path) => navigate(path);

  const handleSavedClick = () => {
    if (isPremium) {
      go("/bookmarks");
      return;
    }
    if (onLockedClick) {
      onLockedClick();
      return;
    }
    go("/premium");
  };

  return (
    <div className="mx-auto max-w-2xl fixed bottom-0 inset-x-0 z-40 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent dark:from-slate-900 dark:via-slate-900/90">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-300 dark:border-slate-700 px-4 pt-3 pb-4 flex items-center justify-between mx-4 mb-4 rounded-2xl">
        {(() => {
          const homeActive = isActivePath(pathname, "/");
          const coursesActive = isActivePath(pathname, "/choose-course");
          const historyActive = isActivePath(pathname, "/history");
          const savedActive = isActivePath(pathname, "/bookmarks");
          const leadersActive = isActivePath(pathname, "/leaderboard");

          return (
            <>
        <NavItem
          label="Home"
          active={homeActive}
          onClick={() => go("/")}
          icon={homeActive ? <IoHome size={22} /> : <IoHomeOutline size={22} />}
        />

        <NavItem
          label="Courses"
          active={coursesActive}
          onClick={() => go("/choose-course")}
          icon={
            coursesActive ? (
              <IoLibrary size={22} />
            ) : (
              <IoLibraryOutline size={22} />
            )
          }
        />

        <NavItem
          label="History"
          active={historyActive}
          onClick={() => go("/history")}
          icon={historyActive ? <IoTime size={22} /> : <IoTimeOutline size={22} />}
        />

        <NavItem
          label="Saved"
          active={savedActive}
          onClick={handleSavedClick}
          locked={!isPremium}
          showCrown={!isPremium}
          icon={
            savedActive ? (
              <IoBookmark size={20} />
            ) : (
              <IoBookmarkOutline size={20} />
            )
          }
        />

        <NavItem
          label="Leaders"
          active={leadersActive}
          onClick={() => go("/leaderboard")}
          icon={
            leadersActive ? (
              <IoTrophy size={18} />
            ) : (
              <IoTrophyOutline size={18} />
            )
          }
        />
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default NavBar;

