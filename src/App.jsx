import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import RouteChangeTracker from "./components/RouteChangeTracker";
import DesktopLayout from "./components/DesktopLayout";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home.jsx";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";
import ChooseCourseScreen from "./pages/ChooseCourseScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AboutPage from "./pages/AboutPage";
import ResetPassword from "./pages/ResetPassword";
import ConfirmEmailScreen from "./pages/ConfirmEmailScreen";
import HistoryScreen from "./pages/HistoryScreen.jsx";
import { supabase } from "./supabaseClient";
import { withTimeout } from "./utils/withTimeout";
import ReviewAnswers from "./pages/ReviewAnswers";
import BookMark from "./pages/BookMark";
import ReactGA from "react-ga4";
import ProtectedRoute from "./components/ProtectedRoutes";
import OnboardingRoute from "./components/OnboardingRoute";
import PremiumPage from "./pages/PremiumPage";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import "katex/dist/katex.min.css";
import LeaderboardScreen from "./pages/LeaderboardScreen";
import { API_BASE_URL } from "./apiConfig";
import UploadProfilePic from "./pages/UploadProfilePic";
import UpdatePassword from "./pages/UpdatePassword";
import { loadExamSession } from "./utils/examSessionStorage";
import FlashcardsScreen from "./pages/FlashcardsScreen";
import MatchScreen from "./pages/MatchScreen";
import MatchResultScreen from "./pages/MatchResultScreen";

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [hasRetaken, setHasRetaken] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const [answers, setAnswers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const [autoAdvance, setAutoAdvance] = useState(() => {
    try {
      const saved = localStorage.getItem("autoAdvancePreference");
      return saved !== null ? JSON.parse(saved) : false; // Default to false
    } catch {
      return true;
    }
  });

  // FIX: Initialize results logic
  const [results, setResults] = useState({ correct: 0, wrong: 0, answered: 0 });
  const [lastTimeTaken, setLastTimeTaken] = useState(0);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(null);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionType, setQuestionType] = useState("objective");
  const [questionsContext, setQuestionsContext] = useState(null);
  const sessionRestoredRef = useRef(false);

  const handleExamSubmit = (correctCount, totalCount, timeTaken) => {
    const total = totalCount ?? questions.length;

    setResults({
      correct: parseFloat(correctCount.toFixed(2)),
      wrong: parseFloat((total - correctCount).toFixed(2)),
      answered: total,
    });
    setLastTimeTaken(timeTaken ?? 0);
  };

  // In App.js
  const handlePremiumActivation = () => {
    setUserProfile((prev) => ({ ...prev, isPremium: true }));
  };

  useEffect(() => {
    let isInitialLoad = true;
    // Track whether the initial session load has finished, so the
    // visibility handler doesn't fire on the very first paint.
    const initialLoadDone = { current: false };

    const getProfile = async (user) => {
      if (!user) {
        setUserProfile(null);
        setAvailableCourses([]);
        if (isInitialLoad) setLoading(false);
        return;
      }

      try {
        const { data: profileData, error } = await withTimeout(
          supabase.from("profiles").select("*").eq("id", user.id).single(),
          15000,
          "Loading your profile took too long. Please try again.",
        );

        if (error) throw error;

        // Profiles table is now the single source of truth for user info (except name)
        const profile = {
          full_name:
            profileData?.full_name ||
            profileData?.name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Scholar",
          user_name: profileData?.user_name || null,
          university: profileData?.university.trim() || null,
          college: profileData?.college || "TASUED",
          department: profileData?.department || "General Studies",
          year: profileData?.year?.toString() || "1",
          isPremium: profileData?.is_premium === true,
          avatar_url: profileData?.avatar_url || null,
          avatar_public_id: profileData?.avatar_public_id || null,
        };

        setUserProfile(profile);

        // Load bookmarks from profile
        setBookmarks(Array.isArray(profileData?.bookmarks) ? profileData.bookmarks : []);
        setCoursesLoading(true);
        try {
          const params = new URLSearchParams();

          // Pass level if available
          if (profile.year) {
            params.append("level", `${profile.year}00`);
          }

          // Pass college if available
          if (profile.college) {
            params.append("college", profile.college.trim());
          }

          // Pass university if available
          if (profile.university) {
            params.append("university", profile.university.trim());
          }

          const res = await fetch(
            `${API_BASE_URL}/courses?${params.toString()}`,
          );
          const data = await res.json();

          if (!res.ok) {
            console.error("Courses fetch failed:", data?.msg || res.status);
            setAvailableCourses([]);
          } else {
            setAvailableCourses(Array.isArray(data) ? data : []);
          }
        } catch (coursesErr) {
          console.error("Courses fetch error:", coursesErr);
          setAvailableCourses([]);
        } finally {
          setCoursesLoading(false);
        }
      } catch (err) {
        console.error("Profile fetch error:", err.message);
        // On initial load, fall back to logged-out state.
        // On later updates, keep the last known profile instead of wiping it.
        if (isInitialLoad) {
          setUserProfile(null);
          setAvailableCourses([]);
        }
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          isInitialLoad = false;
          initialLoadDone.current = true;
        }
      }
    };

    // Initial load
    supabase.auth.getSession().then(({ data }) => {
      getProfile(data.session?.user);
    });

    // Auth listener — fires on SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT, etc.
    // This is the primary way the profile stays in sync after a session refresh.
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        getProfile(session?.user);
      },
    );

    // When the tab becomes visible again after being hidden (idle / tab switch /
    // minimised), force a session refresh. Supabase will emit TOKEN_REFRESHED
    // via onAuthStateChange, which calls getProfile automatically above.
    // If the session truly expired the user is signed out gracefully.
    const handleVisibilityChange = async () => {
      if (document.visibilityState !== "visible" || !initialLoadDone.current) {
        return;
      }
      try {
        const { error } = await supabase.auth.refreshSession();
        if (error) {
          console.warn("[App] Session refresh failed on tab focus:", error.message);
          // onAuthStateChange SIGNED_OUT will clear the profile automatically
          await supabase.auth.signOut();
        }
      } catch (err) {
        console.error("[App] Visibility refresh error:", err);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      listener.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setHasRetaken(false); // every time new questions are loaded
  }, [questions]);

  const isPremium = userProfile?.isPremium === true; // only pasing what's needed

  useEffect(() => {
    ReactGA.initialize("G-93T0BGL64Y");
  }, []);

  // Restore any in‑progress exam from localStorage on hard refresh
  useEffect(() => {
    try {
      const parsed = loadExamSession();
      if (!parsed) return;

      // Set the flag FIRST before any state updates so the fetch effect
      // sees it when it re-runs due to selectedCourse/questionType changing
      sessionRestoredRef.current = true;

      if (parsed?.questionType === "theory") {
        setQuestionType("theory");
      }

      if (parsed?.questionType === "fib") {
        setQuestionType("fib");
      }

      if (parsed?.selectedCourse) {
        setSelectedCourse(parsed.selectedCourse);
      }

      if (Array.isArray(parsed?.questions) && parsed.questions.length > 0) {
        setQuestions(parsed.questions);
        setQuestionsContext({
          courseId: parsed?.selectedCourse?.id ?? null,
          questionType: parsed?.questionType ?? "objective",
        });
      }

      if (Array.isArray(parsed?.answers)) {
        setAnswers(parsed.answers);
      }
    } catch (err) {
      console.error("Failed to restore exam session:", err);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "autoAdvancePreference",
        JSON.stringify(autoAdvance),
      );
    } catch (err) {
      console.error("Failed to save auto-advance preference:", err);
    }
  }, [autoAdvance]);

  useEffect(() => {
    const loadQuestionsForSelectedCourse = async () => {
      // Don't wipe a just-restored session — wait until the user picks a new exam
      if (!selectedCourse || !selectedQuestionCount) {
        if (!sessionRestoredRef.current) {
          setQuestions([]);
          setAnswers([]);
          setQuestionsContext(null);
        }
        return;
      }

      // Once the user actively picks a course/count, the restored session is no longer relevant
      sessionRestoredRef.current = false;

      setQuestions([]);
      setAnswers([]);
      setQuestionsLoading(true);
      setQuestionsContext(null);

      const requestCourseId = selectedCourse.id;
      const requestQuestionType = questionType;

      try {
        const endpoint =
          selectedCourse.questionsEndpoint ||
          `/courses/${requestCourseId}/questions`;

        const url = new URL(`${API_BASE_URL}${endpoint}`);
        if (requestQuestionType === "theory") {
          url.searchParams.set("type", "theory");
        } else if (requestQuestionType === "fib") {
          url.searchParams.set("type", "fib");
        }

        const res = await fetch(url.toString());
        const data = await res.json();

        if (!res.ok) {
          console.error(
            "Failed to load questions for course:",
            data?.msg || res.status,
          );
          setQuestions([]);
          setQuestionsContext(null);
          return;
        }

        const allQuestions = Array.isArray(data) ? data : [];
        const count =
          selectedQuestionCount === "All"
            ? allQuestions.length
            : Math.min(selectedQuestionCount, allQuestions.length);

        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, count));
        setAnswers([]);
        setQuestionsContext({
          courseId: requestCourseId,
          questionType: requestQuestionType,
        });
      } catch (err) {
        console.error("Error fetching course questions:", err);
        setQuestions([]);
        setQuestionsContext(null);
      } finally {
        setQuestionsLoading(false);
      }
    };

    loadQuestionsForSelectedCourse();
  }, [selectedCourse, selectedQuestionCount, questionType]);

  // Bookmarks are now loaded from Supabase via getProfile below

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserProfile(null);
      setAvailableCourses([]);
      setQuestions([]);
      setAnswers([]);
      setResults({ correct: 0, wrong: 0, answered: 0 });

      // Clear all localStorage data except bookmarked questions and visited status
      try {
        // Save certain items temporarily
        const visitedStatus = localStorage.getItem("visited");

        // Clear all localStorage
        localStorage.clear();

        // Restore saved items
        if (visitedStatus) {
          localStorage.setItem("visited", visitedStatus);
        }
      } catch (err) {
        console.error("Failed to clear localStorage on logout:", err);
      }

      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const handleUpdateProfile = async (updates) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await withTimeout(
        supabase.auth.getUser(),
        15000,
        "Session check took too long while updating your profile.",
      );
      if (userError) throw userError;

      const { user_name, department } = updates || {};

      // Determine next values, falling back to existing profile data
      const nextUserName = user_name ?? userProfile?.user_name ?? "";
      const nextDepartment = department ?? userProfile?.department ?? "";

      // Upsert profile fields in profiles table (include other known fields for safety)
      const { error: upsertError } = await withTimeout(
        supabase.from("profiles").upsert({
          id: user.id,
          user_name: nextUserName || null,
          department: nextDepartment || null,
          college: userProfile?.college ?? null,
          year: userProfile?.year ? Number(userProfile.year) : null,
          is_premium: userProfile?.isPremium ?? null,
          // Ensure NOT NULL onboarding_complete is always set
          onboarding_complete: true,
          // Ensure NOT NULL updated_at is always set
          updated_at: new Date().toISOString(),
        }, { onConflict: "id"}),
        15000,
        "Saving your profile took too long. Please try again.",
      );

      if (upsertError) throw upsertError;

      // Update local React state so UI reflects changes immediately
      setUserProfile((prev) => ({
        ...prev,
        user_name: nextUserName,
        department: nextDepartment,
      }));
    } catch (err) {
      console.error("Update profile failed:", err.message);
      throw err;
    }
  };

  const deleteImage = async (publicId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/cloudinary/delete-image`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId }),
        },
      );

      const data = await res.json();
      console.log("Delete response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete image");
      }

      return data;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  };

  const props = {
    answers,
    setAnswers,
    questions,
    setQuestions,
    // FIX: Pass the actual submit handler
    onSubmit: handleExamSubmit,
    results,
    timeTaken: lastTimeTaken,
    courses: availableCourses,
    selectedCourse,
    setSelectedCourse,
    bookmarks,
    setBookmarks,
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode((prev) => !prev),
    autoAdvance,
    toggleAutoAdvance: () => setAutoAdvance((prev) => !prev),
    selectedQuestionCount,
    setSelectedQuestionCount,
    userProfile,
    setUserProfile,
    loadingProfile: loading,
    coursesLoading,
    isPremium,
    handleLogout,
    hasRetaken,
    setHasRetaken,
    questionsLoading,
    deleteImage,
    questionType,
    setQuestionType,
    questionsContext,
  };

  const withDesktop = (element) => (
    <DesktopLayout
      isPremium={isPremium}
      userProfile={userProfile}
    >
      {element}
    </DesktopLayout>
  );

  return (
    <Router>
      <RouteChangeTracker />
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]">
          <div className="flex gap-1.5">
            <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-blue-600"></div>
            <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_0.1s_infinite] rounded-full bg-blue-500"></div>
            <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_0.2s_infinite] rounded-full bg-blue-400"></div>
          </div>
          <h2 className="mt-6 text-sm font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Authenticating
          </h2>
        </div>
      ) : (
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/confirm-email" element={<ConfirmEmailScreen />} />
            <Route
              path="/onboarding"
              element={
                <OnboardingRoute>
                  <OnboardingScreen />
                </OnboardingRoute>
              }
            />
            <Route
              path="/"
              element={
                localStorage.getItem("visited") === "true" ? (
                  <ProtectedRoute>
                    {withDesktop(<Home {...props} />)}
                  </ProtectedRoute>
                ) : (
                  <Navigate to="/landing" replace />
                )
              }
            />
            <Route
              path="/choose-course"
              element={
                <ProtectedRoute>
                  {withDesktop(<ChooseCourseScreen {...props} />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  {withDesktop(<BookMark {...props} />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  {withDesktop(<HistoryScreen {...props} />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  {withDesktop(
                    <LeaderboardScreen
                      courses={availableCourses}
                      isPremium={isPremium}
                      userProfile={userProfile}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  {withDesktop(
                    <Profile
                      userProfile={userProfile}
                      isPremium={isPremium}
                      onUpdateProfile={handleUpdateProfile}
                      onLogout={handleLogout}
                      isDarkMode={isDarkMode}
                      toggleDarkMode={() => setIsDarkMode((prev) => !prev)}
                      autoAdvance={autoAdvance}
                      toggleAutoAdvance={() => setAutoAdvance((prev) => !prev)}
                      deleteImage={deleteImage}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/exam"
              element={
                <ProtectedRoute
                  stateCheck={
                    Boolean(selectedCourse) &&
                    (
                      questionsLoading ||
                      (
                        questions.length > 0 &&
                        questionsContext?.courseId === selectedCourse?.id &&
                        questionsContext?.questionType === questionType
                      )
                    )
                  }
                >
                  {withDesktop(<ExamScreen {...props} />)}
                </ProtectedRoute>
              }
            />

            {/* FIX: Results route checks results.answered, which handleExamSubmit updates */}
            <Route
              path="/results"
              element={
                <ProtectedRoute stateCheck={results.answered > 0}>
                  {withDesktop(<ResultScreen {...props} />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/review-answers"
              element={
                <ProtectedRoute
                  stateCheck={answers.length > 0 && questions.length > 0}
                >
                  {withDesktop(<ReviewAnswers {...props} />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/premium"
              element={
                <ProtectedRoute
                  stateCheck={answers.length > 0 && questions.length > 0}
                >
                  {withDesktop(
                    <PremiumPage
                      {...props}
                      onActivatePremium={handlePremiumActivation}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-profile-pic"
              element={
                <ProtectedRoute>
                  {withDesktop(<UploadProfilePic {...props} />)}
                </ProtectedRoute>
              }
            />
            <Route
              path="/flashcards"
              element={
                <ProtectedRoute>
                  {withDesktop(
                    <FlashcardsScreen
                      courses={availableCourses}
                      coursesLoading={coursesLoading}
                      isPremium={isPremium}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/match"
              element={
                <ProtectedRoute>
                  {withDesktop(
                    <MatchScreen
                      courses={availableCourses}
                      coursesLoading={coursesLoading}
                      isPremium={isPremium}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/match-result"
              element={
                <ProtectedRoute>
                  {withDesktop(<MatchResultScreen />)}
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      )}
      <SpeedInsights />
    </Router>
  );
}

export default App;
