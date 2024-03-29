import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiRestFulService } from '../services/api-rest-ful.service';

/**
 * GUARD para conceder acceso a las rutas cuando el usuario esta logueado 
 * o bloquearlas si no lo esta
 */
@Injectable({
  providedIn: 'root',
})
class AccessGuard {
  constructor(private apiService: ApiRestFulService, private router: Router) {}

  /**
   * Metodo que se encarga de verificar si el token ha expirado y si el usuario esta logueado o no
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.apiService.isloggedIn() && this.apiService.tokenExpired()) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
export const AuthAccessGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AccessGuard).canActivate(route, state);
};
