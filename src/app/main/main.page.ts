import { Component, OnInit } from '@angular/core';
import { Tabs } from './type-definitions';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  tab = Tabs.movies;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.tab = ev.detail.value;
    console.log(this.tab);
  }

  onMenuIconClick(){
    alert('Menu Icon Clicked');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
