import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/* Interfaces */
import { IRegister } from '../interfaces/register.interface';
import { ILogin } from '../interfaces/login.interface';

/* Ambiente */
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
        localStorage.setItem('token', JSON.stringify(res.tokenUser));
      })
    );
  }
}
