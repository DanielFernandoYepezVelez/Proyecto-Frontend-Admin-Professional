import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  /* Aqui Estamos Implementando Codigo PURO de JS,
  incluso el fetch() para hacer las peticiones, pero
  el http tambien se puede hacer, el objetivo
  es ver como se puede hacer con distintos
  metodos y formas */
  constructor() {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  async updatePhoto(
    file: File,
    tipo: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData: FormData = new FormData();
      formData.append('imagen', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      });

      /* Obtener Respuesta JSON() */
      const data = await resp.json();
      // console.log(data);

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
