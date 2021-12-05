export enum Tabs {
  movies = 'MOVIES',
  tv = 'TV',
  settings = 'SETTINGS'
}

export enum Modes {
  edit = 'EDIT',
  create = 'CREATE'
}

export enum MovieWatchedStatus {
  watched = 'WATCHED',
  unWatched = 'UNWATCHED',
}

export enum TvSeriesWatchedStatus {
  watched = 'WATCHED',
  unwatched = 'UNWATCHED',
  watching = 'WATCHING',
}

export const TV_SERIES_STATUS_LIST = ['ENDED', 'RETURNING', 'CANCELED', 'MINI SERIES'];

export enum TvSeriesStatus {
  ended = 'ENDED',
  returning = 'RETURNING',
  canceled = 'CANCELED',
  miniSeries = 'MINI SERIES',
}

export interface Movie {
  id?: string;
  title: string;
  year: number;
  watchedStatus: MovieWatchedStatus;
}

export interface TvSeries {
  id?: string;
  title: string;
  year: number;
  seasonCount: number;
  status: TvSeriesStatus;
  watchedStatus: TvSeriesWatchedStatus;
}

export const MOVIE_COLOR = 'primary';
export const TV_COLOR = 'tertiary';
export const SETTINGS_COLOR = 'medium';
export const ERROR_COLOR = '#eb445a';
