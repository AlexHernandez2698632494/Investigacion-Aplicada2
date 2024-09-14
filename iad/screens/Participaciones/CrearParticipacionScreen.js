// CrearParticipacionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de tener este paquete instalado
import axios from 'axios';

const CrearParticipacionScreen = ({ navigation }) => {
  const [torneos, setTorneos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [idTorneo, setIdTorneo] = useState('');
  const [idEquipo, setIdEquipo] = useState('');
  const [idGrupo, setIdGrupo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch torneos, equipos, and grupos from your API
        const torneosResponse = await axios.get('http://192.168.1.153:4000/tournament'); // Correct endpoint
        const equiposResponse = await axios.get('http://192.168.1.153:4000/team'); // Correct endpoint
        const gruposResponse = await axios.get('http://192.168.1.153:4000/groups'); // Ensure this endpoint is correct

        setTorneos(torneosResponse.data);
        setEquipos(equiposResponse.data);
        setGrupos(gruposResponse.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al obtener datos');
      }
    };

    fetchData();
  }, []);

  const handleCreateParticipation = async () => {
    try {
      if (!idTorneo || !idEquipo || !idGrupo) {
        Alert.alert('Error', 'Todos los campos son requeridos');
        return;
      }

      await axios.post('http://192.168.1.153:4000/participation', {
        id_torneo: idTorneo,
        id_equipo: idEquipo,
        id_grupo: idGrupo,
      });

      Alert.alert('Éxito', 'Participación creada con éxito');
      setIdTorneo('');
      setIdEquipo('');
      setIdGrupo('');

      // Opcional: Navegar de regreso a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al crear la participación');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Participación</Text>

      <Text style={styles.label}>Torneo:</Text>
      <Picker
        selectedValue={idTorneo}
        style={styles.picker}
        onValueChange={(itemValue) => setIdTorneo(itemValue)}
      >
        <Picker.Item label="Seleccione un torneo" value="" />
        {torneos.map(torneo => (
          <Picker.Item key={torneo.id_torneo} label={torneo.nombre} value={torneo.id_torneo} />
        ))}
      </Picker>

      <Text style={styles.label}>Equipo:</Text>
      <Picker
        selectedValue={idEquipo}
        style={styles.picker}
        onValueChange={(itemValue) => setIdEquipo(itemValue)}
      >
        <Picker.Item label="Seleccione un equipo" value="" />
        {equipos.map(equipo => (
          <Picker.Item key={equipo.id_equipo} label={equipo.nombre} value={equipo.id_equipo} />
        ))}
      </Picker>

      <Text style={styles.label}>Grupo:</Text>
      <Picker
        selectedValue={idGrupo}
        style={styles.picker}
        onValueChange={(itemValue) => setIdGrupo(itemValue)}
      >
        <Picker.Item label="Seleccione un grupo" value="" />
        {grupos.map(grupo => (
          <Picker.Item key={grupo.id} label={grupo.grupo} value={grupo.id} />
        ))}
      </Picker>

      <Button title="Crear Participación" onPress={handleCreateParticipation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
});

export default CrearParticipacionScreen;
