import axios from 'axios';
import { Task } from '../types/task';

const API_URL = 'http://localhost:3000/tasks';

export const taskService = {
  // Obtener todas las tareas
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Crear una nueva tarea
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await axios.post(API_URL, {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    });
    return response.data;
  },

  // Actualizar una tarea
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  },

  // Eliminar una tarea
  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};
