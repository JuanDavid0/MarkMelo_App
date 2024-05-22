import { Routes } from '@angular/router';
import { AuthLoginGuard } from './guards/auth-login.guard';
import { AuthAccessGuard } from './guards/auth-access.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'singup',
    loadComponent: () =>
      import('./pages/login/singup/singup.page').then((m) => m.SingupPage),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/login/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage
      ),
  },
  {
    path: 'produccion',
    loadComponent: () =>
      import('./pages/allUsers/produccion/produccion.page').then(
        (m) => m.ProduccionPage
      ),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'montaje-digital',
    loadComponent: () =>
      import('./pages/allUsers/montaje-digital/montaje-digital.page').then(
        (m) => m.MontajeDigitalPage
      ),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'marcacion',
    loadComponent: () =>
      import('./pages/allUsers/marcacion/marcacion.page').then(
        (m) => m.MarcacionPage
      ),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'empaque',
    loadComponent: () =>
      import('./pages/allUsers/empaque/empaque.page').then(
        (m) => m.EmpaquePage
      ),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'entrega',
    loadComponent: () =>
      import('./pages/allUsers/entrega/entrega.page').then(
        (m) => m.EntregaPage
      ),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/allUsers/admin/admin.page').then((m) => m.AdminPage),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./pages/allUsers/user/user.page').then((m) => m.UserPage),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'vista-productos',
    loadComponent: () =>
      import('./pages/allUsers/user/vista-productos/vista-productos.page').then(
        (m) => m.VistaProductosPage
      ),
  },  {
    path: 'editar-perfil',
    loadComponent: () => import('./pages/allUsers/user/editar-perfil/editar-perfil.page').then( m => m.EditarPerfilPage)
  },

];
