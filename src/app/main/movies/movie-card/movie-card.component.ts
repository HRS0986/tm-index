import { Component, OnInit, Input } from '@angular/core';
import { Movie, Modes } from '../../type-definitions';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie;
  modes = Modes;
  constructor(private alertController: AlertController, private databaseService: DatabaseService) { }

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
            this.databaseService.removeMovie(this.movie.id);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {}

}
