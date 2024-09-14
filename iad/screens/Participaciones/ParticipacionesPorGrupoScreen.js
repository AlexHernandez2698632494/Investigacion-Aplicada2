// ParticipacionesPorGrupoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ParticipacionesPorGrupoScreen = ({ route, navigation }) => {
  const { grupoId } = route.params;
  const [participaciones, setParticipaciones] = useState([]);

  useEffect(() => {
    const fetchParticipaciones = async () => {
      try {
        const response = await axios.get(`http://192.168.1.153:4000/participations/group/${grupoId}`);
        setParticipaciones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParticipaciones();
  }, [grupoId]);

  const handleEditPress = (id_torneo, id_equipo) => {
    navigation.navigate('EditarParticipacion', { id_torneo, id_equipo });
  };

  const renderItem = ({ item }) => (
    <View style={styles.participacionItem}>
      <Text style={styles.text}>Torneo: {item.torneo}</Text>
      <Text style={styles.text}>Equipo: {item.equipo}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditPress(item.id_torneo, item.id_equipo)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={participaciones}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  participacionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ParticipacionesPorGrupoScreen;
