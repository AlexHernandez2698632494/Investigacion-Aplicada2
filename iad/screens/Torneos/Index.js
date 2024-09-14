import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const TorneosScreen = () => {
  const [torneos, setTorneos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTorneos();
  }, []);

  const fetchTorneos = async () => {
    try {
      const response = await axios.get('http://192.168.1.153:4000/tournament');
      setTorneos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    navigation.navigate('EditarTorneo', { id });
  };

  const handleDelete = (id, nombre) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar el torneo "${nombre}"?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí',
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.1.153:4000/tournament/${id}`);
              fetchTorneos();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={torneos}
        keyExtractor={(item) => item.id_torneo.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemText}>{item.anio}</Text>
            <Button title="Editar" onPress={() => handleEdit(item.id_torneo)} />
            <Button title="Eliminar" onPress={() => handleDelete(item.id_torneo, item.nombre)} />
          </View>
        )}
      />
      <Button
        title="Crear Torneo"
        onPress={() => navigation.navigate('CrearTorneo')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 16,
  },
  itemText: {
    fontSize: 18,
  },
});

export default TorneosScreen;
