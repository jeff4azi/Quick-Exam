const FAVOURITE_COURSES_KEY = "favouriteCourses";

export function loadFavouriteCourseIds() {
  try {
    const raw = localStorage.getItem(FAVOURITE_COURSES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => typeof id === "string" && id.length > 0);
  } catch {
    return [];
  }
}

export function saveFavouriteCourseIds(ids) {
  try {
    const unique = Array.from(
      new Set((ids || []).filter((id) => typeof id === "string" && id.length > 0)),
    );
    localStorage.setItem(FAVOURITE_COURSES_KEY, JSON.stringify(unique));
    return unique;
  } catch {
    return Array.isArray(ids) ? ids : [];
  }
}

export function toggleFavouriteCourseId(courseId) {
  const current = loadFavouriteCourseIds();
  const next = current.includes(courseId)
    ? current.filter((id) => id !== courseId)
    : [...current, courseId];
  return saveFavouriteCourseIds(next);
}

