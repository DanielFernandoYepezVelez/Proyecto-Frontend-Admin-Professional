import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styles: [],
})
export class RxJSComponent implements OnInit, OnDestroy {
  intervalSubs: Subscription;

  /* Aqui estamos creando un observable de forma manual */
  /* Me srive para crear mis propios observables dependiendo de las necesidades o requerimientos de un proyecto */

  /*                                 OPERATORS(Se pueden concatenar)                          */
  // tslint:disable-next-line: max-line-length
  /* Operador retry() lo utilizo cuando quiero repetir la suscripción al observable en caso de que falle en el primer intento, además puedo definirle el numero de veces que deseo repetir dicha petición */
  /* take(4) El numero de valores que va a mandar al suscribe */
  /* map() recibe la data y la trasnforma, devolviendo solo la data necesaria, es decir, más pulida */
  /* filter() me sirve para emitir un valor de manera condicional */

  constructor() {
    // tslint:disable-next-line: max-line-length
    /* El suscribe del observable puede recibir tres argumentos, por que tiene definidos tres parametros opcionales que son => el next, el error o el complete */
    /* obs$.subscribe(
      (valor) => console.log('Subs:', valor),
      (err) => console.log('Error:', err),
      () => console.log('Observer Terminado')
    ); */

    this.retornaObservable()
      .pipe(/* retry(1) */)
      .subscribe(
        (valor) => console.log('Subs:', valor),
        (err) => console.log('Error:', err),
        () => console.log('Observer Terminado')
      );

    // this.retornaObservableIntervalo().subscribe((valor) => console.log(valor));
    /* Cuando el argumento recibido, es enviado directamente a otra función se puede aplicar lo siguiente */
    this.intervalSubs = this.retornaObservableIntervalo().subscribe(
      console.log
    );
  }

  /* Al Destruir El Componente, Se Suspende La Suscripción Al Observable */
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaObservableIntervalo(): Observable<string | number> {
    /* const intervalo$ = interval(1000).pipe(
      take(4),
      map((valor) => 'Hola Mundo' + (valor + 1))
    );
    return intervalo$; */

    /* Forma Mas Optima(Como Las Promesas) */
    return interval(1000).pipe(
      take(10),
      filter((valor) => (valor % 2 === 0 ? true : false)),
      /* filter((valor) => true)
      filter((valor) => false) */
      map((valor) => 'Hola Mundo' + (valor + 1))
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return /* const obs$ = */ new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;

        /* Manda el dato al parametro next de la suscripción */
        observer.next(i);

        // tslint:disable-next-line: max-line-length
        /* Solo se ejecuta si existe al menos un suscrito al observable, pero no se manda como argumento next, al suscribe, solo se ejecuta!!! */
        console.log('Tick');

        /* Cancelo Los datos Del Observer */
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        /* Cancelo el Observer, pero con un error, llega al argumento error del suscribe y no sigue con el flujo de ejecución */
        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });

    /* return obs$; */
  }

  ngOnInit(): void {}
}

/* ESTO ES REALMENTE VALIOSO E IMPORTANTE PROMESAS Y OBSERVABLES */
// tslint:disable-next-line: max-line-length
/* EN LAS PROMESAS ASI NO SE INVOQUE EL .THEN() SE VA A EJECUTAR DE TODOS MODOS Y VA A REALIZAR EL CODIGO INTERNO DE DICHA PROMESA, PERO YA CUANDO QUIERO RECUPERAR O MOSTRAR LOS DATOS POR LA PANTALLA O LA CONSOLA QUE RETORNA ESA PROMESA, TENGO QUE EJECUTAR EL .THEN(). */

// tslint:disable-next-line: max-line-length
/* EL MISMO CONCEPTO SE DEBE MANEJAR CON LOS OBSERVABLES, POR QUE ASI NO SE INVOQUE EL .SUBSCRIPTION() EL OBSERVABLE VA A REALIZAR SU PROCESO INTERNO, PERO PARA RECUPERAR O MOSTRAR LOS DATOS POR LA PANTALLA O POR LA CONSOLA DE DICHO OBSERVABLE, TENGO QUE EJECUTAR EL .SUBSCRIPTION(). */
