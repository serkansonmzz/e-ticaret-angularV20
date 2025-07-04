import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login'),
  },
  {
    path: '',
    loadComponent: () => import('./pages/layouts/layouts'),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products'),
      },
    ],
  },
]; // Yani, /products gibi bir yol açıldığında önce layout yüklenir, sonra onun içinde products bileşeni gösterilir. Bu, ortak bir layout altında farklı içeriklerin gösterilmesini sağlar.
