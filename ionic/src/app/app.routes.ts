import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/principal',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full',
      },
      {
        path: 'principal',
        loadComponent: () => import('./pages/principal/principal.page').then(m => m.PrincipalPage)
      },
      {
        path: 'categorias',
        loadComponent: () => import('./pages/categorias/categorias.page').then(m => m.CategoriasPage)
      },
      {
        path: 'categorias/:categoria',
        loadComponent: () => import('./pages/categorias/categorias.page').then(m => m.CategoriasPage)
      },
      {
        path: 'buscador',
        loadComponent: () => import('./pages/buscador/buscador.page').then(m => m.BuscadorPage)
      },
      {
        path: 'detalles/:id',
        loadComponent: () => import('./pages/detalles/detalles.page').then(m => m.DetallesPage)
      }
    ]
  }
];
