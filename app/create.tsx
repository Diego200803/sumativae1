//create.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
      <View style={styles.header}>
        <Text style={styles.emoji}>✨</Text>
        <Text style={styles.title}>Nueva Tarea</Text>
        <Text style={styles.subtitle}>Crea una nueva tarea para organizar tu día</Text>
      </View>
      <TaskForm onSubmit={handleSubmit} submitButtonText="Crear Tarea" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
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
});