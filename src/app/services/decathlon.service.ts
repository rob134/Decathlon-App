// src/app/services/decathlon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Atleta } from '../models/atleta.model';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root',
})
export class DecathlonService {
  private resultadosUrl = 'assets/resultados.json';
  private sistemaPontuacaoUrl = 'assets/sistema_pontuacao.json';

  constructor(private http: HttpClient) {}

  getResultados(): Observable<Atleta[]> {
    return this.http.get<Atleta[]>(this.resultadosUrl);
  }

  getSistemaPontuacao(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.sistemaPontuacaoUrl);
  }

  calcularPontuacao(atletas: Atleta[], eventos: Evento[]): Atleta[] {
    return atletas.map((atleta) => {
      let pontuacaoTotal = 0;
      eventos.forEach((evento) => {
        const performance = atleta.resultados[evento.nome];
        if (evento.tipo === 'track') {
          pontuacaoTotal += Math.floor(evento.A * Math.pow(evento.B - performance, evento.C));
        } else {
          pontuacaoTotal += Math.floor(evento.A * Math.pow(performance - evento.B, evento.C));
        }
      });
      return { ...atleta, pontuacaoTotal };
    });
  }

  getDadosCompletos(): Observable<Atleta[]> {
    return forkJoin([this.getResultados(), this.getSistemaPontuacao()]).pipe(
      map(([atletas, eventos]) => this.calcularPontuacao(atletas, eventos))
    );
  }
}