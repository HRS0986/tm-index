import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'movie-form',
    loadChildren: () => import('./movies/movie-form/movie-form.module').then( m => m.MovieFormPageModule)
  },
  {
    path: 'tv-form',
    loadChildren: () => import('./tv-series/tv-form/tv-form.module').then( m => m.TvFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
