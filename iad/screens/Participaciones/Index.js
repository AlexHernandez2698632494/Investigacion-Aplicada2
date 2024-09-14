// Index.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ParticipacionesScreen = ({ navigation }) => {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get('http://192.168.1.153:4000/groups');
        setGrupos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGrupos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.groupItem}>
      <Text style={styles.groupText}>{item.grupo}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ParticipacionesPorGrupo', { grupoId: item.id })}
      >
        <Text style={styles.buttonText}>Ver Más Grupos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Crear Participaciones" onPress={() => navigation.navigate('CrearParticipacion')} />
        <Button title="Crear Grupos" onPress={() => navigation.navigate('CrearGrupo')} />
      </View>
      <FlatList
        data={grupos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  groupItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  groupText: {
    fontSize: 18,
  },
  button: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ParticipacionesScreen;
