// CrearGrupoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CrearGrupoScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');

  const handleCreateGroup = async () => {
    try {
      // Validar que el nombre no esté vacío
      if (!nombre.trim()) {
        Alert.alert('Error', 'El nombre del grupo es requerido');
        return;
      }

      // Enviar solicitud para crear el grupo
      const response = await axios.post('http://192.168.1.153:4000/groups', { nombre });
      
      // Mostrar un mensaje de éxito y limpiar el formulario
      Alert.alert('Éxito', 'Grupo creado con éxito');
      setNombre('');
      
      // Opcional: Navegar de regreso a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al crear el grupo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del grupo"
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Crear Grupo" onPress={handleCreateGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default CrearGrupoScreen;
