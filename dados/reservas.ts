// dados/reservas.ts
import { Reserva } from '../interfaces/Reserva';
import { RESTAURANTES } from './restaurantes'; 

export const MINHAS_RESERVAS: Reserva[] = [
    {
        id: 'res1',
        protocolo: 'RPR-8852',
        data: '20/11/2023', 
        hora: '20:00',
        pessoas: 2,
        status: 'confirmada',
        restaurante: RESTAURANTES[0] 
    },
    {
        id: 'res2',
        protocolo: 'RPR-1029',
        data: '15/10/2023',
        hora: '13:00',
        pessoas: 4,
        status: 'concluída',
        restaurante: RESTAURANTES[1]
    }
];