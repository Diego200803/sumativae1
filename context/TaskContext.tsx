//context/TaskContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types/task';
import { taskService } from '../services/api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await taskService.createTask(task);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Error al crear la tarea');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await taskService.updateTask(id, task);
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe ser usado dentro de TaskProvider');
  }
  return context;
};