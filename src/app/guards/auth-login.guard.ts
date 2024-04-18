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
 * GUARD que restingue el acceso a la ruta de login si el usuario ya esta logueado
 */
@Injectable({
  providedIn: 'root',
})
class LoginGuard {
  constructor(private apiService: ApiRestFulService, private router: Router) {}
  /**
   * Metodo que se encarga de verificar si el usuario esta logueado o no
   * y redirigirlo a la ruta X si ya esta logueado
   * @param route
   * @param state
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const accessAuth = this.apiService.getRol();
    if(this.apiService.isloggedIn()){ // existe un token? si es asi
      if(this.apiService.tokenExpired()){ // el token ha expirado? aun no expira
        this.router.navigate([accessAuth]); // redirige a la ruta X
        return false; // no permite entrar al login porque tiene token y esta vigente
      }else{ // si el token ha expirado
        localStorage.removeItem('JWT_TOKEN'); // elimina el token del localstorage
        this.router.navigate(['/login']); // redirige a la pagina de login
        return false;// no permite entrar al login porque el token ha expirado
      } 
    }else{ // si no existe un token en el localstorage
      return true;
    }
  }
}
export const AuthLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(LoginGuard).canActivate(route, state);
};
