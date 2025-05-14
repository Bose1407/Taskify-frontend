
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Task } from "@/api/apiClient";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: 'todo' | 'in-progress' | 'completed') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-low";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      default:
        return "To Do";
    }
  };

  const getDueDateDisplay = () => {
    if (!task.dueDate) return null;
    
    try {
      const dueDate = new Date(task.dueDate);
      return (
        <p className="text-xs text-muted-foreground">
          Due {formatDistanceToNow(dueDate, { addSuffix: true })}
        </p>
      );
    } catch (error) {
      return null;
    }
  };

  return (
    <Card className="task-card animated-enter">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex gap-2 items-center mb-2 flex-wrap">
            <Badge className={getPriorityClass(task.priority)}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
            <Badge variant="outline">{task.category}</Badge>
            <Badge className={getStatusClass(task.status)}>
              {getStatusLabel(task.status)}
            </Badge>
          </div>
          
          <h3 className="font-medium text-lg mb-1">{task.title}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {task.description}
          </p>
          
          <div className="flex justify-between items-center">
            {getDueDateDisplay()}
          </div>
        </div>
        
        <div className="ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task._id)}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => onDelete(task._id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={() => onStatusChange(task._id, 'todo')}
                disabled={task.status === 'todo'}
              >
                Mark as To Do
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => onStatusChange(task._id, 'in-progress')}
                disabled={task.status === 'in-progress'}
              >
                Mark as In Progress
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => onStatusChange(task._id, 'completed')}
                disabled={task.status === 'completed'}
              >
                Mark as Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
