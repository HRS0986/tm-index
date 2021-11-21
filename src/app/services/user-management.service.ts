import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private user: { code: string; isAdmin: boolean };
  private isLoggedIn = false;

  constructor(private fireDatabase: AngularFireDatabase) { }

  public getUser(): { code: string; isAdmin: boolean } {
    return this.user;
  }

  public getLoggedInStatus(): boolean {
    return this.isLoggedIn;
  }

  public addUser(userCode: string) {
    this.fireDatabase.list('/users').push({
      code: userCode,
      isAdmin: false
    });
  }

  // @ts-ignore
  public login(password: string): Promise<boolean> {
    const userRef = this.fireDatabase.database.ref('/users');
    return new Promise(resolve => {
      userRef.orderByChild('code').equalTo(password).once('value', snapshot => {
        if(snapshot.val()){
          this.user = snapshot.val()[Object.keys(snapshot.val())[0]];
          this.isLoggedIn = true;
        }else{
          this.user = null;
          this.isLoggedIn = false;
        }
        resolve(this.isLoggedIn);
      });
    });
  }
}
