import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(  private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp( form: NgForm) {
    const email = form.value.email;
    const password = form.value. password;
    this.authService.signup( email, password).then(() => {
        console.log('Success!!!!!!!!');
    }).catch(
      error => {
        console.log(error.message);
      });
  }
}
