import { Component, OnInit } from '@angular/core';
import {Movie, MovieWatchedStatus} from '../type-definitions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  movies: Array<Movie> = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      year: 1994,
      watchedStatus: MovieWatchedStatus.unWatched
    },
    {
      id: 2,
      title: 'The Godfather',
      year: 1972,
      watchedStatus: MovieWatchedStatus.watched
    },
    {
      id: 3,
      title: 'The Godfather: Part II',
      year: 1974,
      watchedStatus: MovieWatchedStatus.unWatched
    },
    {
      id: 4,
      title: 'The Dark Knight',
      year: 2008,
      watchedStatus: MovieWatchedStatus.watched
    },
  ];

  constructor() { }

  ngOnInit() {}

}
