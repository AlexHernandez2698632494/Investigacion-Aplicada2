import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EquiposScreen = () => {
  const [equipos, setEquipos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.153:4000/team') // Cambia la URL según tu configuración
      .then(response => response.json())
      .then(data => setEquipos(data))
      .catch(error => console.error(error));
  }, []);

  const handleSelectEquipo = (id) => {
    navigation.navigate('EquipoDetalle', { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de Equipos</Text>
      <FlatList
        data={equipos}
        keyExtractor={(item) => item.id_equipo.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.nombre}</Text>
            <Button
              title="Ver detalles"
              onPress={() => handleSelectEquipo(item.id_equipo)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  itemContainer: {
    margin: 10,
  },
});

export default EquiposScreen;
