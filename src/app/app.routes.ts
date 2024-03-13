import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },  {
    path: 'singup',
    loadComponent: () => import('./pages/login/singup/singup.page').then( m => m.SingupPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/login/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'prove',
    loadComponent: () => import('./pages/prove/prove.page').then( m => m.ProvePage)
  },

];
