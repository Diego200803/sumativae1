import axios from 'axios';
import { Task } from '../types/task';

// URL pública de Firebase Workstations para json-server
const API_URL = 'https://3000-firebase-sumativatask-1764177843484.cluster-r7kbxfo3fnev2vskbkhhphetq6.cloudworkstations.dev/tasks';

console.log('🔗 API URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL.replace('/tasks', ''),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const taskService = {
  // Obtener todas las tareas
  getTasks: async (): Promise<Task[]> => {
    try {
      console.log('📡 Llamando a getTasks...');
      const response = await apiClient.get<Task[]>('/tasks');
      console.log('✅ Tasks obtenidas:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error en getTasks:', error);
      throw error;
    }
  },

  // Crear una nueva tarea
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    try {
      console.log('📡 Creando tarea...');
      const response = await apiClient.post<Task>('/tasks', {
        ...task,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      console.log('✅ Tarea creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error en createTask:', error);
      throw error;
    }
  },

  // Actualizar una tarea
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    try {
      console.log('📡 Actualizando tarea con ID:', id);
      const response = await apiClient.patch<Task>(`/tasks/${id}`, task);
      console.log('✅ Tarea actualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error en updateTask:', error);
      throw error;
    }
  },

  // Eliminar una tarea
  deleteTask: async (id: string): Promise<void> => {
    try {
      console.log('📡 Eliminando tarea con ID:', id);
      await apiClient.delete(`/tasks/${id}`);
      console.log('✅ Tarea eliminada');
    } catch (error) {
      console.error('❌ Error en deleteTask:', error);
      throw error;
    }
  },
};