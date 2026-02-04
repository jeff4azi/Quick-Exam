import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, stateCheck = true }) => {
  const isAuthenticated = true;

  // 🔐 Auth check FIRST
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // 🧠 State check SECOND
  if (!stateCheck) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;