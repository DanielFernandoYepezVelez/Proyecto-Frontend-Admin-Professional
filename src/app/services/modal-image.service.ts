import { Injectable, EventEmitter } from '@angular/core';

import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private ocultarModal = true;
  public id: string;
  public img: string;
  public tipo: 'users' | 'doctors' | 'hospitals';

  /* Esto Es Un Observable Y Me Puedo Suscribir A El
  Desde Cualquier Lugar Del Programa */
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hiddenModal() {
    return this.ocultarModal;
  }

  showModal(
    tipo: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-img-found'
  ) {
    this.id = id;
    this.tipo = tipo;

    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }

    this.ocultarModal = false;
  }

  closeModal() {
    this.ocultarModal = true;
  }
}
