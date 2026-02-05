import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import RouteChangeTracker from "./components/RouteChangeTracker";
import { useState, useEffect } from "react";
import StartExam from "./pages/StartExam";
import ExamScreen from "./pages/ExamScreen";
import ResultScreen from "./pages/ResultScreen";
import AboutPage from "./pages/AboutPage";
import ChooseCourseScreen from "./pages/ChooseCourseScreen";
import OnboardingScreen from "./pages/OnboardingScreen";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HistoryScreen from "./pages/HistoryScreen.jsx"
import allCourses from "./courses.js" // Renamed for clarity
import { supabase } from "./supabaseClient"; // Ensure you have this import

import ReviewAnswers from "./pages/ReviewAnswers";
import BookMark from "./pages/BookMark";
import ReactGA from "react-ga4";
import ProtectedRoute from "./components/ProtectedRoutes";

import "katex/dist/katex.min.css";
import TestKaTeX from "./pages/test-katex.jsx";

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableCourses, setAvailableCourses] = useState([]); // This controls what the user sees
  
  const [answers, setAnswers] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [questions, setQuestions] = useState([]);
  const [bookmarks, setBookmarks] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [results, setResults] = useState({ correct: 0, wrong: 0, answered: 0 });
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(null);

  // 1️⃣ Fetch Profile and Filter Courses
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          setUserProfile(null);
          setAvailableCourses([]); 
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // Add this temporarily to debug in your browser console:
        console.log("Raw Profile Year from DB:", profileData?.year);

        const profile = {
          full_name: user.user_metadata?.full_name || "Scholar",
          college: profileData?.college || "TASUED",
          department: profileData?.department || "General Studies",
          // Change "100" to "1" to match your actual DB structure
          year: profileData?.year?.toString() || "1", 
        };

        setUserProfile(profile);

        // 2️⃣ Logic Check: Match '1' or 1
        if (profile.year === "1" || parseInt(profile.year) === 1) {
          setAvailableCourses(allCourses);
        } else {
          setAvailableCourses([]); 
        }

      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setUserProfile(null);
        setAvailableCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- UI and Exam Logic ---
  useEffect(() => {
    ReactGA.initialize("G-93T0BGL64Y");
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

  const props = {
    answers,
    setAnswers,
    questions,
    setQuestions,
    onSubmit: () => { /* your submit logic */ },
    results,
    courses: availableCourses, // Use the filtered list here
    selectedCourse,
    setSelectedCourse,
    bookmarks,
    setBookmarks,
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode(prev => !prev),
    selectedQuestionCount,
    setSelectedQuestionCount,
    userProfile, // Passing this down in case pages need it
    loadingProfile: loading
  }

  // --- Helper ---
  function getRandom30(arr) {
    const copy = [...arr];
    for (let i = 0; i < 30; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 30);
  }

  return (
    <Router>
      <RouteChangeTracker />
      {loading ? (
        <div className="flex h-screen flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]">
          {/* The Bar Loader */}
          <div className="flex gap-1.5">
            <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-blue-600"></div>
            <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_0.1s_infinite] rounded-full bg-blue-500"></div>
            <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_0.2s_infinite] rounded-full bg-blue-400"></div>
          </div>

          {/* Clean Typography */}
          <h2 className="mt-6 text-sm font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Authenticating
          </h2>
        </div>
      ) : (
        <Routes>
          {/* Routes remain the same, using the props object containing availableCourses */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/" element={<ProtectedRoute><StartExam {...props} /></ProtectedRoute>} />
          <Route path="/choose-course" element={<ProtectedRoute><ChooseCourseScreen {...props} /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><BookMark {...props} /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryScreen {...props} /></ProtectedRoute>} />
          <Route path="/exam" element={<ProtectedRoute stateCheck={questions.length > 0 && selectedCourse}><ExamScreen {...props} /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute stateCheck={results.answered > 0}><ResultScreen {...props} /></ProtectedRoute>} />
          <Route path="/review-answers" element={<ProtectedRoute stateCheck={answers.length > 0 && questions.length > 0}><ReviewAnswers {...props} /></ProtectedRoute>} />
        </Routes>
      )}
      <SpeedInsights />
    </Router>
  );
}

export default App;