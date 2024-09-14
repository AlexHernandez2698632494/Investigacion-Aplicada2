import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const EditMatchScreen = ({ matchId }) => {
  const [matchData, setMatchData] = useState({
    fecha: "",
    equipo_local: "",
    equipo_visitante: "",
    goles_local: "",
    goles_visitante: "",
    torneo: "",
    anio: "",
  });

  // Función para obtener los datos del partido desde el backend
  const getMatchData = async () => {
    try {
      const response = await fetch(`http://192.168.1.153:4000/match/${matchId}`);
      const data = await response.json();
      if (response.ok) {
        setMatchData({
          fecha: data.fecha,
          equipo_local: data.equipo_local,
          equipo_visitante: data.equipo_visitante,
          // Convertir los goles a texto para que sean compatibles con TextInput
          goles_local: data.goles_local.toString(),
          goles_visitante: data.goles_visitante.toString(),
          torneo: data.torneo,
          anio: data.anio.toString(),
        });
      } else {
        console.error("Error fetching match:", data.message);
      }
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  };

  // Función que se ejecuta cuando el componente se monta
  useEffect(() => {
    getMatchData();
  }, [matchId]);

  // Función para manejar los cambios en los inputs
  const handleInputChange = (name, value) => {
    setMatchData({
      ...matchData,
      [name]: value,
    });
  };

  // Función para manejar la actualización del partido (guardado)
  const handleSave = async () => {
    try {
      // Convertir los goles de nuevo a número antes de enviar al backend
      const updatedMatchData = {
        ...matchData,
        goles_local: parseInt(matchData.goles_local, 10),
        goles_visitante: parseInt(matchData.goles_visitante, 10),
        anio: parseInt(matchData.anio, 10),
      };

      const response = await fetch(`http://192.168.1.153:4000/match/${matchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMatchData),
      });

      if (response.ok) {
        Alert.alert("Partido actualizado con éxito");
      } else {
        const data = await response.json();
        console.error("Error updating match:", data.message);
      }
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Partido</Text>
      
      <Text>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={matchData.fecha}
        onChangeText={(value) => handleInputChange("fecha", value)}
      />

      <Text>Equipo Local:</Text>
      <TextInput
        style={styles.input}
        value={matchData.equipo_local}
        onChangeText={(value) => handleInputChange("equipo_local", value)}
      />

      <Text>Equipo Visitante:</Text>
      <TextInput
        style={styles.input}
        value={matchData.equipo_visitante}
        onChangeText={(value) => handleInputChange("equipo_visitante", value)}
      />

      <Text>Goles Local:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={matchData.goles_local}
        onChangeText={(value) => handleInputChange("goles_local", value)}
      />

      <Text>Goles Visitante:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={matchData.goles_visitante}
        onChangeText={(value) => handleInputChange("goles_visitante", value)}
      />

      <Text>Torneo:</Text>
      <TextInput
        style={styles.input}
        value={matchData.torneo}
        onChangeText={(value) => handleInputChange("torneo", value)}
      />

      <Text>Año:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={matchData.anio}
        onChangeText={(value) => handleInputChange("anio", value)}
      />

      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
});

export default EditMatchScreen;
