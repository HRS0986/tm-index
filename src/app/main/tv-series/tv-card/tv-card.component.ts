import { Component, OnInit, Input } from '@angular/core';
import { TvSeries } from '../../type-definitions';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TvCardComponent implements OnInit {

  @Input() tvShow: TvSeries;
  constructor() { }

  ngOnInit() {}

}
