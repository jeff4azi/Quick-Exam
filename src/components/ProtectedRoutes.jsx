import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, stateCheck }) => {
  if (!stateCheck) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-gray-700 dark:text-gray-300">
        <p>Required data is missing. Redirecting to home...</p>
        <Navigate to="/" replace />
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;