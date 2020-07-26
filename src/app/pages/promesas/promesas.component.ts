import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    /* PROMESAS COMUNES EN ANGULAR */
    /* Ejecutar Una Promesa Tipo Observable */
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });

    /* La PROMESA por naturaleza es SINCRONA */
    /* const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hola Mundo');
      } else {
        reject('Algo Salio Mal');
      }
    }); */
    /* La RESOLUCION de la promesa es realmente la parte ASINCRONA (then(), catch(), finally())*/
    /* promesa
      .then((message: string) => {
        console.log(message);
      })
      .catch((error: string) => console.log(error)); */
  }

  /* Retornando Una Promesa Manual */
  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((res) => res.json())
        .then((body) => resolve(body.data));
    });
  }
}
