// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/">Resultados</a>
      <a routerLink="/sobre">Sobre</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  imports: [RouterModule], // Importa o RouterModule para usar diretivas como routerLink e router-outlet
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}