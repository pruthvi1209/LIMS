import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'app/auth/auth.service';
import { BooksFetch } from '../../app/booksFetch.service';
import { UserService } from '../../app/user.service';
import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-adminProfile',
  templateUrl: './adminProfile.component.html',
  styleUrls: ['./adminProfile.component.css']
})
export class AdminProfileComponent implements OnInit {
  booksCount=0;
  userCount=0;
  borrowedCount = 0;
  constructor(private userService: UserService, private booksService : BooksFetch, private authService : AuthService) { }

  ngOnInit() {
    this.authService.autoAuth().then(() =>{
     this.booksService.getAllBooks().subscribe(books => this.booksCount = books.length);
     this.userService.getData().subscribe( userData => {
       this.userCount = userData.length
        userData.forEach(user => {
          if(user.borrowedBooks)
          this.borrowedCount += user.borrowedBooks.length;
        });
      });
    });
  }

}
