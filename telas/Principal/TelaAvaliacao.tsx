import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TextInput, 
    TouchableOpacity, 
    Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Imports de dados, componentes e tipos
import { RESTAURANTES } from '../../dados/restaurantes';
import BotaoCustomizado from '../../componentes/BotaoCustomizado';
import { HomeStackScreenProps } from '../../navegacao/TiposNavegacao';
import { Restaurante } from '../../interfaces/Restaurante';

// Tipo de props para esta tela
type PropsAvaliacao = HomeStackScreenProps<'Avaliacao'>;

// Opções de tags rápidas para o usuário selecionar
const OPCOES_TAGS = [
    'Comida Saborosa', 'Atendimento Excelente', 'Ambiente Agradável',
    'Bebidas Ótimas', 'Preço Justo', 'Sobremesa Incrível', 'Rápido'
];

const TelaAvaliacao: React.FC<PropsAvaliacao> = ({ route, navigation }) => {
    const { restauranteId, reservaId } = route.params;

    // Busca os dados do restaurante para exibir o nome
    const restaurante = RESTAURANTES.find(r => r.id === restauranteId) as Restaurante;

    // --- Estados do Formulário ---
    const [nota, setNota] = useState(0); // Quantas estrelas (1 a 5)
    const [comentario, setComentario] = useState(''); // Texto do comentário
    const [tagsSelecionadas, setTagsSelecionadas] = useState<string[]>([]); // Lista de tags

    // Função para alternar a seleção de uma tag
    const alternarTag = (tag: string) => {
        if (tagsSelecionadas.includes(tag)) {
            // Se já tem, remove
            setTagsSelecionadas(prev => prev.filter(t => t !== tag));
        } else {
            // Se não tem, adiciona
            setTagsSelecionadas(prev => [...prev, tag]);
        }
    };

    const enviarAvaliacao = () => {
        
        console.log('Enviando avaliação:', {
            idReserva: reservaId,
            idRestaurante: restauranteId,
            nota: nota,
            tags: tagsSelecionadas,
            comentario: comentario
        });

        Alert.alert(
            "Obrigado!",
            "Sua avaliação foi enviada com sucesso.",
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        );
    };

    // Renderiza as 5 estrelas interativas
    const renderizarEstrelas = () => {
        let estrelas = [];
        for (let i = 1; i <= 5; i++) {
            estrelas.push(
                <TouchableOpacity key={i} onPress={() => setNota(i)} activeOpacity={0.7}>
                    <Ionicons 
                        name={i <= nota ? "star" : "star-outline"} 
                        size={40} 
                        color="#FFC107" 
                        style={{ marginHorizontal: 5 }}
                    />
                </TouchableOpacity>
            );
        }
        return estrelas;
    };

    if (!restaurante) return null; // Segurança caso não encontre o ID

    return (
        <View style={styles.containerPrincipal}>
            <ScrollView contentContainerStyle={styles.conteudoScroll}>
                
                {/* Cabeçalho: Nome do Restaurante */}
                <View style={styles.containerCabecalho}>
                    <Text style={styles.tituloCabecalho}>Como foi sua experiência no</Text>
                    <Text style={styles.nomeRestaurante}>{restaurante.nome}?</Text>
                </View>

                {/* Seção de Estrelas */}
                <View style={styles.cartao}>
                    <Text style={styles.rotuloSecao}>Dê sua nota</Text>
                    <View style={styles.containerEstrelas}>
                        {renderizarEstrelas()}
                    </View>
                    <Text style={styles.textoNota}>
                        {nota === 0 ? 'Toque nas estrelas' : `${nota} estrelas`}
                    </Text>
                </View>

                {/* Seção de Tags Rápidas */}
                <View style={styles.cartao}>
                    <Text style={styles.rotuloSecao}>O que mais se destacou? (Opcional)</Text>
                    <View style={styles.containerTags}>
                        {OPCOES_TAGS.map(tag => {
                            const estaSelecionada = tagsSelecionadas.includes(tag);
                            return (
                                <TouchableOpacity 
                                    key={tag}
                                    style={[styles.caixaTag, estaSelecionada && styles.caixaTagSelecionada]}
                                    onPress={() => alternarTag(tag)}
                                >
                                    <Text style={[styles.textoTag, estaSelecionada && styles.textoTagSelecionado]}>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Seção de Comentário em Texto */}
                <View style={styles.cartao}>
                    <Text style={styles.rotuloSecao}>Deixe um comentário (Opcional)</Text>
                    <TextInput
                        style={styles.areaTexto}
                        placeholder="Conte mais detalhes sobre os pratos, ambiente, etc..."
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        value={comentario}
                        onChangeText={setComentario}
                        textAlignVertical="top"
                    />
                </View>

            </ScrollView>

            {/* Botão Fixo de Enviar */}
            <View style={styles.containerBotao}>
                <BotaoCustomizado
                    title="Enviar Avaliação"
                    onPress={enviarAvaliacao}
                    disabled={nota === 0} // Desabilita se não escolheu estrelas
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerPrincipal: { flex: 1, backgroundColor: '#F5F5DC' }, 
    conteudoScroll: { padding: 20, paddingBottom: 100 },

    // --- Cabeçalho ---
    containerCabecalho: {
        marginBottom: 25,
        alignItems: 'center',
    },
    tituloCabecalho: { fontSize: 18, color: '#555' },
    nomeRestaurante: { fontSize: 26, fontWeight: 'bold', color: '#FF5722', marginTop: 5, textAlign: 'center' },

    // --- Cartões Genéricos ---
    cartao: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    rotuloSecao: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },

    // --- Estrelas ---
    containerEstrelas: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    textoNota: {
        textAlign: 'center',
        color: '#FFC107',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // --- Tags ---
    containerTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    caixaTag: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FF572250',
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
    },
    caixaTagSelecionada: {
        backgroundColor: '#FF5722', 
        borderColor: '#FF5722',
    },
    textoTag: {
        color: '#FF5722',
        fontSize: 14,
    },
    textoTagSelecionado: {
        color: '#FFFFFF', 
        fontWeight: 'bold',
    },

    // --- Área de Texto ---
    areaTexto: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        height: 120,
    },

    // --- Botão Fixo ---
    containerBotao: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1, borderTopColor: '#EEE',
    }
});

export default TelaAvaliacao;