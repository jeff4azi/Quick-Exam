import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiChevronRight,
  FiGrid,
  FiInfo,
  FiLoader,
  FiLogOut,
  FiMoon,
  FiSettings,
  FiTrash2,
  FiZap,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import ConfirmOverlay from "../components/ConfirmOverlay";
import { API_BASE_URL } from "../apiConfig";
import { supabase } from "../supabaseClient";
import { clearExamSession } from "../utils/examSessionStorage";

const Toggle = ({ checked, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`relative h-7 w-12 rounded-full p-1 transition-colors ${
      checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
    } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    aria-pressed={checked}
  >
    <span
      className={`block size-5 rounded-full bg-white shadow-sm transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const SettingRow = ({
  icon: Icon,
  title,
  description,
  tone = "default",
  children,
  onClick,
}) => {
  const toneClass =
    tone === "danger"
      ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
      : tone === "warning"
        ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20"
        : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";

  const content = (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`size-10 shrink-0 rounded-2xl flex items-center justify-center ${toneClass}`}
        >
          <Icon size={18} />
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-sm font-black text-slate-900 dark:text-white">
            {title}
          </span>
          {description && (
            <span className="block truncate text-xs font-medium text-slate-400 dark:text-slate-500">
              {description}
            </span>
          )}
        </span>
      </div>
      {children}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      {content}
    </div>
  );
};

const SettingsScreen = ({
  userProfile,
  isPremium,
  onLogout,
  isDarkMode,
  toggleDarkMode,
  autoAdvance,
  toggleAutoAdvance,
  showPagination,
  toggleShowPagination,
}) => {
  const navigate = useNavigate();
  const [isDeleteOverlayOpen, setDeleteOverlayOpen] = useState(false);
  const [isPremiumOverlayOpen, setPremiumOverlayOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("No session found");
      }

      const res = await fetch(`${API_BASE_URL}/api/users/delete-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

      localStorage.removeItem("examHistory");
      clearExamSession();
      await supabase.auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Delete account failed:", err.message);
      window.alert(
        err.message || "We couldn't delete your account. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="size-11 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-black tracking-tight">Settings</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Preferences & account
            </p>
          </div>
          <div className="size-11 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500">
            <FiSettings size={20} />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-5 pb-28 pt-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
            <h2 className="font-black">Exam preferences</h2>
            <p className="text-xs font-semibold text-slate-400">
              Controls that shape how exams feel.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <SettingRow
              icon={FiMoon}
              title="Dark mode"
              description="Switch between light and dark themes."
            >
              <Toggle checked={isDarkMode} onClick={toggleDarkMode} />
            </SettingRow>

            <SettingRow
              icon={FiZap}
              title="Auto advance"
              description="Move to the next question after answering."
              tone={isPremium ? "default" : "warning"}
            >
              <div className="relative">
                <Toggle
                  checked={autoAdvance && isPremium}
                  onClick={
                    isPremium
                      ? toggleAutoAdvance
                      : () => setPremiumOverlayOpen(true)
                  }
                  disabled={!isPremium}
                />
                {!isPremium && (
                  <span className="absolute -right-1 -top-2 rounded-full border-2 border-white bg-amber-400 p-1 dark:border-slate-900">
                    <FaCrown className="text-[8px] text-white" />
                  </span>
                )}
              </div>
            </SettingRow>

            <SettingRow
              icon={FiGrid}
              title="Pagination"
              description="Show question bubbles during exams."
            >
              <Toggle
                checked={showPagination}
                onClick={toggleShowPagination}
              />
            </SettingRow>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4">
            <h2 className="font-black">Support & account</h2>
            <p className="text-xs font-semibold text-slate-400">
              Product info, help, and account controls.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <SettingRow
              icon={FiInfo}
              title="About"
              description="Learn more about QuizBolt."
              onClick={() => navigate("/about")}
            >
              <FiChevronRight className="text-slate-300" />
            </SettingRow>

            <SettingRow
              icon={FiAlertTriangle}
              title="Report problem"
              description="Send a message to support."
              tone="warning"
              onClick={() =>
                window.open(
                  "https://wa.me/2347015585397?text=Hi%20Quiz%20Bolt%20Support,%20I%20found%20an%20issue...",
                  "_blank",
                )
              }
            >
              <FiChevronRight className="text-slate-300" />
            </SettingRow>

            <SettingRow
              icon={FiLogOut}
              title="Logout"
              description="Sign out of this device."
              tone="danger"
              onClick={onLogout}
            >
              <FiChevronRight className="text-slate-300" />
            </SettingRow>

            <SettingRow
              icon={isDeleting ? FiLoader : FiTrash2}
              title="Delete account"
              description="Permanently remove your account."
              tone="danger"
              onClick={() => setDeleteOverlayOpen(true)}
            >
              <FiChevronRight className="text-slate-300" />
            </SettingRow>
          </div>
        </section>
      </main>

      <ConfirmOverlay
        isOpen={isDeleteOverlayOpen}
        onClose={() => setDeleteOverlayOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account?"
        message="This will remove your profile and exam history from this device. This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Yes, delete my account"}
        cancelText="Cancel"
        danger={true}
      />

      <ConfirmOverlay
        isOpen={isPremiumOverlayOpen}
        onClose={() => setPremiumOverlayOpen(false)}
        onConfirm={() => navigate("/premium")}
        title="Auto-Advance with Premium"
        message="Upgrade to Premium to control whether questions automatically advance after answering."
        confirmText="Upgrade to Premium"
        cancelText="Not now"
      />
    </div>
  );
};

export default SettingsScreen;
