// telas/Principal/Reservas/TelaSelecionarPessoas.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de componentes e tipagem
import BotaoCustomizado from '../../../componentes/BotaoCustomizado';
import { HomeStackScreenProps } from '../../../navegacao/TiposNavegacao';

// Tipo de props para a tela 'SelecionarPessoas'
type SelecionarPessoasProps = HomeStackScreenProps<'SelecionarPessoas'>;

// Lista de opções de 1 a 10 pessoas
const OPCOES_PESSOAS: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
const LIMITE_MAXIMO = 10; // Para visualização

const TelaSelecionarPessoas: React.FC<SelecionarPessoasProps> = ({ route, navigation }) => {
  
  // Recebe os parâmetros das telas 3 e 4
  const { restauranteId, data, hora } = route.params;
  const [numeroPessoas, setNumeroPessoas] = useState<number | null>(null);

  const handleNext = () => {
    if (numeroPessoas) {
      // Navega para a Tela 6 (Revisar), repassando todos os dados coletados
      navigation.navigate('Revisar', {
        restauranteId: restauranteId,
        data: data,
        hora: hora,
        pessoas: numeroPessoas, // Novo dado coletado
      });
    } else {
      alert('Por favor, selecione o número de pessoas.');
    }
  };

  const renderPeopleOption = (number: number) => {
    const isSelected = numeroPessoas === number;
    return (
      <TouchableOpacity
        key={number}
        style={[
          styles.peopleOption,
          isSelected ? styles.selectedOption : styles.unselectedOption,
        ]}
        onPress={() => setNumeroPessoas(number)}
      >
        <Text style={[styles.optionText, isSelected ? styles.selectedText : styles.unselectedText]}>
          {number}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Card de Resumo da Reserva (feedback visual) */}
        <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Reserva Atual</Text>
            <View style={styles.summaryItem}>
                <Ionicons name="calendar-outline" size={18} color="#FF5722" />
                <Text style={styles.summaryText}>{data} às {hora}</Text>
            </View>
            <View style={styles.summaryItem}>
                <Ionicons name="restaurant-outline" size={18} color="#FF5722" />
                <Text style={styles.summaryText}>Restaurante ID: {restauranteId}</Text>
            </View>
        </View>

        {/* Card Principal: Seleção de Pessoas */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Para quantas pessoas é a reserva?</Text>
          <Text style={styles.limitText}>Máximo de {LIMITE_MAXIMO} pessoas por reserva online.</Text>

          <View style={styles.optionsContainer}>
            {OPCOES_PESSOAS.map(renderPeopleOption)}
          </View>
        </View>

      </ScrollView>

      {/* Botão Fixo de Ação */}
      <View style={styles.buttonContainer}>
        <BotaoCustomizado
          title="Revisar e Confirmar"
          onPress={handleNext}
          disabled={!numeroPessoas}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F5F5DC' }, // Bege Claro
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  // --- Card de Resumo ---
  summaryCard: {
    backgroundColor: '#FFC10720', // Amarelo bem claro para destaque
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107', // Amarelo
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  summaryText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },

  // --- Card Principal ---
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  limitText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },

  // --- Opções de Seleção ---
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  peopleOption: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, // Círculo
    margin: 8,
    borderWidth: 2,
  },
  unselectedOption: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF572230',
  },
  selectedOption: {
    backgroundColor: '#FF5722', // Laranja Principal
    borderColor: '#FF5722',
    elevation: 4,
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  unselectedText: {
    color: '#333',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  
  // --- Botão Fixo ---
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
  }
});

export default TelaSelecionarPessoas;