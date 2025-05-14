
import { toast } from "sonner";

// Use the actual API URL when deploying
const API_BASE_URL ="https://taskify-backend-bey2.onrender.com/api";

interface ApiOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

// Helper for API requests with error handling
export async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  data?: object,
  requiresAuth: boolean = true
): Promise<T> {
  try {
    const options: ApiOptions = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Add auth token to headers if required and available
    if (requiresAuth) {
      const token = localStorage.getItem("taskify-token");
      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // Add body data if provided
    if (data) {
      options.body = JSON.stringify(data);
    }

    console.log(`Making API request to ${API_BASE_URL}${endpoint}`, options);

    // Make the actual API request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }

    return responseData.data || responseData;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    toast.error(message);
    throw error;
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string) => 
    apiRequest<AuthResponse>("/auth/login", "POST", { email, password }, false),
  
  register: (name: string, email: string, password: string) => 
    apiRequest<AuthResponse>("/auth/register", "POST", { name, email, password }, false),
  
  getCurrentUser: () => 
    apiRequest<{ user: User }>("/auth/me", "GET"),
};

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

// Tasks API
export const tasksApi = {
  getAllTasks: () => 
    apiRequest<Task[]>("/tasks"),
  
  getTaskById: (id: string) => 
    apiRequest<Task>(`/tasks/${id}`),
  
  createTask: (task: CreateTaskInput) => 
    apiRequest<Task>("/tasks", "POST", task),
  
  updateTask: (id: string, task: UpdateTaskInput) => 
    apiRequest<Task>(`/tasks/${id}`, "PUT", task),
  
  deleteTask: (id: string) => 
    apiRequest(`/tasks/${id}`, "DELETE"),
};

// Task types
export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
  category: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
  category: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {}

// Analytics API
export const analyticsApi = {
  getTasksStats: () => 
    apiRequest<TasksStats>("/tasks/stats"),
};

export interface TasksStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  byCategory: Record<string, number>;
}
