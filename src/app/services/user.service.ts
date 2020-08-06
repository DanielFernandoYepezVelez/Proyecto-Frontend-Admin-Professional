import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

/* Interfaces */
import { ILogin } from '../interfaces/login.interface';
import { IRegister } from '../interfaces/register.interface';

/* Clase Modelo(Tipo Interface) */
import { User } from '../auth/models/user.model';

/* Ambiente */
const base_url = environment.base_url;
import { environment } from '../../environments/environment';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get idUser(): string {
    return this.user.id || '';
  }

  createUser(formData: IRegister) {
    /* Cambiar La Mutabilidad Del Objeto */
    const newDataNeed: IRegister = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
    };

    return this.http.post(`${base_url}/newUser`, newDataNeed);
  }

  updateProfile(formData: { name: string; email: string; role: string }) {
    formData = {
      ...formData,
      role: this.user.role,
    };

    return this.http.put(`${base_url}/updateUser/${this.idUser}`, formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  loginUser(formData: ILogin) {
    /* Cambiar La Mutabilidad Del Objeto */
    const newDataNeed: ILogin = {
      email: formData.email,
      password: formData.password,
    };

    return this.http.post(`${base_url}/login`, newDataNeed).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginUserGoogle(token) {
    return this.http
      .post(`${base_url}/login/loginGoogle`, { google_token: token })
      .pipe(
        tap((res: any) => {
          // console.log(res);
          localStorage.setItem('token', res.token);
        })
      );
  }

  /* Aqui Lo Validamos Y Lo Renovamos */
  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renewToken`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        map((res: any) => {
          if (res.ok === true) {
            const {
              id,
              name,
              email,
              img = '',
              google,
              role,
              activate,
              created_at,
            } = res.user[0];

            this.user = new User(
              name,
              email,
              '',
              id,
              img,
              role,
              google,
              activate,
              created_at
            );
            localStorage.setItem('token', res.token);
          }

          return true;
        }),
        catchError((error) => of(false))
      );
  }

  /* ESTO ES REALMENTE VALIOSO E IMPORTANTE PROMESAS Y OBSERVABLES */
  // tslint:disable-next-line: max-line-length
  /* EN LAS PROMESAS ASI NO SE INVOQUE EL .THEN() SE VA A EJECUTAR DE TODOS MODOS Y VA A REALIZAR EL CODIGO INTERNO DE DICHA PROMESA, PERO YA CUANDO QUIERO RECUPERAR O MOSTRAR LOS DATOS POR LA PANTALLA O LA CONSOLA QUE RETORNA ESA PROMESA, TENGO QUE EJECUTAR EL .THEN(). */

  // tslint:disable-next-line: max-line-length
  /* EL MISMO CONCEPTO SE DEBE MANEJAR CON LOS OBSERVABLES, POR QUE ASI NO SE INVOQUE EL .SUBSCRIPTION() EL OBSERVABLE VA A REALIZAR SU PROCESO INTERNO, PERO PARA RECUPERAR O MOSTRAR LOS DATOS POR LA PANTALLA O POR LA CONSOLA DE DICHO OBSERVABLE, TENGO QUE EJECUTAR EL .SUBSCRIPTION(). */

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '24949782543-qggl9q7i27ohmb15sb0p33v1435fjbgg.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  // tslint:disable-next-line: max-line-length
  /* Cuando Liberias De Terceros O Que Estan Por Fuera De Angular Se Encargan De Disparar La Navegación En La Aplicación Se Tiene Que Utilizar El NgZone() (attachClickHandler => libreriaDeTerceros(google)) */
  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
