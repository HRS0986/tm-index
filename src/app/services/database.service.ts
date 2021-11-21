import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Movie, TvSeries } from '../main/type-definitions';
import { UserManagementService } from './user-management.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private moviesList: AngularFireList<Movie>;
  private tvSeriesList: AngularFireList<TvSeries>;
  private movie: AngularFireObject<Movie>;
  private tvSeries: AngularFireObject<TvSeries>;
  private userCode: string;

  constructor(
    private fireDatabase: AngularFireDatabase,
    private userManagementService: UserManagementService
  ) { }

  public getMovieById(id: string){
    this.setUserCode();
    this.movie = this.fireDatabase.object<Movie>(`/${this.userCode}/movies/${id}`) as AngularFireObject<Movie>;
    return this.movie;
  }

  public getTvSeriesById(id: string){
    this.setUserCode();
    this.tvSeries = this.fireDatabase.object<TvSeries>(`/${this.userCode}/tvSeries/${id}`) as AngularFireObject<TvSeries>;
    return this.tvSeries;
  }

  public getAllMovies() {
    this.setUserCode();
    this.moviesList = this.fireDatabase.list<Movie>(`/${this.userCode}/movies`) as AngularFireList<Movie>;
    return this.moviesList;
  }

  public getAllTvSeries() {
    this.setUserCode();
    this.tvSeriesList = this.fireDatabase.list(`/${this.userCode}/tvSeries`) as AngularFireList<TvSeries>;
    return this.tvSeriesList;
  }

  public createMovie(movie: Movie) {
    this.setUserCode();
    return this.fireDatabase.list(`/${this.userCode}/movies`).push(movie);
  }

  public createTvSeries(tvSeries: TvSeries) {
    this.setUserCode();
    return this.fireDatabase.list(`/${this.userCode}/tvSeries`).push(tvSeries);
  }

  public updateMovie(movie: Movie) {
    this.setUserCode();
    return this.moviesList.update(movie.id, {
      title: movie.title,
      year: movie.year,
      watchedStatus: movie.watchedStatus,
    });
  }

  public updateTvSeries(tvSeries: TvSeries) {
    this.setUserCode();
    return this.tvSeriesList.update(tvSeries.id, tvSeries);
  }

  public removeMovie(id: string) {
    this.setUserCode();
    return this.moviesList.remove(id);
  }

  public removeTvSeries(id: string) {
    this.setUserCode();
    return this.tvSeriesList.remove(id);
  }

  private setUserCode() {
    if (!this.userCode) {
      this.userCode = this.userManagementService.getUser().code;
      console.log(this.userCode);
    }
  }
}
