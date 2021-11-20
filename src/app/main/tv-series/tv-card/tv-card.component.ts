import { Component, OnInit, Input } from '@angular/core';
import { TvSeries, Modes } from '../../type-definitions';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TvCardComponent implements OnInit {

  @Input() tvShow: TvSeries;
  modes = Modes;
  constructor(private alertController: AlertController) { }

  async presentAlertDeleteConfirm(tvSeries: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Tv Series',
      message: `Do you want to delete ${tvSeries}?`,
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
