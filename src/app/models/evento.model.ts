// src/app/models/evento.model.ts
export interface Evento {
    nome: string;
    tipo: 'track' | 'field';
    A: number;
    B: number;
    C: number;
  }