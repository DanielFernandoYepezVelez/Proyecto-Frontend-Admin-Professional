import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// tslint:disable-next-line: max-line-length
/* Existe Una Función Declarada De Forma Global Y Se Lo Digo A TypeScript Para Que No Me Muestre Un Error, En La Función Del ngOnInit (Se Pueden Pasar Argumentos o Parametros) */
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear();

  constructor(private settingService: SettingsService) {}

  ngOnInit(): void {
    customInitFunctions();
  }
}
