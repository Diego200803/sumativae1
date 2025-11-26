import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../types/task';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const { tasks, loading } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const foundTask = tasks.find(t => t.id === id);
      if (foundTask) {
        setTask(foundTask);
      }
    }
  }, [tasks, id]);

  if (loading) {
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
      <View style={styles.card}>
        <Text style={styles.label}>Título</Text>
        <Text style={styles.title}>{task.title}</Text>
        
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.description}>{task.description}</Text>
        
        {task.createdAt && (
          <>
            <Text style={styles.label}>Fecha de creación</Text>
            <Text style={styles.date}>
              {new Date(task.createdAt).toLocaleDateString('es-ES')}
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
  },
});