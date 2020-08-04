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
  // tslint:disable-next-line: max-line-length
  /* Dentro de una promesa puedo ejecutar peticiones que resuelven otras promesas y solo se van a ejecutar con el resolve de la promesa creada manualmente. */
  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((res) => res.json())
        .then((body) => resolve(body.data));
    });
  }
}

/* ESTO ES REALMENTE VALIOSO E IMPORTANTE PROMESAS Y OBSERVABLES */
// tslint:disable-next-line: max-line-length
/* EN LAS PROMESAS ASI NO SE INVOQUE EL .THEN() SE VA A EJECUTAR DE TODOS MODOS Y VA A REALIZAR EL CODIGO INTERNO DE DICHA PROMESA, PERO YA CUANDO QUIERO RECUPERAR O MOSTRAR LOS DATOS POR LA PANTALLA O LA CONSOLA QUE RETORNA ESA PROMESA, TENGO QUE EJECUTAR EL .THEN(). */

// tslint:disable-next-line: max-line-length
/* EL MISMO CONCEPTO SE DEBE MANEJAR CON LOS OBSERVABLES, POR QUE ASI NO SE INVOQUE EL .SUBSCRIPTION() EL OBSERVABLE VA A REALIZAR SU PROCESO INTERNO, PERO PARA RECUPERAR O MOSTRAR LOS DATOS POR LA PANTALLA O POR LA CONSOLA DE DICHO OBSERVABLE, TENGO QUE EJECUTAR EL .SUBSCRIPTION(). */
