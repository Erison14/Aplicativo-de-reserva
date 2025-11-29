import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoCustomizado from '../../componentes/BotaoCustomizado';
import { AutenticacaoScreenProps } from '../../navegacao/TiposNavegacao';

// A tela aceita uma prop extra chamada 'onLogin'
type LoginProps = AutenticacaoScreenProps<'Login'> & {
  onLogin: () => void;
};

const TelaLogin: React.FC<LoginProps> = ({ navigation, onLogin }) => {
 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = () => {
    // Validação simples
    if (email && senha) {
      // CHAMA A FUNÇÃO QUE VEIO DO AppNavegador PARA MUDAR O ESTADO
      onLogin(); 
    } else {
      alert('Preencha email e senha (qualquer valor serve para teste).');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Ionicons name="restaurant" size={60} color="#FF5722" />
        <Text style={styles.nomeApp}>Reserva Rápida</Text>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.titulo}>Faça Login</Text>

        <View style={styles.grupoInput}>
          <Ionicons name="mail-outline" size={20} color="#FF5722" style={styles.icone} />
          <TextInput
            style={styles.entradaTexto}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.grupoInput}>
          <Ionicons name="lock-closed-outline" size={20} color="#FF5722" style={styles.icone} />
          <TextInput
            style={styles.entradaTexto}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#999"
          />
        </View>

        <BotaoCustomizado 
          title="Entrar na Conta" 
          onPress={fazerLogin} 
          disabled={!email || !senha}
        />
      </View>

      <TouchableOpacity 
        style={styles.linkCadastro}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.textoLink}>Não tem conta? <Text style={styles.destaqueLink}>Cadastre-se aqui</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 25, 
    backgroundColor: '#FFF', 
    justifyContent: 'center' 
  },
  
  // --- Área do Logo ---
  containerLogo: { 
    alignItems: 'center', 
    marginBottom: 30 
  },
  nomeApp: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FF5722', 
    marginTop: 10 
  },

  // --- Cartão Principal ---
  cartao: {
    backgroundColor: '#F5F5DC', // Bege Claro
    borderRadius: 15,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#333' 
  },

  // --- Inputs ---
  grupoInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FF572230',
  },
  icone: { 
    padding: 12 
  },
  entradaTexto: { 
    flex: 1, 
    paddingVertical: 12, 
    fontSize: 16, 
    color: '#333' 
  },

  // --- Link ---
  linkCadastro: { 
    marginTop: 30, 
    alignItems: 'center' 
  },
  textoLink: { 
    fontSize: 15, 
    color: '#555' 
  },
  destaqueLink: { 
    color: '#FF5722', 
    fontWeight: 'bold' 
  }
});

export default TelaLogin;