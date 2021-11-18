export enum Tabs {
  movies = 'MOVIES',
  tv = 'TV'
}

export enum MovieWatchedStatus {
  watched = 'WATCHED',
  unWatched = 'UNWATCHED',
}

export enum TvSeriesWatchedStatus {
  watched = 'WATCHED',
  unWatched = 'UNWATCHED',
  watching = 'WATCHING',
}

export enum TvSeriesStatus {
  ended = 'ENDED',
  returning = 'RETURNING',
  canceled = 'CANCELED',
  miniSeries = 'MINI SERIES',
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  watchedStatus: MovieWatchedStatus;
}

export interface TvSeries {
  id: number;
  title: string;
  year: number;
  seasonCount: number;
  status: TvSeriesStatus;
  watchedStatus: TvSeriesWatchedStatus;
}
