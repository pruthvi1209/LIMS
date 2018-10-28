import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { BooksFetch } from '../booksFetch.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css']
})
export class UserProfileComponent implements OnInit {
  isLoading = false;
  private loadingSubs: Subscription;
  borrowedBooks;
  whisListSubscription: Subscription;
  whisList = [];
  constructor( private userService: UserService, private authService: AuthService, private router: Router,
               private uiService: UIService, private booksService: BooksFetch ) { }
  ngOnInit() {
      this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading) => {
        this.isLoading =  isLoading;
      });
      this.authService.autoAuth().then( () => {
      this.userService.getUserData().then((user) => {
        this.borrowedBooks = user.borrowedbooks;
        this.booksService.getBooksWithISBN(user.wishlist);
        this.whisListSubscription = this.booksService.filteredBooks.subscribe( (books) => {
          this.whisList.push(books);
        });
      });
    });
  }

  logout() {
    this.authService.logout().then( () => this.router.navigate(['']));
    this.loadingSubs.unsubscribe();
  }
}
