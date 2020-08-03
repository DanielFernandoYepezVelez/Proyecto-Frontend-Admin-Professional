import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

/* Interfaces */
import { ILogin } from '../interfaces/login.interface';
import { IRegister } from '../interfaces/register.interface';

/* Ambiente */
const base_url = environment.base_url;
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  createUser(formData: IRegister) {
    /* Cambiar La Mutabilidad Del Objeto */
    const newDataNeed: IRegister = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
    };

    return this.http.post(`${base_url}/newUser`, newDataNeed);
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
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renewToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((res: any) => {
          if (res.ok === true) {
            localStorage.setItem('token', res.token);
          }
        }),
        map((res: any) => {
          // console.log(res);
          return res.ok;
        }),
        catchError((error) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
