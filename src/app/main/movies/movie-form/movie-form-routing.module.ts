import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieFormPage } from './movie-form.page';

const routes: Routes = [
  {
    path: '',
    component: MovieFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieFormPageRoutingModule {}
