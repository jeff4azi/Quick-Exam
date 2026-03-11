import React from "react";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const sizeMap = {
  sm: { w: 40, h: 40 },
  md: { w: 100, h: 100 },
  lg: { w: 400, h: 400 },
};

const buildTransformedUrl = (url, sizeKey) => {
  if (!url) return null;
  const size = sizeMap[sizeKey] || sizeMap.sm;

  // If this is a Cloudinary URL, inject the transformation
  try {
    const uploadSegment = "/upload/";
    const idx = url.indexOf(uploadSegment);
    if (idx !== -1) {
      const prefix = url.substring(0, idx + uploadSegment.length);
      const suffix = url.substring(idx + uploadSegment.length);
      return `${prefix}w_${size.w},h_${size.h},c_fill/${suffix}`;
    }
  } catch {
    // fall through to original url
  }

  return url;
};

const Avatar = ({
  avatarUrl,
  size = "sm",
  alt = "User avatar",
  fallbackText = "",
  className = "",
}) => {
  const transformedUrl = buildTransformedUrl(avatarUrl, size);
  const initial =
    fallbackText?.trim()?.charAt(0)?.toUpperCase() || "S";

  if (!transformedUrl) {
    return (
      <div
        className={`rounded-full bg-blue-600 flex items-center justify-center text-white font-black ${
          size === "lg"
            ? "w-24 h-24 text-4xl"
            : size === "md"
            ? "w-14 h-14 text-xl"
            : "w-10 h-10 text-sm"
        } ${className}`}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={transformedUrl}
      alt={alt}
      loading="lazy"
      className={`rounded-full object-cover ${
        size === "lg"
          ? "w-24 h-24"
          : size === "md"
          ? "w-14 h-14"
          : "w-10 h-10"
      } ${className}`}
    />
  );
};

export default Avatar;

