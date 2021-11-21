import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import {Movie, TvSeries} from '../main/type-definitions';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  moviesList: AngularFireList<Movie>;
  tvSeriesList: AngularFireList<TvSeries>;
  movie: AngularFireObject<Movie>;
  tvSeries: AngularFireObject<TvSeries>;

  constructor(private fireDatabase: AngularFireDatabase) { }

  getAllMovies() {
    this.moviesList = this.fireDatabase.list<Movie>('/movies') as AngularFireList<Movie>;
    return this.moviesList;
  }

  getAllTvSeries() {
    return this.fireDatabase.list('/tvSeries');
  }

  createMovie(movie: Movie) {
    return this.fireDatabase.list('/movies').push(movie);
  }

  createTvSeries(tvSeries: TvSeries) {
    return this.fireDatabase.list('/tvSeries').push(tvSeries);
  }

  updateMovie(movie: Movie) {
    return this.fireDatabase.object('/movies/' + movie.id).update(movie);
  }

  updateTvSeries(tvSeries: TvSeries) {
    return this.fireDatabase.object('/tvSeries/' + tvSeries.id).update(tvSeries);
  }

  removeMovie(movie: Movie) {
    return this.fireDatabase.object('/movies/' + movie.id).remove();
  }

  removeTvSeries(tvSeries: TvSeries) {
    return this.fireDatabase.object('/tvSeries/' + tvSeries.id).remove();
  }

}
