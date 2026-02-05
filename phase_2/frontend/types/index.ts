export interface Task {
  id: number; // Backend uses integer ID for tasks
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date?: string; // ISO string
  category?: string;
  tags?: string[];
  notification_settings?: Record<string, any>;
  user_id: string; // Still present in the response but not needed for API calls
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}