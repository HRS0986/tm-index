import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvFormPage } from './tv-form.page';

const routes: Routes = [
  {
    path: '',
    component: TvFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvFormPageRoutingModule {}
