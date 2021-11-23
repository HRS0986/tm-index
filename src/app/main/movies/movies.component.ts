import { Component, OnInit } from '@angular/core';
import { Movie, MOVIE_COLOR } from '../type-definitions';
import { DatabaseService } from '../../services/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie>;
  color = MOVIE_COLOR;
  loading = false;

  constructor(private databaseService: DatabaseService, private toastController: ToastController) { }

  ngOnInit() {
    this.loading = true;
    this.databaseService.getAllMovies().snapshotChanges().subscribe(response => {
      this.movies = new Array<Movie>();
      response.forEach(movie => {
        const movieObject = movie.payload.toJSON();
        movieObject['id'] = movie.key;
        this.movies.push(movieObject as Movie);
      });
      this.loading = false;
      if (this.movies.length === 0) {
        this.presentToast().then();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No movies in your database',
      duration: 3000,
    });
    await toast.present();
  }

}
