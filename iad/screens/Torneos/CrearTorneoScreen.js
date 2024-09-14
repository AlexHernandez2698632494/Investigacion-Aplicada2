import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CrearTorneoScreen = () => {
  const [nombre, setNombre] = useState('');
  const [anio, setAnio] = useState('');
  const navigation = useNavigation();

  const currentYear = new Date().getFullYear(); // Año actual
  const minYear = 1970; // Año mínimo permitido

  const handleCreate = async () => {
    if (anio.length !== 4) {
      Alert.alert('Error', 'El año debe tener exactamente 4 dígitos.');
      return;
    }

    const yearValue = parseInt(anio);

    if (yearValue < minYear || yearValue > currentYear) {
      Alert.alert('Error', `El año debe estar entre ${minYear} y ${currentYear}.`);
      return;
    }

    try {
      await axios.post('http://192.168.1.153:4000/tournament', { nombre, anio });
      Alert.alert('Éxito', 'Torneo creado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.label}>Año</Text>
      <TextInput
        style={styles.input}
        value={anio}
        onChangeText={(text) => {
          if (/^\d*$/.test(text) && text.length <= 4) { // Acepta solo dígitos y máximo 4 caracteres
            setAnio(text);
          }
        }}
        keyboardType="numeric"
        maxLength={4} // Limita el input a 4 caracteres
      />
      <Button title="Crear Torneo" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});

export default CrearTorneoScreen;
