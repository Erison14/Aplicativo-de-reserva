import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de componentes e dados
import BotaoCustomizado from '../../componentes/BotaoCustomizado';
import { RESTAURANTES } from '../../dados/restaurantes';

// Imports de tipagem
import { HomeStackScreenProps } from '../../navegacao/TiposNavegacao';
import { Restaurante } from '../../interfaces/Restaurante';

// Define o tipo de props para a tela 'Detalhes'
type PropsDetalhes = HomeStackScreenProps<'Detalhes'>;

// Obtém a largura da tela para garantir que a imagem ocupe a largura total
const { width: larguraTela } = Dimensions.get('window');

const TelaDetalhes: React.FC<PropsDetalhes> = ({ route, navigation }) => {
  
  // 1. Recebe o parâmetro 'restauranteId' vindo da navegação
  const { restauranteId } = route.params; 
  
  // 2. Busca os dados do restaurante na lista
  const restaurante = RESTAURANTES.find(r => r.id === restauranteId) as Restaurante;

  // Renderiza um aviso se o restaurante não for encontrado (segurança)
  if (!restaurante) {
    return (
        <View style={styles.containerCarregamento}>
            <Text style={styles.textoCarregamento}>Restaurante não encontrado!</Text>
        </View>
    );
  }

  // Função que inicia o fluxo de reserva
  const iniciarReserva = () => {
    // Passa o ID para a próxima tela
    navigation.navigate('SelecionarData', { restauranteId: restaurante.id }); 
  };

  return (
    <View style={styles.containerPrincipal}>
        <ScrollView contentContainerStyle={styles.conteudoScroll}>
            
            {/* IMAGEM DE CAPA */}
            <Image 
                source={restaurante.imagem} 
                style={styles.imagemCapa} 
            />
            
            <View style={styles.conteudo}>
                
                {/* NOME DO RESTAURANTE */}
                <Text style={styles.nomeRestaurante}>{restaurante.nome}</Text>
                
                {/* LINHA DE AVALIAÇÃO E DETALHES */}
                <View style={styles.linhaAvaliacao}>
                    <Ionicons name="star" size={20} color="#FFC107" />
                    <Text style={styles.textoNota}>{restaurante.nota} / 5.0</Text>
                    <Text style={styles.textoCulinaria}> • {restaurante.culinaria} • {restaurante.faixaPreco}</Text>
                </View>

                <View style={styles.divisor} />

                {/* LOCALIZAÇÃO */}
                <Text style={styles.tituloSecao}>Localização</Text>
                <View style={styles.linhaInfo}>
                    <Ionicons name="map-outline" size={20} color="#FF5722" />
                    <Text style={styles.textoInfo}>{restaurante.endereco}</Text>
                </View>
                
                <View style={styles.divisor} />

                {/* DESCRIÇÃO */}
                <Text style={styles.tituloSecao}>Sobre o Restaurante</Text>
                <Text style={styles.textoDescricao}>{restaurante.descricao}</Text>
                
            </View>

        </ScrollView>
        
        {/* BOTÃO FIXO DE RESERVA */}
        <View style={styles.containerBotao}>
            <BotaoCustomizado
                title="Reservar Mesa Agora"
                onPress={iniciarReserva}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: { 
    flex: 1, 
    backgroundColor: '#F5F5DC' 
  },
  containerCarregamento: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  textoCarregamento: { 
    fontSize: 18, 
    color: '#333' 
  },
  conteudoScroll: { 
    paddingBottom: 100 
  },
  
  // --- Imagem ---
  imagemCapa: { 
    width: larguraTela, 
    height: 250,
    resizeMode: 'cover',
  },
  
  // --- Conteúdo ---
  conteudo: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  nomeRestaurante: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333',
    marginBottom: 5,
  },
  linhaAvaliacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textoNota: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107',
    marginLeft: 5,
  },
  textoCulinaria: {
    fontSize: 16,
    color: '#777',
  },
  divisor: {
    height: 1,
    backgroundColor: '#FF572220',
    marginVertical: 20,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 10,
  },
  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textoInfo: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  textoDescricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  containerBotao: {
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
});

export default TelaDetalhes;