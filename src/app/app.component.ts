import { Component, OnInit } from '@angular/core';

// tslint:disable-next-line: max-line-length
/* Existe Una Función Declarada De Forma Global Y Se Lo Digo A TypeScript Para Que No Me Muestre Un Error, En La Función Del ngOnInit (Se Pueden Pasar Argumentos o Parametros) */
declare function customInitFunctions();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'adminPro';

  ngOnInit(): void {
    customInitFunctions();
  }
}
