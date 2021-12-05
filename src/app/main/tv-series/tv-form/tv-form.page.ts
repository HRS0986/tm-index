import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Tabs,
  TV_SERIES_STATUS_LIST,
  TvSeriesStatus,
  Modes,
  TV_COLOR,
  ERROR_COLOR,
  TvSeries,
  TvSeriesWatchedStatus
} from '../../type-definitions';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-tv-form',
  templateUrl: './tv-form.page.html',
  styleUrls: ['./tv-form.page.scss'],
})
export class TvFormPage implements OnInit {

  tvSeriesStatusList: Array<string> = TV_SERIES_STATUS_LIST;
  tvForm: FormGroup;
  isSubmitted = false;
  mode: string;
  modes = Modes;
  color = TV_COLOR;
  errorColor = ERROR_COLOR;
  tvSeriesId: string;
  tvSeries: TvSeries;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params.mode;
      this.tvSeriesId = params.id;
    });

    this.tvForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required]],
      seasonCount: ['', [Validators.required]],
      seasonsHDD: ['', [Validators.required]],
      status: [TvSeriesStatus.ended, [Validators.required]],
      watchedStatus: [TvSeriesWatchedStatus.unwatched]
    });

    this.databaseService.getTvSeriesById(this.tvSeriesId).snapshotChanges().subscribe(response => {
        if (response.payload.exists()){
          this.tvSeries = response.payload.toJSON() as TvSeries;
          this.tvSeries.id = response.key;
          this.tvForm.controls.title.setValue(this.tvSeries.title);
          this.tvForm.controls.year.setValue(this.tvSeries.year);
          this.tvForm.controls.watchedStatus.setValue(this.tvSeries.watchedStatus);
          this.tvForm.controls.seasonCount.setValue(this.tvSeries.seasonCount);
          this.tvForm.controls.seasonsHDD.setValue(this.tvSeries.seasonsHDD);
          this.tvForm.controls.status.setValue(this.tvSeries.status);
        }
      }
    );
  }

  get errorControl() {
    return this.tvForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.tvForm.valid) {
      return false;
    } else {
      const tvSeries: TvSeries = {
        title: this.tvForm.value.title,
        year: this.tvForm.value.year,
        watchedStatus: this.tvForm.value.watchedStatus,
        seasonCount: this.tvForm.value.seasonCount,
        seasonsHDD: this.tvForm.value.seasonsHDD,
        status: this.tvForm.value.status
      };
      if (this.mode === Modes.edit) {
        tvSeries.id = this.tvSeriesId;
        this.databaseService.updateTvSeries(tvSeries).then(() => {
            this.router.navigate(['/app'], {queryParams: {type: Tabs.tv}}).then();
          }
        );
      } else {
        this.databaseService.createTvSeries(tvSeries).then(() => {
          this.router.navigate(['/app'], {queryParams: {type: Tabs.tv}}).then();
        });
      }
    }
  }

}
