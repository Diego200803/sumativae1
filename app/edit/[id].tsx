import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TaskForm } from '../../components/TaskForm';
import { useTaskContext } from '../../context/TaskContext';

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const { tasks, updateTask, loading } = useTaskContext();
  const router = useRouter();

  const task = tasks.find(t => t.id === id);

  const handleSubmit = async (title: string, description: string) => {
    if (typeof id === 'string') {
      await updateTask(id, { title, description });
      router.back();
    }
  };

  if (loading && !task) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Tarea no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Tarea</Text>
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
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
  },
});
