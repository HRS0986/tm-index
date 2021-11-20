import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieWatchedStatus } from '../../type-definitions';



@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.page.html',
  styleUrls: ['./movie-form.page.scss'],
})
export class MovieFormPage implements OnInit {

  movieForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required]],
      watchedStatus: [MovieWatchedStatus.watched]
    });
  }

  get errorControl() {
    return this.movieForm.controls;
  }

  onAddClick() {
    this.isSubmitted = true;
    if (!this.movieForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.movieForm.value);
    }
  }
}
