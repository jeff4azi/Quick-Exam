import { supabase } from "../supabaseClient";

export async function loadFavouriteCourseIds() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("profiles")
      .select("favourite_courses")
      .eq("id", user.id)
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
      new Set((ids || []).filter((id) => typeof id === "string" && id.length > 0))
    );

    const { data: { user } } = await supabase.auth.getUser();
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

export async function toggleFavouriteCourseId(courseId, currentIds) {
  const next = currentIds.includes(courseId)
    ? currentIds.filter((id) => id !== courseId)
    : [...currentIds, courseId];
  return saveFavouriteCourseIds(next);
}
