import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
    apiKey: 'AIzaSyAZPXagtAMgBVGotwABaT2e-B70ekyMzmg',
    authDomain: 'lib1209-216918.firebaseapp.com'
  });
  }

}
