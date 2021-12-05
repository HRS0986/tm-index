import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieWatchedStatus, Tabs, Modes, MOVIE_COLOR, Movie, ERROR_COLOR } from '../../type-definitions';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
})
export class MovieFormPage implements OnInit {

  movieForm: FormGroup;
  isSubmitted = false;
  mode: string;
  modes = Modes;
  color = MOVIE_COLOR;
  errorColor = ERROR_COLOR;
  movieId: string;
  movie: Movie;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params.mode;
      this.movieId = params.id;
    });

    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      year: ['', [Validators.required]],
      watchedStatus: [MovieWatchedStatus.watched]
    });

    this.databaseService.getMovieById(this.movieId).snapshotChanges().subscribe(response => {
        if (response.payload.exists()){
          this.movie = response.payload.toJSON() as Movie;
          this.movie.id = response.key;
          this.movieForm.controls.title.setValue(this.movie.title);
          this.movieForm.controls.year.setValue(this.movie.year);
          this.movieForm.controls.watchedStatus.setValue(this.movie.watchedStatus);
        }
      }
    );
  }

  get errorControl() {
    return this.movieForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.movieForm.valid) {
      return false;
    } else {
      const movie: Movie = {
        title: this.movieForm.value.title,
        year: this.movieForm.value.year,
        watchedStatus: this.movieForm.value.watchedStatus
      };
      if (this.mode === Modes.create) {
        this.databaseService.createMovie(movie).then(() => {
          this.router.navigate(['/app'], { queryParams: { type: Tabs.movies } }).then();
        });
      }else{
        movie.id = this.movieId;
        this.databaseService.updateMovie(movie).then(() => {
          this.router.navigate(['/app'], { queryParams: { type: Tabs.movies } }).then();
        });
      }
    }
  }
}
