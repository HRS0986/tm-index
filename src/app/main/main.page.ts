import { Component, OnInit } from '@angular/core';
import { Tabs, Modes, MOVIE_COLOR, TV_COLOR } from './type-definitions';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  tab = Tabs.movies;
  modes = Modes;
  color: string;

  constructor(private toastController: ToastController, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.color = this.tab === Tabs.movies ? MOVIE_COLOR : TV_COLOR;
    this.route.queryParams.subscribe(params => {
      if (params.type === Tabs.movies || params.type === Tabs.tv) {
        this.presentToast(params.type).then();
      }
    });
  }

  segmentChanged(ev: any) {
    this.tab = ev.detail.value;
    this.color = this.tab === Tabs.movies ? MOVIE_COLOR : TV_COLOR;
  }

  onMenuIconClick() {
    alert('Menu Icon Clicked');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentToast(msgType: string) {
    const messageText = msgType === Tabs.movies ? 'Movie Saved Successfully' : 'Tv Series Saved Successfully';
    const toast = await this.toastController.create({
      message: messageText,
      duration: 2000
    });
    await toast.present();
  }

}
