import { Component, OnInit } from '@angular/core';
import {TvSeries, TvSeriesStatus, TvSeriesWatchedStatus} from '../type-definitions';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss'],
})
export class TvSeriesComponent implements OnInit {

  tvShows: Array<TvSeries> = [
    {
      id: 1,
      title: 'Breaking Bad',
      year: 2008,
      status: TvSeriesStatus.ended,
      watchedStatus: TvSeriesWatchedStatus.watched,
      seasonCount: 5,
    },
    {
      id: 2,
      title: 'Game of Thrones',
      year: 2011,
      status: TvSeriesStatus.returning,
      watchedStatus: TvSeriesWatchedStatus.watching,
      seasonCount: 8,
    },
    {
      id: 3,
      title: 'The Walking Dead',
      year: 2010,
      status: TvSeriesStatus.miniSeries,
      watchedStatus: TvSeriesWatchedStatus.unWatched,
      seasonCount: 5,
    },
    {
      id: 4,
      title: 'The Big Bang Theory',
      year: 2007,
      status: TvSeriesStatus.canceled,
      watchedStatus: TvSeriesWatchedStatus.watched,
      seasonCount: 7,
    }
  ];

  constructor() { }

  ngOnInit() {}

}
