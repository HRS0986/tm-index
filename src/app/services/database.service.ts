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

  getMovieById(id: string){
    this.movie = this.fireDatabase.object<Movie>(`/movies/${id}`) as AngularFireObject<Movie>;
    return this.movie;
  }

  getTvSeriesById(id: string){
    this.tvSeries = this.fireDatabase.object<TvSeries>(`/tvSeries/${id}`) as AngularFireObject<TvSeries>;
    return this.tvSeries;
  }

  getAllMovies() {
    this.moviesList = this.fireDatabase.list<Movie>('/movies') as AngularFireList<Movie>;
    return this.moviesList;
  }

  getAllTvSeries() {
    this.tvSeriesList = this.fireDatabase.list('/tvSeries') as AngularFireList<TvSeries>;
    return this.tvSeriesList;
  }

  createMovie(movie: Movie) {
    return this.fireDatabase.list('/movies').push(movie);
  }

  createTvSeries(tvSeries: TvSeries) {
    return this.fireDatabase.list('/tvSeries').push(tvSeries);
  }

  updateMovie(movie: Movie) {
    return this.moviesList.update(movie.id, {
      title: movie.title,
      year: movie.year,
      watchedStatus: movie.watchedStatus,
    });
  }

  updateTvSeries(tvSeries: TvSeries) {
    return this.tvSeriesList.update(tvSeries.id, tvSeries);
  }

  removeMovie(id: string) {
    return this.moviesList.remove(id);
  }

  removeTvSeries(id: string) {
    return this.tvSeriesList.remove(id);
  }

}
