import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TaskForm } from '../components/TaskForm';
import { useTaskContext } from '../context/TaskContext';
import { useRouter } from 'expo-router';

export default function CreateScreen() {
  const { addTask } = useTaskContext();
  const router = useRouter();

  const handleSubmit = async (title: string, description: string) => {
    try {
      await addTask({ title, description });
      router.back();
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva Tarea</Text>
      <TaskForm onSubmit={handleSubmit} submitButtonText="Crear Tarea" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: '#333',
  },
});