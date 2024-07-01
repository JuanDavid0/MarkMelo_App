import { VistaProductosComponent } from './pages/home/vista-productos/vista-productos.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthAccessGuard } from './guards/auth-access.guard';
import { AuthLoginGuard } from './guards/auth-login.guard';

// para cada pagina se debe asignar un guard para proterger el acceso a la misma
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
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
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.page').then((m) => m.AdminPage),
    canActivate: [AuthAccessGuard],
  },
  {
    path: 'editar-perfil',
    loadComponent: () =>
      import('./pages/home/editar-perfil/editar-perfil.page').then(
        (m) => m.EditarPerfilPage
      ),
  },
  {
    path: 'politicas-web',
    loadComponent: () =>
      import('./pages/website-policies/website-policies.component').then(
        (m) => m.WebsitePoliciesComponent
      ),
  },
  {
    path: 'politicas-privacidad',
    loadComponent: () =>
      import(
        './pages/website-policies/privacy-polices/privacy-polices.component'
      ).then((m) => m.PrivacyPolicesComponent),
  },
  {
    path: 'terminos-condiciones',
    loadComponent: () =>
      import(
        './pages/website-policies/terms-conditions/terms-conditions.component'
      ).then((m) => m.TermsConditionsComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'categories/:id?',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage)
  },
  {
    path: 'vista-productos',
    loadComponent: () =>
      import('./pages/home/vista-productos/vista-productos.component').then(
        (m) => m.VistaProductosComponent
      ),
  },
  {
    path: 'header',
    loadComponent: () =>
      import('./pages/header/header.component').then(
        (m) => m.HeaderComponent
      ),
  },  {
    path: 'shopping-cart',
    loadComponent: () => import('./pages/shopping-cart/shopping-cart.page').then( m => m.ShoppingCartPage)
  },

];
