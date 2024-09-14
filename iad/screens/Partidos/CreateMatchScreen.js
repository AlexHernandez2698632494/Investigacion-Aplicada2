import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateMatchScreen = ({ navigation }) => {
  const [fecha, setFecha] = useState('');
  const [equipoLocal, setEquipoLocal] = useState('');
  const [equipoVisitante, setEquipoVisitante] = useState('');
  const [golesLocal, setGolesLocal] = useState('');
  const [golesVisitante, setGolesVisitante] = useState('');
  const [idTorneo, setIdTorneo] = useState('');

  const handleCreate = async () => {
    try {
      await axios.post('http://192.168.1.153:4000/match', {
        fecha,
        equipo_local: equipoLocal,
        equipo_visitante: equipoVisitante,
        goles_local: golesLocal,
        goles_visitante: golesVisitante,
        id_torneo: idTorneo,
      });
      navigation.navigate('Partidos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Fecha</Text>
      <TextInput style={styles.input} value={fecha} onChangeText={setFecha} />
      <Text>Equipo Local</Text>
      <TextInput style={styles.input} value={equipoLocal} onChangeText={setEquipoLocal} />
      <Text>Equipo Visitante</Text>
      <TextInput style={styles.input} value={equipoVisitante} onChangeText={setEquipoVisitante} />
      <Text>Goles Local</Text>
      <TextInput style={styles.input} value={golesLocal} onChangeText={setGolesLocal} keyboardType="numeric" />
      <Text>Goles Visitante</Text>
      <TextInput style={styles.input} value={golesVisitante} onChangeText={setGolesVisitante} keyboardType="numeric" />
      <Text>ID Torneo</Text>
      <TextInput style={styles.input} value={idTorneo} onChangeText={setIdTorneo} keyboardType="numeric" />
      <Button title="Crear Partido" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});

export default CreateMatchScreen;
