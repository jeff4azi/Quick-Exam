import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiEdit2,
  FiLoader,
  FiSettings,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import Avatar from "../components/Avatar";
import { supabase } from "../supabaseClient";

const formatLevel = (year) => {
  const value = String(year ?? "").trim();
  if (!value) return "100";
  return value.length === 1 ? `${value}00` : value;
};

const Profile = ({ userProfile, isPremium, onUpdateProfile }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [premiumAccess, setPremiumAccess] = useState(null);
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || "",
    user_name: userProfile?.user_name || "",
    department: userProfile?.department || "",
  });

  useEffect(() => {
    if (!userProfile || isEditing || isSaving) return;
    setFormData({
      full_name: userProfile.full_name || "",
      user_name: userProfile.user_name || "",
      department: userProfile.department || "",
    });
  }, [userProfile, isEditing, isSaving]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setPremiumAccess(false);
          return;
        }

        const { data, error } = await supabase
          .from("premium_access")
          .select("expires_at, reason, granted_at, active")
          .eq("user_id", user.id)
          .order("expires_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          setPremiumAccess(false);
          return;
        }

        setPremiumAccess(data ?? false);
      } catch {
        setPremiumAccess(false);
      }
    })();
  }, []);

  const premiumStatus = useMemo(() => {
    if (premiumAccess === null) {
      return {
        tone: "loading",
        label: "Checking access",
        value: "Loading status",
      };
    }

    const now = new Date();
    const hasAccessRecord = premiumAccess !== false;
    const isAccessActive =
      hasAccessRecord &&
      premiumAccess.active &&
      new Date(premiumAccess.expires_at) > now;
    const isAccessExpired =
      hasAccessRecord &&
      (!premiumAccess.active || new Date(premiumAccess.expires_at) <= now);

    if (isAccessActive) {
      return {
        tone: "premium",
        label: "Premium Active",
        value: `Expires ${new Date(premiumAccess.expires_at).toLocaleDateString(
          undefined,
          { day: "numeric", month: "short", year: "numeric" },
        )}`,
        note: premiumAccess.reason,
      };
    }

    if (isAccessExpired) {
      return {
        tone: "expired",
        label: "Premium Expired",
        value: `Expired ${new Date(
          premiumAccess.expires_at,
        ).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`,
        note: premiumAccess.reason,
      };
    }

    if (isPremium) {
      return {
        tone: "premium",
        label: "Premium Active",
        value: "Full semester access",
      };
    }

    return {
      tone: "free",
      label: "Free Plan",
      value: "Upgrade anytime",
    };
  }, [isPremium, premiumAccess]);

  const handleSave = async () => {
    if (!onUpdateProfile) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      await onUpdateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const fieldRows = [
    {
      key: "full_name",
      label: "Full Name",
      icon: FiUser,
      editable: true,
      placeholder: "Enter your full name",
      value: formData.full_name || "Scholar",
    },
    {
      key: "user_name",
      label: "Username",
      icon: FiAward,
      editable: true,
      placeholder: "Enter your username",
      value: formData.user_name || "username",
    },
    {
      key: "department",
      label: "Department",
      icon: FiBookOpen,
      editable: true,
      placeholder: "Enter your department",
      value: formData.department || "General Studies",
    },
    {
      key: "college",
      label: "College",
      icon: FiShield,
      editable: false,
      value: userProfile?.college || "TASUED",
    },
    {
      key: "level",
      label: "Level",
      icon: FiAward,
      editable: false,
      value: `${formatLevel(userProfile?.year)} Level`,
    },
  ];

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
            <h1 className="text-lg font-black tracking-tight">Profile</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Identity & access
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="size-11 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
            aria-label="Open settings"
            title="Settings"
          >
            <FiSettings size={20} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-28 pt-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
          <aside className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => navigate("/upload-profile-pic")}
                className="group relative rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Avatar
                  avatarUrl={userProfile?.avatar_url}
                  size="lg"
                  className="shadow-xl shadow-blue-100 dark:shadow-none"
                />
                {isPremium && (
                  <span className="absolute -right-2 -top-2 rounded-2xl border-4 border-white dark:border-slate-900 bg-amber-400 p-2 shadow-lg">
                    <FaCrown className="text-sm text-white" />
                  </span>
                )}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Change photo
                </span>
              </button>

              <h2 className="mt-8 max-w-full truncate text-2xl font-black tracking-tight">
                {formData.full_name || "Scholar"}
              </h2>
              <p className="mt-1 text-sm font-bold text-slate-400">
                @{formData.user_name || "username"}
              </p>

              <div
                className={`mt-5 w-full rounded-2xl border px-4 py-3 text-left ${
                  premiumStatus.tone === "premium"
                    ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-300"
                    : premiumStatus.tone === "expired"
                      ? "border-red-200 bg-red-50 text-red-600 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-300"
                      : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="size-9 shrink-0 rounded-xl bg-white/70 dark:bg-slate-950/30 flex items-center justify-center">
                    {premiumStatus.tone === "premium" ? (
                      <FaCrown />
                    ) : (
                      <FiAward />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em]">
                      {premiumStatus.label}
                    </p>
                    <p className="truncate text-sm font-black">
                      {premiumStatus.value}
                    </p>
                    {premiumStatus.note && (
                      <p className="truncate text-[11px] opacity-70">
                        {premiumStatus.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {!isPremium && (
                <button
                  type="button"
                  onClick={() => navigate("/premium")}
                  className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition-all active:scale-[0.98] dark:shadow-none"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </aside>

          <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4">
              <div>
                <h3 className="font-black">Profile details</h3>
                <p className="text-xs font-semibold text-slate-400">
                  Keep your public exam identity accurate.
                </p>
              </div>
              <button
                type="button"
                disabled={isSaving}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black text-white transition-all active:scale-95 ${
                  isSaving
                    ? "bg-green-600/80"
                    : isEditing
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSaving ? (
                  <FiLoader className="animate-spin" />
                ) : isEditing ? (
                  <FiCheck />
                ) : (
                  <FiEdit2 />
                )}
                {isSaving ? "Saving" : isEditing ? "Save" : "Edit"}
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {fieldRows.map(({ key, label, icon: Icon, editable, value, placeholder }) => (
                <div
                  key={key}
                  className="grid gap-3 px-5 py-4 sm:grid-cols-[180px_1fr] sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300">
                      <Icon />
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                      {label}
                    </span>
                  </div>

                  {isEditing && editable ? (
                    <input
                      type="text"
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder={placeholder}
                    />
                  ) : (
                    <p className="min-w-0 truncate text-base font-bold text-slate-800 dark:text-slate-100">
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Profile;
