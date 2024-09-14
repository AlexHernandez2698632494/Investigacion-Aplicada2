import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Función para convertir dd-mm-yyyy a yyyy-mm-dd
const formatDateForAPI = (dateString) => {
  const [day, month, year] = dateString.split('-').map(num => parseInt(num, 10));
  return `${year}-${month}-${day}`;
};

const EditarEquipoScreen = () => {
  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [fechaFundacion, setFechaFundacion] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    fetch(`http://192.168.1.153:4000/team/${id}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.nombre);
        setCiudad(data.ciudad);
        setFechaFundacion(formatDate(data.fechaFundacion));
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSave = () => {
    if (!nombre || !ciudad || !fechaFundacion) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    fetch(`http://192.168.1.153:4000/team/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        ciudad,
        fechaFundacion: formatDateForAPI(fechaFundacion),
      }),
    })
      .then(response => {
        if (response.ok) {
          alert('Equipo actualizado con éxito.');
          navigation.goBack();
        } else {
          alert('Hubo un problema al actualizar el equipo.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Hubo un problema al actualizar el equipo.');
      });
  };

  // Función para formatear fecha en dd-mm-yyyy para mostrar
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Equipo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={ciudad}
        onChangeText={setCiudad}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Fundación (dd-mm-yyyy)"
        value={fechaFundacion}
        onChangeText={setFechaFundacion}
      />
      <Button
        title="Guardar"
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default EditarEquipoScreen;
