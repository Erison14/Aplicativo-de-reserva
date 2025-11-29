import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de tipagem e dados
import { PrincipalTabScreenProps } from '../../navegacao/TiposNavegacao';
import { Reserva, ReservaStatus } from '../../interfaces/Reserva';
import { MINHAS_RESERVAS } from '../../dados/reservas';

// Tipo de props para a Tela de Reservas
type PropsMinhasReservas = PrincipalTabScreenProps<'Reservas'>;

// --- Dicionário de Estilos para Status ---
const estilosStatus: Record<ReservaStatus, { cor: string; icone: keyof typeof Ionicons.glyphMap }> = {
    confirmada: { cor: '#4CAF50', icone: 'checkmark-circle' }, // Verde (confirmado)
    pendente: { cor: '#FF9800', icone: 'time' }, // Amarelo (pendente)
    concluída: { cor: '#757575', icone: 'flag' }, // Cinza (concluída)
    cancelada: { cor: '#F44336', icone: 'close-circle' }, // Vermelho (cancelada)
};

// --- Componente Cartão de Reserva ---
interface PropsCartaoReserva {
    reserva: Reserva;
    aoVerDetalhes: (reserva: Reserva) => void;
}

const CartaoReserva: React.FC<PropsCartaoReserva> = ({ reserva, aoVerDetalhes }) => {
    const infoStatus = estilosStatus[reserva.status];

    return (
        <View style={estilos.cartao}>
            {/* Linha de Status e Título */}
            <View style={estilos.linhaCabecalho}>
                <Ionicons name={infoStatus.icone} size={20} color={infoStatus.cor} />
                <Text style={[estilos.textoStatus, { color: infoStatus.cor }]}>
                    {reserva.status.toUpperCase()}
                </Text>
            </View>

            <Text style={estilos.nomeRestaurante}>{reserva.restaurante.nome}</Text>

            {/* Linha de Detalhes (Data e Pessoas) */}
            <View style={estilos.linhaDetalhes}>
                <View style={estilos.itemDetalhe}>
                    <Ionicons name="calendar-outline" size={16} color="#FF5722" />
                    <Text style={estilos.textoDetalhe}>{reserva.data} às {reserva.hora}</Text>
                </View>
                <View style={estilos.itemDetalhe}>
                    <Ionicons name="people-outline" size={16} color="#FF5722" />
                    <Text style={estilos.textoDetalhe}>{reserva.pessoas} pessoas</Text>
                </View>
            </View>

            {/* Botão de Ação */}
            {reserva.status === 'confirmada' && (
                <TouchableOpacity style={estilos.botaoCancelar} onPress={() => aoVerDetalhes(reserva)}>
                    <Text style={estilos.textoBotao}>Cancelar Reserva</Text>
                </TouchableOpacity>
            )}
            {reserva.status === 'concluída' && (
                   <TouchableOpacity style={estilos.botaoAvaliar} onPress={() => aoVerDetalhes(reserva)}>
                        <Text style={estilos.textoBotaoAvaliar}>Deixar Avaliação</Text>
                    </TouchableOpacity>
            )}
            {/* Botão de "Detalhes" genérico para pendente/cancelada */}
             {(reserva.status === 'pendente' || reserva.status === 'cancelada') && (
                   <TouchableOpacity style={[estilos.botaoAvaliar, {backgroundColor: '#777'}]} onPress={() => Alert.alert("Detalhes", `Reserva ${reserva.protocolo} com status ${reserva.status}.`)}>
                        <Text style={estilos.textoBotao}>Ver Detalhes</Text>
                    </TouchableOpacity>
            )}
        </View>
    );
};

// --- Tela Principal ---
const TelaMinhasReservas: React.FC<PropsMinhasReservas> = ({ navigation }) => {
    
    const aoClicarAcao = (reserva: Reserva) => {
        if (reserva.status === 'confirmada') {
            Alert.alert(
                "Cancelar Reserva",
                `Deseja realmente cancelar a reserva ${reserva.protocolo}? (Simulação)`
            );
        } 
        else if (reserva.status === 'concluída') {
            navigation.navigate('HomeStack', {
                screen: 'Avaliacao',
                params: { 
                    restauranteId: reserva.restaurante.id,
                    reservaId: reserva.id
                }
            });
        }
    };

    // Filtra as reservas: ativas (confirmada, pendente) e históricas (concluída, cancelada)
    const reservasAtivas = MINHAS_RESERVAS.filter(r => r.status === 'confirmada' || r.status === 'pendente');
    const historicoReservas = MINHAS_RESERVAS.filter(r => r.status === 'concluída' || r.status === 'cancelada');

    return (
        <View style={estilos.container}>
            <Text style={estilos.tituloSecao}>Reservas Ativas ({reservasAtivas.length})</Text>
            <FlatList
                data={reservasAtivas}
                renderItem={({ item }) => <CartaoReserva reserva={item} aoVerDetalhes={aoClicarAcao} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={estilos.textoVazio}>Você não possui reservas ativas.</Text>}
                contentContainerStyle={estilos.containerLista}
            />

            <View style={estilos.divisor} />

            <Text style={estilos.tituloSecao}>Histórico ({historicoReservas.length})</Text>
            <FlatList
                data={historicoReservas}
                renderItem={({ item }) => <CartaoReserva reserva={item} aoVerDetalhes={aoClicarAcao} />}
                keyExtractor={item => item.id}
                scrollEnabled={false} // Evita scroll aninhado
                ListEmptyComponent={<Text style={estilos.textoVazio}>Seu histórico de reservas está vazio.</Text>}
                contentContainerStyle={estilos.containerLista}
            />
        </View>
    );
};

const estilos = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F5F5DC' 
    }, 
    containerLista: { 
        paddingHorizontal: 15, 
        paddingBottom: 15 
    },
    tituloSecao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF5722',
        paddingHorizontal: 15,
        paddingTop: 20,
        marginBottom: 10,
    },
    divisor: {
        height: 1,
        backgroundColor: '#FF572230',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    // --- Estilos do Cartão ---
    cartao: { 
        backgroundColor: '#FFFFFF', 
        borderRadius: 12, 
        padding: 15, 
        marginBottom: 15, 
        elevation: 4, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    linhaCabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    textoStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    nomeRestaurante: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
    },
    linhaDetalhes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemDetalhe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textoDetalhe: {
        fontSize: 14,
        color: '#555',
        marginLeft: 5,
    },
    // Botões de Ação
    botaoCancelar: {
        backgroundColor: '#F44336', 
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoAvaliar: {
        backgroundColor: '#FFC107',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    textoBotaoAvaliar: {
        color: '#333', 
        fontWeight: 'bold',
    },
    textoVazio: {
        textAlign: 'center',
        color: '#777',
        marginTop: 20,
    }
});

export default TelaMinhasReservas;