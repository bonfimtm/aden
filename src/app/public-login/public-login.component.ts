import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-public-login',
  templateUrl: './public-login.component.html',
  styleUrls: ['./public-login.component.css']
})
export class PublicLoginComponent implements OnInit {

  email: string;
  password: string;
  buttonSignInIsLoading = false;

  constructor(private auth: AuthService, private router: Router, private toaster: ToasterService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    this.buttonSignInIsLoading = true;
    console.log('User sign in:', this.email);

    this.auth.login(this.email, this.password)

      .then(_ => {
        this.email = null;
        this.password = null;
        this.buttonSignInIsLoading = false;
        console.log('Logged in');
      })

      .catch(error => {
        this.buttonSignInIsLoading = false;
        console.log('Error when logging in', error);
        this.toaster.error('Wrong email address or password 🤔');
      });
  }

}
