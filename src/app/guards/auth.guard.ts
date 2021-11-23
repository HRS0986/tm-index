import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserManagementService } from '../services/user-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userManagementService: UserManagementService, private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = this.userManagementService.getLoggedInStatus();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/app/login']).then();
      return false;
    }
  }

}
