import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Función para formatear la fecha en dd-mm-yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const EquipoDetalleScreen = () => {
  const [equipo, setEquipo] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    fetch(`http://192.168.1.153:4000/team/${id}`)
      .then(response => response.json())
      .then(data => setEquipo(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      'Confirmación',
      `¿Estás seguro de que deseas eliminar el equipo "${equipo.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          onPress: () => {
            fetch(`http://192.168.1.153:4000/team/${id}`, { method: 'DELETE' })
              .then(() => navigation.goBack())
              .catch(error => console.error(error));
          }
        },
      ]
    );
  };

  if (!equipo) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalles del Equipo</Text>
      <Text>Nombre: {equipo.nombre}</Text>
      <Text>Ciudad: {equipo.ciudad}</Text>
      <Text>Fecha de Fundación: {formatDate(equipo.fechaFundacion)}</Text>
      <Button
        title="Editar"
        onPress={() => navigation.navigate('EditarEquipo', { id })}
      />
      <Button
        title="Eliminar"
        color="red"
        onPress={handleDelete}
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
  },
});

export default EquipoDetalleScreen;
