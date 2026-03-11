import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCamera,
  FiUploadCloud,
  FiTrash2,
  FiLoader,
} from "react-icons/fi";
import imageCompression from "browser-image-compression";
import { supabase } from "../supabaseClient";

// Helper to create initials if no image exists
const getInitials = (name) => {
  if (!name) return "S";
  const names = name.split(" ");
  if (names.length >= 2) return `${names[0][0]}${names[1][0]}`.toUpperCase();
  return names[0][0].toUpperCase();
};

const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dxdnhc1hm";
const CLOUDINARY_UPLOAD_PRESET = "profile_pictures";

const UploadProfilePic = ({ userProfile }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // States
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userProfile?.avatar_url || null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Handle file selection from input
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(selectedFile.type)) {
      setStatus({
        type: "error",
        message: "Only JPEG, PNG or WEBP images are allowed.",
      });
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setStatus({
        type: "error",
        message: "Image must be smaller than 5MB.",
      });
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setStatus({ type: "", message: "" });
  };

  // Trigger the hidden file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Upload logic: compress then upload to Cloudinary, then persist URL in Supabase
  const handleSave = async () => {
    if (!file) return;

    setUploading(true);
    setStatus({ type: "info", message: "Optimizing and uploading your picture..." });

    try {
      // 1. Compress image
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      // 2. Prepare Cloudinary upload
      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
      const cloudRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!cloudRes.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const cloudJson = await cloudRes.json();
      const secureUrl = cloudJson.secure_url;
      if (!secureUrl) {
        throw new Error("Cloudinary did not return a secure URL.");
      }

      // 3. Get current Supabase user id
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("Unable to determine current user for profile update.");
      }

      // 4. Save avatar_url into profiles table
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: secureUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setStatus({
        type: "success",
        message: "Profile picture updated successfully!",
      });

      // Redirect into main app after short delay
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setStatus({
        type: "error",
        message: error.message || "Failed to upload image.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-xl flex items-center justify-between mb-10 mt-4">
        <button
          onClick={() => {
            localStorage.setItem("skipAvatar", "true");
            navigate("/");
          }}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          Skip for now
        </button>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Profile Picture
        </h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-gray-100 dark:border-slate-700 shadow-xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Avatar Display Area */}
        <div className="relative mb-10">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="size-40 rounded-[3rem] object-cover border-4 border-white dark:border-slate-700 shadow-2xl ring-4 ring-blue-50 dark:ring-blue-900/30"
            />
          ) : (
            <div className="size-40 rounded-[3rem] bg-blue-600 flex items-center justify-center text-white text-6xl font-black shadow-xl shadow-blue-200 dark:shadow-none border-4 border-white dark:border-slate-700">
              {getInitials(userProfile?.full_name)}
            </div>
          )}

          {/* Edit Icon Overlay */}
          <button
            onClick={triggerFileInput}
            className="absolute -bottom-3 -right-3 size-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-800 active:scale-90 transition-all"
            disabled={uploading}
          >
            <FiCamera size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          {/* Main action: Change Photo / Choose Photo */}
          <button
            onClick={triggerFileInput}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-3 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-3xl text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 active:scale-95 transition-all"
          >
            {previewUrl ? <FiUploadCloud /> : <FiCamera />}
            {previewUrl ? "Change Photo" : "Choose Photo"}
          </button>

          {/* Remove photo option (only if a photo exists) */}
          {previewUrl && (
            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
              }}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-3 p-4 text-red-500 font-semibold text-sm active:scale-95 transition-all"
            >
              <FiTrash2 size={16} />
              Remove Current Photo
            </button>
          )}
        </div>
      </div>

      {/* Status Message */}
      {status.message && (
        <div
          className={`mt-8 px-6 py-3 rounded-full text-xs font-bold ${status.type === "error" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-700"} animate-in fade-in`}
        >
          {status.message}
        </div>
      )}

      {/* Save Button (Fixed at the bottom) */}
      {file && (
        <div className="fixed bottom-6 inset-x-6 max-w-sm mx-auto animate-in slide-in-from-bottom-10">
          <button
            onClick={handleSave}
            disabled={uploading}
            className="w-full bg-blue-600 dark:bg-blue-700 py-5 rounded-2xl font-black text-white text-lg shadow-2xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-70"
          >
            {uploading ? (
              <>
                <FiLoader className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadProfilePic;
