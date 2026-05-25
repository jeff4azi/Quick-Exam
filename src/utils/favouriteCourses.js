import { supabase } from "../supabaseClient";

// ─── Encoding helpers ─────────────────────────────────────────────────────────
// Stored format: "GST112" (obj), "GST112-F" (fib), "GST112-T" (theory)

export function encodeFavouriteKey(courseId, questionType) {
  if (questionType === "fib") return `${courseId}-F`;
  if (questionType === "theory") return `${courseId}-T`;
  return courseId; // objective — no suffix
}

export function decodeFavouriteKey(key) {
  if (key.endsWith("-F"))
    return { courseId: key.slice(0, -2), questionType: "fib" };
  if (key.endsWith("-T"))
    return { courseId: key.slice(0, -2), questionType: "theory" };
  return { courseId: key, questionType: "objective" };
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────

export async function loadFavouriteCourseIds(userId) {
  try {
    let profileId = userId;
    if (!profileId) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      profileId = user?.id;
    }
    if (!profileId) return [];

    const { data, error } = await supabase
      .from("profiles")
      .select("favourite_courses")
      .eq("id", profileId)
      .single();

    if (error || !data) return [];
    return Array.isArray(data.favourite_courses) ? data.favourite_courses : [];
  } catch {
    return [];
  }
}

export async function saveFavouriteCourseIds(ids) {
  try {
    const unique = Array.from(
      new Set(
        (ids || []).filter((id) => typeof id === "string" && id.length > 0),
      ),
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return unique;

    await supabase
      .from("profiles")
      .update({ favourite_courses: unique })
      .eq("id", user.id);

    return unique;
  } catch {
    return Array.isArray(ids) ? ids : [];
  }
}

/**
 * Toggle a favourite entry.
 * @param {string} courseId  - e.g. "GST112"
 * @param {string[]} currentIds - current stored keys
 * @param {string} questionType - "objective" | "fib" | "theory"
 */
export async function toggleFavouriteCourseId(
  courseId,
  currentIds,
  questionType = "objective",
) {
  const key = encodeFavouriteKey(courseId, questionType);
  const next = currentIds.includes(key)
    ? currentIds.filter((id) => id !== key)
    : [...currentIds, key];
  return saveFavouriteCourseIds(next);
}
