import React, { useState } from 'react';
import { Task } from '../types';
import TaskApiService from '../services/task-api';

interface TaskFormProps {
  userId: string;
  onSubmit: (task: Task) => void;
  onCancel?: () => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ userId, onSubmit, onCancel, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialTask?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialTask?.due_date || '');
  const [category, setCategory] = useState(initialTask?.category || '');
  const [tags, setTags] = useState(initialTask?.tags?.join(', ') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (title.trim().length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const taskData = {
        title: title.trim(),
        description,
        priority,
        due_date: dueDate || undefined,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        notification_settings: {}
      };

      let savedTask: Task;

      // If initialTask exists, we're updating, otherwise creating
      if (initialTask) {
        // Update existing task via API
        savedTask = await TaskApiService.updateTask(initialTask.id, {
          ...taskData,
          completed: initialTask.completed, // Preserve completion status
        });
      } else {
        // Create new task via API
        savedTask = await TaskApiService.createTask(taskData);
      }

      onSubmit(savedTask);

      // Reset form if creating new task
      if (!initialTask) {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setCategory('');
        setTags('');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to save task. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {initialTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#3f3f3f]'
          }`}
          placeholder="Task title"
          disabled={isLoading}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f3f3f]"
          rows={3}
          placeholder="Task description"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f3f3f]"
            disabled={isLoading}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f3f3f]"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f3f3f]"
            placeholder="Task category"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f3f3f]"
            placeholder="tag1, tag2, tag3"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className={`px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#525252] focus:outline-none focus:ring-2 focus:ring-[#3f3f3f] focus:ring-offset-2 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialTask ? 'Update Task' : 'Create Task'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
      </div>

      {errors.submit && <p className="text-red-500 text-sm mt-4">{errors.submit}</p>}
    </form>
  );
};

export default TaskForm;