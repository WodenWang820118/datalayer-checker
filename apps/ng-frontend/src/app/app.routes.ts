import { Route } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { InitProjectViewComponent } from './views/init-project-view/init-project-view.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeViewComponent,
  },
  {
    path: 'init-project',
    component: InitProjectViewComponent,
  },
  {
    path: 'projects/:slug',
    loadChildren: () =>
      import('./views/project-view/project-view.module').then(
        (m) => m.ProjectViewModule
      ),
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  // },
  // {
  //   path: 'about',
  //   loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  // },
  // {
  //   path: 'contact',
  //   loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  // }
];