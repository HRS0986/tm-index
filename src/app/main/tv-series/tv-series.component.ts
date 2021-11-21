import { Component, OnInit } from '@angular/core';
import { TV_COLOR, TvSeries } from '../type-definitions';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss'],
})
export class TvSeriesComponent implements OnInit {

  tvShows: Array<TvSeries>;
  color = TV_COLOR;
  loading = false;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.loading = true;
    this.databaseService.getAllTvSeries().snapshotChanges().subscribe(response => {
      this.tvShows = new Array<TvSeries>();
      response.forEach(tvSeries => {
        const tvSeriesObject = tvSeries.payload.toJSON();
        tvSeriesObject['id'] = tvSeries.key;
        this.tvShows.push(tvSeriesObject as TvSeries);
      });
      this.loading = false;
    });
  }

}
