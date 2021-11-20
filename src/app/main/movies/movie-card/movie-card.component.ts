import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../type-definitions';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;
  constructor(private alertController: AlertController) { }

  async presentAlertDeleteConfirm(movie: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Movie',
      message: `Do you want to delete ${movie}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => false
        }, {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {}

}
