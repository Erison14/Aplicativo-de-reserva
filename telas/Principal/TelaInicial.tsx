import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de componentes e dados
import CartaoRestaurante from '../../componentes/CartaoRestaurante';
import { RESTAURANTES } from '../../dados/restaurantes';

// Imports de tipagem
import { HomeStackScreenProps } from '../../navegacao/TiposNavegacao';
import { Restaurante } from '../../interfaces/Restaurante';

// Tipo de props para a Tela Inicial
type PropsInicial = HomeStackScreenProps<'ListaInicial'>;

const TelaInicial: React.FC<PropsInicial> = ({ navigation }) => {
  
  // Função que renderiza cada item da lista
  const renderizarItem = ({ item }: { item: Restaurante }) => (
    <CartaoRestaurante
      restaurante={item} 
      aoPressionar={() => navigation.navigate('Detalhes', { restauranteId: item.id })}
    />
  );

  // Componente para o cabeçalho (barra de busca)
  const CabecalhoLista = () => (
    <View style={estilosCabecalho.containerCabecalho}>
      <View style={estilosCabecalho.barraBusca}>
        <Ionicons name="search-outline" size={20} color="#FF5722" style={estilosCabecalho.iconeBusca} />
        <TextInput 
            placeholder="Pesquisar por nome ou culinária..." 
            placeholderTextColor="#999"
            style={estilosCabecalho.entradaBusca}
        />
      </View>
      <Text style={estilosCabecalho.tituloSecao}>Opções Populares</Text>
    </View>
  );

  return (
    <View style={estilos.container}>
      <FlatList
        data={RESTAURANTES}
        renderItem={renderizarItem}
        keyExtractor={(item: Restaurante) => item.id}
        ListHeaderComponent={CabecalhoLista}
        contentContainerStyle={estilos.lista}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5DC' 
  },
  lista: { 
    paddingVertical: 15 
  },
});

const estilosCabecalho = StyleSheet.create({
    containerCabecalho: {
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    barraBusca: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 5,
        marginBottom: 20,
        elevation: 2, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    iconeBusca: {
        marginLeft: 10,
        marginRight: 5,
    },
    entradaBusca: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    tituloSecao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#FF5722',
        paddingLeft: 10,
    }
});

export default TelaInicial;