import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import RouteChangeTracker from "./components/RouteChangeTracker";
import { useState, useEffect } from "react";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";
import ChooseCourseScreen from "./pages/ChooseCourseScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import ConfirmEmailScreen from "./pages/ConfirmEmailScreen";
import HistoryScreen from "./pages/HistoryScreen.jsx"
import allCourses from "./courses.js"
import { supabase } from "./supabaseClient";
import ReviewAnswers from "./pages/ReviewAnswers";
import BookMark from "./pages/BookMark";
import ReactGA from "react-ga4";
import ProtectedRoute from "./components/ProtectedRoutes";
import PremiumPage from "./pages/PremiumPage"
import { AuthProvider } from "./context/AuthContext";
import "katex/dist/katex.min.css";

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [hasRetaken, setHasRetaken] = useState(false);

  const [answers, setAnswers] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [questions, setQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // FIX: Initialize results logic
  const [results, setResults] = useState({ correct: 0, wrong: 0, answered: 0 });
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(null);

  // --- FIX 2: HANDLE SUBMIT LOGIC ---
  const handleExamSubmit = () => {
    // 1. Calculate Score
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (q.correct === answers[index]) {
        correctCount++;
      }
    });

    // 2. Update Result State (Unlocks the ProtectedRoute)
    setResults({
      correct: correctCount,
      wrong: questions.length - correctCount,
      answered: questions.length // This allows navigation to /results
    });
  };

  // In App.js
  const handlePremiumActivation = () => {
    setUserProfile(prev => ({ ...prev, isPremium: true }));
  };


  useEffect(() => {
    let isInitialLoad = true;

    const getProfile = async (user) => {
      if (!user) {
        setUserProfile(null);
        setAvailableCourses([]);
        if (isInitialLoad) setLoading(false);
        return;
      }

      try {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        const profile = {
          full_name: user.user_metadata?.full_name || "Scholar",
          college: profileData?.college || "TASUED",
          department: profileData?.department || "General Studies",
          year: profileData?.year?.toString() || "1",
          isPremium: profileData?.is_premium === true,
        };

        setUserProfile(profile);

        if (profile.year === "1" || parseInt(profile.year) === 1) {
          setAvailableCourses(allCourses);
        } else {
          setAvailableCourses([]);
        }

      } catch (err) {
        console.error("Profile fetch error:", err.message);
        setUserProfile(null);
        setAvailableCourses([]);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    };

    // Initial load
    supabase.auth.getSession().then(({ data }) => {
      getProfile(data.session?.user);
    });

    // Auth listener (DO NOT control global loading here)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        getProfile(session?.user);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);


  useEffect(() => {
    setHasRetaken(false);   // every time new questions are loaded
  }, [questions]);


  const isPremium = userProfile?.isPremium === true; // only pasing what's needed

  useEffect(() => {
    ReactGA.initialize("G-93T0BGL64Y");
  }, []);

  // Restore any in‑progress exam from localStorage on hard refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currentExamSession");
      if (!saved) return;

      const parsed = JSON.parse(saved);

      if (parsed?.selectedCourse) {
        setSelectedCourse(parsed.selectedCourse);
      }

      if (Array.isArray(parsed?.questions) && parsed.questions.length > 0) {
        setQuestions(parsed.questions);
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
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    if (selectedCourse && selectedQuestionCount) {
      let count = selectedQuestionCount === "All" ? selectedCourse.questions.length : selectedQuestionCount;
      const shuffled = [...selectedCourse.questions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, count));
      setAnswers([]);
    }
  }, [selectedCourse, selectedQuestionCount]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedQuestions")
    if (saved) setBookmarks(JSON.parse(saved))
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserProfile(null);
      setAvailableCourses([]);
      setQuestions([]);
      setAnswers([]);
      setResults({ correct: 0, wrong: 0, answered: 0 });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err.message);
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
    courses: availableCourses,
    selectedCourse,
    setSelectedCourse,
    bookmarks,
    setBookmarks,
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode(prev => !prev),
    selectedQuestionCount,
    setSelectedQuestionCount,
    userProfile,
    loadingProfile: loading,
    isPremium,
    handleLogout,
    hasRetaken,
    setHasRetaken,
  }

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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-email" element={<ConfirmEmailScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/" element={<ProtectedRoute><StartExam {...props} /></ProtectedRoute>} />
            <Route path="/choose-course" element={<ProtectedRoute><ChooseCourseScreen {...props} /></ProtectedRoute>} />
            <Route path="/bookmarks" element={<ProtectedRoute><BookMark {...props} /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><HistoryScreen {...props} /></ProtectedRoute>} />
            <Route path="/exam" element={<ProtectedRoute stateCheck={questions.length > 0 && selectedCourse}><ExamScreen {...props} /></ProtectedRoute>} />

            {/* FIX: Results route checks results.answered, which handleExamSubmit updates */}
            <Route path="/results" element={<ProtectedRoute stateCheck={results.answered > 0}><ResultScreen {...props} /></ProtectedRoute>} />
            <Route path="/review-answers" element={<ProtectedRoute stateCheck={answers.length > 0 && questions.length > 0}><ReviewAnswers {...props} /></ProtectedRoute>} />
            <Route path="/premium" element={<ProtectedRoute stateCheck={answers.length > 0 && questions.length > 0}><PremiumPage {...props} onActivatePremium={handlePremiumActivation} /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      )}
      <SpeedInsights />
    </Router>
  );
}

export default App;