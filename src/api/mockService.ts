
import { initializeLocalStorage, getTasks, generateId } from "./mockData";
import { Task, CreateTaskInput, UpdateTaskInput } from "./apiClient";

// Initialize mock data in localStorage
initializeLocalStorage();

// Simulate API request delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Auth Service
export const mockAuthService = {
  login: async (email: string, password: string) => {
    await delay(800); // Simulate network delay
    
    const usersString = localStorage.getItem("taskify-users");
    if (!usersString) {
      throw new Error("No users found");
    }
    
    const users = JSON.parse(usersString);
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // Create a JWT-like token (not a real token, just for simulation)
    const token = btoa(JSON.stringify({ userId: user._id, email: user.email }));
    localStorage.setItem("taskify-current-user-id", user._id);
    
    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },
  
  register: async (name: string, email: string, password: string) => {
    await delay(800); // Simulate network delay
    
    const usersString = localStorage.getItem("taskify-users");
    if (!usersString) {
      throw new Error("Error initializing user database");
    }
    
    const users = JSON.parse(usersString);
    
    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error("Email already exists");
    }
    
    // Create new user
    const newUser = {
      _id: `user-${generateId()}`,
      name,
      email,
      password, // In a real app, this would be hashed
    };
    
    // Save user to localStorage
    localStorage.setItem("taskify-users", JSON.stringify([...users, newUser]));
    localStorage.setItem("taskify-current-user-id", newUser._id);
    
    // Create a JWT-like token
    const token = btoa(JSON.stringify({ userId: newUser._id, email: newUser.email }));
    
    return {
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  },
  
  getCurrentUser: async () => {
    await delay(500); // Simulate network delay
    
    const token = localStorage.getItem("taskify-token");
    if (!token) {
      throw new Error("No token found");
    }
    
    const currentUserId = localStorage.getItem("taskify-current-user-id");
    if (!currentUserId) {
      throw new Error("User not found");
    }
    
    const usersString = localStorage.getItem("taskify-users");
    if (!usersString) {
      throw new Error("No users found");
    }
    
    const users = JSON.parse(usersString);
    const user = users.find((u: any) => u._id === currentUserId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },
};

// Mock Task Service
export const mockTaskService = {
  getAllTasks: async () => {
    await delay(600); // Simulate network delay
    
    const userId = localStorage.getItem("taskify-current-user-id");
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const tasks = getTasks();
    return tasks.filter(task => task.user === userId || task.user === "user1"); // Show demo tasks too
  },
  
  getTaskById: async (id: string) => {
    await delay(300); // Simulate network delay
    
    const userId = localStorage.getItem("taskify-current-user-id");
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const tasks = getTasks();
    const task = tasks.find(t => t._id === id);
    
    if (!task) {
      throw new Error("Task not found");
    }
    
    if (task.user !== userId && task.user !== "user1") {
      throw new Error("Unauthorized access to task");
    }
    
    return task;
  },
  
  createTask: async (taskData: CreateTaskInput) => {
    await delay(500); // Simulate network delay
    
    const userId = localStorage.getItem("taskify-current-user-id");
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const tasks = getTasks();
    
    const newTask: Task = {
      _id: `task-${generateId()}`,
      ...taskData,
      user: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem("taskify-tasks", JSON.stringify([...tasks, newTask]));
    
    return newTask;
  },
  
  updateTask: async (id: string, taskData: UpdateTaskInput) => {
    await delay(500); // Simulate network delay
    
    const userId = localStorage.getItem("taskify-current-user-id");
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t._id === id);
    
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    const task = tasks[taskIndex];
    if (task.user !== userId && task.user !== "user1") {
      throw new Error("Unauthorized to update this task");
    }
    
    const updatedTask: Task = {
      ...task,
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    
    tasks[taskIndex] = updatedTask;
    
    localStorage.setItem("taskify-tasks", JSON.stringify(tasks));
    
    return updatedTask;
  },
  
  deleteTask: async (id: string) => {
    await delay(500); // Simulate network delay
    
    const userId = localStorage.getItem("taskify-current-user-id");
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t._id === id);
    
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    const task = tasks[taskIndex];
    if (task.user !== userId && task.user !== "user1") {
      throw new Error("Unauthorized to delete this task");
    }
    
    const newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);
    
    localStorage.setItem("taskify-tasks", JSON.stringify(newTasks));
    
    return { success: true, message: "Task deleted successfully" };
  },
};

// Mock Analytics Service
export const mockAnalyticsService = {
  getTasksStats: async () => {
    await delay(700); // Simulate network delay
    
    const userId = localStorage.getItem("taskify-current-user-id");
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const tasks = getTasks();
    const userTasks = tasks.filter(t => t.user === userId || t.user === "user1");
    
    const total = userTasks.length;
    const completed = userTasks.filter(t => t.status === "completed").length;
    const inProgress = userTasks.filter(t => t.status === "in-progress").length;
    const todo = userTasks.filter(t => t.status === "todo").length;
    
    const byPriority = {
      high: userTasks.filter(t => t.priority === "high").length,
      medium: userTasks.filter(t => t.priority === "medium").length,
      low: userTasks.filter(t => t.priority === "low").length,
    };
    
    const byCategory: Record<string, number> = {};
    userTasks.forEach(task => {
      byCategory[task.category] = (byCategory[task.category] || 0) + 1;
    });
    
    return {
      total,
      completed,
      inProgress,
      todo,
      byPriority,
      byCategory,
    };
  },
};
