import { Component, OnInit } from '@angular/core';
import { Tabs, Modes, MOVIE_COLOR, TV_COLOR } from './type-definitions';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  tab = Tabs.movies;
  modes = Modes;
  color: string;
  isAdmin: boolean;
  cancelledUserAdd: boolean;

  constructor(
    private toastController: ToastController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit() {
    this.isAdmin = this.userManagementService.getUser().isAdmin;
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
    if (this.isAdmin) {
      this.presentAlertPrompt().then();
    }
  }

  async presentToast(msgType: string) {
    const messageText = msgType === Tabs.movies ? 'Movie Saved Successfully' : 'Tv Series Saved Successfully';
    const toast = await this.toastController.create({
      message: messageText,
      duration: 2000
    });
    await toast.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add New user',
      inputs: [
        {
          id: 'user_code',
          name: 'userCode',
          type: 'text',
          placeholder: 'Enter user code',
          attributes: {
            required: true,
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cancelledUserAdd = true;
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.cancelledUserAdd = false;
          }
        }
      ]
    });

    await alert.present();
    const { data } = await alert.onDidDismiss();
    if (data.values.userCode !== '') {
      this.userManagementService.addUser(data.values.userCode);
      const toast = await this.toastController.create({
        message: 'User added successfully',
        duration: 2000,
      });
      await toast.present();
    }else{
      if (!this.cancelledUserAdd) {
        const toast = await this.toastController.create({
          message: 'User code cannot be empty. Failed to add user.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    }
  }

}
