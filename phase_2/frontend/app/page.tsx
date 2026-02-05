'use client';

import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ProtectedRoute from '../components/ProtectedRoute';
import MobileMenu from '../components/MobileMenu';
import { Task } from '../types';
import TaskApiService from '../services/task-api';
import authService from '../services/auth';

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string>('');

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {

      const token = await authService.getToken()
      console.log(token)
      console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

      try {
        const authenticated = await authService.isAuthenticated();

        if (authenticated) {
          const user = await authService.getCurrentUser();
          if (user) {
            setUserId(user.id);
          }
        }
        // Don't redirect here since ProtectedRoute handles it
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
  }, []);

  // Load tasks when component mounts or user ID changes
  useEffect(() => {
    if (userId) {
      loadTasks();
    }
  }, [userId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await TaskApiService.getUserTasks({
        limit: 100, // Get all tasks initially
      });

      setTasks(response.tasks);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskSubmit = async (task: Task) => {
    try {
      if (editingTask) {
        // Update existing task
        const updatedTask = await TaskApiService.updateTask(task.id, {
          title: task.title,
          description: task.description,
          completed: task.completed,
          priority: task.priority,
          due_date: task.due_date || undefined,
          category: task.category,
          tags: task.tags,
          notification_settings: task.notification_settings
        });

        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setEditingTask(null);
      } else {
        // Create new task
        const newTask = await TaskApiService.createTask({
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_date: task.due_date || undefined,
          category: task.category,
          tags: task.tags,
          notification_settings: task.notification_settings
        });

        setTasks([newTask, ...tasks]);
      }

      setShowForm(false);
    } catch (err) {
      setError('Failed to save task. Please try again.');
      console.error('Error saving task:', err);
    }
  };

  const handleTaskToggleComplete = async (task: Task) => {
    try {
      const toggledTask = await TaskApiService.toggleTaskCompletion(task.id);
      setTasks(tasks.map(t => t.id === task.id ? toggledTask : t));
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error toggling task completion:', err);
    }
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleTaskDelete = async (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await TaskApiService.deleteTask(taskId); // taskId is already a number
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (err) {
        setError('Failed to delete task. Please try again.');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleAddNewTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };



  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
      {/* Header with mobile menu button */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold text-gray-900 hidden sm:block">TODO MANAGER</h1>
              <h1 className="text-xl font-bold text-gray-900 sm:hidden">TODO MANAGER</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0e0e0e]"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>


              {/* Show add task button on mobile as floating action button */}
              <button
                onClick={handleAddNewTask}
                className="sm:hidden inline-flex items-center justify-center p-3 bg-[#2e2e2e] text-white rounded-full shadow-md hover:bg-[#4b4b4b] focus:outline-none focus:ring-2 focus:ring-[#0e0e0e] focus:ring-offset-2"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop heading and button */}
        <div className="hidden sm:flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <button
            onClick={handleAddNewTask}
            className="inline-flex items-center px-4 py-2 bg-[#3b3a3b] text-white rounded-md hover:bg-[#585858] focus:outline-none focus:ring-2 focus:ring-[#2e2e2e] focus:ring-offset-2"
          >
            Add New Task
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <TaskForm
              userId={userId}
              onSubmit={handleTaskSubmit}
              onCancel={handleCancelForm}
              initialTask={editingTask || undefined}
            />
          </div>
        )}

        <TaskList
          userId={userId}
          tasks={tasks}
          onTaskToggleComplete={handleTaskToggleComplete}
          onTaskEdit={handleTaskEdit}
          onTaskDelete={handleTaskDelete}
          loading={loading}
          error={error || undefined}
        />
      </main>
    </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;