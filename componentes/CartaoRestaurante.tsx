import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurante } from '../interfaces/Restaurante';

interface CartaoRestauranteProps {
    restaurante: Restaurante; 
    aoPressionar: () => void; 
}

const CartaoRestaurante: React.FC<CartaoRestauranteProps> = ({ restaurante, aoPressionar }) => {
    
    // Tratamento de segurança para o endereço (caso venha undefined)
    const enderecoFormatado = restaurante.endereco ? String(restaurante.endereco).split(',')[0] : 'Endereço não informado';

    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={aoPressionar}
            activeOpacity={0.8}
        >
          
            <Image source={restaurante.imagem} style={styles.image} /> 
            
            <View style={styles.classificacao}>
                <Ionicons nome="star" size={14} color="#FFFFFF" />
              
                <Text style={styles.avaliacao}>{restaurante.nota}</Text>
            </View>

            <View style={styles.info}>
              
                <Text style={styles.nome}>{restaurante.nome}</Text>
                
                <View style={styles.detalhesRow}>
                
                    <Text style={styles.detalhes}>{restaurante.culinaria}</Text>
                    <Text style={styles.preco}>{restaurante.faixaPreco}</Text>
                </View>
                
                <View style={styles.detalhesRow}>
                    <Ionicons nome="location-outline" size={14} color="#555" />
                   
                    <Text style={styles.endereco}>{enderecoFormatado}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    marginBottom: 15, 
    overflow: 'hidden', 
    marginHorizontal: 15,
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  image: { 
    width: '100%', 
    height: 160,
    resizeMode: 'cover',
  },
  classificacao: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5722', 
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  avaliacao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  info: { 
    padding: 15,
  },
  nome: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#333',
  },
  detalhesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    justifyContent: 'space-between',
  },
  detalhes: { 
    fontSize: 14, 
    color: '#FF5722', 
    marginRight: 10,
    fontWeight: '600',
  },
  preco: {
    fontSize: 14, 
    color: '#333',
  },
  endereco: { 
    fontSize: 14, 
    color: '#555',
    marginLeft: 5,
  },
});

export default CartaoRestaurante;