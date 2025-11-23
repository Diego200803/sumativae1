import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={[styles.input, titleError ? styles.inputError : null]}
          value={title}
          onChangeText={handleTitleChange}
          placeholder="Ingresa el título de la tarea"
        />
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea, descriptionError ? styles.inputError : null]}
          value={description}
          onChangeText={handleDescriptionChange}
          placeholder="Ingresa la descripción de la tarea"
          multiline
          numberOfLines={4}
        />
        {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
      </View>

      <TouchableOpacity 
        style={[styles.button, (titleError || descriptionError || !title || !description) ? styles.buttonDisabled : null]}
        onPress={handleSubmit}
        disabled={!!(titleError || descriptionError || !title || !description)}
      >
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
