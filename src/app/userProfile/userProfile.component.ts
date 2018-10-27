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
  constructor( private userService: UserService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    setTimeout(() => {
      this.userService.getUserData().then((user) => {
        console.log(user);
      });
    }, 1000);
  }

  logout() {
    this.authService.logout().then( () => this.router.navigate(['']));
  }
}
