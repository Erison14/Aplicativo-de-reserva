import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Importa a interface do restaurante para uso nos parâmetros de tela
import { Restaurante } from '../interfaces/Restaurante';

// --- 1. Tipagem da Stack de Autenticação (Telas 1 e 10) ---
// Define quais telas existem na Stack de Autenticação e quais parâmetros elas esperam
export type AutenticacaoStackParamList = {
    Login: undefined; // Não espera parâmetros
    Cadastro: undefined; // Não espera parâmetros
    Main: NavigatorScreenParams<PrincipalTabParamList>;
};

// Tipo genérico para as telas de Autenticação
export type AutenticacaoScreenProps<T extends keyof AutenticacaoStackParamList> = 
    StackScreenProps<AutenticacaoStackParamList, T>;



// O fluxo de reserva é uma Stack aninhada dentro da Tab "Início"
export type HomeStackParamList = {
    ListaInicial: undefined; // Tela 2
    Detalhes: { restauranteId: string }; // Tela 3: Requer o ID para buscar o restaurante
    SelecionarData: { restauranteId: string }; // Tela 4: Requer o ID
    SelecionarPessoas: { restauranteId: string; data: string; hora: string }; // Tela 5: Requer ID, Data, Hora
    Revisar: { restauranteId: string; data: string; hora: string; pessoas: number }; // Tela 6: Requer todos os dados
    Confirmacao: { restaurante: Restaurante; data: string; hora: string; pessoas: number;observacoes?: string;}; // Tela 7: Requer o objeto Restaurante + dados
    Avaliacao: { restauranteId: string; reservaId: string };
    

};

// Tipo genérico para as telas do fluxo Home/Reserva
export type HomeStackScreenProps<T extends keyof HomeStackParamList> = 
    StackScreenProps<HomeStackParamList, T>;


// --- 3. Tipagem da Navegação por Abas (Tabs) (Telas 2, 8 e 9) ---
export type PrincipalTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>; // A Home é uma Stack de telas
    Reservas: undefined; // Tela 8
    Perfil: undefined; // Tela 9
};

// Tipo genérico para as telas que são abas principais (Telas 8 e 9)
export type PrincipalTabScreenProps<T extends keyof PrincipalTabParamList> = 
    CompositeScreenProps<
        BottomTabScreenProps<PrincipalTabParamList, T>,
        StackScreenProps<HomeStackParamList>
    >;