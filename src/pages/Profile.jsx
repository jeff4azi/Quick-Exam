import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiEdit2, FiCheck, FiUser, FiBookOpen, FiShield } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

const Profile = ({ userProfile, isPremium, onUpdateProfile }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || "",
    department: userProfile?.department || "",
  });

  const handleSave = async () => {
    const hasChanges =
      formData.full_name !== (userProfile?.full_name || "") ||
      formData.department !== (userProfile?.department || "");

    // If nothing changed, just exit edit mode without saving
    if (!hasChanges) {
      setIsEditing(false);
      return;
    }

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

  return (
    <div className="max-w-2xl mx-auto h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 flex flex-col overflow-hidden">

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
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Institution</p>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{userProfile?.college || "TASUED"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Button */}
      <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent dark:from-slate-900 dark:via-slate-900/90 max-w-2xl mx-auto">
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-green-600 dark:bg-green-700 py-4.5 rounded-2xl font-black text-white text-lg shadow-xl shadow-green-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
          >
            <FiCheck className="stroke-[3]" /> {isSaving ? "Saving..." : "Save Changes"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-600 dark:bg-blue-700 py-4.5 rounded-2xl font-black text-white text-lg shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <FiEdit2 /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;