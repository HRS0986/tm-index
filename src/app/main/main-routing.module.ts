import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'movie-form',
    loadChildren: () => import('./movies/movie-form/movie-form.module').then( m => m.MovieFormPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tv-form',
    loadChildren: () => import('./tv-series/tv-form/tv-form.module').then( m => m.TvFormPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
