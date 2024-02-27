import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'consumoapi',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'consumoapi',
    loadComponent: () => import('./consumoapi/consumoapi.page').then( m => m.ConsumoapiPage)
  },
];
