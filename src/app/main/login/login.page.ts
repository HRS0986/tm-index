import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertController: AlertController) { }

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

}
