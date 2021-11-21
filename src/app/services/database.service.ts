import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import {Movie, TvSeries} from '../main/type-definitions';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private moviesList: AngularFireList<Movie>;
  private tvSeriesList: AngularFireList<TvSeries>;
  private movie: AngularFireObject<Movie>;
  private tvSeries: AngularFireObject<TvSeries>;

  constructor(private fireDatabase: AngularFireDatabase) { }

  public getMovieById(id: string){
    this.movie = this.fireDatabase.object<Movie>(`/movies/${id}`) as AngularFireObject<Movie>;
    return this.movie;
  }

  public getTvSeriesById(id: string){
    this.tvSeries = this.fireDatabase.object<TvSeries>(`/tvSeries/${id}`) as AngularFireObject<TvSeries>;
    return this.tvSeries;
  }

  public getAllMovies() {
    this.moviesList = this.fireDatabase.list<Movie>('/movies') as AngularFireList<Movie>;
    return this.moviesList;
  }

  public getAllTvSeries() {
    this.tvSeriesList = this.fireDatabase.list('/tvSeries') as AngularFireList<TvSeries>;
    return this.tvSeriesList;
  }

  public createMovie(movie: Movie) {
    return this.fireDatabase.list('/movies').push(movie);
  }

  public createTvSeries(tvSeries: TvSeries) {
    return this.fireDatabase.list('/tvSeries').push(tvSeries);
  }

  public updateMovie(movie: Movie) {
    return this.moviesList.update(movie.id, {
      title: movie.title,
      year: movie.year,
      watchedStatus: movie.watchedStatus,
    });
  }

  public updateTvSeries(tvSeries: TvSeries) {
    return this.tvSeriesList.update(tvSeries.id, tvSeries);
  }

  public removeMovie(id: string) {
    return this.moviesList.remove(id);
  }

  public removeTvSeries(id: string) {
    return this.tvSeriesList.remove(id);
  }

}
