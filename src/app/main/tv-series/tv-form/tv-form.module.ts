import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvFormPageRoutingModule } from './tv-form-routing.module';

import { TvFormPage } from './tv-form.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TvFormPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [TvFormPage]
})
export class TvFormPageModule {}
