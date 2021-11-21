import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import { UserManagementService } from '../../services/user-management.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  password: string;
  showError = false;

  constructor(
    private alertController: AlertController,
    private userManagementService: UserManagementService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Forgot Password',
      message: 'Forgot password? Don\'t worry. Relax and try to remember the password.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  }

  async onClickLogin() {
    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(response => {
      response.present();
    });
    if (this.password) {
      const result = await this.userManagementService.login(this.password);
      if (result) {
        this.router.navigate(['/app']).then();
      }else{
        this.presentToast().then();
      }
      this.loadingController.dismiss().then();
    }else{
      this.showError = true;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Incorrect Password',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }

}
