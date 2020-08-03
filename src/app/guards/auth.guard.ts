import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  /* Aqui Esta Pasando El Guard Por La Ruta, Si Es True Sigue, Si no No Sigue */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /* Se Cumple Sin La Necesidad De Aplicar El Suscription */
    return this.userService.validarToken().pipe(
      tap((isAuthenticate) => {
        if (!isAuthenticate) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
