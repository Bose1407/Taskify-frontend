
import React, { useMemo } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/contexts/TasksContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const Analytics = () => {
  const { tasks, isLoading } = useTasks();

  // Task statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const todo = tasks.filter((t) => t.status === "todo").length;

    const byPriority = {
      high: tasks.filter((t) => t.priority === "high").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      low: tasks.filter((t) => t.priority === "low").length,
    };

    const byCategory: Record<string, number> = {};
    tasks.forEach((task) => {
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
      completionRate,
    };
  }, [tasks]);

  // Status distribution data
  const statusData = useMemo(
    () => [
      { name: "To Do", value: stats.todo, fill: "#8A898C" },
      { name: "In Progress", value: stats.inProgress, fill: "#0EA5E9" },
      { name: "Completed", value: stats.completed, fill: "#10B981" },
    ],
    [stats]
  );

  // Priority distribution data
  const priorityData = useMemo(
    () => [
      { name: "High", value: stats.byPriority.high, fill: "#ea384c" },
      { name: "Medium", value: stats.byPriority.medium, fill: "#F97316" },
      { name: "Low", value: stats.byPriority.low, fill: "#0EA5E9" },
    ],
    [stats]
  );

  // Category distribution data
  const categoryData = useMemo(() => {
    return Object.entries(stats.byCategory).map(([name, value]) => ({
      name,
      value,
    }));
  }, [stats]);

  // Weekly progress data (for demonstration purposes with sample data)
  const weeklyData = [
    { day: "Mon", completed: 2, created: 3 },
    { day: "Tue", completed: 4, created: 2 },
    { day: "Wed", completed: 3, created: 5 },
    { day: "Thu", completed: 5, created: 1 },
    { day: "Fri", completed: 2, created: 3 },
    { day: "Sat", completed: 1, created: 2 },
    { day: "Sun", completed: 0, created: 1 },
  ];

  const COLORS = ["#ea384c", "#F97316", "#0EA5E9", "#10B981", "#8B5CF6", "#D946EF"];

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
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>

        {tasks.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Priority Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priorityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#9b87f5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="#10B981"
                          activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="created" stroke="#9b87f5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Tasks by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value">
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.completionRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.completed} of {stats.total} tasks completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Most Common Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold capitalize">
                    {Object.entries(stats.byPriority).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.max(...Object.values(stats.byPriority))} tasks
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Most Common Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.max(...Object.values(stats.byCategory), 0)} tasks
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No data available</h3>
              <p className="text-muted-foreground">
                Create tasks to see analytics and insights on your productivity
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
