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
    const currentPage = route.url[0].path;
    if(this.apiService.isloggedIn()){
      if(this.apiService.isTokenExpired()){
        localStorage.removeItem('JWT_TOKEN');
        this.router.navigate(['/login']); 
        return false;
      }else{
        this.router.navigate([currentPage]); 
        return false; 
      } 
    }else{
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
