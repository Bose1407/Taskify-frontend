
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
}

const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // While checking authentication status, show nothing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-taskify-purple border-r-transparent border-b-taskify-purple border-l-transparent"></div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, show the children
  return <>{children}</>;
};

export default RedirectIfAuthenticated;
