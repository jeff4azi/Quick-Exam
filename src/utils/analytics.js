import ReactGA from "react-ga4";

const GA_ID = "G-LDLEG48Z7Q";

// ── Init ─────────────────────────────────────────────────────────────────────
export const initGA = () => {
  ReactGA.initialize(GA_ID);
};

// ── Page view ─────────────────────────────────────────────────────────────────
export const trackPage = (path, title) => {
  ReactGA.send({ hitType: "pageview", page: path, title });
};

// ── Generic event helper ──────────────────────────────────────────────────────
const track = (action, params = {}) => {
  ReactGA.event({ action, ...params });
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const trackLogin = (method) => track("login", { method });

export const trackSignUp = (method) => track("sign_up", { method });

export const trackLogout = () => track("logout");

// ── Onboarding ────────────────────────────────────────────────────────────────
export const trackOnboardingComplete = (university, college) =>
  track("onboarding_complete", { university, college });

// ── Course ────────────────────────────────────────────────────────────────────
export const trackCourseSelected = (courseId, courseName, questionType) =>
  track("course_selected", {
    category: "Course",
    label: courseId,
    course_name: courseName,
    question_type: questionType,
  });

export const trackCourseSearch = (query) =>
  track("course_search", { search_term: query });

export const trackQuestionTypeSwitch = (type) =>
  track("question_type_switch", { question_type: type });

export const trackFavouriteToggle = (courseId, isFavourited) =>
  track(isFavourited ? "course_favourited" : "course_unfavourited", {
    category: "Course",
    label: courseId,
  });

// ── Exam ──────────────────────────────────────────────────────────────────────
export const trackExamStart = (courseId, questionCount, questionType) =>
  track("exam_start", {
    category: "Exam",
    label: courseId,
    question_count: questionCount,
    question_type: questionType,
  });

export const trackExamSubmit = (
  courseId,
  score,
  total,
  timeTaken,
  questionType,
) =>
  track("exam_submit", {
    category: "Exam",
    label: courseId,
    score_percent: Math.round((score / total) * 100),
    question_count: total,
    time_taken: timeTaken,
    question_type: questionType,
  });

export const trackExamTimeUp = (courseId, answered, total) =>
  track("exam_time_up", {
    category: "Exam",
    label: courseId,
    answered,
    total,
  });

export const trackExamExit = (courseId, currentIndex, total) =>
  track("exam_exit", {
    category: "Exam",
    label: courseId,
    progress_percent: Math.round((currentIndex / total) * 100),
  });

export const trackExamRetake = (courseId) =>
  track("exam_retake", { category: "Exam", label: courseId });

export const trackBookmarkToggle = (questionId, isBookmarked) =>
  track(isBookmarked ? "question_bookmarked" : "question_unbookmarked", {
    category: "Exam",
    label: questionId,
  });

// ── Results ───────────────────────────────────────────────────────────────────
export const trackResultView = (courseId, scorePercent, questionType) =>
  track("result_view", {
    category: "Result",
    label: courseId,
    score_percent: scorePercent,
    question_type: questionType,
  });

export const trackResultShare = (courseId, scorePercent) =>
  track("result_share", {
    category: "Result",
    label: courseId,
    score_percent: scorePercent,
  });

export const trackReviewAnswers = (courseId) =>
  track("review_answers", { category: "Result", label: courseId });

// ── Premium ───────────────────────────────────────────────────────────────────
export const trackPremiumPageView = (source) =>
  track("premium_page_view", { category: "Premium", source });

export const trackPremiumUpgradeClick = (plan) =>
  track("premium_upgrade_click", { category: "Premium", plan });

export const trackPremiumGateHit = (feature) =>
  track("premium_gate_hit", { category: "Premium", feature });

// ── Study modes ───────────────────────────────────────────────────────────────
export const trackStudyModeClick = (mode) =>
  track("study_mode_click", { category: "Navigation", mode });

export const trackFlashcardFlip = (courseId) =>
  track("flashcard_flip", { category: "Flashcards", label: courseId });

export const trackMatchStart = (courseId) =>
  track("match_start", { category: "Match", label: courseId });

export const trackMatchComplete = (courseId, timeTaken) =>
  track("match_complete", {
    category: "Match",
    label: courseId,
    time_taken: timeTaken,
  });

export const trackTestStart = (courseId, questionCount) =>
  track("test_start", {
    category: "Test",
    label: courseId,
    question_count: questionCount,
  });

export const trackTestComplete = (courseId, scorePercent) =>
  track("test_complete", {
    category: "Test",
    label: courseId,
    score_percent: scorePercent,
  });

// ── UI / Settings ─────────────────────────────────────────────────────────────
export const trackDarkModeToggle = (isDark) =>
  track("dark_mode_toggle", { category: "Settings", enabled: isDark });

export const trackAutoAdvanceToggle = (enabled) =>
  track("auto_advance_toggle", { category: "Settings", enabled });

// ── PWA ───────────────────────────────────────────────────────────────────────
export const trackPWAInstallPrompt = () =>
  track("pwa_install_prompt", { category: "PWA" });

export const trackPWAInstalled = () =>
  track("pwa_installed", { category: "PWA" });

export const trackPWADismissed = () =>
  track("pwa_install_dismissed", { category: "PWA" });

// ── FeedBolt CTA ──────────────────────────────────────────────────────────────
export const trackFeedBoltCTAClick = (source) =>
  track("feedbolt_cta_click", { category: "FeedBolt", source });

export const trackFeedBoltCTADismiss = () =>
  track("feedbolt_cta_dismiss", { category: "FeedBolt" });
