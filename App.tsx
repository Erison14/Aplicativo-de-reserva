// App.tsx
import 'react-native-gesture-handler'; // Import obrigatório para Navegadores

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Importe o seu Navegador principal
import AppNavegador from './navegacao/AppNavegador';

export default function App() {
  return (
    // O NavigationContainer deve envolver toda a navegação
    <NavigationContainer>
      {/* O AppNavegador contém o Auth Stack e o Main Tab Navigator */}
      <AppNavegador />
    </NavigationContainer>
  );
}