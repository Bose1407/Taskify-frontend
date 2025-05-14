import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, active, onClick }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      active
        ? "bg-taskify-purple text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-taskify-light-purple hover:text-taskify-purple"
    )}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      active: location.pathname === "/dashboard",
    },
    {
      to: "/tasks",
      label: "Tasks",
      icon: <ListTodo size={20} />,
      active: location.pathname === "/tasks",
    },
    {
      to: "/analytics",
      label: "Analytics",
      icon: <BarChart3 size={20} />,
      active: location.pathname === "/analytics",
    },
    {
      to: "/settings",
      label: "Settings",
      icon: <Settings size={20} />,
      active: location.pathname === "/settings",
    },
  ];

  return (
    <div className="h-screen bg-gray-50 dark:bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-card border-r border-border fixed inset-y-0 left-0 z-30">
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-taskify-purple"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <span className="text-xl font-bold">Taskify</span>
          </Link>
        </div>

        <Separator />

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <Separator />

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-taskify-purple text-white">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              aria-label="Log out"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content wrapper for scrollable area */}
      <div className="md:ml-64 flex flex-col h-screen">
        {/* Mobile header */}
        <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-card border-b border-border z-20 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-taskify-purple"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span className="text-xl font-bold">Taskify</span>
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-taskify-purple text-white">
                    {user?.name ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email || "user@example.com"}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                <LogOut size={16} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Mobile sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-10 bg-black/50" onClick={closeMobileMenu}>
            <aside
              className="w-64 h-full bg-white dark:bg-card overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-16 pb-4 px-4">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.to}
                      {...item}
                      onClick={closeMobileMenu}
                    />
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col min-h-0  pt-16 md:pt-0">
          <div className="flex-1 container px-4 py-6 mx-auto flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
