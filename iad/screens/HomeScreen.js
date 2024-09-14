import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inicio</Text>
      <Button
        title="Equipos"
        onPress={() => navigation.navigate('Equipos')}
        style={styles.button}
      />
      <Button
        title="Torneos"
        onPress={() => navigation.navigate('Torneos')}
        style={styles.button}
      />
      <Button
        title="Participaciones"
        onPress={() => navigation.navigate('Participaciones')}
        style={styles.button}
      />
      <Button
        title="Partidos"
        onPress={() => navigation.navigate('Partidos')}
        style={styles.button}
      />
      <Button
        title="Jugadores"
        onPress={() => navigation.navigate('Jugadores')}
        style={styles.button}
      />
      <Button
        title="Estadísticas"
        onPress={() => navigation.navigate('Estadísticas')}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;
