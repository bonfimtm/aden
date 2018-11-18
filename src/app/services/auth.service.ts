import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('Logged in', user);
      } else {
        console.log('Logged out');
      }
    });
  }

  async login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(_ => {
      const redir = this.redirectUrl || 'admin';
      this.redirectUrl = null;
      this.router.navigate([redir]);
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

}
