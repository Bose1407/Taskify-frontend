
import React, { useMemo, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/tasks/TaskCard";
import TaskDialog from "@/components/tasks/TaskDialog";
import { useTasks } from "@/contexts/TasksContext";
import TasksFilters from "@/components/tasks/TasksFilters";
import { PlusCircle } from "lucide-react";

const Tasks = () => {
  const { tasks, createTask, updateTask, deleteTask, isLoading } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    searchTerm: "",
  });

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    tasks.forEach((task) => {
      uniqueCategories.add(task.category);
    });
    return Array.from(uniqueCategories);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Filter by status
      if (filters.status !== "all" && task.status !== filters.status) {
        return false;
      }

      // Filter by priority
      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false;
      }

      // Filter by category
      if (filters.category !== "all" && task.category !== filters.category) {
        return false;
      }

      // Filter by search term
      if (
        filters.searchTerm &&
        !task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !task.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [tasks, filters]);

  const handleNewTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (taskId: string) => {
    setEditingTask(taskId);
    setDialogOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleTaskSubmit = async (values: any) => {
    if (editingTask) {
      await updateTask(editingTask, values);
    } else {
      await createTask(values);
    }
  };

  const handleStatusChange = async (taskId: string, status: 'todo' | 'in-progress' | 'completed') => {
    await updateTask(taskId, { status });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const editingTaskData = useMemo(() => {
    if (!editingTask) return undefined;
    return tasks.find((task) => task._id === editingTask);
  }, [editingTask, tasks]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-taskify-purple border-r-transparent border-b-taskify-purple border-l-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <Button onClick={handleNewTask} className="bg-taskify-purple hover:bg-taskify-dark-purple">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </div>

        <TasksFilters onFilterChange={handleFilterChange} categories={categories} />

        {filteredTasks.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-card p-8 text-center rounded-lg border">
            <h3 className="text-lg font-medium">No tasks found</h3>
            <p className="text-muted-foreground mt-2 mb-4">
              {tasks.length > 0
                ? "Try adjusting your filters or search terms"
                : "Get started by creating your first task"}
            </p>
            <Button
              variant="secondary"
              onClick={handleNewTask}
              className="mt-2"
            >
              Create Task
            </Button>
          </div>
        )}
      </div>

      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleTaskSubmit}
        initialData={editingTaskData}
        isEditing={!!editingTask}
      />
    </DashboardLayout>
  );
};

export default Tasks;
