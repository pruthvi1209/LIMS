import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {

  }
  ngOnInit() {
    firebase.initializeApp({
    apiKey: 'AIzaSyAZPXagtAMgBVGotwABaT2e-B70ekyMzmg',
    authDomain: 'lib1209-216918.firebaseapp.com'
  });

  this.authService.autoAuth();
  }

}
