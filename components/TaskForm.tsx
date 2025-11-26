//components/TaskForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  submitButtonText?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialTitle = '',
  initialDescription = '',
  submitButtonText = 'Crear Tarea'
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [titleFocused, setTitleFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);

  const validateAlphanumeric = (text: string): boolean => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(text) || text === '';
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (text.trim() === '') {
      setTitleError('El título no puede estar vacío');
    } else if (!validateAlphanumeric(text)) {
      setTitleError('Solo se permiten caracteres alfanuméricos');
    } else {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    if (text.trim() === '') {
      setDescriptionError('La descripción no puede estar vacía');
    } else if (!validateAlphanumeric(text)) {
      setDescriptionError('Solo se permiten caracteres alfanuméricos');
    } else {
      setDescriptionError('');
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    if (title.trim() === '') {
      setTitleError('El título no puede estar vacío');
      isValid = false;
    }

    if (description.trim() === '') {
      setDescriptionError('La descripción no puede estar vacía');
      isValid = false;
    }

    if (!validateAlphanumeric(title) || !validateAlphanumeric(description)) {
      isValid = false;
    }

    if (isValid) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
    }
  };

  const isFormValid = !titleError && !descriptionError && title && description;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelIcon}>📝</Text>
          <Text style={styles.label}>Título</Text>
        </View>
        <View style={[
          styles.inputWrapper,
          titleFocused && styles.inputWrapperFocused,
          titleError && styles.inputWrapperError
        ]}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
            placeholder="Ingresa el título de la tarea"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        {titleError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{titleError}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelIcon}>📄</Text>
          <Text style={styles.label}>Descripción</Text>
        </View>
        <View style={[
          styles.inputWrapper,
          styles.textAreaWrapper,
          descriptionFocused && styles.inputWrapperFocused,
          descriptionError && styles.inputWrapperError
        ]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={handleDescriptionChange}
            onFocus={() => setDescriptionFocused(true)}
            onBlur={() => setDescriptionFocused(false)}
            placeholder="Ingresa la descripción de la tarea"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
          />
        </View>
        {descriptionError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{descriptionError}</Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity 
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonIcon}>✓</Text>
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  textAreaWrapper: {
    height: 120,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  errorIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6366F1',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});