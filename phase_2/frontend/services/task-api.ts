import apiClient from './api';
import { Task } from '../types';

interface GetTasksParams {
  limit?: number;
  offset?: number;
  completed?: boolean;
}

interface CreateTaskData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  due_date?: string; // ISO string
  category?: string;
  tags?: string[];
  notification_settings?: Record<string, any>;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  due_date?: string; // ISO string
  category?: string;
  tags?: string[];
  notification_settings?: Record<string, any>;
}

class TaskApiService {
  // Get all tasks for the authenticated user
  static async getUserTasks(params: GetTasksParams = {}): Promise<{ tasks: Task[]; total: number }> {
    const { limit = 20, offset = 0, completed } = params;

    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (completed !== undefined) {
      queryParams.append('completed', completed.toString());
    }

    const response = await apiClient.get<Task[]>(`/tasks/?${queryParams}`);
    return { tasks: response.data, total: response.data.length }; // Note: actual total might come from API differently
  }

  // Create a new task for the authenticated user
  static async createTask(data: CreateTaskData): Promise<Task> {
    // Convert tags and notification_settings to JSON strings for backend compatibility
    const processedData = {
      ...data,
      tags: data.tags ? JSON.stringify(data.tags) : "[]",
      notification_settings: data.notification_settings ? JSON.stringify(data.notification_settings) : "{}"
    };

    const response = await apiClient.post<Task>(`/tasks/`, processedData);
    return response.data;
  }

  // Get a specific task (for the authenticated user)
  static async getTask(taskId: number): Promise<Task> {
    const response = await apiClient.get<Task>(`/tasks/${taskId}`);
    return response.data;
  }

  // Update a task (for the authenticated user)
  static async updateTask(taskId: number, data: UpdateTaskData): Promise<Task> {
    // Convert tags and notification_settings to JSON strings for backend compatibility
    const processedData = {
      ...data,
      tags: data.tags ? JSON.stringify(data.tags) : undefined,
      notification_settings: data.notification_settings ? JSON.stringify(data.notification_settings) : undefined
    };

    // Remove undefined values to avoid sending them to the backend
    const filteredData = Object.fromEntries(
      Object.entries(processedData).filter(([_, value]) => value !== undefined)
    );

    const response = await apiClient.put<Task>(`/tasks/${taskId}`, filteredData);
    return response.data;
  }

  // Delete a task (for the authenticated user)
  static async deleteTask(taskId: number): Promise<void> {
    await apiClient.delete(`/tasks/${taskId}`);
  }

  // Toggle task completion status (for the authenticated user)
  static async toggleTaskCompletion(taskId: number): Promise<Task> {
    const response = await apiClient.patch<Task>(`/tasks/${taskId}/toggle-complete`);
    return response.data;
  }
}

export default TaskApiService;