// telas/Principal/Reservas/TelaSelecionarData.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de componentes e tipagem
import BotaoCustomizado from '../../../componentes/BotaoCustomizado';
import { HomeStackScreenProps } from '../../../navegacao/TiposNavegacao';

// Tipo de props para a tela
type SelecionarDataProps = HomeStackScreenProps<'SelecionarData'>;

// Horários disponíveis mockados
const HORARIOS_DISPONIVEIS: string[] = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
];

// Interface para os dias gerados dinamicamente
interface DiaCalendario {
    fullDate: string; // "2023-11-25"
    dayName: string;  // "Sáb"
    dayNumber: string; // "25"
}

const TelaSelecionarData: React.FC<SelecionarDataProps> = ({ route, navigation }) => {
  
  const { restauranteId } = route.params;
  
  // Estados para controlar a seleção
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<string>('');
  const [diasDisponiveis, setDiasDisponiveis] = useState<DiaCalendario[]>([]);

  // Gera os próximos 7 dias automaticamente ao carregar a tela
  useEffect(() => {
    const dias: DiaCalendario[] = [];
    const hoje = new Date();

    for (let i = 0; i < 7; i++) {
        const dataFutura = new Date(hoje);
        dataFutura.setDate(hoje.getDate() + i);

        // Formatação simples para português
        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        const ano = dataFutura.getFullYear();
        const mes = String(dataFutura.getMonth() + 1).padStart(2, '0');
        const dia = String(dataFutura.getDate()).padStart(2, '0');

        dias.push({
            fullDate: `${dia}/${mes}/${ano}`,
            dayName: i === 0 ? 'Hoje' : diasSemana[dataFutura.getDay()],
            dayNumber: dia
        });
    }
    setDiasDisponiveis(dias);
    setDataSelecionada(dias[0].fullDate); // Seleciona "Hoje" por padrão
  }, []);

  const handleProximo = () => {
    if (horaSelecionada && dataSelecionada) {
      // Navega passando os dados reais selecionados
      navigation.navigate('SelecionarPessoas', {
        restauranteId: restauranteId,
        data: dataSelecionada, 
        hora: horaSelecionada,
      });
    } else {
      alert('Por favor, selecione uma data e um horário.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Passo 1: Seleção de Data (Lista Horizontal) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Escolha uma data</Text>
          <Text style={styles.selectedDateText}>Data selecionada: <Text style={styles.highlight}>{dataSelecionada}</Text></Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesScroll}>
             {diasDisponiveis.map((dia, index) => {
                 const isSelected = dataSelecionada === dia.fullDate;
                 return (
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                        onPress={() => setDataSelecionada(dia.fullDate)}
                    >
                        <Text style={[styles.dayName, isSelected && styles.textSelected]}>{dia.dayName}</Text>
                        <Text style={[styles.dayNumber, isSelected && styles.textSelected]}>{dia.dayNumber}</Text>
                    </TouchableOpacity>
                 );
             })}
          </ScrollView>
        </View>

        {/* Passo 2: Seleção de Horário */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Horários disponíveis</Text>
          <View style={styles.timeSlotsContainer}>
            {HORARIOS_DISPONIVEIS.map((time) => {
                const isSelected = horaSelecionada === time;
                return (
                    <TouchableOpacity
                        key={time}
                        style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
                        onPress={() => setHoraSelecionada(time)}
                    >
                        <Text style={[styles.timeSlotText, isSelected && styles.selectedText]}>
                        {time}
                        </Text>
                    </TouchableOpacity>
                );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Botão Fixo de Ação */}
      <View style={styles.buttonContainer}>
        <BotaoCustomizado
          title="Continuar"
          onPress={handleProximo}
          disabled={!horaSelecionada}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F5F5DC' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  selectedDateText: { fontSize: 14, color: '#555', marginBottom: 15 },
  highlight: { color: '#FF5722', fontWeight: 'bold' },

  // --- Estilos da Data Horizontal ---
  datesScroll: { marginBottom: 5 },
  dateCard: {
      width: 60,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#EEE'
  },
  dateCardSelected: {
      backgroundColor: '#FF5722',
      borderColor: '#FF5722',
  },
  dayName: { fontSize: 12, color: '#777', marginBottom: 4 },
  dayNumber: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  textSelected: { color: '#FFFFFF' },

  // --- Seleção de Horário ---
  timeSlotsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  timeSlot: {
    paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, margin: 6,
    borderWidth: 1, borderColor: '#DDD', backgroundColor: '#FFF'
  },
  selectedTimeSlot: {
    backgroundColor: '#FF5722', borderColor: '#FF5722',
  },
  timeSlotText: { fontWeight: '600', fontSize: 14, color: '#333' },
  selectedText: { color: '#FFFFFF' },
  
  // --- Botão Fixo ---
  buttonContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingVertical: 15,
    backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#eee', elevation: 10,
  }
});

export default TelaSelecionarData;