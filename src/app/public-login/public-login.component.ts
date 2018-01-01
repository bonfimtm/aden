import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-public-login',
  templateUrl: './public-login.component.html',
  styleUrls: ['./public-login.component.css']
})
export class PublicLoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router, private alert: AlertService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('form', form);
    this.auth.login(this.email, this.password)
      .then(_ => {
        console.log('signed in');
        this.router.navigate(['admin/posts']);
      })
      .catch(error => {
        console.log('error signing in', error);
        this.alert.error(error.message + '😕');
      });
  }

}
