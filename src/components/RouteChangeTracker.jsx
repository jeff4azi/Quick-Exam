import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "../utils/analytics";

const ROUTE_TITLES = {
  "/": "Home",
  "/choose-course": "Choose Course",
  "/exam": "Exam",
  "/results": "Results",
  "/review-answers": "Review Answers",
  "/history": "History",
  "/leaderboard": "Leaderboard",
  "/bookmarks": "Bookmarks",
  "/profile": "Profile",
  "/premium": "Premium",
  "/flashcards": "Flashcards",
  "/match": "Match",
  "/match-result": "Match Result",
  "/test": "Test Mode",
  "/test-result": "Test Result",
  "/login": "Login",
  "/signup": "Sign Up",
  "/landing": "Landing",
  "/onboarding": "Onboarding",
  "/reset-password": "Reset Password",
  "/update-password": "Update Password",
  "/confirm-email": "Confirm Email",
  "/upload-profile-pic": "Upload Profile Picture",
  "/about": "About",
};

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const title = ROUTE_TITLES[location.pathname] ?? "Quiz Bolt";
    trackPage(location.pathname + location.search, title);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteChangeTracker;
