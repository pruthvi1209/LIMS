import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css']
})
export class UserProfileComponent implements OnInit {
  dp = 'assets/default_user_image.png';
  constructor( private userService: UserService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    console.log(this.authService.currentUser.email);
    this.dp = this.authService.currentUser.photoURL;
  }

  logout() {
    this.authService.logout().then( () => this.router.navigate(['']));
  }
}
