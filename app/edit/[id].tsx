//edit/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TaskForm } from '../../components/TaskForm';
import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../types/task';

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const { tasks, updateTask, loading } = useTaskContext();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const foundTask = tasks.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      }
    }
  }, [tasks, id]);

  const handleSubmit = async (title: string, description: string) => {
    if (typeof id === 'string') {
      await updateTask(id, { title, description });
      router.back();
    }
  };

  if (loading && !task) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Cargando tarea...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>😕</Text>
        <Text style={styles.errorText}>Tarea no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>✏️</Text>
        <Text style={styles.title}>Editar Tarea</Text>
        <Text style={styles.subtitle}>Modifica los detalles de tu tarea</Text>
      </View>
      <TaskForm 
        onSubmit={handleSubmit} 
        initialTitle={task.title}
        initialDescription={task.description}
        submitButtonText="Actualizar Tarea"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    fontWeight: '600',
  },
});