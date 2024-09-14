import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importa tus pantallas
import HomeScreen from '../screens/HomeScreen';
import ResultadosScreen from '../screens/ResultadosScreen';
import CreditosScreen from '../screens/CreditosScreen';

// Importa las pantallas de Equipos
import EquiposScreen from '../screens/Equipos/Index';
import EditarEquipoScreen from '../screens/Equipos/EditarEquipoScreen';
import EquipoDetalleScreen from '../screens/Equipos/EquipoDetalleScreen';

// Importa las pantallas de Torneos
import TorneosScreen from '../screens/Torneos/Index';
import EditarTorneoScreen from '../screens/Torneos/EditarTorneoScreen';
import CrearTorneoScreen from '../screens/Torneos/CrearTorneoScreen';

// Importa las pantallas de Participaciones
import ParticipacionesScreen from '../screens/Participaciones/Index';
import CrearParticipacionScreen from '../screens/Participaciones/CrearParticipacionScreen';
import CrearGrupoScreen from '../screens/Participaciones/CrearGrupoScreen';
import ParticipacionesPorGrupoScreen from '../screens/Participaciones/ParticipacionesPorGrupoScreen';
import EditarParticipacionScreen from '../screens/Participaciones/EditarParticipacionScreen';

// Importa las pantallas de Partidos
import PartidosScreen from '../screens/Partidos/Index';
import MatchDetailScreen from '../screens/Partidos/MatchDetailScreen';
import CreateMatchScreen from '../screens/Partidos/CreateMatchScreen';
import EditMatchScreen from '../screens/Partidos/EditMatchScreen';

// Importa la pantalla de Jugadores
import JugadoresScreen from '../screens/Jugadores/Index';

// Crear el Stack Navigator para las pantallas dentro de Home
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="IAD"  // Renombrado de "Home" a "HomeStackHome"
      component={HomeScreen}
      options={{
        headerStyle: { backgroundColor: '#f8f9fa' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
    <HomeStack.Screen
      name="Equipos"
      component={EquiposScreen}
      options={{
        headerStyle: { backgroundColor: '#e0f7fa' },
        headerTintColor: '#00796b',
      }}
    />
    <HomeStack.Screen
      name="EquipoDetalle"
      component={EquipoDetalleScreen}
      options={{
        headerStyle: { backgroundColor: '#b9fbc0' },
        headerTintColor: '#004d40',
      }}
    />
    <HomeStack.Screen
      name="EditarEquipo"
      component={EditarEquipoScreen}
      options={{
        headerStyle: { backgroundColor: '#fce4ec' },
        headerTintColor: '#c2185b',
      }}
    />
    <HomeStack.Screen
      name="Torneos"
      component={TorneosScreen}
      options={{
        headerStyle: { backgroundColor: '#e8f5e9' },
        headerTintColor: '#388e3c',
      }}
    />
    <HomeStack.Screen
      name="EditarTorneo"
      component={EditarTorneoScreen}
      options={{
        headerStyle: { backgroundColor: '#d1c4e9' },
        headerTintColor: '#7e57c2',
      }}
    />
    <HomeStack.Screen
      name="CrearTorneo"
      component={CrearTorneoScreen}
      options={{
        headerStyle: { backgroundColor: '#ffe0b2' },
        headerTintColor: '#f57c00',
      }}
    />
    <HomeStack.Screen
      name="Participaciones"
      component={ParticipacionesScreen}
      options={{
        headerStyle: { backgroundColor: '#f0f4c3' },
        headerTintColor: '#9e9d24',
      }}
    />
    <HomeStack.Screen
      name="CrearParticipacion"
      component={CrearParticipacionScreen}
      options={{
        headerStyle: { backgroundColor: '#c8e6c9' },
        headerTintColor: '#388e3c',
      }}
    />
    <HomeStack.Screen
      name="CrearGrupo"
      component={CrearGrupoScreen}
      options={{
        headerStyle: { backgroundColor: '#b2dfdb' },
        headerTintColor: '#004d40',
      }}
    />
    <HomeStack.Screen
      name="ParticipacionesPorGrupo"
      component={ParticipacionesPorGrupoScreen}
      options={{
        headerStyle: { backgroundColor: '#e0f7fa' },
        headerTintColor: '#00796b',
      }}
    />
    <HomeStack.Screen
      name="EditarParticipacion"
      component={EditarParticipacionScreen}
      options={{
        headerStyle: { backgroundColor: '#f8bbd0' },
        headerTintColor: '#c2185b',
      }}
    />
    <HomeStack.Screen
      name="Partidos"
      component={PartidosScreen}
      options={{
        headerStyle: { backgroundColor: '#e1bee7' },
        headerTintColor: '#6a1b9a',
      }}
    />
    <HomeStack.Screen
      name="MatchDetail"
      component={MatchDetailScreen}
      options={{
        headerStyle: { backgroundColor: '#d1c4e9' },
        headerTintColor: '#7e57c2',
      }}
    />
    <HomeStack.Screen
      name="CreateMatch"
      component={CreateMatchScreen}
      options={{
        headerStyle: { backgroundColor: '#c5e1a5' },
        headerTintColor: '#8bc34a',
      }}
    />
    <HomeStack.Screen
      name="EditMatch"
      component={EditMatchScreen}
      options={{
        headerStyle: { backgroundColor: '#dcedc8' },
        headerTintColor: '#9e9d24',
      }}
    />
    <HomeStack.Screen
      name="Jugadores"
      component={JugadoresScreen}
      options={{
        headerStyle: { backgroundColor: '#bbdefb' },
        headerTintColor: '#2196f3',
      }}
    />
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Resultados') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Créditos') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#002F6C',
          tabBarInactiveTintColor: '#008060',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Resultados" component={ResultadosScreen} />
        <Tab.Screen name="Créditos" component={CreditosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
