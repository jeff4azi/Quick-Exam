import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";

const OnboardingRoute = ({ children }) => {
  const { user, loading, profileValid } = useAuth();

  if (loading) {
    return <LoadingScreen text="Checking Profile" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profileValid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OnboardingRoute;
