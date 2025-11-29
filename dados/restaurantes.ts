// dados/restaurantes.ts
const imgPraia = require('../assets/imagens/Praia-Azul.jpg');
const imgItaliano = require('../assets/imagens/italiano.jpg');
const imgCarne = require('../assets/imagens/carne.jpg');
const imgCafe = require('../assets/imagens/cafe.jpg');

import { Restaurante } from '../interfaces/Restaurante';

export const RESTAURANTES: Restaurante[] = [
  {
    id: 'r1',
    nome: 'Restaurante Praia Azul',
    culinaria: 'Frutos do Mar',
    nota: 4.8,
    faixaPreco: '$$$',
    endereco: 'Rua das Jangadas, 100, Centro',
    imagem: imgPraia,
    descricao: 'Melhor culinária praiana da região.',
  },
  {
    id: 'r2',
    nome: 'La Pasta Bella',
    culinaria: 'Italiana',
    nota: 4.5,
    faixaPreco: '$$',
    endereco: 'Avenida Principal, 450, Bairro Novo',
    imagem: imgItaliano,
    descricao: 'Massas caseiras e ambiente acolhedor. Ideal para famílias.',
  },
  {
    id: 'r3',
    nome: 'Steak House Black',
    culinaria: 'Carnes',
    nota: 4.9,
    faixaPreco: '$$$$',
    endereco: 'Rua das Grifes, 301, Alto Luxo',
    imagem: imgCarne,
    descricao: 'Cortes nobres e adega premiada. Experiência de alta gastronomia.',
  },
  {
    id: 'r4',
    nome: 'Café da Esquina',
    culinaria: 'Cafeteria',
    nota: 4.2,
    faixaPreco: '$',
    endereco: 'Praça Central, 12, Vila Antiga',
    imagem: imgCafe,
    descricao: 'Ótimo para um café da manhã ou um almoço rápido e saboroso.',
  },
];