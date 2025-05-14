import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  LayoutDashboard, 
  ListTodo, 
  BarChart3, 
  Clock,
  ChevronRight,
  Calendar,
  Tag,
  Users,
  Check,
} from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="28" 
                  height="28" 
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
                <span className="ml-2 text-xl font-bold text-gray-900">Taskify</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-taskify-purple hover:bg-taskify-dark-purple">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="block">Streamline your work with</span>
                <span className="block text-taskify-purple">Taskify</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-lg">
                The intuitive task management system that helps teams and individuals stay organized and productive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register">
                  <Button size="lg" className="bg-taskify-purple hover:bg-taskify-dark-purple px-6">
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="px-6">
                    Login
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { text: "Task Organization", icon: <ListTodo size={18} /> },
                  { text: "Progress Tracking", icon: <BarChart3 size={18} /> },
                  { text: "Deadline Alerts", icon: <Clock size={18} /> },
                  { text: "Team Collaboration", icon: <Users size={18} /> },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-taskify-light-purple text-taskify-purple">
                      {feature.icon}
                    </div>
                    <p className="ml-3 text-base text-gray-700 font-medium">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-gray-100 mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
                  <div className="text-xs bg-taskify-light-purple text-taskify-purple px-2 py-1 rounded-full">
                    3/5 Completed
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Design new landing page", checked: true, priority: "High" },
                    { title: "Prepare quarterly presentation", checked: true, priority: "Medium" },
                    { title: "Review client feedback", checked: true, priority: "Low" },
                    { title: "Team meeting at 2 PM", checked: false, priority: "High" },
                    { title: "Update project documentation", checked: false, priority: "Medium" },
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-start p-3 hover:bg-gray-50 rounded-md group">
                      <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-0.5 mr-3 flex items-center justify-center ${
                        task.checked 
                          ? "bg-taskify-purple text-white" 
                          : "border border-gray-300"
                      }`}>
                        {task.checked && <Check size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${task.checked ? "line-through text-gray-500" : "text-gray-900"}`}>
                          {task.title}
                        </p>
                        <div className="mt-1 flex items-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            task.priority === "High" 
                              ? "bg-red-100 text-red-800" 
                              : task.priority === "Medium" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-green-100 text-green-800"
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6">
                  View All Tasks
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features for Your Productivity
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to manage tasks efficiently and collaborate with your team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Progress Tracking",
                description: "Visualize your productivity with intuitive charts and track completion rates across projects.",
                icon: <BarChart3 className="h-6 w-6" />,
                color: "text-blue-500"
              },
              {
                title: "Priority Management",
                description: "Set priority levels and deadlines to focus on what matters most and optimize your workflow.",
                icon: <Tag className="h-6 w-6" />,
                color: "text-purple-500"
              },
              {
                title: "Task Organization",
                description: "Create projects, categories, and tags to keep different areas of your work neatly organized.",
                icon: <ListTodo className="h-6 w-6" />,
                color: "text-green-500"
              },
              {
                title: "Calendar Integration",
                description: "Sync tasks with your calendar and never miss important deadlines or meetings.",
                icon: <Calendar className="h-6 w-6" />,
                color: "text-red-500"
              },
              {
                title: "Team Collaboration",
                description: "Assign tasks, leave comments, and track progress together with your team members.",
                icon: <Users className="h-6 w-6" />,
                color: "text-yellow-500"
              },
              {
                title: "Detailed Analytics",
                description: "Get insights into your productivity patterns and identify areas for improvement.",
                icon: <LayoutDashboard className="h-6 w-6" />,
                color: "text-indigo-500"
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className={`h-12 w-12 rounded-lg ${feature.color.replace('text', 'bg') + '100'} flex items-center justify-center ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by teams worldwide
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Join thousands of satisfied users boosting their productivity with Taskify.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Taskify has transformed how our team manages projects. We've seen a 40% increase in productivity since switching.",
                name: "Sarah Johnson",
                role: "Product Manager, TechCorp"
              },
              {
                quote: "As a freelancer, keeping track of multiple clients was chaotic. Taskify simplified everything in one intuitive interface.",
                name: "Michael Chen",
                role: "Freelance Designer"
              },
              {
                quote: "The analytics features helped us identify bottlenecks in our workflow we didn't even know existed.",
                name: "David Wilson",
                role: "CTO, Startup Inc"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-taskify-light-purple flex items-center justify-center text-taskify-purple font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-taskify-purple py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to transform your productivity?
          </h2>
          <p className="mt-4 text-xl text-taskify-light-purple max-w-3xl mx-auto">
            Join thousands of professionals and teams who use Taskify to stay organized and get more done.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-taskify-purple hover:bg-gray-100 px-8">
                Get Started For Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:bg-opacity-10 px-8">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
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
                className="text-white"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span className="ml-2 text-xl font-bold">Taskify</span>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Taskify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;