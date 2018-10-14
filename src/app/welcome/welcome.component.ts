import { Component, OnInit } from '@angular/core';
import { Books } from '../dataModels/books.model';
import { BooksFetch } from '../booksFetch.service';
import { MatDialog } from '@angular/material';
import { AuthComponent } from '../auth/auth.component';
import { SignUpComponent } from '../auth/signUp/signUp.component';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private booksService: BooksFetch, public dialog: MatDialog, private authService: AuthService) {
  // this.authService.getToken();
  }
  searchString = '';
  filteredBooks: Books[];
  allBooks: Books[];
  showResult = false;
  category = [];
  dp = 'assets/default_user_image.png';
  ngOnInit() {
    this.booksService.getAllBooks().subscribe(books => {
      this.allBooks = books;
      this.filteredBooks = this.allBooks;
      books.forEach(book => {
        if (!this.category.includes(book.category)) {
        this.category.push(book.category);
        }
      });
    });
  }
  onBooksFound(formData) {
    this.searchString = formData.searchText.toLowerCase();
    const filter = formData.filter.toLowerCase();
    const category = formData.category.toLowerCase();
    if (filter === 'title') {
      this.filteredBooks = this.allBooks.filter((book) => {
        return book.title.toLowerCase().includes(this.searchString);
      });
    } else if (filter === 'author') {
      this.filteredBooks = this.allBooks.filter((book) => {
        return book.author.toLowerCase().includes(this.searchString);
      });
    }
    this.filteredBooks = this.filteredBooks.filter((book) => {
      return book.category.toLowerCase().includes(category);
    });
    this.showResult = true;
  }

  popUp() {
    const dialogRef = this.dialog.open(AuthComponent);
    dialogRef.afterClosed().subscribe(() => {
      // this.authService.currentUser.subscribe((value) => {
      //   console.log(value);
      // });
      this.dp = this.authService.currentUser[0].photoURL;
    });
  }
  register() {
    const dialogRef = this.dialog.open(SignUpComponent);
  }
  logout() {
    this.authService.logout();
  }
}
