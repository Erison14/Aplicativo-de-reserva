// navegacao/AppNavegador.tsx
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Tipos de Navegação
import { 
  AutenticacaoStackParamList, 
  PrincipalTabParamList, 
  HomeStackParamList 
} from './TiposNavegacao';

// Telas de Autenticação
import TelaLogin from '../telas/Autenticacao/TelaLogin';
import TelaCadastro from '../telas/Autenticacao/TelaCadastro'; 

// Telas Principais
import TelaInicial from '../telas/Principal/TelaInicial';
import TelaDetalhes from '../telas/Principal/TelaDetalhes'; 
import TelaMinhasReservas from '../telas/Principal/TelaMinhasReservas';
import TelaPerfil from '../telas/Principal/TelaPerfil';
import TelaAvaliacao from '../telas/Principal/TelaAvaliacao';

// Telas do Fluxo de Reserva
import TelaSelecionarData from '../telas/Principal/Reservas/TelaSelecionarData';
import TelaSelecionarPessoas from '../telas/Principal/Reservas/TelaSelecionarPessoas';
import TelaRevisar from '../telas/Principal/Reservas/TelaRevisar';
import TelaConfirmacao from '../telas/Principal/Reservas/TelaConfirmacao';

// Definição dos Navegadores
const AuthStack = createStackNavigator<AutenticacaoStackParamList>();
const MainTab = createBottomTabNavigator<PrincipalTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();

// --- Fluxo da Home e Reservas (Stack) ---
function HomeFlowNavigator() {
  return (
    <HomeStack.Navigator 
      initialRouteName="ListaInicial"
      screenOptions={{
        headerStyle: { backgroundColor: '#FF5722' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <HomeStack.Screen name="ListaInicial" component={TelaInicial} options={{ title: 'Restaurantes' }} />
      <HomeStack.Screen name="Detalhes" component={TelaDetalhes} options={{ title: 'Detalhes' }} />
      
      {/* Fluxo de Agendamento */}
      <HomeStack.Screen name="SelecionarData" component={TelaSelecionarData} options={{ title: 'Agendar' }} />
      <HomeStack.Screen name="SelecionarPessoas" component={TelaSelecionarPessoas} options={{ title: 'Pessoas' }} />
      <HomeStack.Screen name="Revisar" component={TelaRevisar} options={{ title: 'Revisar' }} />
      <HomeStack.Screen name="Confirmacao" component={TelaConfirmacao} options={{ title: 'Sucesso', headerLeft: () => null }} />
      
      {/* Nova Tela de Avaliação */}
      <HomeStack.Screen name="Avaliacao" component={TelaAvaliacao} options={{ title: 'Avaliar Experiência' }} />
    </HomeStack.Navigator>
  );
}

// --- Navegador de Abas Inferiores ---
function MainTabNavigator({ onLogout }: { onLogout: () => void }) {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help';
          
          if (route.name === 'HomeStack') iconName = 'search-circle-outline';
          else if (route.name === 'Reservas') iconName = 'calendar-outline';
          else if (route.name === 'Perfil') iconName = 'person-circle-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#555',
        headerShown: false, 
      })}
    >
      <MainTab.Screen name="HomeStack" component={HomeFlowNavigator} options={{ title: 'Início' }} /> 
      <MainTab.Screen name="Reservas" component={TelaMinhasReservas} options={{ title: 'Reservas' }} />
      
      <MainTab.Screen name="Perfil" options={{ title: 'Perfil' }}>
        {/* Passamos a função onLogout para a TelaPerfil */}
        {(props) => <TelaPerfil {...props} onLogout={onLogout} />}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
}

// --- Navegador Raiz (Controle de Login) ---
export default function AppNavegador() {
  // Traduzindo os estados e funções para português
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  const fazerLogin = () => setUsuarioAutenticado(true);
  const fazerLogout = () => setUsuarioAutenticado(false);

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {usuarioAutenticado ? (
        <AuthStack.Screen name="Main">
           {/* Passamos fazerLogout para o MainTabNavigator */}
           {(props) => <MainTabNavigator {...props} onLogout={fazerLogout} />}
        </AuthStack.Screen>
      ) : (
        <>
          <AuthStack.Screen name="Login">
            {/* Passamos fazerLogin para a TelaLogin */}
            {(props) => <TelaLogin {...props} onLogin={fazerLogin} />}
          </AuthStack.Screen>
          <AuthStack.Screen name="Cadastro" component={TelaCadastro} />
        </>
      )}
    </AuthStack.Navigator>
  );
}