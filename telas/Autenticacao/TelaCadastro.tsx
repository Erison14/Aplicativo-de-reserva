// telas/Autenticacao/TelaCadastro.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoCustomizado from '../../componentes/BotaoCustomizado';
import { AutenticacaoScreenProps } from '../../navegacao/TiposNavegacao';

// Tipo de props específico para esta tela ('Cadastro')
type CadastroProps = AutenticacaoScreenProps<'Cadastro'>;

const TelaCadastro: React.FC<CadastroProps> = ({ navigation }) => {
  // Estados traduzidos
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const fazerCadastro = () => {
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    if (nome && email && senha.length >= 6) {
      // Simulação de cadastro bem-sucedido
      alert(`Usuário ${nome} cadastrado com sucesso! Volte para o Login.`);
      // Após o cadastro, o usuário é enviado de volta para o Login (Tela 1)
      navigation.navigate('Login'); 
    } else {
      alert('Por favor, preencha todos os campos e use uma senha de pelo menos 6 caracteres.');
    }
  };

  const formularioValido = nome && email && senha.length >= 6 && senha === confirmarSenha;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartao}>
        <Text style={styles.titulo}>Crie Sua Conta</Text>

        {/* Input de Nome Completo */}
        <View style={styles.grupoInput}>
          <Ionicons name="person-outline" size={20} color="#FF5722" style={styles.icone} />
          <TextInput
            style={styles.entradaTexto}
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#999"
          />
        </View>

        {/* Input de Email */}
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

        {/* Input de Senha */}
        <View style={styles.grupoInput}>
          <Ionicons name="lock-closed-outline" size={20} color="#FF5722" style={styles.icone} />
          <TextInput
            style={styles.entradaTexto}
            placeholder="Senha (mínimo 6 caracteres)"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#999"
          />
        </View>

        {/* Input de Confirmação de Senha */}
        <View style={styles.grupoInput}>
          <Ionicons name="lock-closed-outline" size={20} color="#FF5722" style={styles.icone} />
          <TextInput
            style={styles.entradaTexto}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholderTextColor="#999"
          />
        </View>
        
        <BotaoCustomizado
          title="Cadastrar"
          onPress={fazerCadastro}
          disabled={!formularioValido}
        />
      </View>

      {/* Link para Login */}
      <TouchableOpacity 
        style={styles.linkLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoLink}>Já tem uma conta? <Text style={styles.destaqueLink}>Fazer Login</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 25, 
    justifyContent: 'center', 
    backgroundColor: '#FFF' 
  },
  
  // --- Cartão Principal ---
  cartao: {
    backgroundColor: '#F5F5DC',
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
    padding: 12,
  },
  entradaTexto: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  
  // --- Link ---
  linkLogin: {
    marginTop: 30,
    alignItems: 'center',
  },
  textoLink: { 
    fontSize: 15,
    color: '#555',
  },
  destaqueLink: {
    color: '#FF5722',
    fontWeight: 'bold',
  }
});

export default TelaCadastro;