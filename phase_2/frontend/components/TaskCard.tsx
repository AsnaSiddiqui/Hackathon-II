import React from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void; // Updated to accept number since task.id is now number
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const handleToggleComplete = () => {
    if (onToggleComplete) {
      onToggleComplete({ ...task, completed: !task.completed });
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };

  // Format due date if it exists
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Determine priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`border rounded-lg p-4 shadow-sm transition-all duration-200 ${
      task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="mt-1 h-4 w-4 text-[#474747] rounded focus:ring-[#313131]"
          />
          <div className="ml-3">
            <h3 className={`font-medium ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-sm text-gray-600">{task.description}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-gray-500 hover:text-[#353535] focus:outline-none"
            aria-label="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>

          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-500 focus:outline-none"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex space-x-2">
          {task.priority && (
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}

          {task.category && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-[#383838]">
              {task.category}
            </span>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {task.due_date && (
          <span className="text-xs text-gray-500">
            Due: {formatDate(task.due_date)}
          </span>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Created: {formatDate(task.created_at)}
      </div>
    </div>
  );
};

export default TaskCard;