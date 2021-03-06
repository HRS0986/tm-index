import { Component, OnInit } from '@angular/core';
import { TV_COLOR, TvSeries } from '../type-definitions';
import { DatabaseService } from '../../services/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss'],
})
export class TvSeriesComponent implements OnInit {

  tvShows: Array<TvSeries>;
  allTvShows: Array<TvSeries> = new Array<TvSeries>();
  color = TV_COLOR;
  loading = false;

  constructor(private databaseService: DatabaseService, private toastController: ToastController) { }

  ngOnInit() {
    this.loading = true;
    this.databaseService.getAllTvSeries().snapshotChanges().subscribe(response => {
      this.tvShows = new Array<TvSeries>();
      response.forEach(tvSeries => {
        const tvSeriesObject = tvSeries.payload.toJSON();
        tvSeriesObject['id'] = tvSeries.key;
        this.tvShows.push(tvSeriesObject as TvSeries);
      });
      this.tvShows.sort((a, b) => a.title.localeCompare(b.title));
      this.loading = false;
      if (this.tvShows.length === 0) {
        this.presentToast().then();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No tv series in your database',
      duration: 3000,
    });
    await toast.present();
  }

  onSearch(keyword: string) {
    if (this.allTvShows.length === 0) {
      this.allTvShows = this.tvShows;
    }
    this.tvShows = this.allTvShows.filter(tvShow => tvShow.title.toLowerCase().includes(keyword.toLowerCase()));
  }

}
