import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrincipalTabScreenProps } from '../../navegacao/TiposNavegacao';

// Tipo de props estendido para aceitar a função de logout
type PropsPerfil = PrincipalTabScreenProps<'Perfil'> & {
  onLogout?: () => void;
};

const TelaPerfil: React.FC<PropsPerfil> = ({ navigation, onLogout }) => {
    
    // Função para lidar com a ação de sair
    const fazerLogout = () => {
        if (onLogout) {
          // Chama a função passada pelo AppNavegador para mudar o estado de autenticação
          onLogout(); 
        } else {
          // Fallback: Apenas navega para o início se não houver função de logout
          navigation.navigate('HomeStack', { screen: 'ListaInicial' }); 
        }
    };

    // Dados simulados do usuário
    const USUARIO_SIMULADO = { 
        nome: 'Erison Oliveira', 
        email: 'e.olivera.sousa@gmail.com' 
    };

    return (
        <View style={estilos.containerPrincipal}>
            <ScrollView contentContainerStyle={estilos.conteudoScroll}>
                
                {/* Cartão de Informações do Usuário */}
                <View style={estilos.cartaoCabecalho}>
                    <Ionicons name="person-circle" size={80} color="#FFC107" />
                    <Text style={estilos.nomeUsuario}>{USUARIO_SIMULADO.nome}</Text>
                    <Text style={estilos.emailUsuario}>{USUARIO_SIMULADO.email}</Text>
                </View>

                {/* Botão de Sair */}
                <TouchableOpacity style={estilos.botaoSair} onPress={fazerLogout}>
                    <Text style={estilos.textoSair}>Sair (Logout)</Text>
                    <Ionicons name="log-out-outline" size={20} color="#F44336" />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const estilos = StyleSheet.create({
    containerPrincipal: { 
        flex: 1, 
        backgroundColor: '#F5F5DC' 
    },
    conteudoScroll: { 
        padding: 20 
    },
    
    // --- Cartão do Usuário ---
    cartaoCabecalho: {
        alignItems: 'center', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 15, 
        padding: 25, 
        marginBottom: 20,
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 3 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5,
    },
    nomeUsuario: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#333', 
        marginTop: 10 
    },
    emailUsuario: { 
        fontSize: 14, 
        color: '#777', 
        marginTop: 5 
    },
    
    // --- Botão Sair ---
    botaoSair: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#FFFFFF',
        padding: 15, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#F44336', 
        marginTop: 40,
    },
    textoSair: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#F44336', 
        marginRight: 10 
    },
});

export default TelaPerfil;