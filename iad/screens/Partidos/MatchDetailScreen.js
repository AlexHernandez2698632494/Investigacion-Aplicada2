import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

// Función para formatear la fecha
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses están indexados desde 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const MatchDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.153:4000/match/${id}`
        );
        setMatch(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMatch();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.1.153:4000/match/${id}`);
      navigation.navigate('Partidos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {match ? (
        <>
          <Text>Fecha: {formatDate(match.fecha)}</Text>
          <Text>Equipo Local: {match.equipo_local}</Text>
          <Text>Equipo Visitante: {match.equipo_visitante}</Text>
          <Text>Goles Local: {match.goles_local}</Text>
          <Text>Goles Visitante: {match.goles_visitante}</Text>
          <Text>
            Torneo: {match.torneo} ({match.anio})
          </Text>
          <Button
            title="Editar"
            onPress={() => {
              console.log('ID del partido:', match.id_partido);
              navigation.navigate('EditMatch', { id: match.id_partido });
            }}
          />

          <Button title="Eliminar" onPress={handleDelete} color="red" />
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MatchDetailScreen;
