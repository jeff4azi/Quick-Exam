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
import NavBar from "../components/NavBar";

const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = "profile_pictures";

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary cloud name is not configured");
  }
  if (!CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Cloudinary upload preset is not configured");
  }
};

const UploadProfilePic = ({ userProfile, setUserProfile, deleteImage, isPremium }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userProfile?.avatar_url || null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

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

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setStatus({ type: "", message: "" });
  };

  const triggerFileInput = () => fileInputRef.current.click();

  // Upload new profile picture
  const handleSave = async () => {
    if (!file) return;

    setUploading(true);
    setStatus({ type: "info", message: "Optimizing and uploading..." });

    try {
      // Validate Cloudinary configuration first
      validateCloudinaryConfig();

      // 1️⃣ Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Could not get user.");

      // 2️⃣ Compress image
      console.log("Compressing image...");
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });
      console.log("Image compressed successfully");

      // 3️⃣ Upload to Cloudinary as new image (no override)
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 9);
      const uniquePublicId = `profile_pictures/${user.id}_${timestamp}_${randomId}`;

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("public_id", uniquePublicId);

      // If user already has an avatar, delete the old one first
      console.log("Deleting Cloudinary image:", userProfile.avatar_public_id);
      if (userProfile.avatar_public_id) {
        await deleteImage(userProfile.avatar_public_id);
      }

      const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

      console.log("Uploading to Cloudinary...", {
        cloudName: CLOUDINARY_CLOUD_NAME,
        preset: CLOUDINARY_UPLOAD_PRESET,
        publicId: uniquePublicId,
      });

      const cloudRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const cloudJson = await cloudRes.json();

      if (!cloudRes.ok) {
        console.error("Cloudinary error response:", cloudJson);
        throw new Error(
          cloudJson.error?.message ||
            `Cloudinary upload failed: ${cloudRes.status}`,
        );
      }

      console.log("Cloudinary upload successful:", cloudJson);

      // 4️⃣ Update Supabase
      console.log("Updating Supabase profile...");
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: cloudJson.secure_url,
          avatar_public_id: cloudJson.public_id,
        })
        .eq("id", user.id);
      if (updateError) {
        console.error("Supabase update error:", updateError);
        throw new Error("Failed to update profile in database");
      }
      console.log("Profile updated successfully");

      // 5️⃣ Update UI & status
      setStatus({ type: "success", message: "Profile updated!" });
      setPreviewUrl(cloudJson.secure_url);
      setFile(null);

      // Update local user profile state to reflect changes immediately
      if (setUserProfile && userProfile) {
        setUserProfile({
          ...userProfile,
          avatar_url: cloudJson.secure_url,
          avatar_public_id: cloudJson.public_id,
        });
      }

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "Upload failed.";

      if (error.message.includes("Cloudinary")) {
        errorMessage = "Image upload service error. Please try again.";
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.message.includes("database")) {
        errorMessage = "Database error. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setStatus({ type: "error", message: errorMessage });
    } finally {
      setUploading(false);
    }
  };

  // Remove current photo
  const handleRemovePhoto = async () => {
    setUploading(true);

    try {
      // 1️⃣ Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Could not get user.");

      console.log("Deleting Cloudinary image:", userProfile.avatar_public_id);
      if (userProfile.avatar_public_id) {
        await deleteImage(userProfile.avatar_public_id);
      }

      // 2️⃣ Update Supabase to clear avatar
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: null, avatar_public_id: null })
        .eq("id", user.id);
      if (error) throw error;

      // 3️⃣ Update UI
      setFile(null);
      setPreviewUrl(null);
      setStatus({ type: "success", message: "Photo removed." });

      // Update local user profile state to reflect changes immediately
      if (setUserProfile && userProfile) {
        setUserProfile({
          ...userProfile,
          avatar_url: null,
          avatar_public_id: null,
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Failed to remove photo." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-xl flex items-center justify-between mb-10 mt-4">
        {previewUrl ? (
          <button
            onClick={() => navigate(-1)}
            className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-transform"
          >
            <FiArrowLeft className="size-6 text-slate-700 dark:text-slate-200" />
          </button>) : (<div className="size-12" />)
        }
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Profile Picture
        </h1>
        <div className="w-10" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-gray-100 dark:border-slate-700 shadow-xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="relative mb-10">
          <img
            src={
              previewUrl && previewUrl.trim() !== "" && previewUrl !== "NULL"
                ? previewUrl
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="Profile Preview"
            className="size-40 rounded-[3rem] object-cover border-4 border-white dark:border-slate-700 shadow-2xl ring-4 ring-blue-50 dark:ring-blue-900/30"
          />

          <button
            onClick={triggerFileInput}
            className="absolute -bottom-3 -right-3 size-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-800 active:scale-90 transition-all"
            disabled={uploading}
          >
            <FiCamera size={20} />
          </button>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={triggerFileInput}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-3 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-3xl text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 active:scale-95 transition-all"
          >
            {previewUrl ? <FiUploadCloud /> : <FiCamera />}
            {previewUrl ? "Change Photo" : "Choose Photo"}
          </button>

          {previewUrl && (
            <button
              onClick={handleRemovePhoto}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-3 p-4 text-red-500 font-semibold text-sm active:scale-95 transition-all"
            >
              <FiTrash2 size={16} />
              Remove Current Photo
            </button>
          )}

          {!previewUrl && (
            <button
              onClick={() => {
                localStorage.setItem("skipAvatar", "true");
                navigate("/"); // go back to home
              }}
              disabled={uploading}
              className="w-full mt-4 flex items-center justify-center gap-2 p-4 text-sm font-bold text-gray-500 dark:text-gray-400 hover:underline"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>

      {status.message && (
        <div
          className={`mt-8 px-6 py-3 rounded-full text-xs font-bold ${status.type === "error" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-700"} animate-in fade-in`}
        >
          {status.message}
        </div>
      )}

      {file && (
        <div className="fixed bottom-6 inset-x-6 max-w-sm mx-auto">
          <button
            onClick={handleSave}
            disabled={uploading}
            className="w-full bg-blue-600 dark:bg-blue-700 py-5 rounded-2xl font-black text-white text-lg shadow-2xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-70"
          >
            {uploading ? (
              <>
                <FiLoader className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      )}

      {!file && <NavBar isPremium={isPremium} />}
    </div>
  );
};

export default UploadProfilePic;
