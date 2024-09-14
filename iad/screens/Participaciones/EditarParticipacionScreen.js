import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditarParticipacionScreen = ({ route, navigation }) => {
  const { id_torneo, id_equipo } = route.params;

  const [torneo, setTorneo] = useState('');
  const [equipo, setEquipo] = useState('');
  const [grupo, setGrupo] = useState('');

  useEffect(() => {
    // Fetch the current details for the participation
    const fetchParticipationDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.153:4000/participation/${id_torneo}/${id_equipo}`);
        const { id_torneo, id_equipo, id_grupo } = response.data;
        
        setTorneo(id_torneo || '');  // Ensure default value if null
        setEquipo(id_equipo || '');
        setGrupo(id_grupo || '');
      } catch (error) {
        console.error(error);
      }
    };

    fetchParticipationDetails();
  }, [id_torneo, id_equipo]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://192.168.1.153:4000/participation/${id_torneo}/${id_equipo}`, {
        id_torneo: torneo,
        id_equipo: equipo,
        id_grupo: grupo,
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Participación actualizada correctamente');
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar la participación');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Torneo:</Text>
      <TextInput
        style={styles.input}
        value={torneo}
        onChangeText={setTorneo}
        placeholder="Ingrese el torneo"
      />
      <Text style={styles.label}>Equipo:</Text>
      <TextInput
        style={styles.input}
        value={equipo}
        onChangeText={setEquipo}
        placeholder="Ingrese el equipo"
      />
      <Text style={styles.label}>Grupo:</Text>
      <TextInput
        style={styles.input}
        value={grupo}
        onChangeText={setGrupo}
        placeholder="Ingrese el grupo"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditarParticipacionScreen;
