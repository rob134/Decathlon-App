// src/app/componentes/resultados/resultados.component.ts
import { Component, OnInit } from '@angular/core';
import { DecathlonService } from '../../services/decathlon.service';
import { Atleta } from '../../models/atleta.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  atletas: Atleta[] = [];

  constructor(private decathlonService: DecathlonService) {}

  ngOnInit(): void {
    this.decathlonService.getDadosCompletos().subscribe((data) => {
      this.atletas = data.sort((a, b) => (b.pontuacaoTotal || 0) - (a.pontuacaoTotal || 0));
    });
  }

  exportarCSV(): void {
    const csvContent = 'Nome,Pontuação Total\n' + this.atletas.map(a => `${a.nome},${a.pontuacaoTotal}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}