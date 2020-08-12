import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /* Menú Dinamico */
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Principal',
          url: '/',
        },
        {
          titulo: 'ProgressBar',
          url: 'progress',
        },
        {
          titulo: 'Promesas',
          url: 'promesas',
        },
        {
          titulo: 'RxJS',
          url: 'rxjs',
        },
        {
          titulo: 'Gráficas',
          url: 'grafica1',
        },
      ],
    },

    {
      titulo: 'Administracion',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios',
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales',
        },
        {
          titulo: 'Doctores',
          url: 'doctores',
        },
      ],
    },
  ];

  constructor() {}
}
