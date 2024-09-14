import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const ResultadosScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.1.153:4000/result'); // Cambia la URL por la de tu API
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Cargar los datos al inicio
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      <Button title="Actualizar" onPress={fetchData} />
      <ScrollView horizontal>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.header}>
            <DataTable.Title style={styles.column}>Torneo</DataTable.Title>
            <DataTable.Title style={styles.column}>Equipo</DataTable.Title>
            <DataTable.Title style={styles.column}>Posición</DataTable.Title>
            <DataTable.Title style={styles.column}>PJ</DataTable.Title>
            <DataTable.Title style={styles.column}>V</DataTable.Title>
            <DataTable.Title style={styles.column}>E</DataTable.Title>
            <DataTable.Title style={styles.column}>D</DataTable.Title>
            <DataTable.Title style={styles.column}>GF</DataTable.Title>
            <DataTable.Title style={styles.column}>GC</DataTable.Title>
            <DataTable.Title style={styles.column}>DG</DataTable.Title>
            <DataTable.Title style={styles.column}>Puntos</DataTable.Title>
          </DataTable.Header>
          {data.map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={styles.column}>{item.torneo_nombre}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.equipo_nombre}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.posicion}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.pj}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.v}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.e}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.d}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.gf}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.gc}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.dg}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{item.pts}</DataTable.Cell>
            </DataTable.Row>
          ))}
          {loading && (
            <DataTable.Row>
              <DataTable.Cell colSpan={11}>
                <Text>Cargando...</Text>
              </DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  table: {
    width: 1700, // Aumenta el ancho total de la tabla
  },
  header: {
    backgroundColor: '#2C5978', // Color azul oscuro para el encabezado
  },
  column: {
    minWidth: 150, // Aumenta el ancho de cada columna
    justifyContent: 'center', // Centra el contenido de la columna
  },
  headerTitle: {
    color: '#FFFFFF', // Texto blanco
    fontWeight: 'bold',
    fontSize: 16, // Tamaño de fuente más grande para que se vea más destacada
  },
  row: {
    backgroundColor: '#D3DCE0', // Fondo gris claro para las filas
    justifyContent: 'center', // Centra el contenido de las filas
  },
});

export default ResultadosScreen;
