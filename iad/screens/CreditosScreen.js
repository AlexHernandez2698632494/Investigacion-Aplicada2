import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreditosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dirección: Karens Medrano</Text>
      <Text style={styles.text}>Escrita por: Alex Romero</Text>
      
      <Text style={styles.text}>Reparto:</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>- Samuel Aguilar</Text>
        <Text style={styles.listItem}>- Daniel Castellanos</Text>
        <Text style={styles.listItem}>- Cristian Pineda</Text>
        <Text style={styles.listItem}>- Luis Lino</Text>
        <Text style={styles.listItem}>- Kevin Casamalhuapa</Text>
      </View>
      
      <Text style={styles.text}>Propiedad de: Aguila Azul Enterprise</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
  listContainer: {
    paddingLeft: 16,
  },
  listItem: {
    fontSize: 18,
    marginVertical: 4,
  },
});

export default CreditosScreen;
