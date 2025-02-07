export interface Atleta {
    nome: string;
    resultados: { [evento: string]: number };
    pontuacaoTotal?: number;
  }