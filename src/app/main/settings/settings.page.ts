import { Component, OnInit } from '@angular/core';
import { SETTINGS_COLOR, ERROR_COLOR } from '../type-definitions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService} from '../../services/user-management.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  color = SETTINGS_COLOR;
  errorColor = ERROR_COLOR;
  userForm: FormGroup;
  isSubmitted = false;
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.isAdmin = this.userManagementService.getUser().isAdmin;
    this.userForm = this.formBuilder.group({
      userCode : ['', Validators.required],
    });
  }

  get errorControl() {
    return this.userForm.controls;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userManagementService.addUser(this.userForm.getRawValue().userCode);
      const toast = await this.toastController.create({
        message: 'User added successfully',
        duration: 2000,
      });
      await toast.present();
      this.isSubmitted = false;
      this.userForm.controls.userCode.setValue('');
    }
  }

}
