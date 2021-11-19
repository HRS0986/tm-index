import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieFormPageRoutingModule } from './movie-form-routing.module';

import { MovieFormPage } from './movie-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieFormPageRoutingModule
  ],
  declarations: [MovieFormPage]
})
export class MovieFormPageModule {}
