import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PartidosScreen = ({ navigation }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Obtén la lista de partidos desde la API
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://192.168.1.153:4000/match');
        setMatches(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMatches();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Crear Nuevo Partido" onPress={() => navigation.navigate('CreateMatch')} />
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text>{item.equipo_local} vs {item.equipo_visitante}</Text>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => navigation.navigate('MatchDetail', { id: item.id })}
            >
              <Text>Ver Más Detalle</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  matchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
});

export default PartidosScreen;
