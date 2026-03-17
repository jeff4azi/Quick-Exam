export const EXAM_SESSION_KEY = "currentExamSession";

export function loadExamSession() {
  try {
    const raw = localStorage.getItem(EXAM_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (err) {
    console.error("Failed to load exam session:", err);
    return null;
  }
}

export function saveExamSession(payload) {
  try {
    localStorage.setItem(EXAM_SESSION_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error("Failed to save exam session:", err);
    return false;
  }
}

export function clearExamSession() {
  try {
    localStorage.removeItem(EXAM_SESSION_KEY);
    return true;
  } catch (err) {
    console.error("Failed to clear exam session:", err);
    return false;
  }
}

