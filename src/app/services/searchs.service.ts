import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { User } from '../auth/models/user.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  private transformarUsers(results: any[]): User[] {    
    return results.map(
      (user: User) =>
        new User(
          user.name,
          user.email,
          '',
          user.id,
          user.img,
          user.role,
          user.google,
          user.activate,
          new Date()
        )
    );
  }

  search(tipo: 'users' | 'doctors' | 'hospitals', termino: string) {
    const url = `${base_url}/specific/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((res: any) => {        
        switch (tipo) {
          case 'users':
            return this.transformarUsers(res.data);

          default:
            return [];
        }
      })
    );
  }
}

/* http://localhost:3000/api/specific/hospitals/c */
/* http://localhost:3000/api/todo/t */
