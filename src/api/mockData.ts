
import { Task } from "./apiClient";

// Local storage keys
const TASKS_STORAGE_KEY = "taskify-tasks";
const USERS_STORAGE_KEY = "taskify-users";
const CURRENT_USER_ID_KEY = "taskify-current-user-id";

// Sample user data
export const sampleUsers = [
  {
    _id: "user1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123", // In a real app, this would be hashed
  },
];

// Sample task data
export const sampleTasks: Task[] = [
  {
    _id: "task1",
    title: "Complete project proposal",
    description: "Draft the project proposal for client review including timeline and budget.",
    priority: "high",
    status: "in-progress",
    category: "Work",
    user: "user1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "task2",
    title: "Schedule team meeting",
    description: "Set up weekly team meeting to discuss progress and roadblocks.",
    priority: "medium",
    status: "todo",
    category: "Work",
    user: "user1",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "task3",
    title: "Update portfolio website",
    description: "Add recent projects to portfolio and update skills section.",
    priority: "low",
    status: "todo",
    category: "Personal",
    user: "user1",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "task4",
    title: "Read 'The Pragmatic Programmer'",
    description: "Complete reading one chapter per day.",
    priority: "medium",
    status: "in-progress",
    category: "Education",
    user: "user1",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "task5",
    title: "Pay utility bills",
    description: "Pay electricity, water, and internet bills for the month.",
    priority: "high",
    status: "completed",
    category: "Finance",
    user: "user1",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "task6",
    title: "Daily workout",
    description: "Complete 30 minutes of cardio and 15 minutes of strength training.",
    priority: "medium",
    status: "completed",
    category: "Health",
    user: "user1",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initialize local storage with sample data
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(sampleUsers));
  }
  
  if (!localStorage.getItem(TASKS_STORAGE_KEY)) {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(sampleTasks));
  }
};

// Get all tasks for the current user
export const getTasks = () => {
  const tasksString = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!tasksString) return [];
  
  return JSON.parse(tasksString) as Task[];
};

// Generate a simple UUID
export const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
