import { createContext, useState, useContext, useCallback } from 'react';
import * as api from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTasks();
      setTasks(data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    setError(null);
    try {
      const newTask = await api.createTask(taskData);
      setTasks(prev => [...prev, newTask.data]);
      // Re-fetch to ensure proper sorting
      await fetchTasks();
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Failed to create task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const updateTask = async (id, taskData) => {
    setError(null);
    try {
      const updatedTask = await api.updateTask(id, taskData);
      setTasks(prev => prev.map(task =>
        task._id === id ? updatedTask.data : task
      ));
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Failed to update task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const deleteTask = async (id) => {
    setError(null);
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Failed to delete task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const toggleComplete = async (id) => {
    setError(null);
    try {
      const updatedTask = await api.toggleComplete(id);
      setTasks(prev => prev.map(task =>
        task._id === id ? updatedTask.data : task
      ));
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Failed to toggle task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask,
      toggleComplete
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};
