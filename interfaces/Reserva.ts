// interfaces/Reserva.ts
import { Restaurante } from './Restaurante';

export type ReservaStatus = 'confirmada' | 'pendente' | 'concluída' | 'cancelada';

export interface Reserva {
    id: string;
    protocolo: string;
    data: string;
    hora: string;
    pessoas: number;
    status: ReservaStatus;
    restaurante: Restaurante; 
}