import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { TvCardComponent } from './tv-series/tv-card/tv-card.component';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [MainPage, MoviesComponent, TvSeriesComponent, TvCardComponent, MovieCardComponent]
})
export class MainPageModule {}
