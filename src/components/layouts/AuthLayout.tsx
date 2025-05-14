
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  authType: "login" | "register";
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, authType }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side - Logo & Branding */}
      <div className="md:w-1/2 bg-taskify-purple p-8 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center md:text-left">
          <div className="mb-6 flex justify-center md:justify-start">
            <div className="flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span className="text-2xl font-bold">Taskify</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Manage your tasks with ease</h1>
          <p className="text-lg mb-8 opacity-90">
            Create, organize, and track your tasks all in one place.
            Stay productive and never miss a deadline.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {["Organize", "Prioritize", "Track Progress"].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 p-4 rounded-lg text-center"
              >
                <p className="text-sm font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="text-center text-sm">
            {authType === "login" ? (
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-taskify-purple hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-taskify-purple hover:underline font-medium">
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
