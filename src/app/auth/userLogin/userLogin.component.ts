import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor( private userService: UserService, private router: Router,  public dialog: MatDialog) { }
  currentUser;
  ngOnInit() {
  }
  onSubmit(formData) {
    this.userService.getAuthorization(formData.value.email).then((value) => {
      console.log(value.password);
      if (value.password === formData.value.password) {
        this.dialog.closeAll();
        this.userService.activeUser = value;
        this.router.navigate(['userProfile']);
      } else {
        console.log('Un Authorized Attempt');
      }
    }).catch(() => {
      console.log('No User Found');
    });
  }

}
