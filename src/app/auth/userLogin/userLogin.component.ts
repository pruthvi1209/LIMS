import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor( private userService: UserService, private router: Router,  public dialog: MatDialog, private authService: AuthService) { }
  currentUser;
  ngOnInit() {
  }
  onSubmit(formData) {
    this.authService.signIn(formData.value.email, formData.value.password, this.dialog);
  }
  socailLogin(service) {
    this.authService.social(service, this.dialog);
  }
}
