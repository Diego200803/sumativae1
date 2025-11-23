import { TaskProvider } from '../context/TaskContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Tareas' }} />
      </Stack>
    </TaskProvider>
  );
}