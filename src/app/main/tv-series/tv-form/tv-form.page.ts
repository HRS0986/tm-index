import { Component, OnInit } from '@angular/core';
import {MovieWatchedStatus, Tabs, TV_SERIES_STATUS_LIST, TvSeriesStatus} from '../../type-definitions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-form',
  templateUrl: './tv-form.page.html',
  styleUrls: ['./tv-form.page.scss'],
})
export class TvFormPage implements OnInit {

  tvSeriesStatusList: Array<string> = TV_SERIES_STATUS_LIST;
  tvForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.tvForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required]],
      seasonCount: ['', [Validators.required]],
      status: [TvSeriesStatus.ended, [Validators.required]],
      watchedStatus: [MovieWatchedStatus.unWatched]
    });
  }

  get errorControl() {
    return this.tvForm.controls;
  }

  onAddClick() {
    this.isSubmitted = true;
    if (!this.tvForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.tvForm.value);
      this.router.navigate(['/app'], { queryParams: { type: Tabs.tv } }).then();
    }
  }

}
