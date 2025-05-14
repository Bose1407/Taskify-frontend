
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { 
  Task, 
  CreateTaskInput, 
  UpdateTaskInput, 
  tasksApi 
} from "@/api/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TasksContextType {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  createTask: (task: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, task: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  filterTasks: (filter: TaskFilter) => Task[];
}

interface TaskFilter {
  status?: 'todo' | 'in-progress' | 'completed' | 'all';
  priority?: 'low' | 'medium' | 'high' | 'all';
  category?: string | 'all';
  searchTerm?: string;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  // Fetch all tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAllTasks,
    meta: {
      onError: (error: Error) => {
        setError(error);
      }
    }
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully!");
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: string; task: UpdateTaskInput }) => 
      tasksApi.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully!");
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!");
    },
  });

  // Create task function
  const createTask = async (task: CreateTaskInput) => {
    await createTaskMutation.mutateAsync(task);
  };

  // Update task function
  const updateTask = async (id: string, task: UpdateTaskInput) => {
    await updateTaskMutation.mutateAsync({ id, task });
  };

  // Delete task function
  const deleteTask = async (id: string) => {
    await deleteTaskMutation.mutateAsync(id);
  };

  // Get task by id
  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task._id === id);
  };

  // Filter tasks
  const filterTasks = (filter: TaskFilter): Task[] => {
    return tasks.filter(task => {
      // Filter by status
      if (filter.status && filter.status !== 'all' && task.status !== filter.status) {
        return false;
      }

      // Filter by priority
      if (filter.priority && filter.priority !== 'all' && task.priority !== filter.priority) {
        return false;
      }

      // Filter by category
      if (filter.category && filter.category !== 'all' && task.category !== filter.category) {
        return false;
      }

      // Filter by search term
      if (
        filter.searchTerm &&
        !task.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) &&
        !task.description.toLowerCase().includes(filter.searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        createTask,
        updateTask,
        deleteTask,
        getTaskById,
        filterTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
