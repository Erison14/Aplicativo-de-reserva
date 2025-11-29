// telas/Principal/Reservas/TelaRevisar.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de componentes, dados e tipagem
import BotaoCustomizado from '../../../componentes/BotaoCustomizado';
import { HomeStackScreenProps } from '../../../navegacao/TiposNavegacao';
import { RESTAURANTES } from '../../../dados/restaurantes';

// Tipo de props para a tela 'Revisar'
type RevisarProps = HomeStackScreenProps<'Revisar'>;

const TelaRevisar: React.FC<RevisarProps> = ({ route, navigation }) => {
  
  // Recebe todos os parâmetros tipados
  const { restauranteId, data, hora, pessoas } = route.params;
  const [observacoes, setObservacoes] = useState('');

  // Busca o objeto completo do restaurante para exibição
  const restaurante = RESTAURANTES.find(r => r.id === restauranteId);

  if (!restaurante) {
    return <Text style={styles.errorText}>Erro: Restaurante não encontrado.</Text>;
  }

  const handleConfirmar = () => {
    // Nesta etapa, você enviaria os dados (restaurante, data, hora, pessoas, observacoes) para o backend.
    
    // Simulação: Navega para a Tela 7 (Confirmação), passando o objeto restaurante completo.
    navigation.navigate('Confirmacao', {
      restaurante: restaurante, // Passa o objeto completo
      data: data,
      hora: hora,
      pessoas: pessoas,
      observacoes: observacoes,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Card de Resumo do Restaurante */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Restaurante Selecionado</Text>
          <Text style={styles.restaurantName}>{restaurante.nome}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#777" />
            <Text style={styles.infoText}>{restaurante.endereco}</Text>
          </View>
        </View>

        {/* Card de Detalhes da Reserva */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Detalhes da Reserva</Text>
          
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={20} color="#FF5722" />
            <Text style={styles.detailLabel}>Data:</Text>
            <Text style={styles.detailValue}>{data}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color="#FF5722" />
            <Text style={styles.detailLabel}>Hora:</Text>
            <Text style={styles.detailValue}>{hora}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={20} color="#FF5722" />
            <Text style={styles.detailLabel}>Pessoas:</Text>
            <Text style={styles.detailValue}>{pessoas}</Text>
          </View>
        </View>

        {/* Card de Observações */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Observações (Opcional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Ex: Alergia a frutos do mar, pedir mesa próxima à janela..."
            multiline
            numberOfLines={4}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholderTextColor="#999"
          />
        </View>

        {/* Aviso de Confirmação */}
        <View style={styles.warningBox}>
            <Ionicons name="alert-circle-outline" size={24} color="#FFC107" />
            <Text style={styles.warningText}>
                Ao confirmar, sua reserva será enviada. Você receberá uma notificação em breve.
            </Text>
        </View>

      </ScrollView>

      {/* Botão Fixo de Ação */}
      <View style={styles.buttonContainer}>
        <BotaoCustomizado
          title="Confirmar Reserva"
          onPress={handleConfirmar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F5F5DC' }, // Bege Claro
  scrollContent: { padding: 20, paddingBottom: 100 },
  errorText: { padding: 20, textAlign: 'center', color: 'red' },
  
  // --- Card Geral ---
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
    color: '#FF5722', // Laranja
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FF572210',
    paddingBottom: 5,
  },
  
  // --- Informações do Restaurante ---
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
  },

  // --- Detalhes da Reserva ---
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    width: 80,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
  },

  // --- Área de Texto ---
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
  },

  // --- Aviso ---
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF8E1', // Fundo amarelo claro
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107', // Amarelo
    padding: 15,
    borderRadius: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    flexShrink: 1,
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

export default TelaRevisar;