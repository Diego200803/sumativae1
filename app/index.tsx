import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useTaskContext } from '../context/TaskContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { tasks, loading, error, deleteTask } = useTaskContext();
  const router = useRouter();

  if (loading && tasks.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header con gradiente */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 Mis Tareas</Text>
        <Text style={styles.subtitle}>
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
        </Text>
      </View>
      
      {/* Botón de nueva tarea con sombra */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/create' as any)}
        activeOpacity={0.8}
      >
        <View style={styles.addButtonContent}>
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Nueva Tarea</Text>
        </View>
      </TouchableOpacity>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyTitle}>No hay tareas</Text>
          <Text style={styles.emptyText}>¡Crea tu primera tarea para comenzar!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <TouchableOpacity 
                style={styles.taskContent}
                onPress={() => router.push(`/task/${item.id}` as any)}
                activeOpacity={0.7}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <Text style={styles.taskIcon}>✓</Text>
                  </View>
                  <View style={styles.taskTextContainer}>
                    <Text style={styles.taskTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.taskDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                    {item.createdAt && (
                      <Text style={styles.taskDate}>
                        🕐 {new Date(item.createdAt).toLocaleDateString('es-ES')}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              
              <View style={styles.taskActions}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => router.push(`/edit/${item.id}` as any)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.editButtonIcon}>✏️</Text>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => deleteTask(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteButtonIcon}>🗑️</Text>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#6366f1',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: '600',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  taskContent: {
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskIcon: {
    fontSize: 20,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1e293b',
  },
  taskDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  taskDate: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  taskActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#f8fafc',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#f1f5f9',
  },
  editButtonIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  editButtonText: {
    color: '#10b981',
    fontWeight: '700',
    fontSize: 14,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  deleteButtonIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  deleteButtonText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 14,
  },
});