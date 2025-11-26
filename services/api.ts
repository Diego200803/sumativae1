//services/api.ts
import { Task } from '../types/task';

// Simulación de base de datos en memoria
let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Tarea de ejemplo',
    description: 'Esta es una tarea de prueba',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  // Obtener todas las tareas
  getTasks: async (): Promise<Task[]> => {
    try {
      console.log('📡 Llamando a getTasks...');
      await delay(300); // Simular latencia
      console.log('✅ Tasks obtenidas:', mockTasks);
      return [...mockTasks];
    } catch (error) {
      console.error('❌ Error en getTasks:', error);
      throw error;
    }
  },

  // Crear una nueva tarea
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    try {
      console.log('📡 Creando tarea...');
      await delay(300);
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        completed: false
      };
      mockTasks.push(newTask);
      console.log('✅ Tarea creada:', newTask);
      return newTask;
    } catch (error) {
      console.error('❌ Error en createTask:', error);
      throw error;
    }
  },

  // Actualizar una tarea
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    try {
      console.log('📡 Actualizando tarea con ID:', id);
      await delay(300);
      const index = mockTasks.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Tarea no encontrada');
      
      mockTasks[index] = { ...mockTasks[index], ...task };
      console.log('✅ Tarea actualizada:', mockTasks[index]);
      return mockTasks[index];
    } catch (error) {
      console.error('❌ Error en updateTask:', error);
      throw error;
    }
  },

  // Eliminar una tarea
  deleteTask: async (id: string): Promise<void> => {
    try {
      console.log('📡 Eliminando tarea con ID:', id);
      await delay(300);
      mockTasks = mockTasks.filter(t => t.id !== id);
      console.log('✅ Tarea eliminada. Tareas restantes:', mockTasks);
    } catch (error) {
      console.error('❌ Error en deleteTask:', error);
      throw error;
    }
  }
};