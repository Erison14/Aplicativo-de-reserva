// telas/Principal/Reservas/TelaConfirmacao.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de componentes e tipagem
import BotaoCustomizado from '../../../componentes/BotaoCustomizado';
import { HomeStackScreenProps } from '../../../navegacao/TiposNavegacao';

// Tipo de props para a tela 'Confirmacao'
type ConfirmacaoProps = HomeStackScreenProps<'Confirmacao'>;

const PROTOCOLO_MOCK = 'RPR-482025'; 

const TelaConfirmacao: React.FC<ConfirmacaoProps> = ({ route, navigation }) => {
  
  // Recebe os dados, INCLUINDO observacoes
  const { restaurante, data, hora, pessoas, observacoes } = route.params;

  const handleGoHome = () => {
    navigation.popToTop(); 
  };

  const handleGoToReservas = () => {
    alert('Navegaria para a aba "Minhas Reservas" agora.');
    handleGoHome(); 
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Ícone de Sucesso */}
        <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={120} color="#4CAF50" />
            <Text style={styles.successTitle}>Reserva Confirmada!</Text>
            <Text style={styles.subtitle}>Sua mesa está garantida. Aproveite!</Text>
        </View>

        {/* Card de Resumo da Reserva */}
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Detalhes do Agendamento</Text>
            
            <View style={styles.detailItem}>
                <Ionicons name="restaurant-outline" size={20} color="#FF5722" />
                <Text style={styles.detailLabel}>Restaurante:</Text>
                <Text style={styles.detailValue}>{restaurante.nome}</Text>
            </View>
            
            <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={20} color="#FF5722" />
                <Text style={styles.detailLabel}>Data/Hora:</Text>
                <Text style={styles.detailValue}>{data} às {hora}</Text>
            </View>
            
            <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={20} color="#FF5722" />
                <Text style={styles.detailLabel}>Pessoas:</Text>
                <Text style={styles.detailValue}>{pessoas}</Text>
            </View>

            {/* 🛑 NOVO BLOCO: Mostra observações se existirem */}
            {observacoes && observacoes.trim().length > 0 && (
                <View style={styles.obsBox}>
                    <Text style={styles.obsLabel}>Observações:</Text>
                    <Text style={styles.obsValue}>"{observacoes}"</Text>
                </View>
            )}

            <View style={styles.protocoloBox}>
                <Text style={styles.protocoloLabel}>Protocolo de Reserva:</Text>
                <Text style={styles.protocoloValue}>{PROTOCOLO_MOCK}</Text>
            </View>
        </View>
        
      </ScrollView>

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        <BotaoCustomizado
          title="Ver Minhas Reservas"
          onPress={handleGoToReservas}
          style={{ marginBottom: 10, backgroundColor: '#FFC107' }} 
          titleStyle={{ color: '#333' }}
        />
        <BotaoCustomizado
          title="Voltar ao Início"
          onPress={handleGoHome}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F5F5DC' }, 
  scrollContent: { padding: 20, paddingBottom: 150 },

  // --- Seção de Sucesso ---
  iconContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
    textAlign: 'center',
  },

  // --- Card de Detalhes ---
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
    color: '#FF5722', 
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FF572210',
    paddingBottom: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    width: 100,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flexShrink: 1,
  },

  // --- Estilo Novo para Observações ---
  obsBox: {
    marginTop: 10,
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#999',
  },
  obsLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  obsValue: {
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
  },

  // --- Protocolo ---
  protocoloBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F5F5DC', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFC107',
    alignItems: 'center',
  },
  protocoloLabel: {
    fontSize: 14,
    color: '#555',
  },
  protocoloValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
    marginTop: 5,
  },
  
  // --- Botão Fixo ---
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
  }
});

export default TelaConfirmacao;