import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

/**
 * GuestRoute - Only allows unauthenticated users to access certain pages
 * Redirects authenticated users to the home page
 * Used for pages like Login, SignUp, Reset Password, etc.
 */
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Loading" />;
  }

  // If user is authenticated, redirect to home page
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, show the guest page (login, signup, etc.)
  return children;
};

export default GuestRoute;
