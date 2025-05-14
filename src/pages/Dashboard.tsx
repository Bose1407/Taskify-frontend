
import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/tasks/TaskCard";
import TaskDialog from "@/components/tasks/TaskDialog";
import { useTasks } from "@/contexts/TasksContext";
import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/dashboard/StatCard";
import TaskDistributionChart from "@/components/dashboard/TaskDistributionChart";
import { PlusCircle, CheckCircle, Clock, ListTodo } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, createTask, updateTask, deleteTask, isLoading } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }, [tasks]);

  const urgentTasks = useMemo(() => {
    return tasks.filter(task => task.priority === "high" && task.status !== "completed").slice(0, 3);
  }, [tasks]);
  
  // Task statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const inProgress = tasks.filter(t => t.status === "in-progress").length;
    const todo = tasks.filter(t => t.status === "todo").length;
    
    const byPriority = {
      high: tasks.filter(t => t.priority === "high").length,
      medium: tasks.filter(t => t.priority === "medium").length,
      low: tasks.filter(t => t.priority === "low").length
    };
    
    const byCategory: Record<string, number> = {};
    tasks.forEach(task => {
      byCategory[task.category] = (byCategory[task.category] || 0) + 1;
    });
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      inProgress,
      todo,
      byPriority,
      byCategory,
      completionRate
    };
  }, [tasks]);

  // Chart data for distribution
  const statusChartData = useMemo(() => [
    { name: "To Do", value: stats.todo, color: "#8A898C" },
    { name: "In Progress", value: stats.inProgress, color: "#0EA5E9" },
    { name: "Completed", value: stats.completed, color: "#10B981" },
  ], [stats]);

  const priorityChartData = useMemo(() => [
    { name: "High", value: stats.byPriority.high, color: "#ea384c" },
    { name: "Medium", value: stats.byPriority.medium, color: "#F97316" },
    { name: "Low", value: stats.byPriority.low, color: "#0EA5E9" },
  ], [stats]);

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

  const editingTaskData = useMemo(() => {
    if (!editingTask) return undefined;
    return tasks.find(task => task._id === editingTask);
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

  // ... (keep all your existing imports and other code)

return (
  <DashboardLayout>
    <div className="space-y-6 pb-6"> {/* Added pb-6 for bottom padding */}
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}!
          </p>
        </div>
        <Button onClick={handleNewTask} className="bg-taskify-purple hover:bg-taskify-dark-purple">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* ... keep your StatCard components ... */}
      </div>

      {/* Charts */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <TaskDistributionChart data={statusChartData} />
        <TaskDistributionChart data={priorityChartData} />
      </div>

      {/* Tasks Sections - Removed the extra space-y-6 wrapper */}
      {/* Recent Tasks Section */}
      <div className="mt-6"> {/* Added mt-6 instead of space-y-6 */}
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
        {recentTasks.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {recentTasks.map((task) => (
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
          <div className="bg-white dark:bg-card p-6 text-center rounded-lg border">
            <h3 className="font-medium">No tasks yet</h3>
            <p className="text-muted-foreground mt-1">
              Get started by creating your first task
            </p>
            <Button
              variant="secondary"
              onClick={handleNewTask}
              className="mt-4"
            >
              Create Task
            </Button>
          </div>
        )}
      </div>

      {/* Urgent Tasks Section */}
      <div className="mt-6"> {/* Added mt-6 instead of space-y-6 */}
        <h2 className="text-xl font-semibold mb-4">Urgent Tasks</h2>
        {urgentTasks.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {urgentTasks.map((task) => (
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
          <div className="bg-white dark:bg-card p-6 text-center rounded-lg border">
            <h3 className="font-medium">No urgent tasks</h3>
            <p className="text-muted-foreground mt-1">
              You're all caught up!
            </p>
          </div>
        )}
      </div>
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

export default Dashboard;
